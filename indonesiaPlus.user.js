// ==UserScript==
// @name        IndonesiaPlus
// @description	change Indonesia map and player colors on SlothNinja.com
// @license     GPL-3.0-or-later; https://www.gnu.org/licenses/gpl-3.0.txt
// @homepageURL https://github.com/yzemaze/IndonesiaPlus
// @supportURL  https://github.com/yzemaze/IndonesiaPlus/issues
// @downloadURL https://github.com/yzemaze/IndonesiaPlus/raw/master/indonesiaPlus.user.js
// @updateURL   https://github.com/yzemaze/IndonesiaPlus/raw/master/indonesiaPlus.user.js
// @namespace   https://github.com/yzemaze/IndonesiaPlus
// @match       https://www.slothninja.com/indonesia/game/show/*
// @grant       GM_addStyle
// @version     1.6
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

// player colors to fit r&d table
GM_addStyle ( `
  #board img.ship.black-border, #board img.goods.black-border, .black-border, body.indonesia #lower-content .left-column #gamelog .content .gamelog-entry.black, body.indonesia #lower-content .right-column #chatbox .content .messagelog-entry.black {
    border-color: #808080;
  }
  #board img.ship.green-border, #board img.goods.green-border, .green-border, body.indonesia #lower-content .left-column #gamelog .content .gamelog-entry.green, body.indonesia #lower-content .right-column #chatbox .content .messagelog-entry.green {
    border-color: #02be02;
  }
  #board img.ship.orange-border, #board img.goods.orange-border, .orange-border, body.indonesia #lower-content .left-column #gamelog .content .gamelog-entry.orange, body.indonesia #lower-content .right-column #chatbox .content .messagelog-entry.orange {
    border-color: #ff7f00
  }
  #board img.ship.purple-border, #board img.goods.purple-border, .purple-border, body.indonesia #lower-content .left-column #gamelog .content .gamelog-entry.purple, body.indonesia #lower-content .right-column #chatbox .content .messagelog-entry.purple {
    border-color: #c800c8;
  }
  #board img.ship.white-border, #board img.goods.white-border, .white-border, body.indonesia #lower-content .left-column #gamelog .content .gamelog-entry.white, body.indonesia #lower-content .right-column #chatbox .content .messagelog-entry.white {
    border-color: #ffffff;
  }
` );

// map resource
waitForKeyElements(".mapster_el.clickmap", changeMap);
function changeMap() {
  var map = document.querySelector(".mapster_el.clickmap");
  map.src = "https://github.com/yzemaze/IndonesiaPlus/raw/master/indonesia_map_slothNinja.png";
};

// marker of city size 3: replace red ovals by blue (i.e. indigo) ovals
var oldSrc = '/images/indonesia/red-oval.png';
var newSrc = 'https://github.com/tobetobi/IndonesiaPlus/raw/master/indigo-oval.png';
$('img[src="' + oldSrc + '"]').attr('src', newSrc);
