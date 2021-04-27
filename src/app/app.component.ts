import { Component } from "@angular/core";
import { WeatherReportEvent } from "./weather-report-event";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LoadingScreenService } from "./loading-screen.service";

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
    private loadingScreenService: LoadingScreenService
  ) {}

  disableFutureDates(): string {
    return new Date().toISOString().split("T")[0];
  }

  dateSelected() {
    this.isSelectedNewDate = true;
  }

  ngOnInit() {
    this._weatherReportEvent.getWeatherInfo();
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe(
      value => {
        this.loading = value;
      }
    );
  }

  changeDate(selectedDate: Date) {
    this._weatherReportEvent.getWeatherInfo(selectedDate);
  }

  navigatePage(redirect: string) {
    this.router.navigateByUrl(redirect);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
