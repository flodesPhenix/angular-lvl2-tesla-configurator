import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TeslaModel} from "../models/tesla-model";
import {Observable} from "rxjs";
import {TeslaOption} from "../models/tesla-option";

@Injectable({
  providedIn: 'root'
})
export class TeslaInfosService {

  private httpClient: HttpClient = inject(HttpClient);

  public getModels(): Observable<TeslaModel[]> {
    return this.httpClient.get<TeslaModel[]>('/models');
  }

  public getOptionsById(id: string): Observable<TeslaOption> {
    return this.httpClient.get<TeslaOption>('/options/' + id);
  }
}
