!function(){var t={body:document.body,startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")},n=function(n,o){t.startBtn.disabled=o,t.stopBtn.disabled=n},o=null;t.startBtn.addEventListener("click",(function(){n(!1,!0),o=setInterval((function(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),t.stopBtn.addEventListener("click",(function(){clearInterval(o),n(!0,!1)}))}();
//# sourceMappingURL=01-color-switcher.76bbab1b.js.map
