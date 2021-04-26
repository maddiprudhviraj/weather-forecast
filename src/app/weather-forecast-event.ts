import { Injectable, Input } from "@angular/core";
import { WeatherForecastService } from "./weather-forecast.service";
import moment from "moment";

@Injectable()
export class WeatherForecastEvent {
  constructor(private weatherService: WeatherForecastService) {}

  addTemp = [];
  addHumidity = [];
  addFourOne = [];

  getWeatherInfo(selectedDate) {
    const listOfIntervals = [0, 1, 2, 3, 4, 5, 6, 7];
    let addFour = [];
    listOfIntervals.forEach(function(interval) {
      let currentLoop = moment(selectedDate)
        .subtract(30, "days")
        .add(interval * 4, "days")
        .format("YYYY-MM-DD[T]HH:mm:ss");
      addFour.push(currentLoop);
    });
    console.log("Der" + JSON.stringify(addFour));
    this.weatherService.getFourForecastData(...addFour).subscribe(
      forecastWeatherInfo => {
        this.addFourOne = [];
        forecastWeatherInfo.map(individual => {
          if (individual.items[0].forecasts) {
            individual.items[0].forecasts.map(fore => {
              this.addFourOne.push({
                Date: fore.date,
                temp_low: fore.temperature.low,
                temp_high: fore.temperature.high,
                hum_low: fore.relative_humidity.low,
                hum_high: fore.relative_humidity.high
              });
            });
          }
        });
        const dynamicData = this.addTemp;
        const hunData = this.addHumidity;

        this.weatherService.changeFlag(this.addFourOne);
      },
      err => {
        console.log("HTTP Error", err);
      }
    );
  }
}
