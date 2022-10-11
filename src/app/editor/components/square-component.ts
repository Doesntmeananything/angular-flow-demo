// @ts-nocheck
import { Component, Input, Output } from 'rete';

import { numSocket } from '../sockets';
import { NumControl } from '../controls/number-control';

export class SquareComponent extends Component {
  override data: any;
  constructor() {
    super('Square');
  }

  async builder(node) {
    const inp = new Input('num1', 'Number', numSocket);
    const out = new Output('num', 'Number', numSocket);

    inp.addControl(new NumControl(this.editor, 'num1'));

    node
      .addInput(inp)
      .addControl(new NumControl(this.editor, 'preview', true))
      .addOutput(out);
  }

  worker(
    node: { data: { num1: any }; id: number },
    inputs: { [x: string]: any[] },
    outputs: { [x: string]: any }
  ) {
    const n1 = inputs['num1'].length ? inputs['num1'][0] : node.data.num1;
    const square = n1 * n1;

    const ctrl = this.editor.nodes
      .find((n) => n.id === node.id)
      .controls.get('preview') as NumControl;
    ctrl.setValue(square);
    outputs['num'] = square;
  }
}
