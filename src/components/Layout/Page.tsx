import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from '@envoysvision/uikit'
import Footer from 'components/Menu/Footer'
import { useTranslation } from '../../contexts/Localization'
import { useRouter } from 'next/router'
import { DEFAULT_META, getCustomMeta } from '../../config/constants/meta'
import Head from 'next/head'
import { AppBody } from '../App'

const StyledPage = styled.div<{ $removePadding: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ $removePadding }) => ($removePadding ? '0' : '16px')};
  padding-bottom: 0;

  background: ${({ theme }) => theme.colors.background};

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '24px')};
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '32px')};
    padding-bottom: 0;
    min-height: calc(100vh - 100px);
  }
`

export const PageMeta: React.FC<{ symbol?: string }> = ({ symbol }) => {
  const { t } = useTranslation()
  const { pathname } = useRouter()

  const pageMeta = getCustomMeta(pathname, t) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  let pageTitle = title
  if (symbol) {
    pageTitle = [symbol, title].join(' - ')
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  autoWidth?: boolean
  removePadding?: boolean
  removeInnerPadding?: boolean
  hideFooterOnDesktop?: boolean
  symbol?: string
}

const Page: React.FC<PageProps> = ({
  children,
  autoWidth,
  removePadding = false,
  removeInnerPadding = false,
  hideFooterOnDesktop = false,
  symbol,
  ...props
}) => {
  return (
    <>
      <PageMeta symbol={symbol} />
      <StyledPage $removePadding={removePadding} {...props}>
        <AppBody autoWidth={autoWidth} removePadding={removeInnerPadding}>
          {children}
        </AppBody>
        <Flex flexGrow={1} />
        <Box display={['block', null, null, hideFooterOnDesktop ? 'none' : 'block']} width="100%">
          <Footer />
        </Box>
      </StyledPage>
    </>
  )
}

export default Page
