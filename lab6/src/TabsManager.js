class TabsManager {
  #tabs = [];
  #tabsList;
  #tabsContent;
  #rootEl;

  #isServer;

  constructor(rootEl, isServer, tabs) {
    this.#rootEl = rootEl;
    this.#isServer = isServer;

    if (tabs) {
      this.#tabs = tabs;
    }

    if (!isServer) {
      rootEl.innerHTML = '';
      this.#showEmptyMsg();

      let previousTabs = this.#tabs.slice();

      setInterval(() => {
        if (previousTabs.length !== this.#tabs.length) {
          console.log('Updating tabs');

          const newTabs = this.#tabs.slice(previousTabs.length);
          previousTabs = this.#tabs.slice();

          this.#saveTabs(newTabs);
        }
      }, 3000);
    }

    if (isServer && tabs) {
      if (tabs.length > 0) {
        this.#tabsList = this.#rootEl.querySelector('.tabs-list');
        this.#tabsContent = this.#rootEl.querySelector('.tabs-content');
        this.#addListeners();
      }
    }

    if (isServer) {
      let previousTabs = this.#tabs.slice();

      setInterval(async () => {
        const resp = await fetch('/app/fetch-tabs.php');
        const tabs = await resp.json();

        if (previousTabs.length !== tabs.length) {
          console.log('Updating tabs');

          const newTabs = tabs.slice(previousTabs.length);
          previousTabs = tabs.slice();

          newTabs.forEach((tab) => this.addTab(tab.title, tab.content));
        }
      }, 5000);
    }
  }

  #addListeners() {
    const tabs = [...this.#tabsList.querySelectorAll('li')];
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => this.#makeTabActive(i));
    });
  }

  async #saveTabs(newTabs) {
    console.log('Saving new tabs', newTabs);

    const promises = newTabs.map((tab) => {
      return fetch('/app/create-tab.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          title: tab.title,
          content: tab.content,
        }),
      });
    });

    const res = await Promise.all(promises);
    console.log(res);
  }

  addTab(title, content) {
    if (this.#tabs.length === 0) {
      this.#createTabsContainer();
      this.#removeEmptyMsg();

      if (this.#isServer) {
        this.#addDropBtn();
      }
    }

    const tab = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = title;
    tab.appendChild(button);

    this.#tabs.push(new Tab(title, content));
    this.#tabsList.appendChild(tab);

    const index = this.#tabs.length - 1;

    tab.addEventListener('click', () => {
      this.#makeTabActive(index);
    });

    if (this.#tabs.length === 1) {
      this.#makeTabActive(0);
    }

    this.#displayContent(content);
  }

  #showEmptyMsg() {
    const heading = document.createElement('h3');
    heading.setAttribute('class', 'tabs-creation__empty');
    heading.innerText = 'Currently no tabs created';

    this.#rootEl.appendChild(heading);
  }

  #removeEmptyMsg() {
    this.#rootEl.querySelector('.tabs-creation__empty').remove();
  }

  #createTabsContainer() {
    const tabsList = document.createElement('ul');
    tabsList.setAttribute('class', 'tabs-list');
    this.#rootEl.appendChild(tabsList);
    this.#tabsList = tabsList;

    const tabsContent = document.createElement('div');
    tabsContent.setAttribute('class', 'tabs-content');
    this.#rootEl.appendChild(tabsContent);
    this.#tabsContent = tabsContent;
  }

  #makeTabActive(index) {
    const tabs = [...this.#tabsList.querySelectorAll('li')];
    tabs.forEach((tab) => tab.classList.remove('active-tab'));

    tabs[index].classList.add('active-tab');
    this.#displayContent(this.#tabs[index].content);
  }

  #displayContent(content) {
    this.#tabsContent.innerText = content;
  }

  #addDropBtn() {
    const dropBtn = document.createElement('button');
    dropBtn.setAttribute('class', 'btn btn--danger');
    dropBtn.setAttribute('style', 'margin-left: auto;');
    dropBtn.innerText = 'Drop all tabs';

    const form = document.createElement('form');
    form.setAttribute('action', 'app/drop-tabs.php');
    form.appendChild(dropBtn);

    this.#rootEl.appendChild(form);
  }
}

class Tab {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}
