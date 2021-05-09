import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { MOCK_GRID_ITEMS } from '../mockdata/app-state-mockdata.spec';
import { PARSED_MOCK_RESPONSE } from '../mockdata/pexels-http-mockdata.spec';
import { AppViewModel } from '../models/app.interface';

import { AppStateService } from './app-state.service';
import { PexelsHttpService } from './pexels-http.service';

describe('AppStateService', () => {
  let service: AppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [
        AppStateService
      ]
    });
    service = TestBed.inject(AppStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the component state when search bar is handleSearchInputChanged is called', fakeAsync(() => {
    const httpSvcSpy = spyOn(TestBed.inject(PexelsHttpService), 'fetchPhotos').and.returnValue(of(PARSED_MOCK_RESPONSE));
    service.handleSearchInputChanged('a');
    tick();
    flushMicrotasks();
    const updatedValue = service['_viewModelSub$'].getValue();
    const expectedValue: AppViewModel = {
      ...service.INITIAL_STATE,
      currentPage: 1,
      nextPageUrl: 'test.com',
      totalResults: 1,
      photos: PARSED_MOCK_RESPONSE.photos,
      tableMetadata: MOCK_GRID_ITEMS,
      searchQuery: 'a'
    };
    expect(expectedValue).toEqual(updatedValue, 'app state not updated correctly');
  }));

});
