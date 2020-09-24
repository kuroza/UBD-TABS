import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLecturerComponent } from './new-lecturer.component';

describe('NewLecturerComponent', () => {
  let component: NewLecturerComponent;
  let fixture: ComponentFixture<NewLecturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLecturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
