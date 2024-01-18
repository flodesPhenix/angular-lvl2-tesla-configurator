import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {TeslaConfiguratorService} from "../services/tesla-configurator.service";
import {TeslaModel} from "../models/tesla-model";
import {TeslaOptionConfig} from "../models/tesla-option-config";
import {TeslaModelColor} from "../models/tesla-model-color";
import {Router} from "@angular/router";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component implements OnInit {

  selectedModel: TeslaModel | undefined;
  selectedConfig: TeslaOptionConfig | undefined;
  selectedColor: TeslaModelColor | undefined;
  towHitch: boolean | undefined;
  yoke: boolean | undefined;

  private router: Router = inject(Router);
  private teslaConfiguratorService: TeslaConfiguratorService = inject(TeslaConfiguratorService);

  ngOnInit(): void {
    this.selectedModel = this.teslaConfiguratorService.getSelectedModel();
    this.selectedConfig = this.teslaConfiguratorService.getSelectedOption();
    this.selectedColor = this.teslaConfiguratorService.getSelectedColor();
    this.towHitch = this.teslaConfiguratorService.getTowHitch();
    this.yoke = this.teslaConfiguratorService.getYoke();

    if (!this.selectedModel || !this.selectedConfig || !this.selectedColor) {
      this.router.navigate(['/']);
    }
  }

  get totalCost(): number {
    let total: number = 0;
    if (this.selectedColor) {
      total += this.selectedColor.price;
    }

    if (this.selectedConfig) {
      total += this.selectedConfig.price;
    }

    if (this.towHitch) {
      total += 1000;
    }

    if (this.yoke) {
      total += 1000;
    }

    return total;
  }
}
