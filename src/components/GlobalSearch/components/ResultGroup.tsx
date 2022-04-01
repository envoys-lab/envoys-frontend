import React from "react";
import styled from "styled-components";
import {Box, Heading} from '@envoysvision/uikit'
import {useTranslation} from "../../../contexts/Localization";

const StyledHeading = styled(Heading)`
  text-transform: capitalize;
`

interface ResultGroupProps {
  title: string
}

const ResultGroup: React.FC<ResultGroupProps> = ({title, children}) => {
  const { t } = useTranslation();
  return (
    <Box m={"16px"}>
      <StyledHeading mb={"12px"} as={"h3"} >{t(title)}</StyledHeading>
      {children}
    </Box>
  )
}

export default ResultGroup;
