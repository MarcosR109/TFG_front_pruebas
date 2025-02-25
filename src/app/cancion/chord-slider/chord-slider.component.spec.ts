import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordSliderComponent } from './chord-slider.component';

describe('ChordSliderComponent', () => {
  let component: ChordSliderComponent;
  let fixture: ComponentFixture<ChordSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
