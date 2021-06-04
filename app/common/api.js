import { openOptionsPage } from '../../src/utils';

// Open long-lived communications with background page
// const port = browser.runtime.connect({ name: 'ui' });

const tabs = {
  /**
   * Opens a new tab with the meetings page active and
   * closes the popup window
   *
   * @returns {Promise<void>}
   */
  openOptionsPage: async () => {
    await openOptionsPage();
    window.close();
  },

};


const api = {
  tabs,
};

export default api;
