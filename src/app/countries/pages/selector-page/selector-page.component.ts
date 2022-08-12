import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { switchMap, tap } from "rxjs/operators";

import { CountriesService } from '../../services/countries.service';
import { Country, CountryByCode } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  myForm!: FormGroup;
  price = new FormControl(10000);

  // Llenar selectores
  regions: string[] = [];
  countries: Country[] = [];
  borders: string[] = [];

  // UI
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {
    this.myForm = this.fb.group({
      price_mask: ['', [Validators.required]],
      region: ['', [Validators.required]],
      country: ['', [Validators.required]],
      borders: ['', [Validators.required]],
    })
  }

  set control(value: AbstractControl | string) {
    if (this.myForm.controls['price_mask'] !== value) {
      this.myForm.controls['price_mask'] = value as FormControl;
    }
  }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;

    // Cuando cambie la region o continente
    this.myForm.get('region')?.valueChanges.
    pipe(
      tap(() => {
        this.myForm.get('country')?.reset('');
        this.myForm.get('borders')?.disable();
        this.loading = true;
      }), // Para resetear el segundo selector cuando cambio el primero
      switchMap(region => this.countriesService.getCountriesPerRegion(region))
    ).subscribe(countries => {
      this.loading = false;
      this.countries = countries;
    });

    // Cuando cambie el país
    this.myForm.get('country')?.valueChanges
    .pipe(
      tap(() => {
        this.borders = [];
        this.myForm.get('borders')?.reset('');
        this.myForm.get('borders')?.enable();
        this.loading = true;
      }),
      switchMap(code => this.countriesService.getCountryByAlphaCode(code))
    )
    .subscribe(country => {
      this.loading = false;
      if (country.length > 0) {
        this.borders = country[0].borders;
      }
    })
  }

  save() {
    console.log(this.myForm.value);
  }

}
