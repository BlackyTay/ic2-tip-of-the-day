import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class TipsService {

  constructor(private httpClient: HttpClient) { }

  getTips() {
    return this.httpClient.get("/assets/data/tips.json");
  }
}
