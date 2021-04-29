import { Injectable } from "@angular/core";
import { WeatherReportService } from "./services/weather-report.service";
import moment from "moment";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { LoadingScreenService } from "./services/loading-screen.service";

@Injectable({
  providedIn: "root"
})
export class WeatherReportEvent {
  constructor(
    private _weatherService: WeatherReportService,
    private _loadingScreenService: LoadingScreenService,
    public snackBar: MatSnackBar
  ) {}

  getWeatherInfo(
    reportDays: number,
    forecastDays: number,
    selectedDate?: Date
  ) {
    this._loadingScreenService.startLoading();
    const generateDates = [...Array(8).keys()];
    let dynamicDates = [];
    generateDates.forEach(function(generateDate) {
      let date = moment(selectedDate)
        .subtract(reportDays, "days")
        .add(generateDate * forecastDays, "days")
        .format(
          "YYYY-MM-DD[T]" + ("0" + new Date().getHours()).substr(-2) + ":mm:ss"
        );
      dynamicDates.push(date);
    });
    this._weatherService.getWeatherReportHistory(...dynamicDates).subscribe(
      weatherDataResponse => {
        let weatherDataReport = [];
        weatherDataResponse.map(dateWeatherReport => {
          if (dateWeatherReport.items[0].forecasts) {
            dateWeatherReport.items[0].forecasts.map(
              (forecastData: {
                date: string;
                temperature: { low: number; high: number };
                relative_humidity: { low: number; high: number };
              }) => {
                weatherDataReport.push({
                  Date: forecastData.date,
                  temperature_low: forecastData.temperature.low,
                  temperature_high: forecastData.temperature.high,
                  humidity_low: forecastData.relative_humidity.low,
                  humidity_high: forecastData.relative_humidity.high
                });
              }
            );
          }
        });
        const updatedWeatherReport = weatherDataReport.reverse().slice(2);
        if (updatedWeatherReport.length === 0) {
          let config = new MatSnackBarConfig();
          let actionButtonLabel: string = "Retry";
          let action: boolean = true;
          config.verticalPosition = "top";
          config.horizontalPosition = "center";
          config.duration = 3000;
          this.snackBar.open(
            "Weather Report is not Available for selected date",
            action ? actionButtonLabel : undefined,
            config
          );
        }
        this._weatherService.weatherReport(updatedWeatherReport);

        this._loadingScreenService.stopLoading();
      },
      err => {
        this._loadingScreenService.stopLoading();
        console.log("HTTP Error", err);
      }
    );
  }
}
