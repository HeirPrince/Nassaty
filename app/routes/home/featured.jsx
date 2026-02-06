import { Button } from '~/components/button';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Image } from '~/components/image';
import { useEffect, useState } from 'react';
import styles from './featured.module.css';
import natiChat from '~/assets/nati_chat.png';
import natiTasks from '~/assets/nati_tasks.png';
import natiReminders from '~/assets/nati_reminders.png';

export function Featured({ id, sectionRef, visible, ...rest }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setActiveImage(prev => (prev === 2 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <Section
      className={styles.featured}
      as="section"
      id={id}
      ref={sectionRef}
      {...rest}
    >
      <div className={styles.content}>
        <div className={styles.details}>
          <div className={styles.badge} data-visible={visible}>
            <span className={styles.badgeText}>Featured</span>
          </div>
          <Heading level={2} as="h2" className={styles.title} data-visible={visible}>
            Turn Conversations Into Progress
          </Heading>
          <Text className={styles.description} data-visible={visible}>
            What starts as a simple chat becomes a clear path forward. The AI listens between the lines, recognizing when an idea needs structure, when a thought needs a reminder, and when now needs to become later.
          </Text>
          <div className={styles.actions} data-visible={visible}>
            <Button iconHoverShift href="/note_app/aether-notes.apk" download="AetherNotes.apk" iconEnd="download">
              Download App
            </Button>
          </div>
        </div>
        <div className={styles.preview}>
          <div className={styles.decoration} data-visible={visible}>
            <div className={styles.glow} />
          </div>
          <div className={styles.phoneContainer} data-visible={visible}>
            <img
              className={styles.phoneImage}
              data-active={activeImage === 0}
              src={natiChat}
              alt="AI Chat Interface"
            />
            <img
              className={styles.phoneImage}
              data-active={activeImage === 1}
              src={natiTasks}
              alt="Task List"
            />
            <img
              className={styles.phoneImage}
              data-active={activeImage === 2}
              src={natiReminders}
              alt="Reminders"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
