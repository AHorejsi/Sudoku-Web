class RgbColor {
    red: number;
    green: number;
    blue: number;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    toString() {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
}

function _hsvToRgb(hue: number, saturation: number, value: number): RgbColor {
    const h_i = Math.floor(hue * 6);
    const f = hue * 6 - h_i;
    const p = value * (1 - saturation);
    const q = value * (1 - f * saturation);
    const t = value * (1 - (1 - f) * saturation);

    let red = -1;
    let green = -1;
    let blue = -1;

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

    const finalRed = Math.floor(red * 256);
    const finalGreen = Math.floor(green * 256);
    const finalBlue = Math.floor(blue * 256);

    return new RgbColor(finalRed, finalGreen, finalBlue);
}

function generateDistinctRgbColors(colorsNeeded: number): RgbColor[] {
    const goldenRatioConjugate = (Math.sqrt(5) - 1) / 2;
    const saturation = 0.5;
    const value = 0.95;

    const colors = Array<RgbColor>(colorsNeeded);
    let currentHue = Math.random();

    for (let index = 0; index < colorsNeeded; ++index) {
        colors[index] = _hsvToRgb(currentHue, saturation, value);

        currentHue += goldenRatioConjugate;
        currentHue %= 1;
    }

    return colors;
}

export { RgbColor, generateDistinctRgbColors };
