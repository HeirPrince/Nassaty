import pro2ListTexture from '~/assets/pro2-list.jpeg';
import pro2Texture from '~/assets/pro2.jpeg';
import p1Texture from '~/assets/P1.svg?url';
import p1LightTexture from '~/assets/P1_light.svg?url';
import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';
import civoInvoiceTexture from '~/assets/civo_invoice.svg?url';
import sprTexture from '~/assets/pr1_drooms.png';
import sprTexturePlaceholder from '~/assets/pr1_drooms-placeholder.png';
import { useHydrated } from '~/hooks/useHydrated';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { useTheme } from '~/components/theme-provider';
import { Intro } from './intro';
import { Featured } from './featured';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Nassaty Technologies',
    description: `Portfolio of ${config.name} — an AI company specializing in autonomous agents, intelligent automation, and cutting-edge software solutions.`,
  });
};

export const Home = () => {
  const { theme } = useTheme();
  const isHydrated = useHydrated();
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const featuredProject = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, featuredProject, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <Featured
        id="featured"
        sectionRef={featuredProject}
        visible={visibleSections.includes(featuredProject.current)}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="QBot"
        description="Automate and enhance your customer interactions with our intelligent AI chatbot, designed to respond, support, and grow your business effortlessly."
        buttonText="View More"
        buttonLink="/projects/slice"
        model={{
          type: 'image',
          alt: 'QBot AI chatbot interface',
          textures: [
            {
              srcSet: `${isHydrated && theme === 'light' ? p1LightTexture : p1Texture} 800w`,
              placeholder: isHydrated && theme === 'light' ? p1LightTexture : p1Texture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="One platform. Your business online."
        description="A complete website and mobile ordering system that helps businesses showcase their brand, accept orders, and track them in real time — all for a simple monthly fee.

From menus and promotions to ordering and delivery tracking, everything your customers need is in one place."
        buttonText="View More"
        buttonLink="/projects/smart-sparrow"
        model={{
          type: 'laptop-flat',
          alt: 'Nassaty ordering system on desktop and mobile',
          textures: [
            {
              srcSet: `${sprTexture} 800w`,
              placeholder: sprTexturePlaceholder,
            },
            {
              srcSet: `${pro2Texture} 375w`,
              placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="CIVO"
        description="A centralized platform that helps construction businesses manage proformas, purchase orders, delivery notes, and invoices — all in one secure, easy-to-use system.

Reduce paperwork. Improve accuracy. Get paid faster."
        buttonText="View More"
        buttonLink="/projects/civo"
        model={{
          type: 'image',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${civoInvoiceTexture} 800w`,
              placeholder: civoInvoiceTexture,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
