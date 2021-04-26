import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-humidity-chart",
  templateUrl: "./humidity-chart.component.html",
  styleUrls: ["./humidity-chart.component.css"]
})
export class HumidityChartComponent implements OnInit {
  

  // @Output() messageEvent = new EventEmitter<string>();

  constructor() {
    // alert("hd comp");
  }

  ngOnInit() {
    
  }
}
