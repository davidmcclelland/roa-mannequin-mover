// ==UserScript==
// @name           Relics of Avabur Mannequin Mover
// @namespace      https://github.com/davidmcclelland/
// @author         Dave McClelland <davidmcclelland@gmail.com>
// @homepage       https://github.com/davidmcclelland/roa-mannequin-mover
// @supportURL     https://github.com/davidmcclelland/roa-mannequin-mover/issues
// @downloadURL    https://github.com/davidmcclelland/roa-mannequin-mover/raw/master/roa-mannequin-mover.user.js
// @description    Moves the mannequin to a more convenient location
// @match          https://*.avabur.com/game*
// @version        0.1.0
// @run-at         document-end
// @connect        githubusercontent.com
// @connect        github.com
// @connect        self
// @require        https://cdn.rawgit.com/omichelsen/compare-versions/v3.1.0/index.js
// @license        LGPL-2.1
// @noframes
// ==/UserScript==

(function($) {
	'use strict';

	function moveElements() {
		const surroundingDiv = $('<div id="roa-mm-wrapper" style="text-align: center; margin-top: 10px;"></div>');
		const mannequinInfo = $('#mannequinInfo');

		$('#rightWrapper').append(surroundingDiv);
		surroundingDiv.append(mannequinInfo);
		mannequinInfo.css('display', 'inline-block');
	}

	const INTERNAL_UPDATE_URL = "https://api.github.com/repos/davidmcclelland/roa-mannequin-mover/contents/roa-mannequin-mover.user.js";
	let checkForUpdateTimer = 0;

	function checkForUpdate() {
	    let version = "";
	    $.get(INTERNAL_UPDATE_URL).done(function(res){
	        const match = atob(res.content).match(/\/\/\s+@version\s+([^\n]+)/);
            version = match[1];

	        if (compareVersions(GM_info.script.version, version) < 0) {
	            const message = "<li class=\"chat_notification\">RoA Mannequin Mover has been updated to version "+version+"! <a href=\"https://github.com/davidmcclelland/roa-mannequin-mover/raw/master/roa-mannequin-mover.user.js\" target=\"_blank\">Update</a> | <a href=\"https://github.com/davidmcclelland/roa-mannequin-mover/commits/master\" target=\"_blank\">Changelog</a></li>";
	            // TODO: Handle chat direction like ToA does
	            $("#chatMessageList").prepend(message);
	        } else {
	            checkForUpdateTimer = setTimeout(checkForUpdate, 24*60*60*1000);
	        }
	    });
	}

	const AVAILABLE_LOADOUTS_KEY = 'RoaMMAvailableLoadouts';
	const SELECTED_LOADOUT_KEY = 'RoaMMSelectedLoadout';

	function saveMannequinState() {
		const options = $('#mannequinOptions option');

		let availableLoadouts = $.map(options, function(option) {
			return option.value;
		});

		let selectedLoadout = $('#mannequinOptions').val();

		localStorage.setItem(AVAILABLE_LOADOUTS_KEY, JSON.stringify(availableLoadouts));
		localStorage.setItem(SELECTED_LOADOUT_KEY, selectedLoadout);
	}

	function loadMannequinState() {
		let mannequinOptions = $('#mannequinOptions');
		const options = JSON.parse(localStorage.getItem(AVAILABLE_LOADOUTS_KEY)) || [];
		const selectedLoadout = localStorage.getItem(SELECTED_LOADOUT_KEY);

		$.each(options, function(i, option) {
			mannequinOptions.append($('<option>', {
				value: option,
				text: option
			}));
		});

		if (selectedLoadout) {
			$('#mannequinOptions').val(selectedLoadout);
		}
	}

	loadMannequinState();
	moveElements();
	checkForUpdateTimer = setTimeout(checkForUpdate, 10000);
	$('#mannequinSwap').click(saveMannequinState);
})(jQuery);