import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSpecieDetailComponent } from './travel-specie-detail.component';

describe('TravelSpecieDetailComponent', () => {
  let component: TravelSpecieDetailComponent;
  let fixture: ComponentFixture<TravelSpecieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelSpecieDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelSpecieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
