import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { EnvoysTheme } from '@envoysvision/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends EnvoysTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }

  #portal-root {
    >div {
      z-index: ${({ theme }) => theme.zIndices.modal};
    }
  }
`

export default GlobalStyle
