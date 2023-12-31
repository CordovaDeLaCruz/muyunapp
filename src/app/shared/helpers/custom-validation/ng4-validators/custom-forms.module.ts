import { NgModule } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

import { arrayLength } from './array-length/validator';
import { base64 } from './base64/validator';
import { creditCard } from './credit-card/validator';
import { date } from './date/validator';
import { dateISO } from './date-iso/validator';
import { digits } from './digits/validator';
import { ngvemail } from './ngvemail/validator';
import { equal } from './equal/validator';
import { equalTo } from './equal-to/validator';
import { gt } from './greater-than/validator';
import { gte } from './greater-than-equal/validator';
import { json } from './json/validator';
import { lt } from './less-than/validator';
import { lte } from './less-than-equal/validator';
import { max } from './max/validator';
import { maxDate } from './max-date/validator';
import { minDate } from './min-date/validator';
import { notEqual } from './not-equal/validator';
import { notEqualTo } from './not-equal-to/validator';
import { number } from './number/validator';
import { property } from './property/validator';
import { range } from './range/validator';
import { rangeLength } from './range-length/validator';
import { uuid } from './uuid/validator';
import { url } from './url/validator';

import { ArrayLengthValidator } from './array-length/directive';
import { Base64Validator } from './base64/directive';
import { CreditCardValidator } from './credit-card/directive';
import { DateValidator } from './date/directive';
import { DateISOValidator } from './date-iso/directive';
import { DigitsValidator } from './digits/directive';
import { EmailValidator } from './ngvemail/directive';
import { EqualValidator } from './equal/directive';
import { EqualToValidator } from './equal-to/directive';
import { GreaterThanValidator } from './greater-than/directive';
import { GreaterThanEqualValidator } from './greater-than-equal/directive';
import { JSONValidator } from './json/directive';
import { LessThanValidator } from './less-than/directive';
import { LessThanEqualValidator } from './less-than-equal/directive';
import { MaxValidator } from './max/directive';
import { MaxDateValidator } from './max-date/directive';
import { MinDateValidator } from './min-date/directive';
import { NotEqualValidator } from './not-equal/directive';
import { NotEqualToValidator } from './not-equal-to/directive';
import { NumberValidator } from './number/directive';
import { PropertyValidator } from './property/directive';
import { RangeValidator } from './range/directive';
import { RangeLengthValidator } from './range-length/directive';
import { UrlValidator } from './url/directive';
import { UUIDValidator } from './uuid/directive';

export const CustomValidators = {
  arrayLength,
  base64,
  creditCard,
  date,
  dateISO,
  digits,
  ngvemail,
  equal,
  equalTo,
  gt,
  gte,
  json,
  lt,
  lte,
  max,
  maxDate,
  minDate,
  notEqual,
  notEqualTo,
  number,
  property,
  range,
  rangeLength,
  url,
  uuid
};

const CustomDirectives = [
  ArrayLengthValidator,
  Base64Validator,
  CreditCardValidator,
  DateValidator,
  DateISOValidator,
  DigitsValidator,
  EmailValidator,
  EqualValidator,
  EqualToValidator,
  GreaterThanValidator,
  GreaterThanEqualValidator,
  JSONValidator,
  LessThanValidator,
  LessThanEqualValidator,
  MaxValidator,
  MaxDateValidator,
  MinDateValidator,
  NotEqualValidator,
  NotEqualToValidator,
  NumberValidator,
  PropertyValidator,
  RangeValidator,
  RangeLengthValidator,
  UrlValidator,
  UUIDValidator
];

@NgModule({
  declarations: [CustomDirectives],
  exports: [CustomDirectives]
})
export class CustomFormsModule { }
