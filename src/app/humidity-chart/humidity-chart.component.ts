import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-humidity-chart',
  templateUrl: './humidity-chart.component.html',
  styleUrls: ['./humidity-chart.component.css']
})
export class HumidityChartComponent implements OnInit {

  temperatureData = "humidity"

  constructor() { }

  ngOnInit() {
  }

}