import { DEFAULT_OPTIONS, DEFAULT_PALETTE } from "./constants"

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
    screen: {},
    text: getRule.bind("text"),
    color: {},
    size: getRule.bind("size")
  }

  return palette
}

export const aliasSearch = function(alias) {
  let search = {}
  const iterate = thing =>
    this.forEach((v, index) => {
      if (v && v.aliases && v.aliases.indexOf(thing) > -1) {
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

export const printRule = (value, unit, format = "css") => {
  const print =
    format === "css" ? value + (unit === "pixels" ? "px" : unit) : value
  return print
}

export const unitFactory = props => {
  let unitRatio
  const { palette, preset, alias, unit, format } = props
  const schema = aliasSearch.call(preset, alias)
  if (!schema.value) return

  const _unit =
    unit === null
      ? schema.unit
      : typeof unit === "undefined"
        ? palette.options.default.unit
        : unit
  unitRatio = convertUnit.apply(palette, [schema.unit, _unit])
  const value = schema.value * unitRatio
  return printRule(value, _unit, format)
}
