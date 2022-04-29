import React from 'react'
import { Flex, Grid, Text } from '@envoysvision/uikit'

import QuestionHelper from 'components/QuestionHelper'
import { useTranslation } from 'contexts/Localization'
import { GAS_PRICE, GAS_PRICE_GWEI } from 'state/user/hooks/helpers'
import { useGasPriceManager } from 'state/user/hooks'
import { SettingsOptionButton } from '../GlobalSearch/components/styles'

interface GasSettingsProps {
  showHelper?: boolean
}

const GasSettings: React.FC<GasSettingsProps> = ({ showHelper = false }) => {
  const { t } = useTranslation()
  const [gasPrice, setGasPrice] = useGasPriceManager()

  const getGasPriceKey = (gasPriceVal) => Object.keys(GAS_PRICE)[Object.values(GAS_PRICE).indexOf(gasPriceVal)]

  const showButtons: string[] = [GAS_PRICE.default, GAS_PRICE.fast, GAS_PRICE.instant].map(getGasPriceKey)

  return (
    <Flex flexDirection="column">
      {showHelper ? (
        <Flex mb="7px" alignItems="center" p={'4px'}>
          <Text fontSize={'14px'}>{t('Default Transaction Speed (GWEI)')}</Text>
          <QuestionHelper
            text={t(
              'Adjusts the gas price (transaction fee) for your transaction. Higher GWEI = higher speed = higher fees',
            )}
            placement="top-start"
            ml="4px"
          />
        </Flex>
      ) : (
        <Text color={'darkClear'} mb={'7px'} fontSize={'14px'} p={'4px'}>
          {t('Gas settings')}
        </Text>
      )}

      <Grid gridGap={12} gridTemplateColumns={`repeat(3, 1fr)`} mb={'12px'}>
        {showButtons.map((gas, key) => (
          <SettingsOptionButton
            key={`gas-option-${key}`}
            onClick={() => setGasPrice(GAS_PRICE_GWEI[gas])}
            $active={gasPrice === GAS_PRICE_GWEI[gas]}
          >
            <Flex mx={'1px'} flexDirection={'column'}>
              <Text fontSize={'14px'} color={'inherit'} bold>
                {t(`gas_${gas}`)}
              </Text>
              <Text fontSize={'14px'} color={'darkClear'} thin>
                ({GAS_PRICE[gas]} Gwei)
              </Text>
            </Flex>
          </SettingsOptionButton>
        ))}
        {/*<SettingsOptionButton
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.default)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.default ? 'primary' : 'tertiary'}
        >
          {t('Standard (%gasPrice%)', { gasPrice: GAS_PRICE.default })}
        </SettingsOptionButton>
        <SettingsOptionButton
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.fast)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.fast ? 'primary' : 'tertiary'}
        >
          {t('Fast (%gasPrice%)', { gasPrice: GAS_PRICE.fast })}
        </SettingsOptionButton>
        <SettingsOptionButton
          mr="4px"
          mt="4px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.instant)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.instant ? 'primary' : 'tertiary'}
        >
          {t('Instant (%gasPrice%)', { gasPrice: GAS_PRICE.instant })}
        </SettingsOptionButton>*/}
      </Grid>
    </Flex>
  )
}

export default GasSettings
