import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../models/api-models/gender';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GendersService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {}

  getGenders(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/genders');
  }
}
