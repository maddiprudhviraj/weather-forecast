import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { WeatherForecastService } from "../weather-forecast.service";

@Component({
  selector: "app-tabular-view",
  templateUrl: "./tabular-view.component.html",
  styleUrls: ["./tabular-view.component.css"]
})
export class TabularViewComponent implements OnInit {
  subscription: Subscription;

  columnDefs = [{ field: "Date" }, { field: "Low" }, { field: "High" }];

  rowData = [];

  defaultColDef = {
    flex: 1,
    sortable: true,
    resizable: true
  };

  constructor(
    private weatherService: WeatherForecastService,
    private router: Router
  ) {
    this.subscription = this.weatherService.trackWeatherReport.subscribe(
      data => {
        let currentRoute = this.router.url;
        if (data.length > 0) {
          this.rowData = [];
          if (currentRoute === "/temperature") {
            data.map(item => {
              this.rowData.push({
                Date: item.Date,
                Low: item.temperature_low,
                High: item.temperature_high
              });
            });
          } else {
            data.map(item => {
              this.rowData.push({
                Date: item.Date,
                Low: item.humidity_low,
                High: item.humidity_high
              });
            });
          }
        }
      }
    );
  }

  ngOnInit() {}
}
