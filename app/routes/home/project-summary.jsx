import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { deviceModels } from '~/components/model/device-models';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useTheme } from '~/components/theme-provider';
import { Transition } from '~/components/transition';
import { Loader } from '~/components/loader';
import { Image } from '~/components/image';
import { useWindowSize } from '~/hooks';
import { Suspense, lazy, useState, useEffect } from 'react';
import { cssProps, media } from '~/utils/style';
import { useHydrated } from '~/hooks/useHydrated';
import gng1Dark from '~/assets/gng_1_dark.svg';
import gng2Dark from '~/assets/gng_2_dark.svg';
import gng3Dark from '~/assets/gng_3_dark.svg';
import gng1Light from '~/assets/gng_1_light.svg';
import gng2Light from '~/assets/gng_2_light.svg';
import gng3Light from '~/assets/gng_3_light.svg';
import styles from './project-summary.module.css';

const Model = lazy(() =>
  import('~/components/model').then(module => ({ default: module.Model }))
);

export function ProjectSummary({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  alternate,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const isHydrated = useHydrated();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme === 'light' ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;

  useEffect(() => {
    if (model.type === 'laptop-flat' || model.type === 'image') {
      setModelLoaded(true);
    }
  }, [model.type]);

  function handleModelLoad() {
    setModelLoaded(true);
  }

  function renderKatakana(device, visible) {
    // Choose SVG based on project index and theme
    let svgSrc;

    // Cycle through SVGs based on project index (1, 2, 3)
    const svgIndex = ((index - 1) % 3) + 1; // Maps any index to 1, 2, or 3

    if (theme === 'dark') {
      if (svgIndex === 1) svgSrc = gng1Dark;
      else if (svgIndex === 2) svgSrc = gng2Dark;
      else if (svgIndex === 3) svgSrc = gng3Dark;
    } else {
      if (svgIndex === 1) svgSrc = gng1Light;
      else if (svgIndex === 2) svgSrc = gng2Light;
      else if (svgIndex === 3) svgSrc = gng3Light;
    }

    return (
      <img
        src={svgSrc}
        alt="gng"
        data-device={device}
        data-visible={visible && modelLoaded}
        style={cssProps({ opacity: svgOpacity })}
        className={styles.svg}
      />
    );
  }

  function renderDetails(visible) {
    return (
      <div className={styles.details}>
        <div aria-hidden className={styles.index}>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={1000}
          />
          <span className={styles.indexNumber} data-visible={visible}>
            {indexText}
          </span>
        </div>
        <Heading
          level={3}
          as="h2"
          className={styles.title}
          data-visible={visible}
          id={titleId}
        >
          {title}
        </Heading>
        <Text className={styles.description} data-visible={visible} as="p">
          {description}
        </Text>
        <div className={styles.button} data-visible={visible}>
          <Button iconHoverShift href={buttonLink} iconEnd="arrow-right">
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }

  function renderPreview(visible) {
    return (
      <div className={styles.preview}>
        {model.type === 'laptop' && (
          <>
            {renderKatakana('laptop', visible)}
            <div className={styles.model} data-device="laptop">
              {!modelLoaded && (
                <Loader center className={styles.loader} data-visible={visible} />
              )}
              {isHydrated && visible && (
                <Suspense>
                  <Model
                    alt={model.alt}
                    cameraPosition={{ x: 0, y: 0, z: 8 }}
                    showDelay={700}
                    onLoad={handleModelLoad}
                    show={visible}
                    models={[
                      {
                        ...deviceModels.laptop,
                        texture: {
                          ...model.textures[0],
                          sizes: laptopSizes,
                        },
                      },
                    ]}
                  />
                </Suspense>
              )}
            </div>
          </>
        )}
        {model.type === 'phone' && (
          <>
            {renderKatakana('phone', visible)}
            <div className={styles.model} data-device="phone">
              {!modelLoaded && (
                <Loader center className={styles.loader} data-visible={visible} />
              )}
              {isHydrated && visible && (
                <Suspense>
                  <Model
                    alt={model.alt}
                    cameraPosition={{ x: 0, y: 0, z: 11.5 }}
                    showDelay={300}
                    onLoad={handleModelLoad}
                    show={visible}
                    models={[
                      {
                        ...deviceModels.phone,
                        position: { x: -0.6, y: 1.1, z: 0 },
                        texture: {
                          ...model.textures[0],
                          sizes: phoneSizes,
                        },
                      },
                      {
                        ...deviceModels.phone,
                        position: { x: 0.6, y: -0.5, z: 0.3 },
                        texture: {
                          ...model.textures[1],
                          sizes: phoneSizes,
                        },
                      },
                    ]}
                  />
                </Suspense>
              )}
            </div>
          </>
        )}
        {model.type === 'laptop-flat' && (
          <>
            {renderKatakana('laptop-flat', visible)}
            <div className={styles.browserFrame} data-visible={visible}>
              <div className={styles.browserHeader}>
                <div className={styles.trafficLight} style={{ '--color': '#ff5f56' }} />
                <div className={styles.trafficLight} style={{ '--color': '#ffbd2e' }} />
                <div className={styles.trafficLight} style={{ '--color': '#27c93f' }} />
              </div>
              <div className={styles.browserContent}>
                <Image
                  cover
                  className={styles.image}
                  srcSet={model.textures[0].srcSet}
                  placeholder={model.textures[0].placeholder}
                  alt={model.alt}
                  sizes={laptopSizes}
                />
              </div>
            </div>
            {model.textures.length > 1 && (
              <div className={styles.phoneFrame} data-visible={visible}>
                <div className={styles.phoneContent}>
                  <Image
                    cover
                    className={styles.image}
                    srcSet={model.textures[1].srcSet}
                    placeholder={model.textures[1].placeholder}
                    alt={model.alt}
                    sizes={phoneSizes}
                  />
                </div>
              </div>
            )}
          </>
        )}
        {model.type === 'image' && (
          <>
            {renderKatakana('image', visible)}
            <div className={styles.imageFrame} data-visible={visible}>
              <Image
                cover
                className={styles.image}
                srcSet={model.textures[0].srcSet}
                placeholder={model.textures[0].placeholder}
                alt={model.alt}
                sizes={laptopSizes}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={sectionVisible || focused}>
          {({ visible }) => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
}
