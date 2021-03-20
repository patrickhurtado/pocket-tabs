/* initialise variables */

const saveTabsButton = document.querySelector('.save button');
const loadTabsButton = document.querySelector('.load button');
const MASTER_KEY = "MASTER_KEY";

const getAllTabs = () => {
  return browser.tabs.query({currentWindow: true,}).then(tabs => tabs.map(tab => tab.url));
}

const saveTabs = (key) => {
  getAllTabs().then(tabUrls => saveData(key, tabUrls));
};

const loadTabs = (key) => {
  const tabs = JSON.parse(localStorage.getItem(key));
  tabs.map(openTab);
};

const openTab = (tabUrl) => browser.tabs.create({
  "url": tabUrl,
});

const openTabs = () => {
  getAllTabs().then(tabUrls => tabUrls.map(openTab));
};

const updateKeys = (newKey) => {
  const keys = JSON.parse(localStorage.getItem(MASTER_KEY));
  localStorage.setItem(new Set([...keys, newKey]));
};

const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  updateKeys(key);
}

saveTabsButton.onclick = () => saveTabs("key1");
loadTabsButton.onclick = () => loadTabs("key1");
