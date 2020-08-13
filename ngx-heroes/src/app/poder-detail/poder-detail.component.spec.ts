import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoderDetailComponent } from './poder-detail.component';

describe('PoderDetailComponent', () => {
  let component: PoderDetailComponent;
  let fixture: ComponentFixture<PoderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
