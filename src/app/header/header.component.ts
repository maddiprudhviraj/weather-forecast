import { Component, Inject, OnInit } from "@angular/core";
import { WeatherInfoType } from "../weather-info-type";
import {
  Weather_Forecast_Days,
  Weather_Report_Days
} from "../injection.tokens";
import { Router } from "@angular/router";
import { WeatherReportEvent } from "../weather-report-event";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isSelectedNewDate: boolean;
  selectedTemperature: boolean;
  constructor(
    private router: Router,
    private _weatherReportEvent: WeatherReportEvent,
    @Inject(Weather_Report_Days) private _weather_Report_Days: number,
    @Inject(Weather_Forecast_Days) private _weather_Forecast_Days: number
  ) {}

  ngOnInit() {
    this.selectedTemperature = true;
  }

  disableFutureDates(): string {
    return new Date().toISOString().split("T")[0];
  }

  dateSelected() {
    this.isSelectedNewDate = true;
  }

  changeDate(selectedDate: Date) {
    this._weatherReportEvent.getWeatherInfo(
      this._weather_Report_Days,
      this._weather_Forecast_Days,
      selectedDate
    );
  }

  navigatePage(redirect: string) {
    this.selectedTemperature = redirect === WeatherInfoType.Humidity ? false : true;
    this.router.navigateByUrl(redirect);
  }
}
