# Expo Barcode Generator

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

This is a React Native component that generates barcodes using the JSBarcode library and renders them using the react-native-svg package. The component supports Expo Web, iOS and Android.

## Expo Compatibility

Version 6 supports the latest stable Expo SDK 57 (React 19.2 and React Native 0.86),
as well as SDKs 53–56. `react-native-svg` is a peer dependency so your app can use
the version that matches its Expo SDK, including in Expo Go and New Architecture builds.

Install it with `npx expo install react-native-svg` rather than choosing its version manually.
Expo SDK 57 currently recommends `react-native-svg` 15.15.4. See the
[Expo SVG documentation](https://docs.expo.dev/versions/v57.0.0/sdk/svg/) and
[SDK 57 release notes](https://expo.dev/changelog/sdk-57).

> 💡 Version 5 remains available for Expo SDK 53

> 💡 For Expo SDK 52, use version 4

> 💡 For Expo SDK 51, use version 3

> 💡 For Expo SDK 50, use version 2

> 💡 For Expo SDK 49 and under, use version 1

## Installation

### NPM:

```shell
npm i expo-barcode-generator
npx expo install react-native-svg
```

### YARN:

```shell
yarn add expo-barcode-generator
yarn expo install react-native-svg
```

## Usage

```jsx
import React from 'react';
import { View } from 'react-native';
import { Barcode } from 'expo-barcode-generator';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Barcode
        value="123456789999"
        options={{ format: 'UPC', background: 'lightblue' }}
        rotation={-5}
      />
    </View>
  );
}
```

## Options

`options` and `rotation` are optional. For example, `<Barcode value="123456789" />`
renders a CODE128 barcode with the defaults below. Pass `background: 'transparent'`
for a transparent background.

The options object allows you to customize the appearance and behavior of the barcode. The available options are as follows:

| Option       | Description                                                                                   | Default Value |
| ------------ | --------------------------------------------------------------------------------------------- | ------------- |
| value        | The value to be encoded into the barcode. (required)                                          | -             |
| width        | The width of each barcode unit.                                                               | 2             |
| height       | The height of the barcode.                                                                    | 100           |
| displayValue | A boolean indicating whether to display the value as text below the barcode.                  | true          |
| fontOptions  | The font options for the displayed text.                                                      | 'bold'        |
| text         | The text to be displayed below the barcode.                                                   | ''            |
| textAlign    | The alignment of the displayed text. Possible values: 'left', 'center', 'right'.              | 'center'      |
| textPosition | The position of the displayed text relative to the barcode. Possible values: 'top', 'bottom'. | 'bottom'      |
| textMargin   | The margin between the barcode and the displayed text.                                        | 2             |
| fontSize     | The font size of the displayed text.                                                          | 20            |
| background   | The background color of the barcode.                                                          | '#ffffff'     |
| lineColor    | The color of the barcode lines.                                                               | '#000000'     |
| marginTop    | The top margin of the barcode.                                                                | 10            |
| marginBottom | The bottom margin of the barcode.                                                             | 10            |
| marginLeft   | The left margin of the barcode.                                                               | 10            |
| marginRight  | The right margin of the barcode.                                                              | 10            |
| rotation     | The rotation angle of the barcode in degrees.                                                 | -             |

## Supported Barcodes

The following barcodes are supported by this library:

- CODE128
- CODE128 (automatic mode switching)
- CODE128 A/B/C (force mode)
- EAN
- EAN-13
- EAN-8
- EAN-5
- EAN-2
- UPC (A)
- UPC (E)
- CODE39
- ITF
- ITF-14
- MSI
- MSI10
- MSI11
- MSI1010
- MSI1110
- Pharmacode
- Codabar

## Development

The development dependencies and test preset target Expo SDK 57.

```shell
npm ci
npm run lint:ci
npm test
npm run test:android
```
