import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { debounceTime, ignoreElements, tap, throttleTime } from 'rxjs/operators';
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
  viewportContainer: CdkVirtualScrollViewport;

  viewModel$: Observable<AppViewModel>;

  constructor(public appStateSvc: AppStateService, private _scrollDispatcher: ScrollDispatcher) {}

  ngOnInit(): void {
    const scrollEv$ = this._scrollDispatcher.scrolled().pipe(
      debounceTime(1000),
      tap(() => {
        this.appStateSvc.dispatchFetch();
      }),
      ignoreElements()
    )
    this.viewModel$ = merge(this.appStateSvc.getViewModel(), scrollEv$);
  }
}
