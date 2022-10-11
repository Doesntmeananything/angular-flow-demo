import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountService {
  constructor(private httpClient: HttpClient) {}

  getCount() {
    return this.httpClient.get<{ count: number }>(
      'https://pokeapi.co/api/v2/pokemon'
    );
  }
}
