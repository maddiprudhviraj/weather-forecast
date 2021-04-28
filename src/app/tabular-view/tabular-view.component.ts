import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WeatherReport } from "../../weather-report-model";
import { WeatherReportService } from "../services/weather-report.service";

@Component({
  selector: "app-tabular-view",
  templateUrl: "./tabular-view.component.html",
  styleUrls: ["./tabular-view.component.css"]
})
export class TabularViewComponent implements OnInit {
  subscription: Subscription;

  @Input() trackReport: string;

  weatherHistory: WeatherReport[];

  columnDefs = [];

  weatherReport = [];

  defaultColDef = {
    flex: 1,
    sortable: true,
    resizable: true
  };

  constructor(private weatherService: WeatherReportService) {
    this.subscription = this.weatherService.trackWeatherReport.subscribe(
      weatherHistory => {
        this.weatherHistory = weatherHistory;
        if (this.trackReport) {
          this.generateChartReport(this.trackReport);
        }
      }
    );
  }

  ngOnInit() {
    this.generateChartReport(this.trackReport);
  }

  generateChartReport(trackReport: string) {
    this.weatherReport = [];
    this.columnDefs = [
      { field: "Date" },
      {
        field:
          trackReport === "Temperature" ? "Temperature Low" : "Humidity Low"
      },
      {
        field:
          trackReport === "Temperature" ? "Temperature High" : "Humidity High"
      }
    ];
    this.weatherHistory.map(weatherReport => {
      this.weatherReport.push(
        trackReport === "Temperature"
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
