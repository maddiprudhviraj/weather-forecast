import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TemperatureReportComponent } from "./temperature-report/temperature-report.component";
import { HumidityReportComponent } from "./humidity-report/humidity-report.component";

const routes: Routes = [
  { path: "temperature", component: TemperatureReportComponent },
  { path: "humidity", component: HumidityReportComponent },
  { path: "", redirectTo: "/temperature", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
