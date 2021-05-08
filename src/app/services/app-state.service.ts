import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, EMPTY, merge, Observable, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap, take, tap, throttleTime } from 'rxjs/operators';

import { AppViewModel, Photo } from '../models/app.interface';
import { PexelsHttpService } from '../services/pexels-http.service';
import { TableColumnMetadata, TableMetadata, TableRowDataType, TableRowMetadata } from '../shared-components/table/models/table.interface';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  readonly INITIAL_STATE: AppViewModel = {
    searchQuery: '',
    tableMetadata: null,
    photos: [],
    currentPage: 0,
    errorMessage: null,
    nextPageUrl: '',
    previousPageUrl: '',
    totalResults: 0
  };

  private _viewModelSub$ = new BehaviorSubject<AppViewModel>(this.INITIAL_STATE);
  viewModel$ = this._viewModelSub$.asObservable();

  constructor(private _pexelsHttpSvc: PexelsHttpService, private _domSanitizer: DomSanitizer) { }

  getViewModel(): Observable<AppViewModel> {
    return this.viewModel$.pipe(
      startWith(this.INITIAL_STATE)
    );
  }

  handleSearchInputChanged(searchQuery: string): void {
    const currentState = this._viewModelSub$.getValue();
    const { currentPage, photos } = currentState;
    const nextPage = !photos.length ? 0 : currentPage + 1;
    /* We fetch our photos, then transform it to table metadata
       to pass to our generic table component.  There is no need
       to unsubscribe as HTTP calls are automatically completed
       after execution
    */
    this._pexelsHttpSvc.fetchPhotos(nextPage, searchQuery).subscribe(fetchResponse => {
      const { nextPageUrl, previousPageUrl, totalResults } = fetchResponse;
      const tableMetadata = this.createTableMetadata(photos);
        this._viewModelSub$.next({
          ...currentState,
          photos: fetchResponse.photos,
          nextPageUrl,
          previousPageUrl,
          totalResults,
          currentPage: !!photos.length ? currentPage + 1 : 1,
          tableMetadata
        });
    });
  }

  private createTableMetadata(photos: Photo[]): TableMetadata {
    const columns: TableColumnMetadata[] = [
      {
        id: 'photo',
        label: 'Photo',
        position: 1
      },
      {
        id: 'photographer',
        label: 'Photographer',
        position: 2,
        isHidden: true
      }
    ];
    const rows = photos.map((photo) => {
      return {
        Photo: 
          {
            id: `${photo.id}`,
            dataType: TableRowDataType.IMAGE,
            displayValue: photo.src.tiny
          },
        Photographer: {
          id: photo.photographer,
          dataType: TableRowDataType.STRING,
          displayValue: photo.photographer
        }
      };
    })
    return {
      columns,
      rows
    };
  }

}
