import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCardDetailsComponent } from './about-card-details.component';

describe('AboutCardDetailsComponent', () => {
  let component: AboutCardDetailsComponent;
  let fixture: ComponentFixture<AboutCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCardDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
