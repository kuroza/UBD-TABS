import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestersComponent } from './semesters.component';

describe('SemestersComponent', () => {
  let component: SemestersComponent;
  let fixture: ComponentFixture<SemestersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemestersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
