import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPoderComponent } from './list-poder.component';

describe('ListPoderComponent', () => {
  let component: ListPoderComponent;
  let fixture: ComponentFixture<ListPoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
