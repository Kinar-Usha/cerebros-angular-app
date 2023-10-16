import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoboadvisorComponent } from './roboadvisor.component';

describe('RoboadvisorComponent', () => {
  let component: RoboadvisorComponent;
  let fixture: ComponentFixture<RoboadvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoboadvisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoboadvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
