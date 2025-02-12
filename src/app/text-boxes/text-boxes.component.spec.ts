import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBoxesComponent } from './text-boxes.component';

describe('TextBoxesComponent', () => {
  let component: TextBoxesComponent;
  let fixture: ComponentFixture<TextBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextBoxesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
