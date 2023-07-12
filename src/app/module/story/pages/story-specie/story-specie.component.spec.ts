import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorySpecieComponent } from './story-specie.component';

describe('StorySpecieComponent', () => {
  let component: StorySpecieComponent;
  let fixture: ComponentFixture<StorySpecieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorySpecieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorySpecieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
