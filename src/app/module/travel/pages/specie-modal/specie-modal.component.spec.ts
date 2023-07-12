import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecieModalComponent } from './specie-modal.component';

describe('SpecieModalComponent', () => {
  let component: SpecieModalComponent;
  let fixture: ComponentFixture<SpecieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecieModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
