import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNotAllowNumber]'
})
export class NotAllowNumberDirective {

  constructor(
    public ngControl: NgControl
  ) { }
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[0-9]/g, '');
    this.ngControl.control?.setValue(sanitizedValue, { emitEvent: false });
  }
}
