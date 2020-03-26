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
// @version     2.1
// @author      yzemaze
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @run-at      document-idle
// ==/UserScript==
"use strict";

// map background color
GM_addStyle ( `
  img.mapster_el.clickmap {
    background-color: #93bcc4; /* blue */
    /*background-color: #d2bfae;*/ /* sand */
  }
` );

// player colors to match r&d table
GM_addStyle ( `
  :root {
    /* player colors */
    --black: #000000;
    --green: #02be02;
    --orange: #ff7f00;
    --purple: #c800c8;
    --white: #ffffff;
    /* city colors */
    --level1: #02be02; /* green */
    --level2: #ffff00; /* yellow */
    --level3: #b40000; /* red */
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

  /* turn order + r&d table */
  #board #turn-track img {
    border: 2px solid #000000;
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }
  #board #tech-track img:not(.ship) {
    border: 2px solid #000000;
    border-radius: 50%;
    height: 10px;
    width: 10px;
  }
  
  #board img[pcol="black"] {
    background-color: var(--black);
  }
  #board img[pcol="green"] {
    background-color: var(--green);
  }
  #board img[pcol="orange"] {
    background-color: var(--orange);
  }
  #board img[pcol="purple"] {
    background-color: var(--purple);
  }
  #board img[pcol="white"] {
    background-color: var(--white);
  }

  /* cities */
  #board img.city, #city-stones img {
    border: 2px solid #000000;
    border-radius: 50%;
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

// map resource
waitForKeyElements(".mapster_el.clickmap", changeMap);
function changeMap() {
  var map = document.querySelector(".mapster_el.clickmap");
  map.src = "https://github.com/yzemaze/IndonesiaPlus/raw/master/img/indonesia_map_slothNinja_tiny.png";
};

// replace cities and turn order / r&d tokens
var transparent = "https://github.com/yzemaze/IndonesiaPlus/raw/master/img/transparent.png";

// turn order + r&d table
var blackDisc = "/images/indonesia/black-disc.png";
var whiteDisc = "/images/indonesia/white-disc.png";
var greenDisc = "/images/indonesia/green-disc.png";
var purpleDisc = "/images/indonesia/purple-disc.png";
var orangeDisc = "/images/indonesia/orange-disc.png";
$('img[src="' + blackDisc + '"]').attr('pcol', 'black');
$('img[src="' + blackDisc + '"]').attr('src', transparent);
$('img[src="' + greenDisc + '"]').attr('pcol', 'green');
$('img[src="' + greenDisc + '"]').attr('src', transparent);
$('img[src="' + orangeDisc + '"]').attr('pcol', 'orange');
$('img[src="' + orangeDisc + '"]').attr('src', transparent);
$('img[src="' + purpleDisc + '"]').attr('pcol', 'purple');
$('img[src="' + purpleDisc + '"]').attr('src', transparent);
$('img[src="' + whiteDisc + '"]').attr('pcol', 'white');
$('img[src="' + whiteDisc + '"]').attr('src', transparent);

// cities
var greenOval = "/images/indonesia/green-oval.png";
var yellowOval = "/images/indonesia/yellow-oval.png";
var redOval = "/images/indonesia/red-oval.png";
$('img[src="' + greenOval + '"]').attr('level', '1');
$('img[src="' + greenOval + '"]').attr('src', transparent);
$('img[src="' + yellowOval + '"]').attr('level', '2');
$('img[src="' + yellowOval + '"]').attr('src', transparent);
$('img[src="' + redOval + '"]').attr('level', '3');
$('img[src="' + redOval + '"]').attr('src', transparent);