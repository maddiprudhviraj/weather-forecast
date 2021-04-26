import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { WeatherForecastService } from "../weather-forecast.service";

@Component({
  selector: "app-tabular-view",
  templateUrl: "./tabular-view.component.html",
  styleUrls: ["./tabular-view.component.css"]
})
export class TabularViewComponent implements OnInit {
  subscription: Subscription;

  columnDefs = [{ field: "Date" }, { field: "Low" }, { field: "High" }];

  // rowData: {
  //   Date: string;
  //   Low: number;
  //   High: number;

  // }[];

  // rowData = [];

  rowData = [{ Date: "21-21-2", Low: 342, High: 35000 }];
  // rowData = []
  temperatureData1: string;
  one: any;
  two: any;
  three: any;

  constructor(
    private weatherService: WeatherForecastService,
    private router: Router
  ) {
    //     this.subscription = this.weatherService.trackFlag.subscribe(data => {
    //       console.log(this.router.url);
    //       this.temperatureData1 = this.router.url;
    //       if (data.length > 0) {
    //         console.log(JSON.stringify(data));
    //         // console.log(JSON.stringify(data[1]));
    //         // console.log(JSON.stringify(data[2]));
    //       this.rowData =  data.map((item)=>{
    // item.map((ind)=>{
    //  {
    // ind
    //   }
    // })
    //         })
    //         console.log(JSON.stringify(this.rowData))
    //         this.one = data[0];
    //         this.two = data[1];
    //         this.three = data[2];
    //         if (this.temperatureData1 === "/temperature") {
    //           this.callTable(this.two);
    //         } else {
    //           this.callTable(this.three);
    //         }
    //       }
    //     });
  }

  callTable(item) {}

  ngOnInit() {}
}
