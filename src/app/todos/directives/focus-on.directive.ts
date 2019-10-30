import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[focusOn]'
})
export class FocusOnDirective implements OnChanges {

  @Input('focusOn')
  focused: boolean;

  constructor(private elt: ElementRef<HTMLInputElement>) { }

  ngOnChanges() {
    if (this.focused) {
      this.elt.nativeElement.focus();
    }
  }
}
