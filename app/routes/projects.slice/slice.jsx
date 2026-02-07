import sprBackground from '~/assets/spr-background.jpg';
import sprBackgroundLarge from '~/assets/spr-background-large.jpg';
import sprBackgroundPlaceholder from '~/assets/spr-background-placeholder.jpg';
import qbotHeader from '~/assets/qbot header.jpg';
import qbotIntegration from '~/assets/qbot-integration.png';
import qbotChat from '~/assets/qbot_chat.svg?url';
import qbotAnalytics from '~/assets/qbot-analytics.png';
import qbotAnalyticsSvg from '~/assets/qbot_analytics.svg?url';
import qbotTeam from '~/assets/qbot-team.png';
import { Button } from '~/components/button';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
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
import styles from './slice.module.css';

const title = 'QBot';
const description =
  'Automate and enhance your customer interactions with our intelligent AI chatbot, designed to respond, support, and grow your business effortlessly.';

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

export const Slice = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          src={qbotHeader}
          srcSet={`${qbotHeader} 1280w, ${qbotHeader} 2560w`}
          width={1280}
          height={800}
          placeholder={qbotHeader}
          opacity={0.8}
        />
        <ProjectHeader
          title="Customer Assistance Chatbot"
          description="Talk to your customers. Take orders. Support them 24/7. A smart chatbot that answers questions, shows services, books orders, and connects to a real person when needed."
        >
          <DemoForm />
        </ProjectHeader>

        <ProjectSection padding="top">
          <ProjectSectionContent>
            <div className={styles.valueBar}>
              <div className={styles.valueItem}>💬 Chat Support</div>
              <div className={styles.valueItem}>🌍 Multiple Languages</div>
              <div className={styles.valueItem}>🤝 Human Help</div>
            </div>


          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center noMargin>
              <ProjectSectionHeading>Everything Your Business Needs</ProjectSectionHeading>
              <ProjectSectionText>
                QBot is more than just a chatbot. It's an intelligent extension of your team,
                capable of handling complex workflows and delivering personalized experiences.
              </ProjectSectionText>
            </ProjectTextRow>

            <div className={styles.features}>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>
                  <span className={styles.featureIcon}>💬</span> Customer Chat Support
                </h3>
                <ProjectSectionText>
                  Answers customer questions instantly, available day and night to help your customers.
                </ProjectSectionText>
              </div>

              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>
                  <span className={styles.featureIcon}>📋</span> Menu & Services Display
                </h3>
                <ProjectSectionText>
                  Shows menus and services clearly with prices, making it easy for customers to understand.
                </ProjectSectionText>
              </div>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>
                  <span className={styles.featureIcon}>📅</span> Booking & Order Assistance
                </h3>
                <ProjectSectionText>
                  Books appointments and takes orders, confirming details automatically for you.
                </ProjectSectionText>
              </div>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>
                  <span className={styles.featureIcon}>🤝</span> Human Support When Needed
                </h3>
                <ProjectSectionText>
                  Handles simple tasks alone and calls a real person when needed to keep customers satisfied.
                </ProjectSectionText>
              </div>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>
                  <span className={styles.featureIcon}>🏢</span> Built for Many Businesses
                </h3>
                <ProjectSectionText>
                  Customized for Restaurants, Hotels, Shops, and various Service providers.
                </ProjectSectionText>
              </div>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>
                  <span className={styles.featureIcon}>🌍</span> Multi-Language Support
                </h3>
                <ProjectSectionText>
                  Customers choose their preferred language for clear communication and wider reach.
                </ProjectSectionText>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>How It Works</ProjectSectionHeading>
            </ProjectTextRow>
            <div className={styles.howItWorks}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <ProjectSectionText>Customer contacts your business</ProjectSectionText>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <ProjectSectionText>Chatbot replies and helps</ProjectSectionText>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <ProjectSectionText>Human joins if needed</ProjectSectionText>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <ProjectSectionText>Problem is solved</ProjectSectionText>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>Used By Businesses Like</ProjectSectionHeading>
            </ProjectTextRow>
            <div className={styles.industryGrid}>
              <div className={styles.industryItem}>
                <span className={styles.industryIcon}>🍽</span>
                <ProjectSectionText>Restaurants</ProjectSectionText>
              </div>
              <div className={styles.industryItem}>
                <span className={styles.industryIcon}>🏨</span>
                <ProjectSectionText>Hotels</ProjectSectionText>
              </div>
              <div className={styles.industryItem}>
                <span className={styles.industryIcon}>🛍</span>
                <ProjectSectionText>Shops</ProjectSectionText>
              </div>
              <div className={styles.industryItem}>
                <span className={styles.industryIcon}>🧘</span>
                <ProjectSectionText>Services</ProjectSectionText>
              </div>
              <div className={styles.industryItem}>
                <span className={styles.industryIcon}>💼</span>
                <ProjectSectionText>Online Businesses</ProjectSectionText>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>How This Helps Your Business</ProjectSectionHeading>
              <div className={styles.benefits}>
                <div className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span> Always available for customers
                </div>
                <div className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span> Less work for your team
                </div>
                <div className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span> Faster customer replies
                </div>
                <div className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span> More bookings and orders
                </div>
                <div className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span> Better customer experience
                </div>
              </div>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${qbotAnalyticsSvg} 800w, ${qbotAnalyticsSvg} 1920w`}
                width={800}
                height={500}
                placeholder={qbotAnalyticsSvg}
                alt="QBot benefits visualization"
                sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center noMargin>
              <ProjectSectionHeading>Let Your Business Answer Customers 24/7</ProjectSectionHeading>
              <ProjectSectionText>
                The chatbot works for you, even when you are offline. Join hundreds of businesses that use QBot to deliver exceptional customer experiences at scale.
              </ProjectSectionText>
              <DemoForm centered />
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
