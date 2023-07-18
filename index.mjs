import { processSendEmail } from './sendemail.mjs';
import { processSendEmailWithKey } from './sendemailwithkey.mjs';

export const handler = async (event, context, callback) => {
    
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : '*',
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Content-Type, isBase64Encoded, x-requested-with",
        "Access-Control-Allow-Credentials" : true,
        'Content-Type': 'application/json',
        "isBase64Encoded": false
      },
    };
    
    if(event["httpMethod"] == "OPTIONS") {
      callback(null, response);
      return;
    }
    
    console.log(event);
    
    switch(event["path"]) {
      
        case "/sendemail":
          const resultSendEmail = await processSendEmail(event);
          response.body = JSON.stringify(resultSendEmail.body);
          response.statusCode = resultSendEmail.statusCode;
        break;

        case "/sendemailwithkey":
          const resultSendEmailWithKey = await processSendEmailWithKey(event);
          response.body = JSON.stringify(resultSendEmailWithKey.body);
          response.statusCode = resultSendEmailWithKey.statusCode;
        break;
        
    }
    
    callback(null, response);
    
    return response;
};