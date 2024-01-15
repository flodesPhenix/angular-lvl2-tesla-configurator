import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorStepComponent } from './configurator-step.component';

describe('ConfiguratorStepComponent', () => {
  let component: ConfiguratorStepComponent;
  let fixture: ComponentFixture<ConfiguratorStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguratorStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
