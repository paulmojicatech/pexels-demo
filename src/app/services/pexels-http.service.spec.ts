import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { PARSED_MOCK_RESPONSE, PEXELS_MOCK_RESPONSE } from '../mockdata/pexels-http-mockdata.spec';

import { PexelsHttpService } from './pexels-http.service';

describe('PexelsHttpService', () => {
  let service: PexelsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PexelsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse the http response correctly', fakeAsync(() => {
    const httpSvcSpy = spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(of(PEXELS_MOCK_RESPONSE));
    service.fetchPhotos(0, 'a').subscribe(response => {
      expect(response).toEqual(PARSED_MOCK_RESPONSE, 'http response was not properly parsed');
    })
    tick();
    flushMicrotasks();
  }))
});
