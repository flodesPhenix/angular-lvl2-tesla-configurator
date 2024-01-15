import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {ConfiguratorStepComponent} from "./configurator-step/configurator-step.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterOutlet, ConfiguratorStepComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

}
