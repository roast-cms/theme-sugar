# theme-sugar

![NPM version](https://badge.fury.io/gh/roast-cms%2Ftheme-sugar.svg)

> 🍬 Customizeable, extendable theming engine for JavaScript CSS processors.

- Don't worry about remembering variable names `S().size("med") === S().size("m")`
- Get values in units that you want `S().size("m", "px") === "16px" && S().size("m", "em") === "1em"`
- Can be used with any JavaScript CSS processor tool, i.e.: [`styled-components`](https://github.com/styled-components/styled-components), [`glamorous`](https://github.com/paypal/glamorous)

---

Looking for an **older version** of this package? `react-sugar-styled` is here > https://github.com/roast-cms/theme-sugar/tree/6e53ed9dac55009f8c3c9c2a0340ff83485e6c62 - under the same repo, a few commits back.

---

_Below examples are built with assumption you are using `styled-components` in your project._

```
yarn add @roast-cms/theme-sugar
```

```javascript
import { S } from "@roast-cms/theme-sugar"

const Text = styled.span`
  color: ${props => props.theme.color("blue")};
`

const App = props => (
  <ThemeProvider theme={S()}>
    <Text>Hello!</Text>
  </ThemeProvider>
)
```

The above should render a blue text, using built-in template, which you can customize (read on).

## Concepts.

- `palette` - An object of values, units, and names that's converted by `theme-sugar` into a theme you can use in your project. This is what you will need to provide to build a custom theme.
- `preset` - One of four supported theming groups: `media`, `text`, `color`, `size`. Presets are arrays of objects, nested under palette. When you customize your theme, you can replace them one-by-one, meaning that if you only pass your own `size` preset, it will replace the defaults, but media, text, and colr will still be providing default values (they will not be blank).
- `schema` - An object nested under a preset that contains `find`, an array of aliases for the schema that you can use to access its `value` and the `unit`, which could be "em", "px", "rgb", "hex", or "name". The latter being used for properties that do not convert, like font-names.
- `rule` - Css rule that `theme-sugar` returns, i.e.: `10px`.

```javascript
import { S } from "@roast-cms/theme-sugar"

const palette = {
  size: [ // size preset
    { // schema for small size, listed in pixels
      find: ["sm", "small", "s"],
      value: 8,
      unit: "px"
    },
    { // schema for large size, listed in em units
      find: ["l","large"],
      value: 2,
      unit: "em"
    },
  ]

  // output examples:

  S(palette) // this is how you can pass a palette to return your custom theme
    .size("l") // 2em

  S(palette).size("s") // .5em - theme-sugar defaults all units to em units with conversion of 16 pixels per 1 em
  S(palette).size("s", "px") // 8px - you can specify that you want pixels
  S(palette).size("l"), "px") // 32px - theme-sugar will convert to the units you want from the units stated in the preset
  S(palette).size("l", "px", "value") // 32 - you can get just a number value too!
  S(palette).size("s", null) // 8px - if you pass null as a second parameter, theme-sugar will use the unit specified in the schema instead of the default unit

```

## Building your custom theme.

#### Customizing default units.

`theme-sugar` defaults all values to be provided in `em` units with a conversion of 16 pixels per em. You can change that:

```javascript
const palette {
  ...
  options: {
    defaults: {
      unit: "px",
      em: 10
    }
  }
}
```

The above palette will set default units to `px` (this is what you will get all your CSS in without having to explicitly specifying the units) and convert 10 pixels to 1 em unit. **Note** that you can still specify your `schema` values in either em or px - whatever suits you best, `theme-sugar` will do all the conversions. Also note that color values are always default to hex values.

#### Naming aliases.

Notice that inside each `schema` an array of names is passed to `find`. This array specifies all possible names you'd like to use in your code to find your value. For example, you may not remember whether your medium size is named `md` or `med` - so you can pass both names as an array. This is very useful in practice as remembering all of the names in your theme file never gets easy.

```javascript
{
  find: ["letter-spacing", "letters", "lspacing", "letterSpacing"],
  value: 1.025,
  unit: "em"
},
```

#### What are the defaults?

The default palette object contains colors, sizes, font names and more to get a basic project started. You can find it under `./src/constants.js` folder - highly recommended to get familiar with.

### Example.

Feel free to play around with the example file (sroll all the way to the down and follow the "Congributing." steps)

#### Complete example with `styled-components`.

```javascript
// palette.js

myPalette = {
  size: [
    {
      find: ["m", "med", "md", "medium", "normal", "regular", 1],
      value: 1,
      unit: "em"
    },
    {
      find: ["l", "lg", "large", 1.5],
      value: 1.5,
      unit: "em"
    }
  ],
  text: [
    {
      find: ["font"],
      value: "Arial, sans-serif",
      unit: "name" // when the unit is set to "name" no conversion will ever be performed and the rule returned will always equal to value in the schema
    }
  ],
  color: [
    {
      find: ["main", "brand", "red", "pink"],
      value: "#f00",
      unit: "hex"
    },
    {
      find: ["blue", "marine", "aqua"],
      value: "rgb(0, 0, 255)",
      unit: "rgba"
    }
  ],
  media: [
    {
      find: ["small", "mobile", 320],
      value: 320,
      unit: "px"
    }
  ],
  options: {
    default: {
      unit: "em",
      em: 16
    }
  }
}
```

Now that you've built your theme, you can pass it into your React project `ThemeProvider`:

```javascript
// index.js

import { S } from "@roast-cms/theme-sugar"
import { myPalette } from "./palette.js"
import { Text } from "./Text.js"

const App = props => (
  <ThemeProvider theme={S(myTheme)}>
    <Text>Hello!</Text>
  </ThemeProvider>
)
```

And this is how you can use your theme to create a styled component:

```javascript
// Text.js

import styled, { ThemeProvider, css } from "styled-components"

export const Text = styled.div`
  font-family: ${props => props.theme.text("font");
  font-size: ${props => props.theme.size("l");
  color: ${props => props.theme.size("blue");
`
```

#### Media-query helper snippet.

You can create helpers for CSS media-queries using this pattern:

```javascript
// media.js

import { css } from "styled-components"

export const mobileScreen = (...args) => css`
  @media (min-width: ${props => props.theme.media("mobile", null)}) {
    ${css(...args)};
  }
`
```

And when writing your styled components:

```
import { mobileScreen } form "./media.js"

const Box = styled.div`
  ${mobileScreen`
    color: ${props => props.theme.color("red")};
  `}
`
```

#### Structuring your project.

`theme-sugar` diliberately limits what it stores to four types of shemas with no complete CSS rules. The reasons are compatibility with multiple JavaScript libraries and to encourage the developer to build components, rather than rely on theming engine. Thus if you want to make a header, you should create a `styled-component` export with all of the CSS rules from the theme and import it. Same for standard fonts, paragraphs etc.

## Congributing.

`$ yarn` to install all dependencies, `$ yarn test` to run tests, `$yarn start` to run example file in browser on `http://localhost:3002`. PRs and issues are welcome.
