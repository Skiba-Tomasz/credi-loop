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
    payments = payments.concat(newPayments);
    iterator += newPayments.length;
    console.log(iterator);
  }
}

async function fetch(skip, fetchSize) {
  const endpoint =
    "https://gateway.thegraph.com/api/3b77079354a6291da012e3a7c45ecd69/subgraphs/id/4PScFUi3CFDbop9XzT6gCDtD4RR8kRzyrzSjrHoXHZBt";
  const query = {
    query: `{payments(first: ${fetchSize}, skip: ${skip}) {tokenAddress,amount,amountInCrypto,to,from}}`,
  };
  const data = await axios.post(endpoint, query);
  console.log(data.data.data.payments.length);
  return data.data.data.payments;
  //   return data?.data?.data?.accounts?.map((result) => result.id);
}

handler();
