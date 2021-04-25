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
addMore(Highcharts);

@Component({
  selector: "app-high-charts",
  templateUrl: "./high-charts.component.html",
  styleUrls: ["./high-charts.component.css"]
})
export class HighChartsComponent implements OnInit {
  message: string;
  subscription: Subscription;

  private destroy = new Subject();

  highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  one: any;
  two: any;

  @Input() temperatureData: string;
  lessons$: any;
  data1 = [];

  constructor(private weatherService: WeatherForecastService) {
    this.subscription = this.weatherService.trackFlag.pipe().subscribe(data => {
      // console.log("tempsdfdfffffffffffffffffffffffffff");

      this.one = data[0];
      this.two = data[1];

      this.callChart();
    });
  }

  ngOnInit() {}

  callChart() {
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
          data: this.two
        }
      ]
    };
  }

  ngOnDestroy() {
    this.destroy.next();
    this.subscription.unsubscribe();
  }
}
