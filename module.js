import { getMessage } from './i18n.js';

const ui = {
  navMenuArea: '.nav-menu-area',
  toolbarMenuAreaRight: '.toolbar-menu-area-right',
};

const anonClass = 'anon-mode';

const css = `
body.${anonClass} #board-layout-player-top .player-avatar,
body.${anonClass} #board-layout-player-top .player-tagline,
body.${anonClass} #board-layout-player-top .user-tagline-component,
body.${anonClass} #board-layout-player-top .player-row-avatar,
body.${anonClass} #board-layout-player-top .player-row-tagline,
body.${anonClass} #board-layout-player-bottom .player-avatar,
body.${anonClass} #board-layout-player-bottom .player-tagline,
body.${anonClass} #board-layout-player-bottom .user-tagline-component,
body.${anonClass} #board-layout-player-bottom .player-row-avatar,
body.${anonClass} #board-layout-player-bottom .player-row-tagline {
  visibility: hidden;
}

body.${anonClass} .user-username::before {
  content: 'XXXXXX';
  font-size: 1.5rem;
}

body.${anonClass} .user-rating::before {
  content: '(???)';
  font-size: 1.5rem;
}

body.${anonClass} .user-username,
body.${anonClass} .user-rating {
  font-size: 0;
  pointer-events: none;
}
`;

function createStyleElement() {
  const style = document.createElement('style');
  style.textContent = css;
  style.id = 'anon-mode-style';

  document.head.appendChild(style);

  return style;
}

function createNavMenuItem(text) {
  // should mimic one of the real buttons, example from the dark mode button:
  // <button aria-label="Lyst/mørkt grensesnitt" class="nav-action ui-mode" data-amplitude-nav-selection="subnav-uimode" data-nav-ui-mode="" type="button">
  //   <div id="mode" data-v-app=""><span class="icon-font-chess darklight" data-tooltip-target="2"></span></div>
  //   <span class="nav-link-text">
  //     <span class="light">Lys UI</span>
  //     <span class="dark">Mørkt UI</span>
  //   </span>
  // </button>

  const button = document.createElement('button');
  button.setAttribute('aria-label', text);
  button.classList.add('nav-action', 'ui-mode');
  button.type = 'button';

  const div = document.createElement('div');
  div.id = 'mode';
  div.setAttribute('data-v-app', '');

  let iconClass = 'eye';

  const span = document.createElement('span');
  span.classList.add('icon-font-chess', iconClass);
  span.setAttribute('data-tooltip-target', '2');

  const spanText = document.createElement('span');
  spanText.classList.add('nav-link-text');
  spanText.innerText = text;

  div.appendChild(span);
  button.appendChild(div);
  button.appendChild(spanText);

  document.querySelector(ui.navMenuArea).prepend(button);

  return {
    element: button,
    get text() {
      return spanText.innerText;
    },
    set text(value) {
      spanText.innerText = value;
      button.setAttribute('aria-label', value);
    },
    get icon() {
      return iconClass;
    },
    set icon(value) {
      span.classList.remove(iconClass);
      iconClass = value;
      span.classList.add(iconClass);
    },
  };
}

function createToolbarMenuItem(text) {
  const toolbarArea = document.querySelector(ui.toolbarMenuAreaRight);

  if (!toolbarArea) {
    return;
  }

  // should mimic one of the real buttons, example from the settings button:
  // <div class="toolbar-action-wrapper">
  //   <a aria-label="Innstillinger" class="toolbar-action settings" data-toolbar-new-settings="" href="https://www.chess.com/settings" data-log-home-action-to-amplitude="" data-name="Home Button Clicked" data-page="home" data-section="toolbar" data-button="settings">
  //     <span class="icon-font-chess circle-gearwheel toolbar-action-icon"></span>
  //   </a>

  //   <div data-popover-settings="" class="popover-wrapper popover-settings-wrapper is-ready" data-v-app=""><div class="popover-settings-component" data-popover-settings-component=""><div class="popover-settings-chevron popover-settings-settings-chevron"></div> <div class="popover-settings-header"><a class="v5-header-link popover-settings-header-link" href="/settings"><span class="v5-header-name popover-settings-header-name">Innstillinger</span> <span class="icon-font-chess v5-header-chevron chevron-right popover-settings-header-icon"></span></a></div> <div class="popover-settings-content"><a class="popover-settings-item" href="/settings"><span class="icon-font-chess popover-settings-icon user"></span> <span class="popover-settings-title">Profil</span></a> <a class="popover-settings-item" href="/settings/board"><span class="icon-font-chess chess-board popover-settings-icon"></span> <span class="popover-settings-title">Brett og brikker</span></a> <a class="popover-settings-item" href="/settings/themes"><span class="icon-font-chess square-brush popover-settings-icon"></span> <span class="popover-settings-title">Temaer</span></a> <a class="popover-settings-item" href="/settings/live"><span class="icon-font-chess circle-timer popover-settings-icon"></span> <span class="popover-settings-title">Livesjakk</span></a> <a class="popover-settings-item" href="/settings/daily"><span class="icon-font-chess daily popover-settings-icon"></span> <span class="popover-settings-title">Daglig sjakk</span></a> <a class="popover-settings-item" href="/settings/home"><span class="icon-font-chess custom-home popover-settings-icon"></span> <span class="popover-settings-title">Hjemmesidens innstillinger</span></a> <a class="popover-settings-item"><span class="icon-font-chess popover-settings-icon exit"></span> <span class="popover-settings-title">Logg ut</span></a></div></div></div>
  // </div>

  const div = document.createElement('div');
  div.classList.add('toolbar-action-wrapper');

  const a = document.createElement('a');
  a.setAttribute('aria-label', text);
  a.classList.add('toolbar-action', 'anon-mode');
  a.setAttribute('data-toolbar-anon-mode', '');
  a.href = 'javascript:void(0)';
  a.setAttribute('data-log-home-action-to-amplitude', '');
  a.setAttribute('data-name', 'Anon Mode Button Clicked');
  a.setAttribute('data-page', 'anon-mode');
  a.setAttribute('data-section', 'toolbar');
  a.setAttribute('data-button', 'anon-mode');

  let iconClass = 'eye';

  const span = document.createElement('span');
  span.classList.add('icon-font-chess', iconClass, 'toolbar-action-icon');

  a.appendChild(span);
  div.appendChild(a);

  toolbarArea.prepend(div);

  return {
    element: div,
    get text() {
      return a.getAttribute('aria-label');
    },
    set text(value) {
      a.setAttribute('aria-label', value);
    },
    get icon() {
      return iconClass;
    },
    set icon(value) {
      span.classList.remove(iconClass);
      iconClass = value;
      span.classList.add(iconClass);
    },
  };
}

let isNamesHidden = localStorage.getItem('anon-mode') === 'true';

function inject() {
  if (document.getElementById('anon-mode-style')) {
    return;
  }

  createStyleElement();

  const navMenuItem = createNavMenuItem();
  const toolbarMenuItem = createToolbarMenuItem();

  const elements = [navMenuItem];

  if (toolbarMenuItem) {
    elements.push(toolbarMenuItem);
  }

  updateState(elements);

  const toggleFunc = () => {
    toggleVisibility(elements);
  };

  navMenuItem.element.addEventListener('click', toggleFunc);
  toolbarMenuItem?.element.addEventListener('click', toggleFunc);
}

/**
 * @param {{text: string, icon: string}[]} uiElements
 */
function toggleVisibility(uiElements) {
  isNamesHidden = !isNamesHidden;
  localStorage.setItem('anon-mode', isNamesHidden ? 'true' : 'false');
  updateState(uiElements);
}

function updateState(uiElements) {
  if (isNamesHidden) {
    document.body.classList.add(anonClass);
  } else {
    document.body.classList.remove(anonClass);
  }

  for (const uiElement of uiElements) {
    uiElement.text = isNamesHidden
      ? getMessage('turnAnonOff')
      : getMessage('turnAnonOn');
    uiElement.icon = isNamesHidden ? 'eye-off' : 'eye';
  }
}

inject();
