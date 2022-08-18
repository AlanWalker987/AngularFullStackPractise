import { TestBed } from '@angular/core/testing';

import { SuperHeroServiceService } from './super-hero-service.service';

describe('SuperHeroServiceService', () => {
  let service: SuperHeroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
