import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-temperature-report",
  templateUrl: "./temperature-report.component.html",
  styleUrls: ["./temperature-report.component.css"]
})
export class TemperatureReportComponent implements OnInit {
  trackReport = "Temperature";
  constructor() {}

  ngOnInit() {}
}
