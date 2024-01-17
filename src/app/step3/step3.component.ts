import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TeslaConfiguratorService} from "../services/tesla-configurator.service";

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component implements OnInit {

  isVisible: boolean = false;

  private destroyedRef: DestroyRef = inject(DestroyRef);
  private teslaConfiguratorService: TeslaConfiguratorService = inject(TeslaConfiguratorService);

  ngOnInit(): void {
    this.teslaConfiguratorService.getStepToActivated()
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe(stepToActivated => {
        this.isVisible = stepToActivated == 3;
      });
  }
}
