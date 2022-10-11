import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NodeEditor, Engine } from 'rete';

import { AngularRenderPlugin } from 'rete-angular-render-plugin';
// @ts-ignore NOTE: no types are available for this library
import AreaPlugin from 'rete-area-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';

import { NumComponent } from './components/number-component';
import { AddComponent } from './components/add-component';
import { SquareComponent } from './components/square-component';
import { CountComponent } from './components/count-component';
import { CountService } from '../count.service';

@Component({
  selector: 'app-editor',
  template: `
    <div class="wrapper">
      <div #nodeEditor class="node-editor">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .wrapper {
        width: 100%;
        height: 100%;
      }
      .socket.number {
        background: #96b38a;
      }
    `,
  ],
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('nodeEditor')
  el!: ElementRef;
  editor = null;

  constructor(private countService: CountService) {}

  async ngAfterViewInit() {
    const container = this.el.nativeElement;

    const components = [
      new NumComponent(),
      new AddComponent(),
      new SquareComponent(),
      new CountComponent(this.countService),
    ];

    const editor = new NodeEditor('demo@0.2.0', container);
    editor.use(ConnectionPlugin);
    console.log('AngularRenderPlugin', AngularRenderPlugin);
    editor.use(AngularRenderPlugin);
    editor.use(ContextMenuPlugin);

    const engine = new Engine('demo@0.2.0');

    components.map((c) => {
      editor.register(c as any);
      engine.register(c as any);
    });

    const n1 = await components[0].createNode({ num: 2 });
    const n2 = await components[0].createNode({ num: 0 });
    const add = await components[1].createNode();
    const square = await components[2].createNode();
    const count = await components[3].createNode({
      num: this.countService.getCount(),
    });

    n1.position = [80, 200];
    n2.position = [80, 400];
    add.position = [400, 240];
    square.position = [700, 240];
    count.position = [700, 480];

    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(add);
    editor.addNode(square);
    editor.addNode(count);

    editor.connect(n1.outputs.get('num')!, add.inputs.get('num1')!);
    editor.connect(n2.outputs.get('num')!, add.inputs.get('num2')!);

    editor.on(
      [
        'process',
        'nodecreated',
        'noderemoved',
        'connectioncreated',
        'connectionremoved',
      ],
      async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
      }
    );

    editor.view.resize();
    editor.trigger('process');
    AreaPlugin.zoomAt(editor);
  }
}
