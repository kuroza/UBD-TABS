import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModuleComponent } from './view-module.component';

describe('ViewModuleComponent', () => {
  let component: ViewModuleComponent;
  let fixture: ComponentFixture<ViewModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
