import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingSimulatorComponent } from './typing-simulator.component';

describe('TypingSimulatorComponent', () => {
  let component: TypingSimulatorComponent;
  let fixture: ComponentFixture<TypingSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypingSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypingSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
