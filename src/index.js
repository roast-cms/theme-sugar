import { DEFAULT_OPTIONS, DEFAULT_PALETTE } from "./constants"
import { unitFactory } from "./utils"

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
