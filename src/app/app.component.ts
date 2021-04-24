import { Component, VERSION } from "@angular/core";
import { DatePipe } from "@angular/common";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  constructor(public datepipe: DatePipe) {}
}
