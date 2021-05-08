import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchBarModule } from './shared-components/search-bar/search-bar.module';
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
    MatSnackBarModule,
    SearchBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
