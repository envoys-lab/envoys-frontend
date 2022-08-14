import React, { useEffect, useState } from 'react'
import Scrollspy from 'react-scrollspy'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Box, useMatchBreakpoints } from '@envoysvision/uikit'

import PageLoader from 'components/Loader/PageLoader'
import Page from '../../components/Layout/Page'
import {
  HeadText,
  CompanyShortInfo,
  CompanyButton,
  About,
  CompanyDetails,
  CompanyProgress,
  Documents,
  Roadmap,
  CompanyMembers,
  CompanyInterviews,
} from './components'
import { BaseCompany } from './utils'
import { useTranslation } from '../../contexts/Localization'

import { getCompany } from './api'

import styles from './Company.module.scss'
import { CompanyHead, CompanyTabInfo, CompanyTabInfoHeader, CompanyTabs, StyledFrame } from './styles'

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Company = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState<BaseCompany>()

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()

  const lowResolutionMode = isTablet || isMobile

  useEffect(() => {
    handleGetCompany()
  }, [])

  const handleGetCompany = async () => {
    const company = await getCompany(companyId)
    setCompany(company)
  }

  if (!company) return <PageLoader />

  const visibleTabs = {
    ico: company.details || company.videoUrl || company.stages?.length,
    about: !!company.about?.text,
    roadmap: !!company.roadmap?.length,
    team: !!company.members?.length,
    documents: !!company.documents?.length,
  }

  return (
    <Page>
      <HeadText />
      <CompanyHead>
        <CompanyShortInfo
          name={company.name}
          description={company.description}
          logoUrl={company.logoUrl}
          className={styles['company__head']}
        />
        <CompanyButton
          id={company._id}
          token={company.token}
          holders={company.holdersCount}
          homePageUrl={company.homePageUrl}
        />
      </CompanyHead>
      <CompanyTabs id="tabs">
        <Scrollspy
          offset={lowResolutionMode ? -95 : -35}
          className={styles.scrollspy}
          items={['ido', 'about', 'roadmap', 'team', 'docs']}
          currentClassName={styles.isCurrent}
        >
          {visibleTabs.ico && (
            <AnchorLink href="#ido">
              <span style={{ whiteSpace: isMobile ? 'nowrap' : 'normal' }}>{t('IDO Details')}</span>
            </AnchorLink>
          )}
          {visibleTabs.about && <AnchorLink href="#about">{t('About')}</AnchorLink>}
          {visibleTabs.roadmap && <AnchorLink href="#roadmap">{t('Roadmap')}</AnchorLink>}
          {visibleTabs.team && <AnchorLink href="#team">{t('Team')}</AnchorLink>}
          {visibleTabs.documents && <AnchorLink href="#docs">{t('Docs')}</AnchorLink>}
        </Scrollspy>
      </CompanyTabs>
      <CompanyTabInfo id="ido">
        <Box width={'100%'}>
          <div>{company?.videoUrl && <StyledFrame src={company.videoUrl} />}</div>
          <Box pt={'30px'}>
            {company &&
              company.stages &&
              company?.stages.map((stage, index) => <CompanyProgress key={index} stage={stage} />)}
          </Box>
          <div>{company && <CompanyDetails details={company.details} />}</div>
        </Box>
      </CompanyTabInfo>
      <CompanyTabInfo id="about">
        <CompanyTabInfoHeader>{t('About %company%', { company: company?.name })}</CompanyTabInfoHeader>
        <About markdown={company.about.text} />
      </CompanyTabInfo>
      <CompanyTabInfo id="roadmap">
        <CompanyTabInfoHeader>{t('Roadmap')}</CompanyTabInfoHeader>
        <Roadmap company={company} />
      </CompanyTabInfo>
      <CompanyTabInfo id="team">
        <CompanyTabInfoHeader>{company?.name} Team</CompanyTabInfoHeader>
        <CompanyMembers members={company.members.filter((member) => !member.advisor)} />
        <CompanyTabInfoHeader>Advisors</CompanyTabInfoHeader>
        <CompanyMembers members={company.members.filter((member) => member.advisor)} />
        <CompanyTabInfoHeader>{company?.name} Interviews</CompanyTabInfoHeader>
        <CompanyInterviews members={company.members} />
      </CompanyTabInfo>
      <CompanyTabInfo id="docs">
        <CompanyTabInfoHeader>{t('Docs')}</CompanyTabInfoHeader>
        {company.documents && company.documents.length && <Documents documents={company.documents} />}
      </CompanyTabInfo>
    </Page>
  )
}

export default Company
