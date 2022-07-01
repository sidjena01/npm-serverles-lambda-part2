pipeline {
    agent any
	parameters {
		  choice choices: ['dev','qa','production'], description: 'Environment on which to be deployed', name: 'ENVIRONMENT'
	}
	environment {
      ENVIRONMENT = "us-east-1"
     }
    options {
        timeout(60)
        timestamps()
    }
    stages {
        stage('Deploy Lambdas') {
            steps {
                echo 'deploying'
                    sh '''
                    cd services
                    npm install
                    for services in `ls`
                    do
                        if [ -d "$services" ]; then
                            if [ "$services" == "utils" ] || [ "$services" == "helpers" ] || [ "$services" == "test" ]  ||  [ "$services" == "node_modules" ]  ; then
                                echo "skipping folders : $services"
                            else
                                echo "The servicename is: $services"
                                cd $services
                                npm install
                                serverless deploy --stage $ENVIRONMENT
                                cd ..
                            fi
                        fi
                    done
                    '''
            }
        }
        stage('Test') {
            steps {
                sh '''    
                    echo 'Run tests and publish results'
                    echo "[ Current directory ] : " `pwd`
                    //npm run test
                '''  
            }
        }
        stage('Deploy to Production') {
            input {
                message "Promote package to Production?"
                ok "Promote"
            }
            steps {
                sh '''
                    echo 'Modify vars and promote package to Production'
                    serverless deploy --stage $ENVIRONMENT
                '''    
            }
        }        
    }
    post {
        always {
            echo 'Clear the workspace'
            deleteDir() /* clean up our workspace */
        }
        success {
            echo "PASS"
			
         }
        failure {
            echo "Fail"
        }
    }  
}
