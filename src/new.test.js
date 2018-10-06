import {
  DEFAULT_OPTIONS,
  DEFAULT_PALETTE,
  S,
  aliasSearch,
  convertUnit,
  printRule,
  unitFactory
} from "./new"

const mockPalette = {
  ...DEFAULT_PALETTE.size,
  options: { default: DEFAULT_OPTIONS }
}

describe("aliasSearch", () => {
  it("can find alias and return value", () => {
    const search = { aliases: [1, "a"], value: 1 }
    expect(
      aliasSearch.call([search, {}, { aliases: ["bb", 7], value: 11 }], "a")
    ).toEqual(search)
  })
  it("can find alias from array and return value", () => {
    const search = { aliases: [1, "a"], value: 1 }
    expect(
      aliasSearch.call(
        [search, {}, { aliases: ["bb", 7], value: 11 }],
        ["a", "aaa", "lll"]
      )
    ).toEqual(search)
  })
})

describe("convertUnit", () => {
  it("returns ratio of 1 for when 'from' and 'to' are equal", () => {
    expect(convertUnit.apply(S(), ["em", "em"])).toEqual(1)
    expect(convertUnit.apply(S(), ["px", "px"])).toEqual(1)
  })
  it("returns ratio of 1/16 when converting from px to em", () => {
    expect(convertUnit.apply(S(), ["px", "em"])).toEqual(1 / 16)
  })
  it("returns ratio of 16/1 when converting from em to px", () => {
    expect(convertUnit.apply(S(), ["em", "px"])).toEqual(16 / 1)
  })
  it("is non-discriminante between px and pixels", () => {
    expect(convertUnit.apply(S(), ["px", "pixels"])).toEqual(1)
    expect(convertUnit.apply(S(), ["pixels", "px"])).toEqual(1)
    expect(convertUnit.apply(S(), ["pixels", "pixels"])).toEqual(1)
    expect(convertUnit.apply(S(), ["px", "px"])).toEqual(1)
  })
})

describe("printRule", () => {
  it("returns number value", () => {
    expect(printRule(10, "px", "value")).toEqual(10)
  })

  it("returns em string", () => {
    expect(printRule(10, "em")).toEqual("10em")
  })
  it("returns px string", () => {
    expect(printRule(10, "px")).toEqual("10px")
    expect(printRule(10, "pixels")).toEqual("10px")
  })
})

describe("unitFactory", () => {
  it("defaults to existing shema value when `unit` is set to `null`", () => {
    expect(
      unitFactory({
        preset: DEFAULT_PALETTE.size,
        palette: mockPalette,
        alias: "l",
        unit: null,
        format: "value"
      })
    ).toEqual(40)
    expect(
      unitFactory({
        preset: DEFAULT_PALETTE.size,
        palette: mockPalette,
        alias: "l",
        unit: null
      })
    ).toEqual("40px")
  })
})

describe("S().size", () => {
  it("returns medium size aliases in default em", () => {
    expect(S().size("m")).toEqual("1.25em")
    expect(S().size("med")).toEqual("1.25em")
    expect(S().size("md")).toEqual("1.25em")
    expect(S().size("medium")).toEqual("1.25em")
    expect(S().size(20)).toEqual("1.25em")
  })
  it("returns medium size in px", () => {
    expect(S().size("m", "px")).toEqual("20px")
  })
  it("returns number value for medium size in px", () => {
    expect(S().size("m", "px", "value")).toEqual(20)
  })
  it("returns number value for medium size in em", () => {
    expect(S().size("m", "em", "value")).toEqual(1.25)
  })
})
describe("S(theme)", () => {
  it("works without any theme being passed as a parameter", () => {
    expect(S().size(20)).toEqual("1.25em")
  })
  it("can accept a theme that augments current theme defaults", () => {
    const newTheme = {
      size: [{ aliases: ["x"], value: 11, unit: "em" }],
      options: {
        default: {
          unit: "px",
          em: 10
        }
      }
    }
    expect(S(newTheme).size("x")).toEqual("110px")
    expect(S(newTheme).size("m")).toBeUndefined()
  })
})
