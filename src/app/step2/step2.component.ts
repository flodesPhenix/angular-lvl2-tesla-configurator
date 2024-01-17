import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {TeslaInfosService} from "../services/tesla-infos.service";
import {TeslaConfiguratorService} from "../services/tesla-configurator.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TeslaModel} from "../models/tesla-model";
import {TeslaOption} from "../models/tesla-option";
import {TeslaOptionConfig} from "../models/tesla-option-config";
import {CurrencyPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component implements OnInit {

  selectedModel: TeslaModel | undefined;
  options: TeslaOption | undefined;

  selectedConfig: TeslaOptionConfig | undefined;
  selectedConfigId: number | undefined;

  private destroyedRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  private teslaConfiguratorService: TeslaConfiguratorService = inject(TeslaConfiguratorService);
  private teslaInfosService: TeslaInfosService = inject(TeslaInfosService);

  ngOnInit(): void {
    this.selectedModel = this.teslaConfiguratorService.getSelectedModel();
    if (this.selectedModel) {
      this.selectedConfig = this.teslaConfiguratorService.getSelectedOption();
      if (this.selectedConfig) {
        this.selectedConfigId = this.selectedConfig.id;
      }

      this.teslaInfosService.getOptionsById(this.selectedModel.code)
        .pipe(takeUntilDestroyed(this.destroyedRef))
        .subscribe(options => {
          this.options = options;
        });
    } else {
      this.router.navigate(['/']);
    }
  }

  chooseAConfig(configSelected: string): void {
    if (this.options) {
      this.selectedConfig = this.options.configs.find(config => config.id == Number(configSelected));
      if (this.selectedConfig) {
        this.teslaConfiguratorService.setSelectedOption(this.selectedConfig);
        this.teslaConfiguratorService.getStepToActivated().next(3);
      }
    }
  }
}
