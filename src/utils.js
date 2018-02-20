// styles
import { css } from "styled-components"

// css
export const breakpoints = {
  // base: pixels
  xxl: [1601, 160000000],
  xl: [1081, 1600],
  l: [751, 1080],
  m: [521, 750],
  s: [321, 520],
  xs: [0, 320]
}

// px to em
const pxEm = px => px / 16

// print media queries for exact range:
export const exact = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
		@media (min-width: ${pxEm(breakpoints[label][0])}em) and (max-width: ${pxEm(
    breakpoints[label][1]
  )}em) {
			${css(...args)}
		}
	`
  return accumulator
}, {})

// print media queries with no max value:
export const min = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
		@media (min-width: ${pxEm(breakpoints[label][0])}em) {
			${css(...args)}
		}
	`
  return accumulator
}, {})

// print media queries with no min value:
export const max = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
		@media (max-width: ${pxEm(breakpoints[label][1])}em) {
			${css(...args)}
		}
	`
  return accumulator
}, {})
