'use strict';

import { createElement } from './assets/modules/state_of_the_elements.js';
import { addElement } from './assets/modules/state_of_the_elements.js';
import { addClass } from './assets/modules/changing_classes.js';

import { toggleClass, removeClass } from './assets/modules/changing_classes.js';

const modal = document.querySelector('.modal');

function endGame() {
  toggleClass(modal, 'show');
}

function resetField() {
  cells.forEach(cell => {
    removeClass(cell, 'filled');
    removeClass(cell, 'crossed');
  });
}

const buttonModal = document.querySelector('.modal__button');

function returnToGame() {
  buttonModal.addEventListener('click', () => {
    removeClass(modal, 'show');
    resetField();
  });
}

const modalSound = document.querySelector('.modal__sound');
const cluesInRows = document.querySelectorAll('.clues_left > .game__clue');
const cluesInCols = document.querySelectorAll('.clues_top > .game__clue');

/* a function that checks the solution of the game is correct or not */
function checkSolution() {

  /* get an array of left clues */
  const rowClues = Array.from(
    cluesInRows,
    clue => clue.textContent.split(' ')
  );

  /* get an array of top clues */
  const colClues = Array.from(
    cluesInCols,
    clue => clue.textContent.split(' ')
  );

  /* the number of rows in the game field */
  const numRows = rowClues.length;
  /* the number of columns in the game field */
  const numCols = colClues.length;
  
  /* сreate an empty array to store the filling of the cells of the playing field */
  const grid = [];

  for (let i = 0; i < numRows; i += 1) {
    grid[i] = [];

    for (let j = 0; j < numCols; j += 1) {
      /* find the appropriate cell of the playing field */
      const cell = document.querySelector(
        `.game__sectoring > .game__cell:nth-child(
          ${(i * numCols) + j + 1}
        )`
        /* .game__cell:nth-child(${(i * numCols) + j + 1}) is a selector 
        that points to a cell of the playing field with a certain index 
        ${(i * numCols) + j + 1} in the element .game__sectoring. 
        The index is calculated using variables i and j, which represent 
        the current row and column indexes in the loop. */

        /* In JavaScript, indexes start at 0 (zero index), and in CSS, 
        indexes start at 1 (the first element has an index of 1). 
        Therefore, to align the indexes in the JavaScript code with the 
        indexes used in CSS, just add a unit -> (i *numCols) + j + 1. */
      );

      /* check whether the cell is filled or it is empty */
      const isFilled = cell.classList.contains('filled');
      
      /* clues for rows: [2, 1, 3]
         clues for columns: [1, 2, 1]

         field size: 3x3

         x x x         1 2 1
         x x o   ->    2 1 3
         x o x         1 2 1 
      */

      /* fill the array with the values 'x' or 'o', depending on the state of the cell */
      grid[i][j] = isFilled ? 'x' : 'o';
    }
  }
  
  /* check the filling of the cells in accordance with the clues for the rows */
  for (let i = 0; i < numRows; i += 1) {

    /* get the current row of the playing field */
    const row = grid[i];
    /* get the clue for the current row */
    const clues = rowClues[i];

    /* index of the current clue */
    let clueIndex = 0;
    /* the count of filled cells in the current block */
    let count = 0;
  
    for (let j = 0; j < row.length; j += 1) {
      /* if the cell is filled */
      if (row[j] === 'x') {
        count += 1;

      /* if the block is over */
      } else if (count > 0) {
        /* check the count of filled cells matches the clues */
        if (clues[clueIndex] !== '' + count) {
          /* return from the function if no match is found */
          return;
        }

        /* reset the counter */
        count = 0;
        /* move forward to the next clue */
        clueIndex += 1;
      }
    }
  
    /* check the last block of cells after the end of the row */
    if (count > 0 && clues[clueIndex] !== '' + count) {
      return;
    }
  
    /* check that all the row clues are used */
    if (clueIndex < clues.length - 1) {
      return;
    }
  }
  
  /* check the filling of the cells in accordance with the 
  prompts for the columns (similar to rows) */
  for (let j = 0; j < numCols; j += 1) {
    const col = [];

    for (let i = 0; i < numRows; i += 1) {
      col.push(grid[i][j]);
    }

    const clues = colClues[j];
  
    let clueIndex = 0;
    let count = 0;
  
    for (let i = 0; i < col.length; i += 1) {
      if (col[i] === 'x') {
        count += 1;
      } else if (count > 0) {
        if (clues[clueIndex] !== '' + count) {
          return;
        }

        count = 0;
        clueIndex += 1;
      }
    }
  
    if (count > 0 && clues[clueIndex] !== '' + count) {
      return;
    }
  
    if (clueIndex < clues.length - 1) {
      return;
    }
  }
  
  // if user have reached this point, then the solution is correct
  // alert('Great! You have solved the nonogram!');
  modalSound.play();
  endGame();
  returnToGame();
}

const cells = document.querySelectorAll('.game__cell');
const soundFilled = document.querySelector('.sound_filled');
const soundCrossed = document.querySelector('.sound_crossed');
const soundEmpty = document.querySelector('.sound_empty');
const buttonReset = document.querySelector('.game__button');

function addCellListener(element, event, classContains, classToggle, soundPlay) {
  element.addEventListener(event, evt => {
    if (element.classList.contains(classContains)) {
      removeClass(element, classContains);
    }

    evt.preventDefault();

    toggleClass(element, classToggle);

    if (element.classList.contains(classToggle)) {
      soundPlay.play();
    } else {
      soundEmpty.play();
    }

    checkSolution();
  });
}

cells.forEach(cell => {
  addCellListener(cell, 'click', 'crossed', 'filled', soundFilled);
  addCellListener(cell, 'contextmenu', 'filled', 'crossed', soundCrossed);
});

buttonReset.addEventListener('click', () => {
  resetField();
});
  