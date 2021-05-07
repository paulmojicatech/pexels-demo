import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

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
});
