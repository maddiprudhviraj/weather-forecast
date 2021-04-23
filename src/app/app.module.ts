import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { TabularViewComponent } from "./tabular-view/tabular-view.component";
import { AgGridModule } from "ag-grid-angular";

@NgModule({
  imports: [BrowserModule, FormsModule, AgGridModule.withComponents([])],
  declarations: [AppComponent, HelloComponent, TabularViewComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
