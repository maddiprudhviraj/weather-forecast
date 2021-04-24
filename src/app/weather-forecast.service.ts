import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";

@Injectable()
export class WeatherForecastService {
  constructor(private http: HttpClient) {}

  getForecastData(): Observable<any[]> {
    return this.http.get<any[]>(
      "https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date=2019-12-24"
    );
  }

  getFourForecastData(...items): Observable<any[]> {
    // console.log("For API"+items);
    let citiesWeatherInfo = [];
    items.map((city) => {
      citiesWeatherInfo.push(
        this.http.get(`https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date_time=${city}`)
      );
    });

    return forkJoin([...citiesWeatherInfo]);
  }
}
