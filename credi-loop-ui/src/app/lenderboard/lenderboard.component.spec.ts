import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderboardComponent } from './lenderboard.component';

describe('LenderboardComponent', () => {
  let component: LenderboardComponent;
  let fixture: ComponentFixture<LenderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LenderboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LenderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
