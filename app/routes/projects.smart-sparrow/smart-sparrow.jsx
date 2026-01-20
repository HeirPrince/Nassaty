import bizDash from '~/assets/biz_dash.svg';
import bizListing from '~/assets/biz_listing.svg';
import bizbitCustom from '~/assets/bizbit_custom.svg';
import bizbitHero from '~/assets/bizbit_hero.svg';
import bizmobCheckout from '~/assets/bizmob_checkout.svg';
import bizmobListing from '~/assets/bizmob_listing.svg';
import bizmobTracking from '~/assets/bizmob_tracking.svg';
import magicHero from '~/assets/magic_hero.png';
import pro2List from '~/assets/pro2-list.jpeg';
import pro2 from '~/assets/pro2.jpeg';
import backgroundSprLarge from '~/assets/spr-background-large.jpg';
import backgroundSprPlaceholder from '~/assets/spr-background-placeholder.jpg';
import imageSprBackgroundVolcanismLarge from '~/assets/spr-background-volcanism-large.jpg';
import imageSprBackgroundVolcanismPlaceholder from '~/assets/spr-background-volcanism-placeholder.jpg';
import imageSprBackgroundVolcanism from '~/assets/spr-background-volcanism.jpg';
import backgroundSpr from '~/assets/spr-background.jpg';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { SegmentedControl, SegmentedControlOption } from '~/components/segmented-control';
import { ThemeProvider, useTheme } from '~/components/theme-provider';
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
import { baseMeta } from '~/utils/meta';
import { media } from '~/utils/style';
import styles from './smart-sparrow.module.css';

const title = 'One platform. Your business online.';
const description =
  'A complete website and mobile ordering system that helps businesses showcase their brand, accept orders, and track them in real time — all for a simple monthly fee.\n\nFrom menus and promotions to ordering and delivery tracking, everything your customers need is in one place.';
const roles = [
  'Full Stack Development',
  'UX and UI Design',
  'Business Strategy',
  'Brand Identity',
];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const SmartSparrow = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    toggleTheme(themes[index]);
  };

  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={magicHero}
          srcSet={`${magicHero} 1080w, ${magicHero} 2160w`}
          placeholder={backgroundSprPlaceholder}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://nassaty.com"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={theme}
              srcSet={`${bizbitHero} 733w, ${bizbitHero} 1466w`}
              width={733}
              height={897}
              placeholder={bizbitHero}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 600px, 800px`}
              alt="Nassaty ordering system hero illustration"
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The problem</ProjectSectionHeading>
            <ProjectSectionText>
              Many local businesses struggle to manage online orders manually or pay high
              commissions to third-party delivery apps. They need an affordable, branded
              solution that gives them full control over their menu, customers, and
              delivery process. Our goal was to build a platform that simplifies digital
              transformation for these businesses while providing a seamless experience
              for their end customers.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={theme}
              srcSet={`${bizDash} 1280w, ${bizDash} 1600w`}
              width={1280}
              height={1030}
              placeholder={bizDash}
              alt="The Nassaty Merchant Dashboard providing a bird's-eye view of your business operations."
              sizes="100vw"
            />
            <ProjectTextRow>
              <ProjectSectionHeading>Merchant Dashboard</ProjectSectionHeading>
              <ProjectSectionText>
                Managing a growing business requires speed and clarity. Our comprehensive
                merchant dashboard allows owners to update menus in real-time, monitor
                live order flows, and access insightful sales reports. The platform is
                built for high-level customization, allowing you to organize your workspace
                and workflows to align perfectly with your operational needs.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ThemeProvider theme="dark" data-invert>
          <ProjectSection
            backgroundOverlayOpacity={0.5}
            backgroundElement={
              <Image
                srcSet={`${imageSprBackgroundVolcanism} 1280w, ${imageSprBackgroundVolcanismLarge} 2560w`}
                width={1280}
                height={900}
                placeholder={imageSprBackgroundVolcanismPlaceholder}
                alt="A sleek dark interface showing real-time order tracking."
                sizes="100vw"
              />
            }
          >
            <ProjectSectionColumns width="full">
              <ProjectSectionContent width="full">
                <ProjectTextRow width="s">
                  <ProjectSectionHeading>Precision Logistics</ProjectSectionHeading>
                  <ProjectSectionText>
                    Trust is built on visibility. Our integrated tracking system provides
                    customers with granular, live updates from the moment an order is
                    confirmed to the second it arrives. By marrying sophisticated
                    geospatial mapping with an intuitive mobile interface, we transform
                    delivery into a transparent and reliable journey.
                  </ProjectSectionText>
                </ProjectTextRow>
              </ProjectSectionContent>
              <div className={styles.phoneFrame}>
                <div className={styles.phoneContent}>
                  <Image
                    raised
                    srcSet={`${bizmobTracking} 1280w`}
                    width={553}
                    height={1217}
                    placeholder={bizmobTracking}
                    alt="Real-time delivery tracking interface illustration."
                    sizes="320px"
                  />
                </div>
              </div>
            </ProjectSectionColumns>
          </ProjectSection>
        </ThemeProvider>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Fluid Commerce</ProjectSectionHeading>
              <ProjectSectionText>
                Every tap matters. The Nassaty checkout flow is distilled to its most
                essential elements, eliminating friction and maximizing transaction
                velocity. With a focus on ergonomic design and speed, the platform
                ensures that the transition from discovery to purchase is not just fast,
                but effortless.
              </ProjectSectionText>
            </ProjectTextRow>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneContent}>
                <Image
                  raised
                  key={theme}
                  srcSet={`${bizmobCheckout} 1280w`}
                  width={706}
                  height={1600}
                  placeholder={bizmobCheckout}
                  alt="Seamless ordering experience mobile interface illustration."
                  sizes="320px"
                />
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>
                  Tailored to Your Brand
                </ProjectSectionHeading>
                <ProjectSectionText>
                  We believe your online presence should be as unique as your physical
                  store. Our platform provides powerful customization tools that let you
                  fine-tune every interaction. From dynamic menu structures to personalized
                  branding, you have the ability to shape the ordering experience to
                  perfectly match your business's voice.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={`${bizbitCustom} 800w, ${bizbitCustom} 1600w`}
                width={800}
                height={640}
                placeholder={bizbitCustom}
                alt="Customization interface illustration."
                sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>Limitless Storefront Agility</ProjectSectionHeading>
              <ProjectSectionText>
                Adapt to the market in seconds. Our mobile management tools empower
                merchants to curate their digital storefront on the fly. Whether adding
                new listings, updating pricing, or managing live inventory, the
                interface provides comprehensive control with consumer-grade simplicity.
              </ProjectSectionText>
            </ProjectTextRow>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneContent}>
                <Image
                  raised
                  srcSet={`${bizmobListing} 1280w`}
                  width={706}
                  height={1600}
                  placeholder={bizmobListing}
                  alt="Mobile business listing management interface illustration."
                  sizes="320px"
                />
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                The Nassaty ordering platform has helped numerous local businesses
                establish a strong online presence, reducing their dependence on
                high-commission platforms and increasing direct customer engagement.
                Today, it continues to evolve as a comprehensive solution for
                businesses going digital.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
