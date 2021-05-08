import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { SearchBarModule } from './shared-components/search-bar/search-bar.module';
import { TableModule } from './shared-components/table/table.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    SearchBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
