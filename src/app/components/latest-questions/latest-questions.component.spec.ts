import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestQuestionsComponent } from './latest-questions.component';

describe('LatestQuestionsComponent', () => {
  let component: LatestQuestionsComponent;
  let fixture: ComponentFixture<LatestQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
