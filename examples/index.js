//
// tools
import "typeface-indie-flower"
import "typeface-lobster-two"
import "typeface-yanone-kaffeesatz"

import styled, { ThemeProvider } from "styled-components"

import { render } from "react-dom"
import React from "react"

import { Sugar } from "../src/index"
import { S, convertUnit } from "../src/new"

console.log(S().size("m"))
//
//
//
//
const Main = styled.div`
  & > * ::selection {
    background: ${props => props.theme.color.highlight()};
    color: ${props => props.theme.color.background()};
  }
  ${props => props.theme.size.font.auto} ${props =>
    props.theme.typography.text.auto} margin: 0 auto;
  max-width: ${props => props.theme.size.block.column.m}px;
  ${props =>
    props.theme.size.breakpoint.min.xxl`max-width: ${props =>
      props.theme.size.block.column.l}px;`};
  padding: 4em ${props => props.theme.size.block.padding}em;
`
const Article = styled.article`
  background: ${props => props.theme.color.background()};
  padding: ${props => props.theme.size.block.spacing}em;
  border-radius: ${props => props.theme.effects.borderRadius.med}em;
  border: ${props => props.theme.size.block.border}px solid
    ${props => props.theme.color.highlight()};
`
const Title = styled.h1`
  ${props => props.theme.typography.title.auto} font-size: ${props =>
  props.theme.size.font.make.larger}em;
  hyphens: auto;
`
const Subtitle = styled.h2`
  ${props => props.theme.typography.title.auto} font-size: ${props =>
  props.theme.size.font.make.larger / 2}em;
`
const Branded = styled.strong`
  color: ${props => props.theme.color.brand()};
`
const BrandedFade = styled(Branded)`
  color: ${props => props.theme.color.brand(props.theme.opacity.half)};
  font-size: ${props => props.theme.size.font.make.smaller}em;
`
const SpecialFont = styled.span`
  font-family: ${props => props.theme.font_special};
`
//
// app
render(
  <div>
    <ThemeProvider
      theme={{
        ...Sugar({
          color_brand: "rgb(189,67,54)",
          color_background: "rgb(44,44,44)",
          color_foreground: "rgb(224,213,255)",
          //
          font_heading: "'Yanone Kaffeesatz', sans-serif",
          font_heading_weight: 400,
          //
          font_body: "'Lobster Two', serif",
          //
          size_base: 28,
          size_column_medium: 700,
          size_column_large: 900,
          size_block_padding: 2,
          size_block_spacing: 1.5,
          size_block_border: 10,
          //
          effects_border_radius: 1
        }),
        font_special: "'Indie Flower', cursive"
      }}
    >
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
