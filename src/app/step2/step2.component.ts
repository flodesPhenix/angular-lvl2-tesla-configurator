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
import {Router} from "@angular/router";

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

  selectedModel: TeslaModel | undefined;
  options: TeslaOption | undefined;

  selectedConfig: TeslaOptionConfig | undefined;

  private destroyedRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  private teslaConfiguratorService: TeslaConfiguratorService = inject(TeslaConfiguratorService);
  private teslaInfosService: TeslaInfosService = inject(TeslaInfosService);

  ngOnInit(): void {
    this.selectedModel = this.teslaConfiguratorService.getSelectedModel();
    if (this.selectedModel) {
      this.teslaInfosService.getOptionsById(this.selectedModel.code)
        .pipe(takeUntilDestroyed(this.destroyedRef))
        .subscribe(options => {
          this.options = options;
        });
    } else {
      this.router.navigate(['/']);
    }
  }

  chooseAConfig(modelSelected: MatSelectChange): void {
    if (this.options) {
      this.selectedConfig = this.options.configs.find(config => config.id == modelSelected.value);
      if (this.selectedConfig) {
        this.teslaConfiguratorService.getSelectedOption().next(this.selectedConfig);
      }
    }
  }
}
