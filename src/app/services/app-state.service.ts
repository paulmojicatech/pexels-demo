import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, merge, Observable, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap, take, tap, throttleTime } from 'rxjs/operators';

import { AppViewModel, Photo } from '../models/app.interface';
import { PexelsHttpService } from '../services/pexels-http.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  readonly INITIAL_STATE: AppViewModel = {
    searchQuery: '',
    gridItems: [],
    photos: [],
    currentPage: 0,
    errorMessage: null,
    nextPageUrl: '',
    previousPageUrl: '',
    totalResults: 0
  };

  private _viewModelSub$ = new BehaviorSubject<AppViewModel>(this.INITIAL_STATE);
  viewModel$ = this._viewModelSub$.asObservable();

  constructor(private _pexelsHttpSvc: PexelsHttpService) { }

  getViewModel(): Observable<AppViewModel> {
    return this.viewModel$.pipe(
      startWith(this.INITIAL_STATE)
    );
  }

  handleSearchInputChanged(searchQuery: string): void {
    const currentState = this._viewModelSub$.getValue();
    const { currentPage, photos } = currentState;
    const nextPage = !photos.length ? 0 : currentPage + 1;
    /* We fetch our photos, update our state, then unsubscribe
       to the created subscription to prevent memory leaks
    */
    this._pexelsHttpSvc.fetchPhotos(nextPage, searchQuery).subscribe(fetchResponse => {
      const { nextPageUrl, previousPageUrl, totalResults } = fetchResponse;
        this._viewModelSub$.next({
          ...currentState,
          photos: fetchResponse.photos,
          nextPageUrl,
          previousPageUrl,
          totalResults,
          currentPage: !!photos.length ? currentPage + 1 : 1
        });
      
    });
  }

}
