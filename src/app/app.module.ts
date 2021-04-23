import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { TabularViewComponent } from "./tabular-view/tabular-view.component";
import { AgGridModule } from "ag-grid-angular";
import { WeatherForecastService } from "./weather-forecast.service";
import { HighChartsComponent } from "./high-charts/high-charts.component";
import { HttpClientModule } from "@angular/common/http";
import { HighchartsChartModule } from 'highcharts-angular';
import { DatePipe } from "@angular/common";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    HighchartsChartModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    TabularViewComponent,
    HighChartsComponent
  ],
  bootstrap: [AppComponent],
  providers: [WeatherForecastService,DatePipe]
})
export class AppModule {}
