const REGION = "us-east-1"; //e.g. "us-east-1"
import { CloudWatchLogsClient, PutLogEventsCommand, GetLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";

import { SESClient } from "@aws-sdk/client-ses";
const sesClient = new SESClient({ region: REGION });
import { SendEmailCommand } from "@aws-sdk/client-ses";

const LOG_GROUP_NAME = "AWS_LOG_GROUP_NAME";

const AUTH_ENABLE = true;
const AUTH_REGION = "AWS_AUTH_REGION";
const AUTH_API = "AWS_AUTH_API";
const AUTH_STAGE = "test";

const FROM_NAME = "FROM_EMAIL_NAME";
const FROM_EMAIL = "FROM_EMAIL_ADDRESS";

const ADMIN_METHODS = BACKEND_ADMIN_METHODS;

const SERVER_KEY = "SERVERKEY";

export { 
    REGION,
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
    SendEmailCommand,
    SERVER_KEY
};