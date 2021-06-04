
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 *
 * @param path
 * @returns {Promise<*>}
 */
async function openOptionsPage(path = '') {
  const baseUrl = browser.runtime.getURL('options.html');
  const finalUrl = path ? `${baseUrl}?path=${path}` : baseUrl;

  // Create a new tab with the options page if there isn't one already open.
  return browser.tabs.create({
    active: true,
    url: finalUrl,
  });
}

export {
  sleep,
  openOptionsPage,
};
