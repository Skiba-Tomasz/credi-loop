import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderboardModalComponent } from './lenderboard-modal.component';

describe('LenderboardModalComponent', () => {
  let component: LenderboardModalComponent;
  let fixture: ComponentFixture<LenderboardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LenderboardModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LenderboardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
