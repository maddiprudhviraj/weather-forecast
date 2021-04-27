import { Component, Input, OnInit } from "@angular/core";
import { WeatherReportService } from "../weather-report.service";
import { Subscription } from "rxjs";
import * as Highcharts from "highcharts";
import addMore from "highcharts/highcharts-more";
import { Router } from "@angular/router";

addMore(Highcharts);

@Component({
  selector: "app-high-charts",
  templateUrl: "./high-charts.component.html",
  styleUrls: ["./high-charts.component.css"]
})
export class HighChartsComponent implements OnInit {
  subscription: Subscription;

  highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(
    private weatherService: WeatherReportService,
    private router: Router
  ) {
    this.subscription = this.weatherService.trackWeatherReport.subscribe(
      weatherHistory => {
        let currentRoute = this.router.url;

        if (weatherHistory.length > 0) {
          let xAxisDates = [];
          let temperatureHistory = [];
          let humidityHistory = [];
          if (currentRoute === "/temperature") {
            weatherHistory.map(weatherReport => {
              xAxisDates.push(weatherReport.Date);
              temperatureHistory.push([
                weatherReport.temperature_low,
                weatherReport.temperature_high
              ]);
            });

            this.displayWeatherReport(xAxisDates, temperatureHistory, [
              "Temperature",
              "Temperature ( \xB0C )",
              "\xB0C"
            ]);
          } else {
            weatherHistory.map(weatherReport => {
              xAxisDates.push(weatherReport.Date);
              humidityHistory.push([
                weatherReport.humidity_low,
                weatherReport.humidity_high
              ]);
            });

            this.displayWeatherReport(xAxisDates, humidityHistory, [
              "Humidity",
              "Humidity ( %rh )",
              "%"
            ]);
          }
        }
      }
    );
  }

  ngOnInit() {}

  displayWeatherReport(
    xAxisDates: string[],
    weatherReport: any,
    yAxisTitle: string[]
  ) {
    this.chartOptions = {
      chart: {
        type: "columnrange",
        inverted: false
      },
      title: {
        text: yAxisTitle[0]+" "+"Report of last 30 Days"
      },
      subtitle: {
        text: "Report on Every Individual Date"
      },
      xAxis: {
        categories: xAxisDates
      },
      yAxis: {
        title: {
          text: yAxisTitle[1]
        }
      },
      tooltip: {
        valueSuffix: yAxisTitle[2]
      },
      plotOptions: {
        columnrange: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              return this.y + yAxisTitle[2];
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: yAxisTitle[0],
          type: "columnrange",
          data: weatherReport
        }
      ]
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
