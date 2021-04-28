import { Component, Input, OnInit } from "@angular/core";
import { WeatherReportService } from "../services/weather-report.service";
import { Subscription } from "rxjs";
import * as Highcharts from "highcharts";
import addMore from "highcharts/highcharts-more";
import { WeatherReport } from "../../weather-report-model";

addMore(Highcharts);

@Component({
  selector: "app-chart-view",
  templateUrl: "./chart-view.component.html",
  styleUrls: ["./chart-view.component.css"]
})
export class ChartViewComponent implements OnInit {
  subscription: Subscription;
  @Input() trackReport: string;

  highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  weatherHistory: WeatherReport[];

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
      let xAxisDates = [];
      let weatherData = [];

      this.weatherHistory.map(weatherReport => {
        xAxisDates.push(weatherReport.Date);
        weatherData.push(
          trackReport === "Temperature"
            ? [weatherReport.temperature_low, weatherReport.temperature_high]
            : [weatherReport.humidity_low, weatherReport.humidity_high]
        );
      });

      this.displayWeatherReport(
        xAxisDates,
        weatherData,
        trackReport === "Temperature" ? "Temperature \xB0C" : "Humidity %"
      );
  }

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
        text: "Weather Status"
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
