import { TestBed } from '@angular/core/testing';

import { ActividadtipoService } from './actividadtipo.service';

describe('ActividadtipoService', () => {
  let service: ActividadtipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadtipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
