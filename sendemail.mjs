import { REGION,
    AUTH_ENABLE, 
    AUTH_REGION, 
    AUTH_API, 
    AUTH_STAGE,
    FROM_NAME,
    FROM_EMAIL,
    CloudWatchLogsClient,
    PutLogEventsCommand,
    LOG_GROUP_NAME,
    ADMIN_METHODS,
    GetLogEventsCommand,
    sesClient,
    SendEmailCommand
} from "./globals.mjs";
import { processAuthenticate } from './authenticate.mjs';
import { processAddLog } from './addlog.mjs';

export const processSendEmail = async (event) => {
    
    console.log('triggerevent');
    
    // if((event["headers"]["Authorization"]) == null) {
    //     return {statusCode: 400, body: { result: false, error: "Malformed headers!"}};
    // }
    
    // if((event["headers"]["Authorization"].split(" ")[1]) == null) {
    //     return {statusCode: 400, body: { result: false, error: "Malformed headers!"}};
    // }
    
    // var hAscii = Buffer.from((event["headers"]["Authorization"].split(" ")[1] + ""), 'base64').toString('ascii');
    
    // if(hAscii.split(":")[1] == null) {
    //     return {statusCode: 400, body: { result: false, error: "Malformed headers!"}};
    // }
    
    // const email = hAscii.split(":")[0];
    // const accessToken = hAscii.split(":")[1];
    
    // if(email == "" || !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    //     return {statusCode: 400, body: {result: false, error: "Malformed headers!"}}
    // }
    
    // if(accessToken.length < 5) {
    //     return {statusCode: 400, body: {result: false, error: "Malformed headers!"}}
    // }
    
    // const authResult = await processAuthenticate(event["headers"]["Authorization"]);
    
    // if(!authResult.result) {
    //     return {statusCode: 401, body: {result: false, error: "Unauthorized request!"}};
    // }
    
    // if(ADMIN_METHODS.includes("detail")) {
    //     if(!authResult.admin) {
    //         return {statusCode: 401, body: {result: false, error: "Unauthorized request!"}};
    //     }   
    // }
    
    // const userId = authResult.userId;
    
    const userId = "1234";
    
    var toemail = null;
    var subject = null;
    var bodyplain = null;
    var bodyhtml = null;
    
    try {
        toemail = JSON.parse(event.body).toemail.trim();
        subject = JSON.parse(event.body).subject.trim();
        bodyplain = JSON.parse(event.body).bodyplain.trim();
        bodyhtml = JSON.parse(event.body).bodyhtml.trim();
    } catch (e) {
        const response = {statusCode: 400, body: { result: false, error: "Malformed body!"}};
        //processAddLog(userId, 'detail', event, response, response.statusCode)
        return response;
    }
    
    if(subject == null || subject == "" || subject.length < 0) {
        const response = {statusCode: 400, body: {result: false, error: "Subject is not valid!"}}
       // processAddLog(userId, 'detail', event, response, response.statusCode)
        return response;
    }
    
    if(bodyplain == null || bodyplain == "" || bodyplain.length < 0) {
        const response = {statusCode: 400, body: {result: false, error: "Bodyplain is not valid!"}}
       // processAddLog(userId, 'detail', event, response, response.statusCode)
        return response;
    }
    
    if(bodyhtml == null || bodyhtml == "" || bodyhtml.length < 6) {
        const response = {statusCode: 400, body: {result: false, error: "Bodyhtml is not valid!"}}
       // processAddLog(userId, 'detail', event, response, response.statusCode)
        return response;
    }
    
    if(toemail == null || toemail == "" || toemail.length < 6) {
        const response = {statusCode: 400, body: {result: false, error: "To email is not valid!"}}
       // processAddLog(userId, 'detail', event, response, response.statusCode)
        return response;
    }
    
    async function sendEmail() {
      try {
        return await sesClient.send(new SendEmailCommand({
            Destination: {
              CcAddresses: [],
              ToAddresses: [toemail],
            },
            Message: {
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: bodyhtml,
                },
                Text: {
                  Charset: "UTF-8",
                  Data: bodyplain,
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: subject,
              },
            },
            Source: FROM_EMAIL,
            ReplyToAddresses: [],
        }));
      } catch (e) {
        return e;
      }
    }
    
    const sendResult = await sendEmail();
    console.log(sendResult);

    const response = {statusCode: 200, body: {result: true}};
    processAddLog(userId, 'triggerevent', event, response, response.statusCode)
    return response;

}