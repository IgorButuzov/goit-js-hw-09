const t={bodyColor:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};t.startBtn.addEventListener("click",(function(){e=setInterval((()=>{t.bodyColor.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.startBtn.setAttribute("disabled","true")})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.startBtn.removeAttribute("disabled","true")}));let e=null;
//# sourceMappingURL=01-color-switcher.8aa3021d.js.map