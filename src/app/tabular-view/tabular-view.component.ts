import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WeatherReport } from "../weather-report-model";
import { WeatherReportService } from "../services/weather-report.service";
import { WeatherInfoType } from "../weather-info-type";

@Component({
  selector: "app-tabular-view",
  templateUrl: "./tabular-view.component.html",
  styleUrls: ["./tabular-view.component.css"]
})
export class TabularViewComponent implements OnInit {
  subscription: Subscription;

  @Input() trackReport: string;

  @Input() paginationPageSize: number;

  @Input() pagination: boolean;

  weatherHistory: WeatherReport[];

  columnDefs = [];

  weatherReport = [];

  defaultColDef = {
    flex: 1,
    sortable: true,
    resizable: true
  };

  constructor(private _weatherService: WeatherReportService) {
    this.subscription = this._weatherService.trackWeatherReport.subscribe(
      weatherHistory => {
        this.weatherHistory = weatherHistory;
        if (this.trackReport) {
          this.generateTableReport(this.trackReport);
        }
      }
    );
  }

  ngOnInit() {
    this.generateTableReport(this.trackReport);
  }

  generateTableReport(trackReport: string) {
    this.weatherReport = [];
    this.columnDefs = [
      { field: "Date" },
      {
        field:
          trackReport === WeatherInfoType.Temperature
            ? "Temperature Low"
            : "Humidity Low"
      },
      {
        field:
          trackReport === WeatherInfoType.Temperature
            ? "Temperature High"
            : "Humidity High"
      }
    ];
    this.weatherHistory.map(weatherReport => {
      this.weatherReport.push(
        trackReport === WeatherInfoType.Temperature
          ? {
              Date: weatherReport.Date,
              "Temperature Low": weatherReport.temperature_low,
              "Temperature High": weatherReport.temperature_high
            }
          : {
              Date: weatherReport.Date,
              "Humidity Low": weatherReport.humidity_low,
              "Humidity High": weatherReport.humidity_high
            }
      );
    });
  }
}
