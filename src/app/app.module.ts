import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HighchartsChartModule } from "highcharts-angular";
import { AgGridModule } from "ag-grid-angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AppRoutingModule } from "./app-routing.module";
import { ChartViewComponent } from "./chart-view/chart-view.component";
import { TabularViewComponent } from "./tabular-view/tabular-view.component";
import { TemperatureReportComponent } from "./temperature-report/temperature-report.component";
import { HumidityReportComponent } from "./humidity-report/humidity-report.component";
import { HeaderComponent } from "./header/header.component";
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
    NgbModule,
    MatSnackBarModule
  ],
  declarations: [
    AppComponent,
    TabularViewComponent,
    ChartViewComponent,
    TemperatureReportComponent,
    HumidityReportComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent],
  providers: [
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
