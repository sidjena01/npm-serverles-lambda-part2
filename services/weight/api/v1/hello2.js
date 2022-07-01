"use strict";

module.exports.hello2 = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello world 2",
      },
      null,
      2
    ),
  };
};