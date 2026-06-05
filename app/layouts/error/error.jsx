import usesBackgroundPlaceholder from '~/assets/uses-background-placeholder.jpg';
import usesBackground from '~/assets/uses-background.mp4';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Monogram } from '~/components/monogram';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { isRouteErrorResponse } from '@remix-run/react';
import styles from './error.module.css';

function parseRouteError(error) {
  if (isRouteErrorResponse(error)) {
    const data =
      typeof error.data === 'string'
        ? error.data
        : error.data?.message || error.data?.error;
    return {
      status: error.status,
      statusText: error.statusText,
      message: data,
    };
  }

  if (error instanceof Error) {
    return {
      status: undefined,
      statusText: undefined,
      message: error.message,
    };
  }

  return {
    status: undefined,
    statusText: undefined,
    message: 'Something went wrong. Please try again.',
  };
}

function getErrorContent({ status, statusText, message }) {
  if (status === 404) {
    return {
      code: '404',
      summary: 'Page not found',
      message:
        message ||
        'The page you’re looking for doesn’t exist or may have been moved. Head back home and try another link.',
      showCode: true,
      isUnexpected: false,
    };
  }

  if (status === 405) {
    return {
      code: String(status),
      summary: 'Method not allowed',
      message: message || statusText || 'This action is not supported.',
      showCode: true,
      isUnexpected: false,
    };
  }

  if (!status) {
    return {
      code: null,
      summary: 'Something went wrong',
      message:
        message ||
        'An unexpected error occurred while loading this page. You can try again or return to the homepage.',
      showCode: false,
      isUnexpected: true,
    };
  }

  return {
    code: String(status),
    summary: status >= 500 ? 'Server error' : 'Something went wrong',
    message:
      message ||
      statusText ||
      'We couldn’t complete that request. Please try again in a moment.',
    showCode: true,
    isUnexpected: false,
  };
}

export function Error({ error }) {
  const parsed = parseRouteError(error ?? {});
  const { code, summary, message, showCode, isUnexpected } = getErrorContent(parsed);

  return (
    <section className={styles.page}>
      <Transition in>
        {({ visible }) => (
          <>
            <div className={styles.details}>
              <div className={styles.text}>
                {showCode && code && (
                  <Heading
                    className={styles.title}
                    data-visible={visible}
                    level={0}
                    weight="bold"
                  >
                    {code}
                  </Heading>
                )}
                <Heading
                  className={styles.subheading}
                  data-visible={visible}
                  as="h1"
                  level={isUnexpected ? 2 : 4}
                >
                  {!showCode && (
                    <Monogram className={styles.brandMark} data-visible={visible} />
                  )}
                  <DecoderText text={summary} start={visible} delay={300} />
                </Heading>
                <Text className={styles.description} data-visible={visible} as="p">
                  {message}
                </Text>
                <div className={styles.actions}>
                  {isUnexpected && (
                    <Button
                      className={styles.button}
                      data-visible={visible}
                      type="button"
                      onClick={() => window.location.reload()}
                      iconHoverShift
                    >
                      Try again
                    </Button>
                  )}
                  <Button
                    secondary={isUnexpected}
                    iconHoverShift
                    className={styles.button}
                    data-visible={visible}
                    href="/"
                    icon="chevron-right"
                  >
                    Back to homepage
                  </Button>
                </div>
              </div>
            </div>

            <div className={styles.videoContainer} data-visible={visible}>
              <Image
                reveal
                cover
                noPauseButton
                delay={600}
                className={styles.video}
                src={usesBackground}
                placeholder={usesBackgroundPlaceholder}
              />
            </div>
          </>
        )}
      </Transition>
    </section>
  );
}
