import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecieRecordIdentifiedComponent } from './specie-record-identified.component';

describe('SpecieRecordIdentifiedComponent', () => {
  let component: SpecieRecordIdentifiedComponent;
  let fixture: ComponentFixture<SpecieRecordIdentifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecieRecordIdentifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecieRecordIdentifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
