import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-temperature-chart",
  templateUrl: "./temperature-chart.component.html",
  styleUrls: ["./temperature-chart.component.css"]
})
export class TemperatureChartComponent implements OnInit {
  temperatureData = "temp";

  constructor() {}

  ngOnInit() {}
}
