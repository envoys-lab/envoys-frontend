import {ArrowDownIcon, ArrowUpDownIcon, Flex, FlexProps, Skeleton, Text} from '@envoysvision/uikit'
import React, { FC } from 'react'
import { formatAmount, formatAmountNotation } from 'views/Info/utils/formatInfoNumbers'
import {Field} from "../../../../state/swap/actions";
import {SwitchIconButton} from "../../index";

const formatOptions = {
  notation: 'standard' as formatAmountNotation,
  displayThreshold: 0.001,
  tokenPrecision: true,
}

interface TokenDisplayProps extends FlexProps {
  value?: number
  inputSymbol?: string
  outputSymbol?: string
}

const TokenDisplay: FC<TokenDisplayProps> = ({ value, inputSymbol, outputSymbol, children, ...props }) => {
  return value ? (
    <Flex alignItems="center" flexWrap="wrap" {...props}>
      <Text fontSize="18px" mr="8px" bold>
        {formatAmount(value, formatOptions)}
      </Text>
      {inputSymbol && outputSymbol && (
        <Text color="mainDark" fontSize="18px"  mr="8px" bold>
          {`${inputSymbol}/${outputSymbol}`}
        </Text>
      )}
      {children}
    </Flex>
  ) : (
    <Skeleton height="36px" width="128px" {...props} />
  )
}

export default TokenDisplay
