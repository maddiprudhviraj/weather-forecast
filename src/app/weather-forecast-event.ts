import { Injectable, Input } from "@angular/core";
import { WeatherForecastService } from "./weather-forecast.service";
import moment from "moment";

@Injectable()
export class WeatherForecastEvent {
  constructor(private weatherService: WeatherForecastService) {}

  addTemp = [];
  addHumidity = [];
  addFourOne = [];

  getWeatherInfo() {
    const listOfIntervals = [0, 1, 2, 3, 4, 5, 6, 7];
    let addFour = [];
    listOfIntervals.forEach(function(interval) {
      let currentLoop = moment()
        .subtract(30, "days")
        .add(interval * 4, "days")
        .format("YYYY-MM-DD[T]HH:mm:ss");
      addFour.push(currentLoop);
    });
    this.weatherService.getFourForecastData(...addFour).subscribe(
      forecastWeatherInfo => {
        // console.log("Hello" + JSON.stringify(forecastWeatherInfo));

        forecastWeatherInfo.map(individual => {
          if (individual.items[0].forecasts) {
            individual.items[0].forecasts.map(fore => {
              this.addFourOne.push(fore.date);
              this.addTemp.push([fore.temperature.low, fore.temperature.high]);
              this.addHumidity.push([
                fore.relative_humidity.low,
                fore.relative_humidity.high
              ]);
            });
          }
        });
        // this.weatherService.appchangeFlag("ItsoK");
        const dynamicData = this.addTemp;
        const hunData = this.addHumidity;
        this.weatherService.changeFlag([this.addFourOne, dynamicData,hunData]);
        // console.log(addTemp);
      },
      err => {
        console.log("HTTP Error", err);
      }
    );
  }

  // hitBasedOnChart(tempOrHum) {
  // alert(tempOrHum);
  // console.log("1111");
  // const dynamicData = tempOrHum === "temp" ? this.addTemp : this.addHumidity;

  // if (this.temperatureData === "temp") {
  //   const dynamicData = addTemp;
  // } else if (this.temperatureData === "humidity") {
  //   const dynamicData = addHumidity;
  // }

  // console.log(this.addFourOne, dynamicData);

  // this.weatherService.changeFlag([this.addFourOne, dynamicData]);
  // console.log("2222");
  //}
}
