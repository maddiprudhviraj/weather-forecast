import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-temperature-chart",
  templateUrl: "./temperature-chart.component.html",
  styleUrls: ["./temperature-chart.component.css"]
})
export class TemperatureChartComponent implements OnInit {
  temperatureData = "temp";

  constructor() {}

  @Output() messageEvent = new EventEmitter<string>();

  ngOnInit() {
    console.log("raja"+this.temperatureData);
    this.messageEvent.emit(this.temperatureData);
  }
}
