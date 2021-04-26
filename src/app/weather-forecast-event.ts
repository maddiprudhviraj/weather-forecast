import { Injectable } from "@angular/core";
import { WeatherForecastService } from "./weather-forecast.service";
import moment from "moment";

@Injectable()
export class WeatherForecastEvent {
  constructor(private weatherService: WeatherForecastService) {}

  getWeatherInfo(selectedDate?: Date) {
    const generateDates = [0, 1, 2, 3, 4, 5, 6, 7];
    let dynamicDates = [];
    generateDates.forEach(function(generateDate) {
      let date = moment(selectedDate)
        .subtract(30, "days")
        .add(generateDate * 4, "days")
        .format("YYYY-MM-DD[T]HH:mm:ss");
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

        this.weatherService.weatherReport(weatherDataReport.reverse());
      },
      err => {
        console.log("HTTP Error", err);
      }
    );
  }
}
