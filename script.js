'use strict';

import { createElement } from './assets/modules/state_of_the_elements.js';
import { addElement } from './assets/modules/state_of_the_elements.js';
import { toggleClass } from './assets/modules/changing_classes.js';
import { removeClass } from './assets/modules/changing_classes.js';
import { addClass } from './assets/modules/changing_classes.js';

const cells = document.querySelectorAll('.game__cell');
const clues = document.querySelectorAll('.game__clue');

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    toggleClass(cell, 'filled');

    if (cell.classList.contains('crossed')) {
        removeClass(cell, 'crossed');
    }
  });
  
  cell.addEventListener('contextmenu', event => {
    event.preventDefault();
    toggleClass(cell, 'crossed');

    if (cell.classList.contains('filled')) {
        removeClass(cell, 'filled');
    }
  });
});
  