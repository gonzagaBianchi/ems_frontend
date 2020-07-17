import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePersonsComponent } from './manage-persons.component';

describe('ManagePersonsComponent', () => {
  let component: ManagePersonsComponent;
  let fixture: ComponentFixture<ManagePersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
