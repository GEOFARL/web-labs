const playBtn = document.querySelector('.play-btn');
const closeBtn = document.querySelector('.close-btn');

const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const reloadBtn = document.querySelector('.reload-btn');
const dumpBtn = document.querySelector('.dump-btn');

const placementSelect = document.querySelector('.placement');

const anim = document.querySelector('.anim');

const smallBallEl = document.querySelector('.small-ball');
const bigBallEl = document.querySelector('.big-ball');

const INTERVAL_RATE = 10;
let done = false;
let clickProcessed = true;

class EventManager {
  constructor(displayElement, target) {
    this.displayElement = displayElement;
    this.target = target;

    if (!localStorage.getItem('events')) {
      localStorage.setItem('events', '[]');
    }
  }

  async addEvent(event) {
    const date = new Date().toISOString();

    if (this.target === 'localStorage') {
      const events = JSON.parse(localStorage.getItem('events'));
      events.push(`${events.length + 1} - ${event} - ${date}`);
      localStorage.setItem('events', JSON.stringify(events));
    } else if (this.target === 'server') {
      try {
        await fetch('/app/save-event.php', {
          method: 'POST',
          body: event,
        });
      } catch (err) {
        console.log(err);
      }
    }
    this.display(event);
  }

  async showAllEvents(container) {
    const existingTable = container.querySelector('table');
    if (existingTable) {
      existingTable.remove();
    }

    const table = document.createElement('table');
    table.style.border = '1px solid black';
    table.style.borderCollapse = 'collapse';

    let latestRow = document.createElement('tr');
    table.appendChild(latestRow);

    let events;

    if (this.target === 'localStorage') {
      events = JSON.parse(localStorage.getItem('events'));
    } else if (this.target === 'server') {
      let response;
      try {
        response = await fetch('/app/fetch-events.php');
      } catch (err) {
        console.log(err);
      }
      const data = await response.json();

      events = data.map(
        (entry) => `${entry.id} - ${entry.data} - ${entry.datetime}`
      );
    }

    events.forEach((event, i) => {
      if (i % 2 === 0) {
        table.appendChild(latestRow);
        latestRow = document.createElement('tr');
      }

      const td = document.createElement('td');

      td.style.border = '1px solid black';
      latestRow.appendChild(td);
      td.innerText = event;
    });

    if (events.length % 2 !== 0) table.appendChild(latestRow);

    container.appendChild(table);
  }

  display(event) {
    this.displayElement.innerText = event;
  }

  setTarget(target) {
    this.target = target;
  }
}

class Ball {
  constructor(
    element,
    x,
    y,
    radius,
    speed,
    direction,
    color,
    dimensions,
    name
  ) {
    this.element = element;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.direction = direction;
    this.color = color;
    this.boardDimensions = dimensions;
    this.name = name;

    this.initials = {
      x,
      y,
    };

    this.setUp();
  }

  setUp() {
    this.element.setAttribute(
      'style',
      `border-radius: 50%; background-color: ${this.color}; width: ${
        this.radius * 2
      }px; height: ${this.radius * 2}px; transform: translate(${this.x}px, ${
        this.y
      }px)`
    );
  }

  async move() {
    switch (this.direction) {
      case 'up': {
        this.y -= this.speed;

        if (this.y <= this.initials.y) {
          this.direction = 'down';
          await eventManager.addEvent(`${this.name} touched upper wall`);
        }

        await eventManager.addEvent(`${this.name} moved up by ${this.speed}px`);
        break;
      }
      case 'down': {
        this.y += this.speed;

        if (
          this.y >=
          this.initials.y + this.boardDimensions.height - 2 * this.radius
        ) {
          this.direction = 'up';
          await eventManager.addEvent(`${this.name} touched down wall`);
        }
        await eventManager.addEvent(
          `${this.name} moved down by ${this.speed}px`
        );
        break;
      }
      case 'right': {
        this.x += this.speed;

        if (
          this.x >=
          this.initials.x +
            this.boardDimensions.width -
            this.radius -
            this.speed
        ) {
          this.direction = 'left';
          await eventManager.addEvent(`${this.name} touched right wall`);
        }

        await eventManager.addEvent(
          `${this.name} moved right by ${this.speed}px`
        );
        break;
      }
      case 'left': {
        this.x -= this.speed;

        if (this.x <= this.initials.x) {
          this.direction = 'right';
          await eventManager.addEvent(`${this.name} touched left wall`);
        }
        await eventManager.addEvent(
          `${this.name} moved left by ${this.speed}px`
        );
        break;
      }
    }

    this.setUp();
  }
}

const eventManager = new EventManager(
  document.querySelector('.messages'),
  placementSelect.value
);

let smallBall;
let bigBall;

function setUpBalls() {
  const { width, height } = anim.getClientRects()[0];

  const dimensions = {
    width: width - 10,
    height: height - 10,
  };

  smallBall = new Ball(
    smallBallEl,
    0,
    height / 2 - 10,
    10,
    15,
    'right',
    'blue',
    dimensions,
    'Small ball'
  );

  bigBall = new Ball(
    bigBallEl,
    width / 2 - 25,
    -20,
    25,
    10,
    'down',
    'red',
    dimensions,
    'Big ball'
  );
}

playBtn.addEventListener('click', async () => {
  if (!clickProcessed) return;
  clickProcessed = false;
  const work = document.querySelector('.work');

  work.classList.remove('hide');

  setUpBalls();
  await eventManager.addEvent('Play button was pressed');
  clickProcessed = true;
});

closeBtn.addEventListener('click', async () => {
  if (!clickProcessed) return;
  clickProcessed = false;
  const work = document.querySelector('.work');
  done = true;

  work.classList.add('hide');
  await eventManager.addEvent('Close button was pressed');

  await eventManager.showAllEvents(document.querySelector('.message-dump'));

  if (placementSelect.value === 'localStorage') {
    try {
      await fetch('/app/save-all-events.php', {
        method: 'POST',
        body: localStorage.getItem('events'),
      });
    } catch (err) {
      console.log(err);
    }
  }
  clickProcessed = true;
});

startBtn.addEventListener('click', async () => {
  if (!clickProcessed) return;
  clickProcessed = false;
  done = false;
  window.requestAnimationFrame(run);

  startBtn.classList.add('hide');
  stopBtn.classList.remove('hide');
  reloadBtn.classList.remove('hide');
  await eventManager.addEvent('Start button was pressed');
  clickProcessed = true;
});

stopBtn.addEventListener('click', async () => {
  if (!clickProcessed) return;
  clickProcessed = false;
  done = true;

  startBtn.classList.remove('hide');
  stopBtn.classList.add('hide');
  await eventManager.addEvent('Stop button was pressed');
  clickProcessed = true;
});

reloadBtn.addEventListener('click', async () => {
  if (!clickProcessed) return;
  clickProcessed = false;
  setUpBalls();
  done = true;

  startBtn.classList.remove('hide');
  stopBtn.classList.add('hide');
  reloadBtn.classList.add('hide');
  await eventManager.addEvent('Reload button was pressed');
  clickProcessed = true;
});

function distance(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

placementSelect.addEventListener('change', (e) => {
  if (!clickProcessed) return;
  clickProcessed = false;
  if (e.target.value === 'server') {
    eventManager.setTarget('server');
  } else if (e.target.value === 'localStorage') {
    eventManager.setTarget('localStorage');
  }
  clickProcessed = true;
});

dumpBtn.addEventListener('click', async () => {
  if (!clickProcessed) return;
  clickProcessed = false;
  if (placementSelect.value === 'server') {
    try {
      await fetch('/app/dump-events.php', {
        method: 'DELETE',
      });
    } catch (err) {
      console.log(err);
    }
  } else if (placementSelect.value === 'localStorage') {
    localStorage.setItem('events', '[]');
  }
  clickProcessed = true;
});

async function run() {
  console.log('run');
  setTimeout(async () => {
    if (!done) {
      await smallBall.move();
      await bigBall.move();

      const smallBallCenter = {
        x: smallBall.x + smallBall.radius,
        y: smallBall.y + smallBall.radius,
      };
      const bigBallCenter = {
        x: bigBall.x + bigBall.radius,
        y: bigBall.y + bigBall.radius + 20,
      };

      const r = smallBall.radius;
      const R = bigBall.radius;

      if (distance(smallBallCenter, bigBallCenter) < R - r) {
        startBtn.classList.remove('hide');
        stopBtn.classList.add('hide');

        await eventManager.addEvent('Balls overlapped each other');

        return;
      }
      window.requestAnimationFrame(run);
    }
  }, INTERVAL_RATE);
}
