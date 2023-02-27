import React, { useEffect } from 'react';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { trackPageView } from './utils';
import { loadEuropaAnalyticsScript } from './helpers';
import axios from 'axios';

/**
 *
 * @param {*} param0
 * @returns
 */
export const EuropaAnalyticsAppExtra = ({ location, content }) => {
  const title = content?.title;
  const pathname = location.pathname.replace(/\/$/, '');

  const href = flattenToAppURL(content?.['@id'] || '');
  const baseUrl = getBaseUrl(pathname) || '';
  const version = '2.8.0';
  const data = {
    name: 'morpheus',
    job: 'leader',
  };

  useEffect(() => {
    if (href === pathname) {
      // a document (content)
      axios.post('https://reqres.in/api/users', { data });
      trackPageView({ href, documentTitle: title });
    }
    if (baseUrl !== pathname) {
      // a route (utility view)
      const action = pathname.split('/')[pathname.split('/').length - 1];
      axios.post('https://reqres.in/api/users', { data });
      trackPageView({ href: pathname, documentTitle: action });
    }
  }, [href, pathname, title, baseUrl]);

  useEffect(() => {
    loadEuropaAnalyticsScript(
      window.addEventListener('wtAnalyticsReady', function () {
        if ($wt.analytics.isTrackable()) {
          $wt.trackPageView();
        }
      }),
      version,
    );
  }, []);

  return <React.Fragment />;
};

export default EuropaAnalyticsAppExtra;
