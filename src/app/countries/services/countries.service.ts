import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country, CountryByCode } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private URL: string = 'https://restcountries.com/v3.1';
  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions]; // Desestructurarlo para crear una copia
  }

  constructor(private http: HttpClient) { }

  getCountriesPerRegion(region: string): Observable<Country[]> {
    const url: string = `${this.URL}/region/${region}?fields=name,cca3`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(code: string): Observable<CountryByCode[] | []> {
    if (!code) {
      return of([]);
    }
    const url: string = `${this.URL}/alpha?codes=${code}`;
    return this.http.get<CountryByCode[]>(url);
  }
}
