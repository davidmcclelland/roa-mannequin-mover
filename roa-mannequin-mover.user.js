// ==UserScript==
// @name           Relics of Avabur Mannequin Mover
// @namespace      https://github.com/davidmcclelland/
// @author         Dave McClelland <davidmcclelland@gmail.com>
// @homepage       https://github.com/davidmcclelland/roa-mannequin-mover
// @supportURL     https://github.com/davidmcclelland/roa-mannequin-mover/issues
// @downloadURL    https://github.com/davidmcclelland/roa-mannequin-mover/raw/master/roa-mannequin-mover.user.js
// @description    Moves the mannequin to a more convenient location
// @match          https://*.avabur.com/game*
// @version        0.0.3
// @run-at         document-end
// @connect        githubusercontent.com
// @connect        github.com
// @connect        self
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

	function versionCompare(v1, v2) {
        var regex   = new RegExp("(\.0+)+");
        v1      = v1.replace(regex, "").split(".");
        v2      = v2.replace(regex, "").split(".");
        var min     = Math.min(v1.length, v2.length);

        var diff = 0;
        for (var i = 0; i < min; i++) {
            diff = parseInt(v1[i], 10) - parseInt(v2[i], 10);
            if (diff !== 0) {
                return diff;
            }
        }

        return v1.length - v2.length;
	}

	function checkForUpdate() {
	    var version = "";
	    $.get(INTERNAL_UPDATE_URL).done(function(res){
	        var match = atob(res.content).match(/\/\/\s+@version\s+([^\n]+)/);
	        version = match[1];

	        if (versionCompare(GM_info.script.version, version) < 0) {
	            var message = "<li class=\"chat_notification\">RoA Mannequin Mover has been updated to version "+version+"! <a href=\"https://github.com/davidmcclelland/roa-mannequin-mover/raw/master/roa-mannequin-mover.user.js\" target=\"_blank\">Update</a> | <a href=\"https://github.com/davidmcclelland/roa-mannequin-mover/commits/master\" target=\"_blank\">Changelog</a></li>";
	            // TODO: Handle chat direction like ToA does
	            $("#chatMessageList").prepend(message);
	        } else {
	            checkForUpdateTimer = setTimeout(checkForUpdate, 24*60*60*1000);
	        }
	    });
	}

	moveElements();
	checkForUpdateTimer = setTimeout(checkForUpdate, 10000);
})(jQuery);