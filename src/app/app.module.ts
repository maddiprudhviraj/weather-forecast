import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TabularViewComponent } from "./tabular-view/tabular-view.component";
import { AgGridModule } from "ag-grid-angular";
import { WeatherReportService } from "./services/weather-report.service";
import { ChartViewComponent } from "./chart-view/chart-view.component";
import { HttpClientModule } from "@angular/common/http";
import { HighchartsChartModule } from "highcharts-angular";
import { DatePipe } from "@angular/common";
import { TemperatureReportComponent } from "./temperature-report/temperature-report.component";
import { HumidityReportComponent } from "./humidity-report/humidity-report.component";
import { WeatherReportEvent } from "./weather-report-event";
import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Weather_Forecast_Days, Weather_Report_Days } from "./injection.tokens";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    HighchartsChartModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    TabularViewComponent,
    ChartViewComponent,
    TemperatureReportComponent,
    HumidityReportComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    WeatherReportService,
    DatePipe,
    WeatherReportEvent,
    {
      provide: Weather_Report_Days,
      useValue: 30
    },
    {
      provide: Weather_Forecast_Days,
      useValue: 4
    }
  ]
})
export class AppModule {}
