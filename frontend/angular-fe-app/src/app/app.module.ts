import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetAppNamesComponent } from './get-app-names/get-app-names.component';

@NgModule({
  declarations: [
    AppComponent,
    GetAppNamesComponent
  ],
  imports: [
    BrowserModule,
    DxButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
