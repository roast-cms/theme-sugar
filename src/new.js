export const COMMON_UNIT = "em"
export const BASE_UNIT = "px"
export const FONTSIZE_ALIASES = [
  "fontSize",
  "font-size",
  "size",
  "unit",
  "base"
]
export const PALETTE_PRESETS = {
  base: [
    {
      // NOTE: value is always in pixels
      // NOTE: font aliases are immutable
      aliases: FONTSIZE_ALIASES,
      value: 16,
      unit: BASE_UNIT
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

export const S = (userTheme = {}) => {
  let theme = userTheme
  if (theme.base && theme.base[0]) {
    theme.base[0].aliases = FONTSIZE_ALIASES
    theme.base[0].unit = BASE_UNIT
  }
  const rules = name => (theme[name] ? theme[name] : PALETTE_PRESETS[name])
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
          COMMON_UNIT
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

export const printUnit = (value, unit = COMMON_UNIT, wantedFormat = "css") => {
  const print =
    wantedFormat === "css" ? value + (unit === "pixels" ? "px" : unit) : value
  return print
}

export const unitFactory = props => {
  let unit
  const { palette, rules, alias, wantedUnit, wantedFormat } = props

  const wantedRule = aliasSearch.call(rules, alias)
  const givenValue = wantedRule.value
  const givenUnit = wantedRule.unit
  if (!givenValue) return

  if (
    wantedRule.aliases === FONTSIZE_ALIASES &&
    typeof wantedUnit === "undefined"
  ) {
    unit = BASE_UNIT
    // console.log(wantedRule)
    // console.log(unit)
    // console.log(givenValue)
    // console.log(printUnit(givenValue * 1, unit, wantedFormat))
  }
  typeof wantedUnit === "undefined" ? (unit = givenUnit) : (unit = wantedUnit)

  const unitRatio =
    unit && wantedUnit ? convertUnit.apply(palette, [givenUnit, unit]) : 1
  const wantedValue = givenValue * unitRatio
  const wanted = printUnit(wantedValue, unit, wantedFormat)
  //
  // if (
  //   wantedRule.aliases === FONTSIZE_ALIASES &&
  //   typeof wantedUnit === "undefined"
  // ) {
  //   unit = BASE_UNIT
  //   console.log(wanted)
  // }

  return wanted
}
