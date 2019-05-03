import{HAXWiring}from"./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js";// forked from https://github.com/janmarthedal/math-tex
const document=window.document,states={start:1,loading:2,ready:3,typesetting:4,error:5};let mathjaxHub,typesets=[],state=states.start,styleNode,src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js";function getStyleNode(){const styleNodes=document.querySelectorAll("style"),sn=Array.prototype.filter.call(styleNodes,function(n){return n.sheet&&100<n.sheet.cssRules.length&&".mjx-chtml"===n.sheet.cssRules[0].selectorText});styleNode=sn[0]}// precondition: state === states.ready
function flush_typesets(){if(!typesets.length)return;const jaxs=[],items=[];typesets.forEach(function(item){const script=document.createElement("script"),div=document.createElement("div");script.type=item[1]?"math/tex; mode=display":"math/tex";script.text=item[0];div.style.position="fixed";div.style.top=0;div.style.left="99999px";div.appendChild(script);document.body.appendChild(div);jaxs.push(script);items.push([div,item[2]])});typesets=[];state=states.typesetting;mathjaxHub.Queue(["Typeset",mathjaxHub,jaxs]);mathjaxHub.Queue(function(){if(!styleNode)getStyleNode();items.forEach(function(item){const div=item[0],result="SPAN"===div.firstElementChild.tagName?div.firstElementChild:null;item[1](result,styleNode);document.body.removeChild(div)});state=states.ready;flush_typesets()})}function load_library(){state=states.loading;window.MathJax={skipStartupTypeset:!0,showMathMenu:!1,jax:["input/TeX","output/CommonHTML"],TeX:{extensions:["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]},AuthorInit(){mathjaxHub=window.MathJax.Hub;mathjaxHub.Register.StartupHook("End",function(){state=states.ready;flush_typesets()})}};var script=document.createElement("script");script.type="text/javascript";script.src=src;script.async=!0;script.onerror=function(){console.warn("Error loading MathJax library "+src);state=states.error;typesets=[]};document.head.appendChild(script)}class MathTexController extends HTMLElement{connectedCallback(){if(this.hasAttribute("src"))src=this.getAttribute("src");if(!this.hasAttribute("lazy"))load_library()}typeset(math,displayMode,cb){if(state===states.error)return;typesets.push([math,displayMode,cb]);if(state===states.start)load_library();else if(state===states.ready)flush_typesets()}}export{MathTexController};window.customElements.define("math-tex-controller",MathTexController);/*
Typesets math written in (La)TeX, using [MathJax](http://mathjax.org).
##### Example
    <math-tex>c = \sqrt{a^2 + b^2}</math-tex>
##### Example
    <math-tex mode="display">\sum_{k=1}^n k = \frac{n (n + 1)}{2}</math-tex>
@element math-tex
@version 0.3.2
@homepage http://github.com/janmarthedal/math-tex/
*/const TAG_NAME="lrn-math",CONTROLLER_TAG_NAME="math-tex-controller",mutation_config={childList:!0,characterData:!0,attributes:!0,subtree:!0};let handler;function check_handler(){if(handler)return;handler=document.querySelector(CONTROLLER_TAG_NAME)||document.createElement(CONTROLLER_TAG_NAME);if(!handler||"function"!==typeof handler.typeset){console.warn("no %s element defined; %s element will not work",CONTROLLER_TAG_NAME,TAG_NAME);handler=void 0}else if(!document.contains(handler))document.head.appendChild(handler)}function update(elem){const sdom=elem.shadowRoot,math=elem.textContent.trim(),isBlock="display"===elem.getAttribute("mode"),check=(isBlock?"D":"I")+math;if(check!==elem._private.check){while(sdom.firstChild)sdom.removeChild(sdom.firstChild);elem._private.check=check;if(math.length){handler.typeset(math,isBlock,function(melem,styleNode){sdom.appendChild(styleNode.cloneNode(!0));sdom.appendChild(melem)})}}}class MathTex extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"});check_handler()}connectedCallback(){const elem=this;window.requestAnimationFrame(function(){elem._private={check:"",observer:new MutationObserver(function(){update(elem)})};update(elem);elem._private.observer.observe(elem,mutation_config)});// Establish hax properties if they exist
let props={canScale:!0,canPosition:!0,canEditSource:!0,gizmo:{title:"Math",description:"Present math in a nice looking way.",icon:"places:all-inclusive",color:"grey",groups:["Content"],handles:[{type:"math",math:"mathText"},{type:"inline",text:"mathText"}],meta:{author:"LRNWebComponents"}},settings:{quick:[],configure:[{slot:"",title:"Math",description:"Math",inputMethod:"code-editor",icon:"editor:format-quote"}],advanced:[]}},wiring=new HAXWiring;wiring.setup(props,"lrn-math",this)}disconnectedCallback(){if(this._private){this._private.observer.disconnect();delete this._private}}}window.customElements.define("lrn-math",MathTex);