import monogram from '../../assets/monogram.png';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import { useTheme } from '~/components/theme-provider';
import { media } from '~/utils/style';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Who we are" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Nassaty Technologies is a software startup dedicated to building high-quality digital solutions.
      We specialize in AI agents, business automation, and custom web and mobile applications that
      help businesses scale and operate more efficiently.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Our team combines design excellence with technical expertise to deliver products that aren't
      just functional, but exceptional. Whether you're looking to automate your workflow with AI
      or launch a new digital product, we're here to help you navigate the future of technology.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const { theme } = useTheme();
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About us
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}

                  src={monogram}
                  width={480}
                  height={480}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Nassaty Technologies Logo"
                />

              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
