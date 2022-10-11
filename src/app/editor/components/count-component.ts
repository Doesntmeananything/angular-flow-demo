// @ts-nocheck
import { Component, Input, Output } from 'rete';

import { CountService } from '../../count.service';

import { numSocket } from '../sockets';
import { NumControl } from '../controls/number-control';

export class CountComponent extends Component {
  override data: any;

  constructor(private countService: CountService) {
    super('Count');
  }

  async builder(node: {
    addInput: (arg0: Input) => {
      (): any;
      new (): any;
      addInput: {
        (arg0: Input): {
          (): any;
          new (): any;
          addControl: {
            (arg0: NumControl): {
              (): any;
              new (): any;
              addOutput: { (arg0: Output): void; new (): any };
            };
            new (): any;
          };
        };
        new (): any;
      };
    };
  }) {
    const out = new Output('num', 'Number', numSocket);

    node
      .addControl(new NumControl(this.editor, 'preview', true))
      .addOutput(out);
  }

  async worker(
    node: { data: { num: number }; id: number },
    outputs: { num: number }
  ) {
    let count = 0;

    try {
      await this.countService.getCount().forEach((next) => {
        count = next.count;
      });
    } catch (error) {
      console.error(error);
    }

    const ctrl = this.editor.nodes
      .find((n) => n.id === node.id)
      .controls.get('preview') as NumControl;
    ctrl.setValue(count);

    outputs['num'] = count;
  }
}
