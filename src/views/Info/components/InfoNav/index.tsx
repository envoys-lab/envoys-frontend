import { Box, ButtonMenu, ButtonMenuItem, Flex } from '@envoysvision/uikit'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
// import Search from 'views/Info/components/InfoSearch'

const NavWrapper = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const InfoNav = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const isPools = router.asPath === '/info/pools'
  const isTokens = router.asPath === '/info/tokens'
  let activeIndex = 0
  if (isPools) {
    activeIndex = 1
  }
  if (isTokens) {
    activeIndex = 2
  }
  return (
    <Flex mx={'auto'} mt={'20px'} alignItems={'center'} flexDirection={'column'}>
      <NavWrapper>
        <Box>
          <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
            <ButtonMenuItem as={NextLinkFromReactRouter} to="/info">
              {t('Overview')}
            </ButtonMenuItem>
            <ButtonMenuItem as={NextLinkFromReactRouter} to="/info/pools">
              {t('Pools')}
            </ButtonMenuItem>
            <ButtonMenuItem as={NextLinkFromReactRouter} to="/info/tokens">
              {t('Tokens')}
            </ButtonMenuItem>
          </ButtonMenu>
        </Box>
        {/*<Box width={['100%', '100%', '250px']}>
        <Search />
      </Box>*/}
      </NavWrapper>
    </Flex>
  )
}

export default InfoNav
