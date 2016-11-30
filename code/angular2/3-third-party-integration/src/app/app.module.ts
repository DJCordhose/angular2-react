import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import NVD3Chart from './nvd.chart.component';
import {SquareBoxComponent} from "./square-box/square-box.component";

@NgModule({
  declarations: [
    AppComponent,
    NVD3Chart,
    SquareBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
