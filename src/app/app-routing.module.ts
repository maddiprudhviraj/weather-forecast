import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TemperatureChartComponent } from "./temperature-chart/temperature-chart.component";
import { HumidityChartComponent } from "./humidity-chart/humidity-chart.component";

const routes: Routes = [
  { path: "temperature", component: TemperatureChartComponent },
  { path: "humidity", component: HumidityChartComponent },
  { path: "", redirectTo: "/temperature", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
