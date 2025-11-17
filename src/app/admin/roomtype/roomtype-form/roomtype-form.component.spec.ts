import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomtypeFormComponent } from './roomtype-form.component';

describe('RoomtypeFormComponent', () => {
  let component: RoomtypeFormComponent;
  let fixture: ComponentFixture<RoomtypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomtypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomtypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
