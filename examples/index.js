//
// tools
import "typeface-indie-flower"
import "typeface-lobster-two"
import "typeface-yanone-kaffeesatz"

import styled, { ThemeProvider, css } from "styled-components"

import { render } from "react-dom"
import React from "react"

import { S } from "../src/"

const theme = {
  color: [
    {
      find: ["main", "brand", "red", "brown"],
      value: "#bd4336",
      unit: "hex"
    },
    {
      find: ["foreground", "text"],
      value: "#fdecff",
      unit: "hex"
    },
    {
      find: ["background"],
      value: "#2c2c2c",
      unit: "hex"
    },
    {
      find: ["highlight", "yellow", "selection"],
      value: "rgb(255,255,0)",
      unit: "rgb"
    }
  ],
  text: [
    {
      find: ["headingFont", "heading", "title-text", "title"],
      value: "'Yanone Kaffeesatz', sans-serif",
      unit: "name"
    },
    {
      find: ["body", "font", "text", "paragraph"],
      value: "'Lobster Two', serif",
      unit: "name"
    },
    {
      find: ["special"],
      value: "'Indie Flower', cursive",
      unit: "name"
    },
    {
      find: ["line-height", "line", "lineHeight"],
      value: 1.75,
      unit: "em"
    },
    {
      find: ["letter-spacing", "letters", "lspacing", "letterSpacing"],
      value: 1.025,
      unit: "em"
    }
  ],
  size: [
    {
      find: ["wide-column", "big-col", "big-column", "largeColumn", 900],
      value: 900,
      unit: "px"
    },
    {
      find: [
        "short-column",
        "med-col",
        "medium-column",
        "column-m",
        "c-m",
        700
      ],
      value: 700,
      unit: "px"
    },
    {
      find: ["std-padding", "padding", "large", "lg", 2],
      value: 2,
      unit: "em"
    },
    {
      find: ["spacing", "med", "std-spacing", "spacer", "m", 1.5],
      value: 1.5,
      unit: "em"
    },
    {
      find: ["std-border", "border", "thick-line", 10],
      value: 10,
      unit: "px"
    },
    {
      find: [
        "standard",
        "base",
        "main",
        "text",
        "font",
        "border-radius",
        "borderRadius",
        "radius",
        "sm",
        1
      ],
      value: 1,
      unit: "em"
    },
    {
      find: ["smaller", "sm", "xs"],
      value: 0.85,
      unit: "em"
    }
  ],
  media: [
    {
      find: ["huge"],
      value: 1280,
      unit: "px"
    }
  ],
  options: {
    default: {
      unit: "em",
      em: 28
    }
  }
}

const hugeScreen = (...args) => css`
  @media (min-width: ${props => props.theme.media("huge", null)}) {
    ${css(...args)};
  }
`

const font = css`
  color: ${props => props.theme.color("text")};
  font-family: ${props => props.theme.text("body")};
  font-size: ${props => props.theme.size("text", "px")};
  line-height: ${props => props.theme.text("lineHeight")};
  letter-spacing: ${props => props.theme.text("letter-letterSpacing")};
`
const headerFont = css`
  ${font}
  font-family: ${props => props.theme.text("heading")};
  font-size: ${props => props.theme.size(2)};
`
const Main = styled.div`
  ${font}
  margin: 0 auto;

  ${hugeScreen`
    max-width: ${props => props.theme.size(900)}
  `}

  max-width: ${props => props.theme.size("short-column")};
  padding: ${props =>
    props.theme.size("padding", null, "value") * 2}em ${props =>
  props.theme.size("padding")};

  & > * ::selection {
    background: ${props => props.theme.color("highlight")};
    color: ${props => props.theme.color("text")};
  }
`
const Article = styled.article`
  background: ${props => props.theme.color("background")};
  padding: ${props => props.theme.size("padding")};
  border-radius: ${props => props.theme.size("borderRadius")};
  border: ${props => props.theme.size("border")} solid
    ${props => props.theme.color("highlight")};
`
const Title = styled.h1`
  ${headerFont} hyphens: auto;
`
const Subtitle = styled.h2`
  ${headerFont}
  font-size: ${props => props.theme.size("med")}
`
const Branded = styled.strong`
  color: ${props => props.theme.color("red")};
`
const BrandedFade = styled(Branded)`
  color: ${props => props.theme.color("red")};
  opacity: 0.5;
  font-size: ${props => props.theme.size("smaller")};
`
const SpecialFont = styled.span`
  font-family: ${props => props.theme.text("special")};
`

render(
  <div>
    <ThemeProvider theme={S(theme)}>
      <Main>
        <Article>
          <Title>Title</Title>
          <Subtitle>Subtitle</Subtitle>
          <p>
            Paragraph text. <Branded>Brand colour</Branded>,{" "}
            <BrandedFade>faded brand clour</BrandedFade>.{" "}
            <SpecialFont>Special font</SpecialFont>.
          </p>
        </Article>
      </Main>
    </ThemeProvider>
  </div>,
  window.document.getElementById("app")
)
