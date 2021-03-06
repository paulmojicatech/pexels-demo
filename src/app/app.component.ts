import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, Observable } from 'rxjs';

import { AppViewModel } from './models/app.interface';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'pmt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AppStateService ] // this is a localized service for this component only
})
export class AppComponent implements OnInit {

  @ViewChild('viewportContainer')
  viewportContainer!: CdkVirtualScrollViewport;

  viewModel$!: Observable<AppViewModel>;

  constructor(public appStateSvc: AppStateService) {}

  ngOnInit(): void {
    this.viewModel$ = merge(this.appStateSvc.getViewModel());
  }
  
  viewportIndexChanged(): void {
    const end = this.viewportContainer.getRenderedRange().end;
    const total = this.viewportContainer.getDataLength();
    if (end === total) {
      this.appStateSvc.dispatchFetch();
    }
  }

}
