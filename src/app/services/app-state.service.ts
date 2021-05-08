import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, EMPTY, merge, Observable, Subject, throwError } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap, take, tap, throttleTime } from 'rxjs/operators';
import { PhotoViewerComponent } from '../components/photo-viewer/photo-viewer.component';

import { AppViewModel, Photo } from '../models/app.interface';
import { PexelsHttpService } from '../services/pexels-http.service';
import { TableColumnMetadata, TableMetadata, TableRowDataType, TableRowMetadata } from '../shared-components/table/models/table.interface';

@Injectable()
export class AppStateService {

  readonly INITIAL_STATE: AppViewModel = {
    searchQuery: '',
    tableMetadata: null,
    photos: [],
    currentPage: 0,
    nextPageUrl: '',
    totalResults: 0
  };

  private _viewModelSub$ = new BehaviorSubject<AppViewModel>(this.INITIAL_STATE);
  viewModel$ = this._viewModelSub$.asObservable();

  constructor(private _pexelsHttpSvc: PexelsHttpService, private _snackBar: MatSnackBar, private _matDialog: MatDialog) { }

  getViewModel(): Observable<AppViewModel> {
    return this.viewModel$.pipe(
      startWith(this.INITIAL_STATE)
    );
  }

  handleSearchInputChanged(searchQuery: string): void {
    const currentState = this._viewModelSub$.getValue();
    /* We fetch our photos, then transform it to table metadata
       to pass to our generic table component.  There is no need
       to unsubscribe as HTTP calls are automatically completed
       after execution
    */
    this._pexelsHttpSvc.fetchPhotos(1, searchQuery).pipe(
      catchError((err: string) => this.handleError(err))
    ).subscribe(fetchResponse => {
      const { nextPageUrl, totalResults, currentPage, photos } = fetchResponse;
      const tableMetadata = this.createTableMetadata(photos);
        this._viewModelSub$.next({
          ...currentState,
          photos: fetchResponse.photos,
          nextPageUrl,
          totalResults,
          tableMetadata,
          currentPage,
          searchQuery
        });
    });
  }

  dispatchFetch(): void {
    const currentState = this._viewModelSub$.getValue();
    const { currentPage, nextPageUrl, searchQuery, photos } = currentState;
    if (!!nextPageUrl) {
      this._pexelsHttpSvc.fetchPhotos(currentPage, searchQuery).pipe(
        catchError(err => this.handleError(err))
      ).subscribe((photosResp) => {
        const udpatedTableMetadata = this.createTableMetadata(photosResp.photos);
        const updatedPhotos = photos.concat(photosResp.photos);
        this._viewModelSub$.next({
          ...currentState,
          photos: updatedPhotos, 
          nextPageUrl: photosResp.nextPageUrl, 
          currentPage: photosResp.currentPage + 1,
          tableMetadata: udpatedTableMetadata
        });
      });
    }
  }

  openPhotoDetails(id: number): void {
    const photo = this._viewModelSub$.getValue().photos.find(photoInst => photoInst.id === id);
    this._matDialog.open(PhotoViewerComponent, {
      data: {
        photographer: photo.photographer,
        imageUrl: photo.src.large
      }
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

  private handleError(err: string): Observable<never> {
    this._snackBar.open(err, 'Dismiss', {
      duration: 3000
    });
    return EMPTY;
  }

}
