import { Handler, Context, Callback } from "aws-lambda";
import { RequesterService } from "RequesterService";
import { Environment } from "Environment";

interface BasicResponse {
  statusCode: number
  body: string
}

const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  const body = JSON.parse(event['body'])
  const token = body.token;
  const resource = body.resource;
  const params = body.params;
  if (token === undefined) {
    const response: BasicResponse = {
      statusCode: 401,
      body: JSON.stringify({
        result: "No token provided"
      })
    };
    callback("No token provided", response);
  }

  if (resource === undefined) {
    const response: BasicResponse = {
      statusCode: 400,
      body: JSON.stringify({
        result: "No resource or params provided"
      })
    };
    callback("No resource provided", response);
  }

  const environment = new Environment()
  const requester = new RequesterService(environment, token);
  const result = await requester.request(resource, params)
  const response: BasicResponse = {
    statusCode: result.status,
    body: JSON.stringify(result.data)
  };

  callback(null, response)
};

export { handler }