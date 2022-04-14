import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { ArrowDropDownIcon, Box, BoxProps, Text } from '@envoysvision/uikit'

const TextContainer = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  text-align: center;

  color: ${({ theme }) => theme.colors.text};
`

const ArrowContainer = styled.div`
  margin-left: 10px;
  padding-right: 17px;
`

const DropDownHeader = styled.div`
  width: 100%;
  /* height: 30px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 0px 10px; */
  /* box-shadow: ${({ theme }) => theme.shadows.inset};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px; */
  background: ${({ theme }) => theme.colors.input};
  transition: border-radius 0.15s;
  /* min-width: 70px; */
`

const DropDownListContainer = styled.div`
  /* min-width: 70px; */
  height: 0;
  position: absolute;
  overflow: hidden;
  /* background: ${({ theme }) => theme.colors.input}; */
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  width: 100%;

  min-width: 136px;

  right: 0px;
  top: 24px;

  background: rgba(255, 255, 255, 0.8);
  /* under layer */

  border: 1px solid #F9F9F9;
  box-sizing: border-box;
  /* Popup_blured */

  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(40px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 14px;

  padding-top: 15px;
  padding-bottom: 10px;
`

const DropDownContainer = styled(Box)<{ isOpen: boolean }>`
  cursor: pointer;
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.input};

  user-select: none;
  z-index: 20;

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
      }
    `}

  svg {
    fill: none !important;

    /* position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%); */
  }
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`

const ListItem = styled.li`
  list-style: none;
  padding: 5px 20px;
  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;

  /* Dark clear */

  color: ${({ theme }) => theme.colors.textSubtle};

  opacity: 0.8;
`

export interface SelectProps extends BoxProps {
  options: OptionProps[]
  onOptionChange?: (option: OptionProps) => void
  defaultOptionIndex?: number
}

export interface OptionProps {
  label: string
  value: any
}

const Select: React.FunctionComponent<SelectProps> = ({
  options,
  onOptionChange,
  defaultOptionIndex = 0,
  ...props
}) => {
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultOptionIndex)

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen)
    event.stopPropagation()
  }

  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex)
    setIsOpen(false)

    if (onOptionChange) {
      onOptionChange(options[selectedIndex])
    }
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <DropDownContainer isOpen={isOpen} {...props}>
      <DropDownHeader onClick={toggling}>
        <TextContainer>{options[selectedOptionIndex].label}</TextContainer>
      </DropDownHeader>

      <ArrowContainer>
      <ArrowDropDownIcon width="10px" height="8px" onClick={toggling} />
      </ArrowContainer>
      

      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {options.map((option, index) =>
            index !== selectedOptionIndex ? (
              <ListItem onClick={onOptionClicked(index)} key={option.label}>
                {option.label}
                {/* <Text></Text> */}
              </ListItem>
            ) : null,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default Select
