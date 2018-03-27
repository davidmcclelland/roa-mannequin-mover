// ==UserScript==
// @name           Relics of Avabur Mannequin Mover
// @namespace      https://github.com/davidmcclelland/
// @author         Dave McClelland <davidmcclelland@gmail.com>
// @homepage       https://github.com/davidmcclelland/roa-mannequin-mover
// @supportURL     https://github.com/davidmcclelland/roa-mannequin-mover/issues
// @downloadURL    https://github.com/davidmcclelland/roa-mannequin-mover/raw/master/roa-mannequin-mover.user.js
// @description    Moves the mannequin to a more convenient location
// @match          https://*.avabur.com/game*
// @version        0.0.1
// @run-at         document-end
// @connect        githubusercontent.com
// @connect        github.com
// @connect        self
// @grant          GM_addStyle
// @license        LGPL-2.1
// @noframes
// ==/UserScript==

(function($) {
	'use strict';

	const surroundingDiv = $('<div id="roa-mm-wrapper" style="text-align: center; margin-top: 10px;"></div>');
	const mannequinInfo = $('#mannequinInfo');

	$('#rightWrapper').append(surroundingDiv);
	surroundingDiv.append(mannequinInfo);
	mannequinInfo.css('display', 'inline-block');

})(jQuery);