import civixDocs from '~/assets/civix_docs.svg';
import civixFinanceDash from '~/assets/civix_finance_dash.svg';
import civixInvoice from '~/assets/civix_invoice.svg';
import civixPo from '~/assets/civix_po.svg';
import civixBg from '~/assets/civix_bg.jpg';
import { Footer } from '~/components/footer';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Icon } from '~/components/icon';
import { useFetcher } from '@remix-run/react';
import { useState } from 'react';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { Fragment } from 'react';
import { media } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import styles from './civix.module.css';

const title = 'CIVIX';
const description =
  'A centralized platform that helps construction businesses manage proformas, purchase orders, delivery notes, and invoices — all in one secure, easy-to-use system. Reduce paperwork. Improve accuracy. Get paid faster.';

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

const DemoForm = ({ centered }) => {
  const [showInput, setShowInput] = useState(false);
  const fetcher = useFetcher();
  const sending = fetcher.state === 'submitting';
  const success = fetcher.data?.success;

  if (success) {
    return (
      <div style={{
        color: 'var(--textTitle)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered ? 'center' : 'flex-start',
        gap: '8px',
        marginTop: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
          <Icon icon="check" /> Request Sent
        </div>
        <span style={{ fontSize: '14px' }}>We'll contact you shortly.</span>
      </div>
    );
  }

  if (showInput) {
    return (
      <fetcher.Form
        method="post"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          maxWidth: '400px',
          marginTop: '20px',
          marginRight: centered ? 'auto' : '0',
          marginLeft: centered ? 'auto' : '0'
        }}
      >
        <Input
          label="Phone Number"
          placeholder="+250 788 123 456"
          type="tel"
          name="phone"
          style={{ '--inputHeight': '48px' }}
        />
        <Input
          required
          label="Your Email"
          placeholder="name@example.com"
          type="email"
          name="email"
          style={{ '--inputHeight': '48px' }}
        />
        <Button type="submit" loading={sending} secondary icon="send">
          Send Request
        </Button>
      </fetcher.Form>
    );
  }

  return (
    <Button
      secondary
      iconHoverShift
      icon="chevron-right"
      onClick={() => setShowInput(true)}
      style={{ marginTop: '20px' }}
    >
      Request a Demo
    </Button>
  );
};

export function Civix() {
  return (
    <Fragment>
      <ProjectContainer className="civix">
        <ProjectBackground
          src={civixBg}
          srcSet={`${civixBg} 1280w, ${civixBg} 2560w`}
          width={1280}
          height={800}
          placeholder={civixBg}
          opacity={0.5}
        />
        <ProjectHeader
          className={styles.header}
          title={title}
          description={
            <Fragment>
              A centralized platform that helps construction businesses manage proformas, purchase orders, delivery notes, and invoices — all in one secure, easy-to-use system.
              <span className={styles.tagline}>
                Reduce paperwork. Improve accuracy. Get paid faster.
              </span>
            </Fragment>
          }
          centered
        >
          <DemoForm centered />
        </ProjectHeader>
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <div className={styles.valueBar}>
              <div className={styles.valueItem}>📄 Document Control</div>
              <div className={styles.valueItem}>🛒 Automated POs</div>
              <div className={styles.valueItem}>🧾 Easy Invoicing</div>
              <div className={styles.valueItem}>🏗 Construction Ready</div>
            </div>
            <ProjectImage
              srcSet={`${civixFinanceDash} 800w, ${civixFinanceDash} 1920w`}
              width={800}
              height={500}
              placeholder={civixFinanceDash}
              alt="Civix Finance Dashboard Interface"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>Streamlined Operations</ProjectSectionHeading>
              <ProjectSectionText>
                Civix transforms how construction businesses handle their daily documentation.
                By providing a single source of truth for all financial and delivery records,
                we ensure that every stakeholder stays informed and every project stays on track.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered>
            <div className={styles.textSection}>
              <ProjectSectionHeading>Purchase Orders & Management</ProjectSectionHeading>
              <ProjectSectionText>
                Generate and manage purchase orders with ease. Our system automates the
                workflow from request to approval, ensuring that every purchase is
                accounted for and within budget.
              </ProjectSectionText>
            </div>
            <ProjectImage
              srcSet={`${civixPo} 800w, ${civixPo} 1600w`}
              width={800}
              height={600}
              placeholder={civixPo}
              alt="Purchase Order Management Interface"
              sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
            />
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered>
            <ProjectImage
              srcSet={`${civixInvoice} 800w, ${civixInvoice} 1600w`}
              width={800}
              height={600}
              placeholder={civixInvoice}
              alt="Invoice Management Interface"
              sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
            />
            <div className={styles.textSection}>
              <ProjectSectionHeading>Automated Invoicing</ProjectSectionHeading>
              <ProjectSectionText>
                Turn delivery notes into professional invoices instantly. Civix tracks
                every item delivered and received, making it simple to get paid
                accurately and on time.
              </ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>Document Centralization</ProjectSectionHeading>
              <ProjectSectionText>
                All your project documents in one secure place. From compliance forms to
                site reports, Civix keeps your records organized and accessible from
                anywhere, at any time.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectImage
              srcSet={`${civixDocs} 800w, ${civixDocs} 1920w`}
              width={800}
              height={500}
              placeholder={civixDocs}
              alt="Civix Documentation Interface"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}
