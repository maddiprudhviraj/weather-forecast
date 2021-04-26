import { Component, VERSION } from "@angular/core";
import { DatePipe } from "@angular/common";
import { WeatherForecastEvent } from "./weather-forecast-event";
import { Observable, Subscription } from "rxjs";
import { WeatherForecastService } from "./weather-forecast.service";
import { Router } from "@angular/router";

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
    private weatherService: WeatherForecastService,
    private router: Router,
  ) {
    this.subscription = this.weatherService.apptrackFlag.subscribe(data => {
      this.mainCall = data;
      // console.log(this.mainCall);
    });
  }

  getToday(): string {
   return new Date().toISOString().split('T')[0]
}

  ngOnInit() {
    this._weatherForecastEvent.getWeatherInfo();
  }

  changeDate(selectedDate){
    // alert("1"+JSON.stringify(selectedDate))
    this._weatherForecastEvent.getWeatherInfo(selectedDate);
    // this.selectedDate = 
  }

   navigate(flag: any) {
    //  alert(flag)
    this.router.navigateByUrl(flag);
  }

  // receiveMessage($event) {
  //   this.message = $event;
  //   this._weatherForecastEvent.hitBasedOnChart(this.message);
  //   // alert(this.message);
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
