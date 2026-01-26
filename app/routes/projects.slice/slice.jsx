import sprBackground from '~/assets/spr-background.jpg';
import sprBackgroundLarge from '~/assets/spr-background-large.jpg';
import sprBackgroundPlaceholder from '~/assets/spr-background-placeholder.jpg';
import qbotHero from '~/assets/qbot-hero.png';
import qbotInterface from '~/assets/qbot-interface.png';
import qbotIntegration from '~/assets/qbot-integration.png';
import qbotChat from '~/assets/qbot_chat.svg';
import qbotAnalytics from '~/assets/qbot-analytics.png';
import qbotAnalyticsSvg from '~/assets/qbot_analytics.svg';
import qbotTeam from '~/assets/qbot-team.png';
import { Button } from '~/components/button';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
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
const roles = ['AI Development', 'UX Design', 'System Architecture'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const Slice = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.slice}>
        <ProjectBackground
          src={qbotHero}
          srcSet={`${qbotHero} 1280w, ${qbotHero} 2560w`}
          width={1280}
          height={800}
          placeholder={qbotHero}
          opacity={0.8}
        />
        <ProjectHeader
          title="Customer Assistance Chatbot"
          description="Talk to your customers. Take orders. Support them 24/7. A smart chatbot that answers questions, shows services, books orders, and connects to a real person when needed."
          url="https://qbot.nassaty.com"
          linkLabel="Request a Demo"
          roles={roles}
        />

        <ProjectSection padding="top">
          <ProjectSectionContent>
            <div className={styles.valueBar}>
              <div className={styles.valueItem}>💬 Chat Support</div>
              <div className={styles.valueItem}>📞 24/7 Calls</div>
              <div className={styles.valueItem}>🌍 Multiple Languages</div>
              <div className={styles.valueItem}>🤝 Human Help</div>
            </div>

            <ProjectImage
              srcSet={`${qbotInterface} 800w, ${qbotInterface} 1920w`}
              width={800}
              height={500}
              placeholder={qbotInterface}
              alt="The QBot AI chatbot interface showing a conversation."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
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
                  <span className={styles.featureIcon}>📞</span> 24/7 Call Support
                </h3>
                <ProjectSectionText>
                  Answers calls at any time, shares basic information and reduces missed calls.
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
              <Button
                secondary
                iconHoverShift
                icon="chevron-right"
                href="https://qbot.nassaty.com"
                style={{ marginTop: '20px' }}
              >
                Request a Demo
              </Button>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
