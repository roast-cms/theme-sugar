export const DEFAULT_UNIT = "em"
export const FONTSIZE_ALIASES = [
  "fontSize",
  "font-size",
  "size",
  "pixels",
  "px",
  "unit",
  "base"
]
export const DEFAULT_PALETTE = {
  base: [
    {
      // NOTE: value in pixels required
      // NOTE: unit must be set to "px"
      aliases: FONTSIZE_ALIASES,
      value: 16,
      unit: "px"
    },
    {
      aliases: ["lineHeight", "line-height", "height", "line"],
      value: 1.15,
      unit: "em"
    },
    {
      aliases: ["letterSpacing", "spacing", "letter-spacing"],
      value: 1.025,
      unit: "em"
    }
  ],
  size: [
    {
      aliases: ["sm", "s", 10, "small"],
      value: 10,
      unit: "px"
    },
    {
      aliases: ["m", "med", "md", "medium", 20],
      value: 20,
      unit: "px"
    },
    {
      aliases: ["l", "lg", "large", 40],
      value: 40,
      unit: "px"
    },
    {
      aliases: ["xl", "extra", "huge", "giant", "big", 80],
      value: 80,
      unit: "px"
    }
  ]
}

export const S = (theme = {}) => {
  const rules = name => (theme[name] ? theme[name] : DEFAULT_PALETTE[name])

  const map = function(
    alias,
    wantedUnit = palette.options.default.unit,
    wantedFormat = "css"
  ) {
    return unitFactory({
      palette,
      rules: rules(this),
      wantedUnit,
      wantedFormat,
      alias
    })
  }

  const palette = {
    options: {
      default: {
        unit:
          (theme &&
            theme.options &&
            theme.options.default &&
            theme.options.default.unit) ||
          DEFAULT_UNIT
      }
    },
    screen: {},
    font: {},
    color: {},
    base: map.bind("base"),
    size: map.bind("size")
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
    em: this.base(FONTSIZE_ALIASES, null),
    px: 1,
    pixels: 1
  }
  return matrix[from] / matrix[to]
}

export const printUnit = (value, unit = DEFAULT_UNIT, wantedFormat = "css") => {
  const print =
    wantedFormat === "css" ? value + (unit === "pixels" ? "px" : unit) : value
  return print
}

export const unitFactory = props => {
  let unit
  const { palette, rules, alias, wantedUnit, wantedFormat } = props

  const wantedOption = aliasSearch.call(rules, alias)
  const givenValue = wantedOption.value
  const givenUnit = wantedOption.unit

  if (!givenValue || !givenUnit) return
  typeof wantedUnit === "undefined" ? (unit = givenUnit) : (unit = wantedUnit)

  const unitRatio =
    unit && wantedUnit ? convertUnit.apply(palette, [givenUnit, unit]) : 1
  const wantedValue = givenValue * unitRatio
  const wanted = printUnit(wantedValue, unit, wantedFormat)

  return wanted
}
