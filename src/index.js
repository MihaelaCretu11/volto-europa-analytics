import { EuropaAnalyticsAppExtra } from './EuropaAnalyticsExtra';

const applyConfig = (config) => {
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: EuropaAnalyticsAppExtra,
    },
  ];

  return config;
};

export default applyConfig;
