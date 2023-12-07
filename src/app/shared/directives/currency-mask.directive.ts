import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]'
})
export class CurrencyMaskDirective {

  @Input() decimalLength = 2;

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const cleanValue = value.replace(/[^\d]/g, '');
    const intValue = parseInt(cleanValue, 10);

    if (!isNaN(intValue)) {
      const formattedValue = this.formatCurrency(intValue / Math.pow(10, this.decimalLength));
      this.control.control?.setValue(formattedValue);
    } else {
      this.control.control?.setValue(null);
    }
  }

  private formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: this.decimalLength,
      maximumFractionDigits: this.decimalLength
    });
  }
}
