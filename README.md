# theme-sugar
![NPM version](https://badge.fury.io/gh/roast-cms%2Ftheme-sugar.svg)
> 🍬 Customizeable, extendable theming engine for JavaScript CSS processors
- Don't worry about remembering things as much `S().size("med") === S().size("m")`
- Get values in units that you want `S().size("m", "px) === "16px", S().size("m", "em") === "1em"`
- Can be used with any JavaScript CSS processor tool, i.e.: [`styled-components`](https://github.com/styled-components/styled-components), [`glamorous`](https://github.com/paypal/glamorous)

_Below examples are built with assumption you are using `styled-components` in your project._

```
yarn add @roast-cms/theme-sugar
```
```javascript
import { S } from "@roast-cms/theme-sugar"

const Text = styled.span`
  color: ${props => props.theme.color("blue")};
`

const App = props =>
  <ThemeProvider theme={S()}><Text>Hello!</Text></ThemeProvider>
```

The above should render a blue text, using built-in template, which you can customize:
