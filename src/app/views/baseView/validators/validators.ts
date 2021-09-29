import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function IsExsiste(list:any[]):ValidatorFn{

  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = list.some(el=>el==control.value)
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };

}
