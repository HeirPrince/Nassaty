import { useRef, useState } from 'react';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Section } from '~/components/section';
import { Heading } from '~/components/heading';
import { Text } from '~/components/text';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import styles from './portfolio.module.css';

// Assets
import pro2ListTexture from '~/assets/pro2-list.jpeg';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sprTexture from '~/assets/pr1_drooms.png';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';

export const meta = () => {
  return baseMeta({
    title: 'Portfolio | NTIYAMIRA Prince Hertier',
    description: 'Selected work and projects by NTIYAMIRA Prince Hertier.',
  });
};

export const links = () => {
  return [];
};

export const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Graphic', 'Videos', 'Webdesign', 'Branding'];

  const projects = [
    { title: 'Design Project', category: 'Branding', img: sliceTextureLarge },
    { title: 'Web App', category: 'Webdesign', img: pro2ListTexture },
    { title: 'Mobile UI', category: 'Graphic', img: sprTexture },
    { title: 'Campaign', category: 'Videos', img: sliceTextureLarge },
    { title: 'Identity', category: 'Branding', img: pro2ListTexture },
    { title: 'Dashboard', category: 'Webdesign', img: sprTexture },
    { title: 'Concept', category: 'Graphic', img: sliceTextureLarge },
    { title: 'Mockup', category: 'Branding', img: pro2ListTexture },
    { title: 'Store', category: 'Webdesign', img: sprTexture },
  ];

  return (
    <div className={styles.portfolio}>
      {/* Hero Section */}
      <Section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.introLabel}>MY NAME IS</div>
          <Heading level={0} className={styles.name}>
            <span style={{ display: 'block' }}>NTIYAMIRA</span>
            <span style={{ display: 'block' }}>PRINCE</span>
          </Heading>
          <div>
            <span className={styles.roleHighlight}>UI DEVELOPER x GRAPHIC DESIGNER</span>
          </div>
        </div>
        <div className={styles.heroImageSection}>
          <img src={sliceTextureLarge} alt="Prince Profile" className={styles.heroImage} />
        </div>
      </Section>

      {/* About Section */}
      <Section className={styles.about}>
        <div className={styles.aboutImageContainer}>
          <img src={pro2ListTexture} alt="About Me" className={styles.aboutImage} />
        </div>
        <div className={styles.aboutContent}>
          <span className={styles.whoAmI}>who am i</span>
          <div className={styles.helloHeading}>
            <Heading level={2} as="h2">HELLO</Heading>
          </div>
          <div className={styles.aboutText}>
            <Text as="p" size="l" style={{ marginBottom: '20px' }}>
              I am a UI Developer. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.
            </Text>
            <Text as="p" size="l">
              It is a fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.
            </Text>
          </div>
        </div>
      </Section>

      {/* Work Section */}
      <Section className={styles.work}>
        <div className={styles.workHeadingContainer}>
          <Heading level={2} align="center">MY WORK</Heading>
          <div className={styles.workSubHeading}>
            <span className={styles.workHighlight}>awesome</span> projects
          </div>
        </div>

        <div className={styles.filters}>
          {filters.map(filter => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div key={index} className={styles.gridItem}>
              <img src={project.img} alt={project.title} className={styles.gridImage} />
              <div className={styles.gridOverlay}>
                <div className={styles.searchIcon}>+</div>
                <div className={styles.projectTitle}>{project.title}</div>
                <div className={styles.projectCategory}>{project.category}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.loadMoreContainer}>
          <Button secondary icon="arrow-right">LOAD MORE</Button>
        </div>
      </Section>

      <Footer />
    </div>
  );
};
