import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[CpfCnpjMask]',
})
export class CpfCnpjMaskDirective {
  control = inject(NgControl)
  constructor(private el: ElementRef) {}
  @HostListener('keyup', ['$event.target.value'])
  onKeyUp(value: string) {
    const cleanValue = value.replace(/[^\d]/g, '');
    let formattedValue = '';

    if (cleanValue.length <= 11) {
      this.control.control?.setValue(cleanValue, { emitEvent: false });
      formattedValue = this.CpfRegEx(cleanValue);
    } else {
      formattedValue = this.CnpjRegEx(cleanValue);
    }
    if(cleanValue.length == 12){
    }
   
    this.el.nativeElement.value = formattedValue;
  }

  private CpfRegEx(cpf: string): string {
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  }

  private CnpjRegEx(cnpj: string): string {
    cnpj = cnpj.replace(/(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    return cnpj;
  }
}

//regex para pattern validators
export const CpfCnpjREGEX =
  /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/;