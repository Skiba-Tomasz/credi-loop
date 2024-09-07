import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditData, LenderBoardRecord } from './dto/lenderboard.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private readonly httpClient: HttpClient) {}

  getCrediscores(): Observable<CreditData[]> {
    return this.httpClient.get<CreditData[]>(
      `https://get-cs-v1.crediloop.com/`
    );
  }

  getLenderboard(): Observable<LenderBoardRecord[]> {
    return this.httpClient.post<LenderBoardRecord[]>(
      `https://create-proposal-v1.crediloop.com/get-proposals`,
      {}
    );
  }

  acceptProposal(payload: any) {
    return this.httpClient.post<any>(
      `https://create-proposal-v1.crediloop.com/accept-proposal`,
      payload
    );
  }
}
