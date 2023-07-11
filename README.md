# Expo Barcode Generator

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

This is a React Native component that generates barcodes using the JSBarcode library and renders them using the react-native-svg package. The component supports both Expo Web, IOS and Android .

## Installation

`➜  npm i expo-barcode-generator or  yarn add expo-barcode-generator
`<br>

Usage

```
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

**Visuals**

![Alt Text](https://camo.githubusercontent.com/404f39cb4d4cee82fb21ac231861b2a9888c1719ab88aca148047a7af310d8ec/687474703a2f2f6c696e64656c6c2e6d652f4a73426172636f64652f6f746865722f6c6f676f2e737667)
![Alt Text](https://camo.githubusercontent.com/8b65951921e8906aa27e8e717fe7c5462d4cfcd58b94f0c4e201ee6c2114c797/68747470733a2f2f73332d65752d776573742d312e616d617a6f6e6177732e636f6d2f6a732d626172636f64652f626172636f6465732f73696d706c652e737667)
![Alt Text](https://camo.githubusercontent.com/109780a5f6f8ec7994c17dd2e746b3821ee075bbed74148d81a01b56b4d9d4dd/68747470733a2f2f73332d65752d776573742d312e616d617a6f6e6177732e636f6d2f6a732d626172636f64652f626172636f6465732f696e69742e737667)
![Alt Text](https://camo.githubusercontent.com/6bd5090fb1fe8b2523b826d00242e6b257c7d193c13fb79fbda32676b32e4ba9/68747470733a2f2f73332d65752d776573742d312e616d617a6f6e6177732e636f6d2f6a732d626172636f64652f626172636f6465732f616476616e6365642e737667)
