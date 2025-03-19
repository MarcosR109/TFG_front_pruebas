import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionesMineComponent } from './canciones-mine.component';

describe('CancionesMineComponent', () => {
  let component: CancionesMineComponent;
  let fixture: ComponentFixture<CancionesMineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancionesMineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancionesMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
