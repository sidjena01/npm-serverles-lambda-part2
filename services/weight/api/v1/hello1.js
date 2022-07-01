"use strict";

module.exports.hello1 = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello world 1",
      },
      null,
      2
    ),
  };
};