import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditData, LenderBoardRecord } from './dto/lenderboard.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private readonly httpClient: HttpClient) {}


  getLenderboard(): Observable<CreditData[]> {
    return this.httpClient.get<CreditData[]>(`https://get-cs-v1.crediloop.com/`)
  }

}
