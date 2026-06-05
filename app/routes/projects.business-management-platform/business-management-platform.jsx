import bizDash from '~/assets/biz_dash.svg';
import bizListing from '~/assets/biz_listing.svg';
import bizbitCustom from '~/assets/bizbit_custom.svg';
import bizbitHero from '~/assets/bizbit_hero.svg';
import bizmobCheckout from '~/assets/bizmob_checkout.svg';
import bizmobListing from '~/assets/bizmob_listing.svg';
import bizmobTracking from '~/assets/bizmob_tracking.svg';
import deliveryTracking from '~/assets/delivery_tracking.jpg';
import gng2Dark from '~/assets/gng_2_dark.svg';
import gng2Light from '~/assets/gng_2_light.svg';
import gng2MobileDark from '~/assets/gng_2_mobile_dark.svg';
import gng2MobileLight from '~/assets/gng_2_mobile_light.svg';
import magicMenu from '~/assets/magic_menu.png';
import ogaruInsights from '~/assets/ogaru_insights.png';
import pr1Drooms from '~/assets/pr1_drooms.png';
import pro2 from '~/assets/pro2.jpeg';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Input } from '~/components/input';
import { Icon } from '~/components/icon';
import { Text } from '~/components/text';
import { useTheme } from '~/components/theme-provider';
import {
  ProjectContainer,
  ProjectImage,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { cssProps, media } from '~/utils/style';
import { useWindowSize } from '~/hooks';
import { useHydrated } from '~/hooks/useHydrated';
import { useFetcher } from '@remix-run/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import artworkStyles from '~/routes/home/project-summary-artwork.module.css';
import styles from './business-management-platform.module.css';

const title = 'Business Management Platform';
const description =
  'Track sales, manage stock, monitor staff, process orders, and access real-time reports from one powerful platform built for shops and retail businesses.';

export const meta = () => baseMeta({ title, description, prefix: 'Projects' });

const CheckIcon = () => (
  <svg aria-hidden width="20" height="20" viewBox="0 0 16 16" fill="none">
    <path
      d="M13.3334 4L6.00008 11.3333L2.66675 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function ScrollReveal({ children, className, as: Tag = 'div' }) {
  const { ref, visible } = useScrollReveal();
  return (
    <Tag ref={ref} className={className} data-visible={visible}>
      {children}
    </Tag>
  );
}

function LeadForm({ intent, buttonText, secondary, centered = true }) {
  const [showInput, setShowInput] = useState(false);
  const fetcher = useFetcher();
  const sending = fetcher.state === 'submitting';
  const success = fetcher.data?.success;

  if (success) {
    return (
      <div
        className={styles.leadSuccess}
        style={{ alignItems: centered ? 'center' : 'flex-start' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon icon="check" /> Request Sent
        </div>
        <span className={styles.leadSuccessSub}>We&apos;ll contact you shortly.</span>
      </div>
    );
  }

  if (showInput) {
    return (
      <fetcher.Form
        method="post"
        className={styles.leadForm}
        style={{
          marginRight: centered ? 'auto' : undefined,
          marginLeft: centered ? 'auto' : undefined,
        }}
      >
        <input type="hidden" name="intent" value={intent} />
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
        <Button type="submit" loading={sending} secondary={secondary} icon="send">
          {buttonText}
        </Button>
      </fetcher.Form>
    );
  }

  return (
    <Button
      secondary={secondary}
      iconHoverShift
      icon={secondary ? 'chevron-right' : undefined}
      onClick={() => setShowInput(true)}
    >
      {buttonText}
    </Button>
  );
}

function ScreenshotGallery({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = e => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setActiveIndex(i => (i - 1 + items.length) % items.length);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex, close, items.length]);

  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <>
      <div className={styles.gallery}>
        {items.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={styles.galleryItem}
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${item.label} screenshot`}
          >
            <Image cover src={item.src} alt={item.alt} sizes={`(max-width: ${media.tablet}px) 50vw, 33vw`} />
            <span className={styles.galleryLabel}>{item.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.label} screenshot preview`}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <button type="button" className={styles.lightboxClose} onClick={close} aria-label="Close preview">
                ✕
              </button>
              <Image cover src={active.src} alt={active.alt} sizes="90vw" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroArtwork({ visible }) {
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const isMobile = width <= media.tablet;
  const svgOpacity = theme === 'light' ? 0.5 : 0.7;
  const svgSrc =
    theme === 'dark'
      ? isMobile
        ? gng2MobileDark
        : gng2Dark
      : isMobile
        ? gng2MobileLight
        : gng2Light;

  return (
    <div className={artworkStyles.artwork} data-visible={visible} data-device="laptop-flat">
      <div className={artworkStyles.svgGlow} data-device="laptop-flat" />
      <img
        src={svgSrc}
        alt=""
        data-device="laptop-flat"
        style={cssProps({ opacity: svgOpacity })}
        className={artworkStyles.svg}
      />
    </div>
  );
}

function HeroSection() {
  const [heroVisible, setHeroVisible] = useState(false);
  const isHydrated = useHydrated();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ProjectSection className={styles.hero} padding="top">
      <ProjectSectionContent width="xl">
        <div className={styles.heroGrid}>
          <div className={styles.heroDetails}>
            <div className={styles.index}>
              <Divider
                notchWidth="64px"
                notchHeight="8px"
                collapsed={!heroVisible}
                collapseDelay={1000}
              />
              <span className={styles.indexNumber} data-visible={heroVisible}>
                02
              </span>
            </div>
            <div className={styles.badge} data-visible={heroVisible}>
              <span className={styles.badgeText}>Digital Commerce Platform</span>
            </div>
            <Heading level={2} as="h1" className={styles.heroTitle} data-visible={heroVisible}>
              <DecoderText text="Run Your Shop With Confidence" start={heroVisible} delay={500} />
            </Heading>
            <Text className={styles.heroDescription} data-visible={heroVisible} as="p">
              Track sales, manage stock, monitor staff, process orders, and access real-time reports
              from one powerful platform.
            </Text>
            <div className={styles.heroActions} data-visible={heroVisible}>
              <LeadForm intent="Demo Request" buttonText="View Demo" centered={false} />
              <LeadForm intent="Free Trial Request" buttonText="Start Free Trial" secondary centered={false} />
            </div>
          </div>

          <div className={styles.heroPreview}>
            {isHydrated && <HeroArtwork visible={heroVisible} />}
            <div className={styles.browserFrame} data-visible={heroVisible}>
              <div className={styles.browserHeader}>
                <div className={styles.trafficLight} style={{ '--color': '#ff5f56' }} />
                <div className={styles.trafficLight} style={{ '--color': '#ffbd2e' }} />
                <div className={styles.trafficLight} style={{ '--color': '#27c93f' }} />
              </div>
              <div className={styles.browserContent}>
                <Image
                  cover
                  srcSet={`${pr1Drooms} 800w`}
                  placeholder={pr1Drooms}
                  alt="Business management platform dashboard preview"
                  sizes={`(max-width: ${media.tablet}px) 100vw, 50vw`}
                />
              </div>
            </div>
            <div className={styles.phoneFrame} data-visible={heroVisible}>
              <div className={styles.phoneContent}>
                <Image
                  cover
                  srcSet={`${pro2} 375w`}
                  placeholder={pro2}
                  alt="Mobile app mockup for business management"
                  sizes="280px"
                />
              </div>
            </div>
          </div>

          <div className={styles.mobileActions} data-visible={heroVisible}>
            <LeadForm intent="Demo Request" buttonText="View Demo" />
            <LeadForm intent="Free Trial Request" buttonText="Start Free Trial" secondary />
          </div>
        </div>
      </ProjectSectionContent>
    </ProjectSection>
  );
}

const problems = [
  { icon: '📋', title: 'Manual Record Keeping', text: 'Reduce paperwork and eliminate human error.' },
  { icon: '📦', title: 'Missing Stock', text: 'Track inventory movement in real time.' },
  { icon: '⏱️', title: 'Slow Operations', text: 'Speed up service and workflows.' },
  { icon: '👁️', title: 'Lack of Visibility', text: "Know what's happening across your business." },
  { icon: '👥', title: 'Staff Accountability', text: 'Monitor activities and permissions.' },
  { icon: '📊', title: 'Unclear Profitability', text: 'Understand revenue and performance instantly.' },
];

const features = [
  {
    icon: '💰',
    title: 'Sales Tracking',
    text: 'Monitor every transaction, payment method, and daily revenue from a unified dashboard.',
    image: bizDash,
    alt: 'Sales tracking dashboard',
  },
  {
    icon: '📦',
    title: 'Inventory Management',
    text: 'Track stock levels, receive low-stock alerts, and manage suppliers in one place.',
    image: bizListing,
    alt: 'Inventory management interface',
  },
  {
    icon: '👤',
    title: 'Staff Management',
    text: 'Assign roles, control permissions, and monitor staff activity across your team.',
    image: bizbitCustom,
    alt: 'Staff management interface',
  },
  {
    icon: '🛒',
    title: 'Order Management',
    text: 'Process orders from any channel and track them from placement to fulfillment.',
    image: bizmobCheckout,
    alt: 'Order management mobile interface',
  },
  {
    icon: '📈',
    title: 'Reports & Analytics',
    text: 'Generate real-time reports on sales, inventory, and performance trends.',
    image: ogaruInsights,
    alt: 'Reports and analytics dashboard',
  },
  {
    icon: '🏢',
    title: 'Multi-Branch Support',
    text: 'Manage multiple locations from a single account with branch-level insights.',
    image: bizbitHero,
    alt: 'Multi-branch management overview',
  },
  {
    icon: '🏷️',
    title: 'Price Management',
    text: 'Update prices, run promotions, and manage menus across all channels instantly.',
    image: magicMenu,
    alt: 'Price and menu management',
  },
  {
    icon: '🍳',
    title: 'Kitchen Operations',
    text: 'Streamline kitchen workflows with order routing, prep tracking, and status updates.',
    image: bizmobListing,
    alt: 'Kitchen operations interface',
  },
];

const benefits = [
  { icon: '⚡', title: 'Save Time', text: 'Automate repetitive tasks and focus on growing your business.' },
  { icon: '🛡️', title: 'Reduce Losses', text: 'Catch stock discrepancies and shrinkage before they add up.' },
  { icon: '🔍', title: 'Increase Visibility', text: 'See every sale, order, and stock movement as it happens.' },
  { icon: '🤝', title: 'Improve Team Coordination', text: 'Keep staff aligned with clear roles and shared workflows.' },
  { icon: '🎯', title: 'Make Better Decisions', text: 'Use real data instead of guesswork to guide your strategy.' },
  { icon: '🚀', title: 'Scale With Confidence', text: 'Add branches and products without losing control.' },
];

const industries = [
  { icon: '🍽️', name: 'Restaurants' },
  { icon: '☕', name: 'Cafés' },
  { icon: '🛍️', name: 'Retail Stores' },
  { icon: '🏬', name: 'Supermarkets' },
  { icon: '💊', name: 'Pharmacies' },
  { icon: '🏪', name: 'Convenience Stores' },
];

const results = [
  'Better control',
  'Faster operations',
  'Real-time reporting',
  'Improved stock accuracy',
  'More productive staff',
  'Better customer experience',
];

const galleryItems = [
  { label: 'Dashboard', src: bizDash, alt: 'Business management dashboard overview' },
  { label: 'Orders', src: bizmobCheckout, alt: 'Order management screen' },
  { label: 'Inventory', src: bizListing, alt: 'Inventory management screen' },
  { label: 'Reports', src: ogaruInsights, alt: 'Reports and analytics screen' },
  { label: 'Staff Management', src: bizbitCustom, alt: 'Staff management screen' },
];

const suitableFor = ['Restaurants', 'Cafés', 'Shops', 'Retail Stores', 'Supermarkets', 'Pharmacies'];

export function BusinessManagementPlatform() {
  return (
    <Fragment>
      <ProjectContainer className={styles.platform}>
        <HeroSection />

        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ScrollReveal className={styles.reveal}>
              <div className={styles.valueBar}>
                <div className={styles.valueItem}>📊 Sales Tracking</div>
                <div className={styles.valueItem}>📦 Inventory Control</div>
                <div className={styles.valueItem}>👥 Staff Management</div>
                <div className={styles.valueItem}>📈 Real-time Reports</div>
              </div>
            </ScrollReveal>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ScrollReveal className={styles.reveal}>
              <ProjectTextRow center>
                <div className={styles.sectionBadge}>
                  <span className={styles.badgeText}>Overview</span>
                </div>
                <ProjectSectionHeading>About The Platform</ProjectSectionHeading>
                <ProjectSectionText>
                  This platform helps businesses streamline daily operations by combining sales tracking,
                  inventory management, reporting, and staff management into one system.
                </ProjectSectionText>
              </ProjectTextRow>
            </ScrollReveal>
            <ScrollReveal className={styles.reveal}>
              <div className={styles.industryList}>
                <Text secondary>Suitable for:</Text>
                {suitableFor.map(item => (
                  <span key={item} className={styles.industryTag}>{item}</span>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal className={styles.reveal}>
              <ProjectImage
                srcSet={`${bizDash} 1280w, ${bizDash} 1600w`}
                width={1280}
                height={1030}
                placeholder={bizDash}
                alt="Platform overview dashboard showing business operations at a glance"
                sizes="100vw"
              />
            </ScrollReveal>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ScrollReveal className={styles.reveal}>
              <ProjectTextRow center>
                <ProjectSectionHeading>Common Business Challenges</ProjectSectionHeading>
              </ProjectTextRow>
            </ScrollReveal>
            <ScrollReveal className={styles.reveal}>
              <div className={styles.cardGrid}>
                {problems.map(problem => (
                  <div key={problem.title} className={styles.card}>
                    <span className={styles.cardIcon} aria-hidden>{problem.icon}</span>
                    <h3 className={styles.cardTitle}>{problem.title}</h3>
                    <p className={styles.cardText}>{problem.text}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent width="xl">
            <ScrollReveal className={styles.reveal}>
              <ProjectTextRow center>
                <ProjectSectionHeading>Key Features</ProjectSectionHeading>
                <ProjectSectionText>
                  Everything you need to run your business — from the front counter to the back office.
                </ProjectSectionText>
              </ProjectTextRow>
            </ScrollReveal>
            <div className={styles.featureGrid}>
              {features.map(feature => (
                <ScrollReveal key={feature.title} className={styles.reveal}>
                  <article className={styles.featureCard}>
                    <div className={styles.featureCardBody}>
                      <span className={styles.cardIcon} aria-hidden>{feature.icon}</span>
                      <h3 className={styles.cardTitle}>{feature.title}</h3>
                      <p className={styles.cardText}>{feature.text}</p>
                    </div>
                    <div className={styles.featurePreview}>
                      <Image cover src={feature.image} alt={feature.alt} sizes={`(max-width: ${media.tablet}px) 100vw, 50vw`} />
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection
          backgroundOverlayOpacity={0.85}
          backgroundElement={
            <Image
              srcSet={`${deliveryTracking} 1280w, ${deliveryTracking} 2560w`}
              width={1280}
              height={900}
              placeholder={deliveryTracking}
              alt=""
              sizes="100vw"
            />
          }
        >
          <ProjectSectionContent>
            <ScrollReveal className={styles.reveal}>
              <ProjectTextRow center>
                <ProjectSectionHeading>Product Gallery</ProjectSectionHeading>
                <ProjectSectionText>
                  Explore the platform screens — click any image to view full size.
                </ProjectSectionText>
              </ProjectTextRow>
            </ScrollReveal>
            <ScrollReveal className={styles.reveal}>
              <ScreenshotGallery items={galleryItems} />
            </ScrollReveal>
            <ScrollReveal className={`${styles.reveal} ${styles.phoneRow}`}>
              <div className={styles.phoneFrameStatic}>
                <div className={styles.phoneContent}>
                  <Image cover src={bizmobTracking} alt="Real-time order tracking on mobile" sizes="280px" />
                </div>
              </div>
              <div className={styles.phoneFrameStatic}>
                <div className={styles.phoneContent}>
                  <Image cover src={bizmobListing} alt="Mobile inventory and listing management" sizes="280px" />
                </div>
              </div>
            </ScrollReveal>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ScrollReveal className={styles.reveal}>
              <ProjectTextRow center>
                <ProjectSectionHeading>Why Businesses Love It</ProjectSectionHeading>
              </ProjectTextRow>
            </ScrollReveal>
            <ScrollReveal className={styles.reveal}>
              <div className={styles.cardGridTwo}>
                {benefits.map(benefit => (
                  <div key={benefit.title} className={styles.card}>
                    <span className={styles.cardIcon} aria-hidden>{benefit.icon}</span>
                    <h3 className={styles.cardTitle}>{benefit.title}</h3>
                    <p className={styles.cardText}>{benefit.text}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ScrollReveal className={styles.reveal}>
              <ProjectTextRow center>
                <ProjectSectionHeading>Built For</ProjectSectionHeading>
                <ProjectSectionText>
                  Whether you run a single café or a chain of supermarkets, this platform adapts to your business.
                </ProjectSectionText>
              </ProjectTextRow>
            </ScrollReveal>
            <ScrollReveal className={styles.reveal}>
              <div className={styles.industryGrid}>
                {industries.map(industry => (
                  <div key={industry.name} className={styles.industryCard}>
                    <span className={styles.industryIcon} aria-hidden>{industry.icon}</span>
                    <span className={styles.industryName}>{industry.name}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ScrollReveal className={styles.reveal}>
              <ProjectTextRow center>
                <ProjectSectionHeading>What You Gain</ProjectSectionHeading>
              </ProjectTextRow>
            </ScrollReveal>
            <ScrollReveal className={styles.reveal}>
              <ul className={styles.checklist}>
                {results.map(result => (
                  <li key={result} className={styles.checklistItem}>
                    <CheckIcon />
                    {result}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ScrollReveal className={styles.reveal}>
              <div className={styles.ctaSection}>
                <ProjectSectionHeading>Stop Guessing. Start Managing.</ProjectSectionHeading>
                <ProjectSectionText>
                  Everything you need to run a smarter, more profitable business.
                </ProjectSectionText>
                <div className={styles.ctaActions}>
                  <LeadForm intent="Demo Request" buttonText="Request Demo" />
                  <LeadForm intent="Free Trial Request" buttonText="Start Free Trial" secondary />
                  <Button href="/contact" secondary iconHoverShift icon="chevron-right">
                    Contact Us
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}
