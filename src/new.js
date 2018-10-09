import { DEFAULT_OPTIONS, DEFAULT_PALETTE } from "./constants"
import hexRgb from "hex-rgb"
import rgbHex from "rgb-hex"

export const S = (userPalette = {}) => {
  const getRule = function(alias, unit, format = "css") {
    return unitFactory({
      palette,
      preset: userPalette[this] || DEFAULT_PALETTE[this],
      unit,
      format,
      alias
    })
  }

  const userOptions = userPalette.options || {}
  const palette = {
    options: {
      default: {
        ...DEFAULT_OPTIONS,
        ...userOptions.default
      }
    },
    media: getRule.bind("media"),
    text: getRule.bind("text"),
    color: getRule.bind("color"),
    size: getRule.bind("size")
  }

  return palette
}

export const aliasSearch = function(alias) {
  let search = {}
  const iterate = thing =>
    this.forEach((v, index) => {
      if (v && v.find && v.find.indexOf(thing) > -1) {
        search = this[index]
      }
    })
  Object.prototype.toString.call(alias) === "[object Array]"
    ? alias.forEach(string => iterate(string))
    : iterate(alias)
  return search
}

export const convertUnit = function(from, to) {
  const matrix = {
    em: this.options.default.em,
    px: 1,
    pixels: 1
  }
  return matrix[from] / matrix[to]
}

export const convertColor = (from, to, value) => {
  if (from.includes("hex") && to.includes("rgb")) {
    const rgba = hexRgb(value)
    return `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`
  }
  if (from.includes("rgb") && to.includes("hex")) {
    const hex = rgbHex(value)
    return `#${hex}`
  }
  return value
}

export const printRule = (value, unit, format = "css") => {
  const print =
    format === "css" ? value + (unit === "pixels" ? "px" : unit) : value
  return print
}

export const unitFactory = props => {
  let unitRatio, value, _unit
  const { palette, preset, alias, unit, format } = props
  const schema = aliasSearch.call(preset, alias)
  if (!schema.value) return
  // named values, like font-name
  if (("" + schema.unit).includes("name")) {
    return schema.value
  }
  // color
  if (
    ("" + schema.value).includes("#") ||
    ("" + schema.value).includes("rgb")
  ) {
    _unit = unit ? unit : schema.unit
    return convertColor(schema.unit, _unit, schema.value)
  }
  // measurement units
  _unit =
    unit === null
      ? schema.unit
      : typeof unit === "undefined"
        ? palette.options.default.unit
        : unit
  unitRatio = convertUnit.apply(palette, [schema.unit, _unit])
  value = schema.value * unitRatio
  return printRule(value, _unit, format)
}
