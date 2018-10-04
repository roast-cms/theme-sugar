import { css } from "styled-components";

export const S = () => {
  const PALETTE = {
    screen: {},
    base: {},
    font: {},
    color: {},
    size: alias => {
      const options = [
        {
          aliases: ["sm", "s", 10, "small"],
          value: 10
        },
        {
          aliases: ["m", "med", "md", "medium", 20],
          value: 20
        },
        {
          aliases: ["l", "lg", "large", 40],
          value: 40
        },
        {
          aliases: ["xl", "extra", "huge", "giant", "big", 80],
          value: 80
        }
      ];
      return aliasSearch.call(options, alias);
    }
  };
  return PALETTE;
};

export const aliasSearch = function(alias) {
  let search;
  this.forEach((v, index) => {
    if (v.aliases.indexOf(alias) > -1) {
      search = this[index].value;
    }
  });
  return search;
};
