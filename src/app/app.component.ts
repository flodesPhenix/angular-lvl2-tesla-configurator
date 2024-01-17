import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {ConfiguratorStepComponent} from "./configurator-step/configurator-step.component";
import {Step1Component} from "./step1/step1.component";
import {Step2Component} from "./step2/step2.component";
import {Step3Component} from "./step3/step3.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterOutlet, ConfiguratorStepComponent, Step2Component, Step1Component, Step3Component],
  templateUrl: './app.component.html'
})
export class AppComponent {

}
