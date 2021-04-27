import { Component, Inject } from "@angular/core";
import { WeatherReportEvent } from "./weather-report-event";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LoadingScreenService } from "./services/loading-screen.service";
import { Weather_Forecast_Days, Weather_Report_Days } from "./injection.tokens";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  isSelectedNewDate: boolean;
  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(
    private _weatherReportEvent: WeatherReportEvent,
    private router: Router,
    private loadingScreenService: LoadingScreenService,
    @Inject(Weather_Report_Days) private _weather_Report_Days: number,
    @Inject(Weather_Forecast_Days) private _weather_Forecast_Days: number
  ) {}

  disableFutureDates(): string {
    return new Date().toISOString().split("T")[0];
  }

  dateSelected() {
    this.isSelectedNewDate = true;
  }

  ngOnInit() {
    this._weatherReportEvent.getWeatherInfo(
      this._weather_Report_Days,
      this._weather_Forecast_Days
    );
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe(
      (value: boolean) => {
        this.loading = value;
      }
    );
  }

  changeDate(selectedDate: Date) {
    this._weatherReportEvent.getWeatherInfo(
      this._weather_Report_Days,
      this._weather_Forecast_Days,
      selectedDate
    );
  }

  navigatePage(redirect: string) {
    this.router.navigateByUrl(redirect);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
