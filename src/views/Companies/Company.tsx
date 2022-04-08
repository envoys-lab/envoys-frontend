import React, { useEffect, useState } from 'react'

import Page from '../../components/Layout/Page'
import {
  HeadText,
  CompanyShortInfo,
  CompanyButton,
  About,
  CompanyDetails,
  CompanyProgress,
  Roadmap,
  CompanyMembers,
  CompanyInterviews,
} from './components'

import { getCompany } from './api'

import styles from './Company.module.scss'
import { Flex, Tab, TabMenu } from '@envoysvision/uikit'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { BaseCompany } from './utils'
import { useTranslation } from '../../contexts/Localization'

const loremIpsum = `Docs Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis, nunc sit amet volutpat
          imperdiet, nisi sapien iaculis neque, quis imperdiet sapien ipsum eget purus. Aliquam erat volutpat. Suspendisse
          pulvinar libero sed ante ullamcorper, in consequat massa consectetur. Morbi aliquam urna quis eros dignissim
          rutrum. Curabitur dapibus nisl eget justo ornare, nec mattis orci tristique. Nulla vitae consectetur ex. Mauris
          a venenatis felis. Nam interdum ut sapien a ullamcorper. Aenean sollicitudin purus metus, vitae dapibus quam
          finibus id. Praesent nulla augue, eleifend vitae magna at, pellentesque rutrum elit. Aenean nisl sem, interdum
          at mollis vitae, accumsan vitae ipsum. Mauris id leo lacinia, ultricies ante sit amet, laoreet justo. Quisque
          dignissim venenatis nisi non imperdiet. Nunc in orci odio. Nunc pulvinar purus suscipit mollis luctus. Sed
          volutpat aliquet viverra. Nulla sed nunc at ligula sagittis vestibulum. Fusce quis efficitur est. Mauris lorem
          arcu, porta vitae ex et, aliquam auctor justo. Mauris nec porta metus, eget semper eros. Integer tempus sapien
          ac faucibus suscipit. Quisque venenatis magna non ante mattis placerat. Integer fermentum libero vel massa
          elementum dignissim. Curabitur maximus lorem libero, et maximus magna laoreet id. Aenean eleifend justo nec
          mauris lobortis, at elementum ante fermentum. Pellentesque vel dignissim tortor. Nam ac lectus sem. Pellentesque
          venenatis ex ac dolor laoreet, id gravida odio posuere. Nam nisl odio, finibus et lacus id, eleifend sodales
          lacus. Integer pretium mattis turpis, vitae hendrerit lectus laoreet at. Nunc tortor quam, laoreet sit amet
          neque quis, tincidunt faucibus metus. Integer venenatis ultricies sem, eget pretium turpis sollicitudin
          fermentum. Proin pretium odio lectus, ut convallis mauris tincidunt tempus. Etiam et eros sit amet dui rhoncus
          pretium vitae quis nunc. Phasellus in mattis justo. Etiam scelerisque varius ullamcorper. Nulla vel egestas
          eros. Sed molestie lectus non turpis luctus, sit amet rutrum orci pretium. Nulla in odio suscipit eros lobortis
          scelerisque eget ut dui. Pellentesque ac aliquam nisi. Sed ac neque id lacus venenatis dignissim. Fusce eu nibh
          sapien. Aliquam erat volutpat. Vestibulum blandit rhoncus tortor, nec lobortis dolor. Curabitur vulputate velit
          velit, vel vehicula enim consectetur nec. Praesent metus quam, mollis sit amet lacus ut, porttitor vulputate
          libero. Aenean vel lacinia purus. Nulla pellentesque quam metus, in placerat purus vestibulum in. Ut vitae
          auctor augue. Pellentesque erat arcu, vestibulum blandit vulputate sit amet, semper fringilla nisl. Duis pretium
          ipsum et lacus mollis vestibulum. Vivamus blandit, lorem id lobortis sollicitudin, odio quam tincidunt felis,
          nec iaculis turpis metus sed tortor. Maecenas dignissim mauris sit amet purus blandit, convallis auctor augue
          pellentesque.`

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Company = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState<BaseCompany>()
  const [activeTab, setActiveTab] = useState(0)

  const { t } = useTranslation()

  useEffect(() => {
    handleGetCompany()
  }, [])

  const handleGetCompany = async () => {
    // console.log(companyId)
    const company = await getCompany(companyId)
    // console.log(company)
    setCompany(company)
  }

  return (
    <Page>
      <HeadText />
      <div className={styles['company__head']}>
        {company && (
          <CompanyShortInfo
            name={company.name}
            description={company.description}
            logoUrl={company.logoUrl}
            className={styles['company__head']}
          />
        )}
        {company && <CompanyButton holders={company.holders} homePageUrl={company.homePageUrl} />}
        {!company && t('Trying to load data, if this text stays 5 seconds, reload page')}
      </div>

      <div id="tabs" className={`${styles['company__tabs']}`}>
        <Flex position={'relative'} alignItems={'center'} width={'100%'}>
          <TabMenu activeIndex={activeTab} onItemClick={setActiveTab} fixedForItems={5}>
            <Tab>
              <AnchorLink offset="58" href="#ico">
                {t('ICO Details')}
              </AnchorLink>
            </Tab>
            <Tab>
              <AnchorLink offset="58" href="#about">
                {t('About')}
              </AnchorLink>
            </Tab>
            <Tab>
              <AnchorLink offset="58" href="#roadmap">
                {t('Roadmap')}
              </AnchorLink>
            </Tab>
            <Tab>
              <AnchorLink offset="58" href="#team">
                {t('Team')}
              </AnchorLink>
            </Tab>
            <Tab>
              <AnchorLink offset="58" href="#docs">
                {t('Docs')}
              </AnchorLink>
            </Tab>
          </TabMenu>
        </Flex>
      </div>
      {company && (
        <>
          <div id="ico" className={styles['company__tab-info']}>
            <div className={styles['company-ico']}>
              <div className={styles['company-ico__video']}>
                {company?.videoUrl && <iframe src={company.videoUrl} />}
              </div>
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
            {loremIpsum}
          </div>
        </>
      )}
    </Page>
  )
}

export default Company
