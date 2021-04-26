import { Component, Input, OnInit } from "@angular/core";
import { WeatherForecastService } from "../weather-forecast.service";
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
  message: string;
  subscription: Subscription;

  highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(
    private weatherService: WeatherForecastService,
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

            this.displayWeatherReport(xAxisDates, temperatureHistory);
          } else {
            weatherHistory.map(weatherReport => {
              xAxisDates.push(weatherReport.Date);
              humidityHistory.push([
                weatherReport.humidity_low,
                weatherReport.humidity_high
              ]);
            });

            this.displayWeatherReport(xAxisDates, humidityHistory);
          }
        }
      }
    );
  }

  ngOnInit() {}

  displayWeatherReport(xAxisDates: string[], weatherReport: any) {
    this.chartOptions = {
      chart: {
        type: "columnrange",
        inverted: false
      },
      title: {
        text: "Temperature variation by month"
      },
      subtitle: {
        text: "Observed in Vik i Sogn, Norway, 2009"
      },
      xAxis: {
        categories: xAxisDates
      },
      yAxis: {
        title: {
          text: "Temperature ( \xB0C )"
        }
      },
      tooltip: {
        headerFormat:
          '<span style = "font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
          '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true
      },
      plotOptions: {
        columnrange: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              return this.y + "\xB0C";
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: "Temperatures",
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
