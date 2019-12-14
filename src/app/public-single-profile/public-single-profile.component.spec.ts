import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSingleProfileComponent } from './public-single-profile.component';

describe('PublicSingleProfileComponent', () => {
  let component: PublicSingleProfileComponent;
  let fixture: ComponentFixture<PublicSingleProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicSingleProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSingleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
