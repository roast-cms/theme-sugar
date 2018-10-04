export const DEFAULT_UNIT = "em"
export const DEFAULT_PALETTE_BASE = [
  {
    // NOTE: aliases["fontSize"] is required
    aliases: ["fontSize", "font-size", "size", "pixels", "px", "unit", "base"],
    value: 16,
    unit: "px"
  }
]
export const DEFAULT_PALETTE_SIZE = [
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

export const S = (theme = {}) => {
  const PALETTE = {
    options: {
      default: {
        unit:
          (theme &&
            theme.options &&
            theme.options.default &&
            theme.options.default.unit) ||
          DEFAULT_UNIT
      },
      extend:
        theme && theme.options && theme.options.extend === false ? false : true
    },
    base: alias => {
      const options = theme.base
        ? PALETTE.options.extend
          ? [...DEFAULT_PALETTE_BASE, ...theme.base]
          : theme.base
        : DEFAULT_PALETTE_BASE
      return aliasSearch.call(options, alias)
    },
    screen: {},
    font: {},
    color: {},
    size: (
      alias,
      wantedUnit = PALETTE.options.default.unit,
      wantedFormat = "css"
    ) => {
      const options = theme.size
        ? PALETTE.options.extend
          ? [...DEFAULT_PALETTE_SIZE, ...theme.size]
          : theme.size
        : DEFAULT_PALETTE_SIZE
      const wantedOption = aliasSearch.call(options, alias)
      const givenValue = wantedOption.value
      const givenUnit = wantedOption.unit
      if (!givenValue || !givenUnit) return
      const wantedValue =
        givenValue * convertUnit.apply(PALETTE, [givenUnit, wantedUnit])
      const wanted = printUnit(wantedValue, wantedUnit, wantedFormat)
      return wanted
    }
  }
  return PALETTE
}

export const aliasSearch = function(alias) {
  let search = {}
  this.forEach((v, index) => {
    if (v && v.aliases && v.aliases.indexOf(alias) > -1) {
      search = this[index]
    }
  })
  return search
}

export const convertUnit = function(from, to) {
  const matrix = {
    em: this.base("fontSize").value,
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
