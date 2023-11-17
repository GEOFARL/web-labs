<?php include('./dbconn.php') ?>

<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Third Lab</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <div id="root">
      <div class="page-wrapper">
        <div class="content-container">
          <aside class="aside">
            <div class="aside__content">
              <div class="aside__list-header">
                <h5>RTK Query</h5>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-chevron-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
              <ol class="aside__list">
                <li class="aside__list-item">
                  <a href="#">RTK Query Overview</a>
                </li>
                <li class="aside__list-item">
                  <a href="#">Comparison with Other Tools</a>
                </li>
                <li class="aside__list-item"><a href="#">Examples</a></li>
                <li class="aside__list-item">
                  <a href="#">Usage with TypeScript</a>
                </li>
              </ol>
            </div>
          </aside>
          <div class="content">
            <header class="content__header">
              <nav class="content__nav">
                <div class="content__menu-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                    <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                    <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
                <ul>
                  <li>
                    <a href="#" class="active-link">Flex</a>
                  </li>
                  <li><a href="#">Blocks</a></li>
                  <li><a href="#">Grid</a></li>
                </ul>
              </nav>
              <div class="content__header-content">
                <h1>Flex Page</h1>
              </div>
            </header>
            <div class="content__wrapper">
              <main class="content__main">
                <div class="content__thumbnails">
                  <p>
                    <a href="#">Home</a> / <a href="#">Main Page</a> /
                    <a href="#">Image</a>
                  </p>
                </div>
                <div class="content__main-view">
                  <article class="content__article">
                    <div>
                      <h3 class="content__article-header">Article Header</h3>
                      <div>
                        <p class="content__paragraph">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Ullam, magnam nulla hic maiores autem ipsam
                          soluta
                          <code><span class="syntax-keyword">let</span> x =
                            5;</code>
                          sint est ipsa! Sed sit iusto odio, asperiores modi
                          quam nam totam accusantium.
                        </p>
                        <p class="content__paragraph">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Ullam, magnam nulla hic maiores autem ipsam
                          soluta inventore sint est ipsa! Sed sit iusto odio,
                          asperiores modi quam nam totam accusantium.
                        </p>
                        <p class="content__paragraph">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Ullam, magnam nulla hic maiores autem ipsam
                          soluta inventore sint est ipsa! Sed sit iusto odio,
                          asperiores modi quam nam totam accusantium.
                        </p>

                        <div class="content_buttons-container">
                          <button class="btn">Read More</button>
                          <button class="btn btn--secondary">Follow</button>
                        </div>
                      </div>
                    </div>
                  </article>

                  <section class="tabs-creation">
                    <div class="tabs-container">
                      <div class="tabs">

                        <?php 
                        $tabs = $conn->query("SELECT * FROM tabs");
                        if ($tabs->rowCount() < 1) { ?>

                        <h3 class="tabs-creation__empty">
                          Currently no tabs created
                        </h3>
                        <?php } else { ?>
                        <ul class="tabs-list">
                          <?php
                          $i = 0;
                          $firstTabContent;
                          while($tab = $tabs->fetch(PDO::FETCH_ASSOC)) {
                            if ($i == 0) {
                              $firstTabContent = $tab["content"];
                            }
                            ?>
                          <li class="<?php echo($i === 0 ? 'active-tab' : '')?>">
                            <button><?php echo $tab['title']; $i++ ?></button></li>
                          <?php } ?>
                        </ul>
                        <div class="tabs-content">
                          <?php echo $firstTabContent ?>
                        </div>

                        <form action="app/drop-tabs.php">
                          <button class="btn btn--danger" style="margin-left: auto;">Drop all tabs</button>
                        </form>
                        <?php } ?>
                      </div>
                    </div>
                  </section>
                </div>
              </main>
              <aside class="content__aside">
                <div class="content__aside-content">
                  <div class="card">
                    <map name="first-map">
                      <area shape="rect" coords="0,0,200,200" href="https://developer.mozilla.org/docs/Web/JavaScript"
                        target="_blank" alt="JavaScript" />
                    </map>

                    <img src="https://picsum.photos/seed/picsum/200" alt="mountains" usemap="#first-map" />

                    <span class="heart">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path
                          d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
                      </svg>
                    </span>
                  </div>

                  <div class="card">
                    <map name="second-map">
                      <area shape="rect" coords="0,0,200,200" href="https://developer.mozilla.org/docs/Web/JavaScript"
                        target="_blank" alt="JavaScript" />
                    </map>

                    <img src="https://picsum.photos/seed/fdlkas/200" alt="forest" usemap="#second-map" />

                    <span class="heart">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path
                          d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
                      </svg>
                    </span>
                  </div>

                  <div class="card">
                    <map name="third-map">
                      <area shape="rect" coords="0,0,200,200" href="https://developer.mozilla.org/docs/Web/JavaScript"
                        target="_blank" alt="JavaScript" />
                    </map>
                    <img src="https://picsum.photos/seed/ftwrs/200" alt="sea" usemap="#third-map" />

                    <span class="heart">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path
                          d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
        <footer class="footer">
          <div class="footer__content-container">
            <h4>Happy Day</h4>
          </div>
          <div class="footer__socials-container">
            <a href="https://www.instagram.com/" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>

            <a href="index.php" target="_self">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path
                  d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
              </svg>
            </a>

            <a href="https://twitter.com/" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path
                  d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>

    <script src="./TabsManager.js"></script>

    <script>
      const list = document.querySelector('.aside');
      const menuButton = document.querySelector('.content__menu-button');

      if (window.innerWidth < 1024) {
        list.classList.add('hidden');
      }

      menuButton.addEventListener('click', toggleMenuList);

      function openMenu() {
        menuButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="#000000"       viewBox="0 0 16 16">
            <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd"/>
          </svg>`;
        list.classList.add('slide-in-bottom');
        menuButton.setAttribute('style', 'transform: scale(0.75)');
      }

      function closeMenu() {
        menuButton.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 18L20 18"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M4 12L20 12"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
                  `;
        menuButton.setAttribute('style', 'transform: scale(1)');
      }

      function toggleMenuList() {
        list.classList.toggle('hidden');

        if (!list.classList.contains('hidden')) {
          openMenu();
        } else {
          closeMenu();
        }
      }

      window.addEventListener('resize', (e) => {
        const width = e.target.innerWidth;

        if (width > 1024) {
          list.classList.remove('slide-in-bottom');
          list.classList.remove('hidden');
          closeMenu();
        } else {
          list.classList.add('hidden');
          closeMenu();
        }
      });

      const data = [
        <?php 
          $tabs = $conn->query("SELECT * FROM tabs");
          while($tab = $tabs->fetch(PDO::FETCH_ASSOC)) {
            ?>
            {
              title: `<?php echo $tab['title']?>`,
              content: `<?php echo $tab['content']?>`,
            },
            <?php
          }
          ?>
      ];

      const tabsManager = new TabsManager(document.querySelector('.tabs'), true, data);
    </script>

  </body>

</html>