
let tinycolor = require('./tinycolor2');

module.exports = {
    simpleCheckForValidColor: function(data) {
        let keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'a', 'v'];
        let checked = 0;
        let passed = 0;
        for (let i = 0; i < keysToCheck.length; i++) {
            let letter = keysToCheck[i];
            if (data[letter]) {
                checked++;
                if (!isNaN(data[letter])) {
                    passed++;
                }
            }
        }

        if (checked === passed) {
            return data;
        }
    },

    toState: function(data, oldHue) {
        let color = tinycolor(data);
        let hsl = color.toHsl();
        let hsv = color.toHsv();
        if (hsl.s === 0) {
            hsl.h = oldHue || 0;
            hsv.h = oldHue || 0;
        }

        return {
            hsl: hsl,
            hex: color.toHex(),
            rgb: color.toRgb(),
            hsv: hsv,
            oldHue: data.h || oldHue || hsl.h
        };
    },

    isValidHex: function(hex) {
        return tinycolor(hex).isValid();
    }
};
