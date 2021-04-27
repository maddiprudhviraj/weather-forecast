import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TabularViewComponent } from "./tabular-view/tabular-view.component";
import { AgGridModule } from "ag-grid-angular";
import { WeatherReportService } from "./weather-report.service";
import { HighChartsComponent } from "./high-charts/high-charts.component";
import { HttpClientModule } from "@angular/common/http";
import { HighchartsChartModule } from "highcharts-angular";
import { DatePipe } from "@angular/common";
import { TemperatureChartComponent } from "./temperature-chart/temperature-chart.component";
import { HumidityChartComponent } from "./humidity-chart/humidity-chart.component";
import { WeatherReportEvent } from "./weather-report-event";
import { AppRoutingModule } from "./app-routing.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    HighchartsChartModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    TabularViewComponent,
    HighChartsComponent,
    TemperatureChartComponent,
    HumidityChartComponent,
    
  ],
  bootstrap: [AppComponent],
  providers: [WeatherReportService, DatePipe, WeatherReportEvent]
})
export class AppModule {}
