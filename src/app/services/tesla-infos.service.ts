import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TeslaModel} from "./tesla-model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeslaInfosService {

  private httpClient: HttpClient = inject(HttpClient);

  public getModels(): Observable<TeslaModel[]> {
    return this.httpClient.get<TeslaModel[]>('/models');
  }
}
