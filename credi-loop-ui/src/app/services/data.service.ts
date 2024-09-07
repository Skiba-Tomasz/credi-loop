import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiKey: string = '';

  constructor(private readonly httpClient: HttpClient) {}

  getData() {
    const query = `
      {
        payments(first: 5) {
          id
          contractAddress
          tokenAddress
          to
        }
      }
    `;

    return this.httpClient.post(
      `https://gateway.thegraph.com/api/${this.apiKey}/subgraphs/id/HJNZW9vRSGXrcCVyQMdNKxxuLKeZcV6yMjTCyY6T2oon`,
      { query: query },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
