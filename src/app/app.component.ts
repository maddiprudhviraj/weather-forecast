import { Component } from "@angular/core";
import { WeatherReportEvent } from "./weather-report-event";
import { Router } from "@angular/router";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  isSelectedNewDate: boolean;

  constructor(
    private _weatherReportEvent: WeatherReportEvent,
    private router: Router
  ) {}

  disableFutureDates(): string {
    return new Date().toISOString().split("T")[0];
  }

  dateSelected() {
    this.isSelectedNewDate = true;
  }

  ngOnInit() {
    this._weatherReportEvent.getWeatherInfo();
  }

  changeDate(selectedDate: Date) {
    this._weatherReportEvent.getWeatherInfo(selectedDate);
  }

  navigatePage(redirect: string) {
    this.router.navigateByUrl(redirect);
  }
}
