import { css } from "styled-components"
import { exact, min, max, breakpoints } from "./utils"

export const Sugar = {
  color: {
    brand: "#ff0000",
    foreground: "#525252",
    background: "#fff",
    highlight: "#8cff00",
    alpha: {
      foreground: alpha => {
        return `rgba(82, 82, 82, ${alpha})`
      },
      brand: alpha => {
        return `rgba(255, 0, 0, ${alpha})`
      },
      highlight: alpha => {
        return `rgba(140, 255, 0, ${alpha})`
      }
    }
  },
  opacity: {
    most: 0.85,
    half: 0.5,
    least: 0.125
  },
  effects: {
    borderRadius: {
      // base: multiplier
      small: 0.5,
      med: 1
    }
  },
  typography: {
    font: {
      sans: "Arial, sans-serif",
      serif: "Georgia, serif"
    },
    title: {
      auto: css`
        font-family: Arial, sans-serif;
        letter-spacing: 0.005em;
        line-height: ${() => Sugar.typography.title.lineHeight}em;
        font-weight: 700;
        margin: 0;
        /* in some cases this vv doesn't work and causes garbage CSS */
        .fonts-loaded-headers & {
          ${() => Sugar.typography.title.fontsLoaded};
        }
      `,
      fontsLoaded: css`
        font-family: ${() => Sugar.typography.font.sans};
      `,
      lineHeight: 1.15 // base: multiplier
    },
    text: {
      auto: css`
        font-family: Georgia, serif;
        letter-spacing: 0.05em;
        line-height: ${() => Sugar.typography.text.lineHeight}em;
        .fonts-loaded & {
          ${() => Sugar.typography.text.fontsLoaded};
        }
      `,
      fontsLoaded: css`
        font-family: ${() => Sugar.typography.font.serif};
      `,
      lineHeight: 1.75 // base: multiplier
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
      // base: pixels
      l: 20,
      m: 18,
      s: 14,
      xs: 12,
      make: {
        // base: multiplier
        larger: 2,
        normal: 1,
        smaller: 0.85,
        tiny: 0.5
      },
      // automatically set font size based on screen size; should be at the top of most components' css
      auto: css`
        ${min.m`font-size: 	${() =>
          Sugar.size.font.m}px;`} ${max.s`font-size: 	${() =>
        Sugar.size.font.s}px;`} ${max.xs`font-size: 	${() =>
        Sugar.size.font.xs}px;`} ${min.xxl`font-size:	${() =>
        Sugar.size.font.l}px;`};
      `
    },
    block: {
      column: {
        maxwidth: {
          // base: pixels
          m: 700,
          l: 900
        },
        safety: 1.5 // base: multiplier
      },
      spacing: 0.75, // base: multiplier
      border: 4, // base: pixels
      minFigureWIdth: 320 // base: pixels
    }
  },
  layer: {
    overlay: 40,
    card: 30,
    nav: 20,
    up: 10,
    tuck: -1
  }
}
