import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchBarModule } from './shared-components/search-bar/search-bar.module';
import { AppComponent } from './app.component';
import { PhotoViewerComponent } from './components/photo-viewer/photo-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    MatSnackBarModule,
    MatDialogModule,
    SearchBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
