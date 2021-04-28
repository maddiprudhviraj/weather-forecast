import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TemperatureReportComponent } from "./temperature-report/temperature-report.component";
import { HumidityReportComponent } from "./humidity-report/humidity-report.component";

const routes: Routes = [
  { path: "Temperature", component: TemperatureReportComponent },
  { path: "Humidity", component: HumidityReportComponent },
  { path: "", redirectTo: "/Temperature", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
