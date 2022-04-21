import { Flex, Text } from '@envoysvision/uikit'
import styled from 'styled-components'

const BaseCell = styled(Flex)`
  color: black;

  /* padding: 20px 0px; */

  min-width: 110px;

  /* flex-direction: column; */
  justify-content: flex-end;
`

export const CellContent = styled(Flex)`
  flex-direction: column;
  justify-content: center;
`

export default BaseCell
