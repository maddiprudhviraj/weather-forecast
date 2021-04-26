import { Component, Input, OnInit } from "@angular/core";
import { WeatherForecastService } from "../weather-forecast.service";
import { Subscription } from "rxjs";
import * as Highcharts from "highcharts";
import addMore from "highcharts/highcharts-more";

import { Router } from "@angular/router";
import { Location } from "@angular/common";
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

  one = [];
  two = [];

  temperatureData1: string;
  lessons$: any;
  data1 = [];
  three = [];

  constructor(
    private weatherService: WeatherForecastService,
    private router: Router,
    location: Location
  ) {
    this.subscription = this.weatherService.trackWeatherReport.subscribe(data => {
      this.temperatureData1 = this.router.url;

      if (data.length > 0) {
        this.one = [];
        this.two = [];
        this.three = [];
        if (this.temperatureData1 === "/temperature") {
          data.map(item => {
            this.one.push(item.Date);
            this.two.push([item.temperature_low, item.temperature_high]);
          });

          this.callChart(this.two);
        } else {
          data.map(item => {
            this.one.push(item.Date);
            this.three.push([item.humidity_low, item.humidity_high]);
          });

          this.callChart(this.three);
        }
      }
    });
  }

  ngOnInit() {}

  callChart(item) {
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
        categories: this.one
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
          data: item
        }
      ]
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
