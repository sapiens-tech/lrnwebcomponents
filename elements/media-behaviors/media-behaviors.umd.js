!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(exports):"function"==typeof define&&define.amd?define(["exports"],o):o((e=e||self).MediaBehaviors={})}(this,function(e){"use strict";function o(e,o){for(var i=0;i<o.length;i++){var t=o[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function t(e,o){return(t=Object.setPrototypeOf||function(e,o){return e.__proto__=o,e})(e,o)}function n(e,o){return!o||"object"!=typeof o&&"function"!=typeof o?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):o}window.MediaBehaviors=window.MediaBehaviors||{},window.MediaBehaviors.Video={_sourceIsIframe:function(e){return"local"!=this.getVideoType(e)},cleanVideoSource:function(e,o){if("local"!=o){var i=e.split("?"),t="";if(e=i[0],2==i.length){var n=i[1].split("&"),r=n[0].split("="),u=Array.isArray(n.shift())?n.shift().join(""):n.shift();if("v"==r[0]){var f=void 0!==u&&""!==u?"?"+u:"";t=r[1]+f}}if(-1==e.indexOf("player.vimeo.com")&&-1!=e.indexOf("vimeo.com"))return-1!=e.indexOf("/videos/")&&(e=e.replace("/videos/","/")),e.replace("vimeo.com/","player.vimeo.com/video/");if(-1!=e.indexOf("youtube.com/watch"))return e.replace("youtube.com/watch","youtube.com/embed/")+t;if(-1!=e.indexOf("youtube-no-cookie.com/embed"))return e.replace("youtube-no-cookie.com/embed","youtube.com/embed/")+t;if(-1!=e.indexOf("youtu.be"))return e.replace("youtu.be/","www.youtube.com/embed/")+t;if(-1!=e.indexOf("sketchfab.com")&&-1==e.indexOf("/embed"))return e+"/embed";if(-1!=e.indexOf("dailymotion.com")&&-1==e.indexOf("/embed"))return e.replace("/video/","/embed/video/")}return e},getVideoType:function(e){var o=["aac","flac","mov","mp3","mp4","oga","ogg","ogv","wav","webm"],i=!1;if(-1!=e.indexOf("vimeo"))return"vimeo";if(-1!=e.indexOf("youtube")||-1!=e.indexOf("youtu.be"))return"youtube";if(-1!=e.indexOf("sketchfab.com"))return"sketchfab";if(-1!=e.indexOf("dailymotion.com"))return"dailymotion";for(var t=0;t<o.length;t++)!i&&e.toLowerCase().indexOf("."+o[t])>-1&&(i=!0);return i?"local":"external"}};e.MediaBehaviorsVideo=function(e){return function(r){function u(){return function(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}(this,u),n(this,i(u).apply(this,arguments))}var f,c,a;return function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(o&&o.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),o&&t(e,o)}(u,e),f=u,(c=[{key:"_sourceIsIframe",value:function(e){return"local"!=this.getVideoType(e)}},{key:"cleanVideoSource",value:function(e,o){if("local"!=o){var i=e.split("?"),t="";if(e=i[0],2==i.length){var n=i[1].split("&"),r=n[0].split("="),u=Array.isArray(n.shift())?n.shift().join(""):n.shift();if("v"==r[0]){var f=void 0!==u&&""!==u?"?"+u:"";t=r[1]+f}}if(-1==e.indexOf("player.vimeo.com")&&-1!=e.indexOf("vimeo.com"))return-1!=e.indexOf("/videos/")&&(e=e.replace("/videos/","/")),e.replace("vimeo.com/","player.vimeo.com/video/");if(-1!=e.indexOf("youtube.com/watch"))return e.replace("youtube.com/watch","youtube.com/embed/")+t;if(-1!=e.indexOf("youtube-no-cookie.com/embed"))return e.replace("youtube-no-cookie.com/embed","youtube.com/embed/")+t;if(-1!=e.indexOf("youtu.be"))return e.replace("youtu.be/","www.youtube.com/embed/")+t;if(-1!=e.indexOf("sketchfab.com")&&-1==e.indexOf("/embed"))return e+"/embed";if(-1!=e.indexOf("dailymotion.com")&&-1==e.indexOf("/embed"))return e.replace("/video/","/embed/video/")}return e}},{key:"getVideoType",value:function(e){var o=["aac","flac","mov","mp3","mp4","oga","ogg","ogv","wav","webm"],i=!1;if(-1!=e.indexOf("vimeo"))return"vimeo";if(-1!=e.indexOf("youtube")||-1!=e.indexOf("youtu.be"))return"youtube";if(-1!=e.indexOf("sketchfab.com"))return"sketchfab";if(-1!=e.indexOf("dailymotion.com"))return"dailymotion";for(var t=0;t<o.length;t++)!i&&e.toLowerCase().indexOf("."+o[t])>-1&&(i=!0);return i?"local":"external"}}])&&o(f.prototype,c),a&&o(f,a),u}()},Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=media-behaviors.umd.js.map
