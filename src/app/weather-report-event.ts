import { Inject, Injectable } from "@angular/core";
import { WeatherReportService } from "./services/weather-report.service";
import moment from "moment";
import { LoadingScreenService } from "./services/loading-screen.service";

@Injectable()
export class WeatherReportEvent {
  constructor(
    private weatherService: WeatherReportService,
    private loadingScreenService: LoadingScreenService
  ) {}

  getWeatherInfo(
    reportDays: number,
    forecastDays: number,
    selectedDate?: Date
  ) {
    this.loadingScreenService.startLoading();
    // const generateDates = [0, 1, 2, 3, 4, 5, 6, 7];
    const generateDates = [...Array(8).keys()];
    let dynamicDates = [];
    generateDates.forEach(function(generateDate) {
      let date = moment(selectedDate)
        .subtract(reportDays, "days")
        .add(generateDate * forecastDays, "days")
        .format("YYYY-MM-DD[T]" + new Date().getHours() + ":mm:ss");
      dynamicDates.push(date);
    });
    this.weatherService.getWeatherReportHistory(...dynamicDates).subscribe(
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
        this.weatherService.weatherReport(updatedWeatherReport);
        this.loadingScreenService.stopLoading();
      },
      err => {
        this.loadingScreenService.stopLoading();
        console.log("HTTP Error", err);
      }
    );
  }
}
