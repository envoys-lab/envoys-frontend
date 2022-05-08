import { Button, IconButton, Text } from '@envoysvision/uikit'
import Balance from 'components/Balance'
import styled from 'styled-components'

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* padding-left: 17px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;

  display: flex;
  align-items: center;
  flex-direction: row; */
`

export const ActionTitles = styled.div`
  display: flex;
`

export const ActionContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const HorizontalSpacer = styled.div<{ size: number }>`
  width: ${({ size }) => size / 6.99 + '%'};
  height: 8px;
`

export const ActionPanelContainer = styled.div`
  width: 75%;

  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding-left: 24px;
  }
`

export const PanelContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  padding: 14px 13px 12px 13px;
  height: 100%;
`

export const ActionButton = styled(Button)`
  font-size: 14px !important;
  font-weight: 500;
  line-height: 16px;

  border-radius: 10px;

  /* height: 42px; */
  /* min-width: 134px; */
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding-right: 8px;
`

export const EnvoysBalance = styled(Balance)`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`

export const HarvestText = styled(Text)<{ opacity?: number }>`
  opacity: ${({ opacity }) => opacity ?? 1.0};
`

export const EnvoysIconButton = styled(IconButton)`
  width: 40px;
  height: 40px;
`

export const HarvestControlsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
`

export const TitleText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  text-align: right;

  color: ${({ theme }) => theme.colors.text};

  opacity: 0.7;
`
export const VerticalSpacer = styled.div<{ height: number }>`
  height: ${({ height }) => height + 'px'};
  min-height: ${({ height }) => height + 'px'};
`
