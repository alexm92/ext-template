import { MY_AWESOME_WEBSITE_URL } from '../config';

console.log('background init');


/**
 * Extension API wrapper
 */
browser.runtime.onMessage.addListener(async (message, sender) => {
  const { type } = message;
  console.log('got message', message);
});


/**
 * Open new tab showing the latest updates when first run or if version changed.
 */
browser.runtime.onInstalled.addListener(async (details) => {
  const { reason } = details;
  console.log('Extension just got:', reason);
});

