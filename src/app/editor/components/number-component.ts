// @ts-nocheck
import { Component, Output } from 'rete';

import { numSocket } from '../sockets';
import { NumControl } from '../controls/number-control';

export class NumComponent extends Component {
  constructor() {
    super('Number');
  }

  builder(node) {
    const out1 = new Output('num', 'Number', numSocket);

    return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
  }

  worker(
    node: { data: { num: any } },
    inputs: any,
    outputs: { [x: string]: any }
  ) {
    outputs['num'] = node.data.num;
  }
}
