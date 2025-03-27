import { TestBed } from '@angular/core/testing';

import { AcordesTransformService } from './acordes-transform.service';

describe('AcordesTransformService', () => {
  let service: AcordesTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcordesTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
