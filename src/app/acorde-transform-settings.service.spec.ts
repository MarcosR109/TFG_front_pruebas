import { TestBed } from '@angular/core/testing';

import { AcordeTransformSettingsService } from './acorde-transform-settings.service';

describe('AcordeTransformSettingsService', () => {
  let service: AcordeTransformSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcordeTransformSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
