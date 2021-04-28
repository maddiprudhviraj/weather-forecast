import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-temperature-report",
  templateUrl: "./temperature-report.component.html",
  styleUrls: ["./temperature-report.component.css"]
})
export class TemperatureReportComponent implements OnInit {
  trackReport = "temperature"
  constructor() {}

  ngOnInit() {}
}
