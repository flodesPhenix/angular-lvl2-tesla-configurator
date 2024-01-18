import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TeslaConfiguratorService} from "../services/tesla-configurator.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-configurator-step',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './configurator-step.component.html',
  styleUrl: './configurator-step.component.scss'
})
export class ConfiguratorStepComponent implements OnInit {

  step2Disabled: boolean = true;
  step3Disabled: boolean = true;

  private destroyedRef: DestroyRef = inject(DestroyRef);
  private teslaConfiguratorService: TeslaConfiguratorService = inject(TeslaConfiguratorService);

  ngOnInit(): void {
    this.step2Disabled = this.teslaConfiguratorService.getSelectedColor() == undefined;
    this.teslaConfiguratorService.getStepToActivated()
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe(stepToActivate => {
        switch (stepToActivate) {
          case 2:
            this.step2Disabled = false;
            this.step3Disabled = true;
            break;
          case 3:
            this.step2Disabled = false;
            this.step3Disabled = false;
            break;
          default:
            this.step2Disabled = true;
            this.step3Disabled = true;
            break;
        }
      });
  }

}
