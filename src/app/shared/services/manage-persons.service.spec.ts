import { TestBed } from '@angular/core/testing';

import { ManagePersonsService } from './manage-persons.service';

describe('ManagePersonsService', () => {
  let service: ManagePersonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePersonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
