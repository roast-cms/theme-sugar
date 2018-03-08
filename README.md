# react-sugar-styled
![GitHub version](https://badge.fury.io/gh/roast-cms%2Freact-sugar-styled.svg)
> 🍬 Tools and magic numbers for styled-components theme used within roast-cms React components.

### What is this?

This is a list of defaults (colours, sizes, fonts etc.) which all or most React components under `roast-cms` use with help from [https://github.com/styled-components/styled-components](styled-components).

### What you will need.
This package requires `styled-components`.

```
# first you'll need the package:
yarn add @roast-cms/react-sugar-styled
```

### How to use.
```javascript
import { ThemeProvider } from "styled-components"
import { Sugar } from "../src/index"

const ThemedComponent = props =>
    <ThemeProvider theme={Sugar}>
      Whatever.
    </ThemeProvider>
```

### Contributing
PRs and issue reports are welcome. Please submit all PRs to `develop` branch. To test, run `yarn start`
