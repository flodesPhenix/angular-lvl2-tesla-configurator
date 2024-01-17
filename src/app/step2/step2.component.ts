import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {TeslaInfosService} from "../services/tesla-infos.service";
import {TeslaConfiguratorService} from "../services/tesla-configurator.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TeslaModel} from "../models/tesla-model";
import {TeslaOption} from "../models/tesla-option";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TeslaOptionConfig} from "../models/tesla-option-config";
import {CurrencyPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component implements OnInit {

  isVisible: boolean = false;

  selectedModel: TeslaModel | undefined;
  options: TeslaOption | undefined;

  selectedConfig: TeslaOptionConfig | undefined;

  private destroyedRef: DestroyRef = inject(DestroyRef);
  private teslaConfiguratorService: TeslaConfiguratorService = inject(TeslaConfiguratorService);
  private teslaInfosService: TeslaInfosService = inject(TeslaInfosService);

  ngOnInit(): void {
    this.teslaConfiguratorService.getStepToActivated()
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe(stepToActivated => {
        this.isVisible = stepToActivated == 2;
      });

    this.teslaConfiguratorService.getSelectedModel().pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe(model => {
        if (model != this.selectedModel) {
          this.selectedModel = model;
          this.selectedConfig = undefined;

          this.teslaInfosService.getOptionsById(this.selectedModel.code)
            .pipe(takeUntilDestroyed(this.destroyedRef))
            .subscribe(options => {
              this.options = options;
            });
        }
      });
  }

  chooseAConfig(modelSelected: MatSelectChange): void {
    if (this.options) {
      this.selectedConfig = this.options.configs.find(config => config.id == modelSelected.value);
    }
  }
}
