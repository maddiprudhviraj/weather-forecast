import { Component, Inject } from "@angular/core";
import { WeatherReportEvent } from "./weather-report-event";
import { Subscription } from "rxjs";
import { LoadingScreenService } from "./services/loading-screen.service";
import { Weather_Forecast_Days, Weather_Report_Days } from "./injection.tokens";

@Component({
  selector: "weather-report",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  loading: boolean = false;
  loadingSubscription: Subscription;
  showDashBoard: boolean = false;

  constructor(
    private _weatherReportEvent: WeatherReportEvent,
    private _loadingScreenService: LoadingScreenService,
    @Inject(Weather_Report_Days) private _weather_Report_Days: number,
    @Inject(Weather_Forecast_Days) private _weather_Forecast_Days: number
  ) {}

  ngOnInit() {
    this._weatherReportEvent.getWeatherInfo(
      this._weather_Report_Days,
      this._weather_Forecast_Days
    );
    this.loadingSubscription = this._loadingScreenService.loadingStatus.subscribe(
      (value: boolean) => {
        this.loading = value;
        this.showDashBoard = true;
      }
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
