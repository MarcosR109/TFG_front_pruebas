import { TestBed } from '@angular/core/testing';

import { PasswordmatchService } from './passwordmatch.service';

describe('PasswordmatchService', () => {
  let service: PasswordmatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordmatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
