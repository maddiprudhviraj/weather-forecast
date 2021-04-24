import { Component, OnInit } from "@angular/core";
import { WeatherForecastService } from "../weather-forecast.service";
import * as Highcharts from "highcharts";
import addMore from "highcharts/highcharts-more";
addMore(Highcharts);
import moment from "moment";

@Component({
  selector: "app-high-charts",
  templateUrl: "./high-charts.component.html",
  styleUrls: ["./high-charts.component.css"]
})
export class HighChartsComponent implements OnInit {
  highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(private weatherService: WeatherForecastService) {
    // var sub30 = moment()
    //   .subtract(30, "days")
    //   .format("YYYY-MM-DD[T]HH:mm:ss");
    // console.log(sub30);

    const listOfIntervals = [0, 1, 2, 3, 4, 5, 6, 7];
    let addFour = [];
    let addTemp = [];

    listOfIntervals.forEach(function(interval) {
      let currentLoop = moment()
        .subtract(30, "days")
        .add(interval * 4, "days")
        .format("YYYY-MM-DD[T]HH:mm:ss");
      addFour.push(currentLoop);
    });
    this.weatherService.getFourForecastData(...addFour).subscribe(
      forecastWeatherInfo => {
        console.log("Hello" + JSON.stringify(forecastWeatherInfo));
        let addFourOne = [];

        forecastWeatherInfo.map(individual => {
          if (individual.items[0].forecasts) {
            individual.items[0].forecasts.map(fore => {
              addFourOne.push(fore.date);
              addTemp.push([fore.temperature.low, fore.temperature.high]);
            });
          }
        });
        console.log(addTemp);

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
            categories: addFourOne
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
              data: addTemp
            }
          ]
        };
      },
      err => {
        console.log("HTTP Error", err);
      }
    );
  }

  ngOnInit() {}
}
