import { Component, VERSION } from "@angular/core";
import { DatePipe } from "@angular/common";
import moment from "moment";
import { WeatherForecastService } from "./weather-forecast.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  constructor(
    public datepipe: DatePipe,
    private weatherService: WeatherForecastService
  ) {
    this.myFunction();
  }

  myFunction() {
    var sub30 = moment()
      .subtract(30, "days")
      .format("YYYY-MM-DD[T]HH:mm:ss");
    // console.log(sub30);

    const listOfIntervals = [0, 1, 2, 3, 4, 5, 6, 7];
    let addFour = [];

    listOfIntervals.forEach(function(interval) {
      let currentLoop = moment()
        .subtract(30, "days")
        .add(interval * 4, "days")
        .format("YYYY-MM-DD[T]HH:mm:ss");
      addFour.push(currentLoop);
    });

    // console.log(addFour);
    this.weatherService
      .getFourForecastData(...addFour)
      .subscribe(citiesWeatherInfo => {
        // console.log("Hello" + JSON.stringify(citiesWeatherInfo));
      });
  }
}
