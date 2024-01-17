import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {TeslaConfiguratorService} from "../services/tesla-configurator.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-configurator-step',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    FormsModule
  ],
  templateUrl: './configurator-step.component.html',
  styleUrl: './configurator-step.component.scss'
})
export class ConfiguratorStepComponent implements OnInit {

  stepSelected?: number;

  step2Disabled: boolean = true;
  step3Disabled: boolean = true;

  private destroyedRef: DestroyRef = inject(DestroyRef);
  private teslaConfiguratorService: TeslaConfiguratorService = inject(TeslaConfiguratorService);

  ngOnInit(): void {
    this.teslaConfiguratorService.getSelectedColor()
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe(() => {
        this.step2Disabled = false;
      });
  }

  onSelectedStep(): void {
    if (this.stepSelected) {
      this.teslaConfiguratorService.getStepToActivated().next(this.stepSelected);
    }
  }

}
