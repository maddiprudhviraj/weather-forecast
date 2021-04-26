import { Component, VERSION } from "@angular/core";
import { DatePipe } from "@angular/common";
import { WeatherForecastEvent } from "./weather-forecast-event";
import { Observable, Subscription } from "rxjs";
import { WeatherForecastService } from "./weather-forecast.service";
import { Router } from "@angular/router";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  subscription: Subscription;
  message: string;
  mainCall: string;

  constructor(
    private _weatherForecastEvent: WeatherForecastEvent,
    private weatherService: WeatherForecastService,
    private router: Router
  ) {
    this.subscription = this.weatherService.apptrackFlag.subscribe(data => {
      this.mainCall = data;
    });
  }

  getToday(): string {
    return new Date().toISOString().split("T")[0];
  }

  ngOnInit() {
    this._weatherForecastEvent.getWeatherInfo();
  }

  changeDate(selectedDate: Date) {
    this._weatherForecastEvent.getWeatherInfo(selectedDate);
  }

  navigate(flag: any) {
    this.router.navigateByUrl(flag);
  }
}
