import React, { useEffect, useState } from 'react'

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

import { getCompany, getHolders } from './api'

import styles from './Company.module.scss'
import { Flex, Tab, TabMenu, useMatchBreakpoints } from '@envoysvision/uikit'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { BaseCompany } from './utils'
import { useTranslation } from '../../contexts/Localization'

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Company = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState<BaseCompany>()
  const [holders, setHolders] = useState<number>(0)
  const [activeTab, setActiveTab] = useState(0)

  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  useEffect(() => {
    handleGetCompany()
  }, [])

  useEffect(() => {
    if (company) {
      handleGetHolders()
    }
  }, [company])

  const handleGetHolders = async () => {
    if (!company.token) {
      return
    }
    const holders = await getHolders(company?.token)
    setHolders(holders)
  }

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

  const showTabs = 5 //Object.values(visibleTabs).reduce((p, c) => p + (+c), 0);

  return (
    <Page>
      <HeadText />
      <div className={styles['company__head']}>
        <CompanyShortInfo
          name={company.name}
          description={company.description}
          logoUrl={company.logoUrl}
          className={styles['company__head']}
        />
        <CompanyButton token={company.token} holders={holders} homePageUrl={company.homePageUrl} />
      </div>

      <div id="tabs" className={`${styles['company__tabs']}`}>
        <Flex position={'relative'} alignItems={'center'} width={'100%'}>
          <TabMenu activeIndex={activeTab} onItemClick={setActiveTab} fixedForItems={isMobile ? 0 : showTabs}>
            {visibleTabs.ico && (
              <AnchorLink offset="58" href="#ico">
                <Tab className={``}>
                  <span style={{ whiteSpace: isMobile ? 'nowrap' : 'normal' }}>{t('ICO Details')}</span>
                </Tab>
              </AnchorLink>
            )}
            {visibleTabs.about && (
              <AnchorLink offset="58" href="#about">
                <Tab>{t('About')}</Tab>
              </AnchorLink>
            )}
            {visibleTabs.roadmap && (
              <AnchorLink offset="58" href="#roadmap">
                <Tab>{t('Roadmap')}</Tab>
              </AnchorLink>
            )}
            {visibleTabs.team && (
              <AnchorLink offset="58" href="#team">
                <Tab>{t('Team')}</Tab>
              </AnchorLink>
            )}
            {visibleTabs.documents && (
              <Tab>
                <AnchorLink offset="58" href="#docs">
                  {t('Docs')}
                </AnchorLink>
              </Tab>
            )}
          </TabMenu>
        </Flex>
      </div>
      <div id="ico" className={styles['company__tab-info']}>
        <div className={styles['company-ico']}>
          <div className={styles['company-ico__video']}>{company?.videoUrl && <iframe src={company.videoUrl} />}</div>
          <div className={styles['company-ico__stages']}>
            {company &&
              company.stages &&
              company?.stages.map((stage, index) => <CompanyProgress key={index} stage={stage} />)}
          </div>
          <div>{company && <CompanyDetails details={company.details} />}</div>
        </div>
      </div>
      <div id="about" className={styles['company__tab-info']}>
        <div className={styles['company__tab-info-header']}>{t('About %company%', { company: company?.name })}</div>
        <About markdown={company.about.text} />
      </div>
      <div id="roadmap" className={styles['company__tab-info']}>
        <div className={styles['company__tab-info-header']}>{t('Roadmap')}</div>
        <Roadmap company={company} />
      </div>
      <div id="team" className={styles['company__tab-info']}>
        <div className={styles['company__tab-info-header']}>{company?.name} Team</div>
        <CompanyMembers members={company.members.filter((member) => !member.advisor)} />
        <div className={styles['company__tab-info-header']}>Advisors</div>
        <CompanyMembers members={company.members.filter((member) => member.advisor)} />
        <div className={styles['company__tab-info-header']}>{company?.name} Interviews</div>
        <CompanyInterviews members={company.members} />
      </div>
      <div id="docs" className={styles['company__tab-info']}>
        <div className={styles['company__tab-info-header']}>{t('Docs')}</div>
        {company.documents && company.documents.length && <Documents documents={company.documents} />}
      </div>
    </Page>
  )
}

export default Company
