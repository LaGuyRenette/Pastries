import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePastriesComponent } from './create-pastries.component';

describe('CreatePastriesComponent', () => {
  let component: CreatePastriesComponent;
  let fixture: ComponentFixture<CreatePastriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePastriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePastriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
