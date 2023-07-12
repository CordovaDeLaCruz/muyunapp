import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateRouteComponent } from './add-update-route.component';

describe('AddUpdateRouteComponent', () => {
  let component: AddUpdateRouteComponent;
  let fixture: ComponentFixture<AddUpdateRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
