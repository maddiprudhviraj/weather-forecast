import { Component, OnInit } from "@angular/core";
import {WeatherInfoType} from "../weather-info-type"

@Component({
  selector: "app-temperature-report",
  templateUrl: "./temperature-report.component.html",
  styleUrls: ["./temperature-report.component.css"]
})
export class TemperatureReportComponent implements OnInit {
  trackReport = WeatherInfoType.Temperature;
  constructor() {}

  ngOnInit() {}
}
