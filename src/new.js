export const DEFAULT_UNIT = "em"

export const S = () => {
  const PALETTE = {
    screen: {},
    base: alias => {
      const options = [
        {
          aliases: [
            "fontSize",
            "font-size",
            "size",
            "pixels",
            "px",
            "unit",
            "base"
          ],
          value: 16
        }
      ]
      return aliasSearch.call(options, alias)
    },
    font: {},
    color: {},
    size: (alias, unit = DEFAULT_UNIT) => {
      const options = [
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
      const wantedValue = aliasSearch.call(options, alias)
      const wantedUnit = convertUnit.apply(
        PALETTE,
        unit === "em" ? ["px", "em"] : ["em", "px"]
      )
      return wantedValue * wantedUnit
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
    em: this.base("fontSize"),
    px: 1
  }
  return matrix[from] / matrix[to]
}

export const printUnit = (value, unit = DEFAULT_UNIT) => {
  switch (unit) {
    case "value":
      return value
    case "px":
    case "pixels":
      return value + "px"
  }
  return value + DEFAULT_UNIT
}
