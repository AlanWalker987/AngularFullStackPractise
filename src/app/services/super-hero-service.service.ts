import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroServiceService {

  constructor(private _http: HttpClient) { }

  public superHeroAPIUrl = environment.ApiUrl;

  getSuperHeroes(): Observable<any> {
    return this._http.get(`${this.superHeroAPIUrl}/api/SuperHero`);
  }

  postNewSuperHero(data: any) {
    return this._http.post(`${this.superHeroAPIUrl}/api/SuperHero`, data);
  }

  putSuperHero(data: any) {
    return this._http.put(`${this.superHeroAPIUrl}/api/SuperHero`, data);
  }

  deleteSuperHero(id: number) {
    return this._http.delete(`${this.superHeroAPIUrl}/api/SuperHero/${id}`);
  }
}
