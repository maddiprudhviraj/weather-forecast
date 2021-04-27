import { Component, OnInit } from "@angular/core";
import { WeatherReportService } from "../services/weather-report.service";
import { Subscription } from "rxjs";
import * as Highcharts from "highcharts";
import addMore from "highcharts/highcharts-more";
import { Router } from "@angular/router";
import { WeatherReport } from "../../weather-report-model";

addMore(Highcharts);

@Component({
  selector: "app-chart-view",
  templateUrl: "./chart-view.component.html",
  styleUrls: ["./chart-view.component.css"]
})
export class ChartViewComponent implements OnInit {
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
          let weatherData = [];

          weatherHistory.map(weatherReport => {
            xAxisDates.push(weatherReport.Date);
            weatherData.push(
              currentRoute === "/temperature"
                ? [
                    weatherReport.temperature_low,
                    weatherReport.temperature_high
                  ]
                : [weatherReport.humidity_low, weatherReport.humidity_high]
            );
          });

          this.displayWeatherReport(
            xAxisDates,
            weatherData,
            currentRoute === "/temperature" ? "Temperature \xB0C" : "Humidity %"
          );
        }
      }
    );
  }

  ngOnInit() {}

  displayWeatherReport(
    xAxisDates: string[],
    weatherReport: any,
    yAxisTitle: string
  ) {
    this.chartOptions = {
      chart: {
        type: "columnrange",
        inverted: false
      },
      title: {
        text: yAxisTitle.split(" ")[0] + " " + "Report of last 30 Days"
      },
      subtitle: {
        text: "Weather Report"
      },
      xAxis: {
        categories: xAxisDates
      },
      yAxis: {
        title: {
          text: yAxisTitle
        }
      },
      tooltip: {
        valueSuffix: yAxisTitle.split(" ")[1]
      },
      plotOptions: {
        columnrange: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              return this.y + yAxisTitle.split(" ")[1];
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: yAxisTitle.split(" ")[0],
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
