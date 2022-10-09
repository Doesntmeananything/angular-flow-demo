import { Component, Input, OnInit } from '@angular/core';

@Component({
  template: ` <input
    type="number"
    [value]="value"
    [readonly]="readonly"
    (change)="change($event)"
  />`,
  styles: [
    `
      input {
        border-radius: 4px;
        background-color: white;
        padding: 2px 6px;
        border: 1px solid #999;
        font-size: 110%;
        width: 140px;
        box-sizing: border-box;
      }
    `,
  ],
})
export class NumberNgControl implements OnInit {
  @Input() value: number = 0;
  @Input() readonly: boolean = false;
  @Input() change: Function = () => {};
  @Input() mounted: Function = () => {};

  ngOnInit() {
    this.mounted();
  }
}
