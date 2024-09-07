import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowGraphComponent } from './borrow-graph.component';

describe('BorrowGraphComponent', () => {
  let component: BorrowGraphComponent;
  let fixture: ComponentFixture<BorrowGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
