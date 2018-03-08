// tools
import React from "react"
import { render } from "react-dom"
import styled, { ThemeProvider } from "styled-components"

// theme
import { Sugar } from "../src/index"

const Main = styled.div`
  ${props => props.theme.size.font.auto} ${props =>
      props.theme.typography.text.auto} margin: 0 auto;
  max-width: ${props => props.theme.size.block.column.maxwidth.m}px;
  ${props =>
    props.theme.size.breakpoint.min.xxl`max-width: ${props =>
      props.theme.size.block.column.maxwidth.l}px;`};
  padding: 0 ${props => props.theme.size.block.column.safety}em;
`
const Article = styled.article`
  padding: ${props => props.theme.size.block.spacing}em;
  border-radius: ${props => props.theme.effects.borderRadius.med}em;
  border: ${props => props.theme.size.block.border}px solid
    ${props => props.theme.color.highlight};
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
const Branded = styled.strong`color: ${props => props.theme.color.brand};`
const BrandedFade = styled(Branded)`
  color: ${props => props.theme.color.alpha.brand(props.theme.opacity.half)}
`

render(
  <div>
    <ThemeProvider theme={Sugar}>
      <Main>
        <Article>
          <Title>Title</Title>
          <Subtitle>Subtitle</Subtitle>
          <p>
            Paragraph text. <Branded>Brand colour</Branded>, <BrandedFade>faded brand clour</BrandedFade>.
          </p>
        </Article>
      </Main>
    </ThemeProvider>
  </div>,
  window.document.getElementById("app")
)
