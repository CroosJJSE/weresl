const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminPage-CfX_rU77.js","assets/AdminPage-B2iF2OfV.css"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const F_="modulepreload",U_=function(t){return"/"+t},dh={},B_=function(e,n,r){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(n.map(c=>{if(c=U_(c),c in dh)return;dh[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":F_,u||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),u)return new Promise((m,g)=>{p.addEventListener("load",m),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&i(l.reason);return e().catch(i)})};/**
* @vue/shared v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function oc(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ve={},Wr=[],nn=()=>{},j_=()=>!1,na=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),ac=t=>t.startsWith("onUpdate:"),vt=Object.assign,lc=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},q_=Object.prototype.hasOwnProperty,ke=(t,e)=>q_.call(t,e),ue=Array.isArray,Qr=t=>Ai(t)==="[object Map]",ra=t=>Ai(t)==="[object Set]",fh=t=>Ai(t)==="[object Date]",ge=t=>typeof t=="function",Ye=t=>typeof t=="string",cn=t=>typeof t=="symbol",Le=t=>t!==null&&typeof t=="object",kf=t=>(Le(t)||ge(t))&&ge(t.then)&&ge(t.catch),Nf=Object.prototype.toString,Ai=t=>Nf.call(t),$_=t=>Ai(t).slice(8,-1),Of=t=>Ai(t)==="[object Object]",cc=t=>Ye(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,zs=oc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),sa=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},H_=/-(\w)/g,Ht=sa(t=>t.replace(H_,(e,n)=>n?n.toUpperCase():"")),G_=/\B([A-Z])/g,kr=sa(t=>t.replace(G_,"-$1").toLowerCase()),ia=sa(t=>t.charAt(0).toUpperCase()+t.slice(1)),Ya=sa(t=>t?`on${ia(t)}`:""),Zn=(t,e)=>!Object.is(t,e),fo=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Tl=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},So=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let ph;const oa=()=>ph||(ph=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ai(t){if(ue(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=Ye(r)?Q_(r):ai(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(Ye(t)||Le(t))return t}const K_=/;(?![^(]*\))/g,z_=/:([^]+)/,W_=/\/\*[^]*?\*\//g;function Q_(t){const e={};return t.replace(W_,"").split(K_).forEach(n=>{if(n){const r=n.split(z_);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function rr(t){let e="";if(Ye(t))e=t;else if(ue(t))for(let n=0;n<t.length;n++){const r=rr(t[n]);r&&(e+=r+" ")}else if(Le(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Y_="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",J_=oc(Y_);function Vf(t){return!!t||t===""}function X_(t,e){if(t.length!==e.length)return!1;let n=!0;for(let r=0;n&&r<t.length;r++)n=aa(t[r],e[r]);return n}function aa(t,e){if(t===e)return!0;let n=fh(t),r=fh(e);if(n||r)return n&&r?t.getTime()===e.getTime():!1;if(n=cn(t),r=cn(e),n||r)return t===e;if(n=ue(t),r=ue(e),n||r)return n&&r?X_(t,e):!1;if(n=Le(t),r=Le(e),n||r){if(!n||!r)return!1;const s=Object.keys(t).length,i=Object.keys(e).length;if(s!==i)return!1;for(const o in t){const l=t.hasOwnProperty(o),c=e.hasOwnProperty(o);if(l&&!c||!l&&c||!aa(t[o],e[o]))return!1}}return String(t)===String(e)}function Z_(t,e){return t.findIndex(n=>aa(n,e))}const xf=t=>!!(t&&t.__v_isRef===!0),J=t=>Ye(t)?t:t==null?"":ue(t)||Le(t)&&(t.toString===Nf||!ge(t.toString))?xf(t)?J(t.value):JSON.stringify(t,Lf,2):String(t),Lf=(t,e)=>xf(e)?Lf(t,e.value):Qr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[Ja(r,i)+" =>"]=s,n),{})}:ra(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Ja(n))}:cn(e)?Ja(e):Le(e)&&!ue(e)&&!Of(e)?String(e):e,Ja=(t,e="")=>{var n;return cn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ct;class Mf{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Ct,!e&&Ct&&(this.index=(Ct.scopes||(Ct.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Ct;try{return Ct=this,e()}finally{Ct=n}}}on(){++this._on===1&&(this.prevScope=Ct,Ct=this)}off(){this._on>0&&--this._on===0&&(Ct=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function ey(t){return new Mf(t)}function ty(){return Ct}let xe;const Xa=new WeakSet;class Ff{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ct&&Ct.active&&Ct.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Xa.has(this)&&(Xa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Bf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,mh(this),jf(this);const e=xe,n=Wt;xe=this,Wt=!0;try{return this.fn()}finally{qf(this),xe=e,Wt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)dc(e);this.deps=this.depsTail=void 0,mh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Xa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){wl(this)&&this.run()}get dirty(){return wl(this)}}let Uf=0,Ws,Qs;function Bf(t,e=!1){if(t.flags|=8,e){t.next=Qs,Qs=t;return}t.next=Ws,Ws=t}function uc(){Uf++}function hc(){if(--Uf>0)return;if(Qs){let e=Qs;for(Qs=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Ws;){let e=Ws;for(Ws=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function jf(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function qf(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),dc(r),ny(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function wl(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&($f(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function $f(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===li)||(t.globalVersion=li,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!wl(t))))return;t.flags|=2;const e=t.dep,n=xe,r=Wt;xe=t,Wt=!0;try{jf(t);const s=t.fn(t._value);(e.version===0||Zn(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{xe=n,Wt=r,qf(t),t.flags&=-3}}function dc(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)dc(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function ny(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Wt=!0;const Hf=[];function Cn(){Hf.push(Wt),Wt=!1}function Dn(){const t=Hf.pop();Wt=t===void 0?!0:t}function mh(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=xe;xe=void 0;try{e()}finally{xe=n}}}let li=0;class ry{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class fc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!xe||!Wt||xe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==xe)n=this.activeLink=new ry(xe,this),xe.deps?(n.prevDep=xe.depsTail,xe.depsTail.nextDep=n,xe.depsTail=n):xe.deps=xe.depsTail=n,Gf(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=xe.depsTail,n.nextDep=void 0,xe.depsTail.nextDep=n,xe.depsTail=n,xe.deps===n&&(xe.deps=r)}return n}trigger(e){this.version++,li++,this.notify(e)}notify(e){uc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{hc()}}}function Gf(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)Gf(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Al=new WeakMap,Ir=Symbol(""),Rl=Symbol(""),ci=Symbol("");function pt(t,e,n){if(Wt&&xe){let r=Al.get(t);r||Al.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new fc),s.map=r,s.key=n),s.track()}}function In(t,e,n,r,s,i){const o=Al.get(t);if(!o){li++;return}const l=c=>{c&&c.trigger()};if(uc(),e==="clear")o.forEach(l);else{const c=ue(t),u=c&&cc(n);if(c&&n==="length"){const d=Number(r);o.forEach((p,m)=>{(m==="length"||m===ci||!cn(m)&&m>=d)&&l(p)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),u&&l(o.get(ci)),e){case"add":c?u&&l(o.get("length")):(l(o.get(Ir)),Qr(t)&&l(o.get(Rl)));break;case"delete":c||(l(o.get(Ir)),Qr(t)&&l(o.get(Rl)));break;case"set":Qr(t)&&l(o.get(Ir));break}}hc()}function jr(t){const e=De(t);return e===t?e:(pt(e,"iterate",ci),$t(t)?e:e.map(st))}function la(t){return pt(t=De(t),"iterate",ci),t}const sy={__proto__:null,[Symbol.iterator](){return Za(this,Symbol.iterator,st)},concat(...t){return jr(this).concat(...t.map(e=>ue(e)?jr(e):e))},entries(){return Za(this,"entries",t=>(t[1]=st(t[1]),t))},every(t,e){return yn(this,"every",t,e,void 0,arguments)},filter(t,e){return yn(this,"filter",t,e,n=>n.map(st),arguments)},find(t,e){return yn(this,"find",t,e,st,arguments)},findIndex(t,e){return yn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return yn(this,"findLast",t,e,st,arguments)},findLastIndex(t,e){return yn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return yn(this,"forEach",t,e,void 0,arguments)},includes(...t){return el(this,"includes",t)},indexOf(...t){return el(this,"indexOf",t)},join(t){return jr(this).join(t)},lastIndexOf(...t){return el(this,"lastIndexOf",t)},map(t,e){return yn(this,"map",t,e,void 0,arguments)},pop(){return xs(this,"pop")},push(...t){return xs(this,"push",t)},reduce(t,...e){return gh(this,"reduce",t,e)},reduceRight(t,...e){return gh(this,"reduceRight",t,e)},shift(){return xs(this,"shift")},some(t,e){return yn(this,"some",t,e,void 0,arguments)},splice(...t){return xs(this,"splice",t)},toReversed(){return jr(this).toReversed()},toSorted(t){return jr(this).toSorted(t)},toSpliced(...t){return jr(this).toSpliced(...t)},unshift(...t){return xs(this,"unshift",t)},values(){return Za(this,"values",st)}};function Za(t,e,n){const r=la(t),s=r[e]();return r!==t&&!$t(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const iy=Array.prototype;function yn(t,e,n,r,s,i){const o=la(t),l=o!==t&&!$t(t),c=o[e];if(c!==iy[e]){const p=c.apply(t,i);return l?st(p):p}let u=n;o!==t&&(l?u=function(p,m){return n.call(this,st(p),m,t)}:n.length>2&&(u=function(p,m){return n.call(this,p,m,t)}));const d=c.call(o,u,r);return l&&s?s(d):d}function gh(t,e,n,r){const s=la(t);let i=n;return s!==t&&($t(t)?n.length>3&&(i=function(o,l,c){return n.call(this,o,l,c,t)}):i=function(o,l,c){return n.call(this,o,st(l),c,t)}),s[e](i,...r)}function el(t,e,n){const r=De(t);pt(r,"iterate",ci);const s=r[e](...n);return(s===-1||s===!1)&&gc(n[0])?(n[0]=De(n[0]),r[e](...n)):s}function xs(t,e,n=[]){Cn(),uc();const r=De(t)[e].apply(t,n);return hc(),Dn(),r}const oy=oc("__proto__,__v_isRef,__isVue"),Kf=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(cn));function ay(t){cn(t)||(t=String(t));const e=De(this);return pt(e,"has",t),e.hasOwnProperty(t)}class zf{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?_y:Jf:i?Yf:Qf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=ue(e);if(!s){let c;if(o&&(c=sy[n]))return c;if(n==="hasOwnProperty")return ay}const l=Reflect.get(e,n,yt(e)?e:r);return(cn(n)?Kf.has(n):oy(n))||(s||pt(e,"get",n),i)?l:yt(l)?o&&cc(n)?l:l.value:Le(l)?s?Zf(l):Nr(l):l}}class Wf extends zf{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const c=sr(i);if(!$t(r)&&!sr(r)&&(i=De(i),r=De(r)),!ue(e)&&yt(i)&&!yt(r))return c?!1:(i.value=r,!0)}const o=ue(e)&&cc(n)?Number(n)<e.length:ke(e,n),l=Reflect.set(e,n,r,yt(e)?e:s);return e===De(s)&&(o?Zn(r,i)&&In(e,"set",n,r):In(e,"add",n,r)),l}deleteProperty(e,n){const r=ke(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&In(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!cn(n)||!Kf.has(n))&&pt(e,"has",n),r}ownKeys(e){return pt(e,"iterate",ue(e)?"length":Ir),Reflect.ownKeys(e)}}class ly extends zf{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const cy=new Wf,uy=new ly,hy=new Wf(!0);const bl=t=>t,ro=t=>Reflect.getPrototypeOf(t);function dy(t,e,n){return function(...r){const s=this.__v_raw,i=De(s),o=Qr(i),l=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,u=s[t](...r),d=n?bl:e?Co:st;return!e&&pt(i,"iterate",c?Rl:Ir),{next(){const{value:p,done:m}=u.next();return m?{value:p,done:m}:{value:l?[d(p[0]),d(p[1])]:d(p),done:m}},[Symbol.iterator](){return this}}}}function so(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function fy(t,e){const n={get(s){const i=this.__v_raw,o=De(i),l=De(s);t||(Zn(s,l)&&pt(o,"get",s),pt(o,"get",l));const{has:c}=ro(o),u=e?bl:t?Co:st;if(c.call(o,s))return u(i.get(s));if(c.call(o,l))return u(i.get(l));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&pt(De(s),"iterate",Ir),Reflect.get(s,"size",s)},has(s){const i=this.__v_raw,o=De(i),l=De(s);return t||(Zn(s,l)&&pt(o,"has",s),pt(o,"has",l)),s===l?i.has(s):i.has(s)||i.has(l)},forEach(s,i){const o=this,l=o.__v_raw,c=De(l),u=e?bl:t?Co:st;return!t&&pt(c,"iterate",Ir),l.forEach((d,p)=>s.call(i,u(d),u(p),o))}};return vt(n,t?{add:so("add"),set:so("set"),delete:so("delete"),clear:so("clear")}:{add(s){!e&&!$t(s)&&!sr(s)&&(s=De(s));const i=De(this);return ro(i).has.call(i,s)||(i.add(s),In(i,"add",s,s)),this},set(s,i){!e&&!$t(i)&&!sr(i)&&(i=De(i));const o=De(this),{has:l,get:c}=ro(o);let u=l.call(o,s);u||(s=De(s),u=l.call(o,s));const d=c.call(o,s);return o.set(s,i),u?Zn(i,d)&&In(o,"set",s,i):In(o,"add",s,i),this},delete(s){const i=De(this),{has:o,get:l}=ro(i);let c=o.call(i,s);c||(s=De(s),c=o.call(i,s)),l&&l.call(i,s);const u=i.delete(s);return c&&In(i,"delete",s,void 0),u},clear(){const s=De(this),i=s.size!==0,o=s.clear();return i&&In(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=dy(s,t,e)}),n}function pc(t,e){const n=fy(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(ke(n,s)&&s in r?n:r,s,i)}const py={get:pc(!1,!1)},my={get:pc(!1,!0)},gy={get:pc(!0,!1)};const Qf=new WeakMap,Yf=new WeakMap,Jf=new WeakMap,_y=new WeakMap;function yy(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function vy(t){return t.__v_skip||!Object.isExtensible(t)?0:yy($_(t))}function Nr(t){return sr(t)?t:mc(t,!1,cy,py,Qf)}function Xf(t){return mc(t,!1,hy,my,Yf)}function Zf(t){return mc(t,!0,uy,gy,Jf)}function mc(t,e,n,r,s){if(!Le(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=vy(t);if(i===0)return t;const o=s.get(t);if(o)return o;const l=new Proxy(t,i===2?r:n);return s.set(t,l),l}function Yr(t){return sr(t)?Yr(t.__v_raw):!!(t&&t.__v_isReactive)}function sr(t){return!!(t&&t.__v_isReadonly)}function $t(t){return!!(t&&t.__v_isShallow)}function gc(t){return t?!!t.__v_raw:!1}function De(t){const e=t&&t.__v_raw;return e?De(e):t}function ep(t){return!ke(t,"__v_skip")&&Object.isExtensible(t)&&Tl(t,"__v_skip",!0),t}const st=t=>Le(t)?Nr(t):t,Co=t=>Le(t)?Zf(t):t;function yt(t){return t?t.__v_isRef===!0:!1}function Se(t){return tp(t,!1)}function Ey(t){return tp(t,!0)}function tp(t,e){return yt(t)?t:new Iy(t,e)}class Iy{constructor(e,n){this.dep=new fc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:De(e),this._value=n?e:st(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||$t(e)||sr(e);e=r?e:De(e),Zn(e,n)&&(this._rawValue=e,this._value=r?e:st(e),this.dep.trigger())}}function Jr(t){return yt(t)?t.value:t}const Ty={get:(t,e,n)=>e==="__v_raw"?t:Jr(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return yt(s)&&!yt(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function np(t){return Yr(t)?t:new Proxy(t,Ty)}class wy{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new fc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=li-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&xe!==this)return Bf(this,!0),!0}get value(){const e=this.dep.track();return $f(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Ay(t,e,n=!1){let r,s;return ge(t)?r=t:(r=t.get,s=t.set),new wy(r,s,n)}const io={},Do=new WeakMap;let _r;function Ry(t,e=!1,n=_r){if(n){let r=Do.get(n);r||Do.set(n,r=[]),r.push(t)}}function by(t,e,n=Ve){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:l,call:c}=n,u=j=>s?j:$t(j)||s===!1||s===0?Tn(j,1):Tn(j);let d,p,m,g,k=!1,S=!1;if(yt(t)?(p=()=>t.value,k=$t(t)):Yr(t)?(p=()=>u(t),k=!0):ue(t)?(S=!0,k=t.some(j=>Yr(j)||$t(j)),p=()=>t.map(j=>{if(yt(j))return j.value;if(Yr(j))return u(j);if(ge(j))return c?c(j,2):j()})):ge(t)?e?p=c?()=>c(t,2):t:p=()=>{if(m){Cn();try{m()}finally{Dn()}}const j=_r;_r=d;try{return c?c(t,3,[g]):t(g)}finally{_r=j}}:p=nn,e&&s){const j=p,ne=s===!0?1/0:s;p=()=>Tn(j(),ne)}const O=ty(),H=()=>{d.stop(),O&&O.active&&lc(O.effects,d)};if(i&&e){const j=e;e=(...ne)=>{j(...ne),H()}}let q=S?new Array(t.length).fill(io):io;const $=j=>{if(!(!(d.flags&1)||!d.dirty&&!j))if(e){const ne=d.run();if(s||k||(S?ne.some((ce,A)=>Zn(ce,q[A])):Zn(ne,q))){m&&m();const ce=_r;_r=d;try{const A=[ne,q===io?void 0:S&&q[0]===io?[]:q,g];q=ne,c?c(e,3,A):e(...A)}finally{_r=ce}}}else d.run()};return l&&l($),d=new Ff(p),d.scheduler=o?()=>o($,!1):$,g=j=>Ry(j,!1,d),m=d.onStop=()=>{const j=Do.get(d);if(j){if(c)c(j,4);else for(const ne of j)ne();Do.delete(d)}},e?r?$(!0):q=d.run():o?o($.bind(null,!0),!0):d.run(),H.pause=d.pause.bind(d),H.resume=d.resume.bind(d),H.stop=H,H}function Tn(t,e=1/0,n){if(e<=0||!Le(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,yt(t))Tn(t.value,e,n);else if(ue(t))for(let r=0;r<t.length;r++)Tn(t[r],e,n);else if(ra(t)||Qr(t))t.forEach(r=>{Tn(r,e,n)});else if(Of(t)){for(const r in t)Tn(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&Tn(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ri(t,e,n,r){try{return r?t(...r):t()}catch(s){ca(s,e,n)}}function un(t,e,n,r){if(ge(t)){const s=Ri(t,e,n,r);return s&&kf(s)&&s.catch(i=>{ca(i,e,n)}),s}if(ue(t)){const s=[];for(let i=0;i<t.length;i++)s.push(un(t[i],e,n,r));return s}}function ca(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Ve;if(e){let l=e.parent;const c=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const d=l.ec;if(d){for(let p=0;p<d.length;p++)if(d[p](t,c,u)===!1)return}l=l.parent}if(i){Cn(),Ri(i,null,10,[t,c,u]),Dn();return}}Py(t,n,s,r,o)}function Py(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const Rt=[];let en=-1;const Xr=[];let Hn=null,qr=0;const rp=Promise.resolve();let ko=null;function _c(t){const e=ko||rp;return t?e.then(this?t.bind(this):t):e}function Sy(t){let e=en+1,n=Rt.length;for(;e<n;){const r=e+n>>>1,s=Rt[r],i=ui(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function yc(t){if(!(t.flags&1)){const e=ui(t),n=Rt[Rt.length-1];!n||!(t.flags&2)&&e>=ui(n)?Rt.push(t):Rt.splice(Sy(e),0,t),t.flags|=1,sp()}}function sp(){ko||(ko=rp.then(op))}function Cy(t){ue(t)?Xr.push(...t):Hn&&t.id===-1?Hn.splice(qr+1,0,t):t.flags&1||(Xr.push(t),t.flags|=1),sp()}function _h(t,e,n=en+1){for(;n<Rt.length;n++){const r=Rt[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;Rt.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function ip(t){if(Xr.length){const e=[...new Set(Xr)].sort((n,r)=>ui(n)-ui(r));if(Xr.length=0,Hn){Hn.push(...e);return}for(Hn=e,qr=0;qr<Hn.length;qr++){const n=Hn[qr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Hn=null,qr=0}}const ui=t=>t.id==null?t.flags&2?-1:1/0:t.id;function op(t){try{for(en=0;en<Rt.length;en++){const e=Rt[en];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ri(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;en<Rt.length;en++){const e=Rt[en];e&&(e.flags&=-2)}en=-1,Rt.length=0,ip(),ko=null,(Rt.length||Xr.length)&&op()}}let xt=null,ap=null;function No(t){const e=xt;return xt=t,ap=t&&t.type.__scopeId||null,e}function Dy(t,e=xt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&Ph(-1);const i=No(e);let o;try{o=t(...s)}finally{No(i),r._d&&Ph(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function je(t,e){if(xt===null)return t;const n=fa(xt),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,l,c=Ve]=e[s];i&&(ge(i)&&(i={mounted:i,updated:i}),i.deep&&Tn(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:l,modifiers:c}))}return t}function mr(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const l=s[o];i&&(l.oldValue=i[o].value);let c=l.dir[r];c&&(Cn(),un(c,n,8,[t.el,l,t,e]),Dn())}}const ky=Symbol("_vte"),Ny=t=>t.__isTeleport;function vc(t,e){t.shapeFlag&6&&t.component?(t.transition=e,vc(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}/*! #__NO_SIDE_EFFECTS__ */function lp(t,e){return ge(t)?vt({name:t.name},e,{setup:t}):t}function cp(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Ys(t,e,n,r,s=!1){if(ue(t)){t.forEach((k,S)=>Ys(k,e&&(ue(e)?e[S]:e),n,r,s));return}if(Js(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Ys(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?fa(r.component):r.el,o=s?null:i,{i:l,r:c}=t,u=e&&e.r,d=l.refs===Ve?l.refs={}:l.refs,p=l.setupState,m=De(p),g=p===Ve?()=>!1:k=>ke(m,k);if(u!=null&&u!==c&&(Ye(u)?(d[u]=null,g(u)&&(p[u]=null)):yt(u)&&(u.value=null)),ge(c))Ri(c,l,12,[o,d]);else{const k=Ye(c),S=yt(c);if(k||S){const O=()=>{if(t.f){const H=k?g(c)?p[c]:d[c]:c.value;s?ue(H)&&lc(H,i):ue(H)?H.includes(i)||H.push(i):k?(d[c]=[i],g(c)&&(p[c]=d[c])):(c.value=[i],t.k&&(d[t.k]=c.value))}else k?(d[c]=o,g(c)&&(p[c]=o)):S&&(c.value=o,t.k&&(d[t.k]=o))};o?(O.id=-1,Vt(O,n)):O()}}}oa().requestIdleCallback;oa().cancelIdleCallback;const Js=t=>!!t.type.__asyncLoader,up=t=>t.type.__isKeepAlive;function Oy(t,e){hp(t,"a",e)}function Vy(t,e){hp(t,"da",e)}function hp(t,e,n=gt){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(ua(e,r,n),n){let s=n.parent;for(;s&&s.parent;)up(s.parent.vnode)&&xy(r,e,n,s),s=s.parent}}function xy(t,e,n,r){const s=ua(e,t,r,!0);dp(()=>{lc(r[e],s)},n)}function ua(t,e,n=gt,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{Cn();const l=Pi(n),c=un(e,n,t,o);return l(),Dn(),c});return r?s.unshift(i):s.push(i),i}}const Ln=t=>(e,n=gt)=>{(!di||t==="sp")&&ua(t,(...r)=>e(...r),n)},Ly=Ln("bm"),bi=Ln("m"),My=Ln("bu"),Fy=Ln("u"),Uy=Ln("bum"),dp=Ln("um"),By=Ln("sp"),jy=Ln("rtg"),qy=Ln("rtc");function $y(t,e=gt){ua("ec",t,e)}const Hy="components";function po(t,e){return Ky(Hy,t,!0,e)||t}const Gy=Symbol.for("v-ndc");function Ky(t,e,n=!0,r=!1){const s=xt||gt;if(s){const i=s.type;{const l=Nv(i,!1);if(l&&(l===e||l===Ht(e)||l===ia(Ht(e))))return i}const o=yh(s[t]||i[t],e)||yh(s.appContext[t],e);return!o&&r?i:o}}function yh(t,e){return t&&(t[e]||t[Ht(e)]||t[ia(Ht(e))])}function Dt(t,e,n,r){let s;const i=n,o=ue(t);if(o||Ye(t)){const l=o&&Yr(t);let c=!1,u=!1;l&&(c=!$t(t),u=sr(t),t=la(t)),s=new Array(t.length);for(let d=0,p=t.length;d<p;d++)s[d]=e(c?u?Co(st(t[d])):st(t[d]):t[d],d,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let l=0;l<t;l++)s[l]=e(l+1,l,void 0,i)}else if(Le(t))if(t[Symbol.iterator])s=Array.from(t,(l,c)=>e(l,c,void 0,i));else{const l=Object.keys(t);s=new Array(l.length);for(let c=0,u=l.length;c<u;c++){const d=l[c];s[c]=e(t[d],d,c,i)}}else s=[];return s}const Pl=t=>t?Op(t)?fa(t):Pl(t.parent):null,Xs=vt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Pl(t.parent),$root:t=>Pl(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>pp(t),$forceUpdate:t=>t.f||(t.f=()=>{yc(t.update)}),$nextTick:t=>t.n||(t.n=_c.bind(t.proxy)),$watch:t=>fv.bind(t)}),tl=(t,e)=>t!==Ve&&!t.__isScriptSetup&&ke(t,e),zy={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:l,appContext:c}=t;let u;if(e[0]!=="$"){const g=o[e];if(g!==void 0)switch(g){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(tl(r,e))return o[e]=1,r[e];if(s!==Ve&&ke(s,e))return o[e]=2,s[e];if((u=t.propsOptions[0])&&ke(u,e))return o[e]=3,i[e];if(n!==Ve&&ke(n,e))return o[e]=4,n[e];Sl&&(o[e]=0)}}const d=Xs[e];let p,m;if(d)return e==="$attrs"&&pt(t.attrs,"get",""),d(t);if((p=l.__cssModules)&&(p=p[e]))return p;if(n!==Ve&&ke(n,e))return o[e]=4,n[e];if(m=c.config.globalProperties,ke(m,e))return m[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return tl(s,e)?(s[e]=n,!0):r!==Ve&&ke(r,e)?(r[e]=n,!0):ke(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let l;return!!n[o]||t!==Ve&&ke(t,o)||tl(e,o)||(l=i[0])&&ke(l,o)||ke(r,o)||ke(Xs,o)||ke(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:ke(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function vh(t){return ue(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Sl=!0;function Wy(t){const e=pp(t),n=t.proxy,r=t.ctx;Sl=!1,e.beforeCreate&&Eh(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:l,provide:c,inject:u,created:d,beforeMount:p,mounted:m,beforeUpdate:g,updated:k,activated:S,deactivated:O,beforeDestroy:H,beforeUnmount:q,destroyed:$,unmounted:j,render:ne,renderTracked:ce,renderTriggered:A,errorCaptured:E,serverPrefetch:w,expose:R,inheritAttrs:b,components:C,directives:T,filters:Tt}=e;if(u&&Qy(u,r,null),o)for(const Te in o){const ve=o[Te];ge(ve)&&(r[Te]=ve.bind(n))}if(s){const Te=s.call(n,n);Le(Te)&&(t.data=Nr(Te))}if(Sl=!0,i)for(const Te in i){const ve=i[Te],Nt=ge(ve)?ve.bind(n,n):ge(ve.get)?ve.get.bind(n,n):nn,Gt=!ge(ve)&&ge(ve.set)?ve.set.bind(n):nn,Ut=bt({get:Nt,set:Gt});Object.defineProperty(r,Te,{enumerable:!0,configurable:!0,get:()=>Ut.value,set:Ue=>Ut.value=Ue})}if(l)for(const Te in l)fp(l[Te],r,n,Te);if(c){const Te=ge(c)?c.call(n):c;Reflect.ownKeys(Te).forEach(ve=>{mo(ve,Te[ve])})}d&&Eh(d,t,"c");function ze(Te,ve){ue(ve)?ve.forEach(Nt=>Te(Nt.bind(n))):ve&&Te(ve.bind(n))}if(ze(Ly,p),ze(bi,m),ze(My,g),ze(Fy,k),ze(Oy,S),ze(Vy,O),ze($y,E),ze(qy,ce),ze(jy,A),ze(Uy,q),ze(dp,j),ze(By,w),ue(R))if(R.length){const Te=t.exposed||(t.exposed={});R.forEach(ve=>{Object.defineProperty(Te,ve,{get:()=>n[ve],set:Nt=>n[ve]=Nt})})}else t.exposed||(t.exposed={});ne&&t.render===nn&&(t.render=ne),b!=null&&(t.inheritAttrs=b),C&&(t.components=C),T&&(t.directives=T),w&&cp(t)}function Qy(t,e,n=nn){ue(t)&&(t=Cl(t));for(const r in t){const s=t[r];let i;Le(s)?"default"in s?i=Pn(s.from||r,s.default,!0):i=Pn(s.from||r):i=Pn(s),yt(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function Eh(t,e,n){un(ue(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function fp(t,e,n,r){let s=r.includes(".")?Pp(n,r):()=>n[r];if(Ye(t)){const i=e[t];ge(i)&&Tr(s,i)}else if(ge(t))Tr(s,t.bind(n));else if(Le(t))if(ue(t))t.forEach(i=>fp(i,e,n,r));else{const i=ge(t.handler)?t.handler.bind(n):e[t.handler];ge(i)&&Tr(s,i,t)}}function pp(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,l=i.get(e);let c;return l?c=l:!s.length&&!n&&!r?c=e:(c={},s.length&&s.forEach(u=>Oo(c,u,o,!0)),Oo(c,e,o)),Le(e)&&i.set(e,c),c}function Oo(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Oo(t,i,n,!0),s&&s.forEach(o=>Oo(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const l=Yy[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const Yy={data:Ih,props:Th,emits:Th,methods:qs,computed:qs,beforeCreate:At,created:At,beforeMount:At,mounted:At,beforeUpdate:At,updated:At,beforeDestroy:At,beforeUnmount:At,destroyed:At,unmounted:At,activated:At,deactivated:At,errorCaptured:At,serverPrefetch:At,components:qs,directives:qs,watch:Xy,provide:Ih,inject:Jy};function Ih(t,e){return e?t?function(){return vt(ge(t)?t.call(this,this):t,ge(e)?e.call(this,this):e)}:e:t}function Jy(t,e){return qs(Cl(t),Cl(e))}function Cl(t){if(ue(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function At(t,e){return t?[...new Set([].concat(t,e))]:e}function qs(t,e){return t?vt(Object.create(null),t,e):e}function Th(t,e){return t?ue(t)&&ue(e)?[...new Set([...t,...e])]:vt(Object.create(null),vh(t),vh(e??{})):e}function Xy(t,e){if(!t)return e;if(!e)return t;const n=vt(Object.create(null),t);for(const r in e)n[r]=At(t[r],e[r]);return n}function mp(){return{app:null,config:{isNativeTag:j_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Zy=0;function ev(t,e){return function(r,s=null){ge(r)||(r=vt({},r)),s!=null&&!Le(s)&&(s=null);const i=mp(),o=new WeakSet,l=[];let c=!1;const u=i.app={_uid:Zy++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Vv,get config(){return i.config},set config(d){},use(d,...p){return o.has(d)||(d&&ge(d.install)?(o.add(d),d.install(u,...p)):ge(d)&&(o.add(d),d(u,...p))),u},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),u},component(d,p){return p?(i.components[d]=p,u):i.components[d]},directive(d,p){return p?(i.directives[d]=p,u):i.directives[d]},mount(d,p,m){if(!c){const g=u._ceVNode||_t(r,s);return g.appContext=i,m===!0?m="svg":m===!1&&(m=void 0),t(g,d,m),c=!0,u._container=d,d.__vue_app__=u,fa(g.component)}},onUnmount(d){l.push(d)},unmount(){c&&(un(l,u._instance,16),t(null,u._container),delete u._container.__vue_app__)},provide(d,p){return i.provides[d]=p,u},runWithContext(d){const p=Zr;Zr=u;try{return d()}finally{Zr=p}}};return u}}let Zr=null;function mo(t,e){if(gt){let n=gt.provides;const r=gt.parent&&gt.parent.provides;r===n&&(n=gt.provides=Object.create(r)),n[t]=e}}function Pn(t,e,n=!1){const r=gt||xt;if(r||Zr){let s=Zr?Zr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&ge(e)?e.call(r&&r.proxy):e}}const gp={},_p=()=>Object.create(gp),yp=t=>Object.getPrototypeOf(t)===gp;function tv(t,e,n,r=!1){const s={},i=_p();t.propsDefaults=Object.create(null),vp(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:Xf(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function nv(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,l=De(s),[c]=t.propsOptions;let u=!1;if((r||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let p=0;p<d.length;p++){let m=d[p];if(ha(t.emitsOptions,m))continue;const g=e[m];if(c)if(ke(i,m))g!==i[m]&&(i[m]=g,u=!0);else{const k=Ht(m);s[k]=Dl(c,l,k,g,t,!1)}else g!==i[m]&&(i[m]=g,u=!0)}}}else{vp(t,e,s,i)&&(u=!0);let d;for(const p in l)(!e||!ke(e,p)&&((d=kr(p))===p||!ke(e,d)))&&(c?n&&(n[p]!==void 0||n[d]!==void 0)&&(s[p]=Dl(c,l,p,void 0,t,!0)):delete s[p]);if(i!==l)for(const p in i)(!e||!ke(e,p))&&(delete i[p],u=!0)}u&&In(t.attrs,"set","")}function vp(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,l;if(e)for(let c in e){if(zs(c))continue;const u=e[c];let d;s&&ke(s,d=Ht(c))?!i||!i.includes(d)?n[d]=u:(l||(l={}))[d]=u:ha(t.emitsOptions,c)||(!(c in r)||u!==r[c])&&(r[c]=u,o=!0)}if(i){const c=De(n),u=l||Ve;for(let d=0;d<i.length;d++){const p=i[d];n[p]=Dl(s,c,p,u[p],t,!ke(u,p))}}return o}function Dl(t,e,n,r,s,i){const o=t[n];if(o!=null){const l=ke(o,"default");if(l&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&ge(c)){const{propsDefaults:u}=s;if(n in u)r=u[n];else{const d=Pi(s);r=u[n]=c.call(null,e),d()}}else r=c;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!l?r=!1:o[1]&&(r===""||r===kr(n))&&(r=!0))}return r}const rv=new WeakMap;function Ep(t,e,n=!1){const r=n?rv:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},l=[];let c=!1;if(!ge(t)){const d=p=>{c=!0;const[m,g]=Ep(p,e,!0);vt(o,m),g&&l.push(...g)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!c)return Le(t)&&r.set(t,Wr),Wr;if(ue(i))for(let d=0;d<i.length;d++){const p=Ht(i[d]);wh(p)&&(o[p]=Ve)}else if(i)for(const d in i){const p=Ht(d);if(wh(p)){const m=i[d],g=o[p]=ue(m)||ge(m)?{type:m}:vt({},m),k=g.type;let S=!1,O=!0;if(ue(k))for(let H=0;H<k.length;++H){const q=k[H],$=ge(q)&&q.name;if($==="Boolean"){S=!0;break}else $==="String"&&(O=!1)}else S=ge(k)&&k.name==="Boolean";g[0]=S,g[1]=O,(S||ke(g,"default"))&&l.push(p)}}const u=[o,l];return Le(t)&&r.set(t,u),u}function wh(t){return t[0]!=="$"&&!zs(t)}const Ec=t=>t[0]==="_"||t==="$stable",Ic=t=>ue(t)?t.map(tn):[tn(t)],sv=(t,e,n)=>{if(e._n)return e;const r=Dy((...s)=>Ic(e(...s)),n);return r._c=!1,r},Ip=(t,e,n)=>{const r=t._ctx;for(const s in t){if(Ec(s))continue;const i=t[s];if(ge(i))e[s]=sv(s,i,r);else if(i!=null){const o=Ic(i);e[s]=()=>o}}},Tp=(t,e)=>{const n=Ic(e);t.slots.default=()=>n},wp=(t,e,n)=>{for(const r in e)(n||!Ec(r))&&(t[r]=e[r])},iv=(t,e,n)=>{const r=t.slots=_p();if(t.vnode.shapeFlag&32){const s=e.__;s&&Tl(r,"__",s,!0);const i=e._;i?(wp(r,e,n),n&&Tl(r,"_",i,!0)):Ip(e,r)}else e&&Tp(t,e)},ov=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Ve;if(r.shapeFlag&32){const l=e._;l?n&&l===1?i=!1:wp(s,e,n):(i=!e.$stable,Ip(e,s)),o=e}else e&&(Tp(t,e),o={default:1});if(i)for(const l in s)!Ec(l)&&o[l]==null&&delete s[l]},Vt=Ev;function av(t){return lv(t)}function lv(t,e){const n=oa();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:l,createComment:c,setText:u,setElementText:d,parentNode:p,nextSibling:m,setScopeId:g=nn,insertStaticContent:k}=t,S=(v,I,P,x=null,F=null,L=null,Q=void 0,K=null,G=!!I.dynamicChildren)=>{if(v===I)return;v&&!Ls(v,I)&&(x=V(v),Ue(v,F,L,!0),v=null),I.patchFlag===-2&&(G=!1,I.dynamicChildren=null);const{type:B,ref:oe,shapeFlag:W}=I;switch(B){case da:O(v,I,P,x);break;case ir:H(v,I,P,x);break;case rl:v==null&&q(I,P,x,Q);break;case qe:C(v,I,P,x,F,L,Q,K,G);break;default:W&1?ne(v,I,P,x,F,L,Q,K,G):W&6?T(v,I,P,x,F,L,Q,K,G):(W&64||W&128)&&B.process(v,I,P,x,F,L,Q,K,G,ee)}oe!=null&&F?Ys(oe,v&&v.ref,L,I||v,!I):oe==null&&v&&v.ref!=null&&Ys(v.ref,null,L,v,!0)},O=(v,I,P,x)=>{if(v==null)r(I.el=l(I.children),P,x);else{const F=I.el=v.el;I.children!==v.children&&u(F,I.children)}},H=(v,I,P,x)=>{v==null?r(I.el=c(I.children||""),P,x):I.el=v.el},q=(v,I,P,x)=>{[v.el,v.anchor]=k(v.children,I,P,x,v.el,v.anchor)},$=({el:v,anchor:I},P,x)=>{let F;for(;v&&v!==I;)F=m(v),r(v,P,x),v=F;r(I,P,x)},j=({el:v,anchor:I})=>{let P;for(;v&&v!==I;)P=m(v),s(v),v=P;s(I)},ne=(v,I,P,x,F,L,Q,K,G)=>{I.type==="svg"?Q="svg":I.type==="math"&&(Q="mathml"),v==null?ce(I,P,x,F,L,Q,K,G):w(v,I,F,L,Q,K,G)},ce=(v,I,P,x,F,L,Q,K)=>{let G,B;const{props:oe,shapeFlag:W,transition:se,dirs:he}=v;if(G=v.el=o(v.type,L,oe&&oe.is,oe),W&8?d(G,v.children):W&16&&E(v.children,G,null,x,F,nl(v,L),Q,K),he&&mr(v,null,x,"created"),A(G,v,v.scopeId,Q,x),oe){for(const _e in oe)_e!=="value"&&!zs(_e)&&i(G,_e,null,oe[_e],L,x);"value"in oe&&i(G,"value",null,oe.value,L),(B=oe.onVnodeBeforeMount)&&Zt(B,x,v)}he&&mr(v,null,x,"beforeMount");const le=cv(F,se);le&&se.beforeEnter(G),r(G,I,P),((B=oe&&oe.onVnodeMounted)||le||he)&&Vt(()=>{B&&Zt(B,x,v),le&&se.enter(G),he&&mr(v,null,x,"mounted")},F)},A=(v,I,P,x,F)=>{if(P&&g(v,P),x)for(let L=0;L<x.length;L++)g(v,x[L]);if(F){let L=F.subTree;if(I===L||Cp(L.type)&&(L.ssContent===I||L.ssFallback===I)){const Q=F.vnode;A(v,Q,Q.scopeId,Q.slotScopeIds,F.parent)}}},E=(v,I,P,x,F,L,Q,K,G=0)=>{for(let B=G;B<v.length;B++){const oe=v[B]=K?Gn(v[B]):tn(v[B]);S(null,oe,I,P,x,F,L,Q,K)}},w=(v,I,P,x,F,L,Q)=>{const K=I.el=v.el;let{patchFlag:G,dynamicChildren:B,dirs:oe}=I;G|=v.patchFlag&16;const W=v.props||Ve,se=I.props||Ve;let he;if(P&&gr(P,!1),(he=se.onVnodeBeforeUpdate)&&Zt(he,P,I,v),oe&&mr(I,v,P,"beforeUpdate"),P&&gr(P,!0),(W.innerHTML&&se.innerHTML==null||W.textContent&&se.textContent==null)&&d(K,""),B?R(v.dynamicChildren,B,K,P,x,nl(I,F),L):Q||ve(v,I,K,null,P,x,nl(I,F),L,!1),G>0){if(G&16)b(K,W,se,P,F);else if(G&2&&W.class!==se.class&&i(K,"class",null,se.class,F),G&4&&i(K,"style",W.style,se.style,F),G&8){const le=I.dynamicProps;for(let _e=0;_e<le.length;_e++){const we=le[_e],Ze=W[we],et=se[we];(et!==Ze||we==="value")&&i(K,we,Ze,et,F,P)}}G&1&&v.children!==I.children&&d(K,I.children)}else!Q&&B==null&&b(K,W,se,P,F);((he=se.onVnodeUpdated)||oe)&&Vt(()=>{he&&Zt(he,P,I,v),oe&&mr(I,v,P,"updated")},x)},R=(v,I,P,x,F,L,Q)=>{for(let K=0;K<I.length;K++){const G=v[K],B=I[K],oe=G.el&&(G.type===qe||!Ls(G,B)||G.shapeFlag&198)?p(G.el):P;S(G,B,oe,null,x,F,L,Q,!0)}},b=(v,I,P,x,F)=>{if(I!==P){if(I!==Ve)for(const L in I)!zs(L)&&!(L in P)&&i(v,L,I[L],null,F,x);for(const L in P){if(zs(L))continue;const Q=P[L],K=I[L];Q!==K&&L!=="value"&&i(v,L,K,Q,F,x)}"value"in P&&i(v,"value",I.value,P.value,F)}},C=(v,I,P,x,F,L,Q,K,G)=>{const B=I.el=v?v.el:l(""),oe=I.anchor=v?v.anchor:l("");let{patchFlag:W,dynamicChildren:se,slotScopeIds:he}=I;he&&(K=K?K.concat(he):he),v==null?(r(B,P,x),r(oe,P,x),E(I.children||[],P,oe,F,L,Q,K,G)):W>0&&W&64&&se&&v.dynamicChildren?(R(v.dynamicChildren,se,P,F,L,Q,K),(I.key!=null||F&&I===F.subTree)&&Ap(v,I,!0)):ve(v,I,P,oe,F,L,Q,K,G)},T=(v,I,P,x,F,L,Q,K,G)=>{I.slotScopeIds=K,v==null?I.shapeFlag&512?F.ctx.activate(I,P,x,Q,G):Tt(I,P,x,F,L,Q,G):Ft(v,I,G)},Tt=(v,I,P,x,F,L,Q)=>{const K=v.component=Pv(v,x,F);if(up(v)&&(K.ctx.renderer=ee),Sv(K,!1,Q),K.asyncDep){if(F&&F.registerDep(K,ze,Q),!v.el){const G=K.subTree=_t(ir);H(null,G,I,P)}}else ze(K,v,I,P,F,L,Q)},Ft=(v,I,P)=>{const x=I.component=v.component;if(yv(v,I,P))if(x.asyncDep&&!x.asyncResolved){Te(x,I,P);return}else x.next=I,x.update();else I.el=v.el,x.vnode=I},ze=(v,I,P,x,F,L,Q)=>{const K=()=>{if(v.isMounted){let{next:W,bu:se,u:he,parent:le,vnode:_e}=v;{const lt=Rp(v);if(lt){W&&(W.el=_e.el,Te(v,W,Q)),lt.asyncDep.then(()=>{v.isUnmounted||K()});return}}let we=W,Ze;gr(v,!1),W?(W.el=_e.el,Te(v,W,Q)):W=_e,se&&fo(se),(Ze=W.props&&W.props.onVnodeBeforeUpdate)&&Zt(Ze,le,W,_e),gr(v,!0);const et=Rh(v),Bt=v.subTree;v.subTree=et,S(Bt,et,p(Bt.el),V(Bt),v,F,L),W.el=et.el,we===null&&vv(v,et.el),he&&Vt(he,F),(Ze=W.props&&W.props.onVnodeUpdated)&&Vt(()=>Zt(Ze,le,W,_e),F)}else{let W;const{el:se,props:he}=I,{bm:le,m:_e,parent:we,root:Ze,type:et}=v,Bt=Js(I);gr(v,!1),le&&fo(le),!Bt&&(W=he&&he.onVnodeBeforeMount)&&Zt(W,we,I),gr(v,!0);{Ze.ce&&Ze.ce._def.shadowRoot!==!1&&Ze.ce._injectChildStyle(et);const lt=v.subTree=Rh(v);S(null,lt,P,x,v,F,L),I.el=lt.el}if(_e&&Vt(_e,F),!Bt&&(W=he&&he.onVnodeMounted)){const lt=I;Vt(()=>Zt(W,we,lt),F)}(I.shapeFlag&256||we&&Js(we.vnode)&&we.vnode.shapeFlag&256)&&v.a&&Vt(v.a,F),v.isMounted=!0,I=P=x=null}};v.scope.on();const G=v.effect=new Ff(K);v.scope.off();const B=v.update=G.run.bind(G),oe=v.job=G.runIfDirty.bind(G);oe.i=v,oe.id=v.uid,G.scheduler=()=>yc(oe),gr(v,!0),B()},Te=(v,I,P)=>{I.component=v;const x=v.vnode.props;v.vnode=I,v.next=null,nv(v,I.props,x,P),ov(v,I.children,P),Cn(),_h(v),Dn()},ve=(v,I,P,x,F,L,Q,K,G=!1)=>{const B=v&&v.children,oe=v?v.shapeFlag:0,W=I.children,{patchFlag:se,shapeFlag:he}=I;if(se>0){if(se&128){Gt(B,W,P,x,F,L,Q,K,G);return}else if(se&256){Nt(B,W,P,x,F,L,Q,K,G);return}}he&8?(oe&16&&St(B,F,L),W!==B&&d(P,W)):oe&16?he&16?Gt(B,W,P,x,F,L,Q,K,G):St(B,F,L,!0):(oe&8&&d(P,""),he&16&&E(W,P,x,F,L,Q,K,G))},Nt=(v,I,P,x,F,L,Q,K,G)=>{v=v||Wr,I=I||Wr;const B=v.length,oe=I.length,W=Math.min(B,oe);let se;for(se=0;se<W;se++){const he=I[se]=G?Gn(I[se]):tn(I[se]);S(v[se],he,P,null,F,L,Q,K,G)}B>oe?St(v,F,L,!0,!1,W):E(I,P,x,F,L,Q,K,G,W)},Gt=(v,I,P,x,F,L,Q,K,G)=>{let B=0;const oe=I.length;let W=v.length-1,se=oe-1;for(;B<=W&&B<=se;){const he=v[B],le=I[B]=G?Gn(I[B]):tn(I[B]);if(Ls(he,le))S(he,le,P,null,F,L,Q,K,G);else break;B++}for(;B<=W&&B<=se;){const he=v[W],le=I[se]=G?Gn(I[se]):tn(I[se]);if(Ls(he,le))S(he,le,P,null,F,L,Q,K,G);else break;W--,se--}if(B>W){if(B<=se){const he=se+1,le=he<oe?I[he].el:x;for(;B<=se;)S(null,I[B]=G?Gn(I[B]):tn(I[B]),P,le,F,L,Q,K,G),B++}}else if(B>se)for(;B<=W;)Ue(v[B],F,L,!0),B++;else{const he=B,le=B,_e=new Map;for(B=le;B<=se;B++){const tt=I[B]=G?Gn(I[B]):tn(I[B]);tt.key!=null&&_e.set(tt.key,B)}let we,Ze=0;const et=se-le+1;let Bt=!1,lt=0;const Fn=new Array(et);for(B=0;B<et;B++)Fn[B]=0;for(B=he;B<=W;B++){const tt=v[B];if(Ze>=et){Ue(tt,F,L,!0);continue}let jt;if(tt.key!=null)jt=_e.get(tt.key);else for(we=le;we<=se;we++)if(Fn[we-le]===0&&Ls(tt,I[we])){jt=we;break}jt===void 0?Ue(tt,F,L,!0):(Fn[jt-le]=B+1,jt>=lt?lt=jt:Bt=!0,S(tt,I[jt],P,null,F,L,Q,K,G),Ze++)}const Ts=Bt?uv(Fn):Wr;for(we=Ts.length-1,B=et-1;B>=0;B--){const tt=le+B,jt=I[tt],ji=tt+1<oe?I[tt+1].el:x;Fn[B]===0?S(null,jt,P,ji,F,L,Q,K,G):Bt&&(we<0||B!==Ts[we]?Ut(jt,P,ji,2):we--)}}},Ut=(v,I,P,x,F=null)=>{const{el:L,type:Q,transition:K,children:G,shapeFlag:B}=v;if(B&6){Ut(v.component.subTree,I,P,x);return}if(B&128){v.suspense.move(I,P,x);return}if(B&64){Q.move(v,I,P,ee);return}if(Q===qe){r(L,I,P);for(let W=0;W<G.length;W++)Ut(G[W],I,P,x);r(v.anchor,I,P);return}if(Q===rl){$(v,I,P);return}if(x!==2&&B&1&&K)if(x===0)K.beforeEnter(L),r(L,I,P),Vt(()=>K.enter(L),F);else{const{leave:W,delayLeave:se,afterLeave:he}=K,le=()=>{v.ctx.isUnmounted?s(L):r(L,I,P)},_e=()=>{W(L,()=>{le(),he&&he()})};se?se(L,le,_e):_e()}else r(L,I,P)},Ue=(v,I,P,x=!1,F=!1)=>{const{type:L,props:Q,ref:K,children:G,dynamicChildren:B,shapeFlag:oe,patchFlag:W,dirs:se,cacheIndex:he}=v;if(W===-2&&(F=!1),K!=null&&(Cn(),Ys(K,null,P,v,!0),Dn()),he!=null&&(I.renderCache[he]=void 0),oe&256){I.ctx.deactivate(v);return}const le=oe&1&&se,_e=!Js(v);let we;if(_e&&(we=Q&&Q.onVnodeBeforeUnmount)&&Zt(we,I,v),oe&6)Xt(v.component,P,x);else{if(oe&128){v.suspense.unmount(P,x);return}le&&mr(v,null,I,"beforeUnmount"),oe&64?v.type.remove(v,I,P,ee,x):B&&!B.hasOnce&&(L!==qe||W>0&&W&64)?St(B,I,P,!1,!0):(L===qe&&W&384||!F&&oe&16)&&St(G,I,P),x&&Be(v)}(_e&&(we=Q&&Q.onVnodeUnmounted)||le)&&Vt(()=>{we&&Zt(we,I,v),le&&mr(v,null,I,"unmounted")},P)},Be=v=>{const{type:I,el:P,anchor:x,transition:F}=v;if(I===qe){Mn(P,x);return}if(I===rl){j(v);return}const L=()=>{s(P),F&&!F.persisted&&F.afterLeave&&F.afterLeave()};if(v.shapeFlag&1&&F&&!F.persisted){const{leave:Q,delayLeave:K}=F,G=()=>Q(P,L);K?K(v.el,L,G):G()}else L()},Mn=(v,I)=>{let P;for(;v!==I;)P=m(v),s(v),v=P;s(I)},Xt=(v,I,P)=>{const{bum:x,scope:F,job:L,subTree:Q,um:K,m:G,a:B,parent:oe,slots:{__:W}}=v;Ah(G),Ah(B),x&&fo(x),oe&&ue(W)&&W.forEach(se=>{oe.renderCache[se]=void 0}),F.stop(),L&&(L.flags|=8,Ue(Q,v,I,P)),K&&Vt(K,I),Vt(()=>{v.isUnmounted=!0},I),I&&I.pendingBranch&&!I.isUnmounted&&v.asyncDep&&!v.asyncResolved&&v.suspenseId===I.pendingId&&(I.deps--,I.deps===0&&I.resolve())},St=(v,I,P,x=!1,F=!1,L=0)=>{for(let Q=L;Q<v.length;Q++)Ue(v[Q],I,P,x,F)},V=v=>{if(v.shapeFlag&6)return V(v.component.subTree);if(v.shapeFlag&128)return v.suspense.next();const I=m(v.anchor||v.el),P=I&&I[ky];return P?m(P):I};let X=!1;const Y=(v,I,P)=>{v==null?I._vnode&&Ue(I._vnode,null,null,!0):S(I._vnode||null,v,I,null,null,null,P),I._vnode=v,X||(X=!0,_h(),ip(),X=!1)},ee={p:S,um:Ue,m:Ut,r:Be,mt:Tt,mc:E,pc:ve,pbc:R,n:V,o:t};return{render:Y,hydrate:void 0,createApp:ev(Y)}}function nl({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function gr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function cv(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Ap(t,e,n=!1){const r=t.children,s=e.children;if(ue(r)&&ue(s))for(let i=0;i<r.length;i++){const o=r[i];let l=s[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=s[i]=Gn(s[i]),l.el=o.el),!n&&l.patchFlag!==-2&&Ap(o,l)),l.type===da&&(l.el=o.el),l.type===ir&&!l.el&&(l.el=o.el)}}function uv(t){const e=t.slice(),n=[0];let r,s,i,o,l;const c=t.length;for(r=0;r<c;r++){const u=t[r];if(u!==0){if(s=n[n.length-1],t[s]<u){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)l=i+o>>1,t[n[l]]<u?i=l+1:o=l;u<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function Rp(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Rp(e)}function Ah(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const hv=Symbol.for("v-scx"),dv=()=>Pn(hv);function Tr(t,e,n){return bp(t,e,n)}function bp(t,e,n=Ve){const{immediate:r,deep:s,flush:i,once:o}=n,l=vt({},n),c=e&&r||!e&&i!=="post";let u;if(di){if(i==="sync"){const g=dv();u=g.__watcherHandles||(g.__watcherHandles=[])}else if(!c){const g=()=>{};return g.stop=nn,g.resume=nn,g.pause=nn,g}}const d=gt;l.call=(g,k,S)=>un(g,d,k,S);let p=!1;i==="post"?l.scheduler=g=>{Vt(g,d&&d.suspense)}:i!=="sync"&&(p=!0,l.scheduler=(g,k)=>{k?g():yc(g)}),l.augmentJob=g=>{e&&(g.flags|=4),p&&(g.flags|=2,d&&(g.id=d.uid,g.i=d))};const m=by(t,e,l);return di&&(u?u.push(m):c&&m()),m}function fv(t,e,n){const r=this.proxy,s=Ye(t)?t.includes(".")?Pp(r,t):()=>r[t]:t.bind(r,r);let i;ge(e)?i=e:(i=e.handler,n=e);const o=Pi(this),l=bp(s,i.bind(r),n);return o(),l}function Pp(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const pv=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Ht(e)}Modifiers`]||t[`${kr(e)}Modifiers`];function mv(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Ve;let s=n;const i=e.startsWith("update:"),o=i&&pv(r,e.slice(7));o&&(o.trim&&(s=n.map(d=>Ye(d)?d.trim():d)),o.number&&(s=n.map(So)));let l,c=r[l=Ya(e)]||r[l=Ya(Ht(e))];!c&&i&&(c=r[l=Ya(kr(e))]),c&&un(c,t,6,s);const u=r[l+"Once"];if(u){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,un(u,t,6,s)}}function Sp(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},l=!1;if(!ge(t)){const c=u=>{const d=Sp(u,e,!0);d&&(l=!0,vt(o,d))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!l?(Le(t)&&r.set(t,null),null):(ue(i)?i.forEach(c=>o[c]=null):vt(o,i),Le(t)&&r.set(t,o),o)}function ha(t,e){return!t||!na(e)?!1:(e=e.slice(2).replace(/Once$/,""),ke(t,e[0].toLowerCase()+e.slice(1))||ke(t,kr(e))||ke(t,e))}function Rh(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:l,emit:c,render:u,renderCache:d,props:p,data:m,setupState:g,ctx:k,inheritAttrs:S}=t,O=No(t);let H,q;try{if(n.shapeFlag&4){const j=s||r,ne=j;H=tn(u.call(ne,j,d,p,g,m,k)),q=l}else{const j=e;H=tn(j.length>1?j(p,{attrs:l,slots:o,emit:c}):j(p,null)),q=e.props?l:gv(l)}}catch(j){Zs.length=0,ca(j,t,1),H=_t(ir)}let $=H;if(q&&S!==!1){const j=Object.keys(q),{shapeFlag:ne}=$;j.length&&ne&7&&(i&&j.some(ac)&&(q=_v(q,i)),$=is($,q,!1,!0))}return n.dirs&&($=is($,null,!1,!0),$.dirs=$.dirs?$.dirs.concat(n.dirs):n.dirs),n.transition&&vc($,n.transition),H=$,No(O),H}const gv=t=>{let e;for(const n in t)(n==="class"||n==="style"||na(n))&&((e||(e={}))[n]=t[n]);return e},_v=(t,e)=>{const n={};for(const r in t)(!ac(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function yv(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:l,patchFlag:c}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?bh(r,o,u):!!o;if(c&8){const d=e.dynamicProps;for(let p=0;p<d.length;p++){const m=d[p];if(o[m]!==r[m]&&!ha(u,m))return!0}}}else return(s||l)&&(!l||!l.$stable)?!0:r===o?!1:r?o?bh(r,o,u):!0:!!o;return!1}function bh(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!ha(n,i))return!0}return!1}function vv({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const Cp=t=>t.__isSuspense;function Ev(t,e){e&&e.pendingBranch?ue(t)?e.effects.push(...t):e.effects.push(t):Cy(t)}const qe=Symbol.for("v-fgt"),da=Symbol.for("v-txt"),ir=Symbol.for("v-cmt"),rl=Symbol.for("v-stc"),Zs=[];let Lt=null;function re(t=!1){Zs.push(Lt=t?null:[])}function Iv(){Zs.pop(),Lt=Zs[Zs.length-1]||null}let hi=1;function Ph(t,e=!1){hi+=t,t<0&&Lt&&e&&(Lt.hasOnce=!0)}function Dp(t){return t.dynamicChildren=hi>0?Lt||Wr:null,Iv(),hi>0&&Lt&&Lt.push(t),t}function ie(t,e,n,r,s,i){return Dp(y(t,e,n,r,s,i,!0))}function kp(t,e,n,r,s){return Dp(_t(t,e,n,r,s,!0))}function Vo(t){return t?t.__v_isVNode===!0:!1}function Ls(t,e){return t.type===e.type&&t.key===e.key}const Np=({key:t})=>t??null,go=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Ye(t)||yt(t)||ge(t)?{i:xt,r:t,k:e,f:!!n}:t:null);function y(t,e=null,n=null,r=0,s=null,i=t===qe?0:1,o=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Np(e),ref:e&&go(e),scopeId:ap,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:xt};return l?(Tc(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=Ye(n)?8:16),hi>0&&!o&&Lt&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Lt.push(c),c}const _t=Tv;function Tv(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===Gy)&&(t=ir),Vo(t)){const l=is(t,e,!0);return n&&Tc(l,n),hi>0&&!i&&Lt&&(l.shapeFlag&6?Lt[Lt.indexOf(t)]=l:Lt.push(l)),l.patchFlag=-2,l}if(Ov(t)&&(t=t.__vccOpts),e){e=wv(e);let{class:l,style:c}=e;l&&!Ye(l)&&(e.class=rr(l)),Le(c)&&(gc(c)&&!ue(c)&&(c=vt({},c)),e.style=ai(c))}const o=Ye(t)?1:Cp(t)?128:Ny(t)?64:Le(t)?4:ge(t)?2:0;return y(t,e,n,r,s,o,i,!0)}function wv(t){return t?gc(t)||yp(t)?vt({},t):t:null}function is(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:l,transition:c}=t,u=e?Av(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:u,key:u&&Np(u),ref:e&&e.ref?n&&i?ue(i)?i.concat(go(e)):[i,go(e)]:go(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==qe?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&is(t.ssContent),ssFallback:t.ssFallback&&is(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&r&&vc(d,c.clone(d)),d}function ye(t=" ",e=0){return _t(da,null,t,e)}function Ge(t="",e=!1){return e?(re(),kp(ir,null,t)):_t(ir,null,t)}function tn(t){return t==null||typeof t=="boolean"?_t(ir):ue(t)?_t(qe,null,t.slice()):Vo(t)?Gn(t):_t(da,null,String(t))}function Gn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:is(t)}function Tc(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(ue(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),Tc(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!yp(e)?e._ctx=xt:s===3&&xt&&(xt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else ge(e)?(e={default:e,_ctx:xt},n=32):(e=String(e),r&64?(n=16,e=[ye(e)]):n=8);t.children=e,t.shapeFlag|=n}function Av(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=rr([e.class,r.class]));else if(s==="style")e.style=ai([e.style,r.style]);else if(na(s)){const i=e[s],o=r[s];o&&i!==o&&!(ue(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function Zt(t,e,n,r=null){un(t,e,7,[n,r])}const Rv=mp();let bv=0;function Pv(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||Rv,i={uid:bv++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Mf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Ep(r,s),emitsOptions:Sp(r,s),emit:null,emitted:null,propsDefaults:Ve,inheritAttrs:r.inheritAttrs,ctx:Ve,data:Ve,props:Ve,attrs:Ve,slots:Ve,refs:Ve,setupState:Ve,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=mv.bind(null,i),t.ce&&t.ce(i),i}let gt=null,xo,kl;{const t=oa(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};xo=e("__VUE_INSTANCE_SETTERS__",n=>gt=n),kl=e("__VUE_SSR_SETTERS__",n=>di=n)}const Pi=t=>{const e=gt;return xo(t),t.scope.on(),()=>{t.scope.off(),xo(e)}},Sh=()=>{gt&&gt.scope.off(),xo(null)};function Op(t){return t.vnode.shapeFlag&4}let di=!1;function Sv(t,e=!1,n=!1){e&&kl(e);const{props:r,children:s}=t.vnode,i=Op(t);tv(t,r,i,e),iv(t,s,n||e);const o=i?Cv(t,e):void 0;return e&&kl(!1),o}function Cv(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,zy);const{setup:r}=n;if(r){Cn();const s=t.setupContext=r.length>1?kv(t):null,i=Pi(t),o=Ri(r,t,0,[t.props,s]),l=kf(o);if(Dn(),i(),(l||t.sp)&&!Js(t)&&cp(t),l){if(o.then(Sh,Sh),e)return o.then(c=>{Ch(t,c)}).catch(c=>{ca(c,t,0)});t.asyncDep=o}else Ch(t,o)}else Vp(t)}function Ch(t,e,n){ge(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Le(e)&&(t.setupState=np(e)),Vp(t)}function Vp(t,e,n){const r=t.type;t.render||(t.render=r.render||nn);{const s=Pi(t);Cn();try{Wy(t)}finally{Dn(),s()}}}const Dv={get(t,e){return pt(t,"get",""),t[e]}};function kv(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Dv),slots:t.slots,emit:t.emit,expose:e}}function fa(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(np(ep(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Xs)return Xs[n](t)},has(e,n){return n in e||n in Xs}})):t.proxy}function Nv(t,e=!0){return ge(t)?t.displayName||t.name:t.name||e&&t.__name}function Ov(t){return ge(t)&&"__vccOpts"in t}const bt=(t,e)=>Ay(t,e,di);function xp(t,e,n){const r=arguments.length;return r===2?Le(e)&&!ue(e)?Vo(e)?_t(t,null,[e]):_t(t,e):_t(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Vo(n)&&(n=[n]),_t(t,e,n))}const Vv="3.5.17";/**
* @vue/runtime-dom v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Nl;const Dh=typeof window<"u"&&window.trustedTypes;if(Dh)try{Nl=Dh.createPolicy("vue",{createHTML:t=>t})}catch{}const Lp=Nl?t=>Nl.createHTML(t):t=>t,xv="http://www.w3.org/2000/svg",Lv="http://www.w3.org/1998/Math/MathML",En=typeof document<"u"?document:null,kh=En&&En.createElement("template"),Mv={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?En.createElementNS(xv,t):e==="mathml"?En.createElementNS(Lv,t):n?En.createElement(t,{is:n}):En.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>En.createTextNode(t),createComment:t=>En.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>En.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{kh.innerHTML=Lp(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const l=kh.content;if(r==="svg"||r==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Fv=Symbol("_vtc");function Uv(t,e,n){const r=t[Fv];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const Nh=Symbol("_vod"),Bv=Symbol("_vsh"),jv=Symbol(""),qv=/(^|;)\s*display\s*:/;function $v(t,e,n){const r=t.style,s=Ye(n);let i=!1;if(n&&!s){if(e)if(Ye(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&_o(r,l,"")}else for(const o in e)n[o]==null&&_o(r,o,"");for(const o in n)o==="display"&&(i=!0),_o(r,o,n[o])}else if(s){if(e!==n){const o=r[jv];o&&(n+=";"+o),r.cssText=n,i=qv.test(n)}}else e&&t.removeAttribute("style");Nh in t&&(t[Nh]=i?r.display:"",t[Bv]&&(r.display="none"))}const Oh=/\s*!important$/;function _o(t,e,n){if(ue(n))n.forEach(r=>_o(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Hv(t,e);Oh.test(n)?t.setProperty(kr(r),n.replace(Oh,""),"important"):t[r]=n}}const Vh=["Webkit","Moz","ms"],sl={};function Hv(t,e){const n=sl[e];if(n)return n;let r=Ht(e);if(r!=="filter"&&r in t)return sl[e]=r;r=ia(r);for(let s=0;s<Vh.length;s++){const i=Vh[s]+r;if(i in t)return sl[e]=i}return e}const xh="http://www.w3.org/1999/xlink";function Lh(t,e,n,r,s,i=J_(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(xh,e.slice(6,e.length)):t.setAttributeNS(xh,e,n):n==null||i&&!Vf(n)?t.removeAttribute(e):t.setAttribute(e,i?"":cn(n)?String(n):n)}function Mh(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?Lp(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(l!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=Vf(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function vr(t,e,n,r){t.addEventListener(e,n,r)}function Gv(t,e,n,r){t.removeEventListener(e,n,r)}const Fh=Symbol("_vei");function Kv(t,e,n,r,s=null){const i=t[Fh]||(t[Fh]={}),o=i[e];if(r&&o)o.value=r;else{const[l,c]=zv(e);if(r){const u=i[e]=Yv(r,s);vr(t,l,u,c)}else o&&(Gv(t,l,o,c),i[e]=void 0)}}const Uh=/(?:Once|Passive|Capture)$/;function zv(t){let e;if(Uh.test(t)){e={};let r;for(;r=t.match(Uh);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):kr(t.slice(2)),e]}let il=0;const Wv=Promise.resolve(),Qv=()=>il||(Wv.then(()=>il=0),il=Date.now());function Yv(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;un(Jv(r,n.value),e,5,[r])};return n.value=t,n.attached=Qv(),n}function Jv(t,e){if(ue(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Bh=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Xv=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?Uv(t,r,o):e==="style"?$v(t,n,r):na(e)?ac(e)||Kv(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Zv(t,e,r,o))?(Mh(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Lh(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!Ye(r))?Mh(t,Ht(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),Lh(t,e,r,o))};function Zv(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&Bh(e)&&ge(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Bh(e)&&Ye(n)?!1:e in t}const Lo=t=>{const e=t.props["onUpdate:modelValue"]||!1;return ue(e)?n=>fo(e,n):e};function eE(t){t.target.composing=!0}function jh(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const es=Symbol("_assign"),dt={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[es]=Lo(s);const i=r||s.props&&s.props.type==="number";vr(t,e?"change":"input",o=>{if(o.target.composing)return;let l=t.value;n&&(l=l.trim()),i&&(l=So(l)),t[es](l)}),n&&vr(t,"change",()=>{t.value=t.value.trim()}),e||(vr(t,"compositionstart",eE),vr(t,"compositionend",jh),vr(t,"change",jh))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[es]=Lo(o),t.composing)return;const l=(i||t.type==="number")&&!/^0\d/.test(t.value)?So(t.value):t.value,c=e??"";l!==c&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===c)||(t.value=c))}},wr={deep:!0,created(t,{value:e,modifiers:{number:n}},r){const s=ra(e);vr(t,"change",()=>{const i=Array.prototype.filter.call(t.options,o=>o.selected).map(o=>n?So(Mo(o)):Mo(o));t[es](t.multiple?s?new Set(i):i:i[0]),t._assigning=!0,_c(()=>{t._assigning=!1})}),t[es]=Lo(r)},mounted(t,{value:e}){qh(t,e)},beforeUpdate(t,e,n){t[es]=Lo(n)},updated(t,{value:e}){t._assigning||qh(t,e)}};function qh(t,e){const n=t.multiple,r=ue(e);if(!(n&&!r&&!ra(e))){for(let s=0,i=t.options.length;s<i;s++){const o=t.options[s],l=Mo(o);if(n)if(r){const c=typeof l;c==="string"||c==="number"?o.selected=e.some(u=>String(u)===String(l)):o.selected=Z_(e,l)>-1}else o.selected=e.has(l);else if(aa(Mo(o),e)){t.selectedIndex!==s&&(t.selectedIndex=s);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function Mo(t){return"_value"in t?t._value:t.value}const tE=["ctrl","shift","alt","meta"],nE={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>tE.some(n=>t[`${n}Key`]&&!e.includes(n))},wc=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=(s,...i)=>{for(let o=0;o<e.length;o++){const l=nE[e[o]];if(l&&l(s,e))return}return t(s,...i)})},rE=vt({patchProp:Xv},Mv);let $h;function sE(){return $h||($h=av(rE))}const iE=(...t)=>{const e=sE().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=aE(r);if(!s)return;const i=e._component;!ge(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,oE(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function oE(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function aE(t){return Ye(t)?document.querySelector(t):t}/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const $r=typeof document<"u";function Mp(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function lE(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&Mp(t.default)}const Ce=Object.assign;function ol(t,e){const n={};for(const r in e){const s=e[r];n[r]=Yt(s)?s.map(t):t(s)}return n}const ei=()=>{},Yt=Array.isArray,Fp=/#/g,cE=/&/g,uE=/\//g,hE=/=/g,dE=/\?/g,Up=/\+/g,fE=/%5B/g,pE=/%5D/g,Bp=/%5E/g,mE=/%60/g,jp=/%7B/g,gE=/%7C/g,qp=/%7D/g,_E=/%20/g;function Ac(t){return encodeURI(""+t).replace(gE,"|").replace(fE,"[").replace(pE,"]")}function yE(t){return Ac(t).replace(jp,"{").replace(qp,"}").replace(Bp,"^")}function Ol(t){return Ac(t).replace(Up,"%2B").replace(_E,"+").replace(Fp,"%23").replace(cE,"%26").replace(mE,"`").replace(jp,"{").replace(qp,"}").replace(Bp,"^")}function vE(t){return Ol(t).replace(hE,"%3D")}function EE(t){return Ac(t).replace(Fp,"%23").replace(dE,"%3F")}function IE(t){return t==null?"":EE(t).replace(uE,"%2F")}function fi(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const TE=/\/$/,wE=t=>t.replace(TE,"");function al(t,e,n="/"){let r,s={},i="",o="";const l=e.indexOf("#");let c=e.indexOf("?");return l<c&&l>=0&&(c=-1),c>-1&&(r=e.slice(0,c),i=e.slice(c+1,l>-1?l:e.length),s=t(i)),l>-1&&(r=r||e.slice(0,l),o=e.slice(l,e.length)),r=PE(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:fi(o)}}function AE(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Hh(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function RE(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&os(e.matched[r],n.matched[s])&&$p(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function os(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function $p(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!bE(t[n],e[n]))return!1;return!0}function bE(t,e){return Yt(t)?Gh(t,e):Yt(e)?Gh(e,t):t===e}function Gh(t,e){return Yt(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function PE(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,l;for(o=0;o<r.length;o++)if(l=r[o],l!==".")if(l==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const qn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var pi;(function(t){t.pop="pop",t.push="push"})(pi||(pi={}));var ti;(function(t){t.back="back",t.forward="forward",t.unknown=""})(ti||(ti={}));function SE(t){if(!t)if($r){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),wE(t)}const CE=/^[^#]+#/;function DE(t,e){return t.replace(CE,"#")+e}function kE(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const pa=()=>({left:window.scrollX,top:window.scrollY});function NE(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=kE(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Kh(t,e){return(history.state?history.state.position-e:-1)+t}const Vl=new Map;function OE(t,e){Vl.set(t,e)}function VE(t){const e=Vl.get(t);return Vl.delete(t),e}let xE=()=>location.protocol+"//"+location.host;function Hp(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let l=s.includes(t.slice(i))?t.slice(i).length:1,c=s.slice(l);return c[0]!=="/"&&(c="/"+c),Hh(c,"")}return Hh(n,t)+r+s}function LE(t,e,n,r){let s=[],i=[],o=null;const l=({state:m})=>{const g=Hp(t,location),k=n.value,S=e.value;let O=0;if(m){if(n.value=g,e.value=m,o&&o===k){o=null;return}O=S?m.position-S.position:0}else r(g);s.forEach(H=>{H(n.value,k,{delta:O,type:pi.pop,direction:O?O>0?ti.forward:ti.back:ti.unknown})})};function c(){o=n.value}function u(m){s.push(m);const g=()=>{const k=s.indexOf(m);k>-1&&s.splice(k,1)};return i.push(g),g}function d(){const{history:m}=window;m.state&&m.replaceState(Ce({},m.state,{scroll:pa()}),"")}function p(){for(const m of i)m();i=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",d)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",d,{passive:!0}),{pauseListeners:c,listen:u,destroy:p}}function zh(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?pa():null}}function ME(t){const{history:e,location:n}=window,r={value:Hp(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,u,d){const p=t.indexOf("#"),m=p>-1?(n.host&&document.querySelector("base")?t:t.slice(p))+c:xE()+t+c;try{e[d?"replaceState":"pushState"](u,"",m),s.value=u}catch(g){console.error(g),n[d?"replace":"assign"](m)}}function o(c,u){const d=Ce({},e.state,zh(s.value.back,c,s.value.forward,!0),u,{position:s.value.position});i(c,d,!0),r.value=c}function l(c,u){const d=Ce({},s.value,e.state,{forward:c,scroll:pa()});i(d.current,d,!0);const p=Ce({},zh(r.value,c,null),{position:d.position+1},u);i(c,p,!1),r.value=c}return{location:r,state:s,push:l,replace:o}}function FE(t){t=SE(t);const e=ME(t),n=LE(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=Ce({location:"",base:t,go:r,createHref:DE.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function UE(t){return typeof t=="string"||t&&typeof t=="object"}function Gp(t){return typeof t=="string"||typeof t=="symbol"}const Kp=Symbol("");var Wh;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Wh||(Wh={}));function as(t,e){return Ce(new Error,{type:t,[Kp]:!0},e)}function vn(t,e){return t instanceof Error&&Kp in t&&(e==null||!!(t.type&e))}const Qh="[^/]+?",BE={sensitive:!1,strict:!1,start:!0,end:!0},jE=/[.+*?^${}()[\]/\\]/g;function qE(t,e){const n=Ce({},BE,e),r=[];let s=n.start?"^":"";const i=[];for(const u of t){const d=u.length?[]:[90];n.strict&&!u.length&&(s+="/");for(let p=0;p<u.length;p++){const m=u[p];let g=40+(n.sensitive?.25:0);if(m.type===0)p||(s+="/"),s+=m.value.replace(jE,"\\$&"),g+=40;else if(m.type===1){const{value:k,repeatable:S,optional:O,regexp:H}=m;i.push({name:k,repeatable:S,optional:O});const q=H||Qh;if(q!==Qh){g+=10;try{new RegExp(`(${q})`)}catch(j){throw new Error(`Invalid custom RegExp for param "${k}" (${q}): `+j.message)}}let $=S?`((?:${q})(?:/(?:${q}))*)`:`(${q})`;p||($=O&&u.length<2?`(?:/${$})`:"/"+$),O&&($+="?"),s+=$,g+=20,O&&(g+=-8),S&&(g+=-20),q===".*"&&(g+=-50)}d.push(g)}r.push(d)}if(n.strict&&n.end){const u=r.length-1;r[u][r[u].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function l(u){const d=u.match(o),p={};if(!d)return null;for(let m=1;m<d.length;m++){const g=d[m]||"",k=i[m-1];p[k.name]=g&&k.repeatable?g.split("/"):g}return p}function c(u){let d="",p=!1;for(const m of t){(!p||!d.endsWith("/"))&&(d+="/"),p=!1;for(const g of m)if(g.type===0)d+=g.value;else if(g.type===1){const{value:k,repeatable:S,optional:O}=g,H=k in u?u[k]:"";if(Yt(H)&&!S)throw new Error(`Provided param "${k}" is an array but it is not repeatable (* or + modifiers)`);const q=Yt(H)?H.join("/"):H;if(!q)if(O)m.length<2&&(d.endsWith("/")?d=d.slice(0,-1):p=!0);else throw new Error(`Missing required param "${k}"`);d+=q}}return d||"/"}return{re:o,score:r,keys:i,parse:l,stringify:c}}function $E(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function zp(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=$E(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(Yh(r))return 1;if(Yh(s))return-1}return s.length-r.length}function Yh(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const HE={type:0,value:""},GE=/[a-zA-Z0-9_]/;function KE(t){if(!t)return[[]];if(t==="/")return[[HE]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(g){throw new Error(`ERR (${n})/"${u}": ${g}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let l=0,c,u="",d="";function p(){u&&(n===0?i.push({type:0,value:u}):n===1||n===2||n===3?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:u,regexp:d,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),u="")}function m(){u+=c}for(;l<t.length;){if(c=t[l++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(u&&p(),o()):c===":"?(p(),n=1):m();break;case 4:m(),n=r;break;case 1:c==="("?n=2:GE.test(c)?m():(p(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&l--);break;case 2:c===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+c:n=3:d+=c;break;case 3:p(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&l--,d="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${u}"`),p(),o(),s}function zE(t,e,n){const r=qE(KE(t.path),n),s=Ce(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function WE(t,e){const n=[],r=new Map;e=ed({strict:!1,end:!0,sensitive:!1},e);function s(p){return r.get(p)}function i(p,m,g){const k=!g,S=Xh(p);S.aliasOf=g&&g.record;const O=ed(e,p),H=[S];if("alias"in p){const j=typeof p.alias=="string"?[p.alias]:p.alias;for(const ne of j)H.push(Xh(Ce({},S,{components:g?g.record.components:S.components,path:ne,aliasOf:g?g.record:S})))}let q,$;for(const j of H){const{path:ne}=j;if(m&&ne[0]!=="/"){const ce=m.record.path,A=ce[ce.length-1]==="/"?"":"/";j.path=m.record.path+(ne&&A+ne)}if(q=zE(j,m,O),g?g.alias.push(q):($=$||q,$!==q&&$.alias.push(q),k&&p.name&&!Zh(q)&&o(p.name)),Wp(q)&&c(q),S.children){const ce=S.children;for(let A=0;A<ce.length;A++)i(ce[A],q,g&&g.children[A])}g=g||q}return $?()=>{o($)}:ei}function o(p){if(Gp(p)){const m=r.get(p);m&&(r.delete(p),n.splice(n.indexOf(m),1),m.children.forEach(o),m.alias.forEach(o))}else{const m=n.indexOf(p);m>-1&&(n.splice(m,1),p.record.name&&r.delete(p.record.name),p.children.forEach(o),p.alias.forEach(o))}}function l(){return n}function c(p){const m=JE(p,n);n.splice(m,0,p),p.record.name&&!Zh(p)&&r.set(p.record.name,p)}function u(p,m){let g,k={},S,O;if("name"in p&&p.name){if(g=r.get(p.name),!g)throw as(1,{location:p});O=g.record.name,k=Ce(Jh(m.params,g.keys.filter($=>!$.optional).concat(g.parent?g.parent.keys.filter($=>$.optional):[]).map($=>$.name)),p.params&&Jh(p.params,g.keys.map($=>$.name))),S=g.stringify(k)}else if(p.path!=null)S=p.path,g=n.find($=>$.re.test(S)),g&&(k=g.parse(S),O=g.record.name);else{if(g=m.name?r.get(m.name):n.find($=>$.re.test(m.path)),!g)throw as(1,{location:p,currentLocation:m});O=g.record.name,k=Ce({},m.params,p.params),S=g.stringify(k)}const H=[];let q=g;for(;q;)H.unshift(q.record),q=q.parent;return{name:O,path:S,params:k,matched:H,meta:YE(H)}}t.forEach(p=>i(p));function d(){n.length=0,r.clear()}return{addRoute:i,resolve:u,removeRoute:o,clearRoutes:d,getRoutes:l,getRecordMatcher:s}}function Jh(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function Xh(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:QE(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function QE(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function Zh(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function YE(t){return t.reduce((e,n)=>Ce(e,n.meta),{})}function ed(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function JE(t,e){let n=0,r=e.length;for(;n!==r;){const i=n+r>>1;zp(t,e[i])<0?r=i:n=i+1}const s=XE(t);return s&&(r=e.lastIndexOf(s,r-1)),r}function XE(t){let e=t;for(;e=e.parent;)if(Wp(e)&&zp(t,e)===0)return e}function Wp({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function ZE(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(Up," "),o=i.indexOf("="),l=fi(o<0?i:i.slice(0,o)),c=o<0?null:fi(i.slice(o+1));if(l in e){let u=e[l];Yt(u)||(u=e[l]=[u]),u.push(c)}else e[l]=c}return e}function td(t){let e="";for(let n in t){const r=t[n];if(n=vE(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(Yt(r)?r.map(i=>i&&Ol(i)):[r&&Ol(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function eI(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=Yt(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const tI=Symbol(""),nd=Symbol(""),Rc=Symbol(""),Qp=Symbol(""),xl=Symbol("");function Ms(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Kn(t,e,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((l,c)=>{const u=m=>{m===!1?c(as(4,{from:n,to:e})):m instanceof Error?c(m):UE(m)?c(as(2,{from:e,to:m})):(o&&r.enterCallbacks[s]===o&&typeof m=="function"&&o.push(m),l())},d=i(()=>t.call(r&&r.instances[s],e,n,u));let p=Promise.resolve(d);t.length<3&&(p=p.then(u)),p.catch(m=>c(m))})}function ll(t,e,n,r,s=i=>i()){const i=[];for(const o of t)for(const l in o.components){let c=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(Mp(c)){const d=(c.__vccOpts||c)[e];d&&i.push(Kn(d,n,r,o,l,s))}else{let u=c();i.push(()=>u.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const p=lE(d)?d.default:d;o.mods[l]=d,o.components[l]=p;const g=(p.__vccOpts||p)[e];return g&&Kn(g,n,r,o,l,s)()}))}}return i}function rd(t){const e=Pn(Rc),n=Pn(Qp),r=bt(()=>{const c=Jr(t.to);return e.resolve(c)}),s=bt(()=>{const{matched:c}=r.value,{length:u}=c,d=c[u-1],p=n.matched;if(!d||!p.length)return-1;const m=p.findIndex(os.bind(null,d));if(m>-1)return m;const g=sd(c[u-2]);return u>1&&sd(d)===g&&p[p.length-1].path!==g?p.findIndex(os.bind(null,c[u-2])):m}),i=bt(()=>s.value>-1&&oI(n.params,r.value.params)),o=bt(()=>s.value>-1&&s.value===n.matched.length-1&&$p(n.params,r.value.params));function l(c={}){if(iI(c)){const u=e[Jr(t.replace)?"replace":"push"](Jr(t.to)).catch(ei);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:r,href:bt(()=>r.value.href),isActive:i,isExactActive:o,navigate:l}}function nI(t){return t.length===1?t[0]:t}const rI=lp({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:rd,setup(t,{slots:e}){const n=Nr(rd(t)),{options:r}=Pn(Rc),s=bt(()=>({[id(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[id(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&nI(e.default(n));return t.custom?i:xp("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),sI=rI;function iI(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function oI(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!Yt(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function sd(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const id=(t,e,n)=>t??e??n,aI=lp({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=Pn(xl),s=bt(()=>t.route||r.value),i=Pn(nd,0),o=bt(()=>{let u=Jr(i);const{matched:d}=s.value;let p;for(;(p=d[u])&&!p.components;)u++;return u}),l=bt(()=>s.value.matched[o.value]);mo(nd,bt(()=>o.value+1)),mo(tI,l),mo(xl,s);const c=Se();return Tr(()=>[c.value,l.value,t.name],([u,d,p],[m,g,k])=>{d&&(d.instances[p]=u,g&&g!==d&&u&&u===m&&(d.leaveGuards.size||(d.leaveGuards=g.leaveGuards),d.updateGuards.size||(d.updateGuards=g.updateGuards))),u&&d&&(!g||!os(d,g)||!m)&&(d.enterCallbacks[p]||[]).forEach(S=>S(u))},{flush:"post"}),()=>{const u=s.value,d=t.name,p=l.value,m=p&&p.components[d];if(!m)return od(n.default,{Component:m,route:u});const g=p.props[d],k=g?g===!0?u.params:typeof g=="function"?g(u):g:null,O=xp(m,Ce({},k,e,{onVnodeUnmounted:H=>{H.component.isUnmounted&&(p.instances[d]=null)},ref:c}));return od(n.default,{Component:O,route:u})||O}}});function od(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const lI=aI;function cI(t){const e=WE(t.routes,t),n=t.parseQuery||ZE,r=t.stringifyQuery||td,s=t.history,i=Ms(),o=Ms(),l=Ms(),c=Ey(qn);let u=qn;$r&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=ol.bind(null,V=>""+V),p=ol.bind(null,IE),m=ol.bind(null,fi);function g(V,X){let Y,ee;return Gp(V)?(Y=e.getRecordMatcher(V),ee=X):ee=V,e.addRoute(ee,Y)}function k(V){const X=e.getRecordMatcher(V);X&&e.removeRoute(X)}function S(){return e.getRoutes().map(V=>V.record)}function O(V){return!!e.getRecordMatcher(V)}function H(V,X){if(X=Ce({},X||c.value),typeof V=="string"){const P=al(n,V,X.path),x=e.resolve({path:P.path},X),F=s.createHref(P.fullPath);return Ce(P,x,{params:m(x.params),hash:fi(P.hash),redirectedFrom:void 0,href:F})}let Y;if(V.path!=null)Y=Ce({},V,{path:al(n,V.path,X.path).path});else{const P=Ce({},V.params);for(const x in P)P[x]==null&&delete P[x];Y=Ce({},V,{params:p(P)}),X.params=p(X.params)}const ee=e.resolve(Y,X),Re=V.hash||"";ee.params=d(m(ee.params));const v=AE(r,Ce({},V,{hash:yE(Re),path:ee.path})),I=s.createHref(v);return Ce({fullPath:v,hash:Re,query:r===td?eI(V.query):V.query||{}},ee,{redirectedFrom:void 0,href:I})}function q(V){return typeof V=="string"?al(n,V,c.value.path):Ce({},V)}function $(V,X){if(u!==V)return as(8,{from:X,to:V})}function j(V){return A(V)}function ne(V){return j(Ce(q(V),{replace:!0}))}function ce(V){const X=V.matched[V.matched.length-1];if(X&&X.redirect){const{redirect:Y}=X;let ee=typeof Y=="function"?Y(V):Y;return typeof ee=="string"&&(ee=ee.includes("?")||ee.includes("#")?ee=q(ee):{path:ee},ee.params={}),Ce({query:V.query,hash:V.hash,params:ee.path!=null?{}:V.params},ee)}}function A(V,X){const Y=u=H(V),ee=c.value,Re=V.state,v=V.force,I=V.replace===!0,P=ce(Y);if(P)return A(Ce(q(P),{state:typeof P=="object"?Ce({},Re,P.state):Re,force:v,replace:I}),X||Y);const x=Y;x.redirectedFrom=X;let F;return!v&&RE(r,ee,Y)&&(F=as(16,{to:x,from:ee}),Ut(ee,ee,!0,!1)),(F?Promise.resolve(F):R(x,ee)).catch(L=>vn(L)?vn(L,2)?L:Gt(L):ve(L,x,ee)).then(L=>{if(L){if(vn(L,2))return A(Ce({replace:I},q(L.to),{state:typeof L.to=="object"?Ce({},Re,L.to.state):Re,force:v}),X||x)}else L=C(x,ee,!0,I,Re);return b(x,ee,L),L})}function E(V,X){const Y=$(V,X);return Y?Promise.reject(Y):Promise.resolve()}function w(V){const X=Mn.values().next().value;return X&&typeof X.runWithContext=="function"?X.runWithContext(V):V()}function R(V,X){let Y;const[ee,Re,v]=uI(V,X);Y=ll(ee.reverse(),"beforeRouteLeave",V,X);for(const P of ee)P.leaveGuards.forEach(x=>{Y.push(Kn(x,V,X))});const I=E.bind(null,V,X);return Y.push(I),St(Y).then(()=>{Y=[];for(const P of i.list())Y.push(Kn(P,V,X));return Y.push(I),St(Y)}).then(()=>{Y=ll(Re,"beforeRouteUpdate",V,X);for(const P of Re)P.updateGuards.forEach(x=>{Y.push(Kn(x,V,X))});return Y.push(I),St(Y)}).then(()=>{Y=[];for(const P of v)if(P.beforeEnter)if(Yt(P.beforeEnter))for(const x of P.beforeEnter)Y.push(Kn(x,V,X));else Y.push(Kn(P.beforeEnter,V,X));return Y.push(I),St(Y)}).then(()=>(V.matched.forEach(P=>P.enterCallbacks={}),Y=ll(v,"beforeRouteEnter",V,X,w),Y.push(I),St(Y))).then(()=>{Y=[];for(const P of o.list())Y.push(Kn(P,V,X));return Y.push(I),St(Y)}).catch(P=>vn(P,8)?P:Promise.reject(P))}function b(V,X,Y){l.list().forEach(ee=>w(()=>ee(V,X,Y)))}function C(V,X,Y,ee,Re){const v=$(V,X);if(v)return v;const I=X===qn,P=$r?history.state:{};Y&&(ee||I?s.replace(V.fullPath,Ce({scroll:I&&P&&P.scroll},Re)):s.push(V.fullPath,Re)),c.value=V,Ut(V,X,Y,I),Gt()}let T;function Tt(){T||(T=s.listen((V,X,Y)=>{if(!Xt.listening)return;const ee=H(V),Re=ce(ee);if(Re){A(Ce(Re,{replace:!0,force:!0}),ee).catch(ei);return}u=ee;const v=c.value;$r&&OE(Kh(v.fullPath,Y.delta),pa()),R(ee,v).catch(I=>vn(I,12)?I:vn(I,2)?(A(Ce(q(I.to),{force:!0}),ee).then(P=>{vn(P,20)&&!Y.delta&&Y.type===pi.pop&&s.go(-1,!1)}).catch(ei),Promise.reject()):(Y.delta&&s.go(-Y.delta,!1),ve(I,ee,v))).then(I=>{I=I||C(ee,v,!1),I&&(Y.delta&&!vn(I,8)?s.go(-Y.delta,!1):Y.type===pi.pop&&vn(I,20)&&s.go(-1,!1)),b(ee,v,I)}).catch(ei)}))}let Ft=Ms(),ze=Ms(),Te;function ve(V,X,Y){Gt(V);const ee=ze.list();return ee.length?ee.forEach(Re=>Re(V,X,Y)):console.error(V),Promise.reject(V)}function Nt(){return Te&&c.value!==qn?Promise.resolve():new Promise((V,X)=>{Ft.add([V,X])})}function Gt(V){return Te||(Te=!V,Tt(),Ft.list().forEach(([X,Y])=>V?Y(V):X()),Ft.reset()),V}function Ut(V,X,Y,ee){const{scrollBehavior:Re}=t;if(!$r||!Re)return Promise.resolve();const v=!Y&&VE(Kh(V.fullPath,0))||(ee||!Y)&&history.state&&history.state.scroll||null;return _c().then(()=>Re(V,X,v)).then(I=>I&&NE(I)).catch(I=>ve(I,V,X))}const Ue=V=>s.go(V);let Be;const Mn=new Set,Xt={currentRoute:c,listening:!0,addRoute:g,removeRoute:k,clearRoutes:e.clearRoutes,hasRoute:O,getRoutes:S,resolve:H,options:t,push:j,replace:ne,go:Ue,back:()=>Ue(-1),forward:()=>Ue(1),beforeEach:i.add,beforeResolve:o.add,afterEach:l.add,onError:ze.add,isReady:Nt,install(V){const X=this;V.component("RouterLink",sI),V.component("RouterView",lI),V.config.globalProperties.$router=X,Object.defineProperty(V.config.globalProperties,"$route",{enumerable:!0,get:()=>Jr(c)}),$r&&!Be&&c.value===qn&&(Be=!0,j(s.location).catch(Re=>{}));const Y={};for(const Re in qn)Object.defineProperty(Y,Re,{get:()=>c.value[Re],enumerable:!0});V.provide(Rc,X),V.provide(Qp,Xf(Y)),V.provide(xl,c);const ee=V.unmount;Mn.add(V),V.unmount=function(){Mn.delete(V),Mn.size<1&&(u=qn,T&&T(),T=null,c.value=qn,Be=!1,Te=!1),ee()}}};function St(V){return V.reduce((X,Y)=>X.then(()=>w(Y)),Promise.resolve())}return Xt}function uI(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const l=e.matched[o];l&&(t.matched.find(u=>os(u,l))?r.push(l):n.push(l));const c=t.matched[o];c&&(e.matched.find(u=>os(u,c))||s.push(c))}return[n,r,s]}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const hI=Symbol();var ad;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(ad||(ad={}));function dI(){const t=ey(!0),e=t.run(()=>Se({}));let n=[],r=[];const s=ep({install(i){s._a=i,i.provide(hI,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return this._a?n.push(i):r.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}const Or=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},fI={name:"App"},pI={id:"app"};function mI(t,e,n,r,s,i){const o=po("router-view");return re(),ie("div",pI,[_t(o)])}const gI=Or(fI,[["render",mI]]);var ld={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yp=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},_I=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Jp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,c=s+2<t.length,u=c?t[s+2]:0,d=i>>2,p=(i&3)<<4|l>>4;let m=(l&15)<<2|u>>6,g=u&63;c||(g=64,o||(m=64)),r.push(n[d],n[p],n[m],n[g])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Yp(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):_I(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const u=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||u==null||p==null)throw new yI;const m=i<<2|l>>4;if(r.push(m),u!==64){const g=l<<4&240|u>>2;if(r.push(g),p!==64){const k=u<<6&192|p;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class yI extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const vI=function(t){const e=Yp(t);return Jp.encodeByteArray(e,!0)},Fo=function(t){return vI(t).replace(/\./g,"")},Xp=function(t){try{return Jp.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EI(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const II=()=>EI().__FIREBASE_DEFAULTS__,TI=()=>{if(typeof process>"u"||typeof ld>"u")return;const t=ld.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},wI=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Xp(t[1]);return e&&JSON.parse(e)},ma=()=>{try{return II()||TI()||wI()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Zp=t=>{var e,n;return(n=(e=ma())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},em=t=>{const e=Zp(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},tm=()=>{var t;return(t=ma())===null||t===void 0?void 0:t.config},nm=t=>{var e;return(e=ma())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AI{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rm(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Fo(JSON.stringify(n)),Fo(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function RI(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Et())}function bI(){var t;const e=(t=ma())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function PI(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function SI(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function CI(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function DI(){const t=Et();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function kI(){return!bI()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function NI(){try{return typeof indexedDB=="object"}catch{return!1}}function OI(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VI="FirebaseError";class pn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=VI,Object.setPrototypeOf(this,pn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Si.prototype.create)}}class Si{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?xI(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new pn(s,l,r)}}function xI(t,e){return t.replace(LI,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const LI=/\{\$([^}]+)}/g;function MI(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Uo(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(cd(i)&&cd(o)){if(!Uo(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function cd(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ci(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function FI(t,e){const n=new UI(t,e);return n.subscribe.bind(n)}class UI{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");BI(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=cl),s.error===void 0&&(s.error=cl),s.complete===void 0&&(s.complete=cl);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function BI(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function cl(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(t){return t&&t._delegate?t._delegate:t}class or{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jI{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new AI;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($I(e))try{this.getOrInitializeService({instanceIdentifier:yr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=yr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=yr){return this.instances.has(e)}getOptions(e=yr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:qI(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=yr){return this.component?this.component.multipleInstances?e:yr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qI(t){return t===yr?void 0:t}function $I(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HI{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new jI(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ie;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Ie||(Ie={}));const GI={debug:Ie.DEBUG,verbose:Ie.VERBOSE,info:Ie.INFO,warn:Ie.WARN,error:Ie.ERROR,silent:Ie.SILENT},KI=Ie.INFO,zI={[Ie.DEBUG]:"log",[Ie.VERBOSE]:"log",[Ie.INFO]:"info",[Ie.WARN]:"warn",[Ie.ERROR]:"error"},WI=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=zI[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class bc{constructor(e){this.name=e,this._logLevel=KI,this._logHandler=WI,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Ie))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?GI[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Ie.DEBUG,...e),this._logHandler(this,Ie.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Ie.VERBOSE,...e),this._logHandler(this,Ie.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Ie.INFO,...e),this._logHandler(this,Ie.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Ie.WARN,...e),this._logHandler(this,Ie.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Ie.ERROR,...e),this._logHandler(this,Ie.ERROR,...e)}}const QI=(t,e)=>e.some(n=>t instanceof n);let ud,hd;function YI(){return ud||(ud=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function JI(){return hd||(hd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const sm=new WeakMap,Ll=new WeakMap,im=new WeakMap,ul=new WeakMap,Pc=new WeakMap;function XI(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(er(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&sm.set(n,t)}).catch(()=>{}),Pc.set(e,t),e}function ZI(t){if(Ll.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Ll.set(t,e)}let Ml={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ll.get(t);if(e==="objectStoreNames")return t.objectStoreNames||im.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return er(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function eT(t){Ml=t(Ml)}function tT(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(hl(this),e,...n);return im.set(r,e.sort?e.sort():[e]),er(r)}:JI().includes(t)?function(...e){return t.apply(hl(this),e),er(sm.get(this))}:function(...e){return er(t.apply(hl(this),e))}}function nT(t){return typeof t=="function"?tT(t):(t instanceof IDBTransaction&&ZI(t),QI(t,YI())?new Proxy(t,Ml):t)}function er(t){if(t instanceof IDBRequest)return XI(t);if(ul.has(t))return ul.get(t);const e=nT(t);return e!==t&&(ul.set(t,e),Pc.set(e,t)),e}const hl=t=>Pc.get(t);function rT(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=er(o);return r&&o.addEventListener("upgradeneeded",c=>{r(er(o.result),c.oldVersion,c.newVersion,er(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const sT=["get","getKey","getAll","getAllKeys","count"],iT=["put","add","delete","clear"],dl=new Map;function dd(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(dl.get(e))return dl.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=iT.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||sT.includes(n)))return;const i=async function(o,...l){const c=this.transaction(o,s?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(l.shift())),(await Promise.all([u[n](...l),s&&c.done]))[0]};return dl.set(e,i),i}eT(t=>({...t,get:(e,n,r)=>dd(e,n)||t.get(e,n,r),has:(e,n)=>!!dd(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(aT(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function aT(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Fl="@firebase/app",fd="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn=new bc("@firebase/app"),lT="@firebase/app-compat",cT="@firebase/analytics-compat",uT="@firebase/analytics",hT="@firebase/app-check-compat",dT="@firebase/app-check",fT="@firebase/auth",pT="@firebase/auth-compat",mT="@firebase/database",gT="@firebase/data-connect",_T="@firebase/database-compat",yT="@firebase/functions",vT="@firebase/functions-compat",ET="@firebase/installations",IT="@firebase/installations-compat",TT="@firebase/messaging",wT="@firebase/messaging-compat",AT="@firebase/performance",RT="@firebase/performance-compat",bT="@firebase/remote-config",PT="@firebase/remote-config-compat",ST="@firebase/storage",CT="@firebase/storage-compat",DT="@firebase/firestore",kT="@firebase/vertexai-preview",NT="@firebase/firestore-compat",OT="firebase",VT="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ul="[DEFAULT]",xT={[Fl]:"fire-core",[lT]:"fire-core-compat",[uT]:"fire-analytics",[cT]:"fire-analytics-compat",[dT]:"fire-app-check",[hT]:"fire-app-check-compat",[fT]:"fire-auth",[pT]:"fire-auth-compat",[mT]:"fire-rtdb",[gT]:"fire-data-connect",[_T]:"fire-rtdb-compat",[yT]:"fire-fn",[vT]:"fire-fn-compat",[ET]:"fire-iid",[IT]:"fire-iid-compat",[TT]:"fire-fcm",[wT]:"fire-fcm-compat",[AT]:"fire-perf",[RT]:"fire-perf-compat",[bT]:"fire-rc",[PT]:"fire-rc-compat",[ST]:"fire-gcs",[CT]:"fire-gcs-compat",[DT]:"fire-fst",[NT]:"fire-fst-compat",[kT]:"fire-vertex","fire-js":"fire-js",[OT]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo=new Map,LT=new Map,Bl=new Map;function pd(t,e){try{t.container.addComponent(e)}catch(n){kn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function br(t){const e=t.name;if(Bl.has(e))return kn.debug(`There were multiple attempts to register component ${e}.`),!1;Bl.set(e,t);for(const n of Bo.values())pd(n,t);for(const n of LT.values())pd(n,t);return!0}function ga(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Jn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},tr=new Si("app","Firebase",MT);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new or("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw tr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=VT;function om(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ul,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw tr.create("bad-app-name",{appName:String(s)});if(n||(n=tm()),!n)throw tr.create("no-options");const i=Bo.get(s);if(i){if(Uo(n,i.options)&&Uo(r,i.config))return i;throw tr.create("duplicate-app",{appName:s})}const o=new HI(s);for(const c of Bl.values())o.addComponent(c);const l=new FT(n,r,o);return Bo.set(s,l),l}function Sc(t=Ul){const e=Bo.get(t);if(!e&&t===Ul&&tm())return om();if(!e)throw tr.create("no-app",{appName:t});return e}function rn(t,e,n){var r;let s=(r=xT[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),kn.warn(l.join(" "));return}br(new or(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UT="firebase-heartbeat-database",BT=1,mi="firebase-heartbeat-store";let fl=null;function am(){return fl||(fl=rT(UT,BT,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(mi)}catch(n){console.warn(n)}}}}).catch(t=>{throw tr.create("idb-open",{originalErrorMessage:t.message})})),fl}async function jT(t){try{const n=(await am()).transaction(mi),r=await n.objectStore(mi).get(lm(t));return await n.done,r}catch(e){if(e instanceof pn)kn.warn(e.message);else{const n=tr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});kn.warn(n.message)}}}async function md(t,e){try{const r=(await am()).transaction(mi,"readwrite");await r.objectStore(mi).put(e,lm(t)),await r.done}catch(n){if(n instanceof pn)kn.warn(n.message);else{const r=tr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});kn.warn(r.message)}}}function lm(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qT=1024,$T=30*24*60*60*1e3;class HT{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new KT(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=gd();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=$T}),this._storage.overwrite(this._heartbeatsCache))}catch(r){kn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=gd(),{heartbeatsToSend:r,unsentEntries:s}=GT(this._heartbeatsCache.heartbeats),i=Fo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return kn.warn(n),""}}}function gd(){return new Date().toISOString().substring(0,10)}function GT(t,e=qT){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),_d(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),_d(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class KT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return NI()?OI().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await jT(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return md(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return md(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function _d(t){return Fo(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zT(t){br(new or("platform-logger",e=>new oT(e),"PRIVATE")),br(new or("heartbeat",e=>new HT(e),"PRIVATE")),rn(Fl,fd,t),rn(Fl,fd,"esm2017"),rn("fire-js","")}zT("");var yd=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ar,cm;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(A,E){function w(){}w.prototype=E.prototype,A.D=E.prototype,A.prototype=new w,A.prototype.constructor=A,A.C=function(R,b,C){for(var T=Array(arguments.length-2),Tt=2;Tt<arguments.length;Tt++)T[Tt-2]=arguments[Tt];return E.prototype[b].apply(R,T)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,E,w){w||(w=0);var R=Array(16);if(typeof E=="string")for(var b=0;16>b;++b)R[b]=E.charCodeAt(w++)|E.charCodeAt(w++)<<8|E.charCodeAt(w++)<<16|E.charCodeAt(w++)<<24;else for(b=0;16>b;++b)R[b]=E[w++]|E[w++]<<8|E[w++]<<16|E[w++]<<24;E=A.g[0],w=A.g[1],b=A.g[2];var C=A.g[3],T=E+(C^w&(b^C))+R[0]+3614090360&4294967295;E=w+(T<<7&4294967295|T>>>25),T=C+(b^E&(w^b))+R[1]+3905402710&4294967295,C=E+(T<<12&4294967295|T>>>20),T=b+(w^C&(E^w))+R[2]+606105819&4294967295,b=C+(T<<17&4294967295|T>>>15),T=w+(E^b&(C^E))+R[3]+3250441966&4294967295,w=b+(T<<22&4294967295|T>>>10),T=E+(C^w&(b^C))+R[4]+4118548399&4294967295,E=w+(T<<7&4294967295|T>>>25),T=C+(b^E&(w^b))+R[5]+1200080426&4294967295,C=E+(T<<12&4294967295|T>>>20),T=b+(w^C&(E^w))+R[6]+2821735955&4294967295,b=C+(T<<17&4294967295|T>>>15),T=w+(E^b&(C^E))+R[7]+4249261313&4294967295,w=b+(T<<22&4294967295|T>>>10),T=E+(C^w&(b^C))+R[8]+1770035416&4294967295,E=w+(T<<7&4294967295|T>>>25),T=C+(b^E&(w^b))+R[9]+2336552879&4294967295,C=E+(T<<12&4294967295|T>>>20),T=b+(w^C&(E^w))+R[10]+4294925233&4294967295,b=C+(T<<17&4294967295|T>>>15),T=w+(E^b&(C^E))+R[11]+2304563134&4294967295,w=b+(T<<22&4294967295|T>>>10),T=E+(C^w&(b^C))+R[12]+1804603682&4294967295,E=w+(T<<7&4294967295|T>>>25),T=C+(b^E&(w^b))+R[13]+4254626195&4294967295,C=E+(T<<12&4294967295|T>>>20),T=b+(w^C&(E^w))+R[14]+2792965006&4294967295,b=C+(T<<17&4294967295|T>>>15),T=w+(E^b&(C^E))+R[15]+1236535329&4294967295,w=b+(T<<22&4294967295|T>>>10),T=E+(b^C&(w^b))+R[1]+4129170786&4294967295,E=w+(T<<5&4294967295|T>>>27),T=C+(w^b&(E^w))+R[6]+3225465664&4294967295,C=E+(T<<9&4294967295|T>>>23),T=b+(E^w&(C^E))+R[11]+643717713&4294967295,b=C+(T<<14&4294967295|T>>>18),T=w+(C^E&(b^C))+R[0]+3921069994&4294967295,w=b+(T<<20&4294967295|T>>>12),T=E+(b^C&(w^b))+R[5]+3593408605&4294967295,E=w+(T<<5&4294967295|T>>>27),T=C+(w^b&(E^w))+R[10]+38016083&4294967295,C=E+(T<<9&4294967295|T>>>23),T=b+(E^w&(C^E))+R[15]+3634488961&4294967295,b=C+(T<<14&4294967295|T>>>18),T=w+(C^E&(b^C))+R[4]+3889429448&4294967295,w=b+(T<<20&4294967295|T>>>12),T=E+(b^C&(w^b))+R[9]+568446438&4294967295,E=w+(T<<5&4294967295|T>>>27),T=C+(w^b&(E^w))+R[14]+3275163606&4294967295,C=E+(T<<9&4294967295|T>>>23),T=b+(E^w&(C^E))+R[3]+4107603335&4294967295,b=C+(T<<14&4294967295|T>>>18),T=w+(C^E&(b^C))+R[8]+1163531501&4294967295,w=b+(T<<20&4294967295|T>>>12),T=E+(b^C&(w^b))+R[13]+2850285829&4294967295,E=w+(T<<5&4294967295|T>>>27),T=C+(w^b&(E^w))+R[2]+4243563512&4294967295,C=E+(T<<9&4294967295|T>>>23),T=b+(E^w&(C^E))+R[7]+1735328473&4294967295,b=C+(T<<14&4294967295|T>>>18),T=w+(C^E&(b^C))+R[12]+2368359562&4294967295,w=b+(T<<20&4294967295|T>>>12),T=E+(w^b^C)+R[5]+4294588738&4294967295,E=w+(T<<4&4294967295|T>>>28),T=C+(E^w^b)+R[8]+2272392833&4294967295,C=E+(T<<11&4294967295|T>>>21),T=b+(C^E^w)+R[11]+1839030562&4294967295,b=C+(T<<16&4294967295|T>>>16),T=w+(b^C^E)+R[14]+4259657740&4294967295,w=b+(T<<23&4294967295|T>>>9),T=E+(w^b^C)+R[1]+2763975236&4294967295,E=w+(T<<4&4294967295|T>>>28),T=C+(E^w^b)+R[4]+1272893353&4294967295,C=E+(T<<11&4294967295|T>>>21),T=b+(C^E^w)+R[7]+4139469664&4294967295,b=C+(T<<16&4294967295|T>>>16),T=w+(b^C^E)+R[10]+3200236656&4294967295,w=b+(T<<23&4294967295|T>>>9),T=E+(w^b^C)+R[13]+681279174&4294967295,E=w+(T<<4&4294967295|T>>>28),T=C+(E^w^b)+R[0]+3936430074&4294967295,C=E+(T<<11&4294967295|T>>>21),T=b+(C^E^w)+R[3]+3572445317&4294967295,b=C+(T<<16&4294967295|T>>>16),T=w+(b^C^E)+R[6]+76029189&4294967295,w=b+(T<<23&4294967295|T>>>9),T=E+(w^b^C)+R[9]+3654602809&4294967295,E=w+(T<<4&4294967295|T>>>28),T=C+(E^w^b)+R[12]+3873151461&4294967295,C=E+(T<<11&4294967295|T>>>21),T=b+(C^E^w)+R[15]+530742520&4294967295,b=C+(T<<16&4294967295|T>>>16),T=w+(b^C^E)+R[2]+3299628645&4294967295,w=b+(T<<23&4294967295|T>>>9),T=E+(b^(w|~C))+R[0]+4096336452&4294967295,E=w+(T<<6&4294967295|T>>>26),T=C+(w^(E|~b))+R[7]+1126891415&4294967295,C=E+(T<<10&4294967295|T>>>22),T=b+(E^(C|~w))+R[14]+2878612391&4294967295,b=C+(T<<15&4294967295|T>>>17),T=w+(C^(b|~E))+R[5]+4237533241&4294967295,w=b+(T<<21&4294967295|T>>>11),T=E+(b^(w|~C))+R[12]+1700485571&4294967295,E=w+(T<<6&4294967295|T>>>26),T=C+(w^(E|~b))+R[3]+2399980690&4294967295,C=E+(T<<10&4294967295|T>>>22),T=b+(E^(C|~w))+R[10]+4293915773&4294967295,b=C+(T<<15&4294967295|T>>>17),T=w+(C^(b|~E))+R[1]+2240044497&4294967295,w=b+(T<<21&4294967295|T>>>11),T=E+(b^(w|~C))+R[8]+1873313359&4294967295,E=w+(T<<6&4294967295|T>>>26),T=C+(w^(E|~b))+R[15]+4264355552&4294967295,C=E+(T<<10&4294967295|T>>>22),T=b+(E^(C|~w))+R[6]+2734768916&4294967295,b=C+(T<<15&4294967295|T>>>17),T=w+(C^(b|~E))+R[13]+1309151649&4294967295,w=b+(T<<21&4294967295|T>>>11),T=E+(b^(w|~C))+R[4]+4149444226&4294967295,E=w+(T<<6&4294967295|T>>>26),T=C+(w^(E|~b))+R[11]+3174756917&4294967295,C=E+(T<<10&4294967295|T>>>22),T=b+(E^(C|~w))+R[2]+718787259&4294967295,b=C+(T<<15&4294967295|T>>>17),T=w+(C^(b|~E))+R[9]+3951481745&4294967295,A.g[0]=A.g[0]+E&4294967295,A.g[1]=A.g[1]+(b+(T<<21&4294967295|T>>>11))&4294967295,A.g[2]=A.g[2]+b&4294967295,A.g[3]=A.g[3]+C&4294967295}r.prototype.u=function(A,E){E===void 0&&(E=A.length);for(var w=E-this.blockSize,R=this.B,b=this.h,C=0;C<E;){if(b==0)for(;C<=w;)s(this,A,C),C+=this.blockSize;if(typeof A=="string"){for(;C<E;)if(R[b++]=A.charCodeAt(C++),b==this.blockSize){s(this,R),b=0;break}}else for(;C<E;)if(R[b++]=A[C++],b==this.blockSize){s(this,R),b=0;break}}this.h=b,this.o+=E},r.prototype.v=function(){var A=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);A[0]=128;for(var E=1;E<A.length-8;++E)A[E]=0;var w=8*this.o;for(E=A.length-8;E<A.length;++E)A[E]=w&255,w/=256;for(this.u(A),A=Array(16),E=w=0;4>E;++E)for(var R=0;32>R;R+=8)A[w++]=this.g[E]>>>R&255;return A};function i(A,E){var w=l;return Object.prototype.hasOwnProperty.call(w,A)?w[A]:w[A]=E(A)}function o(A,E){this.h=E;for(var w=[],R=!0,b=A.length-1;0<=b;b--){var C=A[b]|0;R&&C==E||(w[b]=C,R=!1)}this.g=w}var l={};function c(A){return-128<=A&&128>A?i(A,function(E){return new o([E|0],0>E?-1:0)}):new o([A|0],0>A?-1:0)}function u(A){if(isNaN(A)||!isFinite(A))return p;if(0>A)return O(u(-A));for(var E=[],w=1,R=0;A>=w;R++)E[R]=A/w|0,w*=4294967296;return new o(E,0)}function d(A,E){if(A.length==0)throw Error("number format error: empty string");if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(A.charAt(0)=="-")return O(d(A.substring(1),E));if(0<=A.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=u(Math.pow(E,8)),R=p,b=0;b<A.length;b+=8){var C=Math.min(8,A.length-b),T=parseInt(A.substring(b,b+C),E);8>C?(C=u(Math.pow(E,C)),R=R.j(C).add(u(T))):(R=R.j(w),R=R.add(u(T)))}return R}var p=c(0),m=c(1),g=c(16777216);t=o.prototype,t.m=function(){if(S(this))return-O(this).m();for(var A=0,E=1,w=0;w<this.g.length;w++){var R=this.i(w);A+=(0<=R?R:4294967296+R)*E,E*=4294967296}return A},t.toString=function(A){if(A=A||10,2>A||36<A)throw Error("radix out of range: "+A);if(k(this))return"0";if(S(this))return"-"+O(this).toString(A);for(var E=u(Math.pow(A,6)),w=this,R="";;){var b=j(w,E).g;w=H(w,b.j(E));var C=((0<w.g.length?w.g[0]:w.h)>>>0).toString(A);if(w=b,k(w))return C+R;for(;6>C.length;)C="0"+C;R=C+R}},t.i=function(A){return 0>A?0:A<this.g.length?this.g[A]:this.h};function k(A){if(A.h!=0)return!1;for(var E=0;E<A.g.length;E++)if(A.g[E]!=0)return!1;return!0}function S(A){return A.h==-1}t.l=function(A){return A=H(this,A),S(A)?-1:k(A)?0:1};function O(A){for(var E=A.g.length,w=[],R=0;R<E;R++)w[R]=~A.g[R];return new o(w,~A.h).add(m)}t.abs=function(){return S(this)?O(this):this},t.add=function(A){for(var E=Math.max(this.g.length,A.g.length),w=[],R=0,b=0;b<=E;b++){var C=R+(this.i(b)&65535)+(A.i(b)&65535),T=(C>>>16)+(this.i(b)>>>16)+(A.i(b)>>>16);R=T>>>16,C&=65535,T&=65535,w[b]=T<<16|C}return new o(w,w[w.length-1]&-2147483648?-1:0)};function H(A,E){return A.add(O(E))}t.j=function(A){if(k(this)||k(A))return p;if(S(this))return S(A)?O(this).j(O(A)):O(O(this).j(A));if(S(A))return O(this.j(O(A)));if(0>this.l(g)&&0>A.l(g))return u(this.m()*A.m());for(var E=this.g.length+A.g.length,w=[],R=0;R<2*E;R++)w[R]=0;for(R=0;R<this.g.length;R++)for(var b=0;b<A.g.length;b++){var C=this.i(R)>>>16,T=this.i(R)&65535,Tt=A.i(b)>>>16,Ft=A.i(b)&65535;w[2*R+2*b]+=T*Ft,q(w,2*R+2*b),w[2*R+2*b+1]+=C*Ft,q(w,2*R+2*b+1),w[2*R+2*b+1]+=T*Tt,q(w,2*R+2*b+1),w[2*R+2*b+2]+=C*Tt,q(w,2*R+2*b+2)}for(R=0;R<E;R++)w[R]=w[2*R+1]<<16|w[2*R];for(R=E;R<2*E;R++)w[R]=0;return new o(w,0)};function q(A,E){for(;(A[E]&65535)!=A[E];)A[E+1]+=A[E]>>>16,A[E]&=65535,E++}function $(A,E){this.g=A,this.h=E}function j(A,E){if(k(E))throw Error("division by zero");if(k(A))return new $(p,p);if(S(A))return E=j(O(A),E),new $(O(E.g),O(E.h));if(S(E))return E=j(A,O(E)),new $(O(E.g),E.h);if(30<A.g.length){if(S(A)||S(E))throw Error("slowDivide_ only works with positive integers.");for(var w=m,R=E;0>=R.l(A);)w=ne(w),R=ne(R);var b=ce(w,1),C=ce(R,1);for(R=ce(R,2),w=ce(w,2);!k(R);){var T=C.add(R);0>=T.l(A)&&(b=b.add(w),C=T),R=ce(R,1),w=ce(w,1)}return E=H(A,b.j(E)),new $(b,E)}for(b=p;0<=A.l(E);){for(w=Math.max(1,Math.floor(A.m()/E.m())),R=Math.ceil(Math.log(w)/Math.LN2),R=48>=R?1:Math.pow(2,R-48),C=u(w),T=C.j(E);S(T)||0<T.l(A);)w-=R,C=u(w),T=C.j(E);k(C)&&(C=m),b=b.add(C),A=H(A,T)}return new $(b,A)}t.A=function(A){return j(this,A).h},t.and=function(A){for(var E=Math.max(this.g.length,A.g.length),w=[],R=0;R<E;R++)w[R]=this.i(R)&A.i(R);return new o(w,this.h&A.h)},t.or=function(A){for(var E=Math.max(this.g.length,A.g.length),w=[],R=0;R<E;R++)w[R]=this.i(R)|A.i(R);return new o(w,this.h|A.h)},t.xor=function(A){for(var E=Math.max(this.g.length,A.g.length),w=[],R=0;R<E;R++)w[R]=this.i(R)^A.i(R);return new o(w,this.h^A.h)};function ne(A){for(var E=A.g.length+1,w=[],R=0;R<E;R++)w[R]=A.i(R)<<1|A.i(R-1)>>>31;return new o(w,A.h)}function ce(A,E){var w=E>>5;E%=32;for(var R=A.g.length-w,b=[],C=0;C<R;C++)b[C]=0<E?A.i(C+w)>>>E|A.i(C+w+1)<<32-E:A.i(C+w);return new o(b,A.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,cm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=d,Ar=o}).apply(typeof yd<"u"?yd:typeof self<"u"?self:typeof window<"u"?window:{});var oo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var um,$s,hm,yo,jl,dm,fm,pm;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,f){return a==Array.prototype||a==Object.prototype||(a[h]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof oo=="object"&&oo];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(a,h){if(h)e:{var f=r;a=a.split(".");for(var _=0;_<a.length-1;_++){var D=a[_];if(!(D in f))break e;f=f[D]}a=a[a.length-1],_=f[a],h=h(_),h!=_&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}function i(a,h){a instanceof String&&(a+="");var f=0,_=!1,D={next:function(){if(!_&&f<a.length){var N=f++;return{value:h(N,a[N]),done:!1}}return _=!0,{done:!0,value:void 0}}};return D[Symbol.iterator]=function(){return D},D}s("Array.prototype.values",function(a){return a||function(){return i(this,function(h,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function u(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function d(a,h,f){return a.call.apply(a.bind,arguments)}function p(a,h,f){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var D=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(D,_),a.apply(h,D)}}return function(){return a.apply(h,arguments)}}function m(a,h,f){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:p,m.apply(null,arguments)}function g(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var _=f.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function k(a,h){function f(){}f.prototype=h.prototype,a.aa=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(_,D,N){for(var z=Array(arguments.length-2),Oe=2;Oe<arguments.length;Oe++)z[Oe-2]=arguments[Oe];return h.prototype[D].apply(_,z)}}function S(a){const h=a.length;if(0<h){const f=Array(h);for(let _=0;_<h;_++)f[_]=a[_];return f}return[]}function O(a,h){for(let f=1;f<arguments.length;f++){const _=arguments[f];if(c(_)){const D=a.length||0,N=_.length||0;a.length=D+N;for(let z=0;z<N;z++)a[D+z]=_[z]}else a.push(_)}}class H{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function q(a){return/^[\s\xa0]*$/.test(a)}function $(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function j(a){return j[" "](a),a}j[" "]=function(){};var ne=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function ce(a,h,f){for(const _ in a)h.call(f,a[_],_,a)}function A(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function E(a){const h={};for(const f in a)h[f]=a[f];return h}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function R(a,h){let f,_;for(let D=1;D<arguments.length;D++){_=arguments[D];for(f in _)a[f]=_[f];for(let N=0;N<w.length;N++)f=w[N],Object.prototype.hasOwnProperty.call(_,f)&&(a[f]=_[f])}}function b(a){var h=1;a=a.split(":");const f=[];for(;0<h&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function C(a){l.setTimeout(()=>{throw a},0)}function T(){var a=Nt;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class Tt{constructor(){this.h=this.g=null}add(h,f){const _=Ft.get();_.set(h,f),this.h?this.h.next=_:this.g=_,this.h=_}}var Ft=new H(()=>new ze,a=>a.reset());class ze{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Te,ve=!1,Nt=new Tt,Gt=()=>{const a=l.Promise.resolve(void 0);Te=()=>{a.then(Ut)}};var Ut=()=>{for(var a;a=T();){try{a.h.call(a.g)}catch(f){C(f)}var h=Ft;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}ve=!1};function Ue(){this.s=this.s,this.C=this.C}Ue.prototype.s=!1,Ue.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ue.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Be(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}Be.prototype.h=function(){this.defaultPrevented=!0};var Mn=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};l.addEventListener("test",f,h),l.removeEventListener("test",f,h)}catch{}return a}();function Xt(a,h){if(Be.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(ne){e:{try{j(h.nodeName);var D=!0;break e}catch{}D=!1}D||(h=null)}}else f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement);this.relatedTarget=h,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:St[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Xt.aa.h.call(this)}}k(Xt,Be);var St={2:"touch",3:"pen",4:"mouse"};Xt.prototype.h=function(){Xt.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var V="closure_listenable_"+(1e6*Math.random()|0),X=0;function Y(a,h,f,_,D){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!_,this.ha=D,this.key=++X,this.da=this.fa=!1}function ee(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Re(a){this.src=a,this.g={},this.h=0}Re.prototype.add=function(a,h,f,_,D){var N=a.toString();a=this.g[N],a||(a=this.g[N]=[],this.h++);var z=I(a,h,_,D);return-1<z?(h=a[z],f||(h.fa=!1)):(h=new Y(h,this.src,N,!!_,D),h.fa=f,a.push(h)),h};function v(a,h){var f=h.type;if(f in a.g){var _=a.g[f],D=Array.prototype.indexOf.call(_,h,void 0),N;(N=0<=D)&&Array.prototype.splice.call(_,D,1),N&&(ee(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function I(a,h,f,_){for(var D=0;D<a.length;++D){var N=a[D];if(!N.da&&N.listener==h&&N.capture==!!f&&N.ha==_)return D}return-1}var P="closure_lm_"+(1e6*Math.random()|0),x={};function F(a,h,f,_,D){if(Array.isArray(h)){for(var N=0;N<h.length;N++)F(a,h[N],f,_,D);return null}return f=he(f),a&&a[V]?a.K(h,f,u(_)?!!_.capture:!1,D):L(a,h,f,!1,_,D)}function L(a,h,f,_,D,N){if(!h)throw Error("Invalid event type");var z=u(D)?!!D.capture:!!D,Oe=W(a);if(Oe||(a[P]=Oe=new Re(a)),f=Oe.add(h,f,_,z,N),f.proxy)return f;if(_=Q(),f.proxy=_,_.src=a,_.listener=f,a.addEventListener)Mn||(D=z),D===void 0&&(D=!1),a.addEventListener(h.toString(),_,D);else if(a.attachEvent)a.attachEvent(B(h.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Q(){function a(f){return h.call(a.src,a.listener,f)}const h=oe;return a}function K(a,h,f,_,D){if(Array.isArray(h))for(var N=0;N<h.length;N++)K(a,h[N],f,_,D);else _=u(_)?!!_.capture:!!_,f=he(f),a&&a[V]?(a=a.i,h=String(h).toString(),h in a.g&&(N=a.g[h],f=I(N,f,_,D),-1<f&&(ee(N[f]),Array.prototype.splice.call(N,f,1),N.length==0&&(delete a.g[h],a.h--)))):a&&(a=W(a))&&(h=a.g[h.toString()],a=-1,h&&(a=I(h,f,_,D)),(f=-1<a?h[a]:null)&&G(f))}function G(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[V])v(h.i,a);else{var f=a.type,_=a.proxy;h.removeEventListener?h.removeEventListener(f,_,a.capture):h.detachEvent?h.detachEvent(B(f),_):h.addListener&&h.removeListener&&h.removeListener(_),(f=W(h))?(v(f,a),f.h==0&&(f.src=null,h[P]=null)):ee(a)}}}function B(a){return a in x?x[a]:x[a]="on"+a}function oe(a,h){if(a.da)a=!0;else{h=new Xt(h,this);var f=a.listener,_=a.ha||a.src;a.fa&&G(a),a=f.call(_,h)}return a}function W(a){return a=a[P],a instanceof Re?a:null}var se="__closure_events_fn_"+(1e9*Math.random()>>>0);function he(a){return typeof a=="function"?a:(a[se]||(a[se]=function(h){return a.handleEvent(h)}),a[se])}function le(){Ue.call(this),this.i=new Re(this),this.M=this,this.F=null}k(le,Ue),le.prototype[V]=!0,le.prototype.removeEventListener=function(a,h,f,_){K(this,a,h,f,_)};function _e(a,h){var f,_=a.F;if(_)for(f=[];_;_=_.F)f.push(_);if(a=a.M,_=h.type||h,typeof h=="string")h=new Be(h,a);else if(h instanceof Be)h.target=h.target||a;else{var D=h;h=new Be(_,a),R(h,D)}if(D=!0,f)for(var N=f.length-1;0<=N;N--){var z=h.g=f[N];D=we(z,_,!0,h)&&D}if(z=h.g=a,D=we(z,_,!0,h)&&D,D=we(z,_,!1,h)&&D,f)for(N=0;N<f.length;N++)z=h.g=f[N],D=we(z,_,!1,h)&&D}le.prototype.N=function(){if(le.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var f=a.g[h],_=0;_<f.length;_++)ee(f[_]);delete a.g[h],a.h--}}this.F=null},le.prototype.K=function(a,h,f,_){return this.i.add(String(a),h,!1,f,_)},le.prototype.L=function(a,h,f,_){return this.i.add(String(a),h,!0,f,_)};function we(a,h,f,_){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var D=!0,N=0;N<h.length;++N){var z=h[N];if(z&&!z.da&&z.capture==f){var Oe=z.listener,nt=z.ha||z.src;z.fa&&v(a.i,z),D=Oe.call(nt,_)!==!1&&D}}return D&&!_.defaultPrevented}function Ze(a,h,f){if(typeof a=="function")f&&(a=m(a,f));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:l.setTimeout(a,h||0)}function et(a){a.g=Ze(()=>{a.g=null,a.i&&(a.i=!1,et(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Bt extends Ue{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:et(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function lt(a){Ue.call(this),this.h=a,this.g={}}k(lt,Ue);var Fn=[];function Ts(a){ce(a.g,function(h,f){this.g.hasOwnProperty(f)&&G(h)},a),a.g={}}lt.prototype.N=function(){lt.aa.N.call(this),Ts(this)},lt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var tt=l.JSON.stringify,jt=l.JSON.parse,ji=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function xa(){}xa.prototype.h=null;function Iu(a){return a.h||(a.h=a.i())}function Tu(){}var ws={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function La(){Be.call(this,"d")}k(La,Be);function Ma(){Be.call(this,"c")}k(Ma,Be);var hr={},wu=null;function qi(){return wu=wu||new le}hr.La="serverreachability";function Au(a){Be.call(this,hr.La,a)}k(Au,Be);function As(a){const h=qi();_e(h,new Au(h))}hr.STAT_EVENT="statevent";function Ru(a,h){Be.call(this,hr.STAT_EVENT,a),this.stat=h}k(Ru,Be);function wt(a){const h=qi();_e(h,new Ru(h,a))}hr.Ma="timingevent";function bu(a,h){Be.call(this,hr.Ma,a),this.size=h}k(bu,Be);function Rs(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},h)}function bs(){this.g=!0}bs.prototype.xa=function(){this.g=!1};function m_(a,h,f,_,D,N){a.info(function(){if(a.g)if(N)for(var z="",Oe=N.split("&"),nt=0;nt<Oe.length;nt++){var be=Oe[nt].split("=");if(1<be.length){var ct=be[0];be=be[1];var ut=ct.split("_");z=2<=ut.length&&ut[1]=="type"?z+(ct+"="+be+"&"):z+(ct+"=redacted&")}}else z=null;else z=N;return"XMLHTTP REQ ("+_+") [attempt "+D+"]: "+h+`
`+f+`
`+z})}function g_(a,h,f,_,D,N,z){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+D+"]: "+h+`
`+f+`
`+N+" "+z})}function Mr(a,h,f,_){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+y_(a,f)+(_?" "+_:"")})}function __(a,h){a.info(function(){return"TIMEOUT: "+h})}bs.prototype.info=function(){};function y_(a,h){if(!a.g)return h;if(!h)return null;try{var f=JSON.parse(h);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var _=f[a];if(!(2>_.length)){var D=_[1];if(Array.isArray(D)&&!(1>D.length)){var N=D[0];if(N!="noop"&&N!="stop"&&N!="close")for(var z=1;z<D.length;z++)D[z]=""}}}}return tt(f)}catch{return h}}var $i={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Pu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Fa;function Hi(){}k(Hi,xa),Hi.prototype.g=function(){return new XMLHttpRequest},Hi.prototype.i=function(){return{}},Fa=new Hi;function Un(a,h,f,_){this.j=a,this.i=h,this.l=f,this.R=_||1,this.U=new lt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Su}function Su(){this.i=null,this.g="",this.h=!1}var Cu={},Ua={};function Ba(a,h,f){a.L=1,a.v=Wi(gn(h)),a.m=f,a.P=!0,Du(a,null)}function Du(a,h){a.F=Date.now(),Gi(a),a.A=gn(a.v);var f=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),Hu(f.i,"t",_),a.C=0,f=a.j.J,a.h=new Su,a.g=lh(a.j,f?h:null,!a.m),0<a.O&&(a.M=new Bt(m(a.Y,a,a.g),a.O)),h=a.U,f=a.g,_=a.ca;var D="readystatechange";Array.isArray(D)||(D&&(Fn[0]=D.toString()),D=Fn);for(var N=0;N<D.length;N++){var z=F(f,D[N],_||h.handleEvent,!1,h.h||h);if(!z)break;h.g[z.key]=z}h=a.H?E(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),As(),m_(a.i,a.u,a.A,a.l,a.R,a.m)}Un.prototype.ca=function(a){a=a.target;const h=this.M;h&&_n(a)==3?h.j():this.Y(a)},Un.prototype.Y=function(a){try{if(a==this.g)e:{const ut=_n(this.g);var h=this.g.Ba();const Br=this.g.Z();if(!(3>ut)&&(ut!=3||this.g&&(this.h.h||this.g.oa()||Ju(this.g)))){this.J||ut!=4||h==7||(h==8||0>=Br?As(3):As(2)),ja(this);var f=this.g.Z();this.X=f;t:if(ku(this)){var _=Ju(this.g);a="";var D=_.length,N=_n(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){dr(this),Ps(this);var z="";break t}this.h.i=new l.TextDecoder}for(h=0;h<D;h++)this.h.h=!0,a+=this.h.i.decode(_[h],{stream:!(N&&h==D-1)});_.length=0,this.h.g+=a,this.C=0,z=this.h.g}else z=this.g.oa();if(this.o=f==200,g_(this.i,this.u,this.A,this.l,this.R,ut,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Oe,nt=this.g;if((Oe=nt.g?nt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(Oe)){var be=Oe;break t}}be=null}if(f=be)Mr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,qa(this,f);else{this.o=!1,this.s=3,wt(12),dr(this),Ps(this);break e}}if(this.P){f=!0;let Kt;for(;!this.J&&this.C<z.length;)if(Kt=v_(this,z),Kt==Ua){ut==4&&(this.s=4,wt(14),f=!1),Mr(this.i,this.l,null,"[Incomplete Response]");break}else if(Kt==Cu){this.s=4,wt(15),Mr(this.i,this.l,z,"[Invalid Chunk]"),f=!1;break}else Mr(this.i,this.l,Kt,null),qa(this,Kt);if(ku(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ut!=4||z.length!=0||this.h.h||(this.s=1,wt(16),f=!1),this.o=this.o&&f,!f)Mr(this.i,this.l,z,"[Invalid Chunked Response]"),dr(this),Ps(this);else if(0<z.length&&!this.W){this.W=!0;var ct=this.j;ct.g==this&&ct.ba&&!ct.M&&(ct.j.info("Great, no buffering proxy detected. Bytes received: "+z.length),Wa(ct),ct.M=!0,wt(11))}}else Mr(this.i,this.l,z,null),qa(this,z);ut==4&&dr(this),this.o&&!this.J&&(ut==4?sh(this.j,this):(this.o=!1,Gi(this)))}else L_(this.g),f==400&&0<z.indexOf("Unknown SID")?(this.s=3,wt(12)):(this.s=0,wt(13)),dr(this),Ps(this)}}}catch{}finally{}};function ku(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function v_(a,h){var f=a.C,_=h.indexOf(`
`,f);return _==-1?Ua:(f=Number(h.substring(f,_)),isNaN(f)?Cu:(_+=1,_+f>h.length?Ua:(h=h.slice(_,_+f),a.C=_+f,h)))}Un.prototype.cancel=function(){this.J=!0,dr(this)};function Gi(a){a.S=Date.now()+a.I,Nu(a,a.I)}function Nu(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Rs(m(a.ba,a),h)}function ja(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Un.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(__(this.i,this.A),this.L!=2&&(As(),wt(17)),dr(this),this.s=2,Ps(this)):Nu(this,this.S-a)};function Ps(a){a.j.G==0||a.J||sh(a.j,a)}function dr(a){ja(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,Ts(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function qa(a,h){try{var f=a.j;if(f.G!=0&&(f.g==a||$a(f.h,a))){if(!a.K&&$a(f.h,a)&&f.G==3){try{var _=f.Da.g.parse(h)}catch{_=null}if(Array.isArray(_)&&_.length==3){var D=_;if(D[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)eo(f),Xi(f);else break e;za(f),wt(18)}}else f.za=D[1],0<f.za-f.T&&37500>D[2]&&f.F&&f.v==0&&!f.C&&(f.C=Rs(m(f.Za,f),6e3));if(1>=xu(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else pr(f,11)}else if((a.K||f.g==a)&&eo(f),!q(h))for(D=f.Da.g.parse(h),h=0;h<D.length;h++){let be=D[h];if(f.T=be[0],be=be[1],f.G==2)if(be[0]=="c"){f.K=be[1],f.ia=be[2];const ct=be[3];ct!=null&&(f.la=ct,f.j.info("VER="+f.la));const ut=be[4];ut!=null&&(f.Aa=ut,f.j.info("SVER="+f.Aa));const Br=be[5];Br!=null&&typeof Br=="number"&&0<Br&&(_=1.5*Br,f.L=_,f.j.info("backChannelRequestTimeoutMs_="+_)),_=f;const Kt=a.g;if(Kt){const no=Kt.g?Kt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(no){var N=_.h;N.g||no.indexOf("spdy")==-1&&no.indexOf("quic")==-1&&no.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(Ha(N,N.h),N.h=null))}if(_.D){const Qa=Kt.g?Kt.g.getResponseHeader("X-HTTP-Session-Id"):null;Qa&&(_.ya=Qa,Me(_.I,_.D,Qa))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),_=f;var z=a;if(_.qa=ah(_,_.J?_.ia:null,_.W),z.K){Lu(_.h,z);var Oe=z,nt=_.L;nt&&(Oe.I=nt),Oe.B&&(ja(Oe),Gi(Oe)),_.g=z}else nh(_);0<f.i.length&&Zi(f)}else be[0]!="stop"&&be[0]!="close"||pr(f,7);else f.G==3&&(be[0]=="stop"||be[0]=="close"?be[0]=="stop"?pr(f,7):Ka(f):be[0]!="noop"&&f.l&&f.l.ta(be),f.v=0)}}As(4)}catch{}}var E_=class{constructor(a,h){this.g=a,this.map=h}};function Ou(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Vu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function xu(a){return a.h?1:a.g?a.g.size:0}function $a(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Ha(a,h){a.g?a.g.add(h):a.h=h}function Lu(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Ou.prototype.cancel=function(){if(this.i=Mu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Mu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.D);return h}return S(a.i)}function I_(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var h=[],f=a.length,_=0;_<f;_++)h.push(a[_]);return h}h=[],f=0;for(_ in a)h[f++]=a[_];return h}function T_(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var h=[];a=a.length;for(var f=0;f<a;f++)h.push(f);return h}h=[],f=0;for(const _ in a)h[f++]=_;return h}}}function Fu(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var f=T_(a),_=I_(a),D=_.length,N=0;N<D;N++)h.call(void 0,_[N],f&&f[N],a)}var Uu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function w_(a,h){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var _=a[f].indexOf("="),D=null;if(0<=_){var N=a[f].substring(0,_);D=a[f].substring(_+1)}else N=a[f];h(N,D?decodeURIComponent(D.replace(/\+/g," ")):"")}}}function fr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof fr){this.h=a.h,Ki(this,a.j),this.o=a.o,this.g=a.g,zi(this,a.s),this.l=a.l;var h=a.i,f=new Ds;f.i=h.i,h.g&&(f.g=new Map(h.g),f.h=h.h),Bu(this,f),this.m=a.m}else a&&(h=String(a).match(Uu))?(this.h=!1,Ki(this,h[1]||"",!0),this.o=Ss(h[2]||""),this.g=Ss(h[3]||"",!0),zi(this,h[4]),this.l=Ss(h[5]||"",!0),Bu(this,h[6]||"",!0),this.m=Ss(h[7]||"")):(this.h=!1,this.i=new Ds(null,this.h))}fr.prototype.toString=function(){var a=[],h=this.j;h&&a.push(Cs(h,ju,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Cs(h,ju,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Cs(f,f.charAt(0)=="/"?b_:R_,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Cs(f,S_)),a.join("")};function gn(a){return new fr(a)}function Ki(a,h,f){a.j=f?Ss(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function zi(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function Bu(a,h,f){h instanceof Ds?(a.i=h,C_(a.i,a.h)):(f||(h=Cs(h,P_)),a.i=new Ds(h,a.h))}function Me(a,h,f){a.i.set(h,f)}function Wi(a){return Me(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ss(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Cs(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,A_),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function A_(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var ju=/[#\/\?@]/g,R_=/[#\?:]/g,b_=/[#\?]/g,P_=/[#\?@]/g,S_=/#/g;function Ds(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Bn(a){a.g||(a.g=new Map,a.h=0,a.i&&w_(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}t=Ds.prototype,t.add=function(a,h){Bn(this),this.i=null,a=Fr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function qu(a,h){Bn(a),h=Fr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function $u(a,h){return Bn(a),h=Fr(a,h),a.g.has(h)}t.forEach=function(a,h){Bn(this),this.g.forEach(function(f,_){f.forEach(function(D){a.call(h,D,_,this)},this)},this)},t.na=function(){Bn(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),f=[];for(let _=0;_<h.length;_++){const D=a[_];for(let N=0;N<D.length;N++)f.push(h[_])}return f},t.V=function(a){Bn(this);let h=[];if(typeof a=="string")$u(this,a)&&(h=h.concat(this.g.get(Fr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)h=h.concat(a[f])}return h},t.set=function(a,h){return Bn(this),this.i=null,a=Fr(this,a),$u(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},t.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function Hu(a,h,f){qu(a,h),0<f.length&&(a.i=null,a.g.set(Fr(a,h),S(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var f=0;f<h.length;f++){var _=h[f];const N=encodeURIComponent(String(_)),z=this.V(_);for(_=0;_<z.length;_++){var D=N;z[_]!==""&&(D+="="+encodeURIComponent(String(z[_]))),a.push(D)}}return this.i=a.join("&")};function Fr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function C_(a,h){h&&!a.j&&(Bn(a),a.i=null,a.g.forEach(function(f,_){var D=_.toLowerCase();_!=D&&(qu(this,_),Hu(this,D,f))},a)),a.j=h}function D_(a,h){const f=new bs;if(l.Image){const _=new Image;_.onload=g(jn,f,"TestLoadImage: loaded",!0,h,_),_.onerror=g(jn,f,"TestLoadImage: error",!1,h,_),_.onabort=g(jn,f,"TestLoadImage: abort",!1,h,_),_.ontimeout=g(jn,f,"TestLoadImage: timeout",!1,h,_),l.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else h(!1)}function k_(a,h){const f=new bs,_=new AbortController,D=setTimeout(()=>{_.abort(),jn(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:_.signal}).then(N=>{clearTimeout(D),N.ok?jn(f,"TestPingServer: ok",!0,h):jn(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(D),jn(f,"TestPingServer: error",!1,h)})}function jn(a,h,f,_,D){try{D&&(D.onload=null,D.onerror=null,D.onabort=null,D.ontimeout=null),_(f)}catch{}}function N_(){this.g=new ji}function O_(a,h,f){const _=f||"";try{Fu(a,function(D,N){let z=D;u(D)&&(z=tt(D)),h.push(_+N+"="+encodeURIComponent(z))})}catch(D){throw h.push(_+"type="+encodeURIComponent("_badmap")),D}}function Qi(a){this.l=a.Ub||null,this.j=a.eb||!1}k(Qi,xa),Qi.prototype.g=function(){return new Yi(this.l,this.j)},Qi.prototype.i=function(a){return function(){return a}}({});function Yi(a,h){le.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Yi,le),t=Yi.prototype,t.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,Ns(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||l).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ks(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ns(this)),this.g&&(this.readyState=3,Ns(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Gu(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Gu(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?ks(this):Ns(this),this.readyState==3&&Gu(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,ks(this))},t.Qa=function(a){this.g&&(this.response=a,ks(this))},t.ga=function(){this.g&&ks(this)};function ks(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ns(a)}t.setRequestHeader=function(a,h){this.u.append(a,h)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function Ns(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Yi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Ku(a){let h="";return ce(a,function(f,_){h+=_,h+=":",h+=f,h+=`\r
`}),h}function Ga(a,h,f){e:{for(_ in f){var _=!1;break e}_=!0}_||(f=Ku(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):Me(a,h,f))}function He(a){le.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(He,le);var V_=/^https?$/i,x_=["POST","PUT"];t=He.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,h,f,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Fa.g(),this.v=this.o?Iu(this.o):Iu(Fa),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(N){zu(this,N);return}if(a=f||"",f=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var D in _)f.set(D,_[D]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const N of _.keys())f.set(N,_.get(N));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(f.keys()).find(N=>N.toLowerCase()=="content-type"),D=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(x_,h,void 0))||_||D||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,z]of f)this.g.setRequestHeader(N,z);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Yu(this),this.u=!0,this.g.send(a),this.u=!1}catch(N){zu(this,N)}};function zu(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,Wu(a),Ji(a)}function Wu(a){a.A||(a.A=!0,_e(a,"complete"),_e(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,_e(this,"complete"),_e(this,"abort"),Ji(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ji(this,!0)),He.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Qu(this):this.bb())},t.bb=function(){Qu(this)};function Qu(a){if(a.h&&typeof o<"u"&&(!a.v[1]||_n(a)!=4||a.Z()!=2)){if(a.u&&_n(a)==4)Ze(a.Ea,0,a);else if(_e(a,"readystatechange"),_n(a)==4){a.h=!1;try{const z=a.Z();e:switch(z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var _;if(_=z===0){var D=String(a.D).match(Uu)[1]||null;!D&&l.self&&l.self.location&&(D=l.self.location.protocol.slice(0,-1)),_=!V_.test(D?D.toLowerCase():"")}f=_}if(f)_e(a,"complete"),_e(a,"success");else{a.m=6;try{var N=2<_n(a)?a.g.statusText:""}catch{N=""}a.l=N+" ["+a.Z()+"]",Wu(a)}}finally{Ji(a)}}}}function Ji(a,h){if(a.g){Yu(a);const f=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||_e(a,"ready");try{f.onreadystatechange=_}catch{}}}function Yu(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function _n(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<_n(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),jt(h)}};function Ju(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function L_(a){const h={};a=(a.g&&2<=_n(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(q(a[_]))continue;var f=b(a[_]);const D=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const N=h[D]||[];h[D]=N,N.push(f)}A(h,function(_){return _.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Os(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function Xu(a){this.Aa=0,this.i=[],this.j=new bs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Os("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Os("baseRetryDelayMs",5e3,a),this.cb=Os("retryDelaySeedMs",1e4,a),this.Wa=Os("forwardChannelMaxRetries",2,a),this.wa=Os("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Ou(a&&a.concurrentRequestLimit),this.Da=new N_,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Xu.prototype,t.la=8,t.G=1,t.connect=function(a,h,f,_){wt(0),this.W=a,this.H=h||{},f&&_!==void 0&&(this.H.OSID=f,this.H.OAID=_),this.F=this.X,this.I=ah(this,null,this.W),Zi(this)};function Ka(a){if(Zu(a),a.G==3){var h=a.U++,f=gn(a.I);if(Me(f,"SID",a.K),Me(f,"RID",h),Me(f,"TYPE","terminate"),Vs(a,f),h=new Un(a,a.j,h),h.L=2,h.v=Wi(gn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(h.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=h.v,f=!0),f||(h.g=lh(h.j,null),h.g.ea(h.v)),h.F=Date.now(),Gi(h)}oh(a)}function Xi(a){a.g&&(Wa(a),a.g.cancel(),a.g=null)}function Zu(a){Xi(a),a.u&&(l.clearTimeout(a.u),a.u=null),eo(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Zi(a){if(!Vu(a.h)&&!a.s){a.s=!0;var h=a.Ga;Te||Gt(),ve||(Te(),ve=!0),Nt.add(h,a),a.B=0}}function M_(a,h){return xu(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Rs(m(a.Ga,a,h),ih(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const D=new Un(this,this.j,a);let N=this.o;if(this.S&&(N?(N=E(N),R(N,this.S)):N=this.S),this.m!==null||this.O||(D.H=N,N=null),this.P)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var _=this.i[f];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(h+=_,4096<h){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=th(this,D,h),f=gn(this.I),Me(f,"RID",a),Me(f,"CVER",22),this.D&&Me(f,"X-HTTP-Session-Id",this.D),Vs(this,f),N&&(this.O?h="headers="+encodeURIComponent(String(Ku(N)))+"&"+h:this.m&&Ga(f,this.m,N)),Ha(this.h,D),this.Ua&&Me(f,"TYPE","init"),this.P?(Me(f,"$req",h),Me(f,"SID","null"),D.T=!0,Ba(D,f,null)):Ba(D,f,h),this.G=2}}else this.G==3&&(a?eh(this,a):this.i.length==0||Vu(this.h)||eh(this))};function eh(a,h){var f;h?f=h.l:f=a.U++;const _=gn(a.I);Me(_,"SID",a.K),Me(_,"RID",f),Me(_,"AID",a.T),Vs(a,_),a.m&&a.o&&Ga(_,a.m,a.o),f=new Un(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),h&&(a.i=h.D.concat(a.i)),h=th(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Ha(a.h,f),Ba(f,_,h)}function Vs(a,h){a.H&&ce(a.H,function(f,_){Me(h,_,f)}),a.l&&Fu({},function(f,_){Me(h,_,f)})}function th(a,h,f){f=Math.min(a.i.length,f);var _=a.l?m(a.l.Na,a.l,a):null;e:{var D=a.i;let N=-1;for(;;){const z=["count="+f];N==-1?0<f?(N=D[0].g,z.push("ofs="+N)):N=0:z.push("ofs="+N);let Oe=!0;for(let nt=0;nt<f;nt++){let be=D[nt].g;const ct=D[nt].map;if(be-=N,0>be)N=Math.max(0,D[nt].g-100),Oe=!1;else try{O_(ct,z,"req"+be+"_")}catch{_&&_(ct)}}if(Oe){_=z.join("&");break e}}}return a=a.i.splice(0,f),h.D=a,_}function nh(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;Te||Gt(),ve||(Te(),ve=!0),Nt.add(h,a),a.v=0}}function za(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Rs(m(a.Fa,a),ih(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,rh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Rs(m(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,wt(10),Xi(this),rh(this))};function Wa(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function rh(a){a.g=new Un(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=gn(a.qa);Me(h,"RID","rpc"),Me(h,"SID",a.K),Me(h,"AID",a.T),Me(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&Me(h,"TO",a.ja),Me(h,"TYPE","xmlhttp"),Vs(a,h),a.m&&a.o&&Ga(h,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=Wi(gn(h)),f.m=null,f.P=!0,Du(f,a)}t.Za=function(){this.C!=null&&(this.C=null,Xi(this),za(this),wt(19))};function eo(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function sh(a,h){var f=null;if(a.g==h){eo(a),Wa(a),a.g=null;var _=2}else if($a(a.h,h))f=h.D,Lu(a.h,h),_=1;else return;if(a.G!=0){if(h.o)if(_==1){f=h.m?h.m.length:0,h=Date.now()-h.F;var D=a.B;_=qi(),_e(_,new bu(_,f)),Zi(a)}else nh(a);else if(D=h.s,D==3||D==0&&0<h.X||!(_==1&&M_(a,h)||_==2&&za(a)))switch(f&&0<f.length&&(h=a.h,h.i=h.i.concat(f)),D){case 1:pr(a,5);break;case 4:pr(a,10);break;case 3:pr(a,6);break;default:pr(a,2)}}}function ih(a,h){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*h}function pr(a,h){if(a.j.info("Error code "+h),h==2){var f=m(a.fb,a),_=a.Xa;const D=!_;_=new fr(_||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Ki(_,"https"),Wi(_),D?D_(_.toString(),f):k_(_.toString(),f)}else wt(2);a.G=0,a.l&&a.l.sa(h),oh(a),Zu(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),wt(2)):(this.j.info("Failed to ping google.com"),wt(1))};function oh(a){if(a.G=0,a.ka=[],a.l){const h=Mu(a.h);(h.length!=0||a.i.length!=0)&&(O(a.ka,h),O(a.ka,a.i),a.h.i.length=0,S(a.i),a.i.length=0),a.l.ra()}}function ah(a,h,f){var _=f instanceof fr?gn(f):new fr(f);if(_.g!="")h&&(_.g=h+"."+_.g),zi(_,_.s);else{var D=l.location;_=D.protocol,h=h?h+"."+D.hostname:D.hostname,D=+D.port;var N=new fr(null);_&&Ki(N,_),h&&(N.g=h),D&&zi(N,D),f&&(N.l=f),_=N}return f=a.D,h=a.ya,f&&h&&Me(_,f,h),Me(_,"VER",a.la),Vs(a,_),_}function lh(a,h,f){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new He(new Qi({eb:f})):new He(a.pa),h.Ha(a.J),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function ch(){}t=ch.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function to(){}to.prototype.g=function(a,h){return new Ot(a,h)};function Ot(a,h){le.call(this),this.g=new Xu(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!q(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!q(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Ur(this)}k(Ot,le),Ot.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ot.prototype.close=function(){Ka(this.g)},Ot.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=tt(a),a=f);h.i.push(new E_(h.Ya++,a)),h.G==3&&Zi(h)},Ot.prototype.N=function(){this.g.l=null,delete this.j,Ka(this.g),delete this.g,Ot.aa.N.call(this)};function uh(a){La.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}k(uh,La);function hh(){Ma.call(this),this.status=1}k(hh,Ma);function Ur(a){this.g=a}k(Ur,ch),Ur.prototype.ua=function(){_e(this.g,"a")},Ur.prototype.ta=function(a){_e(this.g,new uh(a))},Ur.prototype.sa=function(a){_e(this.g,new hh)},Ur.prototype.ra=function(){_e(this.g,"b")},to.prototype.createWebChannel=to.prototype.g,Ot.prototype.send=Ot.prototype.o,Ot.prototype.open=Ot.prototype.m,Ot.prototype.close=Ot.prototype.close,pm=function(){return new to},fm=function(){return qi()},dm=hr,jl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},$i.NO_ERROR=0,$i.TIMEOUT=8,$i.HTTP_ERROR=6,yo=$i,Pu.COMPLETE="complete",hm=Pu,Tu.EventType=ws,ws.OPEN="a",ws.CLOSE="b",ws.ERROR="c",ws.MESSAGE="d",le.prototype.listen=le.prototype.K,$s=Tu,He.prototype.listenOnce=He.prototype.L,He.prototype.getLastError=He.prototype.Ka,He.prototype.getLastErrorCode=He.prototype.Ba,He.prototype.getStatus=He.prototype.Z,He.prototype.getResponseJson=He.prototype.Oa,He.prototype.getResponseText=He.prototype.oa,He.prototype.send=He.prototype.ea,He.prototype.setWithCredentials=He.prototype.Ha,um=He}).apply(typeof oo<"u"?oo:typeof self<"u"?self:typeof window<"u"?window:{});const vd="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ft.UNAUTHENTICATED=new ft(null),ft.GOOGLE_CREDENTIALS=new ft("google-credentials-uid"),ft.FIRST_PARTY=new ft("first-party-uid"),ft.MOCK_USER=new ft("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gs="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr=new bc("@firebase/firestore");function Fs(){return Pr.logLevel}function te(t,...e){if(Pr.logLevel<=Ie.DEBUG){const n=e.map(Cc);Pr.debug(`Firestore (${gs}): ${t}`,...n)}}function Nn(t,...e){if(Pr.logLevel<=Ie.ERROR){const n=e.map(Cc);Pr.error(`Firestore (${gs}): ${t}`,...n)}}function ls(t,...e){if(Pr.logLevel<=Ie.WARN){const n=e.map(Cc);Pr.warn(`Firestore (${gs}): ${t}`,...n)}}function Cc(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(t="Unexpected state"){const e=`FIRESTORE (${gs}) INTERNAL ASSERTION FAILED: `+t;throw Nn(e),new Error(e)}function Ne(t,e){t||fe()}function me(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Z extends pn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class WT{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ft.UNAUTHENTICATED))}shutdown(){}}class QT{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class YT{constructor(e){this.t=e,this.currentUser=ft.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Ne(this.o===void 0);let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new Sn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Sn,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},l=c=>{te("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(te("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Sn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(te("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ne(typeof r.accessToken=="string"),new mm(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ne(e===null||typeof e=="string"),new ft(e)}}class JT{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=ft.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class XT{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new JT(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(ft.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ZT{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ew{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){Ne(this.o===void 0);const r=i=>{i.error!=null&&te("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,te("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{te("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):te("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Ne(typeof n.token=="string"),this.R=n.token,new ZT(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tw(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=tw(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function Pe(t,e){return t<e?-1:t>e?1:0}function cs(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new Z(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new Z(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new Z(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Z(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Je.fromMillis(Date.now())}static fromDate(e){return Je.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Je(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Pe(this.nanoseconds,e.nanoseconds):Pe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.timestamp=e}static fromTimestamp(e){return new pe(e)}static min(){return new pe(new Je(0,0))}static max(){return new pe(new Je(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e,n,r){n===void 0?n=0:n>e.length&&fe(),r===void 0?r=e.length-n:r>e.length-n&&fe(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return gi.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof gi?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Fe extends gi{construct(e,n,r){return new Fe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new Z(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Fe(n)}static emptyPath(){return new Fe([])}}const nw=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class it extends gi{construct(e,n,r){return new it(e,n,r)}static isValidIdentifier(e){return nw.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),it.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new it(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new Z(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new Z(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new Z(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new Z(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new it(n)}static emptyPath(){return new it([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.path=e}static fromPath(e){return new ae(Fe.fromString(e))}static fromName(e){return new ae(Fe.fromString(e).popFirst(5))}static empty(){return new ae(Fe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Fe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Fe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ae(new Fe(e.slice()))}}function rw(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=pe.fromTimestamp(r===1e9?new Je(n+1,0):new Je(n,r));return new ar(s,ae.empty(),e)}function sw(t){return new ar(t.readTime,t.key,-1)}class ar{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new ar(pe.min(),ae.empty(),-1)}static max(){return new ar(pe.max(),ae.empty(),-1)}}function iw(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=ae.comparator(t.documentKey,e.documentKey),n!==0?n:Pe(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ow="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class aw{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Di(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==ow)throw t;te("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&fe(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new U((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof U?n:U.resolve(n)}catch(n){return U.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):U.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):U.reject(n)}static resolve(e){return new U((n,r)=>{n(e)})}static reject(e){return new U((n,r)=>{r(e)})}static waitFor(e){return new U((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},c=>r(c))}),o=!0,i===s&&n()})}static or(e){let n=U.resolve(!1);for(const r of e)n=n.next(s=>s?U.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new U((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let c=0;c<i;c++){const u=c;n(e[u]).next(d=>{o[u]=d,++l,l===i&&r(o)},d=>s(d))}})}static doWhile(e,n){return new U((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function lw(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function ki(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Dc.oe=-1;function _a(t){return t==null}function jo(t){return t===0&&1/t==-1/0}function cw(t){return typeof t=="number"&&Number.isInteger(t)&&!jo(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function xr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function _m(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e,n){this.comparator=e,this.root=n||rt.EMPTY}insert(e,n){return new $e(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,rt.BLACK,null,null))}remove(e){return new $e(this.comparator,this.root.remove(e,this.comparator).copy(null,null,rt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ao(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ao(this.root,e,this.comparator,!1)}getReverseIterator(){return new ao(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ao(this.root,e,this.comparator,!0)}}class ao{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class rt{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??rt.RED,this.left=s??rt.EMPTY,this.right=i??rt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new rt(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return rt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return rt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,rt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,rt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw fe();const e=this.left.check();if(e!==this.right.check())throw fe();return e+(this.isRed()?0:1)}}rt.EMPTY=null,rt.RED=!0,rt.BLACK=!1;rt.EMPTY=new class{constructor(){this.size=0}get key(){throw fe()}get value(){throw fe()}get color(){throw fe()}get left(){throw fe()}get right(){throw fe()}copy(e,n,r,s,i){return this}insert(e,n,r){return new rt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this.comparator=e,this.data=new $e(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Id(this.data.getIterator())}getIteratorFrom(e){return new Id(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof ot)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ot(this.comparator);return n.data=e,n}}class Id{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e){this.fields=e,e.sort(it.comparator)}static empty(){return new Mt([])}unionWith(e){let n=new ot(it.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Mt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return cs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new ym("Invalid base64 string: "+i):i}}(e);return new at(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new at(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Pe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}at.EMPTY_BYTE_STRING=new at("");const uw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function lr(t){if(Ne(!!t),typeof t=="string"){let e=0;const n=uw.exec(t);if(Ne(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ke(t.seconds),nanos:Ke(t.nanos)}}function Ke(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Sr(t){return typeof t=="string"?at.fromBase64String(t):at.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kc(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Nc(t){const e=t.mapValue.fields.__previous_value__;return kc(e)?Nc(e):e}function _i(t){const e=lr(t.mapValue.fields.__local_write_time__.timestampValue);return new Je(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hw{constructor(e,n,r,s,i,o,l,c,u){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=u}}class yi{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new yi("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof yi&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lo={mapValue:{}};function Cr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?kc(t)?4:fw(t)?9007199254740991:dw(t)?10:11:fe()}function hn(t,e){if(t===e)return!0;const n=Cr(t);if(n!==Cr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return _i(t).isEqual(_i(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=lr(s.timestampValue),l=lr(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return Sr(s.bytesValue).isEqual(Sr(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Ke(s.geoPointValue.latitude)===Ke(i.geoPointValue.latitude)&&Ke(s.geoPointValue.longitude)===Ke(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ke(s.integerValue)===Ke(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Ke(s.doubleValue),l=Ke(i.doubleValue);return o===l?jo(o)===jo(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return cs(t.arrayValue.values||[],e.arrayValue.values||[],hn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(Ed(o)!==Ed(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!hn(o[c],l[c])))return!1;return!0}(t,e);default:return fe()}}function vi(t,e){return(t.values||[]).find(n=>hn(n,e))!==void 0}function us(t,e){if(t===e)return 0;const n=Cr(t),r=Cr(e);if(n!==r)return Pe(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Pe(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=Ke(i.integerValue||i.doubleValue),c=Ke(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(t,e);case 3:return Td(t.timestampValue,e.timestampValue);case 4:return Td(_i(t),_i(e));case 5:return Pe(t.stringValue,e.stringValue);case 6:return function(i,o){const l=Sr(i),c=Sr(o);return l.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),c=o.split("/");for(let u=0;u<l.length&&u<c.length;u++){const d=Pe(l[u],c[u]);if(d!==0)return d}return Pe(l.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=Pe(Ke(i.latitude),Ke(o.latitude));return l!==0?l:Pe(Ke(i.longitude),Ke(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return wd(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,c,u,d;const p=i.fields||{},m=o.fields||{},g=(l=p.value)===null||l===void 0?void 0:l.arrayValue,k=(c=m.value)===null||c===void 0?void 0:c.arrayValue,S=Pe(((u=g==null?void 0:g.values)===null||u===void 0?void 0:u.length)||0,((d=k==null?void 0:k.values)===null||d===void 0?void 0:d.length)||0);return S!==0?S:wd(g,k)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===lo.mapValue&&o===lo.mapValue)return 0;if(i===lo.mapValue)return 1;if(o===lo.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),u=o.fields||{},d=Object.keys(u);c.sort(),d.sort();for(let p=0;p<c.length&&p<d.length;++p){const m=Pe(c[p],d[p]);if(m!==0)return m;const g=us(l[c[p]],u[d[p]]);if(g!==0)return g}return Pe(c.length,d.length)}(t.mapValue,e.mapValue);default:throw fe()}}function Td(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Pe(t,e);const n=lr(t),r=lr(e),s=Pe(n.seconds,r.seconds);return s!==0?s:Pe(n.nanos,r.nanos)}function wd(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=us(n[s],r[s]);if(i)return i}return Pe(n.length,r.length)}function hs(t){return ql(t)}function ql(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=lr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Sr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return ae.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=ql(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${ql(n.fields[o])}`;return s+"}"}(t.mapValue):fe()}function Ad(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function $l(t){return!!t&&"integerValue"in t}function Oc(t){return!!t&&"arrayValue"in t}function Rd(t){return!!t&&"nullValue"in t}function bd(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function vo(t){return!!t&&"mapValue"in t}function dw(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function ni(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return xr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=ni(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ni(t.arrayValue.values[n]);return e}return Object.assign({},t)}function fw(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e){this.value=e}static empty(){return new kt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!vo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ni(n)}setAll(e){let n=it.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=ni(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());vo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return hn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];vo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){xr(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new kt(ni(this.value))}}function vm(t){const e=[];return xr(t.fields,(n,r)=>{const s=new it([n]);if(vo(r)){const i=vm(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Mt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new mt(e,0,pe.min(),pe.min(),pe.min(),kt.empty(),0)}static newFoundDocument(e,n,r,s){return new mt(e,1,n,pe.min(),r,s,0)}static newNoDocument(e,n){return new mt(e,2,n,pe.min(),pe.min(),kt.empty(),0)}static newUnknownDocument(e,n){return new mt(e,3,n,pe.min(),pe.min(),kt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(pe.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=kt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=kt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=pe.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof mt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new mt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(e,n){this.position=e,this.inclusive=n}}function Pd(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=ae.comparator(ae.fromName(o.referenceValue),n.key):r=us(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Sd(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!hn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e,n="asc"){this.field=e,this.dir=n}}function pw(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em{}class Qe extends Em{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new gw(e,n,r):n==="array-contains"?new vw(e,r):n==="in"?new Ew(e,r):n==="not-in"?new Iw(e,r):n==="array-contains-any"?new Tw(e,r):new Qe(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new _w(e,r):new yw(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(us(n,this.value)):n!==null&&Cr(this.value)===Cr(n)&&this.matchesComparison(us(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return fe()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Jt extends Em{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new Jt(e,n)}matches(e){return Im(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Im(t){return t.op==="and"}function Tm(t){return mw(t)&&Im(t)}function mw(t){for(const e of t.filters)if(e instanceof Jt)return!1;return!0}function Hl(t){if(t instanceof Qe)return t.field.canonicalString()+t.op.toString()+hs(t.value);if(Tm(t))return t.filters.map(e=>Hl(e)).join(",");{const e=t.filters.map(n=>Hl(n)).join(",");return`${t.op}(${e})`}}function wm(t,e){return t instanceof Qe?function(r,s){return s instanceof Qe&&r.op===s.op&&r.field.isEqual(s.field)&&hn(r.value,s.value)}(t,e):t instanceof Jt?function(r,s){return s instanceof Jt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&wm(o,s.filters[l]),!0):!1}(t,e):void fe()}function Am(t){return t instanceof Qe?function(n){return`${n.field.canonicalString()} ${n.op} ${hs(n.value)}`}(t):t instanceof Jt?function(n){return n.op.toString()+" {"+n.getFilters().map(Am).join(" ,")+"}"}(t):"Filter"}class gw extends Qe{constructor(e,n,r){super(e,n,r),this.key=ae.fromName(r.referenceValue)}matches(e){const n=ae.comparator(e.key,this.key);return this.matchesComparison(n)}}class _w extends Qe{constructor(e,n){super(e,"in",n),this.keys=Rm("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class yw extends Qe{constructor(e,n){super(e,"not-in",n),this.keys=Rm("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Rm(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>ae.fromName(r.referenceValue))}class vw extends Qe{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Oc(n)&&vi(n.arrayValue,this.value)}}class Ew extends Qe{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&vi(this.value.arrayValue,n)}}class Iw extends Qe{constructor(e,n){super(e,"not-in",n)}matches(e){if(vi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!vi(this.value.arrayValue,n)}}class Tw extends Qe{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Oc(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>vi(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ww{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function Cd(t,e=null,n=[],r=[],s=null,i=null,o=null){return new ww(t,e,n,r,s,i,o)}function Vc(t){const e=me(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Hl(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),_a(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>hs(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>hs(r)).join(",")),e.ue=n}return e.ue}function xc(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!pw(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!wm(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Sd(t.startAt,e.startAt)&&Sd(t.endAt,e.endAt)}function Gl(t){return ae.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Aw(t,e,n,r,s,i,o,l){return new Ni(t,e,n,r,s,i,o,l)}function Lc(t){return new Ni(t)}function Dd(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function bm(t){return t.collectionGroup!==null}function ri(t){const e=me(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new ot(it.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(u=>{u.isInequality()&&(l=l.add(u.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new $o(i,r))}),n.has(it.keyField().canonicalString())||e.ce.push(new $o(it.keyField(),r))}return e.ce}function sn(t){const e=me(t);return e.le||(e.le=Rw(e,ri(t))),e.le}function Rw(t,e){if(t.limitType==="F")return Cd(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new $o(s.field,i)});const n=t.endAt?new qo(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new qo(t.startAt.position,t.startAt.inclusive):null;return Cd(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Kl(t,e){const n=t.filters.concat([e]);return new Ni(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function zl(t,e,n){return new Ni(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ya(t,e){return xc(sn(t),sn(e))&&t.limitType===e.limitType}function Pm(t){return`${Vc(sn(t))}|lt:${t.limitType}`}function Hr(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>Am(s)).join(", ")}]`),_a(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>hs(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>hs(s)).join(",")),`Target(${r})`}(sn(t))}; limitType=${t.limitType})`}function va(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):ae.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of ri(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,c){const u=Pd(o,l,c);return o.inclusive?u<=0:u<0}(r.startAt,ri(r),s)||r.endAt&&!function(o,l,c){const u=Pd(o,l,c);return o.inclusive?u>=0:u>0}(r.endAt,ri(r),s))}(t,e)}function bw(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Sm(t){return(e,n)=>{let r=!1;for(const s of ri(t)){const i=Pw(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Pw(t,e,n){const r=t.field.isKeyField()?ae.comparator(e.key,n.key):function(i,o,l){const c=o.data.field(i),u=l.data.field(i);return c!==null&&u!==null?us(c,u):fe()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return fe()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){xr(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return _m(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sw=new $e(ae.comparator);function On(){return Sw}const Cm=new $e(ae.comparator);function Hs(...t){let e=Cm;for(const n of t)e=e.insert(n.key,n);return e}function Dm(t){let e=Cm;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Er(){return si()}function km(){return si()}function si(){return new _s(t=>t.toString(),(t,e)=>t.isEqual(e))}const Cw=new $e(ae.comparator),Dw=new ot(ae.comparator);function Ee(...t){let e=Dw;for(const n of t)e=e.add(n);return e}const kw=new ot(Pe);function Nw(){return kw}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:jo(e)?"-0":e}}function Nm(t){return{integerValue:""+t}}function Ow(t,e){return cw(e)?Nm(e):Mc(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(){this._=void 0}}function Vw(t,e,n){return t instanceof Ei?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&kc(i)&&(i=Nc(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof Ii?Vm(t,e):t instanceof Ti?xm(t,e):function(s,i){const o=Om(s,i),l=kd(o)+kd(s.Pe);return $l(o)&&$l(s.Pe)?Nm(l):Mc(s.serializer,l)}(t,e)}function xw(t,e,n){return t instanceof Ii?Vm(t,e):t instanceof Ti?xm(t,e):n}function Om(t,e){return t instanceof Ho?function(r){return $l(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Ei extends Ea{}class Ii extends Ea{constructor(e){super(),this.elements=e}}function Vm(t,e){const n=Lm(e);for(const r of t.elements)n.some(s=>hn(s,r))||n.push(r);return{arrayValue:{values:n}}}class Ti extends Ea{constructor(e){super(),this.elements=e}}function xm(t,e){let n=Lm(e);for(const r of t.elements)n=n.filter(s=>!hn(s,r));return{arrayValue:{values:n}}}class Ho extends Ea{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function kd(t){return Ke(t.integerValue||t.doubleValue)}function Lm(t){return Oc(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lw{constructor(e,n){this.field=e,this.transform=n}}function Mw(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof Ii&&s instanceof Ii||r instanceof Ti&&s instanceof Ti?cs(r.elements,s.elements,hn):r instanceof Ho&&s instanceof Ho?hn(r.Pe,s.Pe):r instanceof Ei&&s instanceof Ei}(t.transform,e.transform)}class Fw{constructor(e,n){this.version=e,this.transformResults=n}}class Qt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Qt}static exists(e){return new Qt(void 0,e)}static updateTime(e){return new Qt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Eo(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Ia{}function Mm(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Um(t.key,Qt.none()):new Oi(t.key,t.data,Qt.none());{const n=t.data,r=kt.empty();let s=new ot(it.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new ur(t.key,r,new Mt(s.toArray()),Qt.none())}}function Uw(t,e,n){t instanceof Oi?function(s,i,o){const l=s.value.clone(),c=Od(s.fieldTransforms,i,o.transformResults);l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof ur?function(s,i,o){if(!Eo(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=Od(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(Fm(s)),c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function ii(t,e,n,r){return t instanceof Oi?function(i,o,l,c){if(!Eo(i.precondition,o))return l;const u=i.value.clone(),d=Vd(i.fieldTransforms,c,o);return u.setAll(d),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(t,e,n,r):t instanceof ur?function(i,o,l,c){if(!Eo(i.precondition,o))return l;const u=Vd(i.fieldTransforms,c,o),d=o.data;return d.setAll(Fm(i)),d.setAll(u),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(i,o,l){return Eo(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function Bw(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=Om(r.transform,s||null);i!=null&&(n===null&&(n=kt.empty()),n.set(r.field,i))}return n||null}function Nd(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&cs(r,s,(i,o)=>Mw(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Oi extends Ia{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ur extends Ia{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Fm(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Od(t,e,n){const r=new Map;Ne(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,xw(o,l,n[s]))}return r}function Vd(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,Vw(i,o,e))}return r}class Um extends Ia{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class jw extends Ia{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Uw(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=ii(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=ii(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=km();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const c=Mm(o,l);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(pe.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),Ee())}isEqual(e){return this.batchId===e.batchId&&cs(this.mutations,e.mutations,(n,r)=>Nd(n,r))&&cs(this.baseMutations,e.baseMutations,(n,r)=>Nd(n,r))}}class Fc{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){Ne(e.mutations.length===r.length);let s=function(){return Cw}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Fc(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $w{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var We,Ae;function Gw(t){switch(t){default:return fe();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function Bm(t){if(t===void 0)return Nn("GRPC error has no .code"),M.UNKNOWN;switch(t){case We.OK:return M.OK;case We.CANCELLED:return M.CANCELLED;case We.UNKNOWN:return M.UNKNOWN;case We.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case We.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case We.INTERNAL:return M.INTERNAL;case We.UNAVAILABLE:return M.UNAVAILABLE;case We.UNAUTHENTICATED:return M.UNAUTHENTICATED;case We.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case We.NOT_FOUND:return M.NOT_FOUND;case We.ALREADY_EXISTS:return M.ALREADY_EXISTS;case We.PERMISSION_DENIED:return M.PERMISSION_DENIED;case We.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case We.ABORTED:return M.ABORTED;case We.OUT_OF_RANGE:return M.OUT_OF_RANGE;case We.UNIMPLEMENTED:return M.UNIMPLEMENTED;case We.DATA_LOSS:return M.DATA_LOSS;default:return fe()}}(Ae=We||(We={}))[Ae.OK=0]="OK",Ae[Ae.CANCELLED=1]="CANCELLED",Ae[Ae.UNKNOWN=2]="UNKNOWN",Ae[Ae.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ae[Ae.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ae[Ae.NOT_FOUND=5]="NOT_FOUND",Ae[Ae.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ae[Ae.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ae[Ae.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ae[Ae.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ae[Ae.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ae[Ae.ABORTED=10]="ABORTED",Ae[Ae.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ae[Ae.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ae[Ae.INTERNAL=13]="INTERNAL",Ae[Ae.UNAVAILABLE=14]="UNAVAILABLE",Ae[Ae.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kw(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zw=new Ar([4294967295,4294967295],0);function xd(t){const e=Kw().encode(t),n=new cm;return n.update(e),new Uint8Array(n.digest())}function Ld(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Ar([n,r],0),new Ar([s,i],0)]}class Uc{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Gs(`Invalid padding: ${n}`);if(r<0)throw new Gs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Gs(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Gs(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Ar.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(Ar.fromNumber(r)));return s.compare(zw)===1&&(s=new Ar([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=xd(e),[r,s]=Ld(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Uc(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=xd(e),[r,s]=Ld(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Gs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Vi.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Ta(pe.min(),s,new $e(Pe),On(),Ee())}}class Vi{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Vi(r,n,Ee(),Ee(),Ee())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class jm{constructor(e,n){this.targetId=e,this.me=n}}class qm{constructor(e,n,r=at.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Md{constructor(){this.fe=0,this.ge=Ud(),this.pe=at.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=Ee(),n=Ee(),r=Ee();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:fe()}}),new Vi(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=Ud()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Ne(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Ww{constructor(e){this.Le=e,this.Be=new Map,this.ke=On(),this.qe=Fd(),this.Qe=new $e(Pe)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:fe()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if(Gl(i))if(r===0){const o=new ae(i.path);this.Ue(n,o,mt.newNoDocument(o,pe.min()))}else Ne(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),c=l?this.Xe(l,e,o):1;if(c!==0){this.je(n);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,u)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=Sr(r).toUint8Array()}catch(c){if(c instanceof ym)return ls("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Uc(o,s,i)}catch(c){return ls(c instanceof Gs?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&Gl(l.target)){const c=new ae(l.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,mt.newNoDocument(c,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=Ee();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(c=>{const u=this.Je(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new Ta(e,n,this.Qe,this.ke,r);return this.ke=On(),this.qe=Fd(),this.Qe=new $e(Pe),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new Md,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new ot(Pe),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||te("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Md),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function Fd(){return new $e(ae.comparator)}function Ud(){return new $e(ae.comparator)}const Qw={asc:"ASCENDING",desc:"DESCENDING"},Yw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Jw={and:"AND",or:"OR"};class Xw{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Wl(t,e){return t.useProto3Json||_a(e)?e:{value:e}}function Go(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function $m(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Zw(t,e){return Go(t,e.toTimestamp())}function on(t){return Ne(!!t),pe.fromTimestamp(function(n){const r=lr(n);return new Je(r.seconds,r.nanos)}(t))}function Bc(t,e){return Ql(t,e).canonicalString()}function Ql(t,e){const n=function(s){return new Fe(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Hm(t){const e=Fe.fromString(t);return Ne(Qm(e)),e}function Yl(t,e){return Bc(t.databaseId,e.path)}function pl(t,e){const n=Hm(e);if(n.get(1)!==t.databaseId.projectId)throw new Z(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Z(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new ae(Km(n))}function Gm(t,e){return Bc(t.databaseId,e)}function eA(t){const e=Hm(t);return e.length===4?Fe.emptyPath():Km(e)}function Jl(t){return new Fe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Km(t){return Ne(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Bd(t,e,n){return{name:Yl(t,e),fields:n.value.mapValue.fields}}function tA(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:fe()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(u,d){return u.useProto3Json?(Ne(d===void 0||typeof d=="string"),at.fromBase64String(d||"")):(Ne(d===void 0||d instanceof Buffer||d instanceof Uint8Array),at.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(u){const d=u.code===void 0?M.UNKNOWN:Bm(u.code);return new Z(d,u.message||"")}(o);n=new qm(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=pl(t,r.document.name),i=on(r.document.updateTime),o=r.document.createTime?on(r.document.createTime):pe.min(),l=new kt({mapValue:{fields:r.document.fields}}),c=mt.newFoundDocument(s,i,o,l),u=r.targetIds||[],d=r.removedTargetIds||[];n=new Io(u,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=pl(t,r.document),i=r.readTime?on(r.readTime):pe.min(),o=mt.newNoDocument(s,i),l=r.removedTargetIds||[];n=new Io([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=pl(t,r.document),i=r.removedTargetIds||[];n=new Io([],i,s,null)}else{if(!("filter"in e))return fe();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Hw(s,i),l=r.targetId;n=new jm(l,o)}}return n}function nA(t,e){let n;if(e instanceof Oi)n={update:Bd(t,e.key,e.value)};else if(e instanceof Um)n={delete:Yl(t,e.key)};else if(e instanceof ur)n={update:Bd(t,e.key,e.data),updateMask:hA(e.fieldMask)};else{if(!(e instanceof jw))return fe();n={verify:Yl(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof Ei)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ii)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ti)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ho)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw fe()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:Zw(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:fe()}(t,e.precondition)),n}function rA(t,e){return t&&t.length>0?(Ne(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?on(s.updateTime):on(i);return o.isEqual(pe.min())&&(o=on(i)),new Fw(o,s.transformResults||[])}(n,e))):[]}function sA(t,e){return{documents:[Gm(t,e.path)]}}function iA(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Gm(t,s);const i=function(u){if(u.length!==0)return Wm(Jt.create(u,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(u){if(u.length!==0)return u.map(d=>function(m){return{field:Gr(m.field),direction:lA(m.dir)}}(d))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Wl(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{_t:n,parent:s}}function oA(t){let e=eA(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Ne(r===1);const d=n.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=function(p){const m=zm(p);return m instanceof Jt&&Tm(m)?m.getFilters():[m]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(m=>function(k){return new $o(Kr(k.field),function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(m))}(n.orderBy));let l=null;n.limit&&(l=function(p){let m;return m=typeof p=="object"?p.value:p,_a(m)?null:m}(n.limit));let c=null;n.startAt&&(c=function(p){const m=!!p.before,g=p.values||[];return new qo(g,m)}(n.startAt));let u=null;return n.endAt&&(u=function(p){const m=!p.before,g=p.values||[];return new qo(g,m)}(n.endAt)),Aw(e,s,o,i,l,"F",c,u)}function aA(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return fe()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function zm(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Kr(n.unaryFilter.field);return Qe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Kr(n.unaryFilter.field);return Qe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Kr(n.unaryFilter.field);return Qe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Kr(n.unaryFilter.field);return Qe.create(o,"!=",{nullValue:"NULL_VALUE"});default:return fe()}}(t):t.fieldFilter!==void 0?function(n){return Qe.create(Kr(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return fe()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Jt.create(n.compositeFilter.filters.map(r=>zm(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return fe()}}(n.compositeFilter.op))}(t):fe()}function lA(t){return Qw[t]}function cA(t){return Yw[t]}function uA(t){return Jw[t]}function Gr(t){return{fieldPath:t.canonicalString()}}function Kr(t){return it.fromServerFormat(t.fieldPath)}function Wm(t){return t instanceof Qe?function(n){if(n.op==="=="){if(bd(n.value))return{unaryFilter:{field:Gr(n.field),op:"IS_NAN"}};if(Rd(n.value))return{unaryFilter:{field:Gr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(bd(n.value))return{unaryFilter:{field:Gr(n.field),op:"IS_NOT_NAN"}};if(Rd(n.value))return{unaryFilter:{field:Gr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Gr(n.field),op:cA(n.op),value:n.value}}}(t):t instanceof Jt?function(n){const r=n.getFilters().map(s=>Wm(s));return r.length===1?r[0]:{compositeFilter:{op:uA(n.op),filters:r}}}(t):fe()}function hA(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Qm(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e,n,r,s,i=pe.min(),o=pe.min(),l=at.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Xn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Xn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dA{constructor(e){this.ct=e}}function fA(t){const e=oA({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?zl(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pA{constructor(){this.un=new mA}addToCollectionParentIndex(e,n){return this.un.add(n),U.resolve()}getCollectionParents(e,n){return U.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return U.resolve()}deleteFieldIndex(e,n){return U.resolve()}deleteAllFieldIndexes(e){return U.resolve()}createTargetIndexes(e,n){return U.resolve()}getDocumentsMatchingTarget(e,n){return U.resolve(null)}getIndexType(e,n){return U.resolve(0)}getFieldIndexes(e,n){return U.resolve([])}getNextCollectionGroupToUpdate(e){return U.resolve(null)}getMinOffset(e,n){return U.resolve(ar.min())}getMinOffsetFromCollectionGroup(e,n){return U.resolve(ar.min())}updateCollectionGroup(e,n,r){return U.resolve()}updateIndexEntries(e,n){return U.resolve()}}class mA{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new ot(Fe.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ot(Fe.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new ds(0)}static kn(){return new ds(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gA{constructor(){this.changes=new _s(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,mt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?U.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _A{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yA{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&ii(r.mutation,s,Mt.empty(),Je.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,Ee()).next(()=>r))}getLocalViewOfDocuments(e,n,r=Ee()){const s=Er();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=Hs();return i.forEach((l,c)=>{o=o.insert(l,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Er();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,Ee()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=On();const o=si(),l=function(){return si()}();return n.forEach((c,u)=>{const d=r.get(u.key);s.has(u.key)&&(d===void 0||d.mutation instanceof ur)?i=i.insert(u.key,u):d!==void 0?(o.set(u.key,d.mutation.getFieldMask()),ii(d.mutation,u,d.mutation.getFieldMask(),Je.now())):o.set(u.key,Mt.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((u,d)=>o.set(u,d)),n.forEach((u,d)=>{var p;return l.set(u,new _A(d,(p=o.get(u))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,n){const r=si();let s=new $e((o,l)=>o-l),i=Ee();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(c=>{const u=n.get(c);if(u===null)return;let d=r.get(c)||Mt.empty();d=l.applyToLocalView(u,d),r.set(c,d);const p=(s.get(l.batchId)||Ee()).add(c);s=s.insert(l.batchId,p)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),u=c.key,d=c.value,p=km();d.forEach(m=>{if(!i.has(m)){const g=Mm(n.get(m),r.get(m));g!==null&&p.set(m,g),i=i.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,p))}return U.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return ae.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):bm(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):U.resolve(Er());let l=-1,c=i;return o.next(u=>U.forEach(u,(d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(d)?U.resolve():this.remoteDocumentCache.getEntry(e,d).next(m=>{c=c.insert(d,m)}))).next(()=>this.populateOverlays(e,u,i)).next(()=>this.computeViews(e,c,u,Ee())).next(d=>({batchId:l,changes:Dm(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new ae(n)).next(r=>{let s=Hs();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=Hs();return this.indexManager.getCollectionParents(e,i).next(l=>U.forEach(l,c=>{const u=function(p,m){return new Ni(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,r,s).next(d=>{d.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((c,u)=>{const d=u.getKey();o.get(d)===null&&(o=o.insert(d,mt.newInvalidDocument(d)))});let l=Hs();return o.forEach((c,u)=>{const d=i.get(c);d!==void 0&&ii(d.mutation,u,Mt.empty(),Je.now()),va(n,u)&&(l=l.insert(c,u))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return U.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:on(s.createTime)}}(n)),U.resolve()}getNamedQuery(e,n){return U.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(s){return{name:s.name,query:fA(s.bundledQuery),readTime:on(s.readTime)}}(n)),U.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EA{constructor(){this.overlays=new $e(ae.comparator),this.Ir=new Map}getOverlay(e,n){return U.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Er();return U.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),U.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),U.resolve()}getOverlaysForCollection(e,n,r){const s=Er(),i=n.length+1,o=new ae(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,u=c.getKey();if(!n.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return U.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new $e((u,d)=>u-d);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===n&&u.largestBatchId>r){let d=i.get(u.largestBatchId);d===null&&(d=Er(),i=i.insert(u.largestBatchId,d)),d.set(u.getKey(),u)}}const l=Er(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((u,d)=>l.set(u,d)),!(l.size()>=s)););return U.resolve(l)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new $w(n,r));let i=this.Ir.get(n);i===void 0&&(i=Ee(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IA{constructor(){this.sessionToken=at.EMPTY_BYTE_STRING}getSessionToken(e){return U.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,U.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(){this.Tr=new ot(Xe.Er),this.dr=new ot(Xe.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new Xe(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new Xe(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new ae(new Fe([])),r=new Xe(n,e),s=new Xe(n,e+1),i=[];return this.dr.forEachInRange([r,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new ae(new Fe([])),r=new Xe(n,e),s=new Xe(n,e+1);let i=Ee();return this.dr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Xe(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Xe{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return ae.comparator(e.key,n.key)||Pe(e.wr,n.wr)}static Ar(e,n){return Pe(e.wr,n.wr)||ae.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TA{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new ot(Xe.Er)}checkEmpty(e){return U.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new qw(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.br=this.br.add(new Xe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return U.resolve(o)}lookupMutationBatch(e,n){return U.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return U.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return U.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return U.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Xe(n,0),s=new Xe(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],o=>{const l=this.Dr(o.wr);i.push(l)}),U.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new ot(Pe);return n.forEach(s=>{const i=new Xe(s,0),o=new Xe(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{r=r.add(l.wr)})}),U.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;ae.isDocumentKey(i)||(i=i.child(""));const o=new Xe(new ae(i),0);let l=new ot(Pe);return this.br.forEachWhile(c=>{const u=c.key.path;return!!r.isPrefixOf(u)&&(u.length===s&&(l=l.add(c.wr)),!0)},o),U.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){Ne(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return U.forEach(n.mutations,s=>{const i=new Xe(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new Xe(n,0),s=this.br.firstAfterOrEqual(r);return U.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,U.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wA{constructor(e){this.Mr=e,this.docs=function(){return new $e(ae.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return U.resolve(r?r.document.mutableCopy():mt.newInvalidDocument(n))}getEntries(e,n){let r=On();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():mt.newInvalidDocument(s))}),U.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=On();const o=n.path,l=new ae(o.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:u,value:{document:d}}=c.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||iw(sw(d),r)<=0||(s.has(d.key)||va(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return U.resolve(i)}getAllFromCollectionGroup(e,n,r,s){fe()}Or(e,n){return U.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new AA(this)}getSize(e){return U.resolve(this.size)}}class AA extends gA{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),U.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RA{constructor(e){this.persistence=e,this.Nr=new _s(n=>Vc(n),xc),this.lastRemoteSnapshotVersion=pe.min(),this.highestTargetId=0,this.Lr=0,this.Br=new jc,this.targetCount=0,this.kr=ds.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),U.resolve()}getLastRemoteSnapshotVersion(e){return U.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return U.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),U.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),U.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new ds(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,U.resolve()}updateTargetData(e,n){return this.Kn(n),U.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,U.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),U.waitFor(i).next(()=>s)}getTargetCount(e){return U.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return U.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),U.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),U.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),U.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return U.resolve(r)}containsKey(e,n){return U.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bA{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Dc(0),this.Kr=!1,this.Kr=!0,this.$r=new IA,this.referenceDelegate=e(this),this.Ur=new RA(this),this.indexManager=new pA,this.remoteDocumentCache=function(s){return new wA(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new dA(n),this.Gr=new vA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new EA,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new TA(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){te("MemoryPersistence","Starting transaction:",e);const s=new PA(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return U.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class PA extends aw{constructor(e){super(),this.currentSequenceNumber=e}}class qc{constructor(e){this.persistence=e,this.Jr=new jc,this.Yr=null}static Zr(e){return new qc(e)}get Xr(){if(this.Yr)return this.Yr;throw fe()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),U.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),U.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),U.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return U.forEach(this.Xr,r=>{const s=ae.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,pe.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return U.or([()=>U.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=Ee(),s=Ee();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new $c(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CA{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return kI()?8:lw(Et())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new SA;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(Fs()<=Ie.DEBUG&&te("QueryEngine","SDK will not create cache indexes for query:",Hr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),U.resolve()):(Fs()<=Ie.DEBUG&&te("QueryEngine","Query:",Hr(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Fs()<=Ie.DEBUG&&te("QueryEngine","The SDK decides to create cache indexes for query:",Hr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,sn(n))):U.resolve())}Yi(e,n){if(Dd(n))return U.resolve(null);let r=sn(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=zl(n,null,"F"),r=sn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=Ee(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(c=>{const u=this.ts(n,l);return this.ns(n,u,o,c.readTime)?this.Yi(e,zl(n,null,"F")):this.rs(e,u,n,c)}))})))}Zi(e,n,r,s){return Dd(n)||s.isEqual(pe.min())?U.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const o=this.ts(n,i);return this.ns(n,o,r,s)?U.resolve(null):(Fs()<=Ie.DEBUG&&te("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Hr(n)),this.rs(e,o,n,rw(s,-1)).next(l=>l))})}ts(e,n){let r=new ot(Sm(e));return n.forEach((s,i)=>{va(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return Fs()<=Ie.DEBUG&&te("QueryEngine","Using full collection scan to execute query:",Hr(n)),this.Ji.getDocumentsMatchingQuery(e,n,ar.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DA{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new $e(Pe),this._s=new _s(i=>Vc(i),xc),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new yA(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function kA(t,e,n,r){return new DA(t,e,n,r)}async function Ym(t,e){const n=me(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let c=Ee();for(const u of s){o.push(u.batchId);for(const d of u.mutations)c=c.add(d.key)}for(const u of i){l.push(u.batchId);for(const d of u.mutations)c=c.add(d.key)}return n.localDocuments.getDocuments(r,c).next(u=>({hs:u,removedBatchIds:o,addedBatchIds:l}))})})}function NA(t,e){const n=me(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,c,u,d){const p=u.batch,m=p.keys();let g=U.resolve();return m.forEach(k=>{g=g.next(()=>d.getEntry(c,k)).next(S=>{const O=u.docVersions.get(k);Ne(O!==null),S.version.compareTo(O)<0&&(p.applyToRemoteDocument(S,u),S.isValidDocument()&&(S.setReadTime(u.commitVersion),d.addEntry(S)))})}),g.next(()=>l.mutationQueue.removeMutationBatch(c,p))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let c=Ee();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(c=c.add(l.batch.mutations[u].key));return c}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function Jm(t){const e=me(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function OA(t,e){const n=me(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];e.targetChanges.forEach((d,p)=>{const m=s.get(p);if(!m)return;l.push(n.Ur.removeMatchingKeys(i,d.removedDocuments,p).next(()=>n.Ur.addMatchingKeys(i,d.addedDocuments,p)));let g=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?g=g.withResumeToken(at.EMPTY_BYTE_STRING,pe.min()).withLastLimboFreeSnapshotVersion(pe.min()):d.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(d.resumeToken,r)),s=s.insert(p,g),function(S,O,H){return S.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-S.snapshotVersion.toMicroseconds()>=3e8?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0}(m,g,d)&&l.push(n.Ur.updateTargetData(i,g))});let c=On(),u=Ee();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))}),l.push(VA(i,o,e.documentUpdates).next(d=>{c=d.Ps,u=d.Is})),!r.isEqual(pe.min())){const d=n.Ur.getLastRemoteSnapshotVersion(i).next(p=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(d)}return U.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,u)).next(()=>c)}).then(i=>(n.os=s,i))}function VA(t,e,n){let r=Ee(),s=Ee();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=On();return n.forEach((l,c)=>{const u=i.get(l);c.isFoundDocument()!==u.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(pe.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):te("LocalStore","Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",c.version)}),{Ps:o,Is:s}})}function xA(t,e){const n=me(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function LA(t,e){const n=me(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,U.resolve(s)):n.Ur.allocateTargetId(r).next(o=>(s=new Xn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Xl(t,e,n){const r=me(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!ki(o))throw o;te("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function jd(t,e,n){const r=me(t);let s=pe.min(),i=Ee();return r.persistence.runTransaction("Execute query","readwrite",o=>function(c,u,d){const p=me(c),m=p._s.get(d);return m!==void 0?U.resolve(p.os.get(m)):p.Ur.getTargetData(u,d)}(r,o,sn(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(c=>{i=c})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?s:pe.min(),n?i:Ee())).next(l=>(MA(r,bw(e),l),{documents:l,Ts:i})))}function MA(t,e,n){let r=t.us.get(e)||pe.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class qd{constructor(){this.activeTargetIds=Nw()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class FA{constructor(){this.so=new qd,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new qd,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UA{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){te("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){te("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let co=null;function ml(){return co===null?co=function(){return 268435456+Math.round(2147483648*Math.random())}():co++,"0x"+co.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jA{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht="WebChannelConnection";class qA extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,o){const l=ml(),c=this.xo(n,r.toUriEncodedString());te("RestConnection",`Sending RPC '${n}' ${l}:`,c,s);const u={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(u,i,o),this.No(n,c,u,s).then(d=>(te("RestConnection",`Received RPC '${n}' ${l}: `,d),d),d=>{throw ls("RestConnection",`RPC '${n}' ${l} failed with error: `,d,"url: ",c,"request:",s),d})}Lo(n,r,s,i,o,l){return this.Mo(n,r,s,i,o)}Oo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+gs}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}xo(n,r){const s=BA[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=ml();return new Promise((o,l)=>{const c=new um;c.setWithCredentials(!0),c.listenOnce(hm.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case yo.NO_ERROR:const d=c.getResponseJson();te(ht,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(d)),o(d);break;case yo.TIMEOUT:te(ht,`RPC '${e}' ${i} timed out`),l(new Z(M.DEADLINE_EXCEEDED,"Request time out"));break;case yo.HTTP_ERROR:const p=c.getStatus();if(te(ht,`RPC '${e}' ${i} failed with status:`,p,"response text:",c.getResponseText()),p>0){let m=c.getResponseJson();Array.isArray(m)&&(m=m[0]);const g=m==null?void 0:m.error;if(g&&g.status&&g.message){const k=function(O){const H=O.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(H)>=0?H:M.UNKNOWN}(g.status);l(new Z(k,g.message))}else l(new Z(M.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new Z(M.UNAVAILABLE,"Connection failed."));break;default:fe()}}finally{te(ht,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(s);te(ht,`RPC '${e}' ${i} sending request:`,s),c.send(n,"POST",u,r,15)})}Bo(e,n,r){const s=ml(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=pm(),l=fm(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const d=i.join("");te(ht,`Creating RPC '${e}' stream ${s}: ${d}`,c);const p=o.createWebChannel(d,c);let m=!1,g=!1;const k=new jA({Io:O=>{g?te(ht,`Not sending because RPC '${e}' stream ${s} is closed:`,O):(m||(te(ht,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),te(ht,`RPC '${e}' stream ${s} sending:`,O),p.send(O))},To:()=>p.close()}),S=(O,H,q)=>{O.listen(H,$=>{try{q($)}catch(j){setTimeout(()=>{throw j},0)}})};return S(p,$s.EventType.OPEN,()=>{g||(te(ht,`RPC '${e}' stream ${s} transport opened.`),k.yo())}),S(p,$s.EventType.CLOSE,()=>{g||(g=!0,te(ht,`RPC '${e}' stream ${s} transport closed`),k.So())}),S(p,$s.EventType.ERROR,O=>{g||(g=!0,ls(ht,`RPC '${e}' stream ${s} transport errored:`,O),k.So(new Z(M.UNAVAILABLE,"The operation could not be completed")))}),S(p,$s.EventType.MESSAGE,O=>{var H;if(!g){const q=O.data[0];Ne(!!q);const $=q,j=$.error||((H=$[0])===null||H===void 0?void 0:H.error);if(j){te(ht,`RPC '${e}' stream ${s} received error:`,j);const ne=j.status;let ce=function(w){const R=We[w];if(R!==void 0)return Bm(R)}(ne),A=j.message;ce===void 0&&(ce=M.INTERNAL,A="Unknown error status: "+ne+" with message "+j.message),g=!0,k.So(new Z(ce,A)),p.close()}else te(ht,`RPC '${e}' stream ${s} received:`,q),k.bo(q)}}),S(l,dm.STAT_EVENT,O=>{O.stat===jl.PROXY?te(ht,`RPC '${e}' stream ${s} detected buffering proxy`):O.stat===jl.NOPROXY&&te(ht,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.wo()},0),k}}function gl(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wa(t){return new Xw(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&te("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(e,n,r,s,i,o,l,c){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Xm(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(Nn(n.toString()),Nn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new Z(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return te("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(te("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class $A extends Zm{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=tA(this.serializer,e),r=function(i){if(!("targetChange"in i))return pe.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?pe.min():o.readTime?on(o.readTime):pe.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Jl(this.serializer),n.addTarget=function(i,o){let l;const c=o.target;if(l=Gl(c)?{documents:sA(i,c)}:{query:iA(i,c)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=$m(i,o.resumeToken);const u=Wl(i,o.expectedCount);u!==null&&(l.expectedCount=u)}else if(o.snapshotVersion.compareTo(pe.min())>0){l.readTime=Go(i,o.snapshotVersion.toTimestamp());const u=Wl(i,o.expectedCount);u!==null&&(l.expectedCount=u)}return l}(this.serializer,e);const r=aA(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Jl(this.serializer),n.removeTarget=e,this.a_(n)}}class HA extends Zm{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return Ne(!!e.streamToken),this.lastStreamToken=e.streamToken,Ne(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Ne(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=rA(e.writeResults,e.commitTime),r=on(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Jl(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>nA(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GA extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new Z(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,Ql(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new Z(M.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,Ql(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new Z(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class KA{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Nn(n),this.D_=!1):te("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zA{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{r.enqueueAndForget(async()=>{Lr(this)&&(te("RemoteStore","Restarting streams for network reachability change."),await async function(c){const u=me(c);u.L_.add(4),await xi(u),u.q_.set("Unknown"),u.L_.delete(4),await Aa(u)}(this))})}),this.q_=new KA(r,s)}}async function Aa(t){if(Lr(t))for(const e of t.B_)await e(!0)}async function xi(t){for(const e of t.B_)await e(!1)}function eg(t,e){const n=me(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),zc(n)?Kc(n):ys(n).r_()&&Gc(n,e))}function Hc(t,e){const n=me(t),r=ys(n);n.N_.delete(e),r.r_()&&tg(n,e),n.N_.size===0&&(r.r_()?r.o_():Lr(n)&&n.q_.set("Unknown"))}function Gc(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(pe.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}ys(t).A_(e)}function tg(t,e){t.Q_.xe(e),ys(t).R_(e)}function Kc(t){t.Q_=new Ww({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),ys(t).start(),t.q_.v_()}function zc(t){return Lr(t)&&!ys(t).n_()&&t.N_.size>0}function Lr(t){return me(t).L_.size===0}function ng(t){t.Q_=void 0}async function WA(t){t.q_.set("Online")}async function QA(t){t.N_.forEach((e,n)=>{Gc(t,e)})}async function YA(t,e){ng(t),zc(t)?(t.q_.M_(e),Kc(t)):t.q_.set("Unknown")}async function JA(t,e,n){if(t.q_.set("Online"),e instanceof qm&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.N_.delete(l),s.Q_.removeTarget(l))}(t,e)}catch(r){te("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ko(t,r)}else if(e instanceof Io?t.Q_.Ke(e):e instanceof jm?t.Q_.He(e):t.Q_.We(e),!n.isEqual(pe.min()))try{const r=await Jm(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.N_.get(u);d&&i.N_.set(u,d.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,u)=>{const d=i.N_.get(c);if(!d)return;i.N_.set(c,d.withResumeToken(at.EMPTY_BYTE_STRING,d.snapshotVersion)),tg(i,c);const p=new Xn(d.target,c,u,d.sequenceNumber);Gc(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){te("RemoteStore","Failed to raise snapshot:",r),await Ko(t,r)}}async function Ko(t,e,n){if(!ki(e))throw e;t.L_.add(1),await xi(t),t.q_.set("Offline"),n||(n=()=>Jm(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{te("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await Aa(t)})}function rg(t,e){return e().catch(n=>Ko(t,n,e))}async function Ra(t){const e=me(t),n=cr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;XA(e);)try{const s=await xA(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,ZA(e,s)}catch(s){await Ko(e,s)}sg(e)&&ig(e)}function XA(t){return Lr(t)&&t.O_.length<10}function ZA(t,e){t.O_.push(e);const n=cr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function sg(t){return Lr(t)&&!cr(t).n_()&&t.O_.length>0}function ig(t){cr(t).start()}async function eR(t){cr(t).p_()}async function tR(t){const e=cr(t);for(const n of t.O_)e.m_(n.mutations)}async function nR(t,e,n){const r=t.O_.shift(),s=Fc.from(r,e,n);await rg(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Ra(t)}async function rR(t,e){e&&cr(t).V_&&await async function(r,s){if(function(o){return Gw(o)&&o!==M.ABORTED}(s.code)){const i=r.O_.shift();cr(r).s_(),await rg(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Ra(r)}}(t,e),sg(t)&&ig(t)}async function Hd(t,e){const n=me(t);n.asyncQueue.verifyOperationInProgress(),te("RemoteStore","RemoteStore received new credentials");const r=Lr(n);n.L_.add(3),await xi(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await Aa(n)}async function sR(t,e){const n=me(t);e?(n.L_.delete(2),await Aa(n)):e||(n.L_.add(2),await xi(n),n.q_.set("Unknown"))}function ys(t){return t.K_||(t.K_=function(n,r,s){const i=me(n);return i.w_(),new $A(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:WA.bind(null,t),Ro:QA.bind(null,t),mo:YA.bind(null,t),d_:JA.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),zc(t)?Kc(t):t.q_.set("Unknown")):(await t.K_.stop(),ng(t))})),t.K_}function cr(t){return t.U_||(t.U_=function(n,r,s){const i=me(n);return i.w_(),new HA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:eR.bind(null,t),mo:rR.bind(null,t),f_:tR.bind(null,t),g_:nR.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await Ra(t)):(await t.U_.stop(),t.O_.length>0&&(te("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Sn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new Wc(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Z(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Qc(t,e){if(Nn("AsyncQueue",`${e}: ${t}`),ki(t))return new Z(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e){this.comparator=e?(n,r)=>e(n,r)||ae.comparator(n.key,r.key):(n,r)=>ae.comparator(n.key,r.key),this.keyedMap=Hs(),this.sortedSet=new $e(this.comparator)}static emptySet(e){return new ts(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof ts)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new ts;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(){this.W_=new $e(ae.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):fe():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class fs{constructor(e,n,r,s,i,o,l,c,u){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new fs(e,n,ts.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ya(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iR{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class oR{constructor(){this.queries=Kd(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=me(n),i=s.queries;s.queries=Kd(),i.forEach((o,l)=>{for(const c of l.j_)c.onError(r)})})(this,new Z(M.ABORTED,"Firestore shutting down"))}}function Kd(){return new _s(t=>Pm(t),ya)}async function og(t,e){const n=me(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new iR,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=Qc(o,`Initialization of query '${Hr(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&Yc(n)}async function ag(t,e){const n=me(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function aR(t,e){const n=me(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(s)&&(r=!0);o.z_=s}}r&&Yc(n)}function lR(t,e,n){const r=me(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function Yc(t){t.Y_.forEach(e=>{e.next()})}var Zl,zd;(zd=Zl||(Zl={})).ea="default",zd.Cache="cache";class lg{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new fs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=fs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Zl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{constructor(e){this.key=e}}class ug{constructor(e){this.key=e}}class cR{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=Ee(),this.mutatedKeys=Ee(),this.Aa=Sm(e),this.Ra=new ts(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new Gd,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,u=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((d,p)=>{const m=s.get(d),g=va(this.query,p)?p:null,k=!!m&&this.mutatedKeys.has(m.key),S=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let O=!1;m&&g?m.data.isEqual(g.data)?k!==S&&(r.track({type:3,doc:g}),O=!0):this.ga(m,g)||(r.track({type:2,doc:g}),O=!0,(c&&this.Aa(g,c)>0||u&&this.Aa(g,u)<0)&&(l=!0)):!m&&g?(r.track({type:0,doc:g}),O=!0):m&&!g&&(r.track({type:1,doc:m}),O=!0,(c||u)&&(l=!0)),O&&(g?(o=o.add(g),i=S?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{Ra:o,fa:r,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((d,p)=>function(g,k){const S=O=>{switch(O){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return fe()}};return S(g)-S(k)}(d.type,p.type)||this.Aa(d.doc,p.doc)),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,u=c!==this.Ea;return this.Ea=c,o.length!==0||u?{snapshot:new fs(this.query,e.Ra,i,o,e.mutatedKeys,c===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Gd,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=Ee(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new ug(r))}),this.da.forEach(r=>{e.has(r)||n.push(new cg(r))}),n}ba(e){this.Ta=e.Ts,this.da=Ee();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return fs.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class uR{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class hR{constructor(e){this.key=e,this.va=!1}}class dR{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new _s(l=>Pm(l),ya),this.Ma=new Map,this.xa=new Set,this.Oa=new $e(ae.comparator),this.Na=new Map,this.La=new jc,this.Ba={},this.ka=new Map,this.qa=ds.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function fR(t,e,n=!0){const r=gg(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await hg(r,e,n,!0),s}async function pR(t,e){const n=gg(t);await hg(n,e,!0,!1)}async function hg(t,e,n,r){const s=await LA(t.localStore,sn(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await mR(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&eg(t.remoteStore,s),l}async function mR(t,e,n,r,s){t.Ka=(p,m,g)=>async function(S,O,H,q){let $=O.view.ma(H);$.ns&&($=await jd(S.localStore,O.query,!1).then(({documents:A})=>O.view.ma(A,$)));const j=q&&q.targetChanges.get(O.targetId),ne=q&&q.targetMismatches.get(O.targetId)!=null,ce=O.view.applyChanges($,S.isPrimaryClient,j,ne);return Qd(S,O.targetId,ce.wa),ce.snapshot}(t,p,m,g);const i=await jd(t.localStore,e,!0),o=new cR(e,i.Ts),l=o.ma(i.documents),c=Vi.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),u=o.applyChanges(l,t.isPrimaryClient,c);Qd(t,n,u.wa);const d=new uR(e,n,o);return t.Fa.set(e,d),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),u.snapshot}async function gR(t,e,n){const r=me(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(o=>!ya(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Xl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Hc(r.remoteStore,s.targetId),ec(r,s.targetId)}).catch(Di)):(ec(r,s.targetId),await Xl(r.localStore,s.targetId,!0))}async function _R(t,e){const n=me(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Hc(n.remoteStore,r.targetId))}async function yR(t,e,n){const r=RR(t);try{const s=await function(o,l){const c=me(o),u=Je.now(),d=l.reduce((g,k)=>g.add(k.key),Ee());let p,m;return c.persistence.runTransaction("Locally write mutations","readwrite",g=>{let k=On(),S=Ee();return c.cs.getEntries(g,d).next(O=>{k=O,k.forEach((H,q)=>{q.isValidDocument()||(S=S.add(H))})}).next(()=>c.localDocuments.getOverlayedDocuments(g,k)).next(O=>{p=O;const H=[];for(const q of l){const $=Bw(q,p.get(q.key).overlayedDocument);$!=null&&H.push(new ur(q.key,$,vm($.value.mapValue),Qt.exists(!0)))}return c.mutationQueue.addMutationBatch(g,u,H,l)}).next(O=>{m=O;const H=O.applyToLocalDocumentSet(p,S);return c.documentOverlayCache.saveOverlays(g,O.batchId,H)})}).then(()=>({batchId:m.batchId,changes:Dm(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,c){let u=o.Ba[o.currentUser.toKey()];u||(u=new $e(Pe)),u=u.insert(l,c),o.Ba[o.currentUser.toKey()]=u}(r,s.batchId,n),await Li(r,s.changes),await Ra(r.remoteStore)}catch(s){const i=Qc(s,"Failed to persist write");n.reject(i)}}async function dg(t,e){const n=me(t);try{const r=await OA(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Na.get(i);o&&(Ne(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?Ne(o.va):s.removedDocuments.size>0&&(Ne(o.va),o.va=!1))}),await Li(n,r,e)}catch(r){await Di(r)}}function Wd(t,e,n){const r=me(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const c=me(o);c.onlineState=l;let u=!1;c.queries.forEach((d,p)=>{for(const m of p.j_)m.Z_(l)&&(u=!0)}),u&&Yc(c)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function vR(t,e,n){const r=me(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new $e(ae.comparator);o=o.insert(i,mt.newNoDocument(i,pe.min()));const l=Ee().add(i),c=new Ta(pe.min(),new Map,new $e(Pe),o,l);await dg(r,c),r.Oa=r.Oa.remove(i),r.Na.delete(e),Jc(r)}else await Xl(r.localStore,e,!1).then(()=>ec(r,e,n)).catch(Di)}async function ER(t,e){const n=me(t),r=e.batch.batchId;try{const s=await NA(n.localStore,e);pg(n,r,null),fg(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Li(n,s)}catch(s){await Di(s)}}async function IR(t,e,n){const r=me(t);try{const s=await function(o,l){const c=me(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let d;return c.mutationQueue.lookupMutationBatch(u,l).next(p=>(Ne(p!==null),d=p.keys(),c.mutationQueue.removeMutationBatch(u,p))).next(()=>c.mutationQueue.performConsistencyCheck(u)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(u,d,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,d)).next(()=>c.localDocuments.getDocuments(u,d))})}(r.localStore,e);pg(r,e,n),fg(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Li(r,s)}catch(s){await Di(s)}}function fg(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function pg(t,e,n){const r=me(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function ec(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||mg(t,r)})}function mg(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(Hc(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),Jc(t))}function Qd(t,e,n){for(const r of n)r instanceof cg?(t.La.addReference(r.key,e),TR(t,r)):r instanceof ug?(te("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||mg(t,r.key)):fe()}function TR(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(te("SyncEngine","New document in limbo: "+n),t.xa.add(r),Jc(t))}function Jc(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new ae(Fe.fromString(e)),r=t.qa.next();t.Na.set(r,new hR(n)),t.Oa=t.Oa.insert(n,r),eg(t.remoteStore,new Xn(sn(Lc(n.path)),r,"TargetPurposeLimboResolution",Dc.oe))}}async function Li(t,e,n){const r=me(t),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,c)=>{o.push(r.Ka(c,e,n).then(u=>{var d;if((u||n)&&r.isPrimaryClient){const p=u?!u.fromCache:(d=n==null?void 0:n.targetChanges.get(c.targetId))===null||d===void 0?void 0:d.current;r.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(u){s.push(u);const p=$c.Wi(c.targetId,u);i.push(p)}}))}),await Promise.all(o),r.Ca.d_(s),await async function(c,u){const d=me(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>U.forEach(u,m=>U.forEach(m.$i,g=>d.persistence.referenceDelegate.addReference(p,m.targetId,g)).next(()=>U.forEach(m.Ui,g=>d.persistence.referenceDelegate.removeReference(p,m.targetId,g)))))}catch(p){if(!ki(p))throw p;te("LocalStore","Failed to update sequence numbers: "+p)}for(const p of u){const m=p.targetId;if(!p.fromCache){const g=d.os.get(m),k=g.snapshotVersion,S=g.withLastLimboFreeSnapshotVersion(k);d.os=d.os.insert(m,S)}}}(r.localStore,i))}async function wR(t,e){const n=me(t);if(!n.currentUser.isEqual(e)){te("SyncEngine","User change. New user:",e.toKey());const r=await Ym(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(c=>{c.reject(new Z(M.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Li(n,r.hs)}}function AR(t,e){const n=me(t),r=n.Na.get(e);if(r&&r.va)return Ee().add(r.key);{let s=Ee();const i=n.Ma.get(e);if(!i)return s;for(const o of i){const l=n.Fa.get(o);s=s.unionWith(l.view.Va)}return s}}function gg(t){const e=me(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=dg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=AR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=vR.bind(null,e),e.Ca.d_=aR.bind(null,e.eventManager),e.Ca.$a=lR.bind(null,e.eventManager),e}function RR(t){const e=me(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ER.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=IR.bind(null,e),e}class zo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=wa(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return kA(this.persistence,new CA,e.initialUser,this.serializer)}Ga(e){return new bA(qc.Zr,this.serializer)}Wa(e){return new FA}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}zo.provider={build:()=>new zo};class tc{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Wd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=wR.bind(null,this.syncEngine),await sR(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new oR}()}createDatastore(e){const n=wa(e.databaseInfo.databaseId),r=function(i){return new qA(i)}(e.databaseInfo);return function(i,o,l,c){return new GA(i,o,l,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new zA(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>Wd(this.syncEngine,n,0),function(){return $d.D()?new $d:new UA}())}createSyncEngine(e,n){return function(s,i,o,l,c,u,d){const p=new dR(s,i,o,l,c,u);return d&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=me(s);te("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await xi(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}tc.provider={build:()=>new tc};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Nn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bR{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=ft.UNAUTHENTICATED,this.clientId=gm.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{te("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(te("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Sn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Qc(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function _l(t,e){t.asyncQueue.verifyOperationInProgress(),te("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Ym(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Yd(t,e){t.asyncQueue.verifyOperationInProgress();const n=await PR(t);te("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Hd(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>Hd(e.remoteStore,s)),t._onlineComponents=e}async function PR(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){te("FirestoreClient","Using user provided OfflineComponentProvider");try{await _l(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===M.FAILED_PRECONDITION||s.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;ls("Error using user provided cache. Falling back to memory cache: "+n),await _l(t,new zo)}}else te("FirestoreClient","Using default OfflineComponentProvider"),await _l(t,new zo);return t._offlineComponents}async function yg(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(te("FirestoreClient","Using user provided OnlineComponentProvider"),await Yd(t,t._uninitializedComponentsProvider._online)):(te("FirestoreClient","Using default OnlineComponentProvider"),await Yd(t,new tc))),t._onlineComponents}function SR(t){return yg(t).then(e=>e.syncEngine)}async function vg(t){const e=await yg(t),n=e.eventManager;return n.onListen=fR.bind(null,e.syncEngine),n.onUnlisten=gR.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=pR.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=_R.bind(null,e.syncEngine),n}function CR(t,e,n={}){const r=new Sn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,c,u){const d=new _g({next:m=>{d.Za(),o.enqueueAndForget(()=>ag(i,p));const g=m.docs.has(l);!g&&m.fromCache?u.reject(new Z(M.UNAVAILABLE,"Failed to get document because the client is offline.")):g&&m.fromCache&&c&&c.source==="server"?u.reject(new Z(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(m)},error:m=>u.reject(m)}),p=new lg(Lc(l.path),d,{includeMetadataChanges:!0,_a:!0});return og(i,p)}(await vg(t),t.asyncQueue,e,n,r)),r.promise}function DR(t,e,n={}){const r=new Sn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,c,u){const d=new _g({next:m=>{d.Za(),o.enqueueAndForget(()=>ag(i,p)),m.fromCache&&c.source==="server"?u.reject(new Z(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(m)},error:m=>u.reject(m)}),p=new lg(l,d,{includeMetadataChanges:!0,_a:!0});return og(i,p)}(await vg(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eg(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jd=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ig(t,e,n){if(!n)throw new Z(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function kR(t,e,n,r){if(e===!0&&r===!0)throw new Z(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Xd(t){if(!ae.isDocumentKey(t))throw new Z(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Zd(t){if(ae.isDocumentKey(t))throw new Z(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function ba(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":fe()}function dn(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Z(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ba(t);throw new Z(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new Z(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new Z(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}kR("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Eg((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new Z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new Z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new Z(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Pa{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ef({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Z(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Z(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ef(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new WT;switch(r.type){case"firstParty":return new XT(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new Z(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Jd.get(n);r&&(te("ComponentProvider","Removing Datastore"),Jd.delete(n),r.terminate())}(this),Promise.resolve()}}function NR(t,e,n,r={}){var s;const i=(t=dn(t,Pa))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&ls("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,c;if(typeof r.mockUserToken=="string")l=r.mockUserToken,c=ft.MOCK_USER;else{l=rm(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const u=r.mockUserToken.sub||r.mockUserToken.user_id;if(!u)throw new Z(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new ft(u)}t._authCredentials=new QT(new mm(l,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new vs(this.firestore,e,this._query)}}class Pt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new nr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Pt(this.firestore,e,this._key)}}class nr extends vs{constructor(e,n,r){super(e,n,Lc(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Pt(this.firestore,null,new ae(e))}withConverter(e){return new nr(this.firestore,e,this._path)}}function tf(t,e,...n){if(t=It(t),Ig("collection","path",e),t instanceof Pa){const r=Fe.fromString(e,...n);return Zd(r),new nr(t,null,r)}{if(!(t instanceof Pt||t instanceof nr))throw new Z(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fe.fromString(e,...n));return Zd(r),new nr(t.firestore,null,r)}}function To(t,e,...n){if(t=It(t),arguments.length===1&&(e=gm.newId()),Ig("doc","path",e),t instanceof Pa){const r=Fe.fromString(e,...n);return Xd(r),new Pt(t,null,new ae(r))}{if(!(t instanceof Pt||t instanceof nr))throw new Z(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fe.fromString(e,...n));return Xd(r),new Pt(t.firestore,t instanceof nr?t.converter:null,new ae(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Xm(this,"async_queue_retry"),this.Vu=()=>{const r=gl();r&&te("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=gl();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=gl();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Sn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!ki(e))throw e;te("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw Nn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=Wc.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&fe()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class Es extends Pa{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new nf,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new nf(e),this._firestoreClient=void 0,await e}}}function OR(t,e){const n=typeof t=="object"?t:Sc(),r=typeof t=="string"?t:"(default)",s=ga(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=em("firestore");i&&NR(s,...i)}return s}function Xc(t){if(t._terminated)throw new Z(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||VR(t),t._firestoreClient}function VR(t){var e,n,r;const s=t._freezeSettings(),i=function(l,c,u,d){return new hw(l,c,u,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,Eg(d.experimentalLongPollingOptions),d.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new bR(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ps(at.fromBase64String(e))}catch(n){throw new Z(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new ps(at.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new Z(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new it(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new Z(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new Z(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Pe(this._lat,e._lat)||Pe(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xR=/^__.*__$/;class LR{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new ur(e,this.data,this.fieldMask,n,this.fieldTransforms):new Oi(e,this.data,n,this.fieldTransforms)}}class Tg{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new ur(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function wg(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw fe()}}class tu{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new tu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Wo(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(wg(this.Cu)&&xR.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class MR{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||wa(e)}Qu(e,n,r,s=!1){return new tu({Cu:e,methodName:n,qu:r,path:it.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Da(t){const e=t._freezeSettings(),n=wa(t._databaseId);return new MR(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Ag(t,e,n,r,s,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);ru("Data must be an object, but it was:",o,r);const l=Rg(r,o);let c,u;if(i.merge)c=new Mt(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const m=nc(e,p,n);if(!o.contains(m))throw new Z(M.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Pg(d,m)||d.push(m)}c=new Mt(d),u=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,u=o.fieldTransforms;return new LR(new kt(l),c,u)}class ka extends Ca{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ka}}class nu extends Ca{_toFieldTransform(e){return new Lw(e.path,new Ei)}isEqual(e){return e instanceof nu}}function FR(t,e,n,r){const s=t.Qu(1,e,n);ru("Data must be an object, but it was:",s,r);const i=[],o=kt.empty();xr(r,(c,u)=>{const d=su(e,c,n);u=It(u);const p=s.Nu(d);if(u instanceof ka)i.push(d);else{const m=Mi(u,p);m!=null&&(i.push(d),o.set(d,m))}});const l=new Mt(i);return new Tg(o,l,s.fieldTransforms)}function UR(t,e,n,r,s,i){const o=t.Qu(1,e,n),l=[nc(e,r,n)],c=[s];if(i.length%2!=0)throw new Z(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)l.push(nc(e,i[m])),c.push(i[m+1]);const u=[],d=kt.empty();for(let m=l.length-1;m>=0;--m)if(!Pg(u,l[m])){const g=l[m];let k=c[m];k=It(k);const S=o.Nu(g);if(k instanceof ka)u.push(g);else{const O=Mi(k,S);O!=null&&(u.push(g),d.set(g,O))}}const p=new Mt(u);return new Tg(d,p,o.fieldTransforms)}function BR(t,e,n,r=!1){return Mi(n,t.Qu(r?4:3,e))}function Mi(t,e){if(bg(t=It(t)))return ru("Unsupported field value:",e,t),Rg(t,e);if(t instanceof Ca)return function(r,s){if(!wg(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let c=Mi(l,s.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=It(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Ow(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Je.fromDate(r);return{timestampValue:Go(s.serializer,i)}}if(r instanceof Je){const i=new Je(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Go(s.serializer,i)}}if(r instanceof Zc)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ps)return{bytesValue:$m(s.serializer,r._byteString)};if(r instanceof Pt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Bc(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof eu)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.Bu("VectorValues must only contain numeric values.");return Mc(l.serializer,c)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${ba(r)}`)}(t,e)}function Rg(t,e){const n={};return _m(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):xr(t,(r,s)=>{const i=Mi(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function bg(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Je||t instanceof Zc||t instanceof ps||t instanceof Pt||t instanceof Ca||t instanceof eu)}function ru(t,e,n){if(!bg(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=ba(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function nc(t,e,n){if((e=It(e))instanceof Sa)return e._internalPath;if(typeof e=="string")return su(t,e);throw Wo("Field path arguments must be of type string or ",t,!1,void 0,n)}const jR=new RegExp("[~\\*/\\[\\]]");function su(t,e,n){if(e.search(jR)>=0)throw Wo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Sa(...e.split("."))._internalPath}catch{throw Wo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Wo(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new Z(M.INVALID_ARGUMENT,l+t+c)}function Pg(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Pt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new qR(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(iu("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class qR extends Sg{data(){return super.data()}}function iu(t,e){return typeof e=="string"?su(t,e):e instanceof Sa?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $R(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new Z(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ou{}class HR extends ou{}function yl(t,e,...n){let r=[];e instanceof ou&&r.push(e),r=r.concat(n),function(i){const o=i.filter(c=>c instanceof au).length,l=i.filter(c=>c instanceof Na).length;if(o>1||o>0&&l>0)throw new Z(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class Na extends HR{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Na(e,n,r)}_apply(e){const n=this._parse(e);return Cg(e._query,n),new vs(e.firestore,e.converter,Kl(e._query,n))}_parse(e){const n=Da(e.firestore);return function(i,o,l,c,u,d,p){let m;if(u.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new Z(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){of(p,d);const g=[];for(const k of p)g.push(sf(c,i,k));m={arrayValue:{values:g}}}else m=sf(c,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||of(p,d),m=BR(l,o,p,d==="in"||d==="not-in");return Qe.create(u,d,m)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function rf(t,e,n){const r=e,s=iu("where",t);return Na._create(s,r,n)}class au extends ou{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new au(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:Jt.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const l=i.getFlattenedFilters();for(const c of l)Cg(o,c),o=Kl(o,c)}(e._query,n),new vs(e.firestore,e.converter,Kl(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function sf(t,e,n){if(typeof(n=It(n))=="string"){if(n==="")throw new Z(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!bm(e)&&n.indexOf("/")!==-1)throw new Z(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Fe.fromString(n));if(!ae.isDocumentKey(r))throw new Z(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ad(t,new ae(r))}if(n instanceof Pt)return Ad(t,n._key);throw new Z(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ba(n)}.`)}function of(t,e){if(!Array.isArray(t)||t.length===0)throw new Z(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Cg(t,e){const n=function(s,i){for(const o of s)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new Z(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Z(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class GR{convertValue(e,n="none"){switch(Cr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ke(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Sr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw fe()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return xr(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Ke(o.doubleValue));return new eu(i)}convertGeoPoint(e){return new Zc(Ke(e.latitude),Ke(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Nc(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(_i(e));default:return null}}convertTimestamp(e){const n=lr(e);return new Je(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Fe.fromString(e);Ne(Qm(r));const s=new yi(r.get(1),r.get(3)),i=new ae(r.popFirst(5));return s.isEqual(n)||Nn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dg(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class kg extends Sg{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new wo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(iu("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class wo extends kg{data(e={}){return super.data(e)}}class KR{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Ks(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new wo(this._firestore,this._userDataWriter,r.key,r,new Ks(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new Z(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const c=new wo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Ks(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const c=new wo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Ks(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let u=-1,d=-1;return l.type!==0&&(u=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),d=o.indexOf(l.doc.key)),{type:zR(l.type),doc:c,oldIndex:u,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function zR(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return fe()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WR(t){t=dn(t,Pt);const e=dn(t.firestore,Es);return CR(Xc(e),t._key).then(n=>ZR(e,t,n))}class Ng extends GR{constructor(e){super(),this.firestore=e}convertBytes(e){return new ps(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Pt(this.firestore,null,n)}}function QR(t){t=dn(t,vs);const e=dn(t.firestore,Es),n=Xc(e),r=new Ng(e);return $R(t._query),DR(n,t._query).then(s=>new KR(e,r,t,s))}function YR(t,e,n){t=dn(t,Pt);const r=dn(t.firestore,Es),s=Dg(t.converter,e);return lu(r,[Ag(Da(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Qt.none())])}function JR(t,e,n,...r){t=dn(t,Pt);const s=dn(t.firestore,Es),i=Da(s);let o;return o=typeof(e=It(e))=="string"||e instanceof Sa?UR(i,"updateDoc",t._key,e,n,r):FR(i,"updateDoc",t._key,e),lu(s,[o.toMutation(t._key,Qt.exists(!0))])}function XR(t,e){const n=dn(t.firestore,Es),r=To(t),s=Dg(t.converter,e);return lu(n,[Ag(Da(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,Qt.exists(!1))]).then(()=>r)}function lu(t,e){return function(r,s){const i=new Sn;return r.asyncQueue.enqueueAndForget(async()=>yR(await SR(r),s,i)),i.promise}(Xc(t),e)}function ZR(t,e,n){const r=n.docs.get(e._key),s=new Ng(t);return new kg(t,s,e._key,r,new Ks(n.hasPendingWrites,n.fromCache),e.converter)}function Us(){return new nu("serverTimestamp")}(function(e,n=!0){(function(s){gs=s})(Vr),br(new or("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new Es(new YT(r.getProvider("auth-internal")),new ew(r.getProvider("app-check-internal")),function(u,d){if(!Object.prototype.hasOwnProperty.apply(u.options,["projectId"]))throw new Z(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new yi(u.options.projectId,d)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),rn(vd,"4.7.3",e),rn(vd,"4.7.3","esm2017")})();var e0="firebase",t0="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */rn(e0,t0,"app");function cu(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Og(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const n0=Og,Vg=new Si("auth","Firebase",Og());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo=new bc("@firebase/auth");function r0(t,...e){Qo.logLevel<=Ie.WARN&&Qo.warn(`Auth (${Vr}): ${t}`,...e)}function Ao(t,...e){Qo.logLevel<=Ie.ERROR&&Qo.error(`Auth (${Vr}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vn(t,...e){throw uu(t,...e)}function an(t,...e){return uu(t,...e)}function xg(t,e,n){const r=Object.assign(Object.assign({},n0()),{[e]:n});return new Si("auth","Firebase",r).create(e,{appName:t.name})}function Rr(t){return xg(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function uu(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Vg.create(t,...e)}function de(t,e,...n){if(!t)throw uu(e,...n)}function wn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ao(e),new Error(e)}function xn(t,e){t||wn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rc(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function s0(){return af()==="http:"||af()==="https:"}function af(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i0(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(s0()||SI()||"connection"in navigator)?navigator.onLine:!0}function o0(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e,n){this.shortDelay=e,this.longDelay=n,xn(n>e,"Short delay should be less than long delay!"),this.isMobile=RI()||CI()}get(){return i0()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hu(t,e){xn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;wn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;wn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;wn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a0={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l0=new Fi(3e4,6e4);function du(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Is(t,e,n,r,s={}){return Mg(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=Ci(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const u=Object.assign({method:e,headers:c},i);return PI()||(u.referrerPolicy="no-referrer"),Lg.fetch()(Fg(t,t.config.apiHost,n,l),u)})}async function Mg(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},a0),e);try{const s=new u0(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw uo(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[c,u]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw uo(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw uo(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw uo(t,"user-disabled",o);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw xg(t,d,u);Vn(t,d)}}catch(s){if(s instanceof pn)throw s;Vn(t,"network-request-failed",{message:String(s)})}}async function c0(t,e,n,r,s={}){const i=await Is(t,e,n,r,s);return"mfaPendingCredential"in i&&Vn(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Fg(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?hu(t.config,s):`${t.config.apiScheme}://${s}`}class u0{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(an(this.auth,"network-request-failed")),l0.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function uo(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=an(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function h0(t,e){return Is(t,"POST","/v1/accounts:delete",e)}async function Ug(t,e){return Is(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function d0(t,e=!1){const n=It(t),r=await n.getIdToken(e),s=fu(r);de(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:oi(vl(s.auth_time)),issuedAtTime:oi(vl(s.iat)),expirationTime:oi(vl(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function vl(t){return Number(t)*1e3}function fu(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Ao("JWT malformed, contained fewer than 3 sections"),null;try{const s=Xp(n);return s?JSON.parse(s):(Ao("Failed to decode base64 JWT payload"),null)}catch(s){return Ao("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function lf(t){const e=fu(t);return de(e,"internal-error"),de(typeof e.exp<"u","internal-error"),de(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wi(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof pn&&f0(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function f0({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p0{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=oi(this.lastLoginAt),this.creationTime=oi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yo(t){var e;const n=t.auth,r=await t.getIdToken(),s=await wi(t,Ug(n,{idToken:r}));de(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Bg(i.providerUserInfo):[],l=g0(t.providerData,o),c=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),d=c?u:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new sc(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(t,p)}async function m0(t){const e=It(t);await Yo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function g0(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Bg(t){return t.map(e=>{var{providerId:n}=e,r=cu(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _0(t,e){const n=await Mg(t,{},async()=>{const r=Ci({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Fg(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",Lg.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function y0(t,e){return Is(t,"POST","/v2/accounts:revokeToken",du(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){de(e.idToken,"internal-error"),de(typeof e.idToken<"u","internal-error"),de(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):lf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){de(e.length!==0,"internal-error");const n=lf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(de(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await _0(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new ns;return r&&(de(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(de(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(de(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ns,this.toJSON())}_performRefresh(){return wn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $n(t,e){de(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class An{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=cu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new p0(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new sc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await wi(this,this.stsTokenManager.getToken(this.auth,e));return de(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return d0(this,e)}reload(){return m0(this)}_assign(e){this!==e&&(de(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new An(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){de(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Yo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Jn(this.auth.app))return Promise.reject(Rr(this.auth));const e=await this.getIdToken();return await wi(this,h0(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,c,u,d;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,m=(s=n.email)!==null&&s!==void 0?s:void 0,g=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,k=(o=n.photoURL)!==null&&o!==void 0?o:void 0,S=(l=n.tenantId)!==null&&l!==void 0?l:void 0,O=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,H=(u=n.createdAt)!==null&&u!==void 0?u:void 0,q=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:$,emailVerified:j,isAnonymous:ne,providerData:ce,stsTokenManager:A}=n;de($&&A,e,"internal-error");const E=ns.fromJSON(this.name,A);de(typeof $=="string",e,"internal-error"),$n(p,e.name),$n(m,e.name),de(typeof j=="boolean",e,"internal-error"),de(typeof ne=="boolean",e,"internal-error"),$n(g,e.name),$n(k,e.name),$n(S,e.name),$n(O,e.name),$n(H,e.name),$n(q,e.name);const w=new An({uid:$,auth:e,email:m,emailVerified:j,displayName:p,isAnonymous:ne,photoURL:k,phoneNumber:g,tenantId:S,stsTokenManager:E,createdAt:H,lastLoginAt:q});return ce&&Array.isArray(ce)&&(w.providerData=ce.map(R=>Object.assign({},R))),O&&(w._redirectEventId=O),w}static async _fromIdTokenResponse(e,n,r=!1){const s=new ns;s.updateFromServerResponse(n);const i=new An({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Yo(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];de(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Bg(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new ns;l.updateFromIdToken(r);const c=new An({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new sc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,u),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cf=new Map;function Rn(t){xn(t instanceof Function,"Expected a class definition");let e=cf.get(t);return e?(xn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,cf.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}jg.type="NONE";const uf=jg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ro(t,e,n){return`firebase:${t}:${e}:${n}`}class rs{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ro(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ro("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?An._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new rs(Rn(uf),e,r);const s=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||Rn(uf);const o=Ro(r,e.config.apiKey,e.name);let l=null;for(const u of n)try{const d=await u._get(o);if(d){const p=An._fromJSON(e,d);u!==i&&(l=p),i=u;break}}catch{}const c=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new rs(i,e,r):(i=c[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new rs(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Gg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(qg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(zg(e))return"Blackberry";if(Wg(e))return"Webos";if($g(e))return"Safari";if((e.includes("chrome/")||Hg(e))&&!e.includes("edge/"))return"Chrome";if(Kg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function qg(t=Et()){return/firefox\//i.test(t)}function $g(t=Et()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Hg(t=Et()){return/crios\//i.test(t)}function Gg(t=Et()){return/iemobile/i.test(t)}function Kg(t=Et()){return/android/i.test(t)}function zg(t=Et()){return/blackberry/i.test(t)}function Wg(t=Et()){return/webos/i.test(t)}function pu(t=Et()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function v0(t=Et()){var e;return pu(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function E0(){return DI()&&document.documentMode===10}function Qg(t=Et()){return pu(t)||Kg(t)||Wg(t)||zg(t)||/windows phone/i.test(t)||Gg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yg(t,e=[]){let n;switch(t){case"Browser":n=hf(Et());break;case"Worker":n=`${hf(Et())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Vr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I0{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const c=e(i);o(c)}catch(c){l(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function T0(t,e={}){return Is(t,"GET","/v2/passwordPolicy",du(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w0=6;class A0{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:w0,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R0{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new df(this),this.idTokenSubscription=new df(this),this.beforeStateQueue=new I0(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Vg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Rn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await rs.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Ug(this,{idToken:e}),r=await An._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Jn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return de(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Yo(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=o0()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Jn(this.app))return Promise.reject(Rr(this));const n=e?It(e):null;return n&&de(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&de(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Jn(this.app)?Promise.reject(Rr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Jn(this.app)?Promise.reject(Rr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Rn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await T0(this),n=new A0(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Si("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await y0(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Rn(e)||this._popupRedirectResolver;de(n,this,"argument-error"),this.redirectPersistenceManager=await rs.create(this,[Rn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(de(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return de(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Yg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&r0(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function mu(t){return It(t)}class df{constructor(e){this.auth=e,this.observer=null,this.addObserver=FI(n=>this.observer=n)}get next(){return de(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function b0(t){gu=t}function P0(t){return gu.loadJS(t)}function S0(){return gu.gapiScript}function C0(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D0(t,e){const n=ga(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Uo(i,e??{}))return s;Vn(s,"already-initialized")}return n.initialize({options:e})}function k0(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Rn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function N0(t,e,n){const r=mu(t);de(r._canInitEmulator,r,"emulator-config-failed"),de(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Jg(e),{host:o,port:l}=O0(e),c=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),V0()}function Jg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function O0(t){const e=Jg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:ff(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:ff(o)}}}function ff(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function V0(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return wn("not implemented")}_getIdTokenResponse(e){return wn("not implemented")}_linkToIdToken(e,n){return wn("not implemented")}_getReauthenticationResolver(e){return wn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ss(t,e){return c0(t,"POST","/v1/accounts:signInWithIdp",du(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x0="http://localhost";class Dr extends Xg{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Dr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Vn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=cu(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Dr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return ss(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,ss(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,ss(e,n)}buildRequest(){const e={requestUri:x0,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ci(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui extends Zg{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn extends Ui{constructor(){super("facebook.com")}static credential(e){return Dr._fromParams({providerId:zn.PROVIDER_ID,signInMethod:zn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zn.credentialFromTaggedObject(e)}static credentialFromError(e){return zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return zn.credential(e.oauthAccessToken)}catch{return null}}}zn.FACEBOOK_SIGN_IN_METHOD="facebook.com";zn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn extends Ui{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Dr._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Wn.credential(n,r)}catch{return null}}}Wn.GOOGLE_SIGN_IN_METHOD="google.com";Wn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn extends Ui{constructor(){super("github.com")}static credential(e){return Dr._fromParams({providerId:Qn.PROVIDER_ID,signInMethod:Qn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qn.credentialFromTaggedObject(e)}static credentialFromError(e){return Qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qn.credential(e.oauthAccessToken)}catch{return null}}}Qn.GITHUB_SIGN_IN_METHOD="github.com";Qn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn extends Ui{constructor(){super("twitter.com")}static credential(e,n){return Dr._fromParams({providerId:Yn.PROVIDER_ID,signInMethod:Yn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Yn.credentialFromTaggedObject(e)}static credentialFromError(e){return Yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Yn.credential(n,r)}catch{return null}}}Yn.TWITTER_SIGN_IN_METHOD="twitter.com";Yn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await An._fromIdTokenResponse(e,r,s),o=pf(r);return new ms({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=pf(r);return new ms({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function pf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo extends pn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Jo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Jo(e,n,r,s)}}function e_(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Jo._fromErrorAndOperation(t,i,e,r):i})}async function L0(t,e,n=!1){const r=await wi(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ms._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function M0(t,e,n=!1){const{auth:r}=t;if(Jn(r.app))return Promise.reject(Rr(r));const s="reauthenticate";try{const i=await wi(t,e_(r,s,e,t),n);de(i.idToken,r,"internal-error");const o=fu(i.idToken);de(o,r,"internal-error");const{sub:l}=o;return de(t.uid===l,r,"user-mismatch"),ms._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Vn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function F0(t,e,n=!1){if(Jn(t.app))return Promise.reject(Rr(t));const r="signIn",s=await e_(t,r,e),i=await ms._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}function U0(t,e,n,r){return It(t).onIdTokenChanged(e,n,r)}function B0(t,e,n){return It(t).beforeAuthStateChanged(e,n)}const Xo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Xo,"1"),this.storage.removeItem(Xo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j0=1e3,q0=10;class n_ extends t_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Qg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);E0()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,q0):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},j0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}n_.type="LOCAL";const $0=n_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_ extends t_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}r_.type="SESSION";const s_=r_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H0(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Oa(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async u=>u(n.origin,i)),c=await H0(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Oa.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _u(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G0{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,c)=>{const u=_u("",20);s.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===u)switch(m.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(m.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ln(){return window}function K0(t){ln().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i_(){return typeof ln().WorkerGlobalScope<"u"&&typeof ln().importScripts=="function"}async function z0(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function W0(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Q0(){return i_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o_="firebaseLocalStorageDb",Y0=1,Zo="firebaseLocalStorage",a_="fbase_key";class Bi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Va(t,e){return t.transaction([Zo],e?"readwrite":"readonly").objectStore(Zo)}function J0(){const t=indexedDB.deleteDatabase(o_);return new Bi(t).toPromise()}function ic(){const t=indexedDB.open(o_,Y0);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Zo,{keyPath:a_})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Zo)?e(r):(r.close(),await J0(),e(await ic()))})})}async function mf(t,e,n){const r=Va(t,!0).put({[a_]:e,value:n});return new Bi(r).toPromise()}async function X0(t,e){const n=Va(t,!1).get(e),r=await new Bi(n).toPromise();return r===void 0?null:r.value}function gf(t,e){const n=Va(t,!0).delete(e);return new Bi(n).toPromise()}const Z0=800,eb=3;class l_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ic(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>eb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return i_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Oa._getInstance(Q0()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await z0(),!this.activeServiceWorker)return;this.sender=new G0(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||W0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ic();return await mf(e,Xo,"1"),await gf(e,Xo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>mf(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>X0(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>gf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Va(s,!1).getAll();return new Bi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Z0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}l_.type="LOCAL";const tb=l_;new Fi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nb(t,e){return e?Rn(e):(de(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu extends Xg{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ss(e,this._buildIdpRequest())}_linkToIdToken(e,n){return ss(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return ss(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function rb(t){return F0(t.auth,new yu(t),t.bypassAuthState)}function sb(t){const{auth:e,user:n}=t;return de(n,e,"internal-error"),M0(n,new yu(t),t.bypassAuthState)}async function ib(t){const{auth:e,user:n}=t;return de(n,e,"internal-error"),L0(n,new yu(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c_{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return rb;case"linkViaPopup":case"linkViaRedirect":return ib;case"reauthViaPopup":case"reauthViaRedirect":return sb;default:Vn(this.auth,"internal-error")}}resolve(e){xn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){xn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ob=new Fi(2e3,1e4);class zr extends c_{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,zr.currentPopupAction&&zr.currentPopupAction.cancel(),zr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return de(e,this.auth,"internal-error"),e}async onExecution(){xn(this.filter.length===1,"Popup operations only handle one event");const e=_u();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(an(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(an(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,zr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(an(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ob.get())};e()}}zr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ab="pendingRedirect",bo=new Map;class lb extends c_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=bo.get(this.auth._key());if(!e){try{const r=await cb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}bo.set(this.auth._key(),e)}return this.bypassAuthState||bo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function cb(t,e){const n=db(e),r=hb(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function ub(t,e){bo.set(t._key(),e)}function hb(t){return Rn(t._redirectPersistence)}function db(t){return Ro(ab,t.config.apiKey,t.name)}async function fb(t,e,n=!1){if(Jn(t.app))return Promise.reject(Rr(t));const r=mu(t),s=nb(r,e),o=await new lb(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pb=10*60*1e3;class mb{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!gb(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!u_(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(an(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=pb&&this.cachedEventUids.clear(),this.cachedEventUids.has(_f(e))}saveEventToCache(e){this.cachedEventUids.add(_f(e)),this.lastProcessedEventTime=Date.now()}}function _f(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function u_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function gb(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return u_(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _b(t,e={}){return Is(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,vb=/^https?/;async function Eb(t){if(t.config.emulator)return;const{authorizedDomains:e}=await _b(t);for(const n of e)try{if(Ib(n))return}catch{}Vn(t,"unauthorized-domain")}function Ib(t){const e=rc(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!vb.test(n))return!1;if(yb.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tb=new Fi(3e4,6e4);function yf(){const t=ln().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function wb(t){return new Promise((e,n)=>{var r,s,i;function o(){yf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{yf(),n(an(t,"network-request-failed"))},timeout:Tb.get()})}if(!((s=(r=ln().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=ln().gapi)===null||i===void 0)&&i.load)o();else{const l=C0("iframefcb");return ln()[l]=()=>{gapi.load?o():n(an(t,"network-request-failed"))},P0(`${S0()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw Po=null,e})}let Po=null;function Ab(t){return Po=Po||wb(t),Po}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rb=new Fi(5e3,15e3),bb="__/auth/iframe",Pb="emulator/auth/iframe",Sb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Cb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Db(t){const e=t.config;de(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?hu(e,Pb):`https://${t.config.authDomain}/${bb}`,r={apiKey:e.apiKey,appName:t.name,v:Vr},s=Cb.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Ci(r).slice(1)}`}async function kb(t){const e=await Ab(t),n=ln().gapi;return de(n,t,"internal-error"),e.open({where:document.body,url:Db(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Sb,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=an(t,"network-request-failed"),l=ln().setTimeout(()=>{i(o)},Rb.get());function c(){ln().clearTimeout(l),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ob=500,Vb=600,xb="_blank",Lb="http://localhost";class vf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Mb(t,e,n,r=Ob,s=Vb){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c=Object.assign(Object.assign({},Nb),{width:r.toString(),height:s.toString(),top:i,left:o}),u=Et().toLowerCase();n&&(l=Hg(u)?xb:n),qg(u)&&(e=e||Lb,c.scrollbars="yes");const d=Object.entries(c).reduce((m,[g,k])=>`${m}${g}=${k},`,"");if(v0(u)&&l!=="_self")return Fb(e||"",l),new vf(null);const p=window.open(e||"",l,d);de(p,t,"popup-blocked");try{p.focus()}catch{}return new vf(p)}function Fb(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ub="__/auth/handler",Bb="emulator/auth/handler",jb=encodeURIComponent("fac");async function Ef(t,e,n,r,s,i){de(t.config.authDomain,t,"auth-domain-config-required"),de(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Vr,eventId:s};if(e instanceof Zg){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",MI(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof Ui){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const c=await t._getAppCheckToken(),u=c?`#${jb}=${encodeURIComponent(c)}`:"";return`${qb(t)}?${Ci(l).slice(1)}${u}`}function qb({config:t}){return t.emulator?hu(t,Bb):`https://${t.authDomain}/${Ub}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El="webStorageSupport";class $b{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=s_,this._completeRedirectFn=fb,this._overrideRedirectResult=ub}async _openPopup(e,n,r,s){var i;xn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Ef(e,n,r,rc(),s);return Mb(e,o,_u())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await Ef(e,n,r,rc(),s);return K0(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(xn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await kb(e),r=new mb(e);return n.register("authEvent",s=>(de(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(El,{type:El},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[El];o!==void 0&&n(!!o),Vn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Eb(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Qg()||$g()||pu()}}const Hb=$b;var If="@firebase/auth",Tf="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){de(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kb(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function zb(t){br(new or("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;de(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Yg(t)},u=new R0(r,s,i,c);return k0(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),br(new or("auth-internal",e=>{const n=mu(e.getProvider("auth").getImmediate());return(r=>new Gb(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),rn(If,Tf,Kb(t)),rn(If,Tf,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wb=5*60,Qb=nm("authIdTokenMaxAge")||Wb;let wf=null;const Yb=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Qb)return;const s=n==null?void 0:n.token;wf!==s&&(wf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Jb(t=Sc()){const e=ga(t,"auth");if(e.isInitialized())return e.getImmediate();const n=D0(t,{popupRedirectResolver:Hb,persistence:[tb,$0,s_]}),r=nm("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=Yb(i.toString());B0(n,o,()=>o(n.currentUser)),U0(n,l=>o(l))}}const s=Zp("auth");return s&&N0(n,`http://${s}`),n}function Xb(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}b0({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=an("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",Xb().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});zb("Browser");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h_="firebasestorage.googleapis.com",Zb="storageBucket",eP=2*60*1e3,tP=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn extends pn{constructor(e,n,r=0){super(Il(e),`Firebase Storage: ${n} (${Il(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,mn.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Il(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var fn;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(fn||(fn={}));function Il(t){return"storage/"+t}function nP(){const t="An unknown error occurred, please check the error payload for server response.";return new mn(fn.UNKNOWN,t)}function rP(){return new mn(fn.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function sP(){return new mn(fn.CANCELED,"User canceled the upload/download.")}function iP(t){return new mn(fn.INVALID_URL,"Invalid URL '"+t+"'.")}function oP(t){return new mn(fn.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function Af(t){return new mn(fn.INVALID_ARGUMENT,t)}function d_(){return new mn(fn.APP_DELETED,"The Firebase app was deleted.")}function aP(t){return new mn(fn.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=zt.makeFromUrl(e,n)}catch{return new zt(e,"")}if(r.path==="")return r;throw oP(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(j){j.path.charAt(j.path.length-1)==="/"&&(j.path_=j.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function u(j){j.path_=decodeURIComponent(j.path)}const d="v[A-Za-z0-9_]+",p=n.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",g=new RegExp(`^https?://${p}/${d}/b/${s}/o${m}`,"i"),k={bucket:1,path:3},S=n===h_?"(?:storage.googleapis.com|storage.cloud.google.com)":n,O="([^?#]*)",H=new RegExp(`^https?://${S}/${s}/${O}`,"i"),$=[{regex:l,indices:c,postModify:i},{regex:g,indices:k,postModify:u},{regex:H,indices:{bucket:1,path:2},postModify:u}];for(let j=0;j<$.length;j++){const ne=$[j],ce=ne.regex.exec(e);if(ce){const A=ce[ne.indices.bucket];let E=ce[ne.indices.path];E||(E=""),r=new zt(A,E),ne.postModify(r);break}}if(r==null)throw iP(e);return r}}class lP{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cP(t,e,n){let r=1,s=null,i=null,o=!1,l=0;function c(){return l===2}let u=!1;function d(...O){u||(u=!0,e.apply(null,O))}function p(O){s=setTimeout(()=>{s=null,t(g,c())},O)}function m(){i&&clearTimeout(i)}function g(O,...H){if(u){m();return}if(O){m(),d.call(null,O,...H);return}if(c()||o){m(),d.call(null,O,...H);return}r<64&&(r*=2);let $;l===1?(l=2,$=0):$=(r+Math.random())*1e3,p($)}let k=!1;function S(O){k||(k=!0,m(),!u&&(s!==null?(O||(l=2),clearTimeout(s),p(0)):O||(l=1)))}return p(0),i=setTimeout(()=>{o=!0,S(!0)},n),S}function uP(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hP(t){return t!==void 0}function Rf(t,e,n,r){if(r<e)throw Af(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw Af(`Invalid value for '${t}'. Expected ${n} or less.`)}function dP(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var ea;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(ea||(ea={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fP(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pP{constructor(e,n,r,s,i,o,l,c,u,d,p,m=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=d,this.connectionFactory_=p,this.retry=m,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((g,k)=>{this.resolve_=g,this.reject_=k,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new ho(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=l=>{const c=l.loaded,u=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const l=i.getErrorCode()===ea.NO_ERROR,c=i.getStatus();if(!l||fP(c,this.additionalRetryCodes_)&&this.retry){const d=i.getErrorCode()===ea.ABORT;r(!1,new ho(!1,null,d));return}const u=this.successCodes_.indexOf(c)!==-1;r(!0,new ho(u,i))})},n=(r,s)=>{const i=this.resolve_,o=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());hP(c)?i(c):i()}catch(c){o(c)}else if(l!==null){const c=nP();c.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,c)):o(c)}else if(s.canceled){const c=this.appDelete_?d_():sP();o(c)}else{const c=rP();o(c)}};this.canceled_?n(!1,new ho(!1,null,!0)):this.backoffId_=cP(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&uP(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ho{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function mP(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function gP(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function _P(t,e){e&&(t["X-Firebase-GMPID"]=e)}function yP(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function vP(t,e,n,r,s,i,o=!0){const l=dP(t.urlParams),c=t.url+l,u=Object.assign({},t.headers);return _P(u,e),mP(u,n),gP(u,i),yP(u,r),new pP(c,t.method,u,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EP(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function IP(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,n){this._service=e,n instanceof zt?this._location=n:this._location=zt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new ta(e,n)}get root(){const e=new zt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return IP(this._location.path)}get storage(){return this._service}get parent(){const e=EP(this._location.path);if(e===null)return null;const n=new zt(this._location.bucket,e);return new ta(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw aP(e)}}function bf(t,e){const n=e==null?void 0:e[Zb];return n==null?null:zt.makeFromBucketSpec(n,t)}function TP(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:rm(s,t.app.options.projectId))}class wP{constructor(e,n,r,s,i){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=h_,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=eP,this._maxUploadRetryTime=tP,this._requests=new Set,s!=null?this._bucket=zt.makeFromBucketSpec(s,this._host):this._bucket=bf(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=zt.makeFromBucketSpec(this._url,e):this._bucket=bf(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Rf("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Rf("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new ta(this,e)}_makeRequest(e,n,r,s,i=!0){if(this._deleted)return new lP(d_());{const o=vP(e,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const Pf="@firebase/storage",Sf="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f_="storage";function AP(t=Sc(),e){t=It(t);const r=ga(t,f_).getImmediate({identifier:e}),s=em("storage");return s&&RP(r,...s),r}function RP(t,e,n,r={}){TP(t,e,n,r)}function bP(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new wP(n,r,s,e,Vr)}function PP(){br(new or(f_,bP,"PUBLIC").setMultipleInstances(!0)),rn(Pf,Sf,""),rn(Pf,Sf,"esm2017")}PP();const SP={apiKey:"AIzaSyBVUVyDTnOwMmYR1ybOLYv9i_B19aox1Lg",authDomain:"weresldatabase.firebaseapp.com",projectId:"weresldatabase",storageBucket:"weresldatabase.firebasestorage.app",messagingSenderId:"148662033996",appId:"1:148662033996:web:f9b5ea903b9cc5a24d9ee9"},vu=om(SP);Jb(vu);const Bs=OR(vu);AP(vu);const js={PROFILES:"profiles",LOANS:"loans",GRANTS:"grants",PAYMENTS:"payments",PROJECTS:"projects",LOGS:"system_logs"},CP={MAN:"Mannar",COL:"Colombo",BAT:"Batticaloa",GAM:"Gampaha",KAL:"Kalutara",KAN:"Kandy",KUR:"Kurunegala",JAF:"Jaffna",VAV:"Vavuniya",TRI:"Trincomalee",MTR:"Matara",HAM:"Hambantota",MON:"Monaragala",ANU:"Anuradhapura",POL:"Polonnaruwa",PUT:"Puttalam",RAT:"Ratnapura",NUW:"Nuwara Eliya",BAD:"Badulla",KEG:"Kegalle",MUL:"Mullaitivu",MTL:"Matale",AMP:"Ampara",KIL:"Kilinochchi",GAE:"Galle"},DP={Mannar:"MAN",Colombo:"COL",Batticaloa:"BAT",Gampaha:"GAM",Kalutara:"KAL",Kandy:"KAN",Kurunegala:"KUR",Jaffna:"JAF",Vavuniya:"VAV",Trincomalee:"TRI",Matara:"MTR",Hambantota:"HAM",Monaragala:"MON",Anuradhapura:"ANU",Polonnaruwa:"POL",Puttalam:"PUT",Ratnapura:"RAT","Nuwara Eliya":"NUW",Badulla:"BAD",Kegalle:"KEG",Mullaitivu:"MUL",Matale:"MTL",Ampara:"AMP",Kilinochchi:"KIL",Galle:"GAE"},qt={async getAllProfiles(t={}){try{let e=tf(Bs,js.PROFILES);t.District&&(e=yl(e,rf("District","==",t.District))),t.type&&(e=yl(e)),t.year&&(e=yl(e,rf("createdAt",">=",new Date(t.year,0,1))));const n=await QR(e),r=[];return n.forEach(s=>{var l,c,u,d,p,m,g,k,S,O;const i=s.data(),o={id:s.id,basicInfo:{name:i.Name||((l=i.basicInfo)==null?void 0:l.name)||"N/A",age:i.Age||((c=i.basicInfo)==null?void 0:c.age)||"N/A",District:i.District||((u=i.basicInfo)==null?void 0:u.District)||"N/A",phone:i.contact||((d=i.basicInfo)==null?void 0:d.phone)||"N/A",address:i.Address||((p=i.basicInfo)==null?void 0:p.address)||"N/A",nic:i.NIC||((m=i.basicInfo)==null?void 0:m.nic)||"N/A",totalChildren:i.total_children||((g=i.basicInfo)==null?void 0:g.totalChildren)||0,schoolKids:i.school_kids||((k=i.basicInfo)==null?void 0:k.schoolKids)||0,others:i.others||((S=i.basicInfo)==null?void 0:S.others)||0,occupation:i.Occupation||((O=i.basicInfo)==null?void 0:O.occupation)||"N/A"},loans:i.loans||[],grants:i.grants||[],paymentHistory:i.paymentHistory||[],arms:i.ArmsArray||i.arms||[],Image:i.Image,imageUrl:i.imageUrl,RF_Loan:i.RF_Loan,RF_Paid_History:i.RF_Paid_History,RF_Cur_Prj:i.RF_Cur_Prj,Com_prjs:i.Com_prjs,GRANT:i.GRANT,GIFor:i.GIFor,GRANT_Cur_Prj:i.GRANT_Cur_Prj,Description:i.Description,Reg_ID:i.Reg_ID,contact:i.contact,total_children:i.total_children,school_kids:i.school_kids,others:i.others,createdAt:i.createdAt,updatedAt:i.updatedAt};r.push(o)}),t.type?r.filter(s=>t.type==="RF"?s.RF_Loan||s.RF_Paid_History:t.type==="GRANT"?s.GRANT:t.type==="GIF"?s.GIFor:!0):r}catch(e){throw console.error("Error getting profiles:",e),e}},async getProfileByRegId(t){var e,n,r,s,i,o,l,c,u,d;try{const p=To(Bs,js.PROFILES,t),m=await WR(p);if(m.exists()){const g=m.data();return{id:m.id,basicInfo:{name:g.Name||((e=g.basicInfo)==null?void 0:e.name)||"N/A",age:g.Age||((n=g.basicInfo)==null?void 0:n.age)||"N/A",District:g.District||((r=g.basicInfo)==null?void 0:r.District)||"N/A",phone:g.contact||((s=g.basicInfo)==null?void 0:s.phone)||"N/A",address:g.Address||((i=g.basicInfo)==null?void 0:i.address)||"N/A",nic:g.NIC||((o=g.basicInfo)==null?void 0:o.nic)||"N/A",totalChildren:g.total_children||((l=g.basicInfo)==null?void 0:l.totalChildren)||0,schoolKids:g.school_kids||((c=g.basicInfo)==null?void 0:c.schoolKids)||0,others:g.others||((u=g.basicInfo)==null?void 0:u.others)||0,occupation:g.Occupation||((d=g.basicInfo)==null?void 0:d.occupation)||"N/A"},loans:g.loans||[],grants:g.grants||[],paymentHistory:g.paymentHistory||[],arms:g.ArmsArray||g.arms||[],Image:g.Image,imageUrl:g.imageUrl,RF_Loan:g.RF_Loan,RF_Paid_History:g.RF_Paid_History,RF_Cur_Prj:g.RF_Cur_Prj,Com_prjs:g.Com_prjs,GRANT:g.GRANT,GIFor:g.GIFor,GRANT_Cur_Prj:g.GRANT_Cur_Prj,Description:g.Description,Reg_ID:g.Reg_ID,contact:g.contact,total_children:g.total_children,school_kids:g.school_kids,others:g.others,createdAt:g.createdAt,updatedAt:g.updatedAt}}else return null}catch(p){throw console.error("Error getting profile:",p),p}},async createProfile(t){try{const e=t.regId,n=To(Bs,js.PROFILES,e),r={basicInfo:t.basicInfo,loans:t.loans||[],grants:t.grants||[],paymentHistory:t.paymentHistory||[],arms:t.arms||[],imageUrl:t.imageUrl||"",meta:{createdAt:Us(),updatedAt:Us()}};return await YR(n,r),e}catch(e){throw console.error("Error creating profile:",e),e}},async updateProfile(t,e){try{const n=To(Bs,js.PROFILES,t),r={...e,meta:{updatedAt:Us()}};return await JR(n,r),t}catch(n){throw console.error("Error updating profile:",n),n}},async addLoan(t,e){try{const n=await this.getProfileByRegId(t);if(!n)throw new Error("Profile not found");const r={id:Date.now().toString(),type:e.type,amount:e.amount,purpose:e.purpose,date:e.date,status:"active",...e},s=[...n.loans,r];return await this.updateProfile(t,{loans:s}),r}catch(n){throw console.error("Error adding loan:",n),n}},async processPayment(t){try{const{regId:e,type:n,amount:r,details:s,date:i}=t,o=await this.getProfileByRegId(e);if(!o)throw new Error("Profile not found");const l={id:Date.now().toString(),type:n,amount:parseFloat(r)||0,details:s,date:i||new Date,timestamp:Us()},c=[...o.paymentHistory,l];if(n==="RF")return await this.processRFPayment(o,l);if(n==="GRANT")return await this.processGrantPayment(o,l)}catch(e){throw console.error("Error processing payment:",e),e}},async processRFPayment(t,e){const{amount:n}=e;let r=n;const s=[],i=[];for(const c of t.loans.filter(u=>u.status==="active"))if(r>0){const u=c.amount-(c.paidAmount||0);if(u<=r)i.push({...c,paidAmount:c.amount,status:"completed",completedDate:new Date}),r-=u;else{const d=(c.paidAmount||0)+r;s.push({...c,paidAmount:d}),r=0}}else s.push(c);const o=[...s,...i],l=[...t.paymentHistory,e];return await this.updateProfile(t.id,{loans:o,paymentHistory:l}),{...t,loans:o,paymentHistory:l}},async processGrantPayment(t,e){const n=[...t.paymentHistory,e];return await this.updateProfile(t.id,{paymentHistory:n}),{...t,paymentHistory:n}},async getAnalyticsData(){try{const t=await this.getAllProfiles(),e={totalProfiles:t.length,totalLoans:t.reduce((s,i)=>s+i.loans.length,0),totalGrants:t.reduce((s,i)=>s+i.grants.length,0),totalAmount:t.reduce((s,i)=>{const o=i.loans.reduce((c,u)=>c+(u.amount||0),0),l=i.grants.reduce((c,u)=>c+(u.amount||0),0);return s+o+l},0)},n={};t.forEach(s=>{var o;const i=((o=s.basicInfo)==null?void 0:o.District)||"Unknown";n[i]=(n[i]||0)+1});const r={};return t.forEach(s=>{var o,l;const i=new Date((l=(o=s.meta)==null?void 0:o.createdAt)==null?void 0:l.toDate()).getFullYear();r[i]=(r[i]||0)+1}),{stats:e,districtStats:n,yearStats:r}}catch(t){throw console.error("Error getting analytics:",t),t}},async logOperation(t,e,n="info"){try{const r={operation:t,details:e,level:n,timestamp:Us(),userId:"system"};await XR(tf(Bs,js.LOGS),r)}catch(r){console.error("Error logging operation:",r)}}},Cf={getDistrictFromRegID(t){const e=t.substring(0,3).toUpperCase();return CP[e]||"Unknown"},getDistrictCodeFromName(t){return DP[t]||"UNK"},generateRegId(t,e=[]){const n=this.getDistrictCodeFromName(t);let r=1;for(;;){const s=`${n}${r.toString().padStart(3,"0")}`;if(!e.includes(s))return s;r++}}},kP={async uploadFile(t,e){const n=Date.now(),r=`${e}_${n}.jpg`;return console.log("Google Drive upload (fallback) for:",e,r),`https://drive.google.com/file/d/placeholder_${r}/view`},async deleteFile(t){return console.log("Google Drive delete (fallback) for:",t),!0},extractFileId(t){const e=t.match(/\/d\/(.+?)(\/|$)/)||t.match(/id=([^&]+)/);return e?e[1]:null}},Df={async uploadImage(t,e){try{const n=await this.processImage(t);return await kP.uploadFile(n,e)}catch(n){throw console.error("Error uploading image:",n),n}},async processImage(t){return new Promise((e,n)=>{const r=document.createElement("canvas"),s=r.getContext("2d"),i=new Image;i.onload=()=>{let{width:l,height:c}=i;l>c?l>800&&(c=c*800/l,l=800):c>800&&(l=l*800/c,c=800),r.width=l,r.height=c,s.drawImage(i,0,0,l,c),r.toBlob(u=>{e(u)},"image/jpeg",.8)},i.onerror=n,t.type==="image/heic"||t.type==="image/heif"?this.convertHeicToJpeg(t).then(e).catch(n):i.src=URL.createObjectURL(t)})},async convertHeicToJpeg(t){return t},async uploadToGoogleDrive(t,e){try{return console.log("Google Drive upload would happen here for:",e),"https://drive.google.com/file/d/placeholder/view"}catch(n){throw console.error("Error uploading to Google Drive:",n),n}},async deleteImage(t){try{console.log("Google Drive delete would happen here for:",t)}catch(e){throw console.error("Error deleting image:",e),e}},async getImageUrl(t){try{return t}catch(e){throw console.error("Error getting image URL:",e),e}},extractFileId(t){const e=t.match(/\/d\/(.+?)(\/|$)/)||t.match(/id=([^&]+)/);return e?e[1]:null}},bn={async getProfiles(t={}){try{return(await qt.getAllProfiles(t)).map(n=>({...n,computed:this.computeProfileStats(n)}))}catch(e){throw console.error("Error getting profiles:",e),e}},async getProfile(t){try{const e=await qt.getProfileByRegId(t);return e?{...e,computed:this.computeProfileStats(e)}:null}catch(e){throw console.error("Error getting profile:",e),e}},async createProfile(t){try{if(!t.regId){const r=(await qt.getAllProfiles()).map(s=>s.id);t.regId=Cf.generateRegId(t.basicInfo.District,r)}if(t.imageFile){const n=await Df.uploadImage(t.imageFile,t.regId);t.imageUrl=n}const e=await qt.createProfile(t);return await qt.logOperation("CREATE_PROFILE",{regId:e,basicInfo:t.basicInfo}),e}catch(e){throw console.error("Error creating profile:",e),e}},async updateProfile(t,e){try{if(e.imageFile){const n=await Df.uploadImage(e.imageFile,t);e.imageUrl=n,delete e.imageFile}return await qt.updateProfile(t,e),await qt.logOperation("UPDATE_PROFILE",{regId:t,updates:e}),t}catch(n){throw console.error("Error updating profile:",n),n}},async addLoan(t,e){try{const n=await qt.addLoan(t,e);return await qt.logOperation("ADD_LOAN",{regId:t,loan:n}),n}catch(n){throw console.error("Error adding loan:",n),n}},async processPayment(t){try{const e=await qt.processPayment(t);return await qt.logOperation("PROCESS_PAYMENT",{regId:t.regId,payment:t}),e}catch(e){throw console.error("Error processing payment:",e),e}},computeProfileStats(t){var c,u;const e=((c=t.loans)==null?void 0:c.filter(d=>d.status==="active"))||[],n=((u=t.loans)==null?void 0:u.filter(d=>d.status==="completed"))||[],r=t.grants||[],s=t.paymentHistory||[];let i=e.reduce((d,p)=>d+(p.amount||0),0);t.RF_Loan&&!i&&(i=parseFloat(t.RF_Loan)||0);let o=r.reduce((d,p)=>d+(p.amount||0),0);t.GRANT&&!o&&(o=parseFloat(t.GRANT)||0);let l=s.reduce((d,p)=>d+(p.amount||0),0);return t.RF_Paid_History&&!l&&(l=parseFloat(t.RF_Paid_History)||0),{activeLoansCount:e.length||(t.RF_Loan?1:0),completedLoansCount:n.length,grantsCount:r.length||(t.GRANT?1:0),totalLoanAmount:i,totalGrantAmount:o,totalPaidAmount:l,remainingLoanAmount:i-l,district:Cf.getDistrictFromRegID(t.id)}},getProfileTypes(t){var n,r,s;const e=[];return((n=t.loans)!=null&&n.some(i=>i.type==="RF")||t.RF_Loan)&&e.push("RF"),(((r=t.grants)==null?void 0:r.length)>0||t.GRANT)&&e.push("GRANT"),((s=t.loans)!=null&&s.some(i=>i.type==="GIF")||t.GIFor)&&e.push("GIF"),e},validateProfileData(t){var n,r,s;const e=[];return(n=t.basicInfo)!=null&&n.name||e.push("Name is required"),(r=t.basicInfo)!=null&&r.District||e.push("District is required"),(!((s=t.basicInfo)!=null&&s.age)||t.basicInfo.age<0)&&e.push("Valid age is required"),e},validateLoanData(t){const e=[];return(!t.type||!["RF","GRANT","GIF"].includes(t.type))&&e.push("Valid loan type is required"),(!t.amount||t.amount<=0)&&e.push("Valid amount is required"),t.purpose||e.push("Purpose is required"),e},validatePaymentData(t){const e=[];return t.regId||e.push("RegID is required"),(!t.type||!["RF","GRANT"].includes(t.type))&&e.push("Valid payment type is required"),t.type==="RF"&&(!t.amount||t.amount<=0)&&e.push("Valid amount is required for RF payments"),t.type==="GRANT"&&!t.details&&e.push("Details are required for GRANT payments"),e}},NP={async getLogoImage(){try{const t="1AEEWccjf_sMoXJgAaYIPZZm5rM-OCFe2";return`https://drive.google.com/thumbnail?id=${t}&sz=w400`}catch(t){return console.error("Error fetching logo:",t),"/placeholder-logo.png"}},async getProfileImage(t){try{return`https://drive.google.com/uc?export=view&id=${t}`}catch(e){return console.error("Error fetching profile image:",e),"/placeholder-profile.jpg"}},async getProfileImageWithFallback(t,e=null){try{let n=null;if(e&&(n=this.extractFileId(e),console.log("Extracted file ID from URL:",n)),!n&&t&&(n=this.extractFileId(t)||t,console.log("Using regId as file ID:",n)),n){const r=[`https://drive.google.com/thumbnail?id=${n}&sz=w300`,`https://drive.google.com/uc?export=view&id=${n}`,`https://drive.google.com/thumbnail?id=${n}&sz=w400`,`https://drive.google.com/thumbnail?id=${n}&sz=w200`];return console.log("Trying URL formats for file ID:",n),console.log("URL formats:",r),r[0]}return"/placeholder-profile.jpg"}catch(n){return console.error("Error fetching profile image with fallback:",n),"/placeholder-profile.jpg"}},async getAllImages(){try{return[{id:"logo",name:"WERESL Logo",url:"https://drive.google.com/uc?export=view&id=YOUR_LOGO_FILE_ID",type:"logo"},{id:"placeholder",name:"Profile Placeholder",url:"/placeholder-profile.jpg",type:"profile"}]}catch(t){return console.error("Error fetching images:",t),[]}},extractFileId(t){if(!t)return null;const e=t.match(/[-\w]{25,}/);return e?e[0]:null},convertToDirectUrl(t){const e=this.extractFileId(t);return e?`https://drive.google.com/uc?export=view&id=${e}`:t},getPlaceholderImages(){return{logo:"/placeholder-logo.png",profile:"/placeholder-profile.jpg",logoText:"WERESL"}},async testImageUrl(t){if(t.includes("drive.google.com"))return!0;try{return(await fetch(t,{method:"HEAD"})).ok}catch{return!1}}},OP={name:"ProfileCard",props:{profile:{type:Object,required:!0}},emits:["open-modal"],setup(t,{emit:e}){const n=Se("/placeholder-profile.jpg"),r=Se(!0),s=Se(0),i=Se([]),o=bt(()=>bn.getProfileTypes(t.profile)),l=m=>m?new Intl.NumberFormat("en-IN").format(m):"0",c=m=>{if(console.log("Image failed to load for profile:",t.profile.id),s.value<i.value.length-1){s.value++;const g=i.value[s.value];console.log("Trying next URL format:",g),m.target.src=g;return}console.log("All URL formats failed, using placeholder"),m.target.src="/placeholder-profile.jpg",r.value=!1},u=()=>{r.value=!1},d=async()=>{try{if(await new Promise(g=>setTimeout(g,0)),!t.profile||!t.profile.id){console.log("Profile or profile.id is null/undefined:",t.profile),n.value="/placeholder-profile.jpg";return}let m=null;if(t.profile.Image){const g=t.profile.Image.match(/[-\w]{25,}/);g&&(m=g[0],console.log("Extracted file ID from Image URL:",m))}if(!m){console.log("No Image URL found for profile:",t.profile.id),n.value="/placeholder-profile.jpg";return}i.value=[`https://drive.google.com/thumbnail?id=${m}&sz=w300`,`https://drive.google.com/uc?export=view&id=${m}`,`https://drive.google.com/thumbnail?id=${m}&sz=w400`,`https://drive.google.com/thumbnail?id=${m}&sz=w200`],console.log("Generated URL formats for profile:",t.profile.id,i.value),s.value=0,n.value=i.value[0]}catch(m){console.error("Error loading profile image:",m),n.value="/placeholder-profile.jpg"}};return bi(()=>{d()}),Tr(()=>t.profile,m=>{m&&m.id&&d()},{immediate:!0}),{profileImageUrl:n,imageLoading:r,profileTypes:o,formatAmount:l,handleImageError:c,handleImageLoad:u,openModal:()=>{e("open-modal",t.profile)}}}},VP=["src","alt"],xP={class:"profile-header"},LP={class:"profile-types"},MP={class:"profile-info"},FP={key:0,class:"profile-stats"};function UP(t,e,n,r,s,i){var o,l,c,u,d;return n.profile?(re(),ie("div",{key:0,class:"profile-box",onClick:e[2]||(e[2]=(...p)=>r.openModal&&r.openModal(...p))},[y("img",{src:r.profileImageUrl,alt:((o=n.profile.basicInfo)==null?void 0:o.name)||"Profile Image",onError:e[0]||(e[0]=(...p)=>r.handleImageError&&r.handleImageError(...p)),onLoad:e[1]||(e[1]=(...p)=>r.handleImageLoad&&r.handleImageLoad(...p))},null,40,VP),y("div",xP,[y("h3",null,J(((l=n.profile.basicInfo)==null?void 0:l.name)||"Unknown"),1),y("div",LP,[(re(!0),ie(qe,null,Dt(r.profileTypes,p=>(re(),ie("span",{key:p,class:rr(`profile-type ${p.toLowerCase()}-type`)},J(p),3))),128))])]),y("div",MP,[y("p",null,[e[3]||(e[3]=y("strong",null,"RegID:",-1)),ye(" "+J(n.profile.id),1)]),y("p",null,[e[4]||(e[4]=y("strong",null,"Age:",-1)),ye(" "+J(((c=n.profile.basicInfo)==null?void 0:c.age)||"N/A"),1)]),y("p",null,[e[5]||(e[5]=y("strong",null,"District:",-1)),ye(" "+J(((u=n.profile.basicInfo)==null?void 0:u.District)||"N/A"),1)]),y("p",null,[e[6]||(e[6]=y("strong",null,"Phone:",-1)),ye(" "+J(((d=n.profile.basicInfo)==null?void 0:d.phone)||"N/A"),1)])]),n.profile.computed?(re(),ie("div",FP,[y("p",null,[e[7]||(e[7]=y("strong",null,"Active Loans:",-1)),ye(" "+J(n.profile.computed.activeLoansCount),1)]),y("p",null,[e[8]||(e[8]=y("strong",null,"Total Loan Amount:",-1)),ye(" Rs. "+J(r.formatAmount(n.profile.computed.totalLoanAmount)),1)]),y("p",null,[e[9]||(e[9]=y("strong",null,"Remaining:",-1)),ye(" Rs. "+J(r.formatAmount(n.profile.computed.remainingLoanAmount)),1)])])):Ge("",!0)])):Ge("",!0)}const BP=Or(OP,[["render",UP],["__scopeId","data-v-1f6dbf67"]]),jP={name:"ProfileModal",props:{profile:{type:Object,required:!0},isVisible:{type:Boolean,default:!1}},emits:["close"],setup(t,{emit:e}){const n=Se("/placeholder-profile.jpg"),r=Se(!0),s=Se(0),i=Se([]),o=bt(()=>bn.getProfileTypes(t.profile)),l=g=>g?new Intl.NumberFormat("en-IN").format(g):"0",c=g=>g?new Date(g).toLocaleDateString("en-IN"):"N/A",u=g=>{if(console.log("Image failed to load for profile:",t.profile.id),s.value<i.value.length-1){s.value++;const k=i.value[s.value];console.log("Trying next URL format:",k),g.target.src=k;return}console.log("All URL formats failed, using placeholder"),g.target.src="/placeholder-profile.jpg",r.value=!1},d=()=>{r.value=!1},p=async()=>{try{if(await new Promise(k=>setTimeout(k,0)),!t.profile||!t.profile.id){console.log("Profile or profile.id is null/undefined:",t.profile),n.value="/placeholder-profile.jpg";return}let g=null;if(t.profile.Image){const k=t.profile.Image.match(/[-\w]{25,}/);k&&(g=k[0],console.log("Extracted file ID from Image URL:",g))}if(!g){console.log("No Image URL found for profile:",t.profile.id),n.value="/placeholder-profile.jpg";return}i.value=[`https://drive.google.com/thumbnail?id=${g}&sz=w300`,`https://drive.google.com/uc?export=view&id=${g}`,`https://drive.google.com/thumbnail?id=${g}&sz=w400`,`https://drive.google.com/thumbnail?id=${g}&sz=w200`],console.log("Generated URL formats for profile:",t.profile.id,i.value),s.value=0,n.value=i.value[0]}catch(g){console.error("Error loading profile image:",g),n.value="/placeholder-profile.jpg"}};return bi(()=>{p()}),Tr(()=>t.profile.id,()=>{p()}),{profileImageUrl:n,imageLoading:r,profileTypes:o,formatAmount:l,formatDate:c,handleImageError:u,handleImageLoad:d,closeModal:()=>{e("close")}}}},qP={class:"modal-header"},$P={class:"profile-types"},HP={class:"modal-body"},GP={class:"profile-image-section"},KP=["src","alt"],zP={class:"basic-info"},WP={class:"info-grid"},QP={class:"info-item"},YP={class:"info-item"},JP={class:"info-item"},XP={class:"info-item"},ZP={class:"info-item"},eS={class:"info-item"},tS={class:"info-item"},nS={class:"info-item"},rS={key:0,class:"loans-section"},sS={class:"loan-list"},iS={class:"loan-header"},oS={class:"loan-type"},aS={class:"loan-amount"},lS={class:"loan-details"},cS={key:0},uS={key:1,class:"grants-section"},hS={class:"grant-list"},dS={class:"grant-header"},fS={class:"grant-amount"},pS={class:"grant-details"},mS={key:2,class:"payments-section"},gS={class:"payment-list"},_S={class:"payment-header"},yS={class:"payment-type"},vS={class:"payment-amount"},ES={class:"payment-details"},IS={key:0},TS={key:3,class:"arms-section"},wS={class:"arms-list"},AS={key:4,class:"stats-section"},RS={class:"stats-grid"},bS={class:"stat-item"},PS={class:"stat-item"},SS={class:"stat-item"},CS={class:"stat-item"},DS={class:"stat-item"},kS={class:"stat-item"},NS={class:"stat-item"};function OS(t,e,n,r,s,i){var o,l,c,u,d,p,m,g,k;return n.isVisible&&n.profile?(re(),ie("div",{key:0,class:"modal",onClick:e[4]||(e[4]=(...S)=>r.closeModal&&r.closeModal(...S))},[y("div",{class:"modal-content",onClick:e[3]||(e[3]=wc(()=>{},["stop"]))},[y("div",{class:"close-button",onClick:e[0]||(e[0]=(...S)=>r.closeModal&&r.closeModal(...S))},"×"),y("div",qP,[y("h2",null,J(((o=n.profile.basicInfo)==null?void 0:o.name)||"Unknown"),1),y("div",$P,[(re(!0),ie(qe,null,Dt(r.profileTypes,S=>(re(),ie("span",{key:S,class:rr(`profile-type ${S.toLowerCase()}-type`)},J(S),3))),128))])]),y("div",HP,[y("div",GP,[y("img",{src:r.profileImageUrl,alt:((l=n.profile.basicInfo)==null?void 0:l.name)||"Profile Image",onError:e[1]||(e[1]=(...S)=>r.handleImageError&&r.handleImageError(...S)),onLoad:e[2]||(e[2]=(...S)=>r.handleImageLoad&&r.handleImageLoad(...S)),class:"profile-image"},null,40,KP)]),y("div",zP,[e[13]||(e[13]=y("h3",null,"Basic Information",-1)),y("div",WP,[y("div",QP,[e[5]||(e[5]=y("strong",null,"RegID:",-1)),ye(" "+J(n.profile.id),1)]),y("div",YP,[e[6]||(e[6]=y("strong",null,"Name:",-1)),ye(" "+J(((c=n.profile.basicInfo)==null?void 0:c.name)||"N/A"),1)]),y("div",JP,[e[7]||(e[7]=y("strong",null,"Age:",-1)),ye(" "+J(((u=n.profile.basicInfo)==null?void 0:u.age)||"N/A"),1)]),y("div",XP,[e[8]||(e[8]=y("strong",null,"District:",-1)),ye(" "+J(((d=n.profile.basicInfo)==null?void 0:d.District)||"N/A"),1)]),y("div",ZP,[e[9]||(e[9]=y("strong",null,"Phone:",-1)),ye(" "+J(((p=n.profile.basicInfo)==null?void 0:p.phone)||"N/A"),1)]),y("div",eS,[e[10]||(e[10]=y("strong",null,"Address:",-1)),ye(" "+J(((m=n.profile.basicInfo)==null?void 0:m.address)||"N/A"),1)]),y("div",tS,[e[11]||(e[11]=y("strong",null,"NIC:",-1)),ye(" "+J(((g=n.profile.basicInfo)==null?void 0:g.nic)||"N/A"),1)]),y("div",nS,[e[12]||(e[12]=y("strong",null,"Total Children:",-1)),ye(" "+J(((k=n.profile.basicInfo)==null?void 0:k.totalChildren)||"N/A"),1)])])]),n.profile.loans&&n.profile.loans.length>0?(re(),ie("div",rS,[e[18]||(e[18]=y("h3",null,"Loans",-1)),y("div",sS,[(re(!0),ie(qe,null,Dt(n.profile.loans,S=>(re(),ie("div",{key:S.id,class:"loan-item"},[y("div",iS,[y("span",oS,J(S.type),1),y("span",aS,"Rs. "+J(r.formatAmount(S.amount)),1)]),y("div",lS,[y("p",null,[e[14]||(e[14]=y("strong",null,"Purpose:",-1)),ye(" "+J(S.purpose),1)]),y("p",null,[e[15]||(e[15]=y("strong",null,"Date:",-1)),ye(" "+J(r.formatDate(S.date)),1)]),y("p",null,[e[16]||(e[16]=y("strong",null,"Status:",-1)),y("span",{class:rr(`status-${S.status}`)},J(S.status),3)]),S.paidAmount?(re(),ie("p",cS,[e[17]||(e[17]=y("strong",null,"Paid:",-1)),ye(" Rs. "+J(r.formatAmount(S.paidAmount)),1)])):Ge("",!0)])]))),128))])])):Ge("",!0),n.profile.grants&&n.profile.grants.length>0?(re(),ie("div",uS,[e[21]||(e[21]=y("h3",null,"Grants",-1)),y("div",hS,[(re(!0),ie(qe,null,Dt(n.profile.grants,S=>(re(),ie("div",{key:S.id,class:"grant-item"},[y("div",dS,[y("span",fS,"Rs. "+J(r.formatAmount(S.amount)),1)]),y("div",pS,[y("p",null,[e[19]||(e[19]=y("strong",null,"Purpose:",-1)),ye(" "+J(S.purpose),1)]),y("p",null,[e[20]||(e[20]=y("strong",null,"Date:",-1)),ye(" "+J(r.formatDate(S.date)),1)])])]))),128))])])):Ge("",!0),n.profile.paymentHistory&&n.profile.paymentHistory.length>0?(re(),ie("div",mS,[e[24]||(e[24]=y("h3",null,"Payment History",-1)),y("div",gS,[(re(!0),ie(qe,null,Dt(n.profile.paymentHistory,S=>(re(),ie("div",{key:S.id,class:"payment-item"},[y("div",_S,[y("span",yS,J(S.type),1),y("span",vS,"Rs. "+J(r.formatAmount(S.amount)),1)]),y("div",ES,[S.details?(re(),ie("p",IS,[e[22]||(e[22]=y("strong",null,"Details:",-1)),ye(" "+J(S.details),1)])):Ge("",!0),y("p",null,[e[23]||(e[23]=y("strong",null,"Date:",-1)),ye(" "+J(r.formatDate(S.date)),1)])])]))),128))])])):Ge("",!0),n.profile.arms&&n.profile.arms.length>0?(re(),ie("div",TS,[e[25]||(e[25]=y("h3",null,"Projects (ARMS)",-1)),y("div",wS,[(re(!0),ie(qe,null,Dt(n.profile.arms,S=>(re(),ie("div",{key:S,class:"arm-item"},J(S),1))),128))])])):Ge("",!0),n.profile.computed?(re(),ie("div",AS,[e[33]||(e[33]=y("h3",null,"Summary Statistics",-1)),y("div",RS,[y("div",bS,[e[26]||(e[26]=y("strong",null,"Active Loans:",-1)),ye(" "+J(n.profile.computed.activeLoansCount),1)]),y("div",PS,[e[27]||(e[27]=y("strong",null,"Completed Loans:",-1)),ye(" "+J(n.profile.computed.completedLoansCount),1)]),y("div",SS,[e[28]||(e[28]=y("strong",null,"Grants:",-1)),ye(" "+J(n.profile.computed.grantsCount),1)]),y("div",CS,[e[29]||(e[29]=y("strong",null,"Total Loan Amount:",-1)),ye(" Rs. "+J(r.formatAmount(n.profile.computed.totalLoanAmount)),1)]),y("div",DS,[e[30]||(e[30]=y("strong",null,"Total Grant Amount:",-1)),ye(" Rs. "+J(r.formatAmount(n.profile.computed.totalGrantAmount)),1)]),y("div",kS,[e[31]||(e[31]=y("strong",null,"Total Paid:",-1)),ye(" Rs. "+J(r.formatAmount(n.profile.computed.totalPaidAmount)),1)]),y("div",NS,[e[32]||(e[32]=y("strong",null,"Remaining Loan:",-1)),ye(" Rs. "+J(r.formatAmount(n.profile.computed.remainingLoanAmount)),1)])])])):Ge("",!0)])])])):Ge("",!0)}const VS=Or(jP,[["render",OS],["__scopeId","data-v-54a6d46e"]]),xS={name:"AnalyticsDashboard",setup(){const t=Se({stats:{},districtStats:{},yearStats:{}}),e=Se(!1),n=Se(null),r=async()=>{e.value=!0,n.value=null;try{t.value=await qt.getAnalyticsData()}catch(c){n.value="Failed to load analytics: "+c.message}finally{e.value=!1}},s=c=>c?new Intl.NumberFormat("en-IN").format(c):"0",i=c=>{const u=Object.values(t.value.districtStats||{}).reduce((d,p)=>d+p,0);return u===0?0:Math.round(c/u*100)},o=c=>{const u=Math.max(...Object.values(t.value.yearStats||{}));return u===0?0:Math.round(c/u*150)+20},l=bt(()=>({Colombo:{profiles:25,loans:30,grants:5,totalAmount:15e5},Gampaha:{profiles:20,loans:25,grants:3,totalAmount:12e5},Kandy:{profiles:15,loans:18,grants:2,totalAmount:9e5}}));return bi(()=>{r()}),{analytics:t,loading:e,error:n,formatAmount:s,getDistrictPercentage:i,getYearBarHeight:o,districtDetailedStats:l}}},LS={class:"analytics-container"},MS={class:"stats-grid"},FS={class:"stat-card"},US={class:"stat-value"},BS={class:"stat-card"},jS={class:"stat-value"},qS={class:"stat-card"},$S={class:"stat-value"},HS={class:"charts-grid"},GS={class:"chart-card"},KS={class:"district-chart"},zS={class:"district-label"},WS={class:"district-bar"},QS={class:"chart-card"},YS={class:"year-chart"},JS={class:"year-label"},XS={class:"detailed-stats"},ZS={class:"stats-table"};function eC(t,e,n,r,s,i){var o,l,c;return re(),ie("div",LS,[y("div",MS,[y("div",FS,[y("div",US,J(((o=r.analytics.stats)==null?void 0:o.totalProfiles)||0),1),e[0]||(e[0]=y("div",{class:"stat-label"},"Total Profiles",-1))]),y("div",BS,[y("div",jS,J(((l=r.analytics.stats)==null?void 0:l.totalLoans)||0),1),e[1]||(e[1]=y("div",{class:"stat-label"},"Total Loans",-1))]),y("div",qS,[y("div",$S,"Rs. "+J(r.formatAmount(((c=r.analytics.stats)==null?void 0:c.totalAmount)||0)),1),e[2]||(e[2]=y("div",{class:"stat-label"},"Total Amount",-1))])]),y("div",HS,[y("div",GS,[e[3]||(e[3]=y("div",{class:"chart-title"},[y("span",{class:"chart-icon"},"📊"),ye(" District Distribution ")],-1)),y("div",KS,[(re(!0),ie(qe,null,Dt(r.analytics.districtStats,(u,d)=>(re(),ie("div",{key:d,class:"district-item"},[y("div",zS,[y("span",null,J(d),1),y("span",null,J(u),1)]),y("div",WS,[y("div",{class:"district-fill",style:ai({width:r.getDistrictPercentage(u)+"%"})},null,4)])]))),128))])]),y("div",QS,[e[4]||(e[4]=y("div",{class:"chart-title"},[y("span",{class:"chart-icon"},"📈"),ye(" Yearly Growth ")],-1)),y("div",YS,[(re(!0),ie(qe,null,Dt(r.analytics.yearStats,(u,d)=>(re(),ie("div",{key:d,class:"year-item"},[y("div",{class:"year-bar",style:ai({height:r.getYearBarHeight(u)+"px"})},null,4),y("div",JS,J(d),1)]))),128))])])]),y("div",XS,[e[6]||(e[6]=y("h3",null,"Detailed Statistics",-1)),y("div",ZS,[e[5]||(e[5]=y("div",{class:"stats-row header"},[y("div",null,"District"),y("div",null,"Profiles"),y("div",null,"Loans"),y("div",null,"Grants"),y("div",null,"Total Amount")],-1)),(re(!0),ie(qe,null,Dt(r.districtDetailedStats,(u,d)=>(re(),ie("div",{key:d,class:"stats-row"},[y("div",null,J(d),1),y("div",null,J(u.profiles),1),y("div",null,J(u.loans),1),y("div",null,J(u.grants),1),y("div",null,"Rs. "+J(r.formatAmount(u.totalAmount)),1)]))),128))])])])}const p_=Or(xS,[["render",eC],["__scopeId","data-v-3b5deeaf"]]),tC={name:"HomePage",components:{ProfileCard:BP,ProfileModal:VS,AnalyticsDashboard:p_},setup(){const t=Se("profiles"),e=Se([]),n=Se(!1),r=Se(null),s=Se(!1),i=Se(null),o=Se(!1),l=Se(0),c=Se([]),u=Se(null),d=async()=>{try{u.value=await NP.getLogoImage()}catch(ne){console.error("Error loading logo:",ne),u.value="/placeholder-logo.png"}},p=Nr({District:"",type:"",year:""}),m=["Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle","Gampaha","Hambantota","Jaffna","Kalutara","Kandy","Kegalle","Kilinochchi","Kurunegala","Mannar","Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya","Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya"],g=bt(()=>{const ne=new Date().getFullYear(),ce=[];for(let A=ne;A>=2020;A--)ce.push(A);return ce}),k=async()=>{n.value=!0,r.value=null;try{const ne=await bn.getProfiles(p);console.log("Loaded profiles:",ne),e.value=ne.filter(ce=>!ce||!ce.id?(console.warn("Found invalid profile:",ce),!1):!0),console.log("Filtered profiles:",e.value)}catch(ne){r.value="Failed to load profiles: "+ne.message}finally{n.value=!1}},S=ne=>{i.value=ne,s.value=!0},O=()=>{s.value=!1,i.value=null},H=()=>{l.value++,l.value>=3&&(o.value=!0,l.value=0,q())},q=async()=>{try{c.value=[{id:1,level:"info",details:"System initialized",timestamp:new Date},{id:2,level:"info",details:"Profiles loaded",timestamp:new Date}]}catch(ne){console.error("Error loading system logs:",ne)}},$=ne=>new Date(ne).toLocaleString(),j=()=>{u.value="/placeholder-logo.png"};return bi(()=>{k(),d()}),{currentView:t,profiles:e,loading:n,error:r,filters:p,districts:m,years:g,showModal:s,selectedProfile:i,showDevTools:o,systemLogs:c,logoClickCount:l,logoUrl:u,loadProfiles:k,loadLogo:d,openProfileModal:S,closeProfileModal:O,handleLogoClick:H,handleLogoError:j,formatDate:$}}},nC={class:"home-page"},rC={class:"header-container"},sC={class:"logo-container"},iC=["src"],oC={class:"view-toggle"},aC={key:0,class:"profiles-view"},lC={class:"filters"},cC=["value"],uC=["value"],hC={key:0,class:"loading"},dC={key:1,class:"error"},fC={key:2,class:"profile-container"},pC={key:1,class:"analytics-view"},mC={key:2,class:"dev-tools-modal"},gC={class:"dev-tools-content"},_C={class:"dev-tools-header"},yC={class:"dev-tools-body"},vC={class:"raw-data"},EC={class:"system-logs"},IC={class:"log-level"},TC={class:"log-message"},wC={class:"log-time"};function AC(t,e,n,r,s,i){const o=po("ProfileCard"),l=po("AnalyticsDashboard"),c=po("ProfileModal");return re(),ie("div",nC,[y("div",rC,[y("div",sC,[y("img",{src:r.logoUrl||"/placeholder-logo.png",alt:"WERESL Logo",class:"logo",onClick:e[0]||(e[0]=(...u)=>r.handleLogoClick&&r.handleLogoClick(...u)),onError:e[1]||(e[1]=(...u)=>r.handleLogoError&&r.handleLogoError(...u))},null,40,iC)])]),e[17]||(e[17]=y("h1",null,"WERESL Database",-1)),y("div",oC,[y("button",{class:rr(["view-btn",{active:r.currentView==="profiles"}]),onClick:e[2]||(e[2]=u=>r.currentView="profiles")}," Profiles ",2),y("button",{class:rr(["view-btn",{active:r.currentView==="analytics"}]),onClick:e[3]||(e[3]=u=>r.currentView="analytics")}," Analytics ",2)]),r.currentView==="profiles"?(re(),ie("div",aC,[y("div",lC,[je(y("select",{"onUpdate:modelValue":e[4]||(e[4]=u=>r.filters.District=u),onChange:e[5]||(e[5]=(...u)=>r.loadProfiles&&r.loadProfiles(...u))},[e[11]||(e[11]=y("option",{value:""},"All Districts",-1)),(re(!0),ie(qe,null,Dt(r.districts,u=>(re(),ie("option",{key:u,value:u},J(u),9,cC))),128))],544),[[wr,r.filters.District]]),je(y("select",{"onUpdate:modelValue":e[6]||(e[6]=u=>r.filters.type=u),onChange:e[7]||(e[7]=(...u)=>r.loadProfiles&&r.loadProfiles(...u))},e[12]||(e[12]=[y("option",{value:""},"All Types",-1),y("option",{value:"RF"},"RF",-1),y("option",{value:"GRANT"},"GRANT",-1),y("option",{value:"GIF"},"GIF",-1)]),544),[[wr,r.filters.type]]),je(y("select",{"onUpdate:modelValue":e[8]||(e[8]=u=>r.filters.year=u),onChange:e[9]||(e[9]=(...u)=>r.loadProfiles&&r.loadProfiles(...u))},[e[13]||(e[13]=y("option",{value:""},"All Years",-1)),(re(!0),ie(qe,null,Dt(r.years,u=>(re(),ie("option",{key:u,value:u},J(u),9,uC))),128))],544),[[wr,r.filters.year]])]),r.loading?(re(),ie("div",hC," Loading profiles... ")):r.error?(re(),ie("div",dC,J(r.error),1)):(re(),ie("div",fC,[(re(!0),ie(qe,null,Dt(r.profiles.filter(u=>u&&u.id),u=>(re(),kp(o,{key:u.id,profile:u,onOpenModal:r.openProfileModal},null,8,["profile","onOpenModal"]))),128))]))])):r.currentView==="analytics"?(re(),ie("div",pC,[_t(l)])):Ge("",!0),_t(c,{profile:r.selectedProfile,"is-visible":r.showModal,onClose:r.closeProfileModal},null,8,["profile","is-visible","onClose"]),r.showDevTools?(re(),ie("div",mC,[y("div",gC,[y("div",_C,[e[14]||(e[14]=y("h3",null,"Developer Tools",-1)),y("button",{onClick:e[10]||(e[10]=u=>r.showDevTools=!1),class:"close-btn"},"×")]),y("div",yC,[y("div",vC,[e[15]||(e[15]=y("h4",null,"Raw Firebase Data",-1)),y("pre",null,J(JSON.stringify(r.profiles,null,2)),1)]),y("div",EC,[e[16]||(e[16]=y("h4",null,"System Logs",-1)),(re(!0),ie(qe,null,Dt(r.systemLogs,u=>(re(),ie("div",{key:u.id,class:"log-entry"},[y("span",IC,J(u.level),1),y("span",TC,J(u.details),1),y("span",wC,J(r.formatDate(u.timestamp)),1)]))),128))])])])])):Ge("",!0),e[18]||(e[18]=y("div",{class:"footer"},[y("p",null,"WERESL Database Management System")],-1))])}const RC=Or(tC,[["render",AC],["__scopeId","data-v-c6008ff8"]]),bC={name:"LoanInitForm",setup(){const t=Se(!1),e=Se(null),n=Se(null),r=Se(null),s=["Mannar","Colombo","Batticaloa","Gampaha","Kalutara","Kandy","Kurunegala","Jaffna","Vavuniya","Trincomalee","Matara","Hambantota","Monaragala","Anuradhapura","Polonnaruwa","Puttalam","Ratnapura","Nuwara Eliya","Badulla","Kegalle","Mullaitivu","Matale","Ampara","Kilinochchi","Galle"],i=Nr({registered:"",regId:"",basicInfo:{name:"",age:"",nic:"",phone:"",District:"",address:"",totalChildren:"",schoolKids:""},description:"",industry:"",loanType:"",amount:"",purpose:"",imageFile:null}),o=d=>{const p=d.target.files[0];if(p){i.imageFile=p;const m=new FileReader;m.onload=g=>{r.value=g.target.result},m.readAsDataURL(p)}},l=()=>{const d=[];if(i.registered==="Yes"&&!i.regId&&d.push("Registration ID is required for registered users"),i.registered==="No"){const m=bn.validateProfileData({basicInfo:i.basicInfo});d.push(...m)}const p=bn.validateLoanData({type:i.loanType,amount:i.amount,purpose:i.purpose});return d.push(...p),d},c=async()=>{e.value=null,n.value=null;const d=l();if(d.length>0){e.value=d.join(", ");return}t.value=!0;try{const p={type:i.loanType,amount:parseFloat(i.amount),purpose:i.purpose,date:new Date};if(i.registered==="Yes")await bn.addLoan(i.regId,p),n.value=`Loan added successfully to profile ${i.regId}`;else{const m={basicInfo:i.basicInfo,loans:[p],imageFile:i.imageFile},g=await bn.createProfile(m);n.value=`New profile created successfully with RegID: ${g}`}u()}catch(p){e.value="Failed to process loan: "+p.message}finally{t.value=!1}},u=()=>{Object.keys(i).forEach(d=>{d==="basicInfo"?Object.keys(i.basicInfo).forEach(p=>{i.basicInfo[p]=""}):i[d]=""}),r.value=null,e.value=null,n.value=null};return{loading:t,error:e,success:n,districts:s,formData:i,imagePreview:r,handleImageUpload:o,handleSubmit:c,resetForm:u}}},PC={class:"loan-init-form"},SC={class:"form-section"},CC={class:"form-group"},DC={key:0,class:"form-group"},kC={key:1,class:"new-user-fields"},NC={class:"form-row"},OC={class:"form-group"},VC={class:"form-group"},xC={class:"form-row"},LC={class:"form-group"},MC={class:"form-group"},FC={class:"form-row"},UC={class:"form-group"},BC=["value"],jC={class:"form-group"},qC={class:"form-row"},$C={class:"form-group"},HC={class:"form-group"},GC={class:"form-group"},KC={class:"form-group"},zC={class:"form-section"},WC={class:"form-row"},QC={class:"form-group"},YC={class:"form-group"},JC={class:"form-group"},XC={class:"form-section"},ZC={class:"form-group"},e1={key:0,class:"image-preview"},t1=["src"],n1={class:"form-actions"},r1=["disabled"],s1={key:0,class:"error-message"},i1={key:1,class:"success-message"};function o1(t,e,n,r,s,i){return re(),ie("div",PC,[e[41]||(e[41]=y("div",{class:"form-header"},[y("h2",null,"Loan Initialization Form"),y("p",null,"Register new loans for existing or new users")],-1)),y("form",{onSubmit:e[17]||(e[17]=wc((...o)=>r.handleSubmit&&r.handleSubmit(...o),["prevent"])),class:"form"},[y("div",SC,[e[32]||(e[32]=y("h3",null,"User Information",-1)),y("div",CC,[e[19]||(e[19]=y("label",{for:"registered"},"User Type",-1)),je(y("select",{"onUpdate:modelValue":e[0]||(e[0]=o=>r.formData.registered=o),required:""},e[18]||(e[18]=[y("option",{value:""},"Select User Type",-1),y("option",{value:"Yes"},"Registered User",-1),y("option",{value:"No"},"New User",-1)]),512),[[wr,r.formData.registered]])]),r.formData.registered==="Yes"?(re(),ie("div",DC,[e[20]||(e[20]=y("label",{for:"regId"},"Registration ID",-1)),je(y("input",{type:"text",id:"regId","onUpdate:modelValue":e[1]||(e[1]=o=>r.formData.regId=o),placeholder:"Enter RegID",required:""},null,512),[[dt,r.formData.regId]])])):Ge("",!0),r.formData.registered==="No"?(re(),ie("div",kC,[y("div",NC,[y("div",OC,[e[21]||(e[21]=y("label",{for:"name"},"Full Name",-1)),je(y("input",{type:"text",id:"name","onUpdate:modelValue":e[2]||(e[2]=o=>r.formData.basicInfo.name=o),placeholder:"Enter full name",required:""},null,512),[[dt,r.formData.basicInfo.name]])]),y("div",VC,[e[22]||(e[22]=y("label",{for:"age"},"Age",-1)),je(y("input",{type:"number",id:"age","onUpdate:modelValue":e[3]||(e[3]=o=>r.formData.basicInfo.age=o),placeholder:"Enter age",min:"0",required:""},null,512),[[dt,r.formData.basicInfo.age]])])]),y("div",xC,[y("div",LC,[e[23]||(e[23]=y("label",{for:"nic"},"NIC Number",-1)),je(y("input",{type:"text",id:"nic","onUpdate:modelValue":e[4]||(e[4]=o=>r.formData.basicInfo.nic=o),placeholder:"Enter NIC number",required:""},null,512),[[dt,r.formData.basicInfo.nic]])]),y("div",MC,[e[24]||(e[24]=y("label",{for:"phone"},"Phone Number",-1)),je(y("input",{type:"tel",id:"phone","onUpdate:modelValue":e[5]||(e[5]=o=>r.formData.basicInfo.phone=o),placeholder:"Enter phone number",required:""},null,512),[[dt,r.formData.basicInfo.phone]])])]),y("div",FC,[y("div",UC,[e[26]||(e[26]=y("label",{for:"district"},"District",-1)),je(y("select",{id:"district","onUpdate:modelValue":e[6]||(e[6]=o=>r.formData.basicInfo.District=o),required:""},[e[25]||(e[25]=y("option",{value:""},"Select District",-1)),(re(!0),ie(qe,null,Dt(r.districts,o=>(re(),ie("option",{key:o,value:o},J(o),9,BC))),128))],512),[[wr,r.formData.basicInfo.District]])]),y("div",jC,[e[27]||(e[27]=y("label",{for:"address"},"Address",-1)),je(y("textarea",{id:"address","onUpdate:modelValue":e[7]||(e[7]=o=>r.formData.basicInfo.address=o),placeholder:"Enter address",required:""},null,512),[[dt,r.formData.basicInfo.address]])])]),y("div",qC,[y("div",$C,[e[28]||(e[28]=y("label",{for:"totalChildren"},"Total Children",-1)),je(y("input",{type:"number",id:"totalChildren","onUpdate:modelValue":e[8]||(e[8]=o=>r.formData.basicInfo.totalChildren=o),placeholder:"Enter number of children",min:"0",required:""},null,512),[[dt,r.formData.basicInfo.totalChildren]])]),y("div",HC,[e[29]||(e[29]=y("label",{for:"schoolKids"},"School-going Children",-1)),je(y("input",{type:"number",id:"schoolKids","onUpdate:modelValue":e[9]||(e[9]=o=>r.formData.basicInfo.schoolKids=o),placeholder:"Enter number of school children",min:"0",required:""},null,512),[[dt,r.formData.basicInfo.schoolKids]])])]),y("div",GC,[e[30]||(e[30]=y("label",{for:"description"},"Description",-1)),je(y("textarea",{id:"description","onUpdate:modelValue":e[10]||(e[10]=o=>r.formData.description=o),placeholder:"Enter description",required:""},null,512),[[dt,r.formData.description]])]),y("div",KC,[e[31]||(e[31]=y("label",{for:"industry"},"Industry",-1)),je(y("input",{type:"text",id:"industry","onUpdate:modelValue":e[11]||(e[11]=o=>r.formData.industry=o),placeholder:"Enter industry",required:""},null,512),[[dt,r.formData.industry]])])])):Ge("",!0)]),y("div",zC,[e[37]||(e[37]=y("h3",null,"Loan Information",-1)),y("div",WC,[y("div",QC,[e[34]||(e[34]=y("label",{for:"loanType"},"Loan Type",-1)),je(y("select",{id:"loanType","onUpdate:modelValue":e[12]||(e[12]=o=>r.formData.loanType=o),required:""},e[33]||(e[33]=[y("option",{value:""},"Select Loan Type",-1),y("option",{value:"RF"},"RF",-1),y("option",{value:"GRANT"},"GRANT",-1),y("option",{value:"GIF"},"GIF",-1)]),512),[[wr,r.formData.loanType]])]),y("div",YC,[e[35]||(e[35]=y("label",{for:"amount"},"Amount (Rs.)",-1)),je(y("input",{type:"number",id:"amount","onUpdate:modelValue":e[13]||(e[13]=o=>r.formData.amount=o),placeholder:"Enter amount",min:"0",step:"0.01",required:""},null,512),[[dt,r.formData.amount]])])]),y("div",JC,[e[36]||(e[36]=y("label",{for:"purpose"},"Purpose",-1)),je(y("textarea",{id:"purpose","onUpdate:modelValue":e[14]||(e[14]=o=>r.formData.purpose=o),placeholder:"Enter loan purpose",required:""},null,512),[[dt,r.formData.purpose]])])]),y("div",XC,[e[40]||(e[40]=y("h3",null,"Image Upload",-1)),y("div",ZC,[e[38]||(e[38]=y("label",{for:"image"},"Profile Image",-1)),y("input",{type:"file",id:"image",onChange:e[15]||(e[15]=(...o)=>r.handleImageUpload&&r.handleImageUpload(...o)),accept:"image/*",required:""},null,32),e[39]||(e[39]=y("small",null,"Supported formats: JPG, PNG, HEIC. Max size: 5MB",-1))]),r.imagePreview?(re(),ie("div",e1,[y("img",{src:r.imagePreview,alt:"Preview"},null,8,t1)])):Ge("",!0)]),y("div",n1,[y("button",{type:"button",onClick:e[16]||(e[16]=(...o)=>r.resetForm&&r.resetForm(...o)),class:"btn-secondary"},"Reset"),y("button",{type:"submit",disabled:r.loading,class:"btn-primary"},J(r.loading?"Processing...":"Submit Loan"),9,r1)])],32),r.error?(re(),ie("div",s1,J(r.error),1)):Ge("",!0),r.success?(re(),ie("div",i1,J(r.success),1)):Ge("",!0)])}const a1=Or(bC,[["render",o1],["__scopeId","data-v-28b883d0"]]),l1={name:"PaymentForm",setup(){const t=Se(!1),e=Se(null),n=Se(null),r=Se(null),s=Nr({regId:"",type:"",amount:"",details:"",date:new Date().toISOString().split("T")[0]}),i=async d=>{if(!d){r.value=null;return}try{r.value=await bn.getProfile(d)}catch(p){console.error("Error loading profile:",p),r.value=null}},o=()=>{const d=[];return s.regId||d.push("Registration ID is required"),s.type||d.push("Payment type is required"),s.type==="RF"&&(!s.amount||s.amount<=0)&&d.push("Valid payment amount is required for RF payments"),s.type==="GRANT"&&(s.details||d.push("Details are required for GRANT payments")),d},l=async()=>{e.value=null,n.value=null;const d=o();if(d.length>0){e.value=d.join(", ");return}t.value=!0;try{const p={regId:s.regId,type:s.type,amount:parseFloat(s.amount)||0,details:s.details,date:new Date(s.date)};await bn.processPayment(p),s.type==="RF"?n.value=`RF payment of Rs. ${s.amount} processed successfully for ${s.regId}`:n.value=`Grant "Give It Forward" entry processed successfully for ${s.regId}`,c()}catch(p){e.value="Failed to process payment: "+p.message}finally{t.value=!1}},c=()=>{Object.keys(s).forEach(d=>{d==="date"?s[d]=new Date().toISOString().split("T")[0]:s[d]=""}),r.value=null,e.value=null,n.value=null},u=d=>d?new Intl.NumberFormat("en-IN").format(d):"0";return Tr(()=>s.regId,d=>{d?i(d):r.value=null}),{loading:t,error:e,success:n,profile:r,formData:s,handleSubmit:l,resetForm:c,formatAmount:u}}},c1={class:"payment-form"},u1={class:"form-section"},h1={class:"form-row"},d1={class:"form-group"},f1={class:"form-group"},p1={key:0,class:"form-group"},m1={key:1,class:"form-group"},g1={class:"form-group"},_1={key:0,class:"profile-preview"},y1={class:"profile-info"},v1={class:"form-actions"},E1=["disabled"],I1={key:0,class:"error-message"},T1={key:1,class:"success-message"};function w1(t,e,n,r,s,i){var o,l,c,u,d;return re(),ie("div",c1,[e[20]||(e[20]=y("div",{class:"form-header"},[y("h2",null,"Payment Return Form"),y("p",null,'Process RF loan payments and Grant "Give It Forward" entries')],-1)),y("form",{onSubmit:e[6]||(e[6]=wc((...p)=>r.handleSubmit&&r.handleSubmit(...p),["prevent"])),class:"form"},[y("div",u1,[e[13]||(e[13]=y("h3",null,"Payment Information",-1)),y("div",h1,[y("div",d1,[e[7]||(e[7]=y("label",{for:"regId"},"Registration ID",-1)),je(y("input",{type:"text",id:"regId","onUpdate:modelValue":e[0]||(e[0]=p=>r.formData.regId=p),placeholder:"Enter RegID",required:""},null,512),[[dt,r.formData.regId]])]),y("div",f1,[e[9]||(e[9]=y("label",{for:"type"},"Payment Type",-1)),je(y("select",{id:"type","onUpdate:modelValue":e[1]||(e[1]=p=>r.formData.type=p),required:""},e[8]||(e[8]=[y("option",{value:""},"Select Type",-1),y("option",{value:"RF"},"RF Loan Payment",-1),y("option",{value:"GRANT"},'Grant "Give It Forward"',-1)]),512),[[wr,r.formData.type]])])]),r.formData.type==="RF"?(re(),ie("div",p1,[e[10]||(e[10]=y("label",{for:"amount"},"Payment Amount (Rs.)",-1)),je(y("input",{type:"number",id:"amount","onUpdate:modelValue":e[2]||(e[2]=p=>r.formData.amount=p),placeholder:"Enter payment amount",min:"0",step:"0.01",required:""},null,512),[[dt,r.formData.amount]])])):Ge("",!0),r.formData.type==="GRANT"?(re(),ie("div",m1,[e[11]||(e[11]=y("label",{for:"details"},"Give It Forward Details",-1)),je(y("textarea",{id:"details","onUpdate:modelValue":e[3]||(e[3]=p=>r.formData.details=p),placeholder:"Enter details about the grant recipient",required:""},null,512),[[dt,r.formData.details]])])):Ge("",!0),y("div",g1,[e[12]||(e[12]=y("label",{for:"date"},"Payment Date",-1)),je(y("input",{type:"date",id:"date","onUpdate:modelValue":e[4]||(e[4]=p=>r.formData.date=p),required:""},null,512),[[dt,r.formData.date]])])]),r.profile?(re(),ie("div",_1,[e[19]||(e[19]=y("h3",null,"Profile Preview",-1)),y("div",y1,[y("p",null,[e[14]||(e[14]=y("strong",null,"Name:",-1)),ye(" "+J((o=r.profile.basicInfo)==null?void 0:o.name),1)]),y("p",null,[e[15]||(e[15]=y("strong",null,"District:",-1)),ye(" "+J((l=r.profile.basicInfo)==null?void 0:l.District),1)]),y("p",null,[e[16]||(e[16]=y("strong",null,"Active Loans:",-1)),ye(" "+J(((c=r.profile.computed)==null?void 0:c.activeLoansCount)||0),1)]),y("p",null,[e[17]||(e[17]=y("strong",null,"Total Loan Amount:",-1)),ye(" Rs. "+J(r.formatAmount(((u=r.profile.computed)==null?void 0:u.totalLoanAmount)||0)),1)]),y("p",null,[e[18]||(e[18]=y("strong",null,"Remaining Amount:",-1)),ye(" Rs. "+J(r.formatAmount(((d=r.profile.computed)==null?void 0:d.remainingLoanAmount)||0)),1)])])])):Ge("",!0),y("div",v1,[y("button",{type:"button",onClick:e[5]||(e[5]=(...p)=>r.resetForm&&r.resetForm(...p)),class:"btn-secondary"},"Reset"),y("button",{type:"submit",disabled:r.loading,class:"btn-primary"},J(r.loading?"Processing...":"Submit Payment"),9,E1)])],32),r.error?(re(),ie("div",I1,J(r.error),1)):Ge("",!0),r.success?(re(),ie("div",T1,J(r.success),1)):Ge("",!0)])}const A1=Or(l1,[["render",w1],["__scopeId","data-v-654bf1c2"]]),R1=[{path:"/",name:"Home",component:RC},{path:"/loan-init",name:"LoanInit",component:a1},{path:"/payment",name:"Payment",component:A1},{path:"/analytics",name:"Analytics",component:p_},{path:"/admin",name:"Admin",component:()=>B_(()=>import("./AdminPage-CfX_rU77.js"),__vite__mapDeps([0,1]))}],b1=cI({history:FE(),routes:R1}),P1=dI(),Eu=iE(gI);Eu.use(b1);Eu.use(P1);Eu.mount("#app");export{qe as F,Or as _,y as a,_t as b,ie as c,po as d,Se as e,bi as f,qt as g,ye as h,rr as n,re as o,Dt as r,J as t,Dy as w};
