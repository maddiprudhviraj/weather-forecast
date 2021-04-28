import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { WeatherReport } from "../weather-report-model";

@Injectable({
  providedIn: "root"
})
export class WeatherReportService {
  public weatherData = new BehaviorSubject<WeatherReport[]>([]);

  trackWeatherReport = this.weatherData.asObservable();

  weatherReport(weatherDataReport: WeatherReport[]) {
    this.weatherData.next(weatherDataReport);
  }

  constructor(private http: HttpClient) {}

  getWeatherReportHistory(...dates: Date[]): Observable<any[]> {
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
