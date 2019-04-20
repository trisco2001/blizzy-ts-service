import { Handler, Context, Callback } from "aws-lambda";
import { Environment } from "./Environment";
import { BasicResponses, BasicResponse, GatewayEventInteractor } from "blizzy-core";
import { BlizzyService } from 'blizzy-core'

const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  const gatewayEventInteractor = new GatewayEventInteractor(event)
  const token = gatewayEventInteractor.body("token")
  const resource = gatewayEventInteractor.body("resource")
  const params = gatewayEventInteractor.body("params")
  if (token === undefined) {
    return BasicResponses.authorizationNeeded("No token provided")
  }

  if (resource === undefined) {
    return BasicResponses.badRequest("No resource provided")
  }

  const environment = new Environment()
  const blizzyService = new BlizzyService(environment)
  return await blizzyService.execute(token, resource, params)
};

export { handler }
