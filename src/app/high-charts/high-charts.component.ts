import { Component, OnInit } from "@angular/core";
import { WeatherForecastService } from "../weather-forecast.service";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-high-charts",
  templateUrl: "./high-charts.component.html",
  styleUrls: ["./high-charts.component.css"]
})
export class HighChartsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [
      {
        data: [1, 2, 3],
        type: "line"
      }
    ]
  };

  constructor(private weatherService: WeatherForecastService) {}

  ngOnInit() {
    this.weatherService.getForecastData().subscribe(
      forecastWeatherInfo => {
        // console.log("Hello" + JSON.stringify(forecastWeatherInfo));
      },
      err => {
        console.log("HTTP Error", err);
      }
    );
  }
}
