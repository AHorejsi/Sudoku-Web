function _hsvToRgb(hue: number, saturation: number, value: number): [number, number, number] {
    const h_i = Math.floor(hue * 6);
    const f = hue * 6 - h_i;
    const p = value * (1 - saturation);
    const q = value * (1 - f * saturation);
    const t = value * (1 - (1 - f) * saturation);

    let red = null;
    let green = null;
    let blue = null;

    switch (h_i) {
    case 0:
        red = value;
        green = t;
        blue = p;

        break;
    case 1:
        red = q;
        green = value;
        blue = p;

        break;
    case 2:
        red = p;
        green = value;
        blue = t;

        break;
    case 3:
        red = p;
        green = q;
        blue = value;

        break;
    case 4:
        red = t;
        green = p;
        blue = value;

        break;
    case 5:
        red = value;
        green = p;
        blue = q;

        break;
    }

    return [Math.floor(red! * 256), Math.floor(green! * 256), Math.floor(blue! * 256)];
}

function generateDistinctRgbColors(maxColorsNeeded: number): string[] {
    const goldenRatioConjugate = (Math.sqrt(5) - 1) / 2;
    const colors = Array<string>(maxColorsNeeded);
    let currentHue = Math.random();

    for (let index = 0; index < maxColorsNeeded; ++index) {
        const [red, green, blue] = _hsvToRgb(currentHue, 0.5, 0.95);

        colors[index] = `rgb(${red}, ${green}, ${blue})`;

        currentHue += goldenRatioConjugate;
        currentHue %= 1;
        currentHue = Math.abs(currentHue);
    }

    alert(colors);

    return colors;
}

export { generateDistinctRgbColors };
