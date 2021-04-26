import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, Subject } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class WeatherForecastService {
  public weatherData = new BehaviorSubject<any[]>([]);

  trackWeatherReport = this.weatherData.asObservable();

  weatherReport(weatherDataReport: any[]) {
    this.weatherData.next(weatherDataReport);
  }

  constructor(private http: HttpClient) {}

  getWeatherReportHistory(...dates: any[]): Observable<any[]> {
    let weatherInfoFromDates = [];
    dates.map(date => {
      weatherInfoFromDates.push(
        this.http.get(
          `https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date_time=${date}`
        )
      );
    });
    return forkJoin([...weatherInfoFromDates]);
  }
}
