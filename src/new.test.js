import {
  DEFAULT_PALETTE,
  S,
  aliasSearch,
  convertUnit,
  printUnit,
  unitFactory
} from "./new"

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
})

describe("printUnit", () => {
  it("returns number value", () => {
    expect(printUnit(10, "px", "value")).toEqual(10)
  })
  it("returns em string by default", () => {
    expect(printUnit(10)).toEqual("10em")
  })
  it("returns em string", () => {
    expect(printUnit(10, "em")).toEqual("10em")
  })
  it("returns px string", () => {
    expect(printUnit(10, "px")).toEqual("10px")
    expect(printUnit(10, "pixels")).toEqual("10px")
  })
})

describe("unitFactory", () => {
  it("defaults to existing unit key's value in the theme when `wantedUnit` is set to `null`", () => {
    expect(
      unitFactory({
        rules: DEFAULT_PALETTE.base,
        palette: DEFAULT_PALETTE.base,
        alias: "fontSize",
        wantedUnit: null,
        wantedFormat: "value"
      })
    ).toEqual(16)
    expect(
      unitFactory({
        rules: DEFAULT_PALETTE.base,
        palette: DEFAULT_PALETTE.base,
        alias: "fontSize",
        wantedUnit: null
      })
    ).toEqual(16)
  })
  it("defaults to existing unit key's value in the theme when `wantedUnit` not defined ", () => {
    expect(
      unitFactory({
        rules: DEFAULT_PALETTE.base,
        palette: DEFAULT_PALETTE.base,
        alias: "fontSize",
        wantedUnit: undefined
      })
    ).toEqual("16px")
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

describe("S().base", () => {
  it("returns line-height in em units by default", () => {
    expect(S().base("lineHeight")).toEqual("1.15em")
  })
  it("returns font-size in px units by default", () => {
    expect(S().base("fontSize")).toEqual("16px")
  })
})

describe("S(theme)", () => {
  it("works without any theme being passed as a parameter", () => {
    expect(S().size(20)).toEqual("1.25em")
  })
  it("can accept a theme that augments current theme defaults", () => {
    const newTheme = {
      base: [
        {
          aliases: ["fontSize"],
          value: 10,
          unit: "px"
        }
      ],
      size: [{ aliases: ["x"], value: "11", unit: "em" }],
      options: {
        default: {
          unit: "px"
        }
      }
    }
    expect(S(newTheme).size("x")).toEqual("110px")
    expect(S(newTheme).size("m")).toBeUndefined()
  })
})
