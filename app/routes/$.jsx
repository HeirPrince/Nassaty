import { useRouteError } from '@remix-run/react';
import { Error } from '~/layouts/error';
import { baseMeta } from '~/utils/meta';

export async function loader() {
  throw new Response(null, { status: 404, statusText: 'Not found' });
}

export const meta = () => {
  return baseMeta({
    title: 'Page not found',
    description: 'The page you requested could not be found.',
  });
};

export function ErrorBoundary() {
  const error = useRouteError();
  return <Error error={error} />;
}
