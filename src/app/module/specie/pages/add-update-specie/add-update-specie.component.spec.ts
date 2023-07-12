import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSpecieComponent } from './add-update-specie.component';

describe('AddUpdateSpecieComponent', () => {
  let component: AddUpdateSpecieComponent;
  let fixture: ComponentFixture<AddUpdateSpecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateSpecieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateSpecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
