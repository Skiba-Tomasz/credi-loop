import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrediScoreComponent } from './credi-score.component';

describe('CrediScoreComponent', () => {
  let component: CrediScoreComponent;
  let fixture: ComponentFixture<CrediScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrediScoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrediScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
