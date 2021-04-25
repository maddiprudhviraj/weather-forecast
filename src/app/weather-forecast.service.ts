import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, Subject } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class WeatherForecastService {
  public flagToSend = new Subject<Array<any[]>>();

  // trackFlag = this.flagToSend.asObservable();

  changeFlag(msg: any[]) {
    console.log("rey");

    console.log("reyBabu"+msg);
    
    this.flagToSend.next(msg);
  }

  private appflagToSend = new Subject<string>();

  apptrackFlag = this.appflagToSend.asObservable();

  appchangeFlag(msg: any) {
    this.appflagToSend.next(msg);
  }

  constructor(private http: HttpClient) {}

  getForecastData(): Observable<any[]> {
    return this.http.get<any[]>(
      "https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date=2019-12-24"
    );
  }

  getFourForecastData(...items): Observable<any[]> {
    // console.log("For API"+items);
    let citiesWeatherInfo = [];
    items.map(city => {
      citiesWeatherInfo.push(
        this.http.get(
          `https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date_time=${city}`
        )
      );
    });

    return forkJoin([...citiesWeatherInfo]);
  }
}
