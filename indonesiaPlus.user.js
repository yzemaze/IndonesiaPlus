// ==UserScript==
// @name        IndonesiaPlus
// @description change Indonesia map and player colors on SlothNinja.com
// @license     GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// @homepageURL https://github.com/yzemaze/IndonesiaPlus
// @supportURL  https://github.com/yzemaze/IndonesiaPlus/issues
// @downloadURL https://github.com/yzemaze/IndonesiaPlus/raw/master/indonesiaPlus.user.js
// @updateURL   https://github.com/yzemaze/IndonesiaPlus/raw/master/indonesiaPlus.user.js
// @namespace   https://github.com/yzemaze/IndonesiaPlus
// @match       https://www.slothninja.com/indonesia/game/show/*
// @grant       GM_addStyle
// @version     3.3
// @author      yzemaze
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @run-at      document-idle
// ==/UserScript==
"use strict";

GM_addStyle ( `
  :root {
  /* color variables – change #...... to colors you like */
    /* map background */
    --mapBg: #93bcc4; /* blue */
    /* player colors */
    --black: #555555;
    --green: #02be02;
    --orange: #ff7f00;
    --purple: #c800c8;
    --white: #fff;
    /* city colors */
    --level1: #02be02; /* green */
    --level2: #ffff00; /* yellow */
    --level3: #b40000; /* red - #0033dd blue */
  /* stop here if you don’t know what you’re doing ;) */
  }

  /* map background color */
  img.mapster_el.clickmap {
    background-color: var(--mapBg);
  }

  /* players */
  .black-border,
  #board[data-zoom="zoom-all"] img.ship.black-border,
  #board[data-zoom="zoom-all"] img.goods.black-border,
  body.indonesia #lower-content .left-column #gamelog .content .gamelog-entry.black,
  body.indonesia #lower-content .right-column #chatbox .content .messagelog-entry.black {
    border-color: var(--black);
  }
  .green-border,
  #board[data-zoom="zoom-all"] img.ship.green-border,
  #board[data-zoom="zoom-all"] img.goods.green-border,
  body.indonesia #lower-content .left-column #gamelog .content .gamelog-entry.green,
  body.indonesia #lower-content .right-column #chatbox .content .messagelog-entry.green {
    border-color: var(--green);
  }
  .orange-border,
  #board[data-zoom="zoom-all"] img.ship.orange-border,
  #board[data-zoom="zoom-all"] img.goods.orange-border,
  body.indonesia #lower-content .left-column #gamelog .content .gamelog-entry.orange,
  body.indonesia #lower-content .right-column #chatbox .content .messagelog-entry.orange {
    border-color: var(--orange);
  }
  .purple-border,
  #board[data-zoom="zoom-all"] img.ship.purple-border,
  #board[data-zoom="zoom-all"] img.goods.purple-border,
  body.indonesia #lower-content .left-column #gamelog .content .gamelog-entry.purple,
  body.indonesia #lower-content .right-column #chatbox .content .messagelog-entry.purple {
    border-color: var(--purple);
  }
  .white-border,
  #board[data-zoom="zoom-all"] img.ship.white-border,
  #board[data-zoom="zoom-all"] img.goods.white-border,
  body.indonesia #lower-content .left-column #gamelog .content .gamelog-entry.white,
  body.indonesia #lower-content .right-column #chatbox .content .messagelog-entry.white {
    border-color: var(--white);
  }

  /* turn order, hull player dialog */
  #board #turn-track img, .icon img {
    border: 2px solid #000000;
    border-radius: 50%;
    box-shadow: 1px 2px black;
    height: 20px;
    width: 20px;
  }
  /* r&d table */
  #board #tech-track img:not(.ship) {
    border: 1px solid #000000;
    border-radius: 50%;
    box-shadow: 1px 2px black;
    height: 10px;
    width: 10px;
  }
  /* turn order, r&d table, hull player dialog */
  img[pColor="black"] {
    background-color: var(--black);
  }
  img[pColor="green"] {
    background-color: var(--green);
  }
  img[pColor="orange"] {
    background-color: var(--orange);
  }
  img[pColor="purple"] {
    background-color: var(--purple);
  }
  img[pColor="white"] {
    background-color: var(--white);
  }

  /* cities */
  #board img.city, #city-stones img {
    border: 2px solid #000000;
    border-radius: 50%;
    box-shadow: 1px 2px black;
    height: 16px;
    width: 12px;
  }
  #city-stones img {
    margin-left: 0.3em;
  }
  img[level="1"] {
    background-color: var(--level1);
  }
  img[level="2"] {
    background-color: var(--level2);
  }
  img[level="3"] {
    background-color: var(--level3);
  }

` );

// map source
waitForKeyElements(".mapster_el.clickmap", changeMap);
function changeMap() {
  const map = document.querySelector(".mapster_el.clickmap");
  map.src = "https://github.com/yzemaze/IndonesiaPlus/raw/master/img/indonesia_map_slothNinja_tiny.png";
};

// replace turn order, r&d and city tokens
const transparent = "https://github.com/yzemaze/IndonesiaPlus/raw/master/img/transparent.png";
// turn order + r&d table
const pColors = ["black", "white", "green", "purple", "orange"];
var pImgs = [];
// fill array with img paths
for (let i=0; i < pColors.length; i++) {
  pImgs[i] = '/images/indonesia/' + pColors[i] + '-disc.png';
};
// cities
const cColors = ["green", "yellow", "red"];
var cImgs = [];
// fill array with img paths
for (let i=0; i < cColors.length; i++) {
  cImgs[i] = '/images/indonesia/' + cColors[i] + '-oval.png';
};

$(document).ready(function() {
  function replaceImgs(){
    // turn order + r&d table
    for (let i=0; i < pColors.length; i++) {
      // add attribute to address img with CSS
      $('img[src="' + pImgs[i] + '"]').attr('pColor', pColors[i]);
      // replace img with transparent img to let CSS do the magic
      $('img[src="' + pImgs[i] + '"]').attr('src', transparent);
    };
    // cities
    for (let i=0; i < cColors.length; i++) {
      // add attribute to address img with CSS
      $('img[src="' + cImgs[i] + '"]').attr('level', i+1);
      // replace img with transparent img to let CSS do the magic
      $('img[src="' + cImgs[i] + '"]').attr('src', transparent);
    };
  }
  // replace imgs after each (partial) move (dom-tree modification)
  const observer = new MutationObserver(replaceImgs);
  const targetNode = document.getElementById('container');
  const config = {attributes: true, childList: true, subtree: true};
  observer.observe(targetNode, config);
});