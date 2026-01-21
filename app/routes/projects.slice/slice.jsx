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
          title={title}
          description={description}
          url="https://qbot.nassaty.com"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
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
              <ProjectSectionHeading>Core Capabilities</ProjectSectionHeading>
              <ProjectSectionText>
                QBot is more than just a chatbot. It's an intelligent extension of your team,
                capable of handling complex workflows and delivering personalized experiences.
              </ProjectSectionText>
            </ProjectTextRow>
            <div className={styles.features}>
              <div className={styles.feature}>
                <ProjectSectionHeading level={4} className={styles.featureTitle}>24/7 Availability</ProjectSectionHeading>
                <ProjectSectionText className={styles.featureText}>
                  Never miss a lead. QBot handles customer queries around the clock,
                  providing instant responses even when your team is offline.
                </ProjectSectionText>
              </div>
              <div className={styles.feature}>
                <ProjectSectionHeading level={4} className={styles.featureTitle}>Multi-Platform</ProjectSectionHeading>
                <ProjectSectionText className={styles.featureText}>
                  Engage customers on their favorite platforms, including WhatsApp,
                  Telegram, and your own website, with a unified AI brain.
                </ProjectSectionText>
              </div>
              <div className={styles.feature}>
                <ProjectSectionHeading level={4} className={styles.featureTitle}>Smart Learning</ProjectSectionHeading>
                <ProjectSectionText className={styles.featureText}>
                  Our NLP engine continuously learns from interactions,
                  improving its accuracy and helpfulness with every conversation.
                </ProjectSectionText>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Seamless Integration</ProjectSectionHeading>
              <ProjectSectionText>
                Businesses often struggle to maintain consistent support across multiple
                platforms. QBot was designed to bridge this gap, providing a unified
                AI-driven experience wherever your customers are.
              </ProjectSectionText>
              <ProjectSectionText>
                Our solution uses advanced Natural Language Processing to understand
                user intent and provide accurate, context-aware responses in real-time.
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${qbotChat} 800w, ${qbotChat} 1600w`}
                width={800}
                height={800}
                placeholder={qbotChat}
                alt="QBot chat integration illustration."
                sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Continuous Learning</ProjectSectionHeading>
              <ProjectSectionText>
                A key challenge was ensuring the bot could handle complex queries and
                learn from past interactions. We implemented a feedback loop system
                where the AI identifies unresolved queries and prompts human intervention,
                learning from the manual responses to improve future performance.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${qbotAnalyticsSvg} 800w, ${qbotAnalyticsSvg} 1920w`}
              width={800}
              height={500}
              placeholder={qbotAnalyticsSvg}
              alt="The QBot analytics dashboard showing user engagement and sentiment metrics."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection padding="top">
          <ProjectSectionContent className={styles.grid}>
            <div className={styles.gridImage}>
              <div className={styles.gridBackground}>
                <Image
                  srcSet={`${qbotAnalyticsSvg} 440w, ${qbotAnalyticsSvg} 880w`}
                  width={440}
                  height={790}
                  placeholder={qbotAnalyticsSvg}
                  alt=""
                  role="presentation"
                  sizes={`(max-width: ${media.mobile}px) 312px, (max-width: ${media.tablet}px) 408px, 514px`}
                />
              </div>
              <div className={styles.gridForeground}>
                <Image
                  srcSet={`${qbotInterface} 440w, ${qbotInterface} 880w`}
                  width={440}
                  height={340}
                  placeholder={qbotInterface}
                  alt="A preview of the chatbot's sentiment analysis and response confidence."
                  sizes={`(max-width: ${media.mobile}px) 584px, (max-width: ${media.tablet}px) 747px, 556px`}
                />
              </div>
            </div>
            <div className={styles.gridText}>
              <ProjectSectionHeading>Analytics & Insights</ProjectSectionHeading>
              <ProjectSectionText>
                Understanding customer behavior is crucial for business growth. QBot
                provides a comprehensive dashboard that tracks engagement metrics,
                frequently asked questions, and user sentiment. These insights help
                businesses optimize their communication strategies and product offerings.
              </ProjectSectionText>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                Since its deployment, QBot has significantly reduced support response
                times and increased customer satisfaction. Businesses have reported up
                to a 70% decrease in manual support tickets, allowing their teams to
                focus on more complex and high-value tasks.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              src={qbotTeam}
              width={940}
              height={500}
              placeholder={qbotTeam}
              alt="A professional team collaborating with the help of QBot's insights."
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center noMargin>
              <ProjectSectionHeading>Ready to automate your support?</ProjectSectionHeading>
              <ProjectSectionText>
                Join hundreds of businesses that use QBot to deliver exceptional
                customer experiences at scale.
              </ProjectSectionText>
              <Button
                secondary
                iconHoverShift
                icon="chevron-right"
                href="https://qbot.nassaty.com"
                style={{ marginTop: '20px' }}
              >
                Get Started with QBot
              </Button>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
