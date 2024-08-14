import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  AfterViewInit,
  Input,
} from '@angular/core';

@Directive({
  selector: '[tableHeight]',
  standalone: true
})
export class TableHeightDirective implements AfterViewInit {
  @Input() minHeight: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.setHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.setHeight();
  }

  private setHeight() {
    let height =
      this.el.nativeElement.closest('.content-c4c').offsetHeight - 155;

    if (this.minHeight && height < this.minHeight) {
      height = this.minHeight;
    }

    this.renderer.setStyle(this.el.nativeElement, 'height', `${height}px`);
  }
}
