import { Type } from '@angular/core';
import { Control } from 'rete';
import { AngularControl } from 'rete-angular-render-plugin';

import { NumberNgControl } from './num.component';

export class NumControl extends Control implements AngularControl {
  component: Type<NumberNgControl>;
  props: { [key: string]: unknown };

  constructor(
    public emitter: { trigger: (arg0: string) => void },
    public override key: string,
    readonly = false
  ) {
    super(key);

    this.component = NumberNgControl;
    this.props = {
      readonly,
      change: (ev: Event) => this.onChange(ev),
      value: 0,
      mounted: () => {
        this.setValue(+(this.getData(key) as any));
      },
    };
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.valueAsNumber;

    this.setValue(value);
    this.emitter.trigger('process');
  }

  setValue(value: number) {
    this.props['value'] = value;
    this.putData(this.key, this.props['value']);
  }
}
