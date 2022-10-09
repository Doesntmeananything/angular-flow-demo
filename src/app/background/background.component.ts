import { Component } from '@angular/core';

@Component({
  selector: 'app-background',
  template: `
    <svg>
      <pattern
        id="dots"
        x="0"
        y="0"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
        patternTransform="translate(-0.5, -0.5)"
      >
        <circle cx="0.5" cy="0.5" r="0.5" fill="#91919a" />
      </pattern>

      <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)"></rect>
    </svg>
  `,
  styles: [
    `
      svg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        cursor: grab;
      }
    `,
  ],
})
export class BackgroundComponent {}
