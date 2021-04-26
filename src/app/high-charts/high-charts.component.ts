import { Component, Input, OnInit } from "@angular/core";
import { WeatherForecastService } from "../weather-forecast.service";
import { Subject, Subscription } from "rxjs";
import * as Highcharts from "highcharts";
import addMore from "highcharts/highcharts-more";
import {
  first,
  share,
  shareReplay,
  single,
  skipWhile,
  take,
  takeUntil,
  withLatestFrom
} from "rxjs/operators";
import { skip } from "rxjs/operator/skip";
import { WeatherForecastEvent } from "../weather-forecast-event";
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

  // private destroy = new Subject();

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
    // alert("high comp")
    this.subscription = this.weatherService.trackFlag.subscribe(data => {
      // console.log(this.router.url);
      this.temperatureData1 = this.router.url;

      if (data.length > 0) {
        console.log(JSON.stringify(data));
        // console.log(JSON.stringify(data[2]));
        // this.one = data;
        // console.log(JSON.stringify(this.one))
        this.one = [];
        this.two = [];
        this.three = [];
        if (this.temperatureData1 === "/temperature") {
          data.map(item => {
            this.one.push(item.Date);
            this.two.push([item.temp_low, item.temp_high]);
          });
          // console.log(this.two)
          this.callChart(this.two);
        } else {
          data.map(item => {
            this.one.push(item.Date);
            this.three.push([item.hum_low, item.hum_high]);
          });
          // console.log(this.three)

          this.callChart(this.three);
        }
      }
    });
  }

  ngOnInit() {}

  callChart(item) {
    // alert("hello")
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
    // this.destroy.next();
    this.subscription.unsubscribe();
  }
}
