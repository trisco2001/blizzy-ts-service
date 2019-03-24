import { Handler, Context, Callback } from "aws-lambda";
import { RequesterService } from "RequesterService";
import { Environment } from "Environment";

interface BasicResponse {
  statusCode: number
  body: string
}

const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  const token = event['token'];
  const resource = event['resource'];
  const paramsString = event['params'];
  if (token === undefined) {
    const response: BasicResponse = {
      statusCode: 401,
      body: JSON.stringify({
        result: "No token provided"
      })
    };
    callback("No token provided", response);
  }

  if (resource === undefined || paramsString === undefined) {
    const response: BasicResponse = {
      statusCode: 400,
      body: JSON.stringify({
        result: "No resource provided"
      })
    };
    callback("No resource provided", response);
  }

  const params = JSON.parse(paramsString);

  const environment = new Environment()
  const requester = new RequesterService(environment, token);
  const result = await requester.request(resource, params)
  const response: BasicResponse = {
    statusCode: result.status,
    body: JSON.stringify(result.data)
  };

  callback(null, response)
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

export { handler }