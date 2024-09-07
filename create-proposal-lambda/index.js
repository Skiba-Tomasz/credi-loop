import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import axios from "axios";

const client = new DynamoDBClient({ region: "eu-west-2" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export async function handler(event, context) {
  console.log(event);

  if (event.rawPath.endsWith("create-proposal")) {
    const body = JSON.parse(event.body);
    const hash = hashCode(event.body);
    console.log(body);
    console.log(hash);

    const command = new PutCommand({
      TableName: "proposals-v1",
      Item: {
        partition: "ALL",
        hash: hash,
        address: body.address,
        amount: body.amount,
        installments: body.installments,
        apy: body.apy,
        description: body.description,
        requestNetworkPayload: body.requestNetworkPayload,
      },
    });
    await docClient.send(command);
  }
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

handler({
  version: "2.0",
  routeKey: "ANY /{proxy+}",
  rawPath: "/dev/execute/create-proposal",
  rawQueryString: "",
  headers: {
    accept: "*/*",
    authorization:
      "NzZjMjU2ZWUtMmJhOC00ZWZhLWI0N2EtNWYyYWFkYWNlNWI3OjY2YmViMmMzY2ZmYWQ1MjQ0NDVlYzY2OTYxZmUyNThk",
    "cloudfront-forwarded-proto": "https",
    "cloudfront-is-android-viewer": "false",
    "cloudfront-is-desktop-viewer": "true",
    "cloudfront-is-ios-viewer": "false",
    "cloudfront-is-mobile-viewer": "false",
    "cloudfront-is-smarttv-viewer": "false",
    "cloudfront-is-tablet-viewer": "false",
    "cloudfront-viewer-address": "77.253.230.83:63659",
    "cloudfront-viewer-asn": "12741",
    "cloudfront-viewer-country": "PL",
    "cloudfront-viewer-country-name": "Poland",
    "cloudfront-viewer-http-version": "1.1",
    "cloudfront-viewer-latitude": "52.23940",
    "cloudfront-viewer-longitude": "21.03620",
    "cloudfront-viewer-time-zone": "Europe/Warsaw",
    "cloudfront-viewer-tls": "TLSv1.3:TLS_AES_128_GCM_SHA256:sessionResumed",
    "content-length": "403",
    "content-type": "application/json",
    host: "rdt6olfuxf.execute-api.eu-west-2.amazonaws.com",
    "postman-token": "53eb076b-2d0a-459f-8e15-8ea494cc1873",
    referer: "http://create-proposal-v1.crediloop.com/taki-path",
    "user-agent": "PostmanRuntime/7.37.3",
    "x-amz-cf-id": "kLXWpUzg_h-2h4I_uyI4hNuJ_Ko6JP7mjC8Ts8LGSAfRzip_yLWb8g==",
    "x-amzn-trace-id": "Root=1-66dc59f5-1f35642578a87a480422fc72",
    "x-forwarded-for": "77.253.230.83, 64.252.85.131",
    "x-forwarded-port": "443",
    "x-forwarded-proto": "https",
  },
  requestContext: {
    accountId: "382170705990",
    apiId: "rdt6olfuxf",
    domainName: "rdt6olfuxf.execute-api.eu-west-2.amazonaws.com",
    domainPrefix: "rdt6olfuxf",
    http: {
      method: "POST",
      path: "/dev/execute/taki-path",
      protocol: "HTTP/1.1",
      sourceIp: "77.253.230.83",
      userAgent: "PostmanRuntime/7.37.3",
    },
    requestId: "dvL-bjk0rPEEPLg=",
    routeKey: "ANY /{proxy+}",
    stage: "dev",
    time: "07/Sep/2024:13:49:41 +0000",
    timeEpoch: 1725716981693,
  },
  pathParameters: { proxy: "execute/taki-path" },
  body: `{"address": "testAddress", "amount": 0.05,"installments": 12,"apy": 5.1,"description": "na komputer","requestNetworkPayload": "yyyy"}`,
  isBase64Encoded: false,
});
