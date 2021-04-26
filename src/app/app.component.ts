import { Component } from "@angular/core";
import { WeatherForecastEvent } from "./weather-forecast-event";
import { Router } from "@angular/router";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private _weatherForecastEvent: WeatherForecastEvent,
    private router: Router
  ) {}

  disableFutureDates(): string {
    return new Date().toISOString().split("T")[0];
  }

  ngOnInit() {
    this._weatherForecastEvent.getWeatherInfo();
  }

  changeDate(selectedDate: Date) {
    this._weatherForecastEvent.getWeatherInfo(selectedDate);
  }

  navigatePage(redirect: string) {
    this.router.navigateByUrl(redirect);
  }
}
