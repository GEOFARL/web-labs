const formEl = document.querySelector('.form');

const titleInput = document.querySelector('#tab-name');
const contentInput = document.querySelector('#tab-content');

const tabsManager = new TabsManager(document.querySelector('.tabs'), false, []);

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const content = contentInput.value;

  tabsManager.addTab(title, content);

  titleInput.value = '';
  contentInput.value = '';
});
