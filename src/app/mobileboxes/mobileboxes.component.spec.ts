import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileboxesComponent } from './mobileboxes.component';

describe('MobileboxesComponent', () => {
  let component: MobileboxesComponent;
  let fixture: ComponentFixture<MobileboxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileboxesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
