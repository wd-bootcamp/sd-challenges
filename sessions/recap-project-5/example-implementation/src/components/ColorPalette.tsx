type ColorPaletteProps = {
  colors: string[];
};

export default function ColorPalette({ colors }: ColorPaletteProps) {
  return (
    <ul className="palette" aria-label="Color palette">
      {colors.map((color) => (
        <li key={color} style={{ backgroundColor: color }} title={color} />
      ))}
    </ul>
  );
}
