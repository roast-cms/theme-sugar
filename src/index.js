//
// tools and utilities
import { css } from "styled-components"
import { exact, min, max, breakpoints } from "./utils"
//
// theme object
export const Sugar = (options = {}) => {
  //
  // function to convert rgb value to rgba
  const rgba = (rgb, a = 1) =>
    `${rgb.replace(")", "").replace("rgb", "rgba")}, ${a})`
  //
  // theme defaults
  const palette = {
    //
    // colours
    color_brand: options.color_brand || "rgb(0,167,255)",
    color_foreground: options.color_foreground || "rgb(82,82,82)",
    color_background: options.color_background || "rgb(255,255,255)",
    color_highlight: options.color_highlight || "rgb(255,255,0)",
    //
    // fonts
    font_heading_system: options.font_heading_system || "Arial, sans-serif",
    get font_heading_load() {
      return options.font_heading_load || this.font_heading_system
    },
    get font_body_system() {
      return options.font_body_system || this.font_heading_system
    },
    get font_body_load() {
      return options.font_body_load || this.font_body_system
    },
    //
    // size
    size_base: options.size_base || 18,
    size_column_medium: options.size_column_medium || 700,
    size_column_large: options.size_column_large || 900,
    size_block_spacing: options.size_block_spacing || 0.75,
    size_block_padding: options.size_block_padding || 1.5,
    size_block_border: options.size_block_border || 4,

    effects_border_radius:
      options.effects_border_radius !== undefined
        ? options.effects_border_radius
        : 0.45
  }
  //
  // return theme defaults object
  return {
    color: {
      brand: alpha => rgba(palette.color_brand, alpha),
      foreground: alpha => rgba(palette.color_foreground, alpha),
      background: alpha => rgba(palette.color_background, alpha),
      highlight: alpha => rgba(palette.color_highlight, alpha)
    },
    typography: {
      font: {
        heading: palette.font_heading,
        body: palette.font_body
      },
      title: {
        auto: css`
          color: ${() => Sugar(palette).color.foreground()};
          font-family: ${() => Sugar(palette).typography.font.heading.system};
          letter-spacing: 0.005em;
          line-height: ${() => Sugar(palette).typography.title.lineHeight}em;
          font-weight: 700;
          margin: 0;
          .fonts-loaded-headers & {
            ${() => Sugar(palette).typography.title.fontsLoaded};
          }
        `,
        fontsLoaded: css`
          font-family: ${() =>
            Sugar(palette).typography.font.heading.load}, ${() =>
          Sugar(palette).typography.font.heading.system};
          letter-spacing: 0.025em;
          font-weight: 600;
      `,
        lineHeight: 1.15
      },
      text: {
        auto: css`
          color: ${() => Sugar(palette).color.foreground()};
          font-family: ${() => Sugar(palette).typography.font.body.system};
          letter-spacing: 0.05em;
          line-height: ${() => Sugar(palette).typography.text.lineHeight}em;
          .fonts-loaded & {
            ${() => Sugar(palette).typography.text.fontsLoaded};
          }
        `,
        fontsLoaded: css`
        font-family: ${() => Sugar(palette).typography.font.body.load}, ${() =>
          Sugar(palette).typography.font.body.system};
          letter-spacing: 0.025em;
      `,
        lineHeight: 1.75
      }
    },
    effects: {
      borderRadius: {
        med: palette.effects_border_radius,
        small: () => Sugar(palette).effects.borderRadius.med / 2
      }
    },
    size: {
      breakpoint: {
        exact,
        min,
        max,
        stops: {
          min: breakpoints.xs[1],
          max: breakpoints.xl[1]
        }
      },
      font: {
        m: palette.size_base,
        //
        l: palette.size_base * 1.15,
        s: palette.size_base * 0.9,
        xs: palette.size_base * 0.85,
        //
        make: {
          larger: 2,
          normal: 1,
          smaller: 0.85,
          tiny: 0.5
        },
        auto: css`
        ${min.m`font-size: 	${() =>
          Sugar(palette).size.font.m}px;`} ${max.s`font-size: 	${() =>
          Sugar(palette).size.font.s}px;`} ${max.xs`font-size: 	${() =>
          Sugar(palette).size.font.xs}px;`} ${min.xxl`font-size:	${() =>
          Sugar(palette).size.font.l}px;`};
      `
      },
      block: {
        column: {
          m: palette.size_column_medium,
          l: palette.size_column_large
        },
        padding: palette.size_block_padding,
        spacing: palette.size_block_spacing,
        border: palette.size_block_border
      }
    },
    layer: {
      overlay: 40,
      card: 30,
      nav: 20,
      up: 10,
      tuck: -1
    },
    opacity: {
      most: 0.85,
      half: 0.5,
      least: 0.125
    }
  }
}
//
// convenience exports
export { exact, min, max, breakpoints } from "./utils"
