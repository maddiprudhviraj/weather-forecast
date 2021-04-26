import { Component, VERSION } from "@angular/core";
import { DatePipe } from "@angular/common";
import { WeatherForecastEvent } from "./weather-forecast-event";
import { Observable, Subscription } from "rxjs";
import { WeatherForecastService } from "./weather-forecast.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  subscription: Subscription;
  message: string;
  mainCall: string;

  constructor(
    private _weatherForecastEvent: WeatherForecastEvent,
    private weatherService: WeatherForecastService
  ) {
    this.subscription = this.weatherService.apptrackFlag.subscribe(data => {
      this.mainCall = data;
      console.log(this.mainCall);
    });
  }

  ngOnInit() {
    this._weatherForecastEvent.getWeatherInfo();
  }

  receiveMessage($event) {
    this.message = $event;
    this._weatherForecastEvent.hitBasedOnChart(this.message);
    // alert(this.message);
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
