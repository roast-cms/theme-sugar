import { S, aliasSearch, convertUnit, printUnit } from "./new"

describe("aliasSearch", () => {
  it("can find alias and return value", () => {
    const search = { aliases: [1, "a"], value: 1 }
    expect(
      aliasSearch.call([search, {}, { aliases: ["bb", 7], value: 11 }], "a")
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
