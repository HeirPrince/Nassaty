import bizDash from '~/assets/biz_dash.svg';
import bizListing from '~/assets/biz_listing.svg';
import bizbitCustom from '~/assets/bizbit_custom.svg';
import bizbitHero from '~/assets/bizbit_hero.svg';
import bizmobCheckout from '~/assets/bizmob_checkout.svg';
import bizmobListing from '~/assets/bizmob_listing.svg';
import bizmobTracking from '~/assets/bizmob_tracking.svg';
import deliveryTracking from '~/assets/delivery_tracking.jpg';
import happyCustomer from '~/assets/happy_customer.jpg';
import pro2List from '~/assets/pro2-list.jpeg';
import pro2 from '~/assets/pro2.jpeg';
import backgroundSprLarge from '~/assets/spr-background-large.jpg';
import backgroundSprPlaceholder from '~/assets/spr-background-placeholder.jpg';
import backgroundSpr from '~/assets/spr-background.jpg';
import { Button } from '~/components/button';
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

const title = 'All-in-one ordering for your business.';
const description =
  'Get your own website and app to take orders, manage deliveries, and grow your brand—all for a simple monthly fee. No complex setup, no hidden fees.';
const roles = [];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

const CheckIcon = () => (
  <svg
    aria-hidden
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3334 4L6.00008 11.3333L2.66675 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
          src={happyCustomer}
          srcSet={`${happyCustomer} 1080w, ${happyCustomer} 2160w`}
          placeholder={happyCustomer}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://nassaty.com"
          centered
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
          <ProjectTextRow center>
            <ProjectSectionHeading>The problem</ProjectSectionHeading>
            <ProjectSectionText>
              Many local shops find it hard to manage orders by hand or lose too much money
              to big delivery apps. We built a simple, affordable way for you to stay in
              control of your menu, your customers, and your deliveries. Our goal was to
              make it easy for any business to go digital and give their customers a
              great experience.
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
            <ProjectTextRow center>
              <ProjectSectionHeading>Business Manager</ProjectSectionHeading>
              <ProjectSectionText>
                Running a business is busy. Our simple dashboard lets you update your menu
                instantly, see orders as they come in, and see how much you’ve sold. The
                platform is easy to change, so you can set it up exactly how you like to
                make your daily work easier.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ThemeProvider theme="dark" data-invert>
          <ProjectSection
            backgroundOverlayOpacity={0.5}
            backgroundElement={
              <Image
                srcSet={`${deliveryTracking} 1280w, ${deliveryTracking} 2560w`}
                width={1280}
                height={900}
                placeholder={deliveryTracking}
                alt="A sleek dark interface showing real-time order tracking."
                sizes="100vw"
              />
            }
          >
            <ProjectSectionColumns width="full">
              <ProjectSectionContent width="full">
                <ProjectTextRow width="s">
                  <ProjectSectionHeading>Delivery Tracking</ProjectSectionHeading>
                  <ProjectSectionText>
                    Keep your customers happy with real-time updates. They can see exactly
                    where their order is, from the moment you start preparing it until it
                    reaches their door. By using smart maps and a simple app, we make sure
                    everyone knows exactly what's happening with their delivery.
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
            <ProjectTextRow center>
              <ProjectSectionHeading>Fast Checkout</ProjectSectionHeading>
              <ProjectSectionText>
                Customers love speed. We've made our checkout fast and easy so people can
                order in just a few taps. By keeping things simple, the platform ensures
                that buying from your shop is always quick and effortless.
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
                  Make it Yours
                </ProjectSectionHeading>
                <ProjectSectionText>
                  Your online shop should look like your actual business. Our platform
                  gives you simple tools to change everything. From setting up your menu
                  to picking your colors and logo, you can make the ordering experience
                  feel exactly like your brand.
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
              <ProjectSectionHeading>Manage on the Go</ProjectSectionHeading>
              <ProjectSectionText>
                Update your shop in seconds. Our mobile tools let you manage your online
                store from anywhere. Whether you're adding new items, changing prices,
                or hiding things that are out of stock, it’s all as easy as using any
                other app on your phone.
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
            <ProjectTextRow center centerMobile>
              <ProjectSectionHeading>Flexible Payment Plans</ProjectSectionHeading>
              <ProjectSectionText>
                Choose the plan that best fits your business. All plans include our
                basic ordering tools, designed to help you grow without the stress.
              </ProjectSectionText>
            </ProjectTextRow>
            <div className={styles.pricingGrid}>
              <div className={styles.pricingCard}>
                <div className={styles.planName}>Essential</div>
                <div className={styles.price}>
                  RWF 60,000<span> /month</span>
                </div>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <CheckIcon />
                    Access to branded website
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon />
                    Access to delivery tracking app
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon />
                    Basic ordering tools
                  </li>
                </ul>
                <div className={styles.pricingButton}>
                  <Button secondary href="/contact">Get Started</Button>
                </div>
              </div>
              <div className={styles.pricingCard} data-popular>
                <div className={styles.planName}>Professional</div>
                <div className={styles.price}>
                  RWF 100,000<span> /month</span>
                </div>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <CheckIcon />
                    Everything in Essential
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon />
                    24/7 Priority support
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon />
                    Custom brand integration
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon />
                    Detailed sales reports
                  </li>
                </ul>
                <div className={styles.pricingButton}>
                  <Button href="/contact">Select Plan</Button>
                </div>
              </div>
              <div className={styles.pricingCard}>
                <div className={styles.planName}>Ultimate</div>
                <div className={styles.price}>
                  RWF 200,000<span> /month</span>
                </div>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <CheckIcon />
                    All features available +
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon />
                    Smart customer help bot
                  </li>
                  <li className={styles.featureItem}>
                    <CheckIcon />
                    Manage multiple shops
                  </li>
                </ul>
                <div className={styles.pricingButton}>
                  <Button href="/contact">Contact Sales</Button>
                </div>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                Nassaty has helped local businesses get online, stop paying high fees to
                other apps, and talk directly to their customers. Today, it continues to
                grow with new features to help every business succeed in the digital world.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
