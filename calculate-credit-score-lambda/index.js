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
  const allPayments = await fetchAll();
  console.log("FETCHED ALL");
  console.log(allPayments.length);
  allPayments.forEach((e) => console.log(e));
  const creditScores = calculateCreditScore(allPayments);
  creditScores.forEach((value, key) => console.log(`${key}: ${value}`));
  await saveCreditScores(creditScores);
}

async function fetchAll() {
  let payments = [];
  let iterator = 0;
  const fetchSize = 100;
  while (true) {
    const newPayments = await fetch(iterator, fetchSize);
    if (newPayments.length === 0) {
      return payments;
    }
    //TODO: just for testing
    // if (payments.length > 0) {
    //   return payments;
    // }
    payments = payments.concat(newPayments);
    iterator += newPayments.length;
    console.log(iterator);
  }
}

// credit score is number from 0-100
// for now it has simple algorithm that use transaction count using Request Network to showcase
// for the future - credit score will assume more parameters like including values of paymens and repaying loans
function calculateCreditScore(payments) {
  const startingCreditScore = 50;
  const maxCreditScore = 100;
  const bonusForSendingPayment = 0.5;
  const bonusForReceivingPayment = 1;
  const creditScores = new Map();
  for (let i = 0; i < payments.length; i++) {
    const payment = payments[i];
    const from = payment.from;
    const to = payment.to;
    const fromValue = creditScores.get(from) ?? startingCreditScore;
    creditScores.set(
      from,
      Math.min(fromValue + bonusForReceivingPayment, maxCreditScore)
    );
    const toValue = creditScores.get(to) ?? startingCreditScore;
    creditScores.set(
      to,
      Math.min(toValue + bonusForSendingPayment, maxCreditScore)
    );
  }
  return creditScores;
}

async function saveCreditScores(creditScores) {
  for (let [key, value] of creditScores) {
    const command = new PutCommand({
      TableName: "credit-scores-v1",
      Item: {
        partition: "ALL",
        address: key,
        creditScore: value,
      },
    });
    await docClient.send(command);
  }
}

async function fetch(skip, fetchSize) {
  const endpoint =
    "https://gateway.thegraph.com/api/3b77079354a6291da012e3a7c45ecd69/subgraphs/id/4PScFUi3CFDbop9XzT6gCDtD4RR8kRzyrzSjrHoXHZBt";
  const query = {
    query: `{payments(first: ${fetchSize}, skip: ${skip}) {txHash,tokenAddress,amount,amountInCrypto,to,from,currency}}`,
  };
  const data = await axios.post(endpoint, query);
  console.log(data.data.data.payments.length);
  return data.data.data.payments;
}

handler();
