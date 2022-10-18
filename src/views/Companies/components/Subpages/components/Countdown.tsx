// Random component
import React from 'react'
import Countdown from 'react-countdown'
import { Flex, Text } from '@envoysvision/uikit'
import { useTranslation } from '../../../../../contexts/Localization'
import styled from 'styled-components'

const Completionist = () => <span>Ended</span>

const TimeBox = styled(Flex)`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 8px;
  padding: 5px;
  width: 24px;
  height: 24px;
  box-shadow: ${({ theme }) => theme.shadows.level0};
`

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />
  } else {
    // Render a countdown
    const boxes = [
      {
        label: 'days',
        value: days,
      },
      {
        label: 'hours',
        value: hours,
      },
      {
        label: 'minutes',
        value: minutes,
      },
      {
        label: 'seconds',
        value: seconds,
      },
    ]
    return (
      <Flex>
        {boxes.map((box) => (
          <TimeBox key={`timeBox-${box.label}`} mx={'2px'} justifyContent={'center'} alignContent={'center'}>
            <Text color={'mainDark'} small style={{ lineHeight: 1 }}>
              {`${box.value < 10 ? '0' : ''}${box.value}`}
            </Text>
          </TimeBox>
        ))}
      </Flex>
    )
  }
}

const CountdownRow: React.FC<{ title: string; endTime?: string | number }> = ({ title, endTime }) => {
  if (endTime === undefined) {
    return <Completionist />
  }
  const { t } = useTranslation()

  const endDate = new Date(endTime).getTime() * 1000
  return (
    <Flex justifyItems={'space-between'} style={{ width: '100%' }} mb={'32px'}>
      <Flex style={{ width: '100%' }} alignSelf={'center'}>
        <Text fontSize={'14px'} style={{ whiteSpace: 'nowrap' }}>
          {t('%title% ends in', { title })}
        </Text>
      </Flex>
      <Flex>
        <Countdown
          precision={4}
          date={endDate}
          renderer={renderer}
          intervalDelay={1000} /* now={() => new Date().getTime()}*/
        />
      </Flex>
    </Flex>
  )
}

export default CountdownRow
