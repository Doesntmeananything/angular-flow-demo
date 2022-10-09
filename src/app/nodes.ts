export interface Node {
  id: string;
  type: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export const nodes: Node[] = [
  {
    id: 'output',
    type: 'output',
    data: { label: 'Output' },
    position: { x: 200, y: 100 },
  },
  {
    id: 'color',
    type: 'colorpicker',
    data: { label: 'Text color' },
    position: { x: 0, y: 0 },
  },
  {
    id: 'content',
    type: 'input',
    data: { label: 'Text color' },
    position: { x: 0, y: 100 },
  },
];
