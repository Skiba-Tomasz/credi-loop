import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

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
        accepted: false,
      },
    });
    await docClient.send(command);
  } else if (event.rawPath.endsWith("get-proposals")) {
    const proposalsCommand = new QueryCommand({
      TableName: "proposals-v1",
      KeyConditionExpression: "#key = :key",
      ExpressionAttributeNames: { "#key": "partition" },
      ExpressionAttributeValues: { ":key": "ALL" },
    });
    const results = (await docClient.send(proposalsCommand)).Items;
    console.log(results);
    return results;
  } else if (event.rawPath.endsWith("accept-proposal")) {
    const body = JSON.parse(event.body);
    console.log(body.hash);

    const proposalsCommand = new QueryCommand({
      TableName: "proposals-v1",
      KeyConditionExpression: "#key = :key AND #hash = :hash",
      ExpressionAttributeNames: { "#key": "partition", "#hash": "hash" },
      ExpressionAttributeValues: { ":key": "ALL", ":hash": body.hash },
    });
    const results = (await docClient.send(proposalsCommand)).Items;
    const item = results[0];
    const command = new PutCommand({
      TableName: "proposals-v1",
      Item: {
        partition: "ALL",
        hash: item.hash,
        address: item.address,
        amount: item.amount,
        installments: item.installments,
        apy: item.apy,
        description: item.description,
        requestNetworkPayload: item.requestNetworkPayload,
        accepted: true,
      },
    });
    await docClient.send(command);
    console.log(results);
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

// handler({
//   rawPath: "/dev/execute/create-proposal",
//   body: `{"address": "testAddress2", "amount": 0.05,"installments": 12,"apy": 5.1,"description": "na komputer","requestNetworkPayload": "yyyy"}`,
// });

// handler({
//   rawPath: "/dev/execute/get-proposals",
// });

// handler({
//   rawPath: "/dev/execute/accept-proposal",
//   body: '{"hash": 1437014403}',
// });
