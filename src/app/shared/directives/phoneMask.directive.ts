import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[PhoneMask]',
})
export class PhoneMaskDirective {
  private el = inject(ElementRef)
  private control = inject(NgControl)

  @HostListener('keyup', ['$event.target.value'])
  onInputChange(value: string) {
    let phoneNumberClean = value.replace(/\D/g, '');
    let phoneNumber = ''
   
    if (phoneNumberClean.length === 10) {
        this.control.control?.setValue(phoneNumberClean)
      phoneNumber = phoneNumberClean.replace(
        /^(\d{2})(\d{4})(\d{4})$/,
        '($1) $2-$3'
      );
      this.el.nativeElement.value = phoneNumber;
      //celular
    } else if (phoneNumberClean.length === 11) {
        this.control.control?.setValue(phoneNumberClean)
      phoneNumber = phoneNumberClean.replace(
        /^(\d{2})(\d{5})(\d{4})$/,
        '($1) $2-$3'
      );
      this.el.nativeElement.value = phoneNumber;
    }

   
  }
}