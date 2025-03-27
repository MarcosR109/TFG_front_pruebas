import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordeshowComponent } from './acordeshow.component';

describe('AcordeshowComponent', () => {
  let component: AcordeshowComponent;
  let fixture: ComponentFixture<AcordeshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcordeshowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcordeshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
