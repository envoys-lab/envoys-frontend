import React from 'react'
import styled from 'styled-components'
import { useFarmUser } from 'state/farms/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text } from '@envoysvision/uikit'
import { Token } from '@envoysvision/sdk'
import { getBalanceNumber } from 'utils/formatBalance'
import { TokenPairImage } from 'components/TokenImage'

export interface FarmProps {
  label: string
  pid: number
  token: Token
  quoteToken: Token
}

const Container = styled.div`

  padding-left: 0px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 4px;
  }
`

const TokenWrapper = styled.div`
  width: 40px;
  margin-right: 10px;
`

const TitleContainer = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;

  /* Main_Dark */

  color: ${({ theme }) => theme.colors.text};
`

const RaiseContainer = styled.div`
  width: 38px;
  height: 22px;

  margin-left: 10px;

  border: 1px solid ${({ theme }) => theme.colors.raiseBorder};
  box-sizing: border-box;
  border-radius: 8px;

  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;

  /* Main_Dark */

  color: ${({ theme }) => theme.colors.text};
`

const Farm: React.FunctionComponent<FarmProps> = ({ token, quoteToken, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const title = label.replace('-', '/')

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Farming')}
        </Text>
      )
    }

    return null
  }

  return (
    <Container>
      <TokenWrapper>
        <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={40} height={22} />
      </TokenWrapper>
      <div>
        {handleRenderFarming()}
        <TitleContainer>{title}</TitleContainer>
      </div>
      <RaiseContainer>
        <div>0.3%</div>
      </RaiseContainer>
    </Container>
  )
}

export default Farm
