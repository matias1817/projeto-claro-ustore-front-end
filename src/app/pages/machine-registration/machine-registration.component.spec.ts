import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineRegistrationComponent } from './machine-registration.component';

describe('MachinesComponent', () => {
  let component: MachineRegistrationComponent;
  let fixture: ComponentFixture<MachineRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MachineRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 