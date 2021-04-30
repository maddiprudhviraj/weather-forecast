import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { WeatherInfoType } from "../weather-info-type";

@Component({
  selector: "app-humidity-report",
  templateUrl: "./humidity-report.component.html",
  styleUrls: ["./humidity-report.component.css"]
})
export class HumidityReportComponent implements OnInit {
  trackReport = WeatherInfoType.Humidity;
  tablePaginationPageSize = 10;
  tablePagination = true;
  constructor() {}

  ngOnInit() {}
}
