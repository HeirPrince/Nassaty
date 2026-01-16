import sprBackground from '~/assets/spr-background.jpg';
import sprBackgroundLarge from '~/assets/spr-background-large.jpg';
import sprBackgroundPlaceholder from '~/assets/spr-background-placeholder.jpg';
import qbotInterface from '~/assets/qbot-interface.png';
import qbotIntegration from '~/assets/qbot-integration.png';
import qbotAnalytics from '~/assets/qbot-analytics.png';
import qbotTeam from '~/assets/qbot-team.png';
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
          src={sprBackground}
          srcSet={`${sprBackground} 1280w, ${sprBackgroundLarge} 2560w`}
          width={1280}
          height={800}
          placeholder={sprBackgroundPlaceholder}
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
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Seamless Integration</ProjectSectionHeading>
              <ProjectSectionText>
                Businesses often struggle to maintain consistent support across multiple
                platforms like WhatsApp, Telegram, and Web. QBot was designed to
                bridge this gap, providing a unified AI-driven experience wherever
                your customers are.
              </ProjectSectionText>
              <ProjectSectionText>
                Our solution uses advanced Natural Language Processing to understand
                user intent and provide accurate, context-aware responses in real-time.
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${qbotIntegration} 350w, ${qbotIntegration} 700w`}
                width={350}
                height={750}
                placeholder={qbotIntegration}
                alt="QBot integrated with various messaging platforms."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={`${qbotInterface} 350w, ${qbotInterface} 700w`}
                width={350}
                height={750}
                placeholder={qbotInterface}
                alt="The chatbot interface on a mobile device."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
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
              srcSet={`${qbotAnalytics} 800w, ${qbotAnalytics} 1920w`}
              width={800}
              height={500}
              placeholder={qbotAnalytics}
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
                  srcSet={`${qbotAnalytics} 440w, ${qbotAnalytics} 880w`}
                  width={440}
                  height={790}
                  placeholder={qbotAnalytics}
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
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
