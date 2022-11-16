import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeSummaryComponent } from './poke-summary.component';

describe('PokeSummaryComponent', () => {
  let component: PokeSummaryComponent;
  let fixture: ComponentFixture<PokeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
