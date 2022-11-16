import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectonLoaderComponent } from './selecton-loader.component';

describe('SelectonLoaderComponent', () => {
  let component: SelectonLoaderComponent;
  let fixture: ComponentFixture<SelectonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectonLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
