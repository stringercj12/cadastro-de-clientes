import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective {

  constructor(private el: ElementRef, private control: NgControl, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const cleanValue = value.replace(/[^\d]/g, '');

    if (cleanValue.length <= 11) {
      const formattedValue = this.formatCpf(cleanValue);
      this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
      this.control.control?.setValue(cleanValue);
    } else {
      this.control.control?.setValue(cleanValue.substring(0, 11));
    }
  }

  private formatCpf(value: string): string {
    const part1 = value.substring(0, 3);
    const part2 = value.substring(3, 6);
    const part3 = value.substring(6, 9);
    const part4 = value.substring(9, 11);

    let formattedValue = '';

    if (part1) formattedValue += part1 + '.';
    if (part2) formattedValue += part2 + '.';
    if (part3) formattedValue += part3 + '-';
    if (part4) formattedValue += part4;

    return formattedValue;
  }
}
