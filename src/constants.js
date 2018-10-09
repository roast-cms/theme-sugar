export const DEFAULT_PALETTE = {
  size: [
    {
      find: ["sm", "s", "small", 0.85],
      value: 0.85,
      unit: "em"
    },
    {
      find: ["m", "med", "md", "medium", "normal", "regular", 1],
      value: 1,
      unit: "em"
    },
    {
      find: ["l", "lg", "large", 1.5],
      value: 1.5,
      unit: "em"
    },
    {
      find: ["xl", "extra", "huge", "giant", "big", 3],
      value: 3,
      unit: "em"
    }
  ],
  text: [
    {
      find: ["line-height", "line", "lineHeight"],
      value: 1.75,
      unit: "em"
    },
    {
      find: ["letter-spacing", "letters", "lspacing", "letterSpacing"],
      value: 1.025,
      unit: "em"
    },
    {
      find: [
        "body-font",
        "text-font",
        "main-font",
        "mainFont",
        "bodyFont",
        "font"
      ],
      value: "Arial, sans-serif",
      unit: "name"
    }
  ],
  color: [
    {
      find: ["main", "brand", "red", "pink"],
      value: "#f00",
      unit: "hex"
    },
    {
      find: ["blue", "marine", "aqua"],
      value: "rgb(0, 0, 255)",
      unit: "rgba"
    }
  ],
  media: [
    {
      find: ["small", "mobile", 320],
      value: 320,
      unit: "px"
    }
  ]
}
export const DEFAULT_OPTIONS = {
  unit: "em",
  em: 16
}
