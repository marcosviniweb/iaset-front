import{a as m,c as X}from"./chunk-DX4FTDQR.js";import{b as l}from"./chunk-6KEO6D2E.js";import{Fa as Y,J as U,S as V,V as H,Wa as $,Z as a,_ as u,_b as L,a as F,aa as _,cb as G,da as r,db as d,ga as W,i as N,j as P,jc as z,m as K,na as E,ob as q,ra as k,sa as b,va as y,ya as Z}from"./chunk-X3WKPGPN.js";function J(e){return e.buttons===0||e.detail===0}function Q(e){let s=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!s&&s.identifier===-1&&(s.radiusX==null||s.radiusX===1)&&(s.radiusY==null||s.radiusY===1)}var R;function he(){if(R==null){let e=typeof document<"u"?document.head:null;R=!!(e&&(e.createShadowRoot||e.attachShadow))}return R}function ee(e){if(he()){let s=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&s instanceof ShadowRoot)return s}return null}function Be(){let e=typeof document<"u"&&document?document.activeElement:null;for(;e&&e.shadowRoot;){let s=e.shadowRoot.activeElement;if(s===e)break;e=s}return e}function p(e){return e.composedPath?e.composedPath()[0]:e.target}function T(e,s,t,n,i){let o=parseInt(L.major),c=parseInt(L.minor);return o>19||o===19&&c>0||o===0&&c===0?e.listen(s,t,n,i):(s.addEventListener(t,n,i),()=>{s.removeEventListener(t,n,i)})}var v;function fe(){if(v==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>v=!0}))}finally{v=v||!1}return v}function te(e){return fe()?e:!!e.capture}function We(e,s=0){return _e(e)?Number(e):arguments.length===2?s:0}function _e(e){return!isNaN(parseFloat(e))&&!isNaN(Number(e))}function A(e){return e instanceof y?e.nativeElement:e}var me=new _("cdk-input-modality-detector-options"),pe={ignoreKeys:[18,17,224,91,16]},ne=650,S={passive:!0,capture:!0},ge=(()=>{class e{_platform=r(m);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new P(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(n=>n===t.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=p(t))};_onMousedown=t=>{Date.now()-this._lastTouchMs<ne||(this._modality.next(J(t)?"keyboard":"mouse"),this._mostRecentTarget=p(t))};_onTouchstart=t=>{if(Q(t)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=p(t)};constructor(){let t=r(b),n=r(l),i=r(me,{optional:!0});if(this._options=F(F({},pe),i),this.modalityDetected=this._modality.pipe(V(1)),this.modalityChanged=this.modalityDetected.pipe(U()),this._platform.isBrowser){let o=r($).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[T(o,n,"keydown",this._onKeydown,S),T(o,n,"mousedown",this._onMousedown,S),T(o,n,"touchstart",this._onTouchstart,S)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t())}static \u0275fac=function(n){return new(n||e)};static \u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),C=function(e){return e[e.IMMEDIATE=0]="IMMEDIATE",e[e.EVENTUAL=1]="EVENTUAL",e}(C||{}),be=new _("cdk-focus-monitor-default-options"),I=te({passive:!0,capture:!0}),dt=(()=>{class e{_ngZone=r(b);_platform=r(m);_inputModalityDetector=r(ge);_origin=null;_lastFocusOrigin;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=r(l,{optional:!0});_stopInputModalityDetector=new N;constructor(){let t=r(be,{optional:!0});this._detectionMode=t?.detectionMode||C.IMMEDIATE}_rootNodeFocusAndBlurListener=t=>{let n=p(t);for(let i=n;i;i=i.parentElement)t.type==="focus"?this._onFocus(t,i):this._onBlur(t,i)};monitor(t,n=!1){let i=A(t);if(!this._platform.isBrowser||i.nodeType!==1)return K();let o=ee(i)||this._getDocument(),c=this._elementInfo.get(i);if(c)return n&&(c.checkChildren=!0),c.subject;let g={checkChildren:n,subject:new N,rootNode:o};return this._elementInfo.set(i,g),this._registerGlobalListeners(g),g.subject}stopMonitoring(t){let n=A(t),i=this._elementInfo.get(n);i&&(i.subject.complete(),this._setClasses(n),this._elementInfo.delete(n),this._removeGlobalListeners(i))}focusVia(t,n,i){let o=A(t),c=this._getDocument().activeElement;o===c?this._getClosestElementsInfo(o).forEach(([g,le])=>this._originChanged(g,n,le)):(this._setOrigin(n),typeof o.focus=="function"&&o.focus(i))}ngOnDestroy(){this._elementInfo.forEach((t,n)=>this.stopMonitoring(n))}_getDocument(){return this._document||document}_getWindow(){return this._getDocument().defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?"mouse":"program"}_shouldBeAttributedToTouch(t){return this._detectionMode===C.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,n){t.classList.toggle("cdk-focused",!!n),t.classList.toggle("cdk-touch-focused",n==="touch"),t.classList.toggle("cdk-keyboard-focused",n==="keyboard"),t.classList.toggle("cdk-mouse-focused",n==="mouse"),t.classList.toggle("cdk-program-focused",n==="program")}_setOrigin(t,n=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t==="touch"&&n,this._detectionMode===C.IMMEDIATE){clearTimeout(this._originTimeoutId);let i=this._originFromTouchInteraction?ne:1;this._originTimeoutId=setTimeout(()=>this._origin=null,i)}})}_onFocus(t,n){let i=this._elementInfo.get(n),o=p(t);!i||!i.checkChildren&&n!==o||this._originChanged(n,this._getFocusOrigin(o),i)}_onBlur(t,n){let i=this._elementInfo.get(n);!i||i.checkChildren&&t.relatedTarget instanceof Node&&n.contains(t.relatedTarget)||(this._setClasses(n),this._emitOrigin(i,null))}_emitOrigin(t,n){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(n))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let n=t.rootNode,i=this._rootNodeFocusListenerCount.get(n)||0;i||this._ngZone.runOutsideAngular(()=>{n.addEventListener("focus",this._rootNodeFocusAndBlurListener,I),n.addEventListener("blur",this._rootNodeFocusAndBlurListener,I)}),this._rootNodeFocusListenerCount.set(n,i+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(H(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(t){let n=t.rootNode;if(this._rootNodeFocusListenerCount.has(n)){let i=this._rootNodeFocusListenerCount.get(n);i>1?this._rootNodeFocusListenerCount.set(n,i-1):(n.removeEventListener("focus",this._rootNodeFocusAndBlurListener,I),n.removeEventListener("blur",this._rootNodeFocusAndBlurListener,I),this._rootNodeFocusListenerCount.delete(n))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(t,n,i){this._setClasses(t,n),this._emitOrigin(i,n),this._lastFocusOrigin=n}_getClosestElementsInfo(t){let n=[];return this._elementInfo.forEach((i,o)=>{(o===t||i.checkChildren&&o.contains(t))&&n.push([o,i])}),n}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:n,mostRecentModality:i}=this._inputModalityDetector;if(i!=="mouse"||!n||n===t||t.nodeName!=="INPUT"&&t.nodeName!=="TEXTAREA"||t.disabled)return!1;let o=t.labels;if(o){for(let c=0;c<o.length;c++)if(o[c].contains(n))return!0}return!1}static \u0275fac=function(n){return new(n||e)};static \u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var M=new WeakMap,se=(()=>{class e{_appRef;_injector=r(E);_environmentInjector=r(W);load(t){let n=this._appRef=this._appRef||this._injector.get(q),i=M.get(n);i||(i={loaders:new Set,refs:[]},M.set(n,i),n.onDestroy(()=>{M.get(n)?.refs.forEach(o=>o.destroy()),M.delete(n)})),i.loaders.has(t)||(i.loaders.add(t),i.refs.push(z(t,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(n){return new(n||e)};static \u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ie=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275cmp=G({type:e,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(n,i){},styles:[".cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;white-space:nowrap;outline:0;-webkit-appearance:none;-moz-appearance:none;left:0}[dir=rtl] .cdk-visually-hidden{left:auto;right:0}"],encapsulation:2,changeDetection:0})}return e})();var ve=(()=>{class e{create(t){return typeof MutationObserver>"u"?null:new MutationObserver(t)}static \u0275fac=function(n){return new(n||e)};static \u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var oe=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=d({type:e});static \u0275inj=u({providers:[ve]})}return e})();var ue=(()=>{class e{_platform=r(m);constructor(){}isDisabled(t){return t.hasAttribute("disabled")}isVisible(t){return ye(t)&&getComputedStyle(t).visibility==="visible"}isTabbable(t){if(!this._platform.isBrowser)return!1;let n=Ee(we(t));if(n&&(re(n)===-1||!this.isVisible(n)))return!1;let i=t.nodeName.toLowerCase(),o=re(t);return t.hasAttribute("contenteditable")?o!==-1:i==="iframe"||i==="object"||this._platform.WEBKIT&&this._platform.IOS&&!De(t)?!1:i==="audio"?t.hasAttribute("controls")?o!==-1:!1:i==="video"?o===-1?!1:o!==null?!0:this._platform.FIREFOX||t.hasAttribute("controls"):t.tabIndex>=0}isFocusable(t,n){return Oe(t)&&!this.isDisabled(t)&&(n?.ignoreVisibility||this.isVisible(t))}static \u0275fac=function(n){return new(n||e)};static \u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Ee(e){try{return e.frameElement}catch{return null}}function ye(e){return!!(e.offsetWidth||e.offsetHeight||typeof e.getClientRects=="function"&&e.getClientRects().length)}function Te(e){let s=e.nodeName.toLowerCase();return s==="input"||s==="select"||s==="button"||s==="textarea"}function Ae(e){return Ce(e)&&e.type=="hidden"}function Ie(e){return Me(e)&&e.hasAttribute("href")}function Ce(e){return e.nodeName.toLowerCase()=="input"}function Me(e){return e.nodeName.toLowerCase()=="a"}function de(e){if(!e.hasAttribute("tabindex")||e.tabIndex===void 0)return!1;let s=e.getAttribute("tabindex");return!!(s&&!isNaN(parseInt(s,10)))}function re(e){if(!de(e))return null;let s=parseInt(e.getAttribute("tabindex")||"",10);return isNaN(s)?-1:s}function De(e){let s=e.nodeName.toLowerCase(),t=s==="input"&&e.type;return t==="text"||t==="password"||s==="select"||s==="textarea"}function Oe(e){return Ae(e)?!1:Te(e)||Ie(e)||e.hasAttribute("contenteditable")||de(e)}function we(e){return e.ownerDocument&&e.ownerDocument.defaultView||window}var D=class{_element;_checker;_ngZone;_document;_injector;_startAnchor;_endAnchor;_hasAttached=!1;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(s){this._enabled=s,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(s,this._startAnchor),this._toggleAnchorTabIndex(s,this._endAnchor))}_enabled=!0;constructor(s,t,n,i,o=!1,c){this._element=s,this._checker=t,this._ngZone=n,this._document=i,this._injector=c,o||this.attachAnchors()}destroy(){let s=this._startAnchor,t=this._endAnchor;s&&(s.removeEventListener("focus",this.startAnchorListener),s.remove()),t&&(t.removeEventListener("focus",this.endAnchorListener),t.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=!1}attachAnchors(){return this._hasAttached?!0:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener))}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=!0),this._hasAttached)}focusInitialElementWhenReady(s){return new Promise(t=>{this._executeOnStable(()=>t(this.focusInitialElement(s)))})}focusFirstTabbableElementWhenReady(s){return new Promise(t=>{this._executeOnStable(()=>t(this.focusFirstTabbableElement(s)))})}focusLastTabbableElementWhenReady(s){return new Promise(t=>{this._executeOnStable(()=>t(this.focusLastTabbableElement(s)))})}_getRegionBoundary(s){let t=this._element.querySelectorAll(`[cdk-focus-region-${s}], [cdkFocusRegion${s}], [cdk-focus-${s}]`);return s=="start"?t.length?t[0]:this._getFirstTabbableElement(this._element):t.length?t[t.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(s){let t=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(t){if(!this._checker.isFocusable(t)){let n=this._getFirstTabbableElement(t);return n?.focus(s),!!n}return t.focus(s),!0}return this.focusFirstTabbableElement(s)}focusFirstTabbableElement(s){let t=this._getRegionBoundary("start");return t&&t.focus(s),!!t}focusLastTabbableElement(s){let t=this._getRegionBoundary("end");return t&&t.focus(s),!!t}hasAttached(){return this._hasAttached}_getFirstTabbableElement(s){if(this._checker.isFocusable(s)&&this._checker.isTabbable(s))return s;let t=s.children;for(let n=0;n<t.length;n++){let i=t[n].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(t[n]):null;if(i)return i}return null}_getLastTabbableElement(s){if(this._checker.isFocusable(s)&&this._checker.isTabbable(s))return s;let t=s.children;for(let n=t.length-1;n>=0;n--){let i=t[n].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(t[n]):null;if(i)return i}return null}_createAnchor(){let s=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,s),s.classList.add("cdk-visually-hidden"),s.classList.add("cdk-focus-trap-anchor"),s.setAttribute("aria-hidden","true"),s}_toggleAnchorTabIndex(s,t){s?t.setAttribute("tabindex","0"):t.removeAttribute("tabindex")}toggleAnchors(s){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(s,this._startAnchor),this._toggleAnchorTabIndex(s,this._endAnchor))}_executeOnStable(s){this._injector?Y(s,{injector:this._injector}):setTimeout(s)}},Fe=(()=>{class e{_checker=r(ue);_ngZone=r(b);_document=r(l);_injector=r(E);constructor(){r(se).load(ie)}create(t,n=!1){return new D(t,this._checker,this._ngZone,this._document,n,this._injector)}static \u0275fac=function(n){return new(n||e)};static \u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var f=function(e){return e[e.NONE=0]="NONE",e[e.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",e[e.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",e}(f||{}),ae="cdk-high-contrast-black-on-white",ce="cdk-high-contrast-white-on-black",j="cdk-high-contrast-active",O=(()=>{class e{_platform=r(m);_hasCheckedHighContrastMode;_document=r(l);_breakpointSubscription;constructor(){this._breakpointSubscription=r(X).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return f.NONE;let t=this._document.createElement("div");t.style.backgroundColor="rgb(1,2,3)",t.style.position="absolute",this._document.body.appendChild(t);let n=this._document.defaultView||window,i=n&&n.getComputedStyle?n.getComputedStyle(t):null,o=(i&&i.backgroundColor||"").replace(/ /g,"");switch(t.remove(),o){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return f.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return f.BLACK_ON_WHITE}return f.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let t=this._document.body.classList;t.remove(j,ae,ce),this._hasCheckedHighContrastMode=!0;let n=this.getHighContrastMode();n===f.BLACK_ON_WHITE?t.add(j,ae):n===f.WHITE_ON_BLACK&&t.add(j,ce)}}static \u0275fac=function(n){return new(n||e)};static \u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Ne=(()=>{class e{constructor(){r(O)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(n){return new(n||e)};static \u0275mod=d({type:e});static \u0275inj=u({imports:[oe]})}return e})();var B={},ke=(()=>{class e{_appId=r(Z);getId(t){return this._appId!=="ng"&&(t+=this._appId),B.hasOwnProperty(t)||(B[t]=0),`${t}${B[t]++}`}static \u0275fac=function(n){return new(n||e)};static \u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function xt(e,...s){return s.length?s.some(t=>e[t]):e.altKey||e.shiftKey||e.ctrlKey||e.metaKey}var Le=new _("cdk-dir-doc",{providedIn:"root",factory:Re});function Re(){return r(l)}var Se=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function xe(e){let s=e?.toLowerCase()||"";return s==="auto"&&typeof navigator<"u"&&navigator?.language?Se.test(navigator.language)?"rtl":"ltr":s==="rtl"?"rtl":"ltr"}var Xt=(()=>{class e{value="ltr";change=new k;constructor(){let t=r(Le,{optional:!0});if(t){let n=t.body?t.body.dir:null,i=t.documentElement?t.documentElement.dir:null;this.value=xe(n||i||"ltr")}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(n){return new(n||e)};static \u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var w=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=d({type:e});static \u0275inj=u({})}return e})();var dn=(()=>{class e{constructor(){r(O)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(n){return new(n||e)};static \u0275mod=d({type:e});static \u0275inj=u({imports:[w,w]})}return e})();export{Be as a,p as b,T as c,We as d,A as e,dt as f,se as g,ue as h,Fe as i,Ne as j,ke as k,xt as l,Xt as m,w as n,dn as o};
