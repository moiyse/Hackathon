import { TestBed } from '@angular/core/testing';

import { JeService } from './je.service';

describe('JeService', () => {
  let service: JeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
