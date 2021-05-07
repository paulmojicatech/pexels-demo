import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppViewModel } from './models/app.interface';

import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'pmt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [ AppStateService ] // this is a localized service for this component only
})
export class AppComponent implements OnInit {

  viewModel$: Observable<AppViewModel>;

  constructor(public appStateSvc: AppStateService) {}

  ngOnInit(): void {
    this.viewModel$ = this.appStateSvc.getViewModel();
  }
}
