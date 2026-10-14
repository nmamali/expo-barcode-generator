import { render } from '@testing-library/react-native';

import { Barcode } from '../index';

const findNodes = (node, type) => {
  if (!node || typeof node === 'string') {
    return [];
  }

  return [
    ...(node.type === type ? [node] : []),
    ...(node.children || []).flatMap(child => findNodes(child, type))
  ];
};

describe('Barcode on Expo SDK 57', () => {
  it('renders with omitted options using React 19 and the Expo SVG implementation', async () => {
    const { toJSON } = await render(<Barcode value="123456789" />);
    const svg = toJSON();
    const rects = findNodes(svg, 'RNSVGRect');

    expect(svg.props.width).toBeGreaterThan(20);
    expect(svg.props.height).toBe(142);
    expect(svg.props.rotation).toBe(0);
    expect(svg.props.vbWidth).toBe(svg.props.width);
    expect(svg.props.vbHeight).toBe(142);
    expect(rects[0].props.fill.payload >>> 0).toBe(0xffffffff);
    expect(rects.length).toBeGreaterThan(1);
    expect(findNodes(svg, 'RNSVGTSpan')[0].props.content).toBe('123456789');
  });

  it('preserves custom dimensions, colors, text and rotation', async () => {
    const { toJSON } = await render(
      <Barcode
        value="123456789"
        rotation={-5}
        options={{
          width: 3,
          height: 60,
          fontSize: 16,
          marginTop: 4,
          marginBottom: 6,
          background: 'lightblue',
          lineColor: '#123456',
          text: 'Custom label'
        }}
      />
    );

    const svg = toJSON();

    expect(svg.props.height).toBe(88);
    expect(svg.props.rotation).toBe(-5);
    expect(findNodes(svg, 'RNSVGRect')[0].props.fill.payload >>> 0).toBe(0xffadd8e6);
    expect(
      findNodes(svg, 'RNSVGGroup').some(node => node.props.fill.payload >>> 0 === 0xff123456)
    ).toBe(true);
    expect(findNodes(svg, 'RNSVGTSpan')[0].props.content).toBe('Custom label');
  });

  it('renders bars without text when displayValue is false', async () => {
    const { toJSON } = await render(
      <Barcode value="123456789" options={{ displayValue: false, background: '' }} />
    );

    const svg = toJSON();
    const rects = findNodes(svg, 'RNSVGRect');

    expect(svg.props.height).toBe(120);
    expect(findNodes(svg, 'RNSVGText')).toHaveLength(0);
    expect(rects.length).toBeGreaterThan(0);
    expect(rects.every(rect => rect.props.height === 100)).toBe(true);
  });

  it('retains the documented UPC format with multiple encoding chunks', async () => {
    const { toJSON } = await render(
      <Barcode value="123456789999" options={{ format: 'UPC', background: 'lightblue' }} />
    );
    const svg = toJSON();
    const texts = findNodes(svg, 'RNSVGTSpan');

    expect(findNodes(svg, 'RNSVGRect').length).toBeGreaterThan(1);
    expect(texts.length).toBeGreaterThan(1);
    expect(texts.map(text => text.props.content).join('')).toBe('123456789999');
  });

  it('updates the rendered barcode when the value changes', async () => {
    const { toJSON, rerender } = await render(<Barcode value="1234" />);
    const initialWidth = toJSON().props.width;

    await rerender(<Barcode value="123456789" />);

    expect(toJSON().props.width).toBeGreaterThan(initialWidth);
    expect(findNodes(toJSON(), 'RNSVGTSpan')[0].props.content).toBe('123456789');
  });
});
