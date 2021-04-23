import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable()
export class WeatherForecastService {

  constructor(private http: HttpClient) { }

  getForecastData(): Observable<any[]> {
    return this.http.get<any[]>("https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date=2019-12-24");
  }

}