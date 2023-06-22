import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastrieSampleComponent } from './pastrie-sample.component';

describe('PastrieSampleComponent', () => {
  let component: PastrieSampleComponent;
  let fixture: ComponentFixture<PastrieSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastrieSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastrieSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
