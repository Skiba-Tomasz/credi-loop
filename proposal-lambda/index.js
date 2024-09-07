import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import add from "date-fns/add";

const client = new DynamoDBClient({ region: "eu-west-2" });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export async function handler(event, context) {
  console.log(event);
  try {
    if (event.requestContext.http.method === "OPTIONS") {
      return "OK";
    }
  } catch (e) {}
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
        acceptingAddress: null,
        totalAmount: null,
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
    const payments = body.payments;

    const proposalsCommand = new QueryCommand({
      TableName: "proposals-v1",
      KeyConditionExpression: "#key = :key AND #hash = :hash",
      ExpressionAttributeNames: { "#key": "partition", "#hash": "hash" },
      ExpressionAttributeValues: { ":key": "ALL", ":hash": body.hash },
    });
    const results = (await docClient.send(proposalsCommand)).Items;
    const item = results[0];
    const interest =
      (((item.installments / 12.0) * item.apy) / 100) * item.amount;
    const totalAmount = interest + item.amount;
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
        acceptingAddress: body.acceptingAddress,
        totalAmount: totalAmount,
      },
    });
    await docClient.send(command);
    for (let i = 0; i < payments.length; i++) {
      const bodyPayment = payments[i];
      const payment = {
        partition: "ALL",
        hash: `${item.hash}-${i}`,
        borrower: item.address,
        lender: body.acceptingAddress,
        installmentAmount: bodyPayment.installmentAmount,
        installmentPaymentDate: bodyPayment.installmentPaymentDate,
        installmentIndex: bodyPayment.installmentIndex,
      };
      const command = new PutCommand({
        TableName: "payments-v1",
        Item: payment,
      });
      await docClient.send(command);
    }

    console.log(results);
    return payments;
  } else if (event.rawPath.endsWith("get-payments")) {
    const proposalsCommand = new QueryCommand({
      TableName: "payments-v1",
      KeyConditionExpression: "#key = :key",
      ExpressionAttributeNames: { "#key": "partition" },
      ExpressionAttributeValues: { ":key": "ALL" },
    });
    const results = (await docClient.send(proposalsCommand)).Items;
    console.log(results);
    return results;
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
//   body: '{"hash": 1437014403, "acceptingAddress": "0xe28bAB89e496d45A6AD17588AB339bC571483791", "payments": [{ "installmentAmount": 5, "installmentPaymentDate": 5555, "installmentIndex": 0 }, { "installmentAmount": 5, "installmentPaymentDate": 6666, "installmentIndex": 1 }]}',
// });

// handler({
//   rawPath: "/dev/execute/get-payments",
// });
