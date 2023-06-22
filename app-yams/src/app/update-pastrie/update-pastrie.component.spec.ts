import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePastrieComponent } from './update-pastrie.component';

describe('UpdatePastrieComponent', () => {
  let component: UpdatePastrieComponent;
  let fixture: ComponentFixture<UpdatePastrieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePastrieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePastrieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
