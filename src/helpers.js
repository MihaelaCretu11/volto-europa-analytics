const loadEuropaAnalyticsScript = (callback, version) => {
  const existingScript =
    __CLIENT__ && document.getElementById(`europaAnalyticsJS`);
  //replace script loaded on each version change
  if (existingScript) {
    existingScript.setAttribute('src', `https://europa.eu/webtools/load.js`);
  }
  if (!existingScript && __CLIENT__) {
    const script = document.createElement('script');
    script.src = `https://europa.eu/webtools/load.js`;
    script.id = `europaAnalyticsJS`;
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  //callback, if needed
  if (existingScript && callback) callback();

  const europaAnalytics =
    isMyScriptLoaded(version) && __CLIENT__ ? window.europaAnalytics : '';
  return europaAnalytics;
};

const isMyScriptLoaded = (version) => {
  //check for loaded europaAnalytics script in dom scripts
  var scripts = __CLIENT__ && document.getElementsByTagName('script');
  if (scripts) {
    for (var i = scripts.length; i--; ) {
      // eslint-disable-next-line eqeqeq
      if (scripts[i].src === `https://europa.eu/webtools/load.js`) return true;
    }
  }
  return false;
};

export { loadEuropaAnalyticsScript, isMyScriptLoaded };
