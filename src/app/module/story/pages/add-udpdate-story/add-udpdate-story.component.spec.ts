import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUdpdateStoryComponent } from './add-udpdate-story.component';

describe('AddUdpdateStoryComponent', () => {
  let component: AddUdpdateStoryComponent;
  let fixture: ComponentFixture<AddUdpdateStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUdpdateStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUdpdateStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
