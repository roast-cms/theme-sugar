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
    size: (alias, unitType = "em") => {
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
      return (
        aliasSearch.call(options, alias) *
        convertUnit.apply(
          PALETTE,
          unitType === "em" ? ["px", "em"] : ["em", "px"]
        )
      )
    }
  }
  return PALETTE
}

export const aliasSearch = function(alias) {
  let search
  this.forEach((v, index) => {
    if (v.aliases.indexOf(alias) > -1) {
      search = this[index].value
    }
  })
  return search
}

export const convertUnit = function(from, to) {
  // px -> px = 1
  // em -> em = 1
  // px -> em = 1/16
  // em -> px = 16/1

  const px = this.base("fontSize")
  const emPx = px
  const pxEm = 1 / px
  return from === "px" && to === "em" ? pxEm : emPx
}
