import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { ignoreElements, tap } from 'rxjs/operators';
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
    const scrollEv$ = this._scrollDispatcher.scrolled(500).pipe(
      tap(() => {
        const bottom = this.viewportContainer?.measureScrollOffset();
        const start = this.viewportContainer?.getOffsetToRenderedContentStart();
        console.log(`Start: ${start}`, `Bottom: ${bottom}`);
        this.appStateSvc.dispatchFetch();
      }),
      ignoreElements()
    )
    this.viewModel$ = merge(this.appStateSvc.getViewModel(), scrollEv$);
  }
}
