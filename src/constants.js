export const DEFAULT_PALETTE = {
  size: [
    {
      aliases: ["sm", "s", "small", 0.85],
      value: 0.85,
      unit: "em"
    },
    {
      aliases: ["m", "med", "md", "medium", "normal", "regular", 1],
      value: 1,
      unit: "em"
    },
    {
      aliases: ["l", "lg", "large", 1.5],
      value: 1.5,
      unit: "em"
    },
    {
      aliases: ["xl", "extra", "huge", "giant", "big", 3],
      value: 3,
      unit: "em"
    }
  ],
  text: [
    {
      aliases: ["line-height", "line", "lineHeight"],
      value: 1.75,
      unit: "em"
    },
    {
      aliases: ["letter-spacing", "letters", "lspacing", "letterSpacing"],
      value: 1.025,
      unit: "em"
    }
  ],
  color: [
    {
      aliases: ["main", "brand", "red", "pink"],
      value: "#f00",
      unit: "hex"
    },
    {
      aliases: ["blue", "marine", "aqua"],
      value: "rgb(0, 0, 255)",
      unit: "rgba"
    }
  ]
}
export const DEFAULT_OPTIONS = {
  unit: "em",
  em: 16
}
