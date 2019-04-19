# blizzy-ts-service
Runs service calls against blizzard's API with a provided auth token.

Created following instructions at:
https://blog.shovonhasan.com/deploying-a-typescript-node-aws-lambda-function-with-serverless/

# Setup
This app uses the [Serverless framework](https://github.com/serverless/serverless) to make requests to the [Blizzard World of Warcraft API](https://develop.battle.net).

It also uses some serverless plugins for easy development and testing: 
- [Serverless Offline](https://www.npmjs.com/package/serverless-offline)
- [Serverless Typescript Plugin](https://www.npmjs.com/package/serverless-plugin-typescript)
- [Serverless DotEnv Plugin](https://www.npmjs.com/package/serverless-dotenv-plugin)

You'll need `node` installed on your system. [Click here](https://nodejs.org/en/download/) for their native installers! You'll need `serverless` installed for this to work. I have it installed globally on my system. You can do this by running:
```
sudo npm install -g serverless
```

To set up this service, start by running:
```
git clone https://github.com/trisco2001/blizzy-ts-auth.git && cd blizzy-ts-auth
npm install
```

This microservice does not encompass authorization. You'll need a Blizzard API authorization token. I've created a basic authorization server at https://github.com/trisco2001/blizzy-ts-auth, and to run that you'll need to acquire your own API-key and Secret, both of which are available from Blizzard. I will assume that you have your own authorization server set up, and have access to an auth token.

Once that's set up, you should be able to start a local server:
```
serverless offline -P 3001
```

Assuming all started well and the server is listening, you should be able to use a separate terminal to invoke the endpoint and get and authorization token to use for other Blizzard API requests.

```
curl -d '{"token":"ABC123ABC123ABC123ABC123", "resource":"wow/character/executus/barnaby", "params": {"locale": "en_US"}}' -H "Content-Type: application/json" -X POST http://localhost:3001/service
```
> {"lastModified":1555472533000,"name":"Barnaby","realm":"Executus","battlegroup":"Shadowburn","class":3,"race":30,"gender":1,"level":120,"achievementPoints":15280,"thumbnail":"executus/128/161375616-avatar.jpg","calcClass":"Y","faction":0,"totalHonorableKills":729}

Note that if you are not providing valid authorization tokens in your service requests, you will ultimately get 401s from Blizzard.

> {"error":"An unauthorized status was configured. Check that your authorization token is still valid."}
