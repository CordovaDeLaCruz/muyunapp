import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecieMainComponent } from './specie-main.component';

describe('SpecieMainComponent', () => {
  let component: SpecieMainComponent;
  let fixture: ComponentFixture<SpecieMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecieMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecieMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
