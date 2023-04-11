import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../models/api-models/gender';

@Injectable({
  providedIn: 'root',
})
export class GendersService {
  private baseApiUrl = 'https://localhost:7150';

  constructor(private httpClient: HttpClient) {}

  getGenders(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/genders');
  }
}
