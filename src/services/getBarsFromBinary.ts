interface Bar {
  x: number;
  width: number;
}

export function getBarsFromBinary(binary: string, bitWidth: number) {
  const bars: Bar[] = [];

  let barWidth = 0;
  for (let i = 0; i < binary.length; i++) {
    if (binary[i] === '1') {
      // Increment the bar width for each consecutive '1'
      barWidth++;
    } else if (barWidth > 0) {
      // If a '0' is encountered and there was a bar being formed
      const width = bitWidth * barWidth;
      // Calculate the x position and width of the bar and add it to the bars array
      bars.push({
        x: i * bitWidth - width,
        width
      });
      // Reset the bar width for the next potential bar
      barWidth = 0;
    }
  }
  if (barWidth > 0) {
    // If the binary string ends with '1's, add the final bar
    const width = bitWidth * barWidth;
    bars.push({
      x: binary.length * bitWidth - width,
      width
    });
    barWidth = 0;
  }
  return bars;
}
