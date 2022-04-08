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
} from './components'

import { getCompany } from './api'

import styles from './Company.module.scss'
import { Flex, Tab, TabMenu } from '@envoysvision/uikit'
import AnchorLink from 'react-anchor-link-smooth-scroll'

// http://localhost:3000/companies/6231a191e8e2c000132c2033
const Company = ({ companyId }: { companyId: string }) => {
  const [company, setCompany] = useState<any>()
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    handleGetCompany()
  }, [])

  const handleGetCompany = async () => {
    console.log(companyId)
    const company = await getCompany(companyId)
    console.log(company)
    setCompany(company)
  }

  if (!company) return <PageLoader />

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
        <CompanyButton holders={company.holders} homePageUrl={company.homePageUrl} />
      </div>
      <div id="tabs" className={`${styles['company__tabs']}`}>
        <Flex position={'relative'} alignItems={'center'} width={'100%'}>
          <TabMenu activeIndex={activeTab} onItemClick={setActiveTab} fixedForItems={5}>
            <Tab>
              <AnchorLink offset="58" href="#ico">
                ICO Details
              </AnchorLink>
            </Tab>
            <Tab>
              <AnchorLink offset="58" href="#about">
                About
              </AnchorLink>
            </Tab>
            <Tab>
              <AnchorLink offset="58" href="#roadmap">
                Roadmap
              </AnchorLink>
            </Tab>
            <Tab>
              <AnchorLink offset="58" href="#team">
                Team
              </AnchorLink>
            </Tab>
            <Tab>
              <AnchorLink offset="58" href="#docs">
                Docs
              </AnchorLink>
            </Tab>
          </TabMenu>
        </Flex>
      </div>
      <div id="ico" className={styles['company__tab-info']}>
        <div className={styles['company-ico']}>
          <div className={styles['company-ico__video']}>
            {company.videoUrl && <iframe src={company.videoUrl}></iframe>}
          </div>
          <div className={styles['company-ico__stages']}>
            {company.stages && company.stages.map((stage) => <CompanyProgress stage={stage} />)}
          </div>
          <div>
            <CompanyDetails company={company} />
          </div>
        </div>
      </div>
      <div id="about" className={styles['company__tab-info']}>
        <div className={styles['company__tab-info-header']}>About {company.name}</div>
        <About markdown={company.about.text} />
      </div>
      <div id="roadmap" className={styles['company__tab-info']}>
        Roadmap Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis, nunc sit amet volutpat
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
        pellentesque.
      </div>
      <div id="team" className={styles['company__tab-info']}>
        Team Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis, nunc sit amet volutpat
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
        pellentesque.
      </div>
      <div id="docs" className={styles['company__tab-info']}>
        {company.documents && company.documents.length && (
          <div>
            <div className={styles['company__tab-info-header']}>Documents</div>
            <Documents documents={company.documents} />
          </div>
        )}
      </div>
    </Page>
  )
}

export default Company
