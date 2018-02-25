!function(t){"use strict";function e(t,e){this._show=this.show.bind(this),this._hide=this.hide.bind(this),this._maintainFocus=this._maintainFocus.bind(this),this._bindKeypress=this._bindKeypress.bind(this),this.node=t,this._listeners={},this.create(e)}function i(t){return Array.prototype.slice.call(t)}function n(t,e){return i((e||document).querySelectorAll(t))}function s(t){return NodeList.prototype.isPrototypeOf(t)?i(t):Element.prototype.isPrototypeOf(t)?[t]:"string"==typeof t?n(t):void 0}function o(t){var e=r(t);e.length&&e[0].focus()}function r(t){return n(u.join(","),t).filter(function(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)})}function h(t,e){var i=r(t),n=i.indexOf(document.activeElement);e.shiftKey&&0===n?(i[i.length-1].focus(),e.preventDefault()):e.shiftKey||n!==i.length-1||(i[0].focus(),e.preventDefault())}function d(t){var e=i(t.parentNode.childNodes),n=e.filter(function(t){return 1===t.nodeType});return n.splice(n.indexOf(t),1),n}var a,u=["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],c=9,f=27;e.prototype.create=function(t){return this._targets=this._targets||s(t)||d(this.node),this.node.setAttribute("aria-hidden",!0),this.shown=!1,this._openers=n('[data-a11y-dialog-show="'+this.node.id+'"]'),this._openers.forEach(function(t){t.addEventListener("click",this._show)}.bind(this)),this._closers=n("[data-a11y-dialog-hide]",this.node).concat(n('[data-a11y-dialog-hide="'+this.node.id+'"]')),this._closers.forEach(function(t){t.addEventListener("click",this._hide)}.bind(this)),this._fire("create"),this},e.prototype.show=function(t){return this.shown?this:(this.shown=!0,this.node.removeAttribute("aria-hidden"),this._targets.forEach(function(t){var e=t.getAttribute("aria-hidden");e&&t.setAttribute("data-a11y-dialog-original",e),t.setAttribute("aria-hidden","true")}),a=document.activeElement,o(this.node),document.body.addEventListener("focus",this._maintainFocus,!0),document.addEventListener("keydown",this._bindKeypress),this._fire("show",t),this)},e.prototype.hide=function(t){return this.shown?(this.shown=!1,this.node.setAttribute("aria-hidden","true"),this._targets.forEach(function(t){var e=t.getAttribute("data-a11y-dialog-original");e?(t.setAttribute("aria-hidden",e),t.removeAttribute("data-a11y-dialog-original")):t.removeAttribute("aria-hidden")}),a&&a.focus(),document.body.removeEventListener("focus",this._maintainFocus,!0),document.removeEventListener("keydown",this._bindKeypress),this._fire("hide",t),this):this},e.prototype.destroy=function(){return this.hide(),this._openers.forEach(function(t){t.removeEventListener("click",this._show)}.bind(this)),this._closers.forEach(function(t){t.removeEventListener("click",this._hide)}.bind(this)),this._fire("destroy"),this._listeners={},this},e.prototype.on=function(t,e){return"undefined"==typeof this._listeners[t]&&(this._listeners[t]=[]),this._listeners[t].push(e),this},e.prototype.off=function(t,e){var i=this._listeners[t].indexOf(e);return i>-1&&this._listeners[t].splice(i,1),this},e.prototype._fire=function(t,e){var i=this._listeners[t]||[];i.forEach(function(t){t(this.node,e)}.bind(this))},e.prototype._bindKeypress=function(t){this.shown&&t.which===f&&(t.preventDefault(),this.hide()),this.shown&&t.which===c&&h(this.node,t)},e.prototype._maintainFocus=function(t){this.shown&&!this.node.contains(t.target)&&o(this.node)},"undefined"!=typeof module&&"undefined"!=typeof module.exports?module.exports=e:"function"==typeof define&&define.amd?define("A11yDialog",[],function(){return e}):"object"==typeof t&&(t.A11yDialog=e)}("undefined"!=typeof global?global:window);
