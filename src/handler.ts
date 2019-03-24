import { Handler, Context, Callback } from "aws-lambda";

interface BasicResponse {
  statusCode: number
  body: any
}

const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  const response: BasicResponse = {
    statusCode: 200,
    body: {
      result: "OK"
    }
  };

  callback(null, response)
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

export { handler }