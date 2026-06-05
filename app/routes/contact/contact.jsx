import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import { Form, useActionData, useNavigation } from '@remix-run/react';

import styles from './contact.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send us a message if you’re interested in discussing a project or if you just want to say hi',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;




export const Contact = () => {
  const errorRef = useRef();
  const email = useFormInput('');
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationXS;
  const actionData = useActionData();
  const { state } = useNavigation();
  const sending = state === 'submitting';

  return (
    <Section className={styles.contact}>
      <Transition unmount in={!actionData?.success} timeout={1600}>
        {({ status, nodeRef }) => (
          <div className={styles.contentContainer} ref={nodeRef} data-status={status}>
            <div className={styles.details}>
              <Heading
                className={styles.title}
                data-status={status}
                level={2}
                as="h1"
                style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
              >
                <DecoderText text="Contact us" start={status !== 'exited'} delay={0} />
              </Heading>
              <Text
                className={styles.description}
                data-status={status}
                style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
              >
                We’d love to hear from you. Please fill out this form, and we’ll reply soon.
              </Text>
              <div className={styles.contactGrid}>
                <div
                  className={styles.contactItem}
                  data-status={status}
                  style={getDelay(tokens.base.durationXS, initDelay, 0.5)}
                >
                  <Icon className={styles.contactIcon} icon="mail" />
                  <div className={styles.contactItemContent}>
                    <Heading level={4} as="h3" className={styles.contactTitle}>Email</Heading>
                    <Text className={styles.contactText}>
                      Contact us by email, and we will respond shortly.
                    </Text>
                    <a className={styles.contactLink} href="mailto:nassaty@gmail.com">nassaty@gmail.com</a>
                  </div>
                </div>
                <div
                  className={styles.contactItem}
                  data-status={status}
                  style={getDelay(tokens.base.durationXS, initDelay, 0.6)}
                >
                  <Icon className={styles.contactIcon} icon="phone" />
                  <div className={styles.contactItemContent}>
                    <Heading level={4} as="h3" className={styles.contactTitle}>Phone & WhatsApp</Heading>
                    <Text className={styles.contactText}>
                      24/7 😊 💻
                    </Text>
                    <div className={styles.contactLinkGroup}>
                      <div className={styles.contactLinkGroupItem}>
                        <Icon className={styles.whatsAppIcon} icon="whatsapp" />
                        <a className={styles.contactLink} href="tel:+250790135718">+250 790 135 718</a>
                      </div>
                      <div className={styles.contactLinkGroupItem}>
                        <Icon className={styles.whatsAppIcon} icon="whatsapp" />
                        <a className={styles.contactLink} href="tel:+250782085695">+250 782 085 695</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Form
              unstable_viewTransition
              className={styles.form}
              method="post"
            >
              <Heading
                className={styles.formTitle}
                data-status={status}
                level={3}
                as="h2"
                style={getDelay(tokens.base.durationXS, initDelay, 0.45)}
              >
                Write us a message
              </Heading>

              {/* Hidden honeypot field to identify bots */}
              <Input
                className={styles.botkiller}
                label="Name"
                name="name"
                maxLength={MAX_EMAIL_LENGTH}
              />
              <div className={styles.row}>
                <Input
                  required
                  className={styles.input}
                  data-status={status}
                  style={getDelay(tokens.base.durationXS, initDelay)}
                  autoComplete="given-name"
                  label="First name"
                  type="text"
                  name="firstName"
                  maxLength={MAX_EMAIL_LENGTH}
                  {...firstName}
                  error={actionData?.errors?.firstName || firstName.error}
                />
                <Input
                  required
                  className={styles.input}
                  data-status={status}
                  style={getDelay(tokens.base.durationXS, initDelay)}
                  autoComplete="family-name"
                  label="Last name"
                  type="text"
                  name="lastName"
                  maxLength={MAX_EMAIL_LENGTH}
                  {...lastName}
                  error={actionData?.errors?.lastName || lastName.error}
                />
              </div>
              <Input
                required
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationXS, initDelay)}
                autoComplete="email"
                label="Email"
                type="email"
                name="email"
                maxLength={MAX_EMAIL_LENGTH}
                {...email}
                error={actionData?.errors?.email || email.error}
              />
              <Input
                required
                multiline
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationS, initDelay)}
                autoComplete="off"
                label="Message"
                name="message"
                maxLength={MAX_MESSAGE_LENGTH}
                {...message}
                error={actionData?.errors?.message || message.error}
              />
              <div
                className={styles.checkboxContainer}
                data-status={status}
                style={getDelay(tokens.base.durationS, initDelay, 0.4)}
              >
                <input type="checkbox" id="privacy-policy" required className={styles.checkbox} />
                <label htmlFor="privacy-policy" className={styles.checkboxLabel}>
                  I agree to the Privacy Policy
                </label>
              </div>
              <Transition
                unmount
                in={!sending && actionData?.errors}
                timeout={msToNum(tokens.base.durationM)}
              >
                {({ status: errorStatus, nodeRef }) => (
                  <div
                    className={styles.formError}
                    ref={nodeRef}
                    aria-live="polite"
                    data-status={errorStatus}
                    style={cssProps({
                      height: errorStatus ? errorRef.current?.offsetHeight : 0,
                    })}
                  >
                    <div className={styles.formErrorContent} ref={errorRef}>
                      <div className={styles.formErrorMessage}>
                        <Icon className={styles.formErrorIcon} icon="error" />
                        {actionData?.errors?.firstName}
                        {actionData?.errors?.lastName}
                        {actionData?.errors?.email}
                        {actionData?.errors?.message}
                      </div>
                    </div>
                  </div>
                )}
              </Transition>
              <Button
                className={styles.button}
                data-status={status}
                data-sending={sending}
                style={getDelay(tokens.base.durationM, initDelay)}
                disabled={sending}
                loading={sending}
                loadingText="Sending..."
                type="submit"
                icon="send"
                secondary
              >
                Send
              </Button>
            </Form>
          </div>
        )}
      </Transition>
      <Transition unmount in={actionData?.success}>
        {({ status, nodeRef }) => (
          <div className={styles.complete} aria-live="polite" ref={nodeRef}>
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              We’ll get back to you within a couple days, sit tight
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevron-right"
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
