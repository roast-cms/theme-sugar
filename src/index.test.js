import { S } from "./"

describe("S(theme)", () => {
  it("works without any theme being passed as a parameter", () => {
    expect(S().size(0.85)).toEqual("0.85em")
  })
  it("can accept a theme that augments current theme defaults", () => {
    const newTheme = {
      size: [
        { find: ["x"], value: 11, unit: "em" },
        { find: ["z"], value: 9, unit: "px" }
      ],
      options: {
        default: {
          unit: "px",
          em: 10
        }
      }
    }
    expect(S(newTheme).size("x")).toEqual("110px")
    expect(S(newTheme).size("z")).toEqual("9px")
    expect(S(newTheme).size("m")).toBeUndefined()
  })
})

describe("S().size", () => {
  it("returns medium size find in default em", () => {
    expect(S().size("m")).toEqual("1em")
    expect(S().size("med")).toEqual("1em")
    expect(S().size("md")).toEqual("1em")
    expect(S().size("medium")).toEqual("1em")
    expect(S().size(1)).toEqual("1em")
  })
  it("returns medium size in px", () => {
    expect(S().size("m", "px")).toEqual("16px")
  })
  it("returns number value for medium size in px", () => {
    expect(S().size("m", "px", "value")).toEqual(16)
  })
  it("returns number value for medium size in em", () => {
    expect(S().size("m", "em", "value")).toEqual(1)
  })
})

describe("S().text", () => {
  it("returns line-height in em", () => {
    expect(S().text("line-height")).toEqual("1.75em")
  })
  it("returns line-height value when requested", () => {
    expect(S().text("lineHeight", "em", "value")).toEqual(1.75)
    expect(S().text("lineHeight", null, "value")).toEqual(1.75)
  })
  it("returns letter-spacing in em", () => {
    expect(S().text("letter-spacing")).toEqual("1.025em")
  })
  it("returns font name", () => {
    expect(S().text("font")).toEqual("Arial, sans-serif")
  })
})

describe("S().color", () => {
  it("can return color by alias", () => {
    expect(S().color("red")).toEqual("#f00")
  })
  it("can convert color to rgba and return", () => {
    expect(S().color("red", "rgb")).toEqual("rgba(255, 0, 0, 255)")
  })
  it("can convert color to hex and return", () => {
    expect(S().color("blue", "hex")).toEqual("#0000ff")
  })
})

describe("S().media", () => {
  it("can return media query by alias", () => {
    expect(S().media("small", "px")).toEqual("320px")
  })
})
