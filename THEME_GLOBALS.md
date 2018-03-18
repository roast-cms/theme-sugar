# Theme globals.
All of the values in the theme object are accessible across all your components which are children of `<ThemeProvider/>`. Here's what they do and how to access them:

To access a value within your CSS (that you wrote with Styled Components) simply include `${props => props.theme.[OBJECT REFERENCE]}`, where **OBJECT REFERENCE** is one of the following:

#### Colours

**OBJECT REFERENCE** | Description | Usage Example
--- | --- | ---
`color.brand(alpha)` | An rgba value for your "special" theme colour. | `color: ${props => props.theme.color.brand()};`
`color.foreground(alpha)` | An rgba value for your foreground colour, typically the colour of your body text. | `color: ${props => props.theme.color.foreground()};`
`color.background(alpha)` | An rgba value for your background colour, typically the colour of your background. | `background: ${props => props.theme.color.background()};`
`color.highlight(alpha)` | An rgba value for your highlight colour, typically used for selecting text or items. | `::selection { background: ${props => props.theme.color.highlight()}; }`

#### Opacity
By default all colours have opacity of 1, passing an opacity value into the color function gives it according transparency. The following values can be used to set opacity for colours:

**OBJECT REFERENCE** | Description | Usage Example
--- | --- | ---
`opacity.most` | 0.85 | `color: ${props => props.theme.color.brand(props.theme.opacity.most)};`
`opacity.half` | 0.5 | `color: ${props => props.theme.color.brand(props.theme.opacity.half)};`
`opacity.least` | 0.125 | `color: ${props => props.theme.color.brand(props.theme.opacity.least)};`

#### Typography

**OBJECT REFERENCE** | Description | Usage Example
--- | --- | ---
`typography.title.auto` | Return CSS that sets `color`, `font-family`, `letter-spacing`, `line-height`, `font-weight`, and `margin` designed for title/heading tags. | `h1 { ${props => props.theme.typography.title.auto} }`
`typography.title.lineHeight` | Returns a number to be used when setting `line-height` for headings. | `div { line-height: ${props => props.theme.typography.title.lineHeight}em; }`
`typography.text.auto` | Same as above, but for body text. | `p { ${props => props.theme.typography.text.auto} }`
`typography.title.lineHeight` | Same as above, but for body text. | `div { line-height: ${props => props.theme.typography.text.lineHeight}em; }`

#### Font sizes
**OBJECT REFERENCE** | Description | Usage Example
--- | --- | ---
`size.font.m` | Returns a base font size number, meant to be in pixels | `font-size: ${props => props.theme.size.font.m}px`
`size.font.l` | Same as above, multiplied by a factor of `1.15`| `font-size: ${props => props.theme.size.font.l}px`
`size.font.s` | Same as above, multiplied by a factor of `0.9`| `font-size: ${props => props.theme.size.font.s}px`
`size.font.s` | Same as above, multiplied by a factor of `0.85`| `font-size: ${props => props.theme.size.font.xs}px`
--- | --- | ---
`size.font.make.larger` | Returns a number (2) meant to be used as `em` value in setting relative font sizes. | `h1 { font-size: ${props => props.theme.font.make.larger}em }`
`size.font.make.normal` | Returns a number (1) meant to be used as `em` value in setting relative font sizes. | `h2 { font-size: ${props => props.theme.font.make.normal}em }`
`size.font.make.smaller` | Returns a number (.85) meant to be used as `em` value in setting relative font sizes. | `small { font-size: ${props => props.theme.font.make.smaller}em }`
`size.font.make.tiny` | Returns a number (.5) meant to be used as `em` value in setting relative font sizes. | `.tiny { font-size: ${props => props.theme.font.make.tiny}em }`
--- | --- | ---
`size.font.auto` | Sets corresponding font sizes to appropriate media queries | `.fonts-reset { ${props => props.theme.size.font.auto} }`

#### Block measuring sizes
**OBJECT REFERENCE** | Description | Usage Example
--- | --- | ---
`size.block.padding` | Returns a number meant to be used as `em` value for standard padding width | `padding: ${props => props.theme.size.block.padding}em;`
`size.block.padding` | Returns a number meant to be used as `em` value for standard spacing between blocks | `margin: ${props => props.theme.size.block.spacing}em;`
`size.block.border` | Returns a number meant to be used as `px` value for standard border widths | `border: ${props => props.theme.size.block.border}px solid;`
`size.block.column.m` | Returns a number meant to be used as `px` value for a medium-width content column | `article { width: ${props => props.theme.size.column.m} }`
`size.block.column.l` | Same as above, but for wider screens | `article { width: ${props => props.theme.size.column.l} }`

#### Layering (z-index values)
**OBJECT REFERENCE** | Description | Usage Example
--- | --- | ---
`layer.overlay` | 40: for overlays | `z-index: ${props => props.theme.layer.overlay};`
`layer.card` | 30: to display contextual content menus/cards | `z-index: ${props => props.theme.layer.card};`
`layer.nav` | 20: for navigation menus | `z-index: ${props => props.theme.layer.card};`
`layer.up` | 10: just above main content | `z-index: ${props => props.theme.layer.up};`
`layer.tuck` | -1: tuck under main content | `z-index: ${props => props.theme.layer.card};`

#### Media queries
All media queries use the following labels that define range (in pixels): `xxl: [1601, 160000000]`, `xl: [1081, 1600]`, `l: [751, 1080]`, `m: [521, 750]`, `s: [321, 520]`, `xs: [0, 320]`.

**OBJECT REFERENCE** | Description | Usage Example
--- | --- | ---
`size.breakpoint.exact` | Returns a breakpoint that has `min-width` and `max-width` defined by the label values (above) | `${props =>
  props.theme.size.breakpoint.exact.l`[css]`};`
`size.breakpoint.min` | Returns a breakpoint that has `min-width` but no `max-width` | `${props =>
  props.theme.size.breakpoint.min.l`[css]`};`
`size.breakpoint.max` | Returns a breakpoint that has `max-width` but no `min-width` | `${props =>
    props.theme.size.breakpoint.max.l`[css]`};`

#### Effects
**OBJECT REFERENCE** | Description | Usage Example
--- | --- | ---
`effects.borderRadius.med` | Returns a number meant to be used as `em` to set border radius | `border-radius: ${props => props.theme.effects.borderRadius.med}em;`
`effects.borderRadius.small` | Returns a number meant to be used as `em` to set border radius | `border-radius: ${props => props.theme.effects.borderRadius.small}em;`




**Note** that there are defaults set for all of the above values, so that you don't have to start with a blank slate. All you have to do is customize the theme to suit your needs. _Some values are opinionated and meant to be customized, unless you'd like to extend the theme with your own dictionary set_.
