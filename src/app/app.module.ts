import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SearchBarModule } from './shared-components/search-bar/search-bar.module';
import { AppComponent } from './app.component';
import { PexelsHttpInterceptor } from './services/http.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SearchBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
