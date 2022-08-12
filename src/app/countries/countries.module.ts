import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CountriesRoutingModule } from './countries-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    SelectorPageComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CountriesRoutingModule,
    CurrencyMaskModule
  ],
  providers: [],
})
export class CountriesModule { }
