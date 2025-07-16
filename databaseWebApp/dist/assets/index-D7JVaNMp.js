(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function ic(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ve={},zr=[],nn=()=>{},L_=()=>!1,Zo=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),oc=t=>t.startsWith("onUpdate:"),yt=Object.assign,ac=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},M_=Object.prototype.hasOwnProperty,De=(t,e)=>M_.call(t,e),ue=Array.isArray,Wr=t=>wi(t)==="[object Map]",ea=t=>wi(t)==="[object Set]",dh=t=>wi(t)==="[object Date]",ge=t=>typeof t=="function",Ye=t=>typeof t=="string",cn=t=>typeof t=="symbol",Le=t=>t!==null&&typeof t=="object",Df=t=>(Le(t)||ge(t))&&ge(t.then)&&ge(t.catch),kf=Object.prototype.toString,wi=t=>kf.call(t),F_=t=>wi(t).slice(8,-1),Nf=t=>wi(t)==="[object Object]",lc=t=>Ye(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,zs=ic(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ta=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},U_=/-(\w)/g,qt=ta(t=>t.replace(U_,(e,n)=>n?n.toUpperCase():"")),B_=/\B([A-Z])/g,kr=ta(t=>t.replace(B_,"-$1").toLowerCase()),na=ta(t=>t.charAt(0).toUpperCase()+t.slice(1)),Wa=ta(t=>t?`on${na(t)}`:""),Zn=(t,e)=>!Object.is(t,e),uo=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},El=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},Ro=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let fh;const ra=()=>fh||(fh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function cc(t){if(ue(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=Ye(r)?$_(r):cc(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(Ye(t)||Le(t))return t}const j_=/;(?![^(]*\))/g,q_=/:([^]+)/,H_=/\/\*[^]*?\*\//g;function $_(t){const e={};return t.replace(H_,"").split(j_).forEach(n=>{if(n){const r=n.split(q_);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Rr(t){let e="";if(Ye(t))e=t;else if(ue(t))for(let n=0;n<t.length;n++){const r=Rr(t[n]);r&&(e+=r+" ")}else if(Le(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const G_="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",K_=ic(G_);function Of(t){return!!t||t===""}function z_(t,e){if(t.length!==e.length)return!1;let n=!0;for(let r=0;n&&r<t.length;r++)n=sa(t[r],e[r]);return n}function sa(t,e){if(t===e)return!0;let n=dh(t),r=dh(e);if(n||r)return n&&r?t.getTime()===e.getTime():!1;if(n=cn(t),r=cn(e),n||r)return t===e;if(n=ue(t),r=ue(e),n||r)return n&&r?z_(t,e):!1;if(n=Le(t),r=Le(e),n||r){if(!n||!r)return!1;const s=Object.keys(t).length,i=Object.keys(e).length;if(s!==i)return!1;for(const o in t){const l=t.hasOwnProperty(o),c=e.hasOwnProperty(o);if(l&&!c||!l&&c||!sa(t[o],e[o]))return!1}}return String(t)===String(e)}function W_(t,e){return t.findIndex(n=>sa(n,e))}const Vf=t=>!!(t&&t.__v_isRef===!0),ne=t=>Ye(t)?t:t==null?"":ue(t)||Le(t)&&(t.toString===kf||!ge(t.toString))?Vf(t)?ne(t.value):JSON.stringify(t,xf,2):String(t),xf=(t,e)=>Vf(e)?xf(t,e.value):Wr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[Qa(r,i)+" =>"]=s,n),{})}:ea(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Qa(n))}:cn(e)?Qa(e):Le(e)&&!ue(e)&&!Nf(e)?String(e):e,Qa=(t,e="")=>{var n;return cn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let St;class Lf{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=St,!e&&St&&(this.index=(St.scopes||(St.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=St;try{return St=this,e()}finally{St=n}}}on(){++this._on===1&&(this.prevScope=St,St=this)}off(){this._on>0&&--this._on===0&&(St=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Q_(t){return new Lf(t)}function Y_(){return St}let xe;const Ya=new WeakSet;class Mf{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,St&&St.active&&St.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ya.has(this)&&(Ya.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Uf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,ph(this),Bf(this);const e=xe,n=Wt;xe=this,Wt=!0;try{return this.fn()}finally{jf(this),xe=e,Wt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)dc(e);this.deps=this.depsTail=void 0,ph(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ya.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Il(this)&&this.run()}get dirty(){return Il(this)}}let Ff=0,Ws,Qs;function Uf(t,e=!1){if(t.flags|=8,e){t.next=Qs,Qs=t;return}t.next=Ws,Ws=t}function uc(){Ff++}function hc(){if(--Ff>0)return;if(Qs){let e=Qs;for(Qs=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Ws;){let e=Ws;for(Ws=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function Bf(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function jf(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),dc(r),J_(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function Il(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(qf(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function qf(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===ai)||(t.globalVersion=ai,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Il(t))))return;t.flags|=2;const e=t.dep,n=xe,r=Wt;xe=t,Wt=!0;try{Bf(t);const s=t.fn(t._value);(e.version===0||Zn(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{xe=n,Wt=r,jf(t),t.flags&=-3}}function dc(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)dc(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function J_(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Wt=!0;const Hf=[];function Cn(){Hf.push(Wt),Wt=!1}function Dn(){const t=Hf.pop();Wt=t===void 0?!0:t}function ph(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=xe;xe=void 0;try{e()}finally{xe=n}}}let ai=0;class X_{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class fc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!xe||!Wt||xe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==xe)n=this.activeLink=new X_(xe,this),xe.deps?(n.prevDep=xe.depsTail,xe.depsTail.nextDep=n,xe.depsTail=n):xe.deps=xe.depsTail=n,$f(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=xe.depsTail,n.nextDep=void 0,xe.depsTail.nextDep=n,xe.depsTail=n,xe.deps===n&&(xe.deps=r)}return n}trigger(e){this.version++,ai++,this.notify(e)}notify(e){uc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{hc()}}}function $f(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)$f(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Tl=new WeakMap,Er=Symbol(""),wl=Symbol(""),li=Symbol("");function pt(t,e,n){if(Wt&&xe){let r=Tl.get(t);r||Tl.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new fc),s.map=r,s.key=n),s.track()}}function In(t,e,n,r,s,i){const o=Tl.get(t);if(!o){ai++;return}const l=c=>{c&&c.trigger()};if(uc(),e==="clear")o.forEach(l);else{const c=ue(t),h=c&&lc(n);if(c&&n==="length"){const d=Number(r);o.forEach((p,g)=>{(g==="length"||g===li||!cn(g)&&g>=d)&&l(p)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),h&&l(o.get(li)),e){case"add":c?h&&l(o.get("length")):(l(o.get(Er)),Wr(t)&&l(o.get(wl)));break;case"delete":c||(l(o.get(Er)),Wr(t)&&l(o.get(wl)));break;case"set":Wr(t)&&l(o.get(Er));break}}hc()}function Br(t){const e=Ce(t);return e===t?e:(pt(e,"iterate",li),jt(t)?e:e.map(st))}function ia(t){return pt(t=Ce(t),"iterate",li),t}const Z_={__proto__:null,[Symbol.iterator](){return Ja(this,Symbol.iterator,st)},concat(...t){return Br(this).concat(...t.map(e=>ue(e)?Br(e):e))},entries(){return Ja(this,"entries",t=>(t[1]=st(t[1]),t))},every(t,e){return yn(this,"every",t,e,void 0,arguments)},filter(t,e){return yn(this,"filter",t,e,n=>n.map(st),arguments)},find(t,e){return yn(this,"find",t,e,st,arguments)},findIndex(t,e){return yn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return yn(this,"findLast",t,e,st,arguments)},findLastIndex(t,e){return yn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return yn(this,"forEach",t,e,void 0,arguments)},includes(...t){return Xa(this,"includes",t)},indexOf(...t){return Xa(this,"indexOf",t)},join(t){return Br(this).join(t)},lastIndexOf(...t){return Xa(this,"lastIndexOf",t)},map(t,e){return yn(this,"map",t,e,void 0,arguments)},pop(){return xs(this,"pop")},push(...t){return xs(this,"push",t)},reduce(t,...e){return mh(this,"reduce",t,e)},reduceRight(t,...e){return mh(this,"reduceRight",t,e)},shift(){return xs(this,"shift")},some(t,e){return yn(this,"some",t,e,void 0,arguments)},splice(...t){return xs(this,"splice",t)},toReversed(){return Br(this).toReversed()},toSorted(t){return Br(this).toSorted(t)},toSpliced(...t){return Br(this).toSpliced(...t)},unshift(...t){return xs(this,"unshift",t)},values(){return Ja(this,"values",st)}};function Ja(t,e,n){const r=ia(t),s=r[e]();return r!==t&&!jt(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const ey=Array.prototype;function yn(t,e,n,r,s,i){const o=ia(t),l=o!==t&&!jt(t),c=o[e];if(c!==ey[e]){const p=c.apply(t,i);return l?st(p):p}let h=n;o!==t&&(l?h=function(p,g){return n.call(this,st(p),g,t)}:n.length>2&&(h=function(p,g){return n.call(this,p,g,t)}));const d=c.call(o,h,r);return l&&s?s(d):d}function mh(t,e,n,r){const s=ia(t);let i=n;return s!==t&&(jt(t)?n.length>3&&(i=function(o,l,c){return n.call(this,o,l,c,t)}):i=function(o,l,c){return n.call(this,o,st(l),c,t)}),s[e](i,...r)}function Xa(t,e,n){const r=Ce(t);pt(r,"iterate",li);const s=r[e](...n);return(s===-1||s===!1)&&gc(n[0])?(n[0]=Ce(n[0]),r[e](...n)):s}function xs(t,e,n=[]){Cn(),uc();const r=Ce(t)[e].apply(t,n);return hc(),Dn(),r}const ty=ic("__proto__,__v_isRef,__isVue"),Gf=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(cn));function ny(t){cn(t)||(t=String(t));const e=Ce(this);return pt(e,"has",t),e.hasOwnProperty(t)}class Kf{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?dy:Yf:i?Qf:Wf).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=ue(e);if(!s){let c;if(o&&(c=Z_[n]))return c;if(n==="hasOwnProperty")return ny}const l=Reflect.get(e,n,_t(e)?e:r);return(cn(n)?Gf.has(n):ty(n))||(s||pt(e,"get",n),i)?l:_t(l)?o&&lc(n)?l:l.value:Le(l)?s?Xf(l):Nr(l):l}}class zf extends Kf{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const c=rr(i);if(!jt(r)&&!rr(r)&&(i=Ce(i),r=Ce(r)),!ue(e)&&_t(i)&&!_t(r))return c?!1:(i.value=r,!0)}const o=ue(e)&&lc(n)?Number(n)<e.length:De(e,n),l=Reflect.set(e,n,r,_t(e)?e:s);return e===Ce(s)&&(o?Zn(r,i)&&In(e,"set",n,r):In(e,"add",n,r)),l}deleteProperty(e,n){const r=De(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&In(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!cn(n)||!Gf.has(n))&&pt(e,"has",n),r}ownKeys(e){return pt(e,"iterate",ue(e)?"length":Er),Reflect.ownKeys(e)}}class ry extends Kf{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const sy=new zf,iy=new ry,oy=new zf(!0);const Al=t=>t,to=t=>Reflect.getPrototypeOf(t);function ay(t,e,n){return function(...r){const s=this.__v_raw,i=Ce(s),o=Wr(i),l=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,h=s[t](...r),d=n?Al:e?bo:st;return!e&&pt(i,"iterate",c?wl:Er),{next(){const{value:p,done:g}=h.next();return g?{value:p,done:g}:{value:l?[d(p[0]),d(p[1])]:d(p),done:g}},[Symbol.iterator](){return this}}}}function no(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function ly(t,e){const n={get(s){const i=this.__v_raw,o=Ce(i),l=Ce(s);t||(Zn(s,l)&&pt(o,"get",s),pt(o,"get",l));const{has:c}=to(o),h=e?Al:t?bo:st;if(c.call(o,s))return h(i.get(s));if(c.call(o,l))return h(i.get(l));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&pt(Ce(s),"iterate",Er),Reflect.get(s,"size",s)},has(s){const i=this.__v_raw,o=Ce(i),l=Ce(s);return t||(Zn(s,l)&&pt(o,"has",s),pt(o,"has",l)),s===l?i.has(s):i.has(s)||i.has(l)},forEach(s,i){const o=this,l=o.__v_raw,c=Ce(l),h=e?Al:t?bo:st;return!t&&pt(c,"iterate",Er),l.forEach((d,p)=>s.call(i,h(d),h(p),o))}};return yt(n,t?{add:no("add"),set:no("set"),delete:no("delete"),clear:no("clear")}:{add(s){!e&&!jt(s)&&!rr(s)&&(s=Ce(s));const i=Ce(this);return to(i).has.call(i,s)||(i.add(s),In(i,"add",s,s)),this},set(s,i){!e&&!jt(i)&&!rr(i)&&(i=Ce(i));const o=Ce(this),{has:l,get:c}=to(o);let h=l.call(o,s);h||(s=Ce(s),h=l.call(o,s));const d=c.call(o,s);return o.set(s,i),h?Zn(i,d)&&In(o,"set",s,i):In(o,"add",s,i),this},delete(s){const i=Ce(this),{has:o,get:l}=to(i);let c=o.call(i,s);c||(s=Ce(s),c=o.call(i,s)),l&&l.call(i,s);const h=i.delete(s);return c&&In(i,"delete",s,void 0),h},clear(){const s=Ce(this),i=s.size!==0,o=s.clear();return i&&In(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=ay(s,t,e)}),n}function pc(t,e){const n=ly(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(De(n,s)&&s in r?n:r,s,i)}const cy={get:pc(!1,!1)},uy={get:pc(!1,!0)},hy={get:pc(!0,!1)};const Wf=new WeakMap,Qf=new WeakMap,Yf=new WeakMap,dy=new WeakMap;function fy(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function py(t){return t.__v_skip||!Object.isExtensible(t)?0:fy(F_(t))}function Nr(t){return rr(t)?t:mc(t,!1,sy,cy,Wf)}function Jf(t){return mc(t,!1,oy,uy,Qf)}function Xf(t){return mc(t,!0,iy,hy,Yf)}function mc(t,e,n,r,s){if(!Le(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=py(t);if(i===0)return t;const o=s.get(t);if(o)return o;const l=new Proxy(t,i===2?r:n);return s.set(t,l),l}function Qr(t){return rr(t)?Qr(t.__v_raw):!!(t&&t.__v_isReactive)}function rr(t){return!!(t&&t.__v_isReadonly)}function jt(t){return!!(t&&t.__v_isShallow)}function gc(t){return t?!!t.__v_raw:!1}function Ce(t){const e=t&&t.__v_raw;return e?Ce(e):t}function Zf(t){return!De(t,"__v_skip")&&Object.isExtensible(t)&&El(t,"__v_skip",!0),t}const st=t=>Le(t)?Nr(t):t,bo=t=>Le(t)?Xf(t):t;function _t(t){return t?t.__v_isRef===!0:!1}function Ne(t){return ep(t,!1)}function my(t){return ep(t,!0)}function ep(t,e){return _t(t)?t:new gy(t,e)}class gy{constructor(e,n){this.dep=new fc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:Ce(e),this._value=n?e:st(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||jt(e)||rr(e);e=r?e:Ce(e),Zn(e,n)&&(this._rawValue=e,this._value=r?e:st(e),this.dep.trigger())}}function Yr(t){return _t(t)?t.value:t}const _y={get:(t,e,n)=>e==="__v_raw"?t:Yr(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return _t(s)&&!_t(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function tp(t){return Qr(t)?t:new Proxy(t,_y)}class yy{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new fc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ai-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&xe!==this)return Uf(this,!0),!0}get value(){const e=this.dep.track();return qf(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function vy(t,e,n=!1){let r,s;return ge(t)?r=t:(r=t.get,s=t.set),new yy(r,s,n)}const ro={},Po=new WeakMap;let gr;function Ey(t,e=!1,n=gr){if(n){let r=Po.get(n);r||Po.set(n,r=[]),r.push(t)}}function Iy(t,e,n=Ve){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:l,call:c}=n,h=j=>s?j:jt(j)||s===!1||s===0?Tn(j,1):Tn(j);let d,p,g,m,P=!1,C=!1;if(_t(t)?(p=()=>t.value,P=jt(t)):Qr(t)?(p=()=>h(t),P=!0):ue(t)?(C=!0,P=t.some(j=>Qr(j)||jt(j)),p=()=>t.map(j=>{if(_t(j))return j.value;if(Qr(j))return h(j);if(ge(j))return c?c(j,2):j()})):ge(t)?e?p=c?()=>c(t,2):t:p=()=>{if(g){Cn();try{g()}finally{Dn()}}const j=gr;gr=d;try{return c?c(t,3,[m]):t(m)}finally{gr=j}}:p=nn,e&&s){const j=p,te=s===!0?1/0:s;p=()=>Tn(j(),te)}const O=Y_(),$=()=>{d.stop(),O&&O.active&&ac(O.effects,d)};if(i&&e){const j=e;e=(...te)=>{j(...te),$()}}let q=C?new Array(t.length).fill(ro):ro;const H=j=>{if(!(!(d.flags&1)||!d.dirty&&!j))if(e){const te=d.run();if(s||P||(C?te.some((le,A)=>Zn(le,q[A])):Zn(te,q))){g&&g();const le=gr;gr=d;try{const A=[te,q===ro?void 0:C&&q[0]===ro?[]:q,m];q=te,c?c(e,3,A):e(...A)}finally{gr=le}}}else d.run()};return l&&l(H),d=new Mf(p),d.scheduler=o?()=>o(H,!1):H,m=j=>Ey(j,!1,d),g=d.onStop=()=>{const j=Po.get(d);if(j){if(c)c(j,4);else for(const te of j)te();Po.delete(d)}},e?r?H(!0):q=d.run():o?o(H.bind(null,!0),!0):d.run(),$.pause=d.pause.bind(d),$.resume=d.resume.bind(d),$.stop=$,$}function Tn(t,e=1/0,n){if(e<=0||!Le(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,_t(t))Tn(t.value,e,n);else if(ue(t))for(let r=0;r<t.length;r++)Tn(t[r],e,n);else if(ea(t)||Wr(t))t.forEach(r=>{Tn(r,e,n)});else if(Nf(t)){for(const r in t)Tn(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&Tn(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ai(t,e,n,r){try{return r?t(...r):t()}catch(s){oa(s,e,n)}}function un(t,e,n,r){if(ge(t)){const s=Ai(t,e,n,r);return s&&Df(s)&&s.catch(i=>{oa(i,e,n)}),s}if(ue(t)){const s=[];for(let i=0;i<t.length;i++)s.push(un(t[i],e,n,r));return s}}function oa(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Ve;if(e){let l=e.parent;const c=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const d=l.ec;if(d){for(let p=0;p<d.length;p++)if(d[p](t,c,h)===!1)return}l=l.parent}if(i){Cn(),Ai(i,null,10,[t,c,h]),Dn();return}}Ty(t,n,s,r,o)}function Ty(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const At=[];let en=-1;const Jr=[];let $n=null,jr=0;const np=Promise.resolve();let So=null;function _c(t){const e=So||np;return t?e.then(this?t.bind(this):t):e}function wy(t){let e=en+1,n=At.length;for(;e<n;){const r=e+n>>>1,s=At[r],i=ci(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function yc(t){if(!(t.flags&1)){const e=ci(t),n=At[At.length-1];!n||!(t.flags&2)&&e>=ci(n)?At.push(t):At.splice(wy(e),0,t),t.flags|=1,rp()}}function rp(){So||(So=np.then(ip))}function Ay(t){ue(t)?Jr.push(...t):$n&&t.id===-1?$n.splice(jr+1,0,t):t.flags&1||(Jr.push(t),t.flags|=1),rp()}function gh(t,e,n=en+1){for(;n<At.length;n++){const r=At[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;At.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function sp(t){if(Jr.length){const e=[...new Set(Jr)].sort((n,r)=>ci(n)-ci(r));if(Jr.length=0,$n){$n.push(...e);return}for($n=e,jr=0;jr<$n.length;jr++){const n=$n[jr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}$n=null,jr=0}}const ci=t=>t.id==null?t.flags&2?-1:1/0:t.id;function ip(t){try{for(en=0;en<At.length;en++){const e=At[en];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ai(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;en<At.length;en++){const e=At[en];e&&(e.flags&=-2)}en=-1,At.length=0,sp(),So=null,(At.length||Jr.length)&&ip()}}let Vt=null,op=null;function Co(t){const e=Vt;return Vt=t,op=t&&t.type.__scopeId||null,e}function Ry(t,e=Vt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&bh(-1);const i=Co(e);let o;try{o=t(...s)}finally{Co(i),r._d&&bh(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function je(t,e){if(Vt===null)return t;const n=ha(Vt),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,l,c=Ve]=e[s];i&&(ge(i)&&(i={mounted:i,updated:i}),i.deep&&Tn(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:l,modifiers:c}))}return t}function pr(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const l=s[o];i&&(l.oldValue=i[o].value);let c=l.dir[r];c&&(Cn(),un(c,n,8,[t.el,l,t,e]),Dn())}}const by=Symbol("_vte"),Py=t=>t.__isTeleport;function vc(t,e){t.shapeFlag&6&&t.component?(t.transition=e,vc(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}/*! #__NO_SIDE_EFFECTS__ */function ap(t,e){return ge(t)?yt({name:t.name},e,{setup:t}):t}function lp(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Ys(t,e,n,r,s=!1){if(ue(t)){t.forEach((P,C)=>Ys(P,e&&(ue(e)?e[C]:e),n,r,s));return}if(Js(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Ys(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?ha(r.component):r.el,o=s?null:i,{i:l,r:c}=t,h=e&&e.r,d=l.refs===Ve?l.refs={}:l.refs,p=l.setupState,g=Ce(p),m=p===Ve?()=>!1:P=>De(g,P);if(h!=null&&h!==c&&(Ye(h)?(d[h]=null,m(h)&&(p[h]=null)):_t(h)&&(h.value=null)),ge(c))Ai(c,l,12,[o,d]);else{const P=Ye(c),C=_t(c);if(P||C){const O=()=>{if(t.f){const $=P?m(c)?p[c]:d[c]:c.value;s?ue($)&&ac($,i):ue($)?$.includes(i)||$.push(i):P?(d[c]=[i],m(c)&&(p[c]=d[c])):(c.value=[i],t.k&&(d[t.k]=c.value))}else P?(d[c]=o,m(c)&&(p[c]=o)):C&&(c.value=o,t.k&&(d[t.k]=o))};o?(O.id=-1,Ot(O,n)):O()}}}ra().requestIdleCallback;ra().cancelIdleCallback;const Js=t=>!!t.type.__asyncLoader,cp=t=>t.type.__isKeepAlive;function Sy(t,e){up(t,"a",e)}function Cy(t,e){up(t,"da",e)}function up(t,e,n=gt){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(aa(e,r,n),n){let s=n.parent;for(;s&&s.parent;)cp(s.parent.vnode)&&Dy(r,e,n,s),s=s.parent}}function Dy(t,e,n,r){const s=aa(e,t,r,!0);hp(()=>{ac(r[e],s)},n)}function aa(t,e,n=gt,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{Cn();const l=Ri(n),c=un(e,n,t,o);return l(),Dn(),c});return r?s.unshift(i):s.push(i),i}}const Ln=t=>(e,n=gt)=>{(!hi||t==="sp")&&aa(t,(...r)=>e(...r),n)},ky=Ln("bm"),la=Ln("m"),Ny=Ln("bu"),Oy=Ln("u"),Vy=Ln("bum"),hp=Ln("um"),xy=Ln("sp"),Ly=Ln("rtg"),My=Ln("rtc");function Fy(t,e=gt){aa("ec",t,e)}const Uy="components";function Rl(t,e){return jy(Uy,t,!0,e)||t}const By=Symbol.for("v-ndc");function jy(t,e,n=!0,r=!1){const s=Vt||gt;if(s){const i=s.type;{const l=Pv(i,!1);if(l&&(l===e||l===qt(e)||l===na(qt(e))))return i}const o=_h(s[t]||i[t],e)||_h(s.appContext[t],e);return!o&&r?i:o}}function _h(t,e){return t&&(t[e]||t[qt(e)]||t[na(qt(e))])}function Kt(t,e,n,r){let s;const i=n,o=ue(t);if(o||Ye(t)){const l=o&&Qr(t);let c=!1,h=!1;l&&(c=!jt(t),h=rr(t),t=ia(t)),s=new Array(t.length);for(let d=0,p=t.length;d<p;d++)s[d]=e(c?h?bo(st(t[d])):st(t[d]):t[d],d,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let l=0;l<t;l++)s[l]=e(l+1,l,void 0,i)}else if(Le(t))if(t[Symbol.iterator])s=Array.from(t,(l,c)=>e(l,c,void 0,i));else{const l=Object.keys(t);s=new Array(l.length);for(let c=0,h=l.length;c<h;c++){const d=l[c];s[c]=e(t[d],d,c,i)}}else s=[];return s}const bl=t=>t?Np(t)?ha(t):bl(t.parent):null,Xs=yt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>bl(t.parent),$root:t=>bl(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>fp(t),$forceUpdate:t=>t.f||(t.f=()=>{yc(t.update)}),$nextTick:t=>t.n||(t.n=_c.bind(t.proxy)),$watch:t=>lv.bind(t)}),Za=(t,e)=>t!==Ve&&!t.__isScriptSetup&&De(t,e),qy={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:l,appContext:c}=t;let h;if(e[0]!=="$"){const m=o[e];if(m!==void 0)switch(m){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(Za(r,e))return o[e]=1,r[e];if(s!==Ve&&De(s,e))return o[e]=2,s[e];if((h=t.propsOptions[0])&&De(h,e))return o[e]=3,i[e];if(n!==Ve&&De(n,e))return o[e]=4,n[e];Pl&&(o[e]=0)}}const d=Xs[e];let p,g;if(d)return e==="$attrs"&&pt(t.attrs,"get",""),d(t);if((p=l.__cssModules)&&(p=p[e]))return p;if(n!==Ve&&De(n,e))return o[e]=4,n[e];if(g=c.config.globalProperties,De(g,e))return g[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return Za(s,e)?(s[e]=n,!0):r!==Ve&&De(r,e)?(r[e]=n,!0):De(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let l;return!!n[o]||t!==Ve&&De(t,o)||Za(e,o)||(l=i[0])&&De(l,o)||De(r,o)||De(Xs,o)||De(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:De(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function yh(t){return ue(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Pl=!0;function Hy(t){const e=fp(t),n=t.proxy,r=t.ctx;Pl=!1,e.beforeCreate&&vh(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:l,provide:c,inject:h,created:d,beforeMount:p,mounted:g,beforeUpdate:m,updated:P,activated:C,deactivated:O,beforeDestroy:$,beforeUnmount:q,destroyed:H,unmounted:j,render:te,renderTracked:le,renderTriggered:A,errorCaptured:v,serverPrefetch:w,expose:R,inheritAttrs:b,components:D,directives:T,filters:It}=e;if(h&&$y(h,r,null),o)for(const Te in o){const ye=o[Te];ge(ye)&&(r[Te]=ye.bind(n))}if(s){const Te=s.call(n,n);Le(Te)&&(t.data=Nr(Te))}if(Pl=!0,i)for(const Te in i){const ye=i[Te],kt=ge(ye)?ye.bind(n,n):ge(ye.get)?ye.get.bind(n,n):nn,Ht=!ge(ye)&&ge(ye.set)?ye.set.bind(n):nn,Ft=Ct({get:kt,set:Ht});Object.defineProperty(r,Te,{enumerable:!0,configurable:!0,get:()=>Ft.value,set:Ue=>Ft.value=Ue})}if(l)for(const Te in l)dp(l[Te],r,n,Te);if(c){const Te=ge(c)?c.call(n):c;Reflect.ownKeys(Te).forEach(ye=>{ho(ye,Te[ye])})}d&&vh(d,t,"c");function Ke(Te,ye){ue(ye)?ye.forEach(kt=>Te(kt.bind(n))):ye&&Te(ye.bind(n))}if(Ke(ky,p),Ke(la,g),Ke(Ny,m),Ke(Oy,P),Ke(Sy,C),Ke(Cy,O),Ke(Fy,v),Ke(My,le),Ke(Ly,A),Ke(Vy,q),Ke(hp,j),Ke(xy,w),ue(R))if(R.length){const Te=t.exposed||(t.exposed={});R.forEach(ye=>{Object.defineProperty(Te,ye,{get:()=>n[ye],set:kt=>n[ye]=kt})})}else t.exposed||(t.exposed={});te&&t.render===nn&&(t.render=te),b!=null&&(t.inheritAttrs=b),D&&(t.components=D),T&&(t.directives=T),w&&lp(t)}function $y(t,e,n=nn){ue(t)&&(t=Sl(t));for(const r in t){const s=t[r];let i;Le(s)?"default"in s?i=Pn(s.from||r,s.default,!0):i=Pn(s.from||r):i=Pn(s),_t(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function vh(t,e,n){un(ue(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function dp(t,e,n,r){let s=r.includes(".")?bp(n,r):()=>n[r];if(Ye(t)){const i=e[t];ge(i)&&Ir(s,i)}else if(ge(t))Ir(s,t.bind(n));else if(Le(t))if(ue(t))t.forEach(i=>dp(i,e,n,r));else{const i=ge(t.handler)?t.handler.bind(n):e[t.handler];ge(i)&&Ir(s,i,t)}}function fp(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,l=i.get(e);let c;return l?c=l:!s.length&&!n&&!r?c=e:(c={},s.length&&s.forEach(h=>Do(c,h,o,!0)),Do(c,e,o)),Le(e)&&i.set(e,c),c}function Do(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Do(t,i,n,!0),s&&s.forEach(o=>Do(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const l=Gy[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const Gy={data:Eh,props:Ih,emits:Ih,methods:qs,computed:qs,beforeCreate:wt,created:wt,beforeMount:wt,mounted:wt,beforeUpdate:wt,updated:wt,beforeDestroy:wt,beforeUnmount:wt,destroyed:wt,unmounted:wt,activated:wt,deactivated:wt,errorCaptured:wt,serverPrefetch:wt,components:qs,directives:qs,watch:zy,provide:Eh,inject:Ky};function Eh(t,e){return e?t?function(){return yt(ge(t)?t.call(this,this):t,ge(e)?e.call(this,this):e)}:e:t}function Ky(t,e){return qs(Sl(t),Sl(e))}function Sl(t){if(ue(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function wt(t,e){return t?[...new Set([].concat(t,e))]:e}function qs(t,e){return t?yt(Object.create(null),t,e):e}function Ih(t,e){return t?ue(t)&&ue(e)?[...new Set([...t,...e])]:yt(Object.create(null),yh(t),yh(e??{})):e}function zy(t,e){if(!t)return e;if(!e)return t;const n=yt(Object.create(null),t);for(const r in e)n[r]=wt(t[r],e[r]);return n}function pp(){return{app:null,config:{isNativeTag:L_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Wy=0;function Qy(t,e){return function(r,s=null){ge(r)||(r=yt({},r)),s!=null&&!Le(s)&&(s=null);const i=pp(),o=new WeakSet,l=[];let c=!1;const h=i.app={_uid:Wy++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Cv,get config(){return i.config},set config(d){},use(d,...p){return o.has(d)||(d&&ge(d.install)?(o.add(d),d.install(h,...p)):ge(d)&&(o.add(d),d(h,...p))),h},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),h},component(d,p){return p?(i.components[d]=p,h):i.components[d]},directive(d,p){return p?(i.directives[d]=p,h):i.directives[d]},mount(d,p,g){if(!c){const m=h._ceVNode||Rt(r,s);return m.appContext=i,g===!0?g="svg":g===!1&&(g=void 0),t(m,d,g),c=!0,h._container=d,d.__vue_app__=h,ha(m.component)}},onUnmount(d){l.push(d)},unmount(){c&&(un(l,h._instance,16),t(null,h._container),delete h._container.__vue_app__)},provide(d,p){return i.provides[d]=p,h},runWithContext(d){const p=Xr;Xr=h;try{return d()}finally{Xr=p}}};return h}}let Xr=null;function ho(t,e){if(gt){let n=gt.provides;const r=gt.parent&&gt.parent.provides;r===n&&(n=gt.provides=Object.create(r)),n[t]=e}}function Pn(t,e,n=!1){const r=gt||Vt;if(r||Xr){let s=Xr?Xr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&ge(e)?e.call(r&&r.proxy):e}}const mp={},gp=()=>Object.create(mp),_p=t=>Object.getPrototypeOf(t)===mp;function Yy(t,e,n,r=!1){const s={},i=gp();t.propsDefaults=Object.create(null),yp(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:Jf(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function Jy(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,l=Ce(s),[c]=t.propsOptions;let h=!1;if((r||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let p=0;p<d.length;p++){let g=d[p];if(ca(t.emitsOptions,g))continue;const m=e[g];if(c)if(De(i,g))m!==i[g]&&(i[g]=m,h=!0);else{const P=qt(g);s[P]=Cl(c,l,P,m,t,!1)}else m!==i[g]&&(i[g]=m,h=!0)}}}else{yp(t,e,s,i)&&(h=!0);let d;for(const p in l)(!e||!De(e,p)&&((d=kr(p))===p||!De(e,d)))&&(c?n&&(n[p]!==void 0||n[d]!==void 0)&&(s[p]=Cl(c,l,p,void 0,t,!0)):delete s[p]);if(i!==l)for(const p in i)(!e||!De(e,p))&&(delete i[p],h=!0)}h&&In(t.attrs,"set","")}function yp(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,l;if(e)for(let c in e){if(zs(c))continue;const h=e[c];let d;s&&De(s,d=qt(c))?!i||!i.includes(d)?n[d]=h:(l||(l={}))[d]=h:ca(t.emitsOptions,c)||(!(c in r)||h!==r[c])&&(r[c]=h,o=!0)}if(i){const c=Ce(n),h=l||Ve;for(let d=0;d<i.length;d++){const p=i[d];n[p]=Cl(s,c,p,h[p],t,!De(h,p))}}return o}function Cl(t,e,n,r,s,i){const o=t[n];if(o!=null){const l=De(o,"default");if(l&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&ge(c)){const{propsDefaults:h}=s;if(n in h)r=h[n];else{const d=Ri(s);r=h[n]=c.call(null,e),d()}}else r=c;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!l?r=!1:o[1]&&(r===""||r===kr(n))&&(r=!0))}return r}const Xy=new WeakMap;function vp(t,e,n=!1){const r=n?Xy:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},l=[];let c=!1;if(!ge(t)){const d=p=>{c=!0;const[g,m]=vp(p,e,!0);yt(o,g),m&&l.push(...m)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!c)return Le(t)&&r.set(t,zr),zr;if(ue(i))for(let d=0;d<i.length;d++){const p=qt(i[d]);Th(p)&&(o[p]=Ve)}else if(i)for(const d in i){const p=qt(d);if(Th(p)){const g=i[d],m=o[p]=ue(g)||ge(g)?{type:g}:yt({},g),P=m.type;let C=!1,O=!0;if(ue(P))for(let $=0;$<P.length;++$){const q=P[$],H=ge(q)&&q.name;if(H==="Boolean"){C=!0;break}else H==="String"&&(O=!1)}else C=ge(P)&&P.name==="Boolean";m[0]=C,m[1]=O,(C||De(m,"default"))&&l.push(p)}}const h=[o,l];return Le(t)&&r.set(t,h),h}function Th(t){return t[0]!=="$"&&!zs(t)}const Ec=t=>t[0]==="_"||t==="$stable",Ic=t=>ue(t)?t.map(tn):[tn(t)],Zy=(t,e,n)=>{if(e._n)return e;const r=Ry((...s)=>Ic(e(...s)),n);return r._c=!1,r},Ep=(t,e,n)=>{const r=t._ctx;for(const s in t){if(Ec(s))continue;const i=t[s];if(ge(i))e[s]=Zy(s,i,r);else if(i!=null){const o=Ic(i);e[s]=()=>o}}},Ip=(t,e)=>{const n=Ic(e);t.slots.default=()=>n},Tp=(t,e,n)=>{for(const r in e)(n||!Ec(r))&&(t[r]=e[r])},ev=(t,e,n)=>{const r=t.slots=gp();if(t.vnode.shapeFlag&32){const s=e.__;s&&El(r,"__",s,!0);const i=e._;i?(Tp(r,e,n),n&&El(r,"_",i,!0)):Ep(e,r)}else e&&Ip(t,e)},tv=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Ve;if(r.shapeFlag&32){const l=e._;l?n&&l===1?i=!1:Tp(s,e,n):(i=!e.$stable,Ep(e,s)),o=e}else e&&(Ip(t,e),o={default:1});if(i)for(const l in s)!Ec(l)&&o[l]==null&&delete s[l]},Ot=mv;function nv(t){return rv(t)}function rv(t,e){const n=ra();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:l,createComment:c,setText:h,setElementText:d,parentNode:p,nextSibling:g,setScopeId:m=nn,insertStaticContent:P}=t,C=(y,I,S,x=null,F=null,L=null,Q=void 0,K=null,G=!!I.dynamicChildren)=>{if(y===I)return;y&&!Ls(y,I)&&(x=V(y),Ue(y,F,L,!0),y=null),I.patchFlag===-2&&(G=!1,I.dynamicChildren=null);const{type:B,ref:se,shapeFlag:W}=I;switch(B){case ua:O(y,I,S,x);break;case sr:$(y,I,S,x);break;case tl:y==null&&q(I,S,x,Q);break;case We:D(y,I,S,x,F,L,Q,K,G);break;default:W&1?te(y,I,S,x,F,L,Q,K,G):W&6?T(y,I,S,x,F,L,Q,K,G):(W&64||W&128)&&B.process(y,I,S,x,F,L,Q,K,G,Z)}se!=null&&F?Ys(se,y&&y.ref,L,I||y,!I):se==null&&y&&y.ref!=null&&Ys(y.ref,null,L,y,!0)},O=(y,I,S,x)=>{if(y==null)r(I.el=l(I.children),S,x);else{const F=I.el=y.el;I.children!==y.children&&h(F,I.children)}},$=(y,I,S,x)=>{y==null?r(I.el=c(I.children||""),S,x):I.el=y.el},q=(y,I,S,x)=>{[y.el,y.anchor]=P(y.children,I,S,x,y.el,y.anchor)},H=({el:y,anchor:I},S,x)=>{let F;for(;y&&y!==I;)F=g(y),r(y,S,x),y=F;r(I,S,x)},j=({el:y,anchor:I})=>{let S;for(;y&&y!==I;)S=g(y),s(y),y=S;s(I)},te=(y,I,S,x,F,L,Q,K,G)=>{I.type==="svg"?Q="svg":I.type==="math"&&(Q="mathml"),y==null?le(I,S,x,F,L,Q,K,G):w(y,I,F,L,Q,K,G)},le=(y,I,S,x,F,L,Q,K)=>{let G,B;const{props:se,shapeFlag:W,transition:re,dirs:he}=y;if(G=y.el=o(y.type,L,se&&se.is,se),W&8?d(G,y.children):W&16&&v(y.children,G,null,x,F,el(y,L),Q,K),he&&pr(y,null,x,"created"),A(G,y,y.scopeId,Q,x),se){for(const _e in se)_e!=="value"&&!zs(_e)&&i(G,_e,null,se[_e],L,x);"value"in se&&i(G,"value",null,se.value,L),(B=se.onVnodeBeforeMount)&&Zt(B,x,y)}he&&pr(y,null,x,"beforeMount");const ae=sv(F,re);ae&&re.beforeEnter(G),r(G,I,S),((B=se&&se.onVnodeMounted)||ae||he)&&Ot(()=>{B&&Zt(B,x,y),ae&&re.enter(G),he&&pr(y,null,x,"mounted")},F)},A=(y,I,S,x,F)=>{if(S&&m(y,S),x)for(let L=0;L<x.length;L++)m(y,x[L]);if(F){let L=F.subTree;if(I===L||Sp(L.type)&&(L.ssContent===I||L.ssFallback===I)){const Q=F.vnode;A(y,Q,Q.scopeId,Q.slotScopeIds,F.parent)}}},v=(y,I,S,x,F,L,Q,K,G=0)=>{for(let B=G;B<y.length;B++){const se=y[B]=K?Gn(y[B]):tn(y[B]);C(null,se,I,S,x,F,L,Q,K)}},w=(y,I,S,x,F,L,Q)=>{const K=I.el=y.el;let{patchFlag:G,dynamicChildren:B,dirs:se}=I;G|=y.patchFlag&16;const W=y.props||Ve,re=I.props||Ve;let he;if(S&&mr(S,!1),(he=re.onVnodeBeforeUpdate)&&Zt(he,S,I,y),se&&pr(I,y,S,"beforeUpdate"),S&&mr(S,!0),(W.innerHTML&&re.innerHTML==null||W.textContent&&re.textContent==null)&&d(K,""),B?R(y.dynamicChildren,B,K,S,x,el(I,F),L):Q||ye(y,I,K,null,S,x,el(I,F),L,!1),G>0){if(G&16)b(K,W,re,S,F);else if(G&2&&W.class!==re.class&&i(K,"class",null,re.class,F),G&4&&i(K,"style",W.style,re.style,F),G&8){const ae=I.dynamicProps;for(let _e=0;_e<ae.length;_e++){const we=ae[_e],Ze=W[we],et=re[we];(et!==Ze||we==="value")&&i(K,we,Ze,et,F,S)}}G&1&&y.children!==I.children&&d(K,I.children)}else!Q&&B==null&&b(K,W,re,S,F);((he=re.onVnodeUpdated)||se)&&Ot(()=>{he&&Zt(he,S,I,y),se&&pr(I,y,S,"updated")},x)},R=(y,I,S,x,F,L,Q)=>{for(let K=0;K<I.length;K++){const G=y[K],B=I[K],se=G.el&&(G.type===We||!Ls(G,B)||G.shapeFlag&198)?p(G.el):S;C(G,B,se,null,x,F,L,Q,!0)}},b=(y,I,S,x,F)=>{if(I!==S){if(I!==Ve)for(const L in I)!zs(L)&&!(L in S)&&i(y,L,I[L],null,F,x);for(const L in S){if(zs(L))continue;const Q=S[L],K=I[L];Q!==K&&L!=="value"&&i(y,L,K,Q,F,x)}"value"in S&&i(y,"value",I.value,S.value,F)}},D=(y,I,S,x,F,L,Q,K,G)=>{const B=I.el=y?y.el:l(""),se=I.anchor=y?y.anchor:l("");let{patchFlag:W,dynamicChildren:re,slotScopeIds:he}=I;he&&(K=K?K.concat(he):he),y==null?(r(B,S,x),r(se,S,x),v(I.children||[],S,se,F,L,Q,K,G)):W>0&&W&64&&re&&y.dynamicChildren?(R(y.dynamicChildren,re,S,F,L,Q,K),(I.key!=null||F&&I===F.subTree)&&wp(y,I,!0)):ye(y,I,S,se,F,L,Q,K,G)},T=(y,I,S,x,F,L,Q,K,G)=>{I.slotScopeIds=K,y==null?I.shapeFlag&512?F.ctx.activate(I,S,x,Q,G):It(I,S,x,F,L,Q,G):Mt(y,I,G)},It=(y,I,S,x,F,L,Q)=>{const K=y.component=Tv(y,x,F);if(cp(y)&&(K.ctx.renderer=Z),wv(K,!1,Q),K.asyncDep){if(F&&F.registerDep(K,Ke,Q),!y.el){const G=K.subTree=Rt(sr);$(null,G,I,S)}}else Ke(K,y,I,S,F,L,Q)},Mt=(y,I,S)=>{const x=I.component=y.component;if(fv(y,I,S))if(x.asyncDep&&!x.asyncResolved){Te(x,I,S);return}else x.next=I,x.update();else I.el=y.el,x.vnode=I},Ke=(y,I,S,x,F,L,Q)=>{const K=()=>{if(y.isMounted){let{next:W,bu:re,u:he,parent:ae,vnode:_e}=y;{const lt=Ap(y);if(lt){W&&(W.el=_e.el,Te(y,W,Q)),lt.asyncDep.then(()=>{y.isUnmounted||K()});return}}let we=W,Ze;mr(y,!1),W?(W.el=_e.el,Te(y,W,Q)):W=_e,re&&uo(re),(Ze=W.props&&W.props.onVnodeBeforeUpdate)&&Zt(Ze,ae,W,_e),mr(y,!0);const et=Ah(y),Ut=y.subTree;y.subTree=et,C(Ut,et,p(Ut.el),V(Ut),y,F,L),W.el=et.el,we===null&&pv(y,et.el),he&&Ot(he,F),(Ze=W.props&&W.props.onVnodeUpdated)&&Ot(()=>Zt(Ze,ae,W,_e),F)}else{let W;const{el:re,props:he}=I,{bm:ae,m:_e,parent:we,root:Ze,type:et}=y,Ut=Js(I);mr(y,!1),ae&&uo(ae),!Ut&&(W=he&&he.onVnodeBeforeMount)&&Zt(W,we,I),mr(y,!0);{Ze.ce&&Ze.ce._def.shadowRoot!==!1&&Ze.ce._injectChildStyle(et);const lt=y.subTree=Ah(y);C(null,lt,S,x,y,F,L),I.el=lt.el}if(_e&&Ot(_e,F),!Ut&&(W=he&&he.onVnodeMounted)){const lt=I;Ot(()=>Zt(W,we,lt),F)}(I.shapeFlag&256||we&&Js(we.vnode)&&we.vnode.shapeFlag&256)&&y.a&&Ot(y.a,F),y.isMounted=!0,I=S=x=null}};y.scope.on();const G=y.effect=new Mf(K);y.scope.off();const B=y.update=G.run.bind(G),se=y.job=G.runIfDirty.bind(G);se.i=y,se.id=y.uid,G.scheduler=()=>yc(se),mr(y,!0),B()},Te=(y,I,S)=>{I.component=y;const x=y.vnode.props;y.vnode=I,y.next=null,Jy(y,I.props,x,S),tv(y,I.children,S),Cn(),gh(y),Dn()},ye=(y,I,S,x,F,L,Q,K,G=!1)=>{const B=y&&y.children,se=y?y.shapeFlag:0,W=I.children,{patchFlag:re,shapeFlag:he}=I;if(re>0){if(re&128){Ht(B,W,S,x,F,L,Q,K,G);return}else if(re&256){kt(B,W,S,x,F,L,Q,K,G);return}}he&8?(se&16&&Pt(B,F,L),W!==B&&d(S,W)):se&16?he&16?Ht(B,W,S,x,F,L,Q,K,G):Pt(B,F,L,!0):(se&8&&d(S,""),he&16&&v(W,S,x,F,L,Q,K,G))},kt=(y,I,S,x,F,L,Q,K,G)=>{y=y||zr,I=I||zr;const B=y.length,se=I.length,W=Math.min(B,se);let re;for(re=0;re<W;re++){const he=I[re]=G?Gn(I[re]):tn(I[re]);C(y[re],he,S,null,F,L,Q,K,G)}B>se?Pt(y,F,L,!0,!1,W):v(I,S,x,F,L,Q,K,G,W)},Ht=(y,I,S,x,F,L,Q,K,G)=>{let B=0;const se=I.length;let W=y.length-1,re=se-1;for(;B<=W&&B<=re;){const he=y[B],ae=I[B]=G?Gn(I[B]):tn(I[B]);if(Ls(he,ae))C(he,ae,S,null,F,L,Q,K,G);else break;B++}for(;B<=W&&B<=re;){const he=y[W],ae=I[re]=G?Gn(I[re]):tn(I[re]);if(Ls(he,ae))C(he,ae,S,null,F,L,Q,K,G);else break;W--,re--}if(B>W){if(B<=re){const he=re+1,ae=he<se?I[he].el:x;for(;B<=re;)C(null,I[B]=G?Gn(I[B]):tn(I[B]),S,ae,F,L,Q,K,G),B++}}else if(B>re)for(;B<=W;)Ue(y[B],F,L,!0),B++;else{const he=B,ae=B,_e=new Map;for(B=ae;B<=re;B++){const tt=I[B]=G?Gn(I[B]):tn(I[B]);tt.key!=null&&_e.set(tt.key,B)}let we,Ze=0;const et=re-ae+1;let Ut=!1,lt=0;const Fn=new Array(et);for(B=0;B<et;B++)Fn[B]=0;for(B=he;B<=W;B++){const tt=y[B];if(Ze>=et){Ue(tt,F,L,!0);continue}let Bt;if(tt.key!=null)Bt=_e.get(tt.key);else for(we=ae;we<=re;we++)if(Fn[we-ae]===0&&Ls(tt,I[we])){Bt=we;break}Bt===void 0?Ue(tt,F,L,!0):(Fn[Bt-ae]=B+1,Bt>=lt?lt=Bt:Ut=!0,C(tt,I[Bt],S,null,F,L,Q,K,G),Ze++)}const Ts=Ut?iv(Fn):zr;for(we=Ts.length-1,B=et-1;B>=0;B--){const tt=ae+B,Bt=I[tt],Ui=tt+1<se?I[tt+1].el:x;Fn[B]===0?C(null,Bt,S,Ui,F,L,Q,K,G):Ut&&(we<0||B!==Ts[we]?Ft(Bt,S,Ui,2):we--)}}},Ft=(y,I,S,x,F=null)=>{const{el:L,type:Q,transition:K,children:G,shapeFlag:B}=y;if(B&6){Ft(y.component.subTree,I,S,x);return}if(B&128){y.suspense.move(I,S,x);return}if(B&64){Q.move(y,I,S,Z);return}if(Q===We){r(L,I,S);for(let W=0;W<G.length;W++)Ft(G[W],I,S,x);r(y.anchor,I,S);return}if(Q===tl){H(y,I,S);return}if(x!==2&&B&1&&K)if(x===0)K.beforeEnter(L),r(L,I,S),Ot(()=>K.enter(L),F);else{const{leave:W,delayLeave:re,afterLeave:he}=K,ae=()=>{y.ctx.isUnmounted?s(L):r(L,I,S)},_e=()=>{W(L,()=>{ae(),he&&he()})};re?re(L,ae,_e):_e()}else r(L,I,S)},Ue=(y,I,S,x=!1,F=!1)=>{const{type:L,props:Q,ref:K,children:G,dynamicChildren:B,shapeFlag:se,patchFlag:W,dirs:re,cacheIndex:he}=y;if(W===-2&&(F=!1),K!=null&&(Cn(),Ys(K,null,S,y,!0),Dn()),he!=null&&(I.renderCache[he]=void 0),se&256){I.ctx.deactivate(y);return}const ae=se&1&&re,_e=!Js(y);let we;if(_e&&(we=Q&&Q.onVnodeBeforeUnmount)&&Zt(we,I,y),se&6)Xt(y.component,S,x);else{if(se&128){y.suspense.unmount(S,x);return}ae&&pr(y,null,I,"beforeUnmount"),se&64?y.type.remove(y,I,S,Z,x):B&&!B.hasOnce&&(L!==We||W>0&&W&64)?Pt(B,I,S,!1,!0):(L===We&&W&384||!F&&se&16)&&Pt(G,I,S),x&&Be(y)}(_e&&(we=Q&&Q.onVnodeUnmounted)||ae)&&Ot(()=>{we&&Zt(we,I,y),ae&&pr(y,null,I,"unmounted")},S)},Be=y=>{const{type:I,el:S,anchor:x,transition:F}=y;if(I===We){Mn(S,x);return}if(I===tl){j(y);return}const L=()=>{s(S),F&&!F.persisted&&F.afterLeave&&F.afterLeave()};if(y.shapeFlag&1&&F&&!F.persisted){const{leave:Q,delayLeave:K}=F,G=()=>Q(S,L);K?K(y.el,L,G):G()}else L()},Mn=(y,I)=>{let S;for(;y!==I;)S=g(y),s(y),y=S;s(I)},Xt=(y,I,S)=>{const{bum:x,scope:F,job:L,subTree:Q,um:K,m:G,a:B,parent:se,slots:{__:W}}=y;wh(G),wh(B),x&&uo(x),se&&ue(W)&&W.forEach(re=>{se.renderCache[re]=void 0}),F.stop(),L&&(L.flags|=8,Ue(Q,y,I,S)),K&&Ot(K,I),Ot(()=>{y.isUnmounted=!0},I),I&&I.pendingBranch&&!I.isUnmounted&&y.asyncDep&&!y.asyncResolved&&y.suspenseId===I.pendingId&&(I.deps--,I.deps===0&&I.resolve())},Pt=(y,I,S,x=!1,F=!1,L=0)=>{for(let Q=L;Q<y.length;Q++)Ue(y[Q],I,S,x,F)},V=y=>{if(y.shapeFlag&6)return V(y.component.subTree);if(y.shapeFlag&128)return y.suspense.next();const I=g(y.anchor||y.el),S=I&&I[by];return S?g(S):I};let J=!1;const Y=(y,I,S)=>{y==null?I._vnode&&Ue(I._vnode,null,null,!0):C(I._vnode||null,y,I,null,null,null,S),I._vnode=y,J||(J=!0,gh(),sp(),J=!1)},Z={p:C,um:Ue,m:Ft,r:Be,mt:It,mc:v,pc:ye,pbc:R,n:V,o:t};return{render:Y,hydrate:void 0,createApp:Qy(Y)}}function el({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function mr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function sv(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function wp(t,e,n=!1){const r=t.children,s=e.children;if(ue(r)&&ue(s))for(let i=0;i<r.length;i++){const o=r[i];let l=s[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=s[i]=Gn(s[i]),l.el=o.el),!n&&l.patchFlag!==-2&&wp(o,l)),l.type===ua&&(l.el=o.el),l.type===sr&&!l.el&&(l.el=o.el)}}function iv(t){const e=t.slice(),n=[0];let r,s,i,o,l;const c=t.length;for(r=0;r<c;r++){const h=t[r];if(h!==0){if(s=n[n.length-1],t[s]<h){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)l=i+o>>1,t[n[l]]<h?i=l+1:o=l;h<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function Ap(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Ap(e)}function wh(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const ov=Symbol.for("v-scx"),av=()=>Pn(ov);function Ir(t,e,n){return Rp(t,e,n)}function Rp(t,e,n=Ve){const{immediate:r,deep:s,flush:i,once:o}=n,l=yt({},n),c=e&&r||!e&&i!=="post";let h;if(hi){if(i==="sync"){const m=av();h=m.__watcherHandles||(m.__watcherHandles=[])}else if(!c){const m=()=>{};return m.stop=nn,m.resume=nn,m.pause=nn,m}}const d=gt;l.call=(m,P,C)=>un(m,d,P,C);let p=!1;i==="post"?l.scheduler=m=>{Ot(m,d&&d.suspense)}:i!=="sync"&&(p=!0,l.scheduler=(m,P)=>{P?m():yc(m)}),l.augmentJob=m=>{e&&(m.flags|=4),p&&(m.flags|=2,d&&(m.id=d.uid,m.i=d))};const g=Iy(t,e,l);return hi&&(h?h.push(g):c&&g()),g}function lv(t,e,n){const r=this.proxy,s=Ye(t)?t.includes(".")?bp(r,t):()=>r[t]:t.bind(r,r);let i;ge(e)?i=e:(i=e.handler,n=e);const o=Ri(this),l=Rp(s,i.bind(r),n);return o(),l}function bp(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const cv=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${qt(e)}Modifiers`]||t[`${kr(e)}Modifiers`];function uv(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Ve;let s=n;const i=e.startsWith("update:"),o=i&&cv(r,e.slice(7));o&&(o.trim&&(s=n.map(d=>Ye(d)?d.trim():d)),o.number&&(s=n.map(Ro)));let l,c=r[l=Wa(e)]||r[l=Wa(qt(e))];!c&&i&&(c=r[l=Wa(kr(e))]),c&&un(c,t,6,s);const h=r[l+"Once"];if(h){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,un(h,t,6,s)}}function Pp(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},l=!1;if(!ge(t)){const c=h=>{const d=Pp(h,e,!0);d&&(l=!0,yt(o,d))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!l?(Le(t)&&r.set(t,null),null):(ue(i)?i.forEach(c=>o[c]=null):yt(o,i),Le(t)&&r.set(t,o),o)}function ca(t,e){return!t||!Zo(e)?!1:(e=e.slice(2).replace(/Once$/,""),De(t,e[0].toLowerCase()+e.slice(1))||De(t,kr(e))||De(t,e))}function Ah(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:l,emit:c,render:h,renderCache:d,props:p,data:g,setupState:m,ctx:P,inheritAttrs:C}=t,O=Co(t);let $,q;try{if(n.shapeFlag&4){const j=s||r,te=j;$=tn(h.call(te,j,d,p,m,g,P)),q=l}else{const j=e;$=tn(j.length>1?j(p,{attrs:l,slots:o,emit:c}):j(p,null)),q=e.props?l:hv(l)}}catch(j){Zs.length=0,oa(j,t,1),$=Rt(sr)}let H=$;if(q&&C!==!1){const j=Object.keys(q),{shapeFlag:te}=H;j.length&&te&7&&(i&&j.some(oc)&&(q=dv(q,i)),H=ss(H,q,!1,!0))}return n.dirs&&(H=ss(H,null,!1,!0),H.dirs=H.dirs?H.dirs.concat(n.dirs):n.dirs),n.transition&&vc(H,n.transition),$=H,Co(O),$}const hv=t=>{let e;for(const n in t)(n==="class"||n==="style"||Zo(n))&&((e||(e={}))[n]=t[n]);return e},dv=(t,e)=>{const n={};for(const r in t)(!oc(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function fv(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:l,patchFlag:c}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Rh(r,o,h):!!o;if(c&8){const d=e.dynamicProps;for(let p=0;p<d.length;p++){const g=d[p];if(o[g]!==r[g]&&!ca(h,g))return!0}}}else return(s||l)&&(!l||!l.$stable)?!0:r===o?!1:r?o?Rh(r,o,h):!0:!!o;return!1}function Rh(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!ca(n,i))return!0}return!1}function pv({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const Sp=t=>t.__isSuspense;function mv(t,e){e&&e.pendingBranch?ue(t)?e.effects.push(...t):e.effects.push(t):Ay(t)}const We=Symbol.for("v-fgt"),ua=Symbol.for("v-txt"),sr=Symbol.for("v-cmt"),tl=Symbol.for("v-stc"),Zs=[];let xt=null;function oe(t=!1){Zs.push(xt=t?null:[])}function gv(){Zs.pop(),xt=Zs[Zs.length-1]||null}let ui=1;function bh(t,e=!1){ui+=t,t<0&&xt&&e&&(xt.hasOnce=!0)}function Cp(t){return t.dynamicChildren=ui>0?xt||zr:null,gv(),ui>0&&xt&&xt.push(t),t}function ce(t,e,n,r,s,i){return Cp(E(t,e,n,r,s,i,!0))}function Dp(t,e,n,r,s){return Cp(Rt(t,e,n,r,s,!0))}function ko(t){return t?t.__v_isVNode===!0:!1}function Ls(t,e){return t.type===e.type&&t.key===e.key}const kp=({key:t})=>t??null,fo=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Ye(t)||_t(t)||ge(t)?{i:Vt,r:t,k:e,f:!!n}:t:null);function E(t,e=null,n=null,r=0,s=null,i=t===We?0:1,o=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&kp(e),ref:e&&fo(e),scopeId:op,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Vt};return l?(Tc(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=Ye(n)?8:16),ui>0&&!o&&xt&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&xt.push(c),c}const Rt=_v;function _v(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===By)&&(t=sr),ko(t)){const l=ss(t,e,!0);return n&&Tc(l,n),ui>0&&!i&&xt&&(l.shapeFlag&6?xt[xt.indexOf(t)]=l:xt.push(l)),l.patchFlag=-2,l}if(Sv(t)&&(t=t.__vccOpts),e){e=yv(e);let{class:l,style:c}=e;l&&!Ye(l)&&(e.class=Rr(l)),Le(c)&&(gc(c)&&!ue(c)&&(c=yt({},c)),e.style=cc(c))}const o=Ye(t)?1:Sp(t)?128:Py(t)?64:Le(t)?4:ge(t)?2:0;return E(t,e,n,r,s,o,i,!0)}function yv(t){return t?gc(t)||_p(t)?yt({},t):t:null}function ss(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:l,transition:c}=t,h=e?vv(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:h,key:h&&kp(h),ref:e&&e.ref?n&&i?ue(i)?i.concat(fo(e)):[i,fo(e)]:fo(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==We?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&ss(t.ssContent),ssFallback:t.ssFallback&&ss(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&r&&vc(d,c.clone(d)),d}function Ee(t=" ",e=0){return Rt(ua,null,t,e)}function $e(t="",e=!1){return e?(oe(),Dp(sr,null,t)):Rt(sr,null,t)}function tn(t){return t==null||typeof t=="boolean"?Rt(sr):ue(t)?Rt(We,null,t.slice()):ko(t)?Gn(t):Rt(ua,null,String(t))}function Gn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:ss(t)}function Tc(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(ue(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),Tc(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!_p(e)?e._ctx=Vt:s===3&&Vt&&(Vt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else ge(e)?(e={default:e,_ctx:Vt},n=32):(e=String(e),r&64?(n=16,e=[Ee(e)]):n=8);t.children=e,t.shapeFlag|=n}function vv(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Rr([e.class,r.class]));else if(s==="style")e.style=cc([e.style,r.style]);else if(Zo(s)){const i=e[s],o=r[s];o&&i!==o&&!(ue(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function Zt(t,e,n,r=null){un(t,e,7,[n,r])}const Ev=pp();let Iv=0;function Tv(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||Ev,i={uid:Iv++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Lf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:vp(r,s),emitsOptions:Pp(r,s),emit:null,emitted:null,propsDefaults:Ve,inheritAttrs:r.inheritAttrs,ctx:Ve,data:Ve,props:Ve,attrs:Ve,slots:Ve,refs:Ve,setupState:Ve,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=uv.bind(null,i),t.ce&&t.ce(i),i}let gt=null,No,Dl;{const t=ra(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};No=e("__VUE_INSTANCE_SETTERS__",n=>gt=n),Dl=e("__VUE_SSR_SETTERS__",n=>hi=n)}const Ri=t=>{const e=gt;return No(t),t.scope.on(),()=>{t.scope.off(),No(e)}},Ph=()=>{gt&&gt.scope.off(),No(null)};function Np(t){return t.vnode.shapeFlag&4}let hi=!1;function wv(t,e=!1,n=!1){e&&Dl(e);const{props:r,children:s}=t.vnode,i=Np(t);Yy(t,r,i,e),ev(t,s,n||e);const o=i?Av(t,e):void 0;return e&&Dl(!1),o}function Av(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,qy);const{setup:r}=n;if(r){Cn();const s=t.setupContext=r.length>1?bv(t):null,i=Ri(t),o=Ai(r,t,0,[t.props,s]),l=Df(o);if(Dn(),i(),(l||t.sp)&&!Js(t)&&lp(t),l){if(o.then(Ph,Ph),e)return o.then(c=>{Sh(t,c)}).catch(c=>{oa(c,t,0)});t.asyncDep=o}else Sh(t,o)}else Op(t)}function Sh(t,e,n){ge(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Le(e)&&(t.setupState=tp(e)),Op(t)}function Op(t,e,n){const r=t.type;t.render||(t.render=r.render||nn);{const s=Ri(t);Cn();try{Hy(t)}finally{Dn(),s()}}}const Rv={get(t,e){return pt(t,"get",""),t[e]}};function bv(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Rv),slots:t.slots,emit:t.emit,expose:e}}function ha(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(tp(Zf(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Xs)return Xs[n](t)},has(e,n){return n in e||n in Xs}})):t.proxy}function Pv(t,e=!0){return ge(t)?t.displayName||t.name:t.name||e&&t.__name}function Sv(t){return ge(t)&&"__vccOpts"in t}const Ct=(t,e)=>vy(t,e,hi);function Vp(t,e,n){const r=arguments.length;return r===2?Le(e)&&!ue(e)?ko(e)?Rt(t,null,[e]):Rt(t,e):Rt(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&ko(n)&&(n=[n]),Rt(t,e,n))}const Cv="3.5.17";/**
* @vue/runtime-dom v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let kl;const Ch=typeof window<"u"&&window.trustedTypes;if(Ch)try{kl=Ch.createPolicy("vue",{createHTML:t=>t})}catch{}const xp=kl?t=>kl.createHTML(t):t=>t,Dv="http://www.w3.org/2000/svg",kv="http://www.w3.org/1998/Math/MathML",En=typeof document<"u"?document:null,Dh=En&&En.createElement("template"),Nv={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?En.createElementNS(Dv,t):e==="mathml"?En.createElementNS(kv,t):n?En.createElement(t,{is:n}):En.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>En.createTextNode(t),createComment:t=>En.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>En.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{Dh.innerHTML=xp(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const l=Dh.content;if(r==="svg"||r==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Ov=Symbol("_vtc");function Vv(t,e,n){const r=t[Ov];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const kh=Symbol("_vod"),xv=Symbol("_vsh"),Lv=Symbol(""),Mv=/(^|;)\s*display\s*:/;function Fv(t,e,n){const r=t.style,s=Ye(n);let i=!1;if(n&&!s){if(e)if(Ye(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&po(r,l,"")}else for(const o in e)n[o]==null&&po(r,o,"");for(const o in n)o==="display"&&(i=!0),po(r,o,n[o])}else if(s){if(e!==n){const o=r[Lv];o&&(n+=";"+o),r.cssText=n,i=Mv.test(n)}}else e&&t.removeAttribute("style");kh in t&&(t[kh]=i?r.display:"",t[xv]&&(r.display="none"))}const Nh=/\s*!important$/;function po(t,e,n){if(ue(n))n.forEach(r=>po(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Uv(t,e);Nh.test(n)?t.setProperty(kr(r),n.replace(Nh,""),"important"):t[r]=n}}const Oh=["Webkit","Moz","ms"],nl={};function Uv(t,e){const n=nl[e];if(n)return n;let r=qt(e);if(r!=="filter"&&r in t)return nl[e]=r;r=na(r);for(let s=0;s<Oh.length;s++){const i=Oh[s]+r;if(i in t)return nl[e]=i}return e}const Vh="http://www.w3.org/1999/xlink";function xh(t,e,n,r,s,i=K_(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(Vh,e.slice(6,e.length)):t.setAttributeNS(Vh,e,n):n==null||i&&!Of(n)?t.removeAttribute(e):t.setAttribute(e,i?"":cn(n)?String(n):n)}function Lh(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?xp(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(l!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=Of(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function yr(t,e,n,r){t.addEventListener(e,n,r)}function Bv(t,e,n,r){t.removeEventListener(e,n,r)}const Mh=Symbol("_vei");function jv(t,e,n,r,s=null){const i=t[Mh]||(t[Mh]={}),o=i[e];if(r&&o)o.value=r;else{const[l,c]=qv(e);if(r){const h=i[e]=Gv(r,s);yr(t,l,h,c)}else o&&(Bv(t,l,o,c),i[e]=void 0)}}const Fh=/(?:Once|Passive|Capture)$/;function qv(t){let e;if(Fh.test(t)){e={};let r;for(;r=t.match(Fh);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):kr(t.slice(2)),e]}let rl=0;const Hv=Promise.resolve(),$v=()=>rl||(Hv.then(()=>rl=0),rl=Date.now());function Gv(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;un(Kv(r,n.value),e,5,[r])};return n.value=t,n.attached=$v(),n}function Kv(t,e){if(ue(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const Uh=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,zv=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?Vv(t,r,o):e==="style"?Fv(t,n,r):Zo(e)?oc(e)||jv(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Wv(t,e,r,o))?(Lh(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&xh(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!Ye(r))?Lh(t,qt(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),xh(t,e,r,o))};function Wv(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&Uh(e)&&ge(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Uh(e)&&Ye(n)?!1:e in t}const Oo=t=>{const e=t.props["onUpdate:modelValue"]||!1;return ue(e)?n=>uo(e,n):e};function Qv(t){t.target.composing=!0}function Bh(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Zr=Symbol("_assign"),dt={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[Zr]=Oo(s);const i=r||s.props&&s.props.type==="number";yr(t,e?"change":"input",o=>{if(o.target.composing)return;let l=t.value;n&&(l=l.trim()),i&&(l=Ro(l)),t[Zr](l)}),n&&yr(t,"change",()=>{t.value=t.value.trim()}),e||(yr(t,"compositionstart",Qv),yr(t,"compositionend",Bh),yr(t,"change",Bh))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[Zr]=Oo(o),t.composing)return;const l=(i||t.type==="number")&&!/^0\d/.test(t.value)?Ro(t.value):t.value,c=e??"";l!==c&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===c)||(t.value=c))}},Tr={deep:!0,created(t,{value:e,modifiers:{number:n}},r){const s=ea(e);yr(t,"change",()=>{const i=Array.prototype.filter.call(t.options,o=>o.selected).map(o=>n?Ro(Vo(o)):Vo(o));t[Zr](t.multiple?s?new Set(i):i:i[0]),t._assigning=!0,_c(()=>{t._assigning=!1})}),t[Zr]=Oo(r)},mounted(t,{value:e}){jh(t,e)},beforeUpdate(t,e,n){t[Zr]=Oo(n)},updated(t,{value:e}){t._assigning||jh(t,e)}};function jh(t,e){const n=t.multiple,r=ue(e);if(!(n&&!r&&!ea(e))){for(let s=0,i=t.options.length;s<i;s++){const o=t.options[s],l=Vo(o);if(n)if(r){const c=typeof l;c==="string"||c==="number"?o.selected=e.some(h=>String(h)===String(l)):o.selected=W_(e,l)>-1}else o.selected=e.has(l);else if(sa(Vo(o),e)){t.selectedIndex!==s&&(t.selectedIndex=s);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function Vo(t){return"_value"in t?t._value:t.value}const Yv=["ctrl","shift","alt","meta"],Jv={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>Yv.some(n=>t[`${n}Key`]&&!e.includes(n))},wc=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=(s,...i)=>{for(let o=0;o<e.length;o++){const l=Jv[e[o]];if(l&&l(s,e))return}return t(s,...i)})},Xv=yt({patchProp:zv},Nv);let qh;function Zv(){return qh||(qh=nv(Xv))}const eE=(...t)=>{const e=Zv().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=nE(r);if(!s)return;const i=e._component;!ge(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,tE(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function tE(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function nE(t){return Ye(t)?document.querySelector(t):t}/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const qr=typeof document<"u";function Lp(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function rE(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&Lp(t.default)}const Se=Object.assign;function sl(t,e){const n={};for(const r in e){const s=e[r];n[r]=Yt(s)?s.map(t):t(s)}return n}const ei=()=>{},Yt=Array.isArray,Mp=/#/g,sE=/&/g,iE=/\//g,oE=/=/g,aE=/\?/g,Fp=/\+/g,lE=/%5B/g,cE=/%5D/g,Up=/%5E/g,uE=/%60/g,Bp=/%7B/g,hE=/%7C/g,jp=/%7D/g,dE=/%20/g;function Ac(t){return encodeURI(""+t).replace(hE,"|").replace(lE,"[").replace(cE,"]")}function fE(t){return Ac(t).replace(Bp,"{").replace(jp,"}").replace(Up,"^")}function Nl(t){return Ac(t).replace(Fp,"%2B").replace(dE,"+").replace(Mp,"%23").replace(sE,"%26").replace(uE,"`").replace(Bp,"{").replace(jp,"}").replace(Up,"^")}function pE(t){return Nl(t).replace(oE,"%3D")}function mE(t){return Ac(t).replace(Mp,"%23").replace(aE,"%3F")}function gE(t){return t==null?"":mE(t).replace(iE,"%2F")}function di(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const _E=/\/$/,yE=t=>t.replace(_E,"");function il(t,e,n="/"){let r,s={},i="",o="";const l=e.indexOf("#");let c=e.indexOf("?");return l<c&&l>=0&&(c=-1),c>-1&&(r=e.slice(0,c),i=e.slice(c+1,l>-1?l:e.length),s=t(i)),l>-1&&(r=r||e.slice(0,l),o=e.slice(l,e.length)),r=TE(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:di(o)}}function vE(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Hh(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function EE(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&is(e.matched[r],n.matched[s])&&qp(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function is(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function qp(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!IE(t[n],e[n]))return!1;return!0}function IE(t,e){return Yt(t)?$h(t,e):Yt(e)?$h(e,t):t===e}function $h(t,e){return Yt(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function TE(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,l;for(o=0;o<r.length;o++)if(l=r[o],l!==".")if(l==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const qn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var fi;(function(t){t.pop="pop",t.push="push"})(fi||(fi={}));var ti;(function(t){t.back="back",t.forward="forward",t.unknown=""})(ti||(ti={}));function wE(t){if(!t)if(qr){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),yE(t)}const AE=/^[^#]+#/;function RE(t,e){return t.replace(AE,"#")+e}function bE(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const da=()=>({left:window.scrollX,top:window.scrollY});function PE(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=bE(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Gh(t,e){return(history.state?history.state.position-e:-1)+t}const Ol=new Map;function SE(t,e){Ol.set(t,e)}function CE(t){const e=Ol.get(t);return Ol.delete(t),e}let DE=()=>location.protocol+"//"+location.host;function Hp(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let l=s.includes(t.slice(i))?t.slice(i).length:1,c=s.slice(l);return c[0]!=="/"&&(c="/"+c),Hh(c,"")}return Hh(n,t)+r+s}function kE(t,e,n,r){let s=[],i=[],o=null;const l=({state:g})=>{const m=Hp(t,location),P=n.value,C=e.value;let O=0;if(g){if(n.value=m,e.value=g,o&&o===P){o=null;return}O=C?g.position-C.position:0}else r(m);s.forEach($=>{$(n.value,P,{delta:O,type:fi.pop,direction:O?O>0?ti.forward:ti.back:ti.unknown})})};function c(){o=n.value}function h(g){s.push(g);const m=()=>{const P=s.indexOf(g);P>-1&&s.splice(P,1)};return i.push(m),m}function d(){const{history:g}=window;g.state&&g.replaceState(Se({},g.state,{scroll:da()}),"")}function p(){for(const g of i)g();i=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",d)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",d,{passive:!0}),{pauseListeners:c,listen:h,destroy:p}}function Kh(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?da():null}}function NE(t){const{history:e,location:n}=window,r={value:Hp(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,h,d){const p=t.indexOf("#"),g=p>-1?(n.host&&document.querySelector("base")?t:t.slice(p))+c:DE()+t+c;try{e[d?"replaceState":"pushState"](h,"",g),s.value=h}catch(m){console.error(m),n[d?"replace":"assign"](g)}}function o(c,h){const d=Se({},e.state,Kh(s.value.back,c,s.value.forward,!0),h,{position:s.value.position});i(c,d,!0),r.value=c}function l(c,h){const d=Se({},s.value,e.state,{forward:c,scroll:da()});i(d.current,d,!0);const p=Se({},Kh(r.value,c,null),{position:d.position+1},h);i(c,p,!1),r.value=c}return{location:r,state:s,push:l,replace:o}}function OE(t){t=wE(t);const e=NE(t),n=kE(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=Se({location:"",base:t,go:r,createHref:RE.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function VE(t){return typeof t=="string"||t&&typeof t=="object"}function $p(t){return typeof t=="string"||typeof t=="symbol"}const Gp=Symbol("");var zh;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(zh||(zh={}));function os(t,e){return Se(new Error,{type:t,[Gp]:!0},e)}function vn(t,e){return t instanceof Error&&Gp in t&&(e==null||!!(t.type&e))}const Wh="[^/]+?",xE={sensitive:!1,strict:!1,start:!0,end:!0},LE=/[.+*?^${}()[\]/\\]/g;function ME(t,e){const n=Se({},xE,e),r=[];let s=n.start?"^":"";const i=[];for(const h of t){const d=h.length?[]:[90];n.strict&&!h.length&&(s+="/");for(let p=0;p<h.length;p++){const g=h[p];let m=40+(n.sensitive?.25:0);if(g.type===0)p||(s+="/"),s+=g.value.replace(LE,"\\$&"),m+=40;else if(g.type===1){const{value:P,repeatable:C,optional:O,regexp:$}=g;i.push({name:P,repeatable:C,optional:O});const q=$||Wh;if(q!==Wh){m+=10;try{new RegExp(`(${q})`)}catch(j){throw new Error(`Invalid custom RegExp for param "${P}" (${q}): `+j.message)}}let H=C?`((?:${q})(?:/(?:${q}))*)`:`(${q})`;p||(H=O&&h.length<2?`(?:/${H})`:"/"+H),O&&(H+="?"),s+=H,m+=20,O&&(m+=-8),C&&(m+=-20),q===".*"&&(m+=-50)}d.push(m)}r.push(d)}if(n.strict&&n.end){const h=r.length-1;r[h][r[h].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function l(h){const d=h.match(o),p={};if(!d)return null;for(let g=1;g<d.length;g++){const m=d[g]||"",P=i[g-1];p[P.name]=m&&P.repeatable?m.split("/"):m}return p}function c(h){let d="",p=!1;for(const g of t){(!p||!d.endsWith("/"))&&(d+="/"),p=!1;for(const m of g)if(m.type===0)d+=m.value;else if(m.type===1){const{value:P,repeatable:C,optional:O}=m,$=P in h?h[P]:"";if(Yt($)&&!C)throw new Error(`Provided param "${P}" is an array but it is not repeatable (* or + modifiers)`);const q=Yt($)?$.join("/"):$;if(!q)if(O)g.length<2&&(d.endsWith("/")?d=d.slice(0,-1):p=!0);else throw new Error(`Missing required param "${P}"`);d+=q}}return d||"/"}return{re:o,score:r,keys:i,parse:l,stringify:c}}function FE(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function Kp(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=FE(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(Qh(r))return 1;if(Qh(s))return-1}return s.length-r.length}function Qh(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const UE={type:0,value:""},BE=/[a-zA-Z0-9_]/;function jE(t){if(!t)return[[]];if(t==="/")return[[UE]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(m){throw new Error(`ERR (${n})/"${h}": ${m}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let l=0,c,h="",d="";function p(){h&&(n===0?i.push({type:0,value:h}):n===1||n===2||n===3?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:h,regexp:d,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),h="")}function g(){h+=c}for(;l<t.length;){if(c=t[l++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(h&&p(),o()):c===":"?(p(),n=1):g();break;case 4:g(),n=r;break;case 1:c==="("?n=2:BE.test(c)?g():(p(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&l--);break;case 2:c===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+c:n=3:d+=c;break;case 3:p(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&l--,d="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${h}"`),p(),o(),s}function qE(t,e,n){const r=ME(jE(t.path),n),s=Se(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function HE(t,e){const n=[],r=new Map;e=Zh({strict:!1,end:!0,sensitive:!1},e);function s(p){return r.get(p)}function i(p,g,m){const P=!m,C=Jh(p);C.aliasOf=m&&m.record;const O=Zh(e,p),$=[C];if("alias"in p){const j=typeof p.alias=="string"?[p.alias]:p.alias;for(const te of j)$.push(Jh(Se({},C,{components:m?m.record.components:C.components,path:te,aliasOf:m?m.record:C})))}let q,H;for(const j of $){const{path:te}=j;if(g&&te[0]!=="/"){const le=g.record.path,A=le[le.length-1]==="/"?"":"/";j.path=g.record.path+(te&&A+te)}if(q=qE(j,g,O),m?m.alias.push(q):(H=H||q,H!==q&&H.alias.push(q),P&&p.name&&!Xh(q)&&o(p.name)),zp(q)&&c(q),C.children){const le=C.children;for(let A=0;A<le.length;A++)i(le[A],q,m&&m.children[A])}m=m||q}return H?()=>{o(H)}:ei}function o(p){if($p(p)){const g=r.get(p);g&&(r.delete(p),n.splice(n.indexOf(g),1),g.children.forEach(o),g.alias.forEach(o))}else{const g=n.indexOf(p);g>-1&&(n.splice(g,1),p.record.name&&r.delete(p.record.name),p.children.forEach(o),p.alias.forEach(o))}}function l(){return n}function c(p){const g=KE(p,n);n.splice(g,0,p),p.record.name&&!Xh(p)&&r.set(p.record.name,p)}function h(p,g){let m,P={},C,O;if("name"in p&&p.name){if(m=r.get(p.name),!m)throw os(1,{location:p});O=m.record.name,P=Se(Yh(g.params,m.keys.filter(H=>!H.optional).concat(m.parent?m.parent.keys.filter(H=>H.optional):[]).map(H=>H.name)),p.params&&Yh(p.params,m.keys.map(H=>H.name))),C=m.stringify(P)}else if(p.path!=null)C=p.path,m=n.find(H=>H.re.test(C)),m&&(P=m.parse(C),O=m.record.name);else{if(m=g.name?r.get(g.name):n.find(H=>H.re.test(g.path)),!m)throw os(1,{location:p,currentLocation:g});O=m.record.name,P=Se({},g.params,p.params),C=m.stringify(P)}const $=[];let q=m;for(;q;)$.unshift(q.record),q=q.parent;return{name:O,path:C,params:P,matched:$,meta:GE($)}}t.forEach(p=>i(p));function d(){n.length=0,r.clear()}return{addRoute:i,resolve:h,removeRoute:o,clearRoutes:d,getRoutes:l,getRecordMatcher:s}}function Yh(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function Jh(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:$E(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function $E(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function Xh(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function GE(t){return t.reduce((e,n)=>Se(e,n.meta),{})}function Zh(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function KE(t,e){let n=0,r=e.length;for(;n!==r;){const i=n+r>>1;Kp(t,e[i])<0?r=i:n=i+1}const s=zE(t);return s&&(r=e.lastIndexOf(s,r-1)),r}function zE(t){let e=t;for(;e=e.parent;)if(zp(e)&&Kp(t,e)===0)return e}function zp({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function WE(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(Fp," "),o=i.indexOf("="),l=di(o<0?i:i.slice(0,o)),c=o<0?null:di(i.slice(o+1));if(l in e){let h=e[l];Yt(h)||(h=e[l]=[h]),h.push(c)}else e[l]=c}return e}function ed(t){let e="";for(let n in t){const r=t[n];if(n=pE(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(Yt(r)?r.map(i=>i&&Nl(i)):[r&&Nl(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function QE(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=Yt(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const YE=Symbol(""),td=Symbol(""),Rc=Symbol(""),Wp=Symbol(""),Vl=Symbol("");function Ms(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Kn(t,e,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((l,c)=>{const h=g=>{g===!1?c(os(4,{from:n,to:e})):g instanceof Error?c(g):VE(g)?c(os(2,{from:e,to:g})):(o&&r.enterCallbacks[s]===o&&typeof g=="function"&&o.push(g),l())},d=i(()=>t.call(r&&r.instances[s],e,n,h));let p=Promise.resolve(d);t.length<3&&(p=p.then(h)),p.catch(g=>c(g))})}function ol(t,e,n,r,s=i=>i()){const i=[];for(const o of t)for(const l in o.components){let c=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(Lp(c)){const d=(c.__vccOpts||c)[e];d&&i.push(Kn(d,n,r,o,l,s))}else{let h=c();i.push(()=>h.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const p=rE(d)?d.default:d;o.mods[l]=d,o.components[l]=p;const m=(p.__vccOpts||p)[e];return m&&Kn(m,n,r,o,l,s)()}))}}return i}function nd(t){const e=Pn(Rc),n=Pn(Wp),r=Ct(()=>{const c=Yr(t.to);return e.resolve(c)}),s=Ct(()=>{const{matched:c}=r.value,{length:h}=c,d=c[h-1],p=n.matched;if(!d||!p.length)return-1;const g=p.findIndex(is.bind(null,d));if(g>-1)return g;const m=rd(c[h-2]);return h>1&&rd(d)===m&&p[p.length-1].path!==m?p.findIndex(is.bind(null,c[h-2])):g}),i=Ct(()=>s.value>-1&&tI(n.params,r.value.params)),o=Ct(()=>s.value>-1&&s.value===n.matched.length-1&&qp(n.params,r.value.params));function l(c={}){if(eI(c)){const h=e[Yr(t.replace)?"replace":"push"](Yr(t.to)).catch(ei);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>h),h}return Promise.resolve()}return{route:r,href:Ct(()=>r.value.href),isActive:i,isExactActive:o,navigate:l}}function JE(t){return t.length===1?t[0]:t}const XE=ap({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:nd,setup(t,{slots:e}){const n=Nr(nd(t)),{options:r}=Pn(Rc),s=Ct(()=>({[sd(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[sd(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&JE(e.default(n));return t.custom?i:Vp("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),ZE=XE;function eI(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function tI(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!Yt(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function rd(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const sd=(t,e,n)=>t??e??n,nI=ap({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=Pn(Vl),s=Ct(()=>t.route||r.value),i=Pn(td,0),o=Ct(()=>{let h=Yr(i);const{matched:d}=s.value;let p;for(;(p=d[h])&&!p.components;)h++;return h}),l=Ct(()=>s.value.matched[o.value]);ho(td,Ct(()=>o.value+1)),ho(YE,l),ho(Vl,s);const c=Ne();return Ir(()=>[c.value,l.value,t.name],([h,d,p],[g,m,P])=>{d&&(d.instances[p]=h,m&&m!==d&&h&&h===g&&(d.leaveGuards.size||(d.leaveGuards=m.leaveGuards),d.updateGuards.size||(d.updateGuards=m.updateGuards))),h&&d&&(!m||!is(d,m)||!g)&&(d.enterCallbacks[p]||[]).forEach(C=>C(h))},{flush:"post"}),()=>{const h=s.value,d=t.name,p=l.value,g=p&&p.components[d];if(!g)return id(n.default,{Component:g,route:h});const m=p.props[d],P=m?m===!0?h.params:typeof m=="function"?m(h):m:null,O=Vp(g,Se({},P,e,{onVnodeUnmounted:$=>{$.component.isUnmounted&&(p.instances[d]=null)},ref:c}));return id(n.default,{Component:O,route:h})||O}}});function id(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const rI=nI;function sI(t){const e=HE(t.routes,t),n=t.parseQuery||WE,r=t.stringifyQuery||ed,s=t.history,i=Ms(),o=Ms(),l=Ms(),c=my(qn);let h=qn;qr&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=sl.bind(null,V=>""+V),p=sl.bind(null,gE),g=sl.bind(null,di);function m(V,J){let Y,Z;return $p(V)?(Y=e.getRecordMatcher(V),Z=J):Z=V,e.addRoute(Z,Y)}function P(V){const J=e.getRecordMatcher(V);J&&e.removeRoute(J)}function C(){return e.getRoutes().map(V=>V.record)}function O(V){return!!e.getRecordMatcher(V)}function $(V,J){if(J=Se({},J||c.value),typeof V=="string"){const S=il(n,V,J.path),x=e.resolve({path:S.path},J),F=s.createHref(S.fullPath);return Se(S,x,{params:g(x.params),hash:di(S.hash),redirectedFrom:void 0,href:F})}let Y;if(V.path!=null)Y=Se({},V,{path:il(n,V.path,J.path).path});else{const S=Se({},V.params);for(const x in S)S[x]==null&&delete S[x];Y=Se({},V,{params:p(S)}),J.params=p(J.params)}const Z=e.resolve(Y,J),Re=V.hash||"";Z.params=d(g(Z.params));const y=vE(r,Se({},V,{hash:fE(Re),path:Z.path})),I=s.createHref(y);return Se({fullPath:y,hash:Re,query:r===ed?QE(V.query):V.query||{}},Z,{redirectedFrom:void 0,href:I})}function q(V){return typeof V=="string"?il(n,V,c.value.path):Se({},V)}function H(V,J){if(h!==V)return os(8,{from:J,to:V})}function j(V){return A(V)}function te(V){return j(Se(q(V),{replace:!0}))}function le(V){const J=V.matched[V.matched.length-1];if(J&&J.redirect){const{redirect:Y}=J;let Z=typeof Y=="function"?Y(V):Y;return typeof Z=="string"&&(Z=Z.includes("?")||Z.includes("#")?Z=q(Z):{path:Z},Z.params={}),Se({query:V.query,hash:V.hash,params:Z.path!=null?{}:V.params},Z)}}function A(V,J){const Y=h=$(V),Z=c.value,Re=V.state,y=V.force,I=V.replace===!0,S=le(Y);if(S)return A(Se(q(S),{state:typeof S=="object"?Se({},Re,S.state):Re,force:y,replace:I}),J||Y);const x=Y;x.redirectedFrom=J;let F;return!y&&EE(r,Z,Y)&&(F=os(16,{to:x,from:Z}),Ft(Z,Z,!0,!1)),(F?Promise.resolve(F):R(x,Z)).catch(L=>vn(L)?vn(L,2)?L:Ht(L):ye(L,x,Z)).then(L=>{if(L){if(vn(L,2))return A(Se({replace:I},q(L.to),{state:typeof L.to=="object"?Se({},Re,L.to.state):Re,force:y}),J||x)}else L=D(x,Z,!0,I,Re);return b(x,Z,L),L})}function v(V,J){const Y=H(V,J);return Y?Promise.reject(Y):Promise.resolve()}function w(V){const J=Mn.values().next().value;return J&&typeof J.runWithContext=="function"?J.runWithContext(V):V()}function R(V,J){let Y;const[Z,Re,y]=iI(V,J);Y=ol(Z.reverse(),"beforeRouteLeave",V,J);for(const S of Z)S.leaveGuards.forEach(x=>{Y.push(Kn(x,V,J))});const I=v.bind(null,V,J);return Y.push(I),Pt(Y).then(()=>{Y=[];for(const S of i.list())Y.push(Kn(S,V,J));return Y.push(I),Pt(Y)}).then(()=>{Y=ol(Re,"beforeRouteUpdate",V,J);for(const S of Re)S.updateGuards.forEach(x=>{Y.push(Kn(x,V,J))});return Y.push(I),Pt(Y)}).then(()=>{Y=[];for(const S of y)if(S.beforeEnter)if(Yt(S.beforeEnter))for(const x of S.beforeEnter)Y.push(Kn(x,V,J));else Y.push(Kn(S.beforeEnter,V,J));return Y.push(I),Pt(Y)}).then(()=>(V.matched.forEach(S=>S.enterCallbacks={}),Y=ol(y,"beforeRouteEnter",V,J,w),Y.push(I),Pt(Y))).then(()=>{Y=[];for(const S of o.list())Y.push(Kn(S,V,J));return Y.push(I),Pt(Y)}).catch(S=>vn(S,8)?S:Promise.reject(S))}function b(V,J,Y){l.list().forEach(Z=>w(()=>Z(V,J,Y)))}function D(V,J,Y,Z,Re){const y=H(V,J);if(y)return y;const I=J===qn,S=qr?history.state:{};Y&&(Z||I?s.replace(V.fullPath,Se({scroll:I&&S&&S.scroll},Re)):s.push(V.fullPath,Re)),c.value=V,Ft(V,J,Y,I),Ht()}let T;function It(){T||(T=s.listen((V,J,Y)=>{if(!Xt.listening)return;const Z=$(V),Re=le(Z);if(Re){A(Se(Re,{replace:!0,force:!0}),Z).catch(ei);return}h=Z;const y=c.value;qr&&SE(Gh(y.fullPath,Y.delta),da()),R(Z,y).catch(I=>vn(I,12)?I:vn(I,2)?(A(Se(q(I.to),{force:!0}),Z).then(S=>{vn(S,20)&&!Y.delta&&Y.type===fi.pop&&s.go(-1,!1)}).catch(ei),Promise.reject()):(Y.delta&&s.go(-Y.delta,!1),ye(I,Z,y))).then(I=>{I=I||D(Z,y,!1),I&&(Y.delta&&!vn(I,8)?s.go(-Y.delta,!1):Y.type===fi.pop&&vn(I,20)&&s.go(-1,!1)),b(Z,y,I)}).catch(ei)}))}let Mt=Ms(),Ke=Ms(),Te;function ye(V,J,Y){Ht(V);const Z=Ke.list();return Z.length?Z.forEach(Re=>Re(V,J,Y)):console.error(V),Promise.reject(V)}function kt(){return Te&&c.value!==qn?Promise.resolve():new Promise((V,J)=>{Mt.add([V,J])})}function Ht(V){return Te||(Te=!V,It(),Mt.list().forEach(([J,Y])=>V?Y(V):J()),Mt.reset()),V}function Ft(V,J,Y,Z){const{scrollBehavior:Re}=t;if(!qr||!Re)return Promise.resolve();const y=!Y&&CE(Gh(V.fullPath,0))||(Z||!Y)&&history.state&&history.state.scroll||null;return _c().then(()=>Re(V,J,y)).then(I=>I&&PE(I)).catch(I=>ye(I,V,J))}const Ue=V=>s.go(V);let Be;const Mn=new Set,Xt={currentRoute:c,listening:!0,addRoute:m,removeRoute:P,clearRoutes:e.clearRoutes,hasRoute:O,getRoutes:C,resolve:$,options:t,push:j,replace:te,go:Ue,back:()=>Ue(-1),forward:()=>Ue(1),beforeEach:i.add,beforeResolve:o.add,afterEach:l.add,onError:Ke.add,isReady:kt,install(V){const J=this;V.component("RouterLink",ZE),V.component("RouterView",rI),V.config.globalProperties.$router=J,Object.defineProperty(V.config.globalProperties,"$route",{enumerable:!0,get:()=>Yr(c)}),qr&&!Be&&c.value===qn&&(Be=!0,j(s.location).catch(Re=>{}));const Y={};for(const Re in qn)Object.defineProperty(Y,Re,{get:()=>c.value[Re],enumerable:!0});V.provide(Rc,J),V.provide(Wp,Jf(Y)),V.provide(Vl,c);const Z=V.unmount;Mn.add(V),V.unmount=function(){Mn.delete(V),Mn.size<1&&(h=qn,T&&T(),T=null,c.value=qn,Be=!1,Te=!1),Z()}}};function Pt(V){return V.reduce((J,Y)=>J.then(()=>w(Y)),Promise.resolve())}return Xt}function iI(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const l=e.matched[o];l&&(t.matched.find(h=>is(h,l))?r.push(l):n.push(l));const c=t.matched[o];c&&(e.matched.find(h=>is(h,c))||s.push(c))}return[n,r,s]}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const oI=Symbol();var od;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(od||(od={}));function aI(){const t=Q_(!0),e=t.run(()=>Ne({}));let n=[],r=[];const s=Zf({install(i){s._a=i,i.provide(oI,s),i.config.globalProperties.$pinia=s,r.forEach(o=>n.push(o)),r=[]},use(i){return this._a?n.push(i):r.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return s}const ms=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},lI={name:"App"},cI={id:"app"};function uI(t,e,n,r,s,i){const o=Rl("router-view");return oe(),ce("div",cI,[Rt(o)])}const hI=ms(lI,[["render",uI]]);var ad={};/**
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
 */const Qp=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},dI=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Yp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,c=s+2<t.length,h=c?t[s+2]:0,d=i>>2,p=(i&3)<<4|l>>4;let g=(l&15)<<2|h>>6,m=h&63;c||(m=64,o||(g=64)),r.push(n[d],n[p],n[g],n[m])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Qp(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):dI(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||h==null||p==null)throw new fI;const g=i<<2|l>>4;if(r.push(g),h!==64){const m=l<<4&240|h>>2;if(r.push(m),p!==64){const P=h<<6&192|p;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class fI extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const pI=function(t){const e=Qp(t);return Yp.encodeByteArray(e,!0)},xo=function(t){return pI(t).replace(/\./g,"")},Jp=function(t){try{return Yp.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function mI(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const gI=()=>mI().__FIREBASE_DEFAULTS__,_I=()=>{if(typeof process>"u"||typeof ad>"u")return;const t=ad.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},yI=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Jp(t[1]);return e&&JSON.parse(e)},fa=()=>{try{return gI()||_I()||yI()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Xp=t=>{var e,n;return(n=(e=fa())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Zp=t=>{const e=Xp(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},em=()=>{var t;return(t=fa())===null||t===void 0?void 0:t.config},tm=t=>{var e;return(e=fa())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class vI{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function nm(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[xo(JSON.stringify(n)),xo(JSON.stringify(o)),""].join(".")}/**
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
 */function vt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function EI(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(vt())}function II(){var t;const e=(t=fa())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function TI(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function wI(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function AI(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function RI(){const t=vt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function bI(){return!II()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function PI(){try{return typeof indexedDB=="object"}catch{return!1}}function SI(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
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
 */const CI="FirebaseError";class pn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=CI,Object.setPrototypeOf(this,pn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,bi.prototype.create)}}class bi{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?DI(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new pn(s,l,r)}}function DI(t,e){return t.replace(kI,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const kI=/\{\$([^}]+)}/g;function NI(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Lo(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(ld(i)&&ld(o)){if(!Lo(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function ld(t){return t!==null&&typeof t=="object"}/**
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
 */function Pi(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function OI(t,e){const n=new VI(t,e);return n.subscribe.bind(n)}class VI{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");xI(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=al),s.error===void 0&&(s.error=al),s.complete===void 0&&(s.complete=al);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function xI(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function al(){}/**
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
 */function Et(t){return t&&t._delegate?t._delegate:t}class ir{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const _r="[DEFAULT]";/**
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
 */class LI{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new vI;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(FI(e))try{this.getOrInitializeService({instanceIdentifier:_r})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=_r){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=_r){return this.instances.has(e)}getOptions(e=_r){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:MI(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=_r){return this.component?this.component.multipleInstances?e:_r:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function MI(t){return t===_r?void 0:t}function FI(t){return t.instantiationMode==="EAGER"}/**
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
 */class UI{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new LI(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Ie;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Ie||(Ie={}));const BI={debug:Ie.DEBUG,verbose:Ie.VERBOSE,info:Ie.INFO,warn:Ie.WARN,error:Ie.ERROR,silent:Ie.SILENT},jI=Ie.INFO,qI={[Ie.DEBUG]:"log",[Ie.VERBOSE]:"log",[Ie.INFO]:"info",[Ie.WARN]:"warn",[Ie.ERROR]:"error"},HI=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=qI[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class bc{constructor(e){this.name=e,this._logLevel=jI,this._logHandler=HI,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Ie))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?BI[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Ie.DEBUG,...e),this._logHandler(this,Ie.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Ie.VERBOSE,...e),this._logHandler(this,Ie.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Ie.INFO,...e),this._logHandler(this,Ie.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Ie.WARN,...e),this._logHandler(this,Ie.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Ie.ERROR,...e),this._logHandler(this,Ie.ERROR,...e)}}const $I=(t,e)=>e.some(n=>t instanceof n);let cd,ud;function GI(){return cd||(cd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function KI(){return ud||(ud=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const rm=new WeakMap,xl=new WeakMap,sm=new WeakMap,ll=new WeakMap,Pc=new WeakMap;function zI(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(er(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&rm.set(n,t)}).catch(()=>{}),Pc.set(e,t),e}function WI(t){if(xl.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});xl.set(t,e)}let Ll={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return xl.get(t);if(e==="objectStoreNames")return t.objectStoreNames||sm.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return er(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function QI(t){Ll=t(Ll)}function YI(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(cl(this),e,...n);return sm.set(r,e.sort?e.sort():[e]),er(r)}:KI().includes(t)?function(...e){return t.apply(cl(this),e),er(rm.get(this))}:function(...e){return er(t.apply(cl(this),e))}}function JI(t){return typeof t=="function"?YI(t):(t instanceof IDBTransaction&&WI(t),$I(t,GI())?new Proxy(t,Ll):t)}function er(t){if(t instanceof IDBRequest)return zI(t);if(ll.has(t))return ll.get(t);const e=JI(t);return e!==t&&(ll.set(t,e),Pc.set(e,t)),e}const cl=t=>Pc.get(t);function XI(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=er(o);return r&&o.addEventListener("upgradeneeded",c=>{r(er(o.result),c.oldVersion,c.newVersion,er(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const ZI=["get","getKey","getAll","getAllKeys","count"],eT=["put","add","delete","clear"],ul=new Map;function hd(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ul.get(e))return ul.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=eT.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ZI.includes(n)))return;const i=async function(o,...l){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),s&&c.done]))[0]};return ul.set(e,i),i}QI(t=>({...t,get:(e,n,r)=>hd(e,n)||t.get(e,n,r),has:(e,n)=>!!hd(e,n)||t.has(e,n)}));/**
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
 */class tT{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(nT(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function nT(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ml="@firebase/app",dd="0.10.13";/**
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
 */const kn=new bc("@firebase/app"),rT="@firebase/app-compat",sT="@firebase/analytics-compat",iT="@firebase/analytics",oT="@firebase/app-check-compat",aT="@firebase/app-check",lT="@firebase/auth",cT="@firebase/auth-compat",uT="@firebase/database",hT="@firebase/data-connect",dT="@firebase/database-compat",fT="@firebase/functions",pT="@firebase/functions-compat",mT="@firebase/installations",gT="@firebase/installations-compat",_T="@firebase/messaging",yT="@firebase/messaging-compat",vT="@firebase/performance",ET="@firebase/performance-compat",IT="@firebase/remote-config",TT="@firebase/remote-config-compat",wT="@firebase/storage",AT="@firebase/storage-compat",RT="@firebase/firestore",bT="@firebase/vertexai-preview",PT="@firebase/firestore-compat",ST="firebase",CT="10.14.1";/**
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
 */const Fl="[DEFAULT]",DT={[Ml]:"fire-core",[rT]:"fire-core-compat",[iT]:"fire-analytics",[sT]:"fire-analytics-compat",[aT]:"fire-app-check",[oT]:"fire-app-check-compat",[lT]:"fire-auth",[cT]:"fire-auth-compat",[uT]:"fire-rtdb",[hT]:"fire-data-connect",[dT]:"fire-rtdb-compat",[fT]:"fire-fn",[pT]:"fire-fn-compat",[mT]:"fire-iid",[gT]:"fire-iid-compat",[_T]:"fire-fcm",[yT]:"fire-fcm-compat",[vT]:"fire-perf",[ET]:"fire-perf-compat",[IT]:"fire-rc",[TT]:"fire-rc-compat",[wT]:"fire-gcs",[AT]:"fire-gcs-compat",[RT]:"fire-fst",[PT]:"fire-fst-compat",[bT]:"fire-vertex","fire-js":"fire-js",[ST]:"fire-js-all"};/**
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
 */const Mo=new Map,kT=new Map,Ul=new Map;function fd(t,e){try{t.container.addComponent(e)}catch(n){kn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function br(t){const e=t.name;if(Ul.has(e))return kn.debug(`There were multiple attempts to register component ${e}.`),!1;Ul.set(e,t);for(const n of Mo.values())fd(n,t);for(const n of kT.values())fd(n,t);return!0}function pa(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Jn(t){return t.settings!==void 0}/**
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
 */const NT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},tr=new bi("app","Firebase",NT);/**
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
 */class OT{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ir("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw tr.create("app-deleted",{appName:this._name})}}/**
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
 */const Or=CT;function im(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Fl,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw tr.create("bad-app-name",{appName:String(s)});if(n||(n=em()),!n)throw tr.create("no-options");const i=Mo.get(s);if(i){if(Lo(n,i.options)&&Lo(r,i.config))return i;throw tr.create("duplicate-app",{appName:s})}const o=new UI(s);for(const c of Ul.values())o.addComponent(c);const l=new OT(n,r,o);return Mo.set(s,l),l}function Sc(t=Fl){const e=Mo.get(t);if(!e&&t===Fl&&em())return im();if(!e)throw tr.create("no-app",{appName:t});return e}function rn(t,e,n){var r;let s=(r=DT[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),kn.warn(l.join(" "));return}br(new ir(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const VT="firebase-heartbeat-database",xT=1,pi="firebase-heartbeat-store";let hl=null;function om(){return hl||(hl=XI(VT,xT,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(pi)}catch(n){console.warn(n)}}}}).catch(t=>{throw tr.create("idb-open",{originalErrorMessage:t.message})})),hl}async function LT(t){try{const n=(await om()).transaction(pi),r=await n.objectStore(pi).get(am(t));return await n.done,r}catch(e){if(e instanceof pn)kn.warn(e.message);else{const n=tr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});kn.warn(n.message)}}}async function pd(t,e){try{const r=(await om()).transaction(pi,"readwrite");await r.objectStore(pi).put(e,am(t)),await r.done}catch(n){if(n instanceof pn)kn.warn(n.message);else{const r=tr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});kn.warn(r.message)}}}function am(t){return`${t.name}!${t.options.appId}`}/**
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
 */const MT=1024,FT=30*24*60*60*1e3;class UT{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new jT(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=md();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=FT}),this._storage.overwrite(this._heartbeatsCache))}catch(r){kn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=md(),{heartbeatsToSend:r,unsentEntries:s}=BT(this._heartbeatsCache.heartbeats),i=xo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return kn.warn(n),""}}}function md(){return new Date().toISOString().substring(0,10)}function BT(t,e=MT){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),gd(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),gd(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class jT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return PI()?SI().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await LT(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return pd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return pd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function gd(t){return xo(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function qT(t){br(new ir("platform-logger",e=>new tT(e),"PRIVATE")),br(new ir("heartbeat",e=>new UT(e),"PRIVATE")),rn(Ml,dd,t),rn(Ml,dd,"esm2017"),rn("fire-js","")}qT("");var _d=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var wr,lm;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(A,v){function w(){}w.prototype=v.prototype,A.D=v.prototype,A.prototype=new w,A.prototype.constructor=A,A.C=function(R,b,D){for(var T=Array(arguments.length-2),It=2;It<arguments.length;It++)T[It-2]=arguments[It];return v.prototype[b].apply(R,T)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,v,w){w||(w=0);var R=Array(16);if(typeof v=="string")for(var b=0;16>b;++b)R[b]=v.charCodeAt(w++)|v.charCodeAt(w++)<<8|v.charCodeAt(w++)<<16|v.charCodeAt(w++)<<24;else for(b=0;16>b;++b)R[b]=v[w++]|v[w++]<<8|v[w++]<<16|v[w++]<<24;v=A.g[0],w=A.g[1],b=A.g[2];var D=A.g[3],T=v+(D^w&(b^D))+R[0]+3614090360&4294967295;v=w+(T<<7&4294967295|T>>>25),T=D+(b^v&(w^b))+R[1]+3905402710&4294967295,D=v+(T<<12&4294967295|T>>>20),T=b+(w^D&(v^w))+R[2]+606105819&4294967295,b=D+(T<<17&4294967295|T>>>15),T=w+(v^b&(D^v))+R[3]+3250441966&4294967295,w=b+(T<<22&4294967295|T>>>10),T=v+(D^w&(b^D))+R[4]+4118548399&4294967295,v=w+(T<<7&4294967295|T>>>25),T=D+(b^v&(w^b))+R[5]+1200080426&4294967295,D=v+(T<<12&4294967295|T>>>20),T=b+(w^D&(v^w))+R[6]+2821735955&4294967295,b=D+(T<<17&4294967295|T>>>15),T=w+(v^b&(D^v))+R[7]+4249261313&4294967295,w=b+(T<<22&4294967295|T>>>10),T=v+(D^w&(b^D))+R[8]+1770035416&4294967295,v=w+(T<<7&4294967295|T>>>25),T=D+(b^v&(w^b))+R[9]+2336552879&4294967295,D=v+(T<<12&4294967295|T>>>20),T=b+(w^D&(v^w))+R[10]+4294925233&4294967295,b=D+(T<<17&4294967295|T>>>15),T=w+(v^b&(D^v))+R[11]+2304563134&4294967295,w=b+(T<<22&4294967295|T>>>10),T=v+(D^w&(b^D))+R[12]+1804603682&4294967295,v=w+(T<<7&4294967295|T>>>25),T=D+(b^v&(w^b))+R[13]+4254626195&4294967295,D=v+(T<<12&4294967295|T>>>20),T=b+(w^D&(v^w))+R[14]+2792965006&4294967295,b=D+(T<<17&4294967295|T>>>15),T=w+(v^b&(D^v))+R[15]+1236535329&4294967295,w=b+(T<<22&4294967295|T>>>10),T=v+(b^D&(w^b))+R[1]+4129170786&4294967295,v=w+(T<<5&4294967295|T>>>27),T=D+(w^b&(v^w))+R[6]+3225465664&4294967295,D=v+(T<<9&4294967295|T>>>23),T=b+(v^w&(D^v))+R[11]+643717713&4294967295,b=D+(T<<14&4294967295|T>>>18),T=w+(D^v&(b^D))+R[0]+3921069994&4294967295,w=b+(T<<20&4294967295|T>>>12),T=v+(b^D&(w^b))+R[5]+3593408605&4294967295,v=w+(T<<5&4294967295|T>>>27),T=D+(w^b&(v^w))+R[10]+38016083&4294967295,D=v+(T<<9&4294967295|T>>>23),T=b+(v^w&(D^v))+R[15]+3634488961&4294967295,b=D+(T<<14&4294967295|T>>>18),T=w+(D^v&(b^D))+R[4]+3889429448&4294967295,w=b+(T<<20&4294967295|T>>>12),T=v+(b^D&(w^b))+R[9]+568446438&4294967295,v=w+(T<<5&4294967295|T>>>27),T=D+(w^b&(v^w))+R[14]+3275163606&4294967295,D=v+(T<<9&4294967295|T>>>23),T=b+(v^w&(D^v))+R[3]+4107603335&4294967295,b=D+(T<<14&4294967295|T>>>18),T=w+(D^v&(b^D))+R[8]+1163531501&4294967295,w=b+(T<<20&4294967295|T>>>12),T=v+(b^D&(w^b))+R[13]+2850285829&4294967295,v=w+(T<<5&4294967295|T>>>27),T=D+(w^b&(v^w))+R[2]+4243563512&4294967295,D=v+(T<<9&4294967295|T>>>23),T=b+(v^w&(D^v))+R[7]+1735328473&4294967295,b=D+(T<<14&4294967295|T>>>18),T=w+(D^v&(b^D))+R[12]+2368359562&4294967295,w=b+(T<<20&4294967295|T>>>12),T=v+(w^b^D)+R[5]+4294588738&4294967295,v=w+(T<<4&4294967295|T>>>28),T=D+(v^w^b)+R[8]+2272392833&4294967295,D=v+(T<<11&4294967295|T>>>21),T=b+(D^v^w)+R[11]+1839030562&4294967295,b=D+(T<<16&4294967295|T>>>16),T=w+(b^D^v)+R[14]+4259657740&4294967295,w=b+(T<<23&4294967295|T>>>9),T=v+(w^b^D)+R[1]+2763975236&4294967295,v=w+(T<<4&4294967295|T>>>28),T=D+(v^w^b)+R[4]+1272893353&4294967295,D=v+(T<<11&4294967295|T>>>21),T=b+(D^v^w)+R[7]+4139469664&4294967295,b=D+(T<<16&4294967295|T>>>16),T=w+(b^D^v)+R[10]+3200236656&4294967295,w=b+(T<<23&4294967295|T>>>9),T=v+(w^b^D)+R[13]+681279174&4294967295,v=w+(T<<4&4294967295|T>>>28),T=D+(v^w^b)+R[0]+3936430074&4294967295,D=v+(T<<11&4294967295|T>>>21),T=b+(D^v^w)+R[3]+3572445317&4294967295,b=D+(T<<16&4294967295|T>>>16),T=w+(b^D^v)+R[6]+76029189&4294967295,w=b+(T<<23&4294967295|T>>>9),T=v+(w^b^D)+R[9]+3654602809&4294967295,v=w+(T<<4&4294967295|T>>>28),T=D+(v^w^b)+R[12]+3873151461&4294967295,D=v+(T<<11&4294967295|T>>>21),T=b+(D^v^w)+R[15]+530742520&4294967295,b=D+(T<<16&4294967295|T>>>16),T=w+(b^D^v)+R[2]+3299628645&4294967295,w=b+(T<<23&4294967295|T>>>9),T=v+(b^(w|~D))+R[0]+4096336452&4294967295,v=w+(T<<6&4294967295|T>>>26),T=D+(w^(v|~b))+R[7]+1126891415&4294967295,D=v+(T<<10&4294967295|T>>>22),T=b+(v^(D|~w))+R[14]+2878612391&4294967295,b=D+(T<<15&4294967295|T>>>17),T=w+(D^(b|~v))+R[5]+4237533241&4294967295,w=b+(T<<21&4294967295|T>>>11),T=v+(b^(w|~D))+R[12]+1700485571&4294967295,v=w+(T<<6&4294967295|T>>>26),T=D+(w^(v|~b))+R[3]+2399980690&4294967295,D=v+(T<<10&4294967295|T>>>22),T=b+(v^(D|~w))+R[10]+4293915773&4294967295,b=D+(T<<15&4294967295|T>>>17),T=w+(D^(b|~v))+R[1]+2240044497&4294967295,w=b+(T<<21&4294967295|T>>>11),T=v+(b^(w|~D))+R[8]+1873313359&4294967295,v=w+(T<<6&4294967295|T>>>26),T=D+(w^(v|~b))+R[15]+4264355552&4294967295,D=v+(T<<10&4294967295|T>>>22),T=b+(v^(D|~w))+R[6]+2734768916&4294967295,b=D+(T<<15&4294967295|T>>>17),T=w+(D^(b|~v))+R[13]+1309151649&4294967295,w=b+(T<<21&4294967295|T>>>11),T=v+(b^(w|~D))+R[4]+4149444226&4294967295,v=w+(T<<6&4294967295|T>>>26),T=D+(w^(v|~b))+R[11]+3174756917&4294967295,D=v+(T<<10&4294967295|T>>>22),T=b+(v^(D|~w))+R[2]+718787259&4294967295,b=D+(T<<15&4294967295|T>>>17),T=w+(D^(b|~v))+R[9]+3951481745&4294967295,A.g[0]=A.g[0]+v&4294967295,A.g[1]=A.g[1]+(b+(T<<21&4294967295|T>>>11))&4294967295,A.g[2]=A.g[2]+b&4294967295,A.g[3]=A.g[3]+D&4294967295}r.prototype.u=function(A,v){v===void 0&&(v=A.length);for(var w=v-this.blockSize,R=this.B,b=this.h,D=0;D<v;){if(b==0)for(;D<=w;)s(this,A,D),D+=this.blockSize;if(typeof A=="string"){for(;D<v;)if(R[b++]=A.charCodeAt(D++),b==this.blockSize){s(this,R),b=0;break}}else for(;D<v;)if(R[b++]=A[D++],b==this.blockSize){s(this,R),b=0;break}}this.h=b,this.o+=v},r.prototype.v=function(){var A=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);A[0]=128;for(var v=1;v<A.length-8;++v)A[v]=0;var w=8*this.o;for(v=A.length-8;v<A.length;++v)A[v]=w&255,w/=256;for(this.u(A),A=Array(16),v=w=0;4>v;++v)for(var R=0;32>R;R+=8)A[w++]=this.g[v]>>>R&255;return A};function i(A,v){var w=l;return Object.prototype.hasOwnProperty.call(w,A)?w[A]:w[A]=v(A)}function o(A,v){this.h=v;for(var w=[],R=!0,b=A.length-1;0<=b;b--){var D=A[b]|0;R&&D==v||(w[b]=D,R=!1)}this.g=w}var l={};function c(A){return-128<=A&&128>A?i(A,function(v){return new o([v|0],0>v?-1:0)}):new o([A|0],0>A?-1:0)}function h(A){if(isNaN(A)||!isFinite(A))return p;if(0>A)return O(h(-A));for(var v=[],w=1,R=0;A>=w;R++)v[R]=A/w|0,w*=4294967296;return new o(v,0)}function d(A,v){if(A.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(A.charAt(0)=="-")return O(d(A.substring(1),v));if(0<=A.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=h(Math.pow(v,8)),R=p,b=0;b<A.length;b+=8){var D=Math.min(8,A.length-b),T=parseInt(A.substring(b,b+D),v);8>D?(D=h(Math.pow(v,D)),R=R.j(D).add(h(T))):(R=R.j(w),R=R.add(h(T)))}return R}var p=c(0),g=c(1),m=c(16777216);t=o.prototype,t.m=function(){if(C(this))return-O(this).m();for(var A=0,v=1,w=0;w<this.g.length;w++){var R=this.i(w);A+=(0<=R?R:4294967296+R)*v,v*=4294967296}return A},t.toString=function(A){if(A=A||10,2>A||36<A)throw Error("radix out of range: "+A);if(P(this))return"0";if(C(this))return"-"+O(this).toString(A);for(var v=h(Math.pow(A,6)),w=this,R="";;){var b=j(w,v).g;w=$(w,b.j(v));var D=((0<w.g.length?w.g[0]:w.h)>>>0).toString(A);if(w=b,P(w))return D+R;for(;6>D.length;)D="0"+D;R=D+R}},t.i=function(A){return 0>A?0:A<this.g.length?this.g[A]:this.h};function P(A){if(A.h!=0)return!1;for(var v=0;v<A.g.length;v++)if(A.g[v]!=0)return!1;return!0}function C(A){return A.h==-1}t.l=function(A){return A=$(this,A),C(A)?-1:P(A)?0:1};function O(A){for(var v=A.g.length,w=[],R=0;R<v;R++)w[R]=~A.g[R];return new o(w,~A.h).add(g)}t.abs=function(){return C(this)?O(this):this},t.add=function(A){for(var v=Math.max(this.g.length,A.g.length),w=[],R=0,b=0;b<=v;b++){var D=R+(this.i(b)&65535)+(A.i(b)&65535),T=(D>>>16)+(this.i(b)>>>16)+(A.i(b)>>>16);R=T>>>16,D&=65535,T&=65535,w[b]=T<<16|D}return new o(w,w[w.length-1]&-2147483648?-1:0)};function $(A,v){return A.add(O(v))}t.j=function(A){if(P(this)||P(A))return p;if(C(this))return C(A)?O(this).j(O(A)):O(O(this).j(A));if(C(A))return O(this.j(O(A)));if(0>this.l(m)&&0>A.l(m))return h(this.m()*A.m());for(var v=this.g.length+A.g.length,w=[],R=0;R<2*v;R++)w[R]=0;for(R=0;R<this.g.length;R++)for(var b=0;b<A.g.length;b++){var D=this.i(R)>>>16,T=this.i(R)&65535,It=A.i(b)>>>16,Mt=A.i(b)&65535;w[2*R+2*b]+=T*Mt,q(w,2*R+2*b),w[2*R+2*b+1]+=D*Mt,q(w,2*R+2*b+1),w[2*R+2*b+1]+=T*It,q(w,2*R+2*b+1),w[2*R+2*b+2]+=D*It,q(w,2*R+2*b+2)}for(R=0;R<v;R++)w[R]=w[2*R+1]<<16|w[2*R];for(R=v;R<2*v;R++)w[R]=0;return new o(w,0)};function q(A,v){for(;(A[v]&65535)!=A[v];)A[v+1]+=A[v]>>>16,A[v]&=65535,v++}function H(A,v){this.g=A,this.h=v}function j(A,v){if(P(v))throw Error("division by zero");if(P(A))return new H(p,p);if(C(A))return v=j(O(A),v),new H(O(v.g),O(v.h));if(C(v))return v=j(A,O(v)),new H(O(v.g),v.h);if(30<A.g.length){if(C(A)||C(v))throw Error("slowDivide_ only works with positive integers.");for(var w=g,R=v;0>=R.l(A);)w=te(w),R=te(R);var b=le(w,1),D=le(R,1);for(R=le(R,2),w=le(w,2);!P(R);){var T=D.add(R);0>=T.l(A)&&(b=b.add(w),D=T),R=le(R,1),w=le(w,1)}return v=$(A,b.j(v)),new H(b,v)}for(b=p;0<=A.l(v);){for(w=Math.max(1,Math.floor(A.m()/v.m())),R=Math.ceil(Math.log(w)/Math.LN2),R=48>=R?1:Math.pow(2,R-48),D=h(w),T=D.j(v);C(T)||0<T.l(A);)w-=R,D=h(w),T=D.j(v);P(D)&&(D=g),b=b.add(D),A=$(A,T)}return new H(b,A)}t.A=function(A){return j(this,A).h},t.and=function(A){for(var v=Math.max(this.g.length,A.g.length),w=[],R=0;R<v;R++)w[R]=this.i(R)&A.i(R);return new o(w,this.h&A.h)},t.or=function(A){for(var v=Math.max(this.g.length,A.g.length),w=[],R=0;R<v;R++)w[R]=this.i(R)|A.i(R);return new o(w,this.h|A.h)},t.xor=function(A){for(var v=Math.max(this.g.length,A.g.length),w=[],R=0;R<v;R++)w[R]=this.i(R)^A.i(R);return new o(w,this.h^A.h)};function te(A){for(var v=A.g.length+1,w=[],R=0;R<v;R++)w[R]=A.i(R)<<1|A.i(R-1)>>>31;return new o(w,A.h)}function le(A,v){var w=v>>5;v%=32;for(var R=A.g.length-w,b=[],D=0;D<R;D++)b[D]=0<v?A.i(D+w)>>>v|A.i(D+w+1)<<32-v:A.i(D+w);return new o(b,A.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,lm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=d,wr=o}).apply(typeof _d<"u"?_d:typeof self<"u"?self:typeof window<"u"?window:{});var so=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var cm,Hs,um,mo,Bl,hm,dm,fm;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,f){return a==Array.prototype||a==Object.prototype||(a[u]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof so=="object"&&so];for(var u=0;u<a.length;++u){var f=a[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(a,u){if(u)e:{var f=r;a=a.split(".");for(var _=0;_<a.length-1;_++){var k=a[_];if(!(k in f))break e;f=f[k]}a=a[a.length-1],_=f[a],u=u(_),u!=_&&u!=null&&e(f,a,{configurable:!0,writable:!0,value:u})}}function i(a,u){a instanceof String&&(a+="");var f=0,_=!1,k={next:function(){if(!_&&f<a.length){var N=f++;return{value:u(N,a[N]),done:!1}}return _=!0,{done:!0,value:void 0}}};return k[Symbol.iterator]=function(){return k},k}s("Array.prototype.values",function(a){return a||function(){return i(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function h(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function d(a,u,f){return a.call.apply(a.bind,arguments)}function p(a,u,f){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var k=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(k,_),a.apply(u,k)}}return function(){return a.apply(u,arguments)}}function g(a,u,f){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:p,g.apply(null,arguments)}function m(a,u){var f=Array.prototype.slice.call(arguments,1);return function(){var _=f.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function P(a,u){function f(){}f.prototype=u.prototype,a.aa=u.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(_,k,N){for(var z=Array(arguments.length-2),Oe=2;Oe<arguments.length;Oe++)z[Oe-2]=arguments[Oe];return u.prototype[k].apply(_,z)}}function C(a){const u=a.length;if(0<u){const f=Array(u);for(let _=0;_<u;_++)f[_]=a[_];return f}return[]}function O(a,u){for(let f=1;f<arguments.length;f++){const _=arguments[f];if(c(_)){const k=a.length||0,N=_.length||0;a.length=k+N;for(let z=0;z<N;z++)a[k+z]=_[z]}else a.push(_)}}class ${constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function q(a){return/^[\s\xa0]*$/.test(a)}function H(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function j(a){return j[" "](a),a}j[" "]=function(){};var te=H().indexOf("Gecko")!=-1&&!(H().toLowerCase().indexOf("webkit")!=-1&&H().indexOf("Edge")==-1)&&!(H().indexOf("Trident")!=-1||H().indexOf("MSIE")!=-1)&&H().indexOf("Edge")==-1;function le(a,u,f){for(const _ in a)u.call(f,a[_],_,a)}function A(a,u){for(const f in a)u.call(void 0,a[f],f,a)}function v(a){const u={};for(const f in a)u[f]=a[f];return u}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function R(a,u){let f,_;for(let k=1;k<arguments.length;k++){_=arguments[k];for(f in _)a[f]=_[f];for(let N=0;N<w.length;N++)f=w[N],Object.prototype.hasOwnProperty.call(_,f)&&(a[f]=_[f])}}function b(a){var u=1;a=a.split(":");const f=[];for(;0<u&&a.length;)f.push(a.shift()),u--;return a.length&&f.push(a.join(":")),f}function D(a){l.setTimeout(()=>{throw a},0)}function T(){var a=kt;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class It{constructor(){this.h=this.g=null}add(u,f){const _=Mt.get();_.set(u,f),this.h?this.h.next=_:this.g=_,this.h=_}}var Mt=new $(()=>new Ke,a=>a.reset());class Ke{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Te,ye=!1,kt=new It,Ht=()=>{const a=l.Promise.resolve(void 0);Te=()=>{a.then(Ft)}};var Ft=()=>{for(var a;a=T();){try{a.h.call(a.g)}catch(f){D(f)}var u=Mt;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}ye=!1};function Ue(){this.s=this.s,this.C=this.C}Ue.prototype.s=!1,Ue.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ue.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Be(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}Be.prototype.h=function(){this.defaultPrevented=!0};var Mn=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};l.addEventListener("test",f,u),l.removeEventListener("test",f,u)}catch{}return a}();function Xt(a,u){if(Be.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(te){e:{try{j(u.nodeName);var k=!0;break e}catch{}k=!1}k||(u=null)}}else f=="mouseover"?u=a.fromElement:f=="mouseout"&&(u=a.toElement);this.relatedTarget=u,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Pt[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Xt.aa.h.call(this)}}P(Xt,Be);var Pt={2:"touch",3:"pen",4:"mouse"};Xt.prototype.h=function(){Xt.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var V="closure_listenable_"+(1e6*Math.random()|0),J=0;function Y(a,u,f,_,k){this.listener=a,this.proxy=null,this.src=u,this.type=f,this.capture=!!_,this.ha=k,this.key=++J,this.da=this.fa=!1}function Z(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Re(a){this.src=a,this.g={},this.h=0}Re.prototype.add=function(a,u,f,_,k){var N=a.toString();a=this.g[N],a||(a=this.g[N]=[],this.h++);var z=I(a,u,_,k);return-1<z?(u=a[z],f||(u.fa=!1)):(u=new Y(u,this.src,N,!!_,k),u.fa=f,a.push(u)),u};function y(a,u){var f=u.type;if(f in a.g){var _=a.g[f],k=Array.prototype.indexOf.call(_,u,void 0),N;(N=0<=k)&&Array.prototype.splice.call(_,k,1),N&&(Z(u),a.g[f].length==0&&(delete a.g[f],a.h--))}}function I(a,u,f,_){for(var k=0;k<a.length;++k){var N=a[k];if(!N.da&&N.listener==u&&N.capture==!!f&&N.ha==_)return k}return-1}var S="closure_lm_"+(1e6*Math.random()|0),x={};function F(a,u,f,_,k){if(Array.isArray(u)){for(var N=0;N<u.length;N++)F(a,u[N],f,_,k);return null}return f=he(f),a&&a[V]?a.K(u,f,h(_)?!!_.capture:!1,k):L(a,u,f,!1,_,k)}function L(a,u,f,_,k,N){if(!u)throw Error("Invalid event type");var z=h(k)?!!k.capture:!!k,Oe=W(a);if(Oe||(a[S]=Oe=new Re(a)),f=Oe.add(u,f,_,z,N),f.proxy)return f;if(_=Q(),f.proxy=_,_.src=a,_.listener=f,a.addEventListener)Mn||(k=z),k===void 0&&(k=!1),a.addEventListener(u.toString(),_,k);else if(a.attachEvent)a.attachEvent(B(u.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Q(){function a(f){return u.call(a.src,a.listener,f)}const u=se;return a}function K(a,u,f,_,k){if(Array.isArray(u))for(var N=0;N<u.length;N++)K(a,u[N],f,_,k);else _=h(_)?!!_.capture:!!_,f=he(f),a&&a[V]?(a=a.i,u=String(u).toString(),u in a.g&&(N=a.g[u],f=I(N,f,_,k),-1<f&&(Z(N[f]),Array.prototype.splice.call(N,f,1),N.length==0&&(delete a.g[u],a.h--)))):a&&(a=W(a))&&(u=a.g[u.toString()],a=-1,u&&(a=I(u,f,_,k)),(f=-1<a?u[a]:null)&&G(f))}function G(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[V])y(u.i,a);else{var f=a.type,_=a.proxy;u.removeEventListener?u.removeEventListener(f,_,a.capture):u.detachEvent?u.detachEvent(B(f),_):u.addListener&&u.removeListener&&u.removeListener(_),(f=W(u))?(y(f,a),f.h==0&&(f.src=null,u[S]=null)):Z(a)}}}function B(a){return a in x?x[a]:x[a]="on"+a}function se(a,u){if(a.da)a=!0;else{u=new Xt(u,this);var f=a.listener,_=a.ha||a.src;a.fa&&G(a),a=f.call(_,u)}return a}function W(a){return a=a[S],a instanceof Re?a:null}var re="__closure_events_fn_"+(1e9*Math.random()>>>0);function he(a){return typeof a=="function"?a:(a[re]||(a[re]=function(u){return a.handleEvent(u)}),a[re])}function ae(){Ue.call(this),this.i=new Re(this),this.M=this,this.F=null}P(ae,Ue),ae.prototype[V]=!0,ae.prototype.removeEventListener=function(a,u,f,_){K(this,a,u,f,_)};function _e(a,u){var f,_=a.F;if(_)for(f=[];_;_=_.F)f.push(_);if(a=a.M,_=u.type||u,typeof u=="string")u=new Be(u,a);else if(u instanceof Be)u.target=u.target||a;else{var k=u;u=new Be(_,a),R(u,k)}if(k=!0,f)for(var N=f.length-1;0<=N;N--){var z=u.g=f[N];k=we(z,_,!0,u)&&k}if(z=u.g=a,k=we(z,_,!0,u)&&k,k=we(z,_,!1,u)&&k,f)for(N=0;N<f.length;N++)z=u.g=f[N],k=we(z,_,!1,u)&&k}ae.prototype.N=function(){if(ae.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var f=a.g[u],_=0;_<f.length;_++)Z(f[_]);delete a.g[u],a.h--}}this.F=null},ae.prototype.K=function(a,u,f,_){return this.i.add(String(a),u,!1,f,_)},ae.prototype.L=function(a,u,f,_){return this.i.add(String(a),u,!0,f,_)};function we(a,u,f,_){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var k=!0,N=0;N<u.length;++N){var z=u[N];if(z&&!z.da&&z.capture==f){var Oe=z.listener,nt=z.ha||z.src;z.fa&&y(a.i,z),k=Oe.call(nt,_)!==!1&&k}}return k&&!_.defaultPrevented}function Ze(a,u,f){if(typeof a=="function")f&&(a=g(a,f));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(a,u||0)}function et(a){a.g=Ze(()=>{a.g=null,a.i&&(a.i=!1,et(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class Ut extends Ue{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:et(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function lt(a){Ue.call(this),this.h=a,this.g={}}P(lt,Ue);var Fn=[];function Ts(a){le(a.g,function(u,f){this.g.hasOwnProperty(f)&&G(u)},a),a.g={}}lt.prototype.N=function(){lt.aa.N.call(this),Ts(this)},lt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var tt=l.JSON.stringify,Bt=l.JSON.parse,Ui=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Oa(){}Oa.prototype.h=null;function Iu(a){return a.h||(a.h=a.i())}function Tu(){}var ws={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Va(){Be.call(this,"d")}P(Va,Be);function xa(){Be.call(this,"c")}P(xa,Be);var ur={},wu=null;function Bi(){return wu=wu||new ae}ur.La="serverreachability";function Au(a){Be.call(this,ur.La,a)}P(Au,Be);function As(a){const u=Bi();_e(u,new Au(u))}ur.STAT_EVENT="statevent";function Ru(a,u){Be.call(this,ur.STAT_EVENT,a),this.stat=u}P(Ru,Be);function Tt(a){const u=Bi();_e(u,new Ru(u,a))}ur.Ma="timingevent";function bu(a,u){Be.call(this,ur.Ma,a),this.size=u}P(bu,Be);function Rs(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},u)}function bs(){this.g=!0}bs.prototype.xa=function(){this.g=!1};function f_(a,u,f,_,k,N){a.info(function(){if(a.g)if(N)for(var z="",Oe=N.split("&"),nt=0;nt<Oe.length;nt++){var be=Oe[nt].split("=");if(1<be.length){var ct=be[0];be=be[1];var ut=ct.split("_");z=2<=ut.length&&ut[1]=="type"?z+(ct+"="+be+"&"):z+(ct+"=redacted&")}}else z=null;else z=N;return"XMLHTTP REQ ("+_+") [attempt "+k+"]: "+u+`
`+f+`
`+z})}function p_(a,u,f,_,k,N,z){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+k+"]: "+u+`
`+f+`
`+N+" "+z})}function Lr(a,u,f,_){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+g_(a,f)+(_?" "+_:"")})}function m_(a,u){a.info(function(){return"TIMEOUT: "+u})}bs.prototype.info=function(){};function g_(a,u){if(!a.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var _=f[a];if(!(2>_.length)){var k=_[1];if(Array.isArray(k)&&!(1>k.length)){var N=k[0];if(N!="noop"&&N!="stop"&&N!="close")for(var z=1;z<k.length;z++)k[z]=""}}}}return tt(f)}catch{return u}}var ji={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Pu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},La;function qi(){}P(qi,Oa),qi.prototype.g=function(){return new XMLHttpRequest},qi.prototype.i=function(){return{}},La=new qi;function Un(a,u,f,_){this.j=a,this.i=u,this.l=f,this.R=_||1,this.U=new lt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Su}function Su(){this.i=null,this.g="",this.h=!1}var Cu={},Ma={};function Fa(a,u,f){a.L=1,a.v=Ki(gn(u)),a.m=f,a.P=!0,Du(a,null)}function Du(a,u){a.F=Date.now(),Hi(a),a.A=gn(a.v);var f=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),$u(f.i,"t",_),a.C=0,f=a.j.J,a.h=new Su,a.g=lh(a.j,f?u:null,!a.m),0<a.O&&(a.M=new Ut(g(a.Y,a,a.g),a.O)),u=a.U,f=a.g,_=a.ca;var k="readystatechange";Array.isArray(k)||(k&&(Fn[0]=k.toString()),k=Fn);for(var N=0;N<k.length;N++){var z=F(f,k[N],_||u.handleEvent,!1,u.h||u);if(!z)break;u.g[z.key]=z}u=a.H?v(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),As(),f_(a.i,a.u,a.A,a.l,a.R,a.m)}Un.prototype.ca=function(a){a=a.target;const u=this.M;u&&_n(a)==3?u.j():this.Y(a)},Un.prototype.Y=function(a){try{if(a==this.g)e:{const ut=_n(this.g);var u=this.g.Ba();const Ur=this.g.Z();if(!(3>ut)&&(ut!=3||this.g&&(this.h.h||this.g.oa()||Ju(this.g)))){this.J||ut!=4||u==7||(u==8||0>=Ur?As(3):As(2)),Ua(this);var f=this.g.Z();this.X=f;t:if(ku(this)){var _=Ju(this.g);a="";var k=_.length,N=_n(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){hr(this),Ps(this);var z="";break t}this.h.i=new l.TextDecoder}for(u=0;u<k;u++)this.h.h=!0,a+=this.h.i.decode(_[u],{stream:!(N&&u==k-1)});_.length=0,this.h.g+=a,this.C=0,z=this.h.g}else z=this.g.oa();if(this.o=f==200,p_(this.i,this.u,this.A,this.l,this.R,ut,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Oe,nt=this.g;if((Oe=nt.g?nt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(Oe)){var be=Oe;break t}}be=null}if(f=be)Lr(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ba(this,f);else{this.o=!1,this.s=3,Tt(12),hr(this),Ps(this);break e}}if(this.P){f=!0;let $t;for(;!this.J&&this.C<z.length;)if($t=__(this,z),$t==Ma){ut==4&&(this.s=4,Tt(14),f=!1),Lr(this.i,this.l,null,"[Incomplete Response]");break}else if($t==Cu){this.s=4,Tt(15),Lr(this.i,this.l,z,"[Invalid Chunk]"),f=!1;break}else Lr(this.i,this.l,$t,null),Ba(this,$t);if(ku(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ut!=4||z.length!=0||this.h.h||(this.s=1,Tt(16),f=!1),this.o=this.o&&f,!f)Lr(this.i,this.l,z,"[Invalid Chunked Response]"),hr(this),Ps(this);else if(0<z.length&&!this.W){this.W=!0;var ct=this.j;ct.g==this&&ct.ba&&!ct.M&&(ct.j.info("Great, no buffering proxy detected. Bytes received: "+z.length),Ka(ct),ct.M=!0,Tt(11))}}else Lr(this.i,this.l,z,null),Ba(this,z);ut==4&&hr(this),this.o&&!this.J&&(ut==4?sh(this.j,this):(this.o=!1,Hi(this)))}else V_(this.g),f==400&&0<z.indexOf("Unknown SID")?(this.s=3,Tt(12)):(this.s=0,Tt(13)),hr(this),Ps(this)}}}catch{}finally{}};function ku(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function __(a,u){var f=a.C,_=u.indexOf(`
`,f);return _==-1?Ma:(f=Number(u.substring(f,_)),isNaN(f)?Cu:(_+=1,_+f>u.length?Ma:(u=u.slice(_,_+f),a.C=_+f,u)))}Un.prototype.cancel=function(){this.J=!0,hr(this)};function Hi(a){a.S=Date.now()+a.I,Nu(a,a.I)}function Nu(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Rs(g(a.ba,a),u)}function Ua(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Un.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(m_(this.i,this.A),this.L!=2&&(As(),Tt(17)),hr(this),this.s=2,Ps(this)):Nu(this,this.S-a)};function Ps(a){a.j.G==0||a.J||sh(a.j,a)}function hr(a){Ua(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,Ts(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function Ba(a,u){try{var f=a.j;if(f.G!=0&&(f.g==a||ja(f.h,a))){if(!a.K&&ja(f.h,a)&&f.G==3){try{var _=f.Da.g.parse(u)}catch{_=null}if(Array.isArray(_)&&_.length==3){var k=_;if(k[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)Xi(f),Yi(f);else break e;Ga(f),Tt(18)}}else f.za=k[1],0<f.za-f.T&&37500>k[2]&&f.F&&f.v==0&&!f.C&&(f.C=Rs(g(f.Za,f),6e3));if(1>=xu(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else fr(f,11)}else if((a.K||f.g==a)&&Xi(f),!q(u))for(k=f.Da.g.parse(u),u=0;u<k.length;u++){let be=k[u];if(f.T=be[0],be=be[1],f.G==2)if(be[0]=="c"){f.K=be[1],f.ia=be[2];const ct=be[3];ct!=null&&(f.la=ct,f.j.info("VER="+f.la));const ut=be[4];ut!=null&&(f.Aa=ut,f.j.info("SVER="+f.Aa));const Ur=be[5];Ur!=null&&typeof Ur=="number"&&0<Ur&&(_=1.5*Ur,f.L=_,f.j.info("backChannelRequestTimeoutMs_="+_)),_=f;const $t=a.g;if($t){const eo=$t.g?$t.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(eo){var N=_.h;N.g||eo.indexOf("spdy")==-1&&eo.indexOf("quic")==-1&&eo.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(qa(N,N.h),N.h=null))}if(_.D){const za=$t.g?$t.g.getResponseHeader("X-HTTP-Session-Id"):null;za&&(_.ya=za,Me(_.I,_.D,za))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),_=f;var z=a;if(_.qa=ah(_,_.J?_.ia:null,_.W),z.K){Lu(_.h,z);var Oe=z,nt=_.L;nt&&(Oe.I=nt),Oe.B&&(Ua(Oe),Hi(Oe)),_.g=z}else nh(_);0<f.i.length&&Ji(f)}else be[0]!="stop"&&be[0]!="close"||fr(f,7);else f.G==3&&(be[0]=="stop"||be[0]=="close"?be[0]=="stop"?fr(f,7):$a(f):be[0]!="noop"&&f.l&&f.l.ta(be),f.v=0)}}As(4)}catch{}}var y_=class{constructor(a,u){this.g=a,this.map=u}};function Ou(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Vu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function xu(a){return a.h?1:a.g?a.g.size:0}function ja(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function qa(a,u){a.g?a.g.add(u):a.h=u}function Lu(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}Ou.prototype.cancel=function(){if(this.i=Mu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Mu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const f of a.g.values())u=u.concat(f.D);return u}return C(a.i)}function v_(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var u=[],f=a.length,_=0;_<f;_++)u.push(a[_]);return u}u=[],f=0;for(_ in a)u[f++]=a[_];return u}function E_(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var u=[];a=a.length;for(var f=0;f<a;f++)u.push(f);return u}u=[],f=0;for(const _ in a)u[f++]=_;return u}}}function Fu(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var f=E_(a),_=v_(a),k=_.length,N=0;N<k;N++)u.call(void 0,_[N],f&&f[N],a)}var Uu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function I_(a,u){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var _=a[f].indexOf("="),k=null;if(0<=_){var N=a[f].substring(0,_);k=a[f].substring(_+1)}else N=a[f];u(N,k?decodeURIComponent(k.replace(/\+/g," ")):"")}}}function dr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof dr){this.h=a.h,$i(this,a.j),this.o=a.o,this.g=a.g,Gi(this,a.s),this.l=a.l;var u=a.i,f=new Ds;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),Bu(this,f),this.m=a.m}else a&&(u=String(a).match(Uu))?(this.h=!1,$i(this,u[1]||"",!0),this.o=Ss(u[2]||""),this.g=Ss(u[3]||"",!0),Gi(this,u[4]),this.l=Ss(u[5]||"",!0),Bu(this,u[6]||"",!0),this.m=Ss(u[7]||"")):(this.h=!1,this.i=new Ds(null,this.h))}dr.prototype.toString=function(){var a=[],u=this.j;u&&a.push(Cs(u,ju,!0),":");var f=this.g;return(f||u=="file")&&(a.push("//"),(u=this.o)&&a.push(Cs(u,ju,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Cs(f,f.charAt(0)=="/"?A_:w_,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Cs(f,b_)),a.join("")};function gn(a){return new dr(a)}function $i(a,u,f){a.j=f?Ss(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function Gi(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function Bu(a,u,f){u instanceof Ds?(a.i=u,P_(a.i,a.h)):(f||(u=Cs(u,R_)),a.i=new Ds(u,a.h))}function Me(a,u,f){a.i.set(u,f)}function Ki(a){return Me(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ss(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Cs(a,u,f){return typeof a=="string"?(a=encodeURI(a).replace(u,T_),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function T_(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var ju=/[#\/\?@]/g,w_=/[#\?:]/g,A_=/[#\?]/g,R_=/[#\?@]/g,b_=/#/g;function Ds(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Bn(a){a.g||(a.g=new Map,a.h=0,a.i&&I_(a.i,function(u,f){a.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}t=Ds.prototype,t.add=function(a,u){Bn(this),this.i=null,a=Mr(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(u),this.h+=1,this};function qu(a,u){Bn(a),u=Mr(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function Hu(a,u){return Bn(a),u=Mr(a,u),a.g.has(u)}t.forEach=function(a,u){Bn(this),this.g.forEach(function(f,_){f.forEach(function(k){a.call(u,k,_,this)},this)},this)},t.na=function(){Bn(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let _=0;_<u.length;_++){const k=a[_];for(let N=0;N<k.length;N++)f.push(u[_])}return f},t.V=function(a){Bn(this);let u=[];if(typeof a=="string")Hu(this,a)&&(u=u.concat(this.g.get(Mr(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)u=u.concat(a[f])}return u},t.set=function(a,u){return Bn(this),this.i=null,a=Mr(this,a),Hu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},t.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function $u(a,u,f){qu(a,u),0<f.length&&(a.i=null,a.g.set(Mr(a,u),C(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var _=u[f];const N=encodeURIComponent(String(_)),z=this.V(_);for(_=0;_<z.length;_++){var k=N;z[_]!==""&&(k+="="+encodeURIComponent(String(z[_]))),a.push(k)}}return this.i=a.join("&")};function Mr(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function P_(a,u){u&&!a.j&&(Bn(a),a.i=null,a.g.forEach(function(f,_){var k=_.toLowerCase();_!=k&&(qu(this,_),$u(this,k,f))},a)),a.j=u}function S_(a,u){const f=new bs;if(l.Image){const _=new Image;_.onload=m(jn,f,"TestLoadImage: loaded",!0,u,_),_.onerror=m(jn,f,"TestLoadImage: error",!1,u,_),_.onabort=m(jn,f,"TestLoadImage: abort",!1,u,_),_.ontimeout=m(jn,f,"TestLoadImage: timeout",!1,u,_),l.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else u(!1)}function C_(a,u){const f=new bs,_=new AbortController,k=setTimeout(()=>{_.abort(),jn(f,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:_.signal}).then(N=>{clearTimeout(k),N.ok?jn(f,"TestPingServer: ok",!0,u):jn(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(k),jn(f,"TestPingServer: error",!1,u)})}function jn(a,u,f,_,k){try{k&&(k.onload=null,k.onerror=null,k.onabort=null,k.ontimeout=null),_(f)}catch{}}function D_(){this.g=new Ui}function k_(a,u,f){const _=f||"";try{Fu(a,function(k,N){let z=k;h(k)&&(z=tt(k)),u.push(_+N+"="+encodeURIComponent(z))})}catch(k){throw u.push(_+"type="+encodeURIComponent("_badmap")),k}}function zi(a){this.l=a.Ub||null,this.j=a.eb||!1}P(zi,Oa),zi.prototype.g=function(){return new Wi(this.l,this.j)},zi.prototype.i=function(a){return function(){return a}}({});function Wi(a,u){ae.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(Wi,ae),t=Wi.prototype,t.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,Ns(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ks(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ns(this)),this.g&&(this.readyState=3,Ns(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Gu(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Gu(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?ks(this):Ns(this),this.readyState==3&&Gu(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,ks(this))},t.Qa=function(a){this.g&&(this.response=a,ks(this))},t.ga=function(){this.g&&ks(this)};function ks(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ns(a)}t.setRequestHeader=function(a,u){this.u.append(a,u)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=u.next();return a.join(`\r
`)};function Ns(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Wi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Ku(a){let u="";return le(a,function(f,_){u+=_,u+=":",u+=f,u+=`\r
`}),u}function Ha(a,u,f){e:{for(_ in f){var _=!1;break e}_=!0}_||(f=Ku(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):Me(a,u,f))}function He(a){ae.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(He,ae);var N_=/^https?$/i,O_=["POST","PUT"];t=He.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,u,f,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():La.g(),this.v=this.o?Iu(this.o):Iu(La),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(N){zu(this,N);return}if(a=f||"",f=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var k in _)f.set(k,_[k]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const N of _.keys())f.set(N,_.get(N));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(f.keys()).find(N=>N.toLowerCase()=="content-type"),k=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(O_,u,void 0))||_||k||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,z]of f)this.g.setRequestHeader(N,z);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Yu(this),this.u=!0,this.g.send(a),this.u=!1}catch(N){zu(this,N)}};function zu(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,Wu(a),Qi(a)}function Wu(a){a.A||(a.A=!0,_e(a,"complete"),_e(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,_e(this,"complete"),_e(this,"abort"),Qi(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Qi(this,!0)),He.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Qu(this):this.bb())},t.bb=function(){Qu(this)};function Qu(a){if(a.h&&typeof o<"u"&&(!a.v[1]||_n(a)!=4||a.Z()!=2)){if(a.u&&_n(a)==4)Ze(a.Ea,0,a);else if(_e(a,"readystatechange"),_n(a)==4){a.h=!1;try{const z=a.Z();e:switch(z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var f;if(!(f=u)){var _;if(_=z===0){var k=String(a.D).match(Uu)[1]||null;!k&&l.self&&l.self.location&&(k=l.self.location.protocol.slice(0,-1)),_=!N_.test(k?k.toLowerCase():"")}f=_}if(f)_e(a,"complete"),_e(a,"success");else{a.m=6;try{var N=2<_n(a)?a.g.statusText:""}catch{N=""}a.l=N+" ["+a.Z()+"]",Wu(a)}}finally{Qi(a)}}}}function Qi(a,u){if(a.g){Yu(a);const f=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||_e(a,"ready");try{f.onreadystatechange=_}catch{}}}function Yu(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function _n(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<_n(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),Bt(u)}};function Ju(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function V_(a){const u={};a=(a.g&&2<=_n(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(q(a[_]))continue;var f=b(a[_]);const k=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const N=u[k]||[];u[k]=N,N.push(f)}A(u,function(_){return _.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Os(a,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||u}function Xu(a){this.Aa=0,this.i=[],this.j=new bs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Os("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Os("baseRetryDelayMs",5e3,a),this.cb=Os("retryDelaySeedMs",1e4,a),this.Wa=Os("forwardChannelMaxRetries",2,a),this.wa=Os("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Ou(a&&a.concurrentRequestLimit),this.Da=new D_,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Xu.prototype,t.la=8,t.G=1,t.connect=function(a,u,f,_){Tt(0),this.W=a,this.H=u||{},f&&_!==void 0&&(this.H.OSID=f,this.H.OAID=_),this.F=this.X,this.I=ah(this,null,this.W),Ji(this)};function $a(a){if(Zu(a),a.G==3){var u=a.U++,f=gn(a.I);if(Me(f,"SID",a.K),Me(f,"RID",u),Me(f,"TYPE","terminate"),Vs(a,f),u=new Un(a,a.j,u),u.L=2,u.v=Ki(gn(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=u.v,f=!0),f||(u.g=lh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Hi(u)}oh(a)}function Yi(a){a.g&&(Ka(a),a.g.cancel(),a.g=null)}function Zu(a){Yi(a),a.u&&(l.clearTimeout(a.u),a.u=null),Xi(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Ji(a){if(!Vu(a.h)&&!a.s){a.s=!0;var u=a.Ga;Te||Ht(),ye||(Te(),ye=!0),kt.add(u,a),a.B=0}}function x_(a,u){return xu(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Rs(g(a.Ga,a,u),ih(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const k=new Un(this,this.j,a);let N=this.o;if(this.S&&(N?(N=v(N),R(N,this.S)):N=this.S),this.m!==null||this.O||(k.H=N,N=null),this.P)e:{for(var u=0,f=0;f<this.i.length;f++){t:{var _=this.i[f];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(u+=_,4096<u){u=f;break e}if(u===4096||f===this.i.length-1){u=f+1;break e}}u=1e3}else u=1e3;u=th(this,k,u),f=gn(this.I),Me(f,"RID",a),Me(f,"CVER",22),this.D&&Me(f,"X-HTTP-Session-Id",this.D),Vs(this,f),N&&(this.O?u="headers="+encodeURIComponent(String(Ku(N)))+"&"+u:this.m&&Ha(f,this.m,N)),qa(this.h,k),this.Ua&&Me(f,"TYPE","init"),this.P?(Me(f,"$req",u),Me(f,"SID","null"),k.T=!0,Fa(k,f,null)):Fa(k,f,u),this.G=2}}else this.G==3&&(a?eh(this,a):this.i.length==0||Vu(this.h)||eh(this))};function eh(a,u){var f;u?f=u.l:f=a.U++;const _=gn(a.I);Me(_,"SID",a.K),Me(_,"RID",f),Me(_,"AID",a.T),Vs(a,_),a.m&&a.o&&Ha(_,a.m,a.o),f=new Un(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),u&&(a.i=u.D.concat(a.i)),u=th(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),qa(a.h,f),Fa(f,_,u)}function Vs(a,u){a.H&&le(a.H,function(f,_){Me(u,_,f)}),a.l&&Fu({},function(f,_){Me(u,_,f)})}function th(a,u,f){f=Math.min(a.i.length,f);var _=a.l?g(a.l.Na,a.l,a):null;e:{var k=a.i;let N=-1;for(;;){const z=["count="+f];N==-1?0<f?(N=k[0].g,z.push("ofs="+N)):N=0:z.push("ofs="+N);let Oe=!0;for(let nt=0;nt<f;nt++){let be=k[nt].g;const ct=k[nt].map;if(be-=N,0>be)N=Math.max(0,k[nt].g-100),Oe=!1;else try{k_(ct,z,"req"+be+"_")}catch{_&&_(ct)}}if(Oe){_=z.join("&");break e}}}return a=a.i.splice(0,f),u.D=a,_}function nh(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;Te||Ht(),ye||(Te(),ye=!0),kt.add(u,a),a.v=0}}function Ga(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Rs(g(a.Fa,a),ih(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,rh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Rs(g(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Tt(10),Yi(this),rh(this))};function Ka(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function rh(a){a.g=new Un(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=gn(a.qa);Me(u,"RID","rpc"),Me(u,"SID",a.K),Me(u,"AID",a.T),Me(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&Me(u,"TO",a.ja),Me(u,"TYPE","xmlhttp"),Vs(a,u),a.m&&a.o&&Ha(u,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=Ki(gn(u)),f.m=null,f.P=!0,Du(f,a)}t.Za=function(){this.C!=null&&(this.C=null,Yi(this),Ga(this),Tt(19))};function Xi(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function sh(a,u){var f=null;if(a.g==u){Xi(a),Ka(a),a.g=null;var _=2}else if(ja(a.h,u))f=u.D,Lu(a.h,u),_=1;else return;if(a.G!=0){if(u.o)if(_==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var k=a.B;_=Bi(),_e(_,new bu(_,f)),Ji(a)}else nh(a);else if(k=u.s,k==3||k==0&&0<u.X||!(_==1&&x_(a,u)||_==2&&Ga(a)))switch(f&&0<f.length&&(u=a.h,u.i=u.i.concat(f)),k){case 1:fr(a,5);break;case 4:fr(a,10);break;case 3:fr(a,6);break;default:fr(a,2)}}}function ih(a,u){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*u}function fr(a,u){if(a.j.info("Error code "+u),u==2){var f=g(a.fb,a),_=a.Xa;const k=!_;_=new dr(_||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||$i(_,"https"),Ki(_),k?S_(_.toString(),f):C_(_.toString(),f)}else Tt(2);a.G=0,a.l&&a.l.sa(u),oh(a),Zu(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Tt(2)):(this.j.info("Failed to ping google.com"),Tt(1))};function oh(a){if(a.G=0,a.ka=[],a.l){const u=Mu(a.h);(u.length!=0||a.i.length!=0)&&(O(a.ka,u),O(a.ka,a.i),a.h.i.length=0,C(a.i),a.i.length=0),a.l.ra()}}function ah(a,u,f){var _=f instanceof dr?gn(f):new dr(f);if(_.g!="")u&&(_.g=u+"."+_.g),Gi(_,_.s);else{var k=l.location;_=k.protocol,u=u?u+"."+k.hostname:k.hostname,k=+k.port;var N=new dr(null);_&&$i(N,_),u&&(N.g=u),k&&Gi(N,k),f&&(N.l=f),_=N}return f=a.D,u=a.ya,f&&u&&Me(_,f,u),Me(_,"VER",a.la),Vs(a,_),_}function lh(a,u,f){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new He(new zi({eb:f})):new He(a.pa),u.Ha(a.J),u}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function ch(){}t=ch.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Zi(){}Zi.prototype.g=function(a,u){return new Nt(a,u)};function Nt(a,u){ae.call(this),this.g=new Xu(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!q(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!q(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new Fr(this)}P(Nt,ae),Nt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Nt.prototype.close=function(){$a(this.g)},Nt.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=tt(a),a=f);u.i.push(new y_(u.Ya++,a)),u.G==3&&Ji(u)},Nt.prototype.N=function(){this.g.l=null,delete this.j,$a(this.g),delete this.g,Nt.aa.N.call(this)};function uh(a){Va.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const f in u){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}P(uh,Va);function hh(){xa.call(this),this.status=1}P(hh,xa);function Fr(a){this.g=a}P(Fr,ch),Fr.prototype.ua=function(){_e(this.g,"a")},Fr.prototype.ta=function(a){_e(this.g,new uh(a))},Fr.prototype.sa=function(a){_e(this.g,new hh)},Fr.prototype.ra=function(){_e(this.g,"b")},Zi.prototype.createWebChannel=Zi.prototype.g,Nt.prototype.send=Nt.prototype.o,Nt.prototype.open=Nt.prototype.m,Nt.prototype.close=Nt.prototype.close,fm=function(){return new Zi},dm=function(){return Bi()},hm=ur,Bl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ji.NO_ERROR=0,ji.TIMEOUT=8,ji.HTTP_ERROR=6,mo=ji,Pu.COMPLETE="complete",um=Pu,Tu.EventType=ws,ws.OPEN="a",ws.CLOSE="b",ws.ERROR="c",ws.MESSAGE="d",ae.prototype.listen=ae.prototype.K,Hs=Tu,He.prototype.listenOnce=He.prototype.L,He.prototype.getLastError=He.prototype.Ka,He.prototype.getLastErrorCode=He.prototype.Ba,He.prototype.getStatus=He.prototype.Z,He.prototype.getResponseJson=He.prototype.Oa,He.prototype.getResponseText=He.prototype.oa,He.prototype.send=He.prototype.ea,He.prototype.setWithCredentials=He.prototype.Ha,cm=He}).apply(typeof so<"u"?so:typeof self<"u"?self:typeof window<"u"?window:{});const yd="@firebase/firestore";/**
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
 */const Pr=new bc("@firebase/firestore");function Fs(){return Pr.logLevel}function ee(t,...e){if(Pr.logLevel<=Ie.DEBUG){const n=e.map(Cc);Pr.debug(`Firestore (${gs}): ${t}`,...n)}}function Nn(t,...e){if(Pr.logLevel<=Ie.ERROR){const n=e.map(Cc);Pr.error(`Firestore (${gs}): ${t}`,...n)}}function as(t,...e){if(Pr.logLevel<=Ie.WARN){const n=e.map(Cc);Pr.warn(`Firestore (${gs}): ${t}`,...n)}}function Cc(t){if(typeof t=="string")return t;try{/**
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
 */function fe(t="Unexpected state"){const e=`FIRESTORE (${gs}) INTERNAL ASSERTION FAILED: `+t;throw Nn(e),new Error(e)}function ke(t,e){t||fe()}function me(t,e){return t}/**
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
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class X extends pn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class pm{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class HT{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ft.UNAUTHENTICATED))}shutdown(){}}class $T{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class GT{constructor(e){this.t=e,this.currentUser=ft.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){ke(this.o===void 0);let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new Sn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Sn,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},l=c=>{ee("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(ee("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Sn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(ee("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ke(typeof r.accessToken=="string"),new pm(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ke(e===null||typeof e=="string"),new ft(e)}}class KT{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=ft.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class zT{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new KT(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(ft.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class WT{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class QT{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){ke(this.o===void 0);const r=i=>{i.error!=null&&ee("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,ee("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{ee("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):ee("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(ke(typeof n.token=="string"),this.R=n.token,new WT(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function YT(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */class mm{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=YT(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function Pe(t,e){return t<e?-1:t>e?1:0}function ls(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
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
 */class Je{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new X(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new X(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new X(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new X(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Je.fromMillis(Date.now())}static fromDate(e){return Je.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Je(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?Pe(this.nanoseconds,e.nanoseconds):Pe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class mi{constructor(e,n,r){n===void 0?n=0:n>e.length&&fe(),r===void 0?r=e.length-n:r>e.length-n&&fe(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return mi.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof mi?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Fe extends mi{construct(e,n,r){return new Fe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new X(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Fe(n)}static emptyPath(){return new Fe([])}}const JT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class it extends mi{construct(e,n,r){return new it(e,n,r)}static isValidIdentifier(e){return JT.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),it.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new it(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new X(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new X(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new X(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new X(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new it(n)}static emptyPath(){return new it([])}}/**
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
 */class ie{constructor(e){this.path=e}static fromPath(e){return new ie(Fe.fromString(e))}static fromName(e){return new ie(Fe.fromString(e).popFirst(5))}static empty(){return new ie(Fe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Fe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Fe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ie(new Fe(e.slice()))}}function XT(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=pe.fromTimestamp(r===1e9?new Je(n+1,0):new Je(n,r));return new or(s,ie.empty(),e)}function ZT(t){return new or(t.readTime,t.key,-1)}class or{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new or(pe.min(),ie.empty(),-1)}static max(){return new or(pe.max(),ie.empty(),-1)}}function ew(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=ie.comparator(t.documentKey,e.documentKey),n!==0?n:Pe(t.largestBatchId,e.largestBatchId))}/**
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
 */const tw="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class nw{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Si(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==tw)throw t;ee("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class U{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&fe(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new U((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof U?n:U.resolve(n)}catch(n){return U.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):U.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):U.reject(n)}static resolve(e){return new U((n,r)=>{n(e)})}static reject(e){return new U((n,r)=>{r(e)})}static waitFor(e){return new U((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},c=>r(c))}),o=!0,i===s&&n()})}static or(e){let n=U.resolve(!1);for(const r of e)n=n.next(s=>s?U.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new U((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let c=0;c<i;c++){const h=c;n(e[h]).next(d=>{o[h]=d,++l,l===i&&r(o)},d=>s(d))}})}static doWhile(e,n){return new U((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function rw(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Ci(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class Dc{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Dc.oe=-1;function ma(t){return t==null}function Fo(t){return t===0&&1/t==-1/0}function sw(t){return typeof t=="number"&&Number.isInteger(t)&&!Fo(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */function vd(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Vr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function gm(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class qe{constructor(e,n){this.comparator=e,this.root=n||rt.EMPTY}insert(e,n){return new qe(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,rt.BLACK,null,null))}remove(e){return new qe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,rt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new io(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new io(this.root,e,this.comparator,!1)}getReverseIterator(){return new io(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new io(this.root,e,this.comparator,!0)}}class io{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class rt{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??rt.RED,this.left=s??rt.EMPTY,this.right=i??rt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new rt(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return rt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return rt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,rt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,rt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw fe();const e=this.left.check();if(e!==this.right.check())throw fe();return e+(this.isRed()?0:1)}}rt.EMPTY=null,rt.RED=!0,rt.BLACK=!1;rt.EMPTY=new class{constructor(){this.size=0}get key(){throw fe()}get value(){throw fe()}get color(){throw fe()}get left(){throw fe()}get right(){throw fe()}copy(e,n,r,s,i){return this}insert(e,n,r){return new rt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ot{constructor(e){this.comparator=e,this.data=new qe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Ed(this.data.getIterator())}getIteratorFrom(e){return new Ed(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof ot)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ot(this.comparator);return n.data=e,n}}class Ed{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Lt{constructor(e){this.fields=e,e.sort(it.comparator)}static empty(){return new Lt([])}unionWith(e){let n=new ot(it.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Lt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ls(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
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
 */class _m extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class at{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new _m("Invalid base64 string: "+i):i}}(e);return new at(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new at(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Pe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}at.EMPTY_BYTE_STRING=new at("");const iw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ar(t){if(ke(!!t),typeof t=="string"){let e=0;const n=iw.exec(t);if(ke(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ge(t.seconds),nanos:Ge(t.nanos)}}function Ge(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Sr(t){return typeof t=="string"?at.fromBase64String(t):at.fromUint8Array(t)}/**
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
 */function kc(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Nc(t){const e=t.mapValue.fields.__previous_value__;return kc(e)?Nc(e):e}function gi(t){const e=ar(t.mapValue.fields.__local_write_time__.timestampValue);return new Je(e.seconds,e.nanos)}/**
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
 */class ow{constructor(e,n,r,s,i,o,l,c,h){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h}}class _i{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new _i("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof _i&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const oo={mapValue:{}};function Cr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?kc(t)?4:lw(t)?9007199254740991:aw(t)?10:11:fe()}function hn(t,e){if(t===e)return!0;const n=Cr(t);if(n!==Cr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return gi(t).isEqual(gi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=ar(s.timestampValue),l=ar(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return Sr(s.bytesValue).isEqual(Sr(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Ge(s.geoPointValue.latitude)===Ge(i.geoPointValue.latitude)&&Ge(s.geoPointValue.longitude)===Ge(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ge(s.integerValue)===Ge(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Ge(s.doubleValue),l=Ge(i.doubleValue);return o===l?Fo(o)===Fo(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return ls(t.arrayValue.values||[],e.arrayValue.values||[],hn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(vd(o)!==vd(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!hn(o[c],l[c])))return!1;return!0}(t,e);default:return fe()}}function yi(t,e){return(t.values||[]).find(n=>hn(n,e))!==void 0}function cs(t,e){if(t===e)return 0;const n=Cr(t),r=Cr(e);if(n!==r)return Pe(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Pe(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=Ge(i.integerValue||i.doubleValue),c=Ge(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(t,e);case 3:return Id(t.timestampValue,e.timestampValue);case 4:return Id(gi(t),gi(e));case 5:return Pe(t.stringValue,e.stringValue);case 6:return function(i,o){const l=Sr(i),c=Sr(o);return l.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),c=o.split("/");for(let h=0;h<l.length&&h<c.length;h++){const d=Pe(l[h],c[h]);if(d!==0)return d}return Pe(l.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=Pe(Ge(i.latitude),Ge(o.latitude));return l!==0?l:Pe(Ge(i.longitude),Ge(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Td(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,c,h,d;const p=i.fields||{},g=o.fields||{},m=(l=p.value)===null||l===void 0?void 0:l.arrayValue,P=(c=g.value)===null||c===void 0?void 0:c.arrayValue,C=Pe(((h=m==null?void 0:m.values)===null||h===void 0?void 0:h.length)||0,((d=P==null?void 0:P.values)===null||d===void 0?void 0:d.length)||0);return C!==0?C:Td(m,P)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===oo.mapValue&&o===oo.mapValue)return 0;if(i===oo.mapValue)return 1;if(o===oo.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),h=o.fields||{},d=Object.keys(h);c.sort(),d.sort();for(let p=0;p<c.length&&p<d.length;++p){const g=Pe(c[p],d[p]);if(g!==0)return g;const m=cs(l[c[p]],h[d[p]]);if(m!==0)return m}return Pe(c.length,d.length)}(t.mapValue,e.mapValue);default:throw fe()}}function Id(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return Pe(t,e);const n=ar(t),r=ar(e),s=Pe(n.seconds,r.seconds);return s!==0?s:Pe(n.nanos,r.nanos)}function Td(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=cs(n[s],r[s]);if(i)return i}return Pe(n.length,r.length)}function us(t){return jl(t)}function jl(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=ar(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Sr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return ie.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=jl(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${jl(n.fields[o])}`;return s+"}"}(t.mapValue):fe()}function wd(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function ql(t){return!!t&&"integerValue"in t}function Oc(t){return!!t&&"arrayValue"in t}function Ad(t){return!!t&&"nullValue"in t}function Rd(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function go(t){return!!t&&"mapValue"in t}function aw(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function ni(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Vr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=ni(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ni(t.arrayValue.values[n]);return e}return Object.assign({},t)}function lw(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class Dt{constructor(e){this.value=e}static empty(){return new Dt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!go(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ni(n)}setAll(e){let n=it.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=ni(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());go(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return hn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];go(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Vr(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Dt(ni(this.value))}}function ym(t){const e=[];return Vr(t.fields,(n,r)=>{const s=new it([n]);if(go(r)){const i=ym(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Lt(e)}/**
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
 */class mt{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new mt(e,0,pe.min(),pe.min(),pe.min(),Dt.empty(),0)}static newFoundDocument(e,n,r,s){return new mt(e,1,n,pe.min(),r,s,0)}static newNoDocument(e,n){return new mt(e,2,n,pe.min(),pe.min(),Dt.empty(),0)}static newUnknownDocument(e,n){return new mt(e,3,n,pe.min(),pe.min(),Dt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(pe.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Dt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Dt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=pe.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof mt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new mt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Uo{constructor(e,n){this.position=e,this.inclusive=n}}function bd(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=ie.comparator(ie.fromName(o.referenceValue),n.key):r=cs(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Pd(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!hn(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class Bo{constructor(e,n="asc"){this.field=e,this.dir=n}}function cw(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class vm{}class Qe extends vm{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new hw(e,n,r):n==="array-contains"?new pw(e,r):n==="in"?new mw(e,r):n==="not-in"?new gw(e,r):n==="array-contains-any"?new _w(e,r):new Qe(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new dw(e,r):new fw(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(cs(n,this.value)):n!==null&&Cr(this.value)===Cr(n)&&this.matchesComparison(cs(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return fe()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Jt extends vm{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new Jt(e,n)}matches(e){return Em(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Em(t){return t.op==="and"}function Im(t){return uw(t)&&Em(t)}function uw(t){for(const e of t.filters)if(e instanceof Jt)return!1;return!0}function Hl(t){if(t instanceof Qe)return t.field.canonicalString()+t.op.toString()+us(t.value);if(Im(t))return t.filters.map(e=>Hl(e)).join(",");{const e=t.filters.map(n=>Hl(n)).join(",");return`${t.op}(${e})`}}function Tm(t,e){return t instanceof Qe?function(r,s){return s instanceof Qe&&r.op===s.op&&r.field.isEqual(s.field)&&hn(r.value,s.value)}(t,e):t instanceof Jt?function(r,s){return s instanceof Jt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&Tm(o,s.filters[l]),!0):!1}(t,e):void fe()}function wm(t){return t instanceof Qe?function(n){return`${n.field.canonicalString()} ${n.op} ${us(n.value)}`}(t):t instanceof Jt?function(n){return n.op.toString()+" {"+n.getFilters().map(wm).join(" ,")+"}"}(t):"Filter"}class hw extends Qe{constructor(e,n,r){super(e,n,r),this.key=ie.fromName(r.referenceValue)}matches(e){const n=ie.comparator(e.key,this.key);return this.matchesComparison(n)}}class dw extends Qe{constructor(e,n){super(e,"in",n),this.keys=Am("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class fw extends Qe{constructor(e,n){super(e,"not-in",n),this.keys=Am("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Am(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>ie.fromName(r.referenceValue))}class pw extends Qe{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Oc(n)&&yi(n.arrayValue,this.value)}}class mw extends Qe{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&yi(this.value.arrayValue,n)}}class gw extends Qe{constructor(e,n){super(e,"not-in",n)}matches(e){if(yi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!yi(this.value.arrayValue,n)}}class _w extends Qe{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Oc(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>yi(this.value.arrayValue,r))}}/**
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
 */class yw{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function Sd(t,e=null,n=[],r=[],s=null,i=null,o=null){return new yw(t,e,n,r,s,i,o)}function Vc(t){const e=me(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Hl(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),ma(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>us(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>us(r)).join(",")),e.ue=n}return e.ue}function xc(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!cw(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Tm(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Pd(t.startAt,e.startAt)&&Pd(t.endAt,e.endAt)}function $l(t){return ie.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class Di{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function vw(t,e,n,r,s,i,o,l){return new Di(t,e,n,r,s,i,o,l)}function Lc(t){return new Di(t)}function Cd(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function Rm(t){return t.collectionGroup!==null}function ri(t){const e=me(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new ot(it.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Bo(i,r))}),n.has(it.keyField().canonicalString())||e.ce.push(new Bo(it.keyField(),r))}return e.ce}function sn(t){const e=me(t);return e.le||(e.le=Ew(e,ri(t))),e.le}function Ew(t,e){if(t.limitType==="F")return Sd(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Bo(s.field,i)});const n=t.endAt?new Uo(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Uo(t.startAt.position,t.startAt.inclusive):null;return Sd(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Gl(t,e){const n=t.filters.concat([e]);return new Di(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Kl(t,e,n){return new Di(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ga(t,e){return xc(sn(t),sn(e))&&t.limitType===e.limitType}function bm(t){return`${Vc(sn(t))}|lt:${t.limitType}`}function Hr(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>wm(s)).join(", ")}]`),ma(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>us(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>us(s)).join(",")),`Target(${r})`}(sn(t))}; limitType=${t.limitType})`}function _a(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):ie.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of ri(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,c){const h=bd(o,l,c);return o.inclusive?h<=0:h<0}(r.startAt,ri(r),s)||r.endAt&&!function(o,l,c){const h=bd(o,l,c);return o.inclusive?h>=0:h>0}(r.endAt,ri(r),s))}(t,e)}function Iw(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Pm(t){return(e,n)=>{let r=!1;for(const s of ri(t)){const i=Tw(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Tw(t,e,n){const r=t.field.isKeyField()?ie.comparator(e.key,n.key):function(i,o,l){const c=o.data.field(i),h=l.data.field(i);return c!==null&&h!==null?cs(c,h):fe()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return fe()}}/**
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
 */class _s{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Vr(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return gm(this.inner)}size(){return this.innerSize}}/**
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
 */const ww=new qe(ie.comparator);function On(){return ww}const Sm=new qe(ie.comparator);function $s(...t){let e=Sm;for(const n of t)e=e.insert(n.key,n);return e}function Cm(t){let e=Sm;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function vr(){return si()}function Dm(){return si()}function si(){return new _s(t=>t.toString(),(t,e)=>t.isEqual(e))}const Aw=new qe(ie.comparator),Rw=new ot(ie.comparator);function ve(...t){let e=Rw;for(const n of t)e=e.add(n);return e}const bw=new ot(Pe);function Pw(){return bw}/**
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
 */function Mc(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Fo(e)?"-0":e}}function km(t){return{integerValue:""+t}}function Sw(t,e){return sw(e)?km(e):Mc(t,e)}/**
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
 */class ya{constructor(){this._=void 0}}function Cw(t,e,n){return t instanceof vi?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&kc(i)&&(i=Nc(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof Ei?Om(t,e):t instanceof Ii?Vm(t,e):function(s,i){const o=Nm(s,i),l=Dd(o)+Dd(s.Pe);return ql(o)&&ql(s.Pe)?km(l):Mc(s.serializer,l)}(t,e)}function Dw(t,e,n){return t instanceof Ei?Om(t,e):t instanceof Ii?Vm(t,e):n}function Nm(t,e){return t instanceof jo?function(r){return ql(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class vi extends ya{}class Ei extends ya{constructor(e){super(),this.elements=e}}function Om(t,e){const n=xm(e);for(const r of t.elements)n.some(s=>hn(s,r))||n.push(r);return{arrayValue:{values:n}}}class Ii extends ya{constructor(e){super(),this.elements=e}}function Vm(t,e){let n=xm(e);for(const r of t.elements)n=n.filter(s=>!hn(s,r));return{arrayValue:{values:n}}}class jo extends ya{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function Dd(t){return Ge(t.integerValue||t.doubleValue)}function xm(t){return Oc(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
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
 */class kw{constructor(e,n){this.field=e,this.transform=n}}function Nw(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof Ei&&s instanceof Ei||r instanceof Ii&&s instanceof Ii?ls(r.elements,s.elements,hn):r instanceof jo&&s instanceof jo?hn(r.Pe,s.Pe):r instanceof vi&&s instanceof vi}(t.transform,e.transform)}class Ow{constructor(e,n){this.version=e,this.transformResults=n}}class Qt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Qt}static exists(e){return new Qt(void 0,e)}static updateTime(e){return new Qt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function _o(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class va{}function Lm(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Fm(t.key,Qt.none()):new ki(t.key,t.data,Qt.none());{const n=t.data,r=Dt.empty();let s=new ot(it.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new cr(t.key,r,new Lt(s.toArray()),Qt.none())}}function Vw(t,e,n){t instanceof ki?function(s,i,o){const l=s.value.clone(),c=Nd(s.fieldTransforms,i,o.transformResults);l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof cr?function(s,i,o){if(!_o(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=Nd(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(Mm(s)),c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function ii(t,e,n,r){return t instanceof ki?function(i,o,l,c){if(!_o(i.precondition,o))return l;const h=i.value.clone(),d=Od(i.fieldTransforms,c,o);return h.setAll(d),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof cr?function(i,o,l,c){if(!_o(i.precondition,o))return l;const h=Od(i.fieldTransforms,c,o),d=o.data;return d.setAll(Mm(i)),d.setAll(h),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(i,o,l){return _o(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function xw(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=Nm(r.transform,s||null);i!=null&&(n===null&&(n=Dt.empty()),n.set(r.field,i))}return n||null}function kd(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ls(r,s,(i,o)=>Nw(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class ki extends va{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class cr extends va{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Mm(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Nd(t,e,n){const r=new Map;ke(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,Dw(o,l,n[s]))}return r}function Od(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,Cw(i,o,e))}return r}class Fm extends va{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Lw extends va{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Mw{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Vw(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=ii(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=ii(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Dm();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const c=Lm(o,l);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(pe.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ve())}isEqual(e){return this.batchId===e.batchId&&ls(this.mutations,e.mutations,(n,r)=>kd(n,r))&&ls(this.baseMutations,e.baseMutations,(n,r)=>kd(n,r))}}class Fc{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){ke(e.mutations.length===r.length);let s=function(){return Aw}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Fc(e,n,r,s)}}/**
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
 */class Fw{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Uw{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var ze,Ae;function Bw(t){switch(t){default:return fe();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function Um(t){if(t===void 0)return Nn("GRPC error has no .code"),M.UNKNOWN;switch(t){case ze.OK:return M.OK;case ze.CANCELLED:return M.CANCELLED;case ze.UNKNOWN:return M.UNKNOWN;case ze.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case ze.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case ze.INTERNAL:return M.INTERNAL;case ze.UNAVAILABLE:return M.UNAVAILABLE;case ze.UNAUTHENTICATED:return M.UNAUTHENTICATED;case ze.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case ze.NOT_FOUND:return M.NOT_FOUND;case ze.ALREADY_EXISTS:return M.ALREADY_EXISTS;case ze.PERMISSION_DENIED:return M.PERMISSION_DENIED;case ze.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case ze.ABORTED:return M.ABORTED;case ze.OUT_OF_RANGE:return M.OUT_OF_RANGE;case ze.UNIMPLEMENTED:return M.UNIMPLEMENTED;case ze.DATA_LOSS:return M.DATA_LOSS;default:return fe()}}(Ae=ze||(ze={}))[Ae.OK=0]="OK",Ae[Ae.CANCELLED=1]="CANCELLED",Ae[Ae.UNKNOWN=2]="UNKNOWN",Ae[Ae.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ae[Ae.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ae[Ae.NOT_FOUND=5]="NOT_FOUND",Ae[Ae.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ae[Ae.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ae[Ae.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ae[Ae.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ae[Ae.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ae[Ae.ABORTED=10]="ABORTED",Ae[Ae.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ae[Ae.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ae[Ae.INTERNAL=13]="INTERNAL",Ae[Ae.UNAVAILABLE=14]="UNAVAILABLE",Ae[Ae.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function jw(){return new TextEncoder}/**
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
 */const qw=new wr([4294967295,4294967295],0);function Vd(t){const e=jw().encode(t),n=new lm;return n.update(e),new Uint8Array(n.digest())}function xd(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new wr([n,r],0),new wr([s,i],0)]}class Uc{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Gs(`Invalid padding: ${n}`);if(r<0)throw new Gs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Gs(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Gs(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=wr.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(wr.fromNumber(r)));return s.compare(qw)===1&&(s=new wr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=Vd(e),[r,s]=xd(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Uc(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=Vd(e),[r,s]=xd(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Gs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ea{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Ni.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Ea(pe.min(),s,new qe(Pe),On(),ve())}}class Ni{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Ni(r,n,ve(),ve(),ve())}}/**
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
 */class yo{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class Bm{constructor(e,n){this.targetId=e,this.me=n}}class jm{constructor(e,n,r=at.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class Ld{constructor(){this.fe=0,this.ge=Fd(),this.pe=at.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=ve(),n=ve(),r=ve();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:fe()}}),new Ni(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=Fd()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,ke(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Hw{constructor(e){this.Le=e,this.Be=new Map,this.ke=On(),this.qe=Md(),this.Qe=new qe(Pe)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:fe()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if($l(i))if(r===0){const o=new ie(i.path);this.Ue(n,o,mt.newNoDocument(o,pe.min()))}else ke(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),c=l?this.Xe(l,e,o):1;if(c!==0){this.je(n);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,h)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=Sr(r).toUint8Array()}catch(c){if(c instanceof _m)return as("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Uc(o,s,i)}catch(c){return as(c instanceof Gs?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&$l(l.target)){const c=new ie(l.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,mt.newNoDocument(c,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=ve();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(c=>{const h=this.Je(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new Ea(e,n,this.Qe,this.ke,r);return this.ke=On(),this.qe=Md(),this.Qe=new qe(Pe),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new Ld,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new ot(Pe),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||ee("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Ld),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function Md(){return new qe(ie.comparator)}function Fd(){return new qe(ie.comparator)}const $w={asc:"ASCENDING",desc:"DESCENDING"},Gw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Kw={and:"AND",or:"OR"};class zw{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function zl(t,e){return t.useProto3Json||ma(e)?e:{value:e}}function qo(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function qm(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Ww(t,e){return qo(t,e.toTimestamp())}function on(t){return ke(!!t),pe.fromTimestamp(function(n){const r=ar(n);return new Je(r.seconds,r.nanos)}(t))}function Bc(t,e){return Wl(t,e).canonicalString()}function Wl(t,e){const n=function(s){return new Fe(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Hm(t){const e=Fe.fromString(t);return ke(Wm(e)),e}function Ql(t,e){return Bc(t.databaseId,e.path)}function dl(t,e){const n=Hm(e);if(n.get(1)!==t.databaseId.projectId)throw new X(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new X(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new ie(Gm(n))}function $m(t,e){return Bc(t.databaseId,e)}function Qw(t){const e=Hm(t);return e.length===4?Fe.emptyPath():Gm(e)}function Yl(t){return new Fe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Gm(t){return ke(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Ud(t,e,n){return{name:Ql(t,e),fields:n.value.mapValue.fields}}function Yw(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:fe()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,d){return h.useProto3Json?(ke(d===void 0||typeof d=="string"),at.fromBase64String(d||"")):(ke(d===void 0||d instanceof Buffer||d instanceof Uint8Array),at.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const d=h.code===void 0?M.UNKNOWN:Um(h.code);return new X(d,h.message||"")}(o);n=new jm(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=dl(t,r.document.name),i=on(r.document.updateTime),o=r.document.createTime?on(r.document.createTime):pe.min(),l=new Dt({mapValue:{fields:r.document.fields}}),c=mt.newFoundDocument(s,i,o,l),h=r.targetIds||[],d=r.removedTargetIds||[];n=new yo(h,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=dl(t,r.document),i=r.readTime?on(r.readTime):pe.min(),o=mt.newNoDocument(s,i),l=r.removedTargetIds||[];n=new yo([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=dl(t,r.document),i=r.removedTargetIds||[];n=new yo([],i,s,null)}else{if(!("filter"in e))return fe();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Uw(s,i),l=r.targetId;n=new Bm(l,o)}}return n}function Jw(t,e){let n;if(e instanceof ki)n={update:Ud(t,e.key,e.value)};else if(e instanceof Fm)n={delete:Ql(t,e.key)};else if(e instanceof cr)n={update:Ud(t,e.key,e.data),updateMask:oA(e.fieldMask)};else{if(!(e instanceof Lw))return fe();n={verify:Ql(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof vi)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ei)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ii)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof jo)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw fe()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:Ww(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:fe()}(t,e.precondition)),n}function Xw(t,e){return t&&t.length>0?(ke(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?on(s.updateTime):on(i);return o.isEqual(pe.min())&&(o=on(i)),new Ow(o,s.transformResults||[])}(n,e))):[]}function Zw(t,e){return{documents:[$m(t,e.path)]}}function eA(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=$m(t,s);const i=function(h){if(h.length!==0)return zm(Jt.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(d=>function(g){return{field:$r(g.field),direction:rA(g.dir)}}(d))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=zl(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:n,parent:s}}function tA(t){let e=Qw(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){ke(r===1);const d=n.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=function(p){const g=Km(p);return g instanceof Jt&&Im(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(g=>function(P){return new Bo(Gr(P.field),function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(P.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(p){let g;return g=typeof p=="object"?p.value:p,ma(g)?null:g}(n.limit));let c=null;n.startAt&&(c=function(p){const g=!!p.before,m=p.values||[];return new Uo(m,g)}(n.startAt));let h=null;return n.endAt&&(h=function(p){const g=!p.before,m=p.values||[];return new Uo(m,g)}(n.endAt)),vw(e,s,o,i,l,"F",c,h)}function nA(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return fe()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Km(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Gr(n.unaryFilter.field);return Qe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Gr(n.unaryFilter.field);return Qe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Gr(n.unaryFilter.field);return Qe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Gr(n.unaryFilter.field);return Qe.create(o,"!=",{nullValue:"NULL_VALUE"});default:return fe()}}(t):t.fieldFilter!==void 0?function(n){return Qe.create(Gr(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return fe()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return Jt.create(n.compositeFilter.filters.map(r=>Km(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return fe()}}(n.compositeFilter.op))}(t):fe()}function rA(t){return $w[t]}function sA(t){return Gw[t]}function iA(t){return Kw[t]}function $r(t){return{fieldPath:t.canonicalString()}}function Gr(t){return it.fromServerFormat(t.fieldPath)}function zm(t){return t instanceof Qe?function(n){if(n.op==="=="){if(Rd(n.value))return{unaryFilter:{field:$r(n.field),op:"IS_NAN"}};if(Ad(n.value))return{unaryFilter:{field:$r(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(Rd(n.value))return{unaryFilter:{field:$r(n.field),op:"IS_NOT_NAN"}};if(Ad(n.value))return{unaryFilter:{field:$r(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:$r(n.field),op:sA(n.op),value:n.value}}}(t):t instanceof Jt?function(n){const r=n.getFilters().map(s=>zm(s));return r.length===1?r[0]:{compositeFilter:{op:iA(n.op),filters:r}}}(t):fe()}function oA(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Wm(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class aA{constructor(e){this.ct=e}}function lA(t){const e=tA({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Kl(e,e.limit,"L"):e}/**
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
 */class cA{constructor(){this.un=new uA}addToCollectionParentIndex(e,n){return this.un.add(n),U.resolve()}getCollectionParents(e,n){return U.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return U.resolve()}deleteFieldIndex(e,n){return U.resolve()}deleteAllFieldIndexes(e){return U.resolve()}createTargetIndexes(e,n){return U.resolve()}getDocumentsMatchingTarget(e,n){return U.resolve(null)}getIndexType(e,n){return U.resolve(0)}getFieldIndexes(e,n){return U.resolve([])}getNextCollectionGroupToUpdate(e){return U.resolve(null)}getMinOffset(e,n){return U.resolve(or.min())}getMinOffsetFromCollectionGroup(e,n){return U.resolve(or.min())}updateCollectionGroup(e,n,r){return U.resolve()}updateIndexEntries(e,n){return U.resolve()}}class uA{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new ot(Fe.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ot(Fe.comparator)).toArray()}}/**
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
 */class hs{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new hs(0)}static kn(){return new hs(-1)}}/**
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
 */class hA{constructor(){this.changes=new _s(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,mt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?U.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class dA{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class fA{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&ii(r.mutation,s,Lt.empty(),Je.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,ve()).next(()=>r))}getLocalViewOfDocuments(e,n,r=ve()){const s=vr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=$s();return i.forEach((l,c)=>{o=o.insert(l,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=vr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,ve()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=On();const o=si(),l=function(){return si()}();return n.forEach((c,h)=>{const d=r.get(h.key);s.has(h.key)&&(d===void 0||d.mutation instanceof cr)?i=i.insert(h.key,h):d!==void 0?(o.set(h.key,d.mutation.getFieldMask()),ii(d.mutation,h,d.mutation.getFieldMask(),Je.now())):o.set(h.key,Lt.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((h,d)=>o.set(h,d)),n.forEach((h,d)=>{var p;return l.set(h,new dA(d,(p=o.get(h))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,n){const r=si();let s=new qe((o,l)=>o-l),i=ve();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(c=>{const h=n.get(c);if(h===null)return;let d=r.get(c)||Lt.empty();d=l.applyToLocalView(h,d),r.set(c,d);const p=(s.get(l.batchId)||ve()).add(c);s=s.insert(l.batchId,p)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,d=c.value,p=Dm();d.forEach(g=>{if(!i.has(g)){const m=Lm(n.get(g),r.get(g));m!==null&&p.set(g,m),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return U.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return ie.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Rm(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):U.resolve(vr());let l=-1,c=i;return o.next(h=>U.forEach(h,(d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(d)?U.resolve():this.remoteDocumentCache.getEntry(e,d).next(g=>{c=c.insert(d,g)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,c,h,ve())).next(d=>({batchId:l,changes:Cm(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new ie(n)).next(r=>{let s=$s();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=$s();return this.indexManager.getCollectionParents(e,i).next(l=>U.forEach(l,c=>{const h=function(p,g){return new Di(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(d=>{d.forEach((p,g)=>{o=o.insert(p,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((c,h)=>{const d=h.getKey();o.get(d)===null&&(o=o.insert(d,mt.newInvalidDocument(d)))});let l=$s();return o.forEach((c,h)=>{const d=i.get(c);d!==void 0&&ii(d.mutation,h,Lt.empty(),Je.now()),_a(n,h)&&(l=l.insert(c,h))}),l})}}/**
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
 */class pA{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return U.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:on(s.createTime)}}(n)),U.resolve()}getNamedQuery(e,n){return U.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(s){return{name:s.name,query:lA(s.bundledQuery),readTime:on(s.readTime)}}(n)),U.resolve()}}/**
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
 */class mA{constructor(){this.overlays=new qe(ie.comparator),this.Ir=new Map}getOverlay(e,n){return U.resolve(this.overlays.get(n))}getOverlays(e,n){const r=vr();return U.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),U.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),U.resolve()}getOverlaysForCollection(e,n,r){const s=vr(),i=n.length+1,o=new ie(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return U.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new qe((h,d)=>h-d);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let d=i.get(h.largestBatchId);d===null&&(d=vr(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const l=vr(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,d)=>l.set(h,d)),!(l.size()>=s)););return U.resolve(l)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Fw(n,r));let i=this.Ir.get(n);i===void 0&&(i=ve(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
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
 */class gA{constructor(){this.sessionToken=at.EMPTY_BYTE_STRING}getSessionToken(e){return U.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,U.resolve()}}/**
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
 */class jc{constructor(){this.Tr=new ot(Xe.Er),this.dr=new ot(Xe.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new Xe(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new Xe(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new ie(new Fe([])),r=new Xe(n,e),s=new Xe(n,e+1),i=[];return this.dr.forEachInRange([r,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new ie(new Fe([])),r=new Xe(n,e),s=new Xe(n,e+1);let i=ve();return this.dr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Xe(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Xe{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return ie.comparator(e.key,n.key)||Pe(e.wr,n.wr)}static Ar(e,n){return Pe(e.wr,n.wr)||ie.comparator(e.key,n.key)}}/**
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
 */class _A{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new ot(Xe.Er)}checkEmpty(e){return U.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Mw(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.br=this.br.add(new Xe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return U.resolve(o)}lookupMutationBatch(e,n){return U.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return U.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return U.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return U.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Xe(n,0),s=new Xe(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],o=>{const l=this.Dr(o.wr);i.push(l)}),U.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new ot(Pe);return n.forEach(s=>{const i=new Xe(s,0),o=new Xe(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{r=r.add(l.wr)})}),U.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;ie.isDocumentKey(i)||(i=i.child(""));const o=new Xe(new ie(i),0);let l=new ot(Pe);return this.br.forEachWhile(c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(c.wr)),!0)},o),U.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){ke(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return U.forEach(n.mutations,s=>{const i=new Xe(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new Xe(n,0),s=this.br.firstAfterOrEqual(r);return U.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,U.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class yA{constructor(e){this.Mr=e,this.docs=function(){return new qe(ie.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return U.resolve(r?r.document.mutableCopy():mt.newInvalidDocument(n))}getEntries(e,n){let r=On();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():mt.newInvalidDocument(s))}),U.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=On();const o=n.path,l=new ie(o.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:d}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||ew(ZT(d),r)<=0||(s.has(d.key)||_a(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return U.resolve(i)}getAllFromCollectionGroup(e,n,r,s){fe()}Or(e,n){return U.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new vA(this)}getSize(e){return U.resolve(this.size)}}class vA extends hA{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),U.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
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
 */class EA{constructor(e){this.persistence=e,this.Nr=new _s(n=>Vc(n),xc),this.lastRemoteSnapshotVersion=pe.min(),this.highestTargetId=0,this.Lr=0,this.Br=new jc,this.targetCount=0,this.kr=hs.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),U.resolve()}getLastRemoteSnapshotVersion(e){return U.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return U.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),U.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),U.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new hs(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,U.resolve()}updateTargetData(e,n){return this.Kn(n),U.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,U.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),U.waitFor(i).next(()=>s)}getTargetCount(e){return U.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return U.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),U.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),U.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),U.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return U.resolve(r)}containsKey(e,n){return U.resolve(this.Br.containsKey(n))}}/**
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
 */class IA{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Dc(0),this.Kr=!1,this.Kr=!0,this.$r=new gA,this.referenceDelegate=e(this),this.Ur=new EA(this),this.indexManager=new cA,this.remoteDocumentCache=function(s){return new yA(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new aA(n),this.Gr=new pA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new mA,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new _A(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){ee("MemoryPersistence","Starting transaction:",e);const s=new TA(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return U.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class TA extends nw{constructor(e){super(),this.currentSequenceNumber=e}}class qc{constructor(e){this.persistence=e,this.Jr=new jc,this.Yr=null}static Zr(e){return new qc(e)}get Xr(){if(this.Yr)return this.Yr;throw fe()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),U.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),U.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),U.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return U.forEach(this.Xr,r=>{const s=ie.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,pe.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return U.or([()=>U.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
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
 */class Hc{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=ve(),s=ve();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Hc(e,n.fromCache,r,s)}}/**
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
 */class wA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class AA{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return bI()?8:rw(vt())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new wA;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(Fs()<=Ie.DEBUG&&ee("QueryEngine","SDK will not create cache indexes for query:",Hr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),U.resolve()):(Fs()<=Ie.DEBUG&&ee("QueryEngine","Query:",Hr(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Fs()<=Ie.DEBUG&&ee("QueryEngine","The SDK decides to create cache indexes for query:",Hr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,sn(n))):U.resolve())}Yi(e,n){if(Cd(n))return U.resolve(null);let r=sn(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Kl(n,null,"F"),r=sn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=ve(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(c=>{const h=this.ts(n,l);return this.ns(n,h,o,c.readTime)?this.Yi(e,Kl(n,null,"F")):this.rs(e,h,n,c)}))})))}Zi(e,n,r,s){return Cd(n)||s.isEqual(pe.min())?U.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const o=this.ts(n,i);return this.ns(n,o,r,s)?U.resolve(null):(Fs()<=Ie.DEBUG&&ee("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Hr(n)),this.rs(e,o,n,XT(s,-1)).next(l=>l))})}ts(e,n){let r=new ot(Pm(e));return n.forEach((s,i)=>{_a(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return Fs()<=Ie.DEBUG&&ee("QueryEngine","Using full collection scan to execute query:",Hr(n)),this.Ji.getDocumentsMatchingQuery(e,n,or.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */class RA{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new qe(Pe),this._s=new _s(i=>Vc(i),xc),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new fA(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function bA(t,e,n,r){return new RA(t,e,n,r)}async function Qm(t,e){const n=me(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let c=ve();for(const h of s){o.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}for(const h of i){l.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}return n.localDocuments.getDocuments(r,c).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:l}))})})}function PA(t,e){const n=me(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,c,h,d){const p=h.batch,g=p.keys();let m=U.resolve();return g.forEach(P=>{m=m.next(()=>d.getEntry(c,P)).next(C=>{const O=h.docVersions.get(P);ke(O!==null),C.version.compareTo(O)<0&&(p.applyToRemoteDocument(C,h),C.isValidDocument()&&(C.setReadTime(h.commitVersion),d.addEntry(C)))})}),m.next(()=>l.mutationQueue.removeMutationBatch(c,p))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let c=ve();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(c=c.add(l.batch.mutations[h].key));return c}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function Ym(t){const e=me(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function SA(t,e){const n=me(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];e.targetChanges.forEach((d,p)=>{const g=s.get(p);if(!g)return;l.push(n.Ur.removeMatchingKeys(i,d.removedDocuments,p).next(()=>n.Ur.addMatchingKeys(i,d.addedDocuments,p)));let m=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?m=m.withResumeToken(at.EMPTY_BYTE_STRING,pe.min()).withLastLimboFreeSnapshotVersion(pe.min()):d.resumeToken.approximateByteSize()>0&&(m=m.withResumeToken(d.resumeToken,r)),s=s.insert(p,m),function(C,O,$){return C.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-C.snapshotVersion.toMicroseconds()>=3e8?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0}(g,m,d)&&l.push(n.Ur.updateTargetData(i,m))});let c=On(),h=ve();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))}),l.push(CA(i,o,e.documentUpdates).next(d=>{c=d.Ps,h=d.Is})),!r.isEqual(pe.min())){const d=n.Ur.getLastRemoteSnapshotVersion(i).next(p=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(d)}return U.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,h)).next(()=>c)}).then(i=>(n.os=s,i))}function CA(t,e,n){let r=ve(),s=ve();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=On();return n.forEach((l,c)=>{const h=i.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(pe.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):ee("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)}),{Ps:o,Is:s}})}function DA(t,e){const n=me(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function kA(t,e){const n=me(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,U.resolve(s)):n.Ur.allocateTargetId(r).next(o=>(s=new Xn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Jl(t,e,n){const r=me(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Ci(o))throw o;ee("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function Bd(t,e,n){const r=me(t);let s=pe.min(),i=ve();return r.persistence.runTransaction("Execute query","readwrite",o=>function(c,h,d){const p=me(c),g=p._s.get(d);return g!==void 0?U.resolve(p.os.get(g)):p.Ur.getTargetData(h,d)}(r,o,sn(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(c=>{i=c})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?s:pe.min(),n?i:ve())).next(l=>(NA(r,Iw(e),l),{documents:l,Ts:i})))}function NA(t,e,n){let r=t.us.get(e)||pe.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class jd{constructor(){this.activeTargetIds=Pw()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class OA{constructor(){this.so=new jd,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new jd,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class VA{_o(e){}shutdown(){}}/**
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
 */class qd{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){ee("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){ee("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let ao=null;function fl(){return ao===null?ao=function(){return 268435456+Math.round(2147483648*Math.random())}():ao++,"0x"+ao.toString(16)}/**
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
 */const xA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class LA{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const ht="WebChannelConnection";class MA extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,o){const l=fl(),c=this.xo(n,r.toUriEncodedString());ee("RestConnection",`Sending RPC '${n}' ${l}:`,c,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,o),this.No(n,c,h,s).then(d=>(ee("RestConnection",`Received RPC '${n}' ${l}: `,d),d),d=>{throw as("RestConnection",`RPC '${n}' ${l} failed with error: `,d,"url: ",c,"request:",s),d})}Lo(n,r,s,i,o,l){return this.Mo(n,r,s,i,o)}Oo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+gs}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}xo(n,r){const s=xA[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=fl();return new Promise((o,l)=>{const c=new cm;c.setWithCredentials(!0),c.listenOnce(um.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case mo.NO_ERROR:const d=c.getResponseJson();ee(ht,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(d)),o(d);break;case mo.TIMEOUT:ee(ht,`RPC '${e}' ${i} timed out`),l(new X(M.DEADLINE_EXCEEDED,"Request time out"));break;case mo.HTTP_ERROR:const p=c.getStatus();if(ee(ht,`RPC '${e}' ${i} failed with status:`,p,"response text:",c.getResponseText()),p>0){let g=c.getResponseJson();Array.isArray(g)&&(g=g[0]);const m=g==null?void 0:g.error;if(m&&m.status&&m.message){const P=function(O){const $=O.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf($)>=0?$:M.UNKNOWN}(m.status);l(new X(P,m.message))}else l(new X(M.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new X(M.UNAVAILABLE,"Connection failed."));break;default:fe()}}finally{ee(ht,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);ee(ht,`RPC '${e}' ${i} sending request:`,s),c.send(n,"POST",h,r,15)})}Bo(e,n,r){const s=fl(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=fm(),l=dm(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const d=i.join("");ee(ht,`Creating RPC '${e}' stream ${s}: ${d}`,c);const p=o.createWebChannel(d,c);let g=!1,m=!1;const P=new LA({Io:O=>{m?ee(ht,`Not sending because RPC '${e}' stream ${s} is closed:`,O):(g||(ee(ht,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),ee(ht,`RPC '${e}' stream ${s} sending:`,O),p.send(O))},To:()=>p.close()}),C=(O,$,q)=>{O.listen($,H=>{try{q(H)}catch(j){setTimeout(()=>{throw j},0)}})};return C(p,Hs.EventType.OPEN,()=>{m||(ee(ht,`RPC '${e}' stream ${s} transport opened.`),P.yo())}),C(p,Hs.EventType.CLOSE,()=>{m||(m=!0,ee(ht,`RPC '${e}' stream ${s} transport closed`),P.So())}),C(p,Hs.EventType.ERROR,O=>{m||(m=!0,as(ht,`RPC '${e}' stream ${s} transport errored:`,O),P.So(new X(M.UNAVAILABLE,"The operation could not be completed")))}),C(p,Hs.EventType.MESSAGE,O=>{var $;if(!m){const q=O.data[0];ke(!!q);const H=q,j=H.error||(($=H[0])===null||$===void 0?void 0:$.error);if(j){ee(ht,`RPC '${e}' stream ${s} received error:`,j);const te=j.status;let le=function(w){const R=ze[w];if(R!==void 0)return Um(R)}(te),A=j.message;le===void 0&&(le=M.INTERNAL,A="Unknown error status: "+te+" with message "+j.message),m=!0,P.So(new X(le,A)),p.close()}else ee(ht,`RPC '${e}' stream ${s} received:`,q),P.bo(q)}}),C(l,hm.STAT_EVENT,O=>{O.stat===Bl.PROXY?ee(ht,`RPC '${e}' stream ${s} detected buffering proxy`):O.stat===Bl.NOPROXY&&ee(ht,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{P.wo()},0),P}}function pl(){return typeof document<"u"?document:null}/**
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
 */function Ia(t){return new zw(t,!0)}/**
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
 */class Jm{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&ee("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Xm{constructor(e,n,r,s,i,o,l,c){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Jm(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(Nn(n.toString()),Nn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new X(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return ee("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(ee("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class FA extends Xm{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=Yw(this.serializer,e),r=function(i){if(!("targetChange"in i))return pe.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?pe.min():o.readTime?on(o.readTime):pe.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Yl(this.serializer),n.addTarget=function(i,o){let l;const c=o.target;if(l=$l(c)?{documents:Zw(i,c)}:{query:eA(i,c)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=qm(i,o.resumeToken);const h=zl(i,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(pe.min())>0){l.readTime=qo(i,o.snapshotVersion.toTimestamp());const h=zl(i,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=nA(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Yl(this.serializer),n.removeTarget=e,this.a_(n)}}class UA extends Xm{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return ke(!!e.streamToken),this.lastStreamToken=e.streamToken,ke(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){ke(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=Xw(e.writeResults,e.commitTime),r=on(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Yl(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>Jw(this.serializer,r))};this.a_(n)}}/**
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
 */class BA extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new X(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,Wl(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new X(M.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,Wl(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new X(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class jA{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Nn(n),this.D_=!1):ee("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class qA{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{r.enqueueAndForget(async()=>{xr(this)&&(ee("RemoteStore","Restarting streams for network reachability change."),await async function(c){const h=me(c);h.L_.add(4),await Oi(h),h.q_.set("Unknown"),h.L_.delete(4),await Ta(h)}(this))})}),this.q_=new jA(r,s)}}async function Ta(t){if(xr(t))for(const e of t.B_)await e(!0)}async function Oi(t){for(const e of t.B_)await e(!1)}function Zm(t,e){const n=me(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),zc(n)?Kc(n):ys(n).r_()&&Gc(n,e))}function $c(t,e){const n=me(t),r=ys(n);n.N_.delete(e),r.r_()&&eg(n,e),n.N_.size===0&&(r.r_()?r.o_():xr(n)&&n.q_.set("Unknown"))}function Gc(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(pe.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}ys(t).A_(e)}function eg(t,e){t.Q_.xe(e),ys(t).R_(e)}function Kc(t){t.Q_=new Hw({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),ys(t).start(),t.q_.v_()}function zc(t){return xr(t)&&!ys(t).n_()&&t.N_.size>0}function xr(t){return me(t).L_.size===0}function tg(t){t.Q_=void 0}async function HA(t){t.q_.set("Online")}async function $A(t){t.N_.forEach((e,n)=>{Gc(t,e)})}async function GA(t,e){tg(t),zc(t)?(t.q_.M_(e),Kc(t)):t.q_.set("Unknown")}async function KA(t,e,n){if(t.q_.set("Online"),e instanceof jm&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.N_.delete(l),s.Q_.removeTarget(l))}(t,e)}catch(r){ee("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ho(t,r)}else if(e instanceof yo?t.Q_.Ke(e):e instanceof Bm?t.Q_.He(e):t.Q_.We(e),!n.isEqual(pe.min()))try{const r=await Ym(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.N_.get(h);d&&i.N_.set(h,d.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,h)=>{const d=i.N_.get(c);if(!d)return;i.N_.set(c,d.withResumeToken(at.EMPTY_BYTE_STRING,d.snapshotVersion)),eg(i,c);const p=new Xn(d.target,c,h,d.sequenceNumber);Gc(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){ee("RemoteStore","Failed to raise snapshot:",r),await Ho(t,r)}}async function Ho(t,e,n){if(!Ci(e))throw e;t.L_.add(1),await Oi(t),t.q_.set("Offline"),n||(n=()=>Ym(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{ee("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await Ta(t)})}function ng(t,e){return e().catch(n=>Ho(t,n,e))}async function wa(t){const e=me(t),n=lr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;zA(e);)try{const s=await DA(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,WA(e,s)}catch(s){await Ho(e,s)}rg(e)&&sg(e)}function zA(t){return xr(t)&&t.O_.length<10}function WA(t,e){t.O_.push(e);const n=lr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function rg(t){return xr(t)&&!lr(t).n_()&&t.O_.length>0}function sg(t){lr(t).start()}async function QA(t){lr(t).p_()}async function YA(t){const e=lr(t);for(const n of t.O_)e.m_(n.mutations)}async function JA(t,e,n){const r=t.O_.shift(),s=Fc.from(r,e,n);await ng(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await wa(t)}async function XA(t,e){e&&lr(t).V_&&await async function(r,s){if(function(o){return Bw(o)&&o!==M.ABORTED}(s.code)){const i=r.O_.shift();lr(r).s_(),await ng(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await wa(r)}}(t,e),rg(t)&&sg(t)}async function Hd(t,e){const n=me(t);n.asyncQueue.verifyOperationInProgress(),ee("RemoteStore","RemoteStore received new credentials");const r=xr(n);n.L_.add(3),await Oi(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await Ta(n)}async function ZA(t,e){const n=me(t);e?(n.L_.delete(2),await Ta(n)):e||(n.L_.add(2),await Oi(n),n.q_.set("Unknown"))}function ys(t){return t.K_||(t.K_=function(n,r,s){const i=me(n);return i.w_(),new FA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:HA.bind(null,t),Ro:$A.bind(null,t),mo:GA.bind(null,t),d_:KA.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),zc(t)?Kc(t):t.q_.set("Unknown")):(await t.K_.stop(),tg(t))})),t.K_}function lr(t){return t.U_||(t.U_=function(n,r,s){const i=me(n);return i.w_(),new UA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:QA.bind(null,t),mo:XA.bind(null,t),f_:YA.bind(null,t),g_:JA.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await wa(t)):(await t.U_.stop(),t.O_.length>0&&(ee("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
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
 */class Wc{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Sn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new Wc(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new X(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Qc(t,e){if(Nn("AsyncQueue",`${e}: ${t}`),Ci(t))return new X(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class es{constructor(e){this.comparator=e?(n,r)=>e(n,r)||ie.comparator(n.key,r.key):(n,r)=>ie.comparator(n.key,r.key),this.keyedMap=$s(),this.sortedSet=new qe(this.comparator)}static emptySet(e){return new es(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof es)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new es;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
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
 */class $d{constructor(){this.W_=new qe(ie.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):fe():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class ds{constructor(e,n,r,s,i,o,l,c,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new ds(e,n,es.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ga(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class eR{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class tR{constructor(){this.queries=Gd(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=me(n),i=s.queries;s.queries=Gd(),i.forEach((o,l)=>{for(const c of l.j_)c.onError(r)})})(this,new X(M.ABORTED,"Firestore shutting down"))}}function Gd(){return new _s(t=>bm(t),ga)}async function ig(t,e){const n=me(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new eR,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=Qc(o,`Initialization of query '${Hr(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&Yc(n)}async function og(t,e){const n=me(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function nR(t,e){const n=me(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(s)&&(r=!0);o.z_=s}}r&&Yc(n)}function rR(t,e,n){const r=me(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function Yc(t){t.Y_.forEach(e=>{e.next()})}var Xl,Kd;(Kd=Xl||(Xl={})).ea="default",Kd.Cache="cache";class ag{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ds(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=ds.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Xl.Cache}}/**
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
 */class lg{constructor(e){this.key=e}}class cg{constructor(e){this.key=e}}class sR{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=ve(),this.mutatedKeys=ve(),this.Aa=Pm(e),this.Ra=new es(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new $d,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((d,p)=>{const g=s.get(d),m=_a(this.query,p)?p:null,P=!!g&&this.mutatedKeys.has(g.key),C=!!m&&(m.hasLocalMutations||this.mutatedKeys.has(m.key)&&m.hasCommittedMutations);let O=!1;g&&m?g.data.isEqual(m.data)?P!==C&&(r.track({type:3,doc:m}),O=!0):this.ga(g,m)||(r.track({type:2,doc:m}),O=!0,(c&&this.Aa(m,c)>0||h&&this.Aa(m,h)<0)&&(l=!0)):!g&&m?(r.track({type:0,doc:m}),O=!0):g&&!m&&(r.track({type:1,doc:g}),O=!0,(c||h)&&(l=!0)),O&&(m?(o=o.add(m),i=C?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{Ra:o,fa:r,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((d,p)=>function(m,P){const C=O=>{switch(O){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return fe()}};return C(m)-C(P)}(d.type,p.type)||this.Aa(d.doc,p.doc)),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,h=c!==this.Ea;return this.Ea=c,o.length!==0||h?{snapshot:new ds(this.query,e.Ra,i,o,e.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new $d,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=ve(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new cg(r))}),this.da.forEach(r=>{e.has(r)||n.push(new lg(r))}),n}ba(e){this.Ta=e.Ts,this.da=ve();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return ds.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class iR{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class oR{constructor(e){this.key=e,this.va=!1}}class aR{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new _s(l=>bm(l),ga),this.Ma=new Map,this.xa=new Set,this.Oa=new qe(ie.comparator),this.Na=new Map,this.La=new jc,this.Ba={},this.ka=new Map,this.qa=hs.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function lR(t,e,n=!0){const r=mg(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await ug(r,e,n,!0),s}async function cR(t,e){const n=mg(t);await ug(n,e,!0,!1)}async function ug(t,e,n,r){const s=await kA(t.localStore,sn(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await uR(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&Zm(t.remoteStore,s),l}async function uR(t,e,n,r,s){t.Ka=(p,g,m)=>async function(C,O,$,q){let H=O.view.ma($);H.ns&&(H=await Bd(C.localStore,O.query,!1).then(({documents:A})=>O.view.ma(A,H)));const j=q&&q.targetChanges.get(O.targetId),te=q&&q.targetMismatches.get(O.targetId)!=null,le=O.view.applyChanges(H,C.isPrimaryClient,j,te);return Wd(C,O.targetId,le.wa),le.snapshot}(t,p,g,m);const i=await Bd(t.localStore,e,!0),o=new sR(e,i.Ts),l=o.ma(i.documents),c=Ni.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=o.applyChanges(l,t.isPrimaryClient,c);Wd(t,n,h.wa);const d=new iR(e,n,o);return t.Fa.set(e,d),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),h.snapshot}async function hR(t,e,n){const r=me(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(o=>!ga(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Jl(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&$c(r.remoteStore,s.targetId),Zl(r,s.targetId)}).catch(Si)):(Zl(r,s.targetId),await Jl(r.localStore,s.targetId,!0))}async function dR(t,e){const n=me(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),$c(n.remoteStore,r.targetId))}async function fR(t,e,n){const r=ER(t);try{const s=await function(o,l){const c=me(o),h=Je.now(),d=l.reduce((m,P)=>m.add(P.key),ve());let p,g;return c.persistence.runTransaction("Locally write mutations","readwrite",m=>{let P=On(),C=ve();return c.cs.getEntries(m,d).next(O=>{P=O,P.forEach(($,q)=>{q.isValidDocument()||(C=C.add($))})}).next(()=>c.localDocuments.getOverlayedDocuments(m,P)).next(O=>{p=O;const $=[];for(const q of l){const H=xw(q,p.get(q.key).overlayedDocument);H!=null&&$.push(new cr(q.key,H,ym(H.value.mapValue),Qt.exists(!0)))}return c.mutationQueue.addMutationBatch(m,h,$,l)}).next(O=>{g=O;const $=O.applyToLocalDocumentSet(p,C);return c.documentOverlayCache.saveOverlays(m,O.batchId,$)})}).then(()=>({batchId:g.batchId,changes:Cm(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,c){let h=o.Ba[o.currentUser.toKey()];h||(h=new qe(Pe)),h=h.insert(l,c),o.Ba[o.currentUser.toKey()]=h}(r,s.batchId,n),await Vi(r,s.changes),await wa(r.remoteStore)}catch(s){const i=Qc(s,"Failed to persist write");n.reject(i)}}async function hg(t,e){const n=me(t);try{const r=await SA(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Na.get(i);o&&(ke(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?ke(o.va):s.removedDocuments.size>0&&(ke(o.va),o.va=!1))}),await Vi(n,r,e)}catch(r){await Si(r)}}function zd(t,e,n){const r=me(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const c=me(o);c.onlineState=l;let h=!1;c.queries.forEach((d,p)=>{for(const g of p.j_)g.Z_(l)&&(h=!0)}),h&&Yc(c)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function pR(t,e,n){const r=me(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new qe(ie.comparator);o=o.insert(i,mt.newNoDocument(i,pe.min()));const l=ve().add(i),c=new Ea(pe.min(),new Map,new qe(Pe),o,l);await hg(r,c),r.Oa=r.Oa.remove(i),r.Na.delete(e),Jc(r)}else await Jl(r.localStore,e,!1).then(()=>Zl(r,e,n)).catch(Si)}async function mR(t,e){const n=me(t),r=e.batch.batchId;try{const s=await PA(n.localStore,e);fg(n,r,null),dg(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Vi(n,s)}catch(s){await Si(s)}}async function gR(t,e,n){const r=me(t);try{const s=await function(o,l){const c=me(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let d;return c.mutationQueue.lookupMutationBatch(h,l).next(p=>(ke(p!==null),d=p.keys(),c.mutationQueue.removeMutationBatch(h,p))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,d,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d)).next(()=>c.localDocuments.getDocuments(h,d))})}(r.localStore,e);fg(r,e,n),dg(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Vi(r,s)}catch(s){await Si(s)}}function dg(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function fg(t,e,n){const r=me(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function Zl(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||pg(t,r)})}function pg(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&($c(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),Jc(t))}function Wd(t,e,n){for(const r of n)r instanceof lg?(t.La.addReference(r.key,e),_R(t,r)):r instanceof cg?(ee("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||pg(t,r.key)):fe()}function _R(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(ee("SyncEngine","New document in limbo: "+n),t.xa.add(r),Jc(t))}function Jc(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new ie(Fe.fromString(e)),r=t.qa.next();t.Na.set(r,new oR(n)),t.Oa=t.Oa.insert(n,r),Zm(t.remoteStore,new Xn(sn(Lc(n.path)),r,"TargetPurposeLimboResolution",Dc.oe))}}async function Vi(t,e,n){const r=me(t),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,c)=>{o.push(r.Ka(c,e,n).then(h=>{var d;if((h||n)&&r.isPrimaryClient){const p=h?!h.fromCache:(d=n==null?void 0:n.targetChanges.get(c.targetId))===null||d===void 0?void 0:d.current;r.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){s.push(h);const p=Hc.Wi(c.targetId,h);i.push(p)}}))}),await Promise.all(o),r.Ca.d_(s),await async function(c,h){const d=me(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>U.forEach(h,g=>U.forEach(g.$i,m=>d.persistence.referenceDelegate.addReference(p,g.targetId,m)).next(()=>U.forEach(g.Ui,m=>d.persistence.referenceDelegate.removeReference(p,g.targetId,m)))))}catch(p){if(!Ci(p))throw p;ee("LocalStore","Failed to update sequence numbers: "+p)}for(const p of h){const g=p.targetId;if(!p.fromCache){const m=d.os.get(g),P=m.snapshotVersion,C=m.withLastLimboFreeSnapshotVersion(P);d.os=d.os.insert(g,C)}}}(r.localStore,i))}async function yR(t,e){const n=me(t);if(!n.currentUser.isEqual(e)){ee("SyncEngine","User change. New user:",e.toKey());const r=await Qm(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(c=>{c.reject(new X(M.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Vi(n,r.hs)}}function vR(t,e){const n=me(t),r=n.Na.get(e);if(r&&r.va)return ve().add(r.key);{let s=ve();const i=n.Ma.get(e);if(!i)return s;for(const o of i){const l=n.Fa.get(o);s=s.unionWith(l.view.Va)}return s}}function mg(t){const e=me(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=hg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=vR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=pR.bind(null,e),e.Ca.d_=nR.bind(null,e.eventManager),e.Ca.$a=rR.bind(null,e.eventManager),e}function ER(t){const e=me(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=mR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=gR.bind(null,e),e}class $o{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ia(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return bA(this.persistence,new AA,e.initialUser,this.serializer)}Ga(e){return new IA(qc.Zr,this.serializer)}Wa(e){return new OA}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}$o.provider={build:()=>new $o};class ec{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>zd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=yR.bind(null,this.syncEngine),await ZA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new tR}()}createDatastore(e){const n=Ia(e.databaseInfo.databaseId),r=function(i){return new MA(i)}(e.databaseInfo);return function(i,o,l,c){return new BA(i,o,l,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new qA(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>zd(this.syncEngine,n,0),function(){return qd.D()?new qd:new VA}())}createSyncEngine(e,n){return function(s,i,o,l,c,h,d){const p=new aR(s,i,o,l,c,h);return d&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=me(s);ee("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Oi(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}ec.provider={build:()=>new ec};/**
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
 */class gg{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Nn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */class IR{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=ft.UNAUTHENTICATED,this.clientId=mm.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{ee("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(ee("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Sn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Qc(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ml(t,e){t.asyncQueue.verifyOperationInProgress(),ee("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Qm(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Qd(t,e){t.asyncQueue.verifyOperationInProgress();const n=await TR(t);ee("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Hd(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>Hd(e.remoteStore,s)),t._onlineComponents=e}async function TR(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){ee("FirestoreClient","Using user provided OfflineComponentProvider");try{await ml(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===M.FAILED_PRECONDITION||s.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;as("Error using user provided cache. Falling back to memory cache: "+n),await ml(t,new $o)}}else ee("FirestoreClient","Using default OfflineComponentProvider"),await ml(t,new $o);return t._offlineComponents}async function _g(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(ee("FirestoreClient","Using user provided OnlineComponentProvider"),await Qd(t,t._uninitializedComponentsProvider._online)):(ee("FirestoreClient","Using default OnlineComponentProvider"),await Qd(t,new ec))),t._onlineComponents}function wR(t){return _g(t).then(e=>e.syncEngine)}async function yg(t){const e=await _g(t),n=e.eventManager;return n.onListen=lR.bind(null,e.syncEngine),n.onUnlisten=hR.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=cR.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=dR.bind(null,e.syncEngine),n}function AR(t,e,n={}){const r=new Sn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,c,h){const d=new gg({next:g=>{d.Za(),o.enqueueAndForget(()=>og(i,p));const m=g.docs.has(l);!m&&g.fromCache?h.reject(new X(M.UNAVAILABLE,"Failed to get document because the client is offline.")):m&&g.fromCache&&c&&c.source==="server"?h.reject(new X(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new ag(Lc(l.path),d,{includeMetadataChanges:!0,_a:!0});return ig(i,p)}(await yg(t),t.asyncQueue,e,n,r)),r.promise}function RR(t,e,n={}){const r=new Sn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,c,h){const d=new gg({next:g=>{d.Za(),o.enqueueAndForget(()=>og(i,p)),g.fromCache&&c.source==="server"?h.reject(new X(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new ag(l,d,{includeMetadataChanges:!0,_a:!0});return ig(i,p)}(await yg(t),t.asyncQueue,e,n,r)),r.promise}/**
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
 */function vg(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const Yd=new Map;/**
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
 */function Eg(t,e,n){if(!n)throw new X(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function bR(t,e,n,r){if(e===!0&&r===!0)throw new X(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Jd(t){if(!ie.isDocumentKey(t))throw new X(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Xd(t){if(ie.isDocumentKey(t))throw new X(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Aa(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":fe()}function dn(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new X(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Aa(t);throw new X(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class Zd{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new X(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new X(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}bR("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=vg((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new X(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new X(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new X(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ra{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Zd({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new X(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new X(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Zd(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new HT;switch(r.type){case"firstParty":return new zT(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new X(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Yd.get(n);r&&(ee("ComponentProvider","Removing Datastore"),Yd.delete(n),r.terminate())}(this),Promise.resolve()}}function PR(t,e,n,r={}){var s;const i=(t=dn(t,Ra))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&as("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,c;if(typeof r.mockUserToken=="string")l=r.mockUserToken,c=ft.MOCK_USER;else{l=nm(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new X(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new ft(h)}t._authCredentials=new $T(new pm(l,c))}}/**
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
 */class vs{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new vs(this.firestore,e,this._query)}}class bt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new nr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new bt(this.firestore,e,this._key)}}class nr extends vs{constructor(e,n,r){super(e,n,Lc(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new bt(this.firestore,null,new ie(e))}withConverter(e){return new nr(this.firestore,e,this._path)}}function ef(t,e,...n){if(t=Et(t),Eg("collection","path",e),t instanceof Ra){const r=Fe.fromString(e,...n);return Xd(r),new nr(t,null,r)}{if(!(t instanceof bt||t instanceof nr))throw new X(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fe.fromString(e,...n));return Xd(r),new nr(t.firestore,null,r)}}function vo(t,e,...n){if(t=Et(t),arguments.length===1&&(e=mm.newId()),Eg("doc","path",e),t instanceof Ra){const r=Fe.fromString(e,...n);return Jd(r),new bt(t,null,new ie(r))}{if(!(t instanceof bt||t instanceof nr))throw new X(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fe.fromString(e,...n));return Jd(r),new bt(t.firestore,t instanceof nr?t.converter:null,new ie(r))}}/**
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
 */class tf{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Jm(this,"async_queue_retry"),this.Vu=()=>{const r=pl();r&&ee("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=pl();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=pl();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Sn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Ci(e))throw e;ee("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw Nn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=Wc.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&fe()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class Es extends Ra{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new tf,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new tf(e),this._firestoreClient=void 0,await e}}}function SR(t,e){const n=typeof t=="object"?t:Sc(),r=typeof t=="string"?t:"(default)",s=pa(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Zp("firestore");i&&PR(s,...i)}return s}function Xc(t){if(t._terminated)throw new X(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||CR(t),t._firestoreClient}function CR(t){var e,n,r;const s=t._freezeSettings(),i=function(l,c,h,d){return new ow(l,c,h,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,vg(d.experimentalLongPollingOptions),d.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new IR(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(t._componentsProvider))}/**
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
 */class fs{constructor(e){this._byteString=e}static fromBase64String(e){try{return new fs(at.fromBase64String(e))}catch(n){throw new X(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new fs(at.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class ba{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new X(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new it(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Pa{constructor(e){this._methodName=e}}/**
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
 */class Zc{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new X(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new X(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return Pe(this._lat,e._lat)||Pe(this._long,e._long)}}/**
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
 */const DR=/^__.*__$/;class kR{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new cr(e,this.data,this.fieldMask,n,this.fieldTransforms):new ki(e,this.data,n,this.fieldTransforms)}}class Ig{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new cr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function Tg(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw fe()}}class tu{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new tu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Go(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Tg(this.Cu)&&DR.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class NR{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Ia(e)}Qu(e,n,r,s=!1){return new tu({Cu:e,methodName:n,qu:r,path:it.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Sa(t){const e=t._freezeSettings(),n=Ia(t._databaseId);return new NR(t._databaseId,!!e.ignoreUndefinedProperties,n)}function wg(t,e,n,r,s,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);ru("Data must be an object, but it was:",o,r);const l=Ag(r,o);let c,h;if(i.merge)c=new Lt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const g=tc(e,p,n);if(!o.contains(g))throw new X(M.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);bg(d,g)||d.push(g)}c=new Lt(d),h=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,h=o.fieldTransforms;return new kR(new Dt(l),c,h)}class Ca extends Pa{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ca}}class nu extends Pa{_toFieldTransform(e){return new kw(e.path,new vi)}isEqual(e){return e instanceof nu}}function OR(t,e,n,r){const s=t.Qu(1,e,n);ru("Data must be an object, but it was:",s,r);const i=[],o=Dt.empty();Vr(r,(c,h)=>{const d=su(e,c,n);h=Et(h);const p=s.Nu(d);if(h instanceof Ca)i.push(d);else{const g=xi(h,p);g!=null&&(i.push(d),o.set(d,g))}});const l=new Lt(i);return new Ig(o,l,s.fieldTransforms)}function VR(t,e,n,r,s,i){const o=t.Qu(1,e,n),l=[tc(e,r,n)],c=[s];if(i.length%2!=0)throw new X(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push(tc(e,i[g])),c.push(i[g+1]);const h=[],d=Dt.empty();for(let g=l.length-1;g>=0;--g)if(!bg(h,l[g])){const m=l[g];let P=c[g];P=Et(P);const C=o.Nu(m);if(P instanceof Ca)h.push(m);else{const O=xi(P,C);O!=null&&(h.push(m),d.set(m,O))}}const p=new Lt(h);return new Ig(d,p,o.fieldTransforms)}function xR(t,e,n,r=!1){return xi(n,t.Qu(r?4:3,e))}function xi(t,e){if(Rg(t=Et(t)))return ru("Unsupported field value:",e,t),Ag(t,e);if(t instanceof Pa)return function(r,s){if(!Tg(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let c=xi(l,s.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=Et(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Sw(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Je.fromDate(r);return{timestampValue:qo(s.serializer,i)}}if(r instanceof Je){const i=new Je(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:qo(s.serializer,i)}}if(r instanceof Zc)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof fs)return{bytesValue:qm(s.serializer,r._byteString)};if(r instanceof bt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Bc(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof eu)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.Bu("VectorValues must only contain numeric values.");return Mc(l.serializer,c)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${Aa(r)}`)}(t,e)}function Ag(t,e){const n={};return gm(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Vr(t,(r,s)=>{const i=xi(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function Rg(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Je||t instanceof Zc||t instanceof fs||t instanceof bt||t instanceof Pa||t instanceof eu)}function ru(t,e,n){if(!Rg(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=Aa(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function tc(t,e,n){if((e=Et(e))instanceof ba)return e._internalPath;if(typeof e=="string")return su(t,e);throw Go("Field path arguments must be of type string or ",t,!1,void 0,n)}const LR=new RegExp("[~\\*/\\[\\]]");function su(t,e,n){if(e.search(LR)>=0)throw Go(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ba(...e.split("."))._internalPath}catch{throw Go(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Go(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new X(M.INVALID_ARGUMENT,l+t+c)}function bg(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class Pg{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new bt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new MR(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(iu("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class MR extends Pg{data(){return super.data()}}function iu(t,e){return typeof e=="string"?su(t,e):e instanceof ba?e._internalPath:e._delegate._internalPath}/**
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
 */function FR(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new X(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ou{}class UR extends ou{}function gl(t,e,...n){let r=[];e instanceof ou&&r.push(e),r=r.concat(n),function(i){const o=i.filter(c=>c instanceof au).length,l=i.filter(c=>c instanceof Da).length;if(o>1||o>0&&l>0)throw new X(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class Da extends UR{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Da(e,n,r)}_apply(e){const n=this._parse(e);return Sg(e._query,n),new vs(e.firestore,e.converter,Gl(e._query,n))}_parse(e){const n=Sa(e.firestore);return function(i,o,l,c,h,d,p){let g;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new X(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){sf(p,d);const m=[];for(const P of p)m.push(rf(c,i,P));g={arrayValue:{values:m}}}else g=rf(c,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||sf(p,d),g=xR(l,o,p,d==="in"||d==="not-in");return Qe.create(h,d,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function nf(t,e,n){const r=e,s=iu("where",t);return Da._create(s,r,n)}class au extends ou{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new au(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:Jt.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const l=i.getFlattenedFilters();for(const c of l)Sg(o,c),o=Gl(o,c)}(e._query,n),new vs(e.firestore,e.converter,Gl(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function rf(t,e,n){if(typeof(n=Et(n))=="string"){if(n==="")throw new X(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Rm(e)&&n.indexOf("/")!==-1)throw new X(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Fe.fromString(n));if(!ie.isDocumentKey(r))throw new X(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return wd(t,new ie(r))}if(n instanceof bt)return wd(t,n._key);throw new X(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Aa(n)}.`)}function sf(t,e){if(!Array.isArray(t)||t.length===0)throw new X(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Sg(t,e){const n=function(s,i){for(const o of s)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new X(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new X(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class BR{convertValue(e,n="none"){switch(Cr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ge(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Sr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw fe()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Vr(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Ge(o.doubleValue));return new eu(i)}convertGeoPoint(e){return new Zc(Ge(e.latitude),Ge(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Nc(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(gi(e));default:return null}}convertTimestamp(e){const n=ar(e);return new Je(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Fe.fromString(e);ke(Wm(r));const s=new _i(r.get(1),r.get(3)),i=new ie(r.popFirst(5));return s.isEqual(n)||Nn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function Cg(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
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
 */class Ks{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Dg extends Pg{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Eo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(iu("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Eo extends Dg{data(e={}){return super.data(e)}}class jR{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Ks(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Eo(this._firestore,this._userDataWriter,r.key,r,new Ks(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new X(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const c=new Eo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Ks(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const c=new Eo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Ks(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,d=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),d=o.indexOf(l.doc.key)),{type:qR(l.type),doc:c,oldIndex:h,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function qR(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return fe()}}/**
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
 */function HR(t){t=dn(t,bt);const e=dn(t.firestore,Es);return AR(Xc(e),t._key).then(n=>WR(e,t,n))}class kg extends BR{constructor(e){super(),this.firestore=e}convertBytes(e){return new fs(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new bt(this.firestore,null,n)}}function $R(t){t=dn(t,vs);const e=dn(t.firestore,Es),n=Xc(e),r=new kg(e);return FR(t._query),RR(n,t._query).then(s=>new jR(e,r,t,s))}function GR(t,e,n){t=dn(t,bt);const r=dn(t.firestore,Es),s=Cg(t.converter,e);return lu(r,[wg(Sa(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Qt.none())])}function KR(t,e,n,...r){t=dn(t,bt);const s=dn(t.firestore,Es),i=Sa(s);let o;return o=typeof(e=Et(e))=="string"||e instanceof ba?VR(i,"updateDoc",t._key,e,n,r):OR(i,"updateDoc",t._key,e),lu(s,[o.toMutation(t._key,Qt.exists(!0))])}function zR(t,e){const n=dn(t.firestore,Es),r=vo(t),s=Cg(t.converter,e);return lu(n,[wg(Sa(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,Qt.exists(!1))]).then(()=>r)}function lu(t,e){return function(r,s){const i=new Sn;return r.asyncQueue.enqueueAndForget(async()=>fR(await wR(r),s,i)),i.promise}(Xc(t),e)}function WR(t,e,n){const r=n.docs.get(e._key),s=new kg(t);return new Dg(t,s,e._key,r,new Ks(n.hasPendingWrites,n.fromCache),e.converter)}function Us(){return new nu("serverTimestamp")}(function(e,n=!0){(function(s){gs=s})(Or),br(new ir("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new Es(new GT(r.getProvider("auth-internal")),new QT(r.getProvider("app-check-internal")),function(h,d){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new X(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new _i(h.options.projectId,d)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),rn(yd,"4.7.3",e),rn(yd,"4.7.3","esm2017")})();var QR="firebase",YR="10.14.1";/**
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
 */rn(QR,YR,"app");function cu(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Ng(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const JR=Ng,Og=new bi("auth","Firebase",Ng());/**
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
 */const Ko=new bc("@firebase/auth");function XR(t,...e){Ko.logLevel<=Ie.WARN&&Ko.warn(`Auth (${Or}): ${t}`,...e)}function Io(t,...e){Ko.logLevel<=Ie.ERROR&&Ko.error(`Auth (${Or}): ${t}`,...e)}/**
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
 */function Vn(t,...e){throw uu(t,...e)}function an(t,...e){return uu(t,...e)}function Vg(t,e,n){const r=Object.assign(Object.assign({},JR()),{[e]:n});return new bi("auth","Firebase",r).create(e,{appName:t.name})}function Ar(t){return Vg(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function uu(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Og.create(t,...e)}function de(t,e,...n){if(!t)throw uu(e,...n)}function wn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Io(e),new Error(e)}function xn(t,e){t||wn(e)}/**
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
 */function nc(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function ZR(){return of()==="http:"||of()==="https:"}function of(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function eb(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ZR()||wI()||"connection"in navigator)?navigator.onLine:!0}function tb(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Li{constructor(e,n){this.shortDelay=e,this.longDelay=n,xn(n>e,"Short delay should be less than long delay!"),this.isMobile=EI()||AI()}get(){return eb()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */class xg{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;wn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;wn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;wn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const nb={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const rb=new Li(3e4,6e4);function du(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Is(t,e,n,r,s={}){return Lg(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=Pi(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:c},i);return TI()||(h.referrerPolicy="no-referrer"),xg.fetch()(Mg(t,t.config.apiHost,n,l),h)})}async function Lg(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},nb),e);try{const s=new ib(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw lo(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw lo(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw lo(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw lo(t,"user-disabled",o);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Vg(t,d,h);Vn(t,d)}}catch(s){if(s instanceof pn)throw s;Vn(t,"network-request-failed",{message:String(s)})}}async function sb(t,e,n,r,s={}){const i=await Is(t,e,n,r,s);return"mfaPendingCredential"in i&&Vn(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Mg(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?hu(t.config,s):`${t.config.apiScheme}://${s}`}class ib{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(an(this.auth,"network-request-failed")),rb.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function lo(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=an(t,e,r);return s.customData._tokenResponse=n,s}/**
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
 */async function ob(t,e){return Is(t,"POST","/v1/accounts:delete",e)}async function Fg(t,e){return Is(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function oi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ab(t,e=!1){const n=Et(t),r=await n.getIdToken(e),s=fu(r);de(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:oi(_l(s.auth_time)),issuedAtTime:oi(_l(s.iat)),expirationTime:oi(_l(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function _l(t){return Number(t)*1e3}function fu(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Io("JWT malformed, contained fewer than 3 sections"),null;try{const s=Jp(n);return s?JSON.parse(s):(Io("Failed to decode base64 JWT payload"),null)}catch(s){return Io("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function af(t){const e=fu(t);return de(e,"internal-error"),de(typeof e.exp<"u","internal-error"),de(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ti(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof pn&&lb(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function lb({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class cb{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class rc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=oi(this.lastLoginAt),this.creationTime=oi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function zo(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Ti(t,Fg(n,{idToken:r}));de(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Ug(i.providerUserInfo):[],l=hb(t.providerData,o),c=t.isAnonymous,h=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),d=c?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new rc(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(t,p)}async function ub(t){const e=Et(t);await zo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function hb(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Ug(t){return t.map(e=>{var{providerId:n}=e,r=cu(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function db(t,e){const n=await Lg(t,{},async()=>{const r=Pi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Mg(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",xg.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function fb(t,e){return Is(t,"POST","/v2/accounts:revokeToken",du(t,e))}/**
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
 */class ts{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){de(e.idToken,"internal-error"),de(typeof e.idToken<"u","internal-error"),de(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):af(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){de(e.length!==0,"internal-error");const n=af(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(de(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await db(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new ts;return r&&(de(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(de(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(de(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ts,this.toJSON())}_performRefresh(){return wn("not implemented")}}/**
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
 */function Hn(t,e){de(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class An{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=cu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new cb(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new rc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Ti(this,this.stsTokenManager.getToken(this.auth,e));return de(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return ab(this,e)}reload(){return ub(this)}_assign(e){this!==e&&(de(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new An(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){de(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await zo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Jn(this.auth.app))return Promise.reject(Ar(this.auth));const e=await this.getIdToken();return await Ti(this,ob(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,c,h,d;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(s=n.email)!==null&&s!==void 0?s:void 0,m=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,P=(o=n.photoURL)!==null&&o!==void 0?o:void 0,C=(l=n.tenantId)!==null&&l!==void 0?l:void 0,O=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,$=(h=n.createdAt)!==null&&h!==void 0?h:void 0,q=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:H,emailVerified:j,isAnonymous:te,providerData:le,stsTokenManager:A}=n;de(H&&A,e,"internal-error");const v=ts.fromJSON(this.name,A);de(typeof H=="string",e,"internal-error"),Hn(p,e.name),Hn(g,e.name),de(typeof j=="boolean",e,"internal-error"),de(typeof te=="boolean",e,"internal-error"),Hn(m,e.name),Hn(P,e.name),Hn(C,e.name),Hn(O,e.name),Hn($,e.name),Hn(q,e.name);const w=new An({uid:H,auth:e,email:g,emailVerified:j,displayName:p,isAnonymous:te,photoURL:P,phoneNumber:m,tenantId:C,stsTokenManager:v,createdAt:$,lastLoginAt:q});return le&&Array.isArray(le)&&(w.providerData=le.map(R=>Object.assign({},R))),O&&(w._redirectEventId=O),w}static async _fromIdTokenResponse(e,n,r=!1){const s=new ts;s.updateFromServerResponse(n);const i=new An({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await zo(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];de(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Ug(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new ts;l.updateFromIdToken(r);const c=new An({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new rc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,h),c}}/**
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
 */const lf=new Map;function Rn(t){xn(t instanceof Function,"Expected a class definition");let e=lf.get(t);return e?(xn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,lf.set(t,e),e)}/**
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
 */class Bg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Bg.type="NONE";const cf=Bg;/**
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
 */function To(t,e,n){return`firebase:${t}:${e}:${n}`}class ns{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=To(this.userKey,s.apiKey,i),this.fullPersistenceKey=To("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?An._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new ns(Rn(cf),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Rn(cf);const o=To(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const d=await h._get(o);if(d){const p=An._fromJSON(e,d);h!==i&&(l=p),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new ns(i,e,r):(i=c[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new ns(i,e,r))}}/**
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
 */function uf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if($g(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(jg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Kg(e))return"Blackberry";if(zg(e))return"Webos";if(qg(e))return"Safari";if((e.includes("chrome/")||Hg(e))&&!e.includes("edge/"))return"Chrome";if(Gg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function jg(t=vt()){return/firefox\//i.test(t)}function qg(t=vt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Hg(t=vt()){return/crios\//i.test(t)}function $g(t=vt()){return/iemobile/i.test(t)}function Gg(t=vt()){return/android/i.test(t)}function Kg(t=vt()){return/blackberry/i.test(t)}function zg(t=vt()){return/webos/i.test(t)}function pu(t=vt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function pb(t=vt()){var e;return pu(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function mb(){return RI()&&document.documentMode===10}function Wg(t=vt()){return pu(t)||Gg(t)||zg(t)||Kg(t)||/windows phone/i.test(t)||$g(t)}/**
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
 */function Qg(t,e=[]){let n;switch(t){case"Browser":n=uf(vt());break;case"Worker":n=`${uf(vt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Or}/${r}`}/**
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
 */class gb{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const c=e(i);o(c)}catch(c){l(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function _b(t,e={}){return Is(t,"GET","/v2/passwordPolicy",du(t,e))}/**
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
 */const yb=6;class vb{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:yb,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class Eb{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new hf(this),this.idTokenSubscription=new hf(this),this.beforeStateQueue=new gb(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Og,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Rn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await ns.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Fg(this,{idToken:e}),r=await An._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Jn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return de(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await zo(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=tb()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Jn(this.app))return Promise.reject(Ar(this));const n=e?Et(e):null;return n&&de(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&de(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Jn(this.app)?Promise.reject(Ar(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Jn(this.app)?Promise.reject(Ar(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Rn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await _b(this),n=new vb(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new bi("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await fb(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Rn(e)||this._popupRedirectResolver;de(n,this,"argument-error"),this.redirectPersistenceManager=await ns.create(this,[Rn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(de(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return de(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Qg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&XR(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function mu(t){return Et(t)}class hf{constructor(e){this.auth=e,this.observer=null,this.addObserver=OI(n=>this.observer=n)}get next(){return de(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let gu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ib(t){gu=t}function Tb(t){return gu.loadJS(t)}function wb(){return gu.gapiScript}function Ab(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Rb(t,e){const n=pa(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Lo(i,e??{}))return s;Vn(s,"already-initialized")}return n.initialize({options:e})}function bb(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Rn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Pb(t,e,n){const r=mu(t);de(r._canInitEmulator,r,"emulator-config-failed"),de(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Yg(e),{host:o,port:l}=Sb(e),c=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),Cb()}function Yg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Sb(t){const e=Yg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:df(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:df(o)}}}function df(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Cb(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Jg{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return wn("not implemented")}_getIdTokenResponse(e){return wn("not implemented")}_linkToIdToken(e,n){return wn("not implemented")}_getReauthenticationResolver(e){return wn("not implemented")}}/**
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
 */async function rs(t,e){return sb(t,"POST","/v1/accounts:signInWithIdp",du(t,e))}/**
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
 */const Db="http://localhost";class Dr extends Jg{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Dr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Vn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=cu(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Dr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return rs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,rs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,rs(e,n)}buildRequest(){const e={requestUri:Db,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Pi(n)}return e}}/**
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
 */class Xg{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Mi extends Xg{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class zn extends Mi{constructor(){super("facebook.com")}static credential(e){return Dr._fromParams({providerId:zn.PROVIDER_ID,signInMethod:zn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zn.credentialFromTaggedObject(e)}static credentialFromError(e){return zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return zn.credential(e.oauthAccessToken)}catch{return null}}}zn.FACEBOOK_SIGN_IN_METHOD="facebook.com";zn.PROVIDER_ID="facebook.com";/**
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
 */class Wn extends Mi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Dr._fromParams({providerId:Wn.PROVIDER_ID,signInMethod:Wn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Wn.credentialFromTaggedObject(e)}static credentialFromError(e){return Wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Wn.credential(n,r)}catch{return null}}}Wn.GOOGLE_SIGN_IN_METHOD="google.com";Wn.PROVIDER_ID="google.com";/**
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
 */class Qn extends Mi{constructor(){super("github.com")}static credential(e){return Dr._fromParams({providerId:Qn.PROVIDER_ID,signInMethod:Qn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qn.credentialFromTaggedObject(e)}static credentialFromError(e){return Qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qn.credential(e.oauthAccessToken)}catch{return null}}}Qn.GITHUB_SIGN_IN_METHOD="github.com";Qn.PROVIDER_ID="github.com";/**
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
 */class Yn extends Mi{constructor(){super("twitter.com")}static credential(e,n){return Dr._fromParams({providerId:Yn.PROVIDER_ID,signInMethod:Yn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Yn.credentialFromTaggedObject(e)}static credentialFromError(e){return Yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Yn.credential(n,r)}catch{return null}}}Yn.TWITTER_SIGN_IN_METHOD="twitter.com";Yn.PROVIDER_ID="twitter.com";/**
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
 */class ps{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await An._fromIdTokenResponse(e,r,s),o=ff(r);return new ps({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=ff(r);return new ps({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function ff(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class Wo extends pn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Wo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Wo(e,n,r,s)}}function Zg(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Wo._fromErrorAndOperation(t,i,e,r):i})}async function kb(t,e,n=!1){const r=await Ti(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ps._forOperation(t,"link",r)}/**
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
 */async function Nb(t,e,n=!1){const{auth:r}=t;if(Jn(r.app))return Promise.reject(Ar(r));const s="reauthenticate";try{const i=await Ti(t,Zg(r,s,e,t),n);de(i.idToken,r,"internal-error");const o=fu(i.idToken);de(o,r,"internal-error");const{sub:l}=o;return de(t.uid===l,r,"user-mismatch"),ps._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Vn(r,"user-mismatch"),i}}/**
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
 */async function Ob(t,e,n=!1){if(Jn(t.app))return Promise.reject(Ar(t));const r="signIn",s=await Zg(t,r,e),i=await ps._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}function Vb(t,e,n,r){return Et(t).onIdTokenChanged(e,n,r)}function xb(t,e,n){return Et(t).beforeAuthStateChanged(e,n)}const Qo="__sak";/**
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
 */class e_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Qo,"1"),this.storage.removeItem(Qo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Lb=1e3,Mb=10;class t_ extends e_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Wg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);mb()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Mb):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Lb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}t_.type="LOCAL";const Fb=t_;/**
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
 */class n_ extends e_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}n_.type="SESSION";const r_=n_;/**
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
 */function Ub(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class ka{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new ka(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async h=>h(n.origin,i)),c=await Ub(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ka.receivers=[];/**
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
 */class Bb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,c)=>{const h=_u("",20);s.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function ln(){return window}function jb(t){ln().location.href=t}/**
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
 */function s_(){return typeof ln().WorkerGlobalScope<"u"&&typeof ln().importScripts=="function"}async function qb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Hb(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function $b(){return s_()?self:null}/**
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
 */const i_="firebaseLocalStorageDb",Gb=1,Yo="firebaseLocalStorage",o_="fbase_key";class Fi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Na(t,e){return t.transaction([Yo],e?"readwrite":"readonly").objectStore(Yo)}function Kb(){const t=indexedDB.deleteDatabase(i_);return new Fi(t).toPromise()}function sc(){const t=indexedDB.open(i_,Gb);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Yo,{keyPath:o_})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Yo)?e(r):(r.close(),await Kb(),e(await sc()))})})}async function pf(t,e,n){const r=Na(t,!0).put({[o_]:e,value:n});return new Fi(r).toPromise()}async function zb(t,e){const n=Na(t,!1).get(e),r=await new Fi(n).toPromise();return r===void 0?null:r.value}function mf(t,e){const n=Na(t,!0).delete(e);return new Fi(n).toPromise()}const Wb=800,Qb=3;class a_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await sc(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Qb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return s_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ka._getInstance($b()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await qb(),!this.activeServiceWorker)return;this.sender=new Bb(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Hb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await sc();return await pf(e,Qo,"1"),await mf(e,Qo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>pf(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>zb(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>mf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Na(s,!1).getAll();return new Fi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Wb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}a_.type="LOCAL";const Yb=a_;new Li(3e4,6e4);/**
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
 */function Jb(t,e){return e?Rn(e):(de(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class yu extends Jg{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return rs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return rs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return rs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Xb(t){return Ob(t.auth,new yu(t),t.bypassAuthState)}function Zb(t){const{auth:e,user:n}=t;return de(n,e,"internal-error"),Nb(n,new yu(t),t.bypassAuthState)}async function e0(t){const{auth:e,user:n}=t;return de(n,e,"internal-error"),kb(n,new yu(t),t.bypassAuthState)}/**
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
 */class l_{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Xb;case"linkViaPopup":case"linkViaRedirect":return e0;case"reauthViaPopup":case"reauthViaRedirect":return Zb;default:Vn(this.auth,"internal-error")}}resolve(e){xn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){xn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const t0=new Li(2e3,1e4);class Kr extends l_{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Kr.currentPopupAction&&Kr.currentPopupAction.cancel(),Kr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return de(e,this.auth,"internal-error"),e}async onExecution(){xn(this.filter.length===1,"Popup operations only handle one event");const e=_u();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(an(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(an(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Kr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(an(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,t0.get())};e()}}Kr.currentPopupAction=null;/**
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
 */const n0="pendingRedirect",wo=new Map;class r0 extends l_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=wo.get(this.auth._key());if(!e){try{const r=await s0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}wo.set(this.auth._key(),e)}return this.bypassAuthState||wo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function s0(t,e){const n=a0(e),r=o0(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function i0(t,e){wo.set(t._key(),e)}function o0(t){return Rn(t._redirectPersistence)}function a0(t){return To(n0,t.config.apiKey,t.name)}async function l0(t,e,n=!1){if(Jn(t.app))return Promise.reject(Ar(t));const r=mu(t),s=Jb(r,e),o=await new r0(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const c0=10*60*1e3;class u0{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!h0(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!c_(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(an(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=c0&&this.cachedEventUids.clear(),this.cachedEventUids.has(gf(e))}saveEventToCache(e){this.cachedEventUids.add(gf(e)),this.lastProcessedEventTime=Date.now()}}function gf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function c_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function h0(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return c_(t);default:return!1}}/**
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
 */async function d0(t,e={}){return Is(t,"GET","/v1/projects",e)}/**
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
 */const f0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,p0=/^https?/;async function m0(t){if(t.config.emulator)return;const{authorizedDomains:e}=await d0(t);for(const n of e)try{if(g0(n))return}catch{}Vn(t,"unauthorized-domain")}function g0(t){const e=nc(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!p0.test(n))return!1;if(f0.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const _0=new Li(3e4,6e4);function _f(){const t=ln().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function y0(t){return new Promise((e,n)=>{var r,s,i;function o(){_f(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{_f(),n(an(t,"network-request-failed"))},timeout:_0.get()})}if(!((s=(r=ln().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=ln().gapi)===null||i===void 0)&&i.load)o();else{const l=Ab("iframefcb");return ln()[l]=()=>{gapi.load?o():n(an(t,"network-request-failed"))},Tb(`${wb()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw Ao=null,e})}let Ao=null;function v0(t){return Ao=Ao||y0(t),Ao}/**
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
 */const E0=new Li(5e3,15e3),I0="__/auth/iframe",T0="emulator/auth/iframe",w0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},A0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function R0(t){const e=t.config;de(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?hu(e,T0):`https://${t.config.authDomain}/${I0}`,r={apiKey:e.apiKey,appName:t.name,v:Or},s=A0.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Pi(r).slice(1)}`}async function b0(t){const e=await v0(t),n=ln().gapi;return de(n,t,"internal-error"),e.open({where:document.body,url:R0(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:w0,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=an(t,"network-request-failed"),l=ln().setTimeout(()=>{i(o)},E0.get());function c(){ln().clearTimeout(l),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const P0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},S0=500,C0=600,D0="_blank",k0="http://localhost";class yf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function N0(t,e,n,r=S0,s=C0){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c=Object.assign(Object.assign({},P0),{width:r.toString(),height:s.toString(),top:i,left:o}),h=vt().toLowerCase();n&&(l=Hg(h)?D0:n),jg(h)&&(e=e||k0,c.scrollbars="yes");const d=Object.entries(c).reduce((g,[m,P])=>`${g}${m}=${P},`,"");if(pb(h)&&l!=="_self")return O0(e||"",l),new yf(null);const p=window.open(e||"",l,d);de(p,t,"popup-blocked");try{p.focus()}catch{}return new yf(p)}function O0(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const V0="__/auth/handler",x0="emulator/auth/handler",L0=encodeURIComponent("fac");async function vf(t,e,n,r,s,i){de(t.config.authDomain,t,"auth-domain-config-required"),de(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Or,eventId:s};if(e instanceof Xg){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",NI(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof Mi){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const c=await t._getAppCheckToken(),h=c?`#${L0}=${encodeURIComponent(c)}`:"";return`${M0(t)}?${Pi(l).slice(1)}${h}`}function M0({config:t}){return t.emulator?hu(t,x0):`https://${t.authDomain}/${V0}`}/**
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
 */const yl="webStorageSupport";class F0{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=r_,this._completeRedirectFn=l0,this._overrideRedirectResult=i0}async _openPopup(e,n,r,s){var i;xn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await vf(e,n,r,nc(),s);return N0(e,o,_u())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await vf(e,n,r,nc(),s);return jb(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(xn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await b0(e),r=new u0(e);return n.register("authEvent",s=>(de(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(yl,{type:yl},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[yl];o!==void 0&&n(!!o),Vn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=m0(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Wg()||qg()||pu()}}const U0=F0;var Ef="@firebase/auth",If="1.7.9";/**
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
 */class B0{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){de(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function j0(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function q0(t){br(new ir("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;de(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Qg(t)},h=new Eb(r,s,i,c);return bb(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),br(new ir("auth-internal",e=>{const n=mu(e.getProvider("auth").getImmediate());return(r=>new B0(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),rn(Ef,If,j0(t)),rn(Ef,If,"esm2017")}/**
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
 */const H0=5*60,$0=tm("authIdTokenMaxAge")||H0;let Tf=null;const G0=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>$0)return;const s=n==null?void 0:n.token;Tf!==s&&(Tf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function K0(t=Sc()){const e=pa(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Rb(t,{popupRedirectResolver:U0,persistence:[Yb,Fb,r_]}),r=tm("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=G0(i.toString());xb(n,o,()=>o(n.currentUser)),Vb(n,l=>o(l))}}const s=Xp("auth");return s&&Pb(n,`http://${s}`),n}function z0(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Ib({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=an("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",z0().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});q0("Browser");/**
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
 */const u_="firebasestorage.googleapis.com",W0="storageBucket",Q0=2*60*1e3,Y0=10*60*1e3;/**
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
 */class mn extends pn{constructor(e,n,r=0){super(vl(e),`Firebase Storage: ${n} (${vl(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,mn.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return vl(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var fn;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(fn||(fn={}));function vl(t){return"storage/"+t}function J0(){const t="An unknown error occurred, please check the error payload for server response.";return new mn(fn.UNKNOWN,t)}function X0(){return new mn(fn.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Z0(){return new mn(fn.CANCELED,"User canceled the upload/download.")}function eP(t){return new mn(fn.INVALID_URL,"Invalid URL '"+t+"'.")}function tP(t){return new mn(fn.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function wf(t){return new mn(fn.INVALID_ARGUMENT,t)}function h_(){return new mn(fn.APP_DELETED,"The Firebase app was deleted.")}function nP(t){return new mn(fn.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
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
 */class zt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=zt.makeFromUrl(e,n)}catch{return new zt(e,"")}if(r.path==="")return r;throw tP(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(j){j.path.charAt(j.path.length-1)==="/"&&(j.path_=j.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function h(j){j.path_=decodeURIComponent(j.path)}const d="v[A-Za-z0-9_]+",p=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",m=new RegExp(`^https?://${p}/${d}/b/${s}/o${g}`,"i"),P={bucket:1,path:3},C=n===u_?"(?:storage.googleapis.com|storage.cloud.google.com)":n,O="([^?#]*)",$=new RegExp(`^https?://${C}/${s}/${O}`,"i"),H=[{regex:l,indices:c,postModify:i},{regex:m,indices:P,postModify:h},{regex:$,indices:{bucket:1,path:2},postModify:h}];for(let j=0;j<H.length;j++){const te=H[j],le=te.regex.exec(e);if(le){const A=le[te.indices.bucket];let v=le[te.indices.path];v||(v=""),r=new zt(A,v),te.postModify(r);break}}if(r==null)throw eP(e);return r}}class rP{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function sP(t,e,n){let r=1,s=null,i=null,o=!1,l=0;function c(){return l===2}let h=!1;function d(...O){h||(h=!0,e.apply(null,O))}function p(O){s=setTimeout(()=>{s=null,t(m,c())},O)}function g(){i&&clearTimeout(i)}function m(O,...$){if(h){g();return}if(O){g(),d.call(null,O,...$);return}if(c()||o){g(),d.call(null,O,...$);return}r<64&&(r*=2);let H;l===1?(l=2,H=0):H=(r+Math.random())*1e3,p(H)}let P=!1;function C(O){P||(P=!0,g(),!h&&(s!==null?(O||(l=2),clearTimeout(s),p(0)):O||(l=1)))}return p(0),i=setTimeout(()=>{o=!0,C(!0)},n),C}function iP(t){t(!1)}/**
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
 */function oP(t){return t!==void 0}function Af(t,e,n,r){if(r<e)throw wf(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw wf(`Invalid value for '${t}'. Expected ${n} or less.`)}function aP(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var Jo;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Jo||(Jo={}));/**
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
 */function lP(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||s||i}/**
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
 */class cP{constructor(e,n,r,s,i,o,l,c,h,d,p,g=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=c,this.timeout_=h,this.progressCallback_=d,this.connectionFactory_=p,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((m,P)=>{this.resolve_=m,this.reject_=P,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new co(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=l=>{const c=l.loaded,h=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,h)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const l=i.getErrorCode()===Jo.NO_ERROR,c=i.getStatus();if(!l||lP(c,this.additionalRetryCodes_)&&this.retry){const d=i.getErrorCode()===Jo.ABORT;r(!1,new co(!1,null,d));return}const h=this.successCodes_.indexOf(c)!==-1;r(!0,new co(h,i))})},n=(r,s)=>{const i=this.resolve_,o=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());oP(c)?i(c):i()}catch(c){o(c)}else if(l!==null){const c=J0();c.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,c)):o(c)}else if(s.canceled){const c=this.appDelete_?h_():Z0();o(c)}else{const c=X0();o(c)}};this.canceled_?n(!1,new co(!1,null,!0)):this.backoffId_=sP(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&iP(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class co{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function uP(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function hP(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function dP(t,e){e&&(t["X-Firebase-GMPID"]=e)}function fP(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function pP(t,e,n,r,s,i,o=!0){const l=aP(t.urlParams),c=t.url+l,h=Object.assign({},t.headers);return dP(h,e),uP(h,n),hP(h,i),fP(h,r),new cP(c,t.method,h,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o)}/**
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
 */function mP(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function gP(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
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
 */class Xo{constructor(e,n){this._service=e,n instanceof zt?this._location=n:this._location=zt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new Xo(e,n)}get root(){const e=new zt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return gP(this._location.path)}get storage(){return this._service}get parent(){const e=mP(this._location.path);if(e===null)return null;const n=new zt(this._location.bucket,e);return new Xo(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw nP(e)}}function Rf(t,e){const n=e==null?void 0:e[W0];return n==null?null:zt.makeFromBucketSpec(n,t)}function _P(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:nm(s,t.app.options.projectId))}class yP{constructor(e,n,r,s,i){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=u_,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Q0,this._maxUploadRetryTime=Y0,this._requests=new Set,s!=null?this._bucket=zt.makeFromBucketSpec(s,this._host):this._bucket=Rf(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=zt.makeFromBucketSpec(this._url,e):this._bucket=Rf(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Af("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Af("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Xo(this,e)}_makeRequest(e,n,r,s,i=!0){if(this._deleted)return new rP(h_());{const o=pP(e,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const bf="@firebase/storage",Pf="0.13.2";/**
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
 */const d_="storage";function vP(t=Sc(),e){t=Et(t);const r=pa(t,d_).getImmediate({identifier:e}),s=Zp("storage");return s&&EP(r,...s),r}function EP(t,e,n,r={}){_P(t,e,n,r)}function IP(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new yP(n,r,s,e,Or)}function TP(){br(new ir(d_,IP,"PUBLIC").setMultipleInstances(!0)),rn(bf,Pf,""),rn(bf,Pf,"esm2017")}TP();const wP={apiKey:"AIzaSyBVUVyDTnOwMmYR1ybOLYv9i_B19aox1Lg",authDomain:"weresldatabase.firebaseapp.com",projectId:"weresldatabase",storageBucket:"weresldatabase.firebasestorage.app",messagingSenderId:"148662033996",appId:"1:148662033996:web:f9b5ea903b9cc5a24d9ee9"},vu=im(wP);K0(vu);const Bs=SR(vu);vP(vu);const js={PROFILES:"profiles",LOANS:"loans",GRANTS:"grants",PAYMENTS:"payments",PROJECTS:"projects",LOGS:"system_logs"},AP={MAN:"Mannar",COL:"Colombo",BAT:"Batticaloa",GAM:"Gampaha",KAL:"Kalutara",KAN:"Kandy",KUR:"Kurunegala",JAF:"Jaffna",VAV:"Vavuniya",TRI:"Trincomalee",MTR:"Matara",HAM:"Hambantota",MON:"Monaragala",ANU:"Anuradhapura",POL:"Polonnaruwa",PUT:"Puttalam",RAT:"Ratnapura",NUW:"Nuwara Eliya",BAD:"Badulla",KEG:"Kegalle",MUL:"Mullaitivu",MTL:"Matale",AMP:"Ampara",KIL:"Kilinochchi",GAE:"Galle"},RP={Mannar:"MAN",Colombo:"COL",Batticaloa:"BAT",Gampaha:"GAM",Kalutara:"KAL",Kandy:"KAN",Kurunegala:"KUR",Jaffna:"JAF",Vavuniya:"VAV",Trincomalee:"TRI",Matara:"MTR",Hambantota:"HAM",Monaragala:"MON",Anuradhapura:"ANU",Polonnaruwa:"POL",Puttalam:"PUT",Ratnapura:"RAT","Nuwara Eliya":"NUW",Badulla:"BAD",Kegalle:"KEG",Mullaitivu:"MUL",Matale:"MTL",Ampara:"AMP",Kilinochchi:"KIL",Galle:"GAE"},Gt={async getAllProfiles(t={}){try{let e=ef(Bs,js.PROFILES);t.District&&(e=gl(e,nf("District","==",t.District))),t.type&&(e=gl(e)),t.year&&(e=gl(e,nf("createdAt",">=",new Date(t.year,0,1))));const n=await $R(e),r=[];return n.forEach(s=>{var l,c,h,d,p,g,m,P,C,O;const i=s.data(),o={id:s.id,basicInfo:{name:i.Name||((l=i.basicInfo)==null?void 0:l.name)||"N/A",age:i.Age||((c=i.basicInfo)==null?void 0:c.age)||"N/A",District:i.District||((h=i.basicInfo)==null?void 0:h.District)||"N/A",phone:i.contact||((d=i.basicInfo)==null?void 0:d.phone)||"N/A",address:i.Address||((p=i.basicInfo)==null?void 0:p.address)||"N/A",nic:i.NIC||((g=i.basicInfo)==null?void 0:g.nic)||"N/A",totalChildren:i.total_children||((m=i.basicInfo)==null?void 0:m.totalChildren)||0,schoolKids:i.school_kids||((P=i.basicInfo)==null?void 0:P.schoolKids)||0,others:i.others||((C=i.basicInfo)==null?void 0:C.others)||0,occupation:i.Occupation||((O=i.basicInfo)==null?void 0:O.occupation)||"N/A"},loans:i.loans||[],grants:i.grants||[],paymentHistory:i.paymentHistory||[],arms:i.ArmsArray||i.arms||[],Image:i.Image,imageUrl:i.imageUrl,RF_Loan:i.RF_Loan,RF_Paid_History:i.RF_Paid_History,RF_Cur_Prj:i.RF_Cur_Prj,Com_prjs:i.Com_prjs,GRANT:i.GRANT,GIFor:i.GIFor,GRANT_Cur_Prj:i.GRANT_Cur_Prj,Description:i.Description,Reg_ID:i.Reg_ID,contact:i.contact,total_children:i.total_children,school_kids:i.school_kids,others:i.others,createdAt:i.createdAt,updatedAt:i.updatedAt};r.push(o)}),t.type?r.filter(s=>t.type==="RF"?s.RF_Loan||s.RF_Paid_History:t.type==="GRANT"?s.GRANT:t.type==="GIF"?s.GIFor:!0):r}catch(e){throw console.error("Error getting profiles:",e),e}},async getProfileByRegId(t){var e,n,r,s,i,o,l,c,h,d;try{const p=vo(Bs,js.PROFILES,t),g=await HR(p);if(g.exists()){const m=g.data();return{id:g.id,basicInfo:{name:m.Name||((e=m.basicInfo)==null?void 0:e.name)||"N/A",age:m.Age||((n=m.basicInfo)==null?void 0:n.age)||"N/A",District:m.District||((r=m.basicInfo)==null?void 0:r.District)||"N/A",phone:m.contact||((s=m.basicInfo)==null?void 0:s.phone)||"N/A",address:m.Address||((i=m.basicInfo)==null?void 0:i.address)||"N/A",nic:m.NIC||((o=m.basicInfo)==null?void 0:o.nic)||"N/A",totalChildren:m.total_children||((l=m.basicInfo)==null?void 0:l.totalChildren)||0,schoolKids:m.school_kids||((c=m.basicInfo)==null?void 0:c.schoolKids)||0,others:m.others||((h=m.basicInfo)==null?void 0:h.others)||0,occupation:m.Occupation||((d=m.basicInfo)==null?void 0:d.occupation)||"N/A"},loans:m.loans||[],grants:m.grants||[],paymentHistory:m.paymentHistory||[],arms:m.ArmsArray||m.arms||[],Image:m.Image,imageUrl:m.imageUrl,RF_Loan:m.RF_Loan,RF_Paid_History:m.RF_Paid_History,RF_Cur_Prj:m.RF_Cur_Prj,Com_prjs:m.Com_prjs,GRANT:m.GRANT,GIFor:m.GIFor,GRANT_Cur_Prj:m.GRANT_Cur_Prj,Description:m.Description,Reg_ID:m.Reg_ID,contact:m.contact,total_children:m.total_children,school_kids:m.school_kids,others:m.others,createdAt:m.createdAt,updatedAt:m.updatedAt}}else return null}catch(p){throw console.error("Error getting profile:",p),p}},async createProfile(t){try{const e=t.regId,n=vo(Bs,js.PROFILES,e),r={basicInfo:t.basicInfo,loans:t.loans||[],grants:t.grants||[],paymentHistory:t.paymentHistory||[],arms:t.arms||[],imageUrl:t.imageUrl||"",meta:{createdAt:Us(),updatedAt:Us()}};return await GR(n,r),e}catch(e){throw console.error("Error creating profile:",e),e}},async updateProfile(t,e){try{const n=vo(Bs,js.PROFILES,t),r={...e,meta:{updatedAt:Us()}};return await KR(n,r),t}catch(n){throw console.error("Error updating profile:",n),n}},async addLoan(t,e){try{const n=await this.getProfileByRegId(t);if(!n)throw new Error("Profile not found");const r={id:Date.now().toString(),type:e.type,amount:e.amount,purpose:e.purpose,date:e.date,status:"active",...e},s=[...n.loans,r];return await this.updateProfile(t,{loans:s}),r}catch(n){throw console.error("Error adding loan:",n),n}},async processPayment(t){try{const{regId:e,type:n,amount:r,details:s,date:i}=t,o=await this.getProfileByRegId(e);if(!o)throw new Error("Profile not found");const l={id:Date.now().toString(),type:n,amount:parseFloat(r)||0,details:s,date:i||new Date,timestamp:Us()},c=[...o.paymentHistory,l];if(n==="RF")return await this.processRFPayment(o,l);if(n==="GRANT")return await this.processGrantPayment(o,l)}catch(e){throw console.error("Error processing payment:",e),e}},async processRFPayment(t,e){const{amount:n}=e;let r=n;const s=[],i=[];for(const c of t.loans.filter(h=>h.status==="active"))if(r>0){const h=c.amount-(c.paidAmount||0);if(h<=r)i.push({...c,paidAmount:c.amount,status:"completed",completedDate:new Date}),r-=h;else{const d=(c.paidAmount||0)+r;s.push({...c,paidAmount:d}),r=0}}else s.push(c);const o=[...s,...i],l=[...t.paymentHistory,e];return await this.updateProfile(t.id,{loans:o,paymentHistory:l}),{...t,loans:o,paymentHistory:l}},async processGrantPayment(t,e){const n=[...t.paymentHistory,e];return await this.updateProfile(t.id,{paymentHistory:n}),{...t,paymentHistory:n}},async getAnalyticsData(){try{const t=await this.getAllProfiles(),e={totalProfiles:t.length,totalLoans:t.reduce((s,i)=>s+i.loans.length,0),totalGrants:t.reduce((s,i)=>s+i.grants.length,0),totalAmount:t.reduce((s,i)=>{const o=i.loans.reduce((c,h)=>c+(h.amount||0),0),l=i.grants.reduce((c,h)=>c+(h.amount||0),0);return s+o+l},0)},n={};t.forEach(s=>{var o;const i=((o=s.basicInfo)==null?void 0:o.District)||"Unknown";n[i]=(n[i]||0)+1});const r={};return t.forEach(s=>{var o,l;const i=new Date((l=(o=s.meta)==null?void 0:o.createdAt)==null?void 0:l.toDate()).getFullYear();r[i]=(r[i]||0)+1}),{stats:e,districtStats:n,yearStats:r}}catch(t){throw console.error("Error getting analytics:",t),t}},async logOperation(t,e,n="info"){try{const r={operation:t,details:e,level:n,timestamp:Us(),userId:"system"};await zR(ef(Bs,js.LOGS),r)}catch(r){console.error("Error logging operation:",r)}}},Sf={getDistrictFromRegID(t){const e=t.substring(0,3).toUpperCase();return AP[e]||"Unknown"},getDistrictCodeFromName(t){return RP[t]||"UNK"},generateRegId(t,e=[]){const n=this.getDistrictCodeFromName(t);let r=1;for(;;){const s=`${n}${r.toString().padStart(3,"0")}`;if(!e.includes(s))return s;r++}}},bP={async uploadFile(t,e){const n=Date.now(),r=`${e}_${n}.jpg`;return console.log("Google Drive upload (fallback) for:",e,r),`https://drive.google.com/file/d/placeholder_${r}/view`},async deleteFile(t){return console.log("Google Drive delete (fallback) for:",t),!0},extractFileId(t){const e=t.match(/\/d\/(.+?)(\/|$)/)||t.match(/id=([^&]+)/);return e?e[1]:null}},Cf={async uploadImage(t,e){try{const n=await this.processImage(t);return await bP.uploadFile(n,e)}catch(n){throw console.error("Error uploading image:",n),n}},async processImage(t){return new Promise((e,n)=>{const r=document.createElement("canvas"),s=r.getContext("2d"),i=new Image;i.onload=()=>{let{width:l,height:c}=i;l>c?l>800&&(c=c*800/l,l=800):c>800&&(l=l*800/c,c=800),r.width=l,r.height=c,s.drawImage(i,0,0,l,c),r.toBlob(h=>{e(h)},"image/jpeg",.8)},i.onerror=n,t.type==="image/heic"||t.type==="image/heif"?this.convertHeicToJpeg(t).then(e).catch(n):i.src=URL.createObjectURL(t)})},async convertHeicToJpeg(t){return t},async uploadToGoogleDrive(t,e){try{return console.log("Google Drive upload would happen here for:",e),"https://drive.google.com/file/d/placeholder/view"}catch(n){throw console.error("Error uploading to Google Drive:",n),n}},async deleteImage(t){try{console.log("Google Drive delete would happen here for:",t)}catch(e){throw console.error("Error deleting image:",e),e}},async getImageUrl(t){try{return t}catch(e){throw console.error("Error getting image URL:",e),e}},extractFileId(t){const e=t.match(/\/d\/(.+?)(\/|$)/)||t.match(/id=([^&]+)/);return e?e[1]:null}},bn={async getProfiles(t={}){try{return(await Gt.getAllProfiles(t)).map(n=>({...n,computed:this.computeProfileStats(n)}))}catch(e){throw console.error("Error getting profiles:",e),e}},async getProfile(t){try{const e=await Gt.getProfileByRegId(t);return e?{...e,computed:this.computeProfileStats(e)}:null}catch(e){throw console.error("Error getting profile:",e),e}},async createProfile(t){try{if(!t.regId){const r=(await Gt.getAllProfiles()).map(s=>s.id);t.regId=Sf.generateRegId(t.basicInfo.District,r)}if(t.imageFile){const n=await Cf.uploadImage(t.imageFile,t.regId);t.imageUrl=n}const e=await Gt.createProfile(t);return await Gt.logOperation("CREATE_PROFILE",{regId:e,basicInfo:t.basicInfo}),e}catch(e){throw console.error("Error creating profile:",e),e}},async updateProfile(t,e){try{if(e.imageFile){const n=await Cf.uploadImage(e.imageFile,t);e.imageUrl=n,delete e.imageFile}return await Gt.updateProfile(t,e),await Gt.logOperation("UPDATE_PROFILE",{regId:t,updates:e}),t}catch(n){throw console.error("Error updating profile:",n),n}},async addLoan(t,e){try{const n=await Gt.addLoan(t,e);return await Gt.logOperation("ADD_LOAN",{regId:t,loan:n}),n}catch(n){throw console.error("Error adding loan:",n),n}},async processPayment(t){try{const e=await Gt.processPayment(t);return await Gt.logOperation("PROCESS_PAYMENT",{regId:t.regId,payment:t}),e}catch(e){throw console.error("Error processing payment:",e),e}},computeProfileStats(t){var c,h;const e=((c=t.loans)==null?void 0:c.filter(d=>d.status==="active"))||[],n=((h=t.loans)==null?void 0:h.filter(d=>d.status==="completed"))||[],r=t.grants||[],s=t.paymentHistory||[];let i=e.reduce((d,p)=>d+(p.amount||0),0);t.RF_Loan&&!i&&(i=parseFloat(t.RF_Loan)||0);let o=r.reduce((d,p)=>d+(p.amount||0),0);t.GRANT&&!o&&(o=parseFloat(t.GRANT)||0);let l=s.reduce((d,p)=>d+(p.amount||0),0);return t.RF_Paid_History&&!l&&(l=parseFloat(t.RF_Paid_History)||0),{activeLoansCount:e.length||(t.RF_Loan?1:0),completedLoansCount:n.length,grantsCount:r.length||(t.GRANT?1:0),totalLoanAmount:i,totalGrantAmount:o,totalPaidAmount:l,remainingLoanAmount:i-l,district:Sf.getDistrictFromRegID(t.id)}},getProfileTypes(t){var n,r,s;const e=[];return((n=t.loans)!=null&&n.some(i=>i.type==="RF")||t.RF_Loan)&&e.push("RF"),(((r=t.grants)==null?void 0:r.length)>0||t.GRANT)&&e.push("GRANT"),((s=t.loans)!=null&&s.some(i=>i.type==="GIF")||t.GIFor)&&e.push("GIF"),e},validateProfileData(t){var n,r,s;const e=[];return(n=t.basicInfo)!=null&&n.name||e.push("Name is required"),(r=t.basicInfo)!=null&&r.District||e.push("District is required"),(!((s=t.basicInfo)!=null&&s.age)||t.basicInfo.age<0)&&e.push("Valid age is required"),e},validateLoanData(t){const e=[];return(!t.type||!["RF","GRANT","GIF"].includes(t.type))&&e.push("Valid loan type is required"),(!t.amount||t.amount<=0)&&e.push("Valid amount is required"),t.purpose||e.push("Purpose is required"),e},validatePaymentData(t){const e=[];return t.regId||e.push("RegID is required"),(!t.type||!["RF","GRANT"].includes(t.type))&&e.push("Valid payment type is required"),t.type==="RF"&&(!t.amount||t.amount<=0)&&e.push("Valid amount is required for RF payments"),t.type==="GRANT"&&!t.details&&e.push("Details are required for GRANT payments"),e}},PP={async getLogoImage(){try{const t="1AEEWccjf_sMoXJgAaYIPZZm5rM-OCFe2";return`https://drive.google.com/thumbnail?id=${t}&sz=w400`}catch(t){return console.error("Error fetching logo:",t),"/placeholder-logo.png"}},async getProfileImage(t){try{return`https://drive.google.com/uc?export=view&id=${t}`}catch(e){return console.error("Error fetching profile image:",e),"/placeholder-profile.jpg"}},async getProfileImageWithFallback(t,e=null){try{let n=null;if(e&&(n=this.extractFileId(e),console.log("Extracted file ID from URL:",n)),!n&&t&&(n=this.extractFileId(t)||t,console.log("Using regId as file ID:",n)),n){const r=[`https://drive.google.com/thumbnail?id=${n}&sz=w300`,`https://drive.google.com/uc?export=view&id=${n}`,`https://drive.google.com/thumbnail?id=${n}&sz=w400`,`https://drive.google.com/thumbnail?id=${n}&sz=w200`];return console.log("Trying URL formats for file ID:",n),console.log("URL formats:",r),r[0]}return"/placeholder-profile.jpg"}catch(n){return console.error("Error fetching profile image with fallback:",n),"/placeholder-profile.jpg"}},async getAllImages(){try{return[{id:"logo",name:"WERESL Logo",url:"https://drive.google.com/uc?export=view&id=YOUR_LOGO_FILE_ID",type:"logo"},{id:"placeholder",name:"Profile Placeholder",url:"/placeholder-profile.jpg",type:"profile"}]}catch(t){return console.error("Error fetching images:",t),[]}},extractFileId(t){if(!t)return null;const e=t.match(/[-\w]{25,}/);return e?e[0]:null},convertToDirectUrl(t){const e=this.extractFileId(t);return e?`https://drive.google.com/uc?export=view&id=${e}`:t},getPlaceholderImages(){return{logo:"/placeholder-logo.png",profile:"/placeholder-profile.jpg",logoText:"WERESL"}},async testImageUrl(t){if(t.includes("drive.google.com"))return!0;try{return(await fetch(t,{method:"HEAD"})).ok}catch{return!1}}},SP={name:"ProfileCard",props:{profile:{type:Object,required:!0}},emits:["open-modal"],setup(t,{emit:e}){const n="https://drive.google.com/file/d/1ZgXsSuEMpzHS4as_wZ3ZRyR5Mpw9an05/view?usp=sharing",r=Ne(n),s=Ne(!0),i=Ne(0),o=Ne([]),l=Ct(()=>bn.getProfileTypes(t.profile)),c=m=>m?new Intl.NumberFormat("en-IN").format(m):"0",h=m=>{if(console.log("Image failed to load for profile:",t.profile.id),i.value<o.value.length-1){i.value++;const P=o.value[i.value];console.log("Trying next URL format:",P),m.target.src=P;return}console.log("All URL formats failed, using placeholder"),m.target.src=n,s.value=!1},d=()=>{s.value=!1},p=async()=>{try{if(await new Promise(P=>setTimeout(P,0)),!t.profile||!t.profile.id){console.log("Profile or profile.id is null/undefined:",t.profile),r.value=n;return}let m=null;if(t.profile.Image){const P=t.profile.Image.match(/[-\w]{25,}/);P&&(m=P[0],console.log("Extracted file ID from Image URL:",m))}if(!m){console.log("No Image URL found for profile:",t.profile.id),r.value=n;return}o.value=[`https://drive.google.com/thumbnail?id=${m}&sz=w300`,`https://drive.google.com/uc?export=view&id=${m}`,`https://drive.google.com/thumbnail?id=${m}&sz=w400`,`https://drive.google.com/thumbnail?id=${m}&sz=w200`],console.log("Generated URL formats for profile:",t.profile.id,o.value),i.value=0,r.value=o.value[0]}catch(m){console.error("Error loading profile image:",m),r.value=n}};return la(()=>{p()}),Ir(()=>t.profile,m=>{m&&m.id&&p()},{immediate:!0}),{profileImageUrl:r,imageLoading:s,profileTypes:l,formatAmount:c,handleImageError:h,handleImageLoad:d,openModal:()=>{e("open-modal",t.profile)}}}},CP=["src","alt"],DP={class:"profile-header"},kP={class:"profile-types"},NP={class:"profile-info"},OP={key:0,class:"profile-stats"};function VP(t,e,n,r,s,i){var o,l,c,h,d;return n.profile?(oe(),ce("div",{key:0,class:"profile-box",onClick:e[2]||(e[2]=(...p)=>r.openModal&&r.openModal(...p))},[E("img",{src:r.profileImageUrl,alt:((o=n.profile.basicInfo)==null?void 0:o.name)||"Profile Image",onError:e[0]||(e[0]=(...p)=>r.handleImageError&&r.handleImageError(...p)),onLoad:e[1]||(e[1]=(...p)=>r.handleImageLoad&&r.handleImageLoad(...p))},null,40,CP),E("div",DP,[E("h3",null,ne(((l=n.profile.basicInfo)==null?void 0:l.name)||"Unknown"),1),E("div",kP,[(oe(!0),ce(We,null,Kt(r.profileTypes,p=>(oe(),ce("span",{key:p,class:Rr(`profile-type ${p.toLowerCase()}-type`)},ne(p),3))),128))])]),E("div",NP,[E("p",null,[e[3]||(e[3]=E("strong",null,"RegID:",-1)),Ee(" "+ne(n.profile.id),1)]),E("p",null,[e[4]||(e[4]=E("strong",null,"Age:",-1)),Ee(" "+ne(((c=n.profile.basicInfo)==null?void 0:c.age)||"N/A"),1)]),E("p",null,[e[5]||(e[5]=E("strong",null,"District:",-1)),Ee(" "+ne(((h=n.profile.basicInfo)==null?void 0:h.District)||"N/A"),1)]),E("p",null,[e[6]||(e[6]=E("strong",null,"Phone:",-1)),Ee(" "+ne(((d=n.profile.basicInfo)==null?void 0:d.phone)||"N/A"),1)])]),n.profile.computed?(oe(),ce("div",OP,[E("p",null,[e[7]||(e[7]=E("strong",null,"Active Loans:",-1)),Ee(" "+ne(n.profile.computed.activeLoansCount),1)]),E("p",null,[e[8]||(e[8]=E("strong",null,"Total Loan Amount:",-1)),Ee(" Rs. "+ne(r.formatAmount(n.profile.computed.totalLoanAmount)),1)]),E("p",null,[e[9]||(e[9]=E("strong",null,"Remaining:",-1)),Ee(" Rs. "+ne(r.formatAmount(n.profile.computed.remainingLoanAmount)),1)])])):$e("",!0)])):$e("",!0)}const xP=ms(SP,[["render",VP],["__scopeId","data-v-0ce83d2d"]]),LP={name:"ProfileModal",props:{profile:{type:Object,required:!0},isVisible:{type:Boolean,default:!1}},emits:["close"],setup(t,{emit:e}){const n=Ne("/placeholder-profile.jpg"),r=Ne(!0),s=Ne(0),i=Ne([]),o=Ct(()=>bn.getProfileTypes(t.profile)),l=m=>m?new Intl.NumberFormat("en-IN").format(m):"0",c=m=>m?new Date(m).toLocaleDateString("en-IN"):"N/A",h=m=>{if(console.log("Image failed to load for profile:",t.profile.id),s.value<i.value.length-1){s.value++;const P=i.value[s.value];console.log("Trying next URL format:",P),m.target.src=P;return}console.log("All URL formats failed, using placeholder"),m.target.src="/placeholder-profile.jpg",r.value=!1},d=()=>{r.value=!1},p=async()=>{try{if(await new Promise(P=>setTimeout(P,0)),!t.profile||!t.profile.id){console.log("Profile or profile.id is null/undefined:",t.profile),n.value="/placeholder-profile.jpg";return}let m=null;if(t.profile.Image){const P=t.profile.Image.match(/[-\w]{25,}/);P&&(m=P[0],console.log("Extracted file ID from Image URL:",m))}if(!m){console.log("No Image URL found for profile:",t.profile.id),n.value="/placeholder-profile.jpg";return}i.value=[`https://drive.google.com/thumbnail?id=${m}&sz=w300`,`https://drive.google.com/uc?export=view&id=${m}`,`https://drive.google.com/thumbnail?id=${m}&sz=w400`,`https://drive.google.com/thumbnail?id=${m}&sz=w200`],console.log("Generated URL formats for profile:",t.profile.id,i.value),s.value=0,n.value=i.value[0]}catch(m){console.error("Error loading profile image:",m),n.value="/placeholder-profile.jpg"}};return la(()=>{p()}),Ir(()=>t.profile.id,()=>{p()}),{profileImageUrl:n,imageLoading:r,profileTypes:o,formatAmount:l,formatDate:c,handleImageError:h,handleImageLoad:d,closeModal:()=>{e("close")}}}},MP={class:"modal-header"},FP={class:"profile-types"},UP={class:"modal-body"},BP={class:"profile-image-section"},jP=["src","alt"],qP={class:"basic-info"},HP={class:"info-grid"},$P={class:"info-item"},GP={class:"info-item"},KP={class:"info-item"},zP={class:"info-item"},WP={class:"info-item"},QP={class:"info-item"},YP={class:"info-item"},JP={class:"info-item"},XP={key:0,class:"loans-section"},ZP={class:"loan-list"},eS={class:"loan-header"},tS={class:"loan-type"},nS={class:"loan-amount"},rS={class:"loan-details"},sS={key:0},iS={key:1,class:"grants-section"},oS={class:"grant-list"},aS={class:"grant-header"},lS={class:"grant-amount"},cS={class:"grant-details"},uS={key:2,class:"payments-section"},hS={class:"payment-list"},dS={class:"payment-header"},fS={class:"payment-type"},pS={class:"payment-amount"},mS={class:"payment-details"},gS={key:0},_S={key:3,class:"arms-section"},yS={class:"arms-list"},vS={key:4,class:"stats-section"},ES={class:"stats-grid"},IS={class:"stat-item"},TS={class:"stat-item"},wS={class:"stat-item"},AS={class:"stat-item"},RS={class:"stat-item"},bS={class:"stat-item"},PS={class:"stat-item"};function SS(t,e,n,r,s,i){var o,l,c,h,d,p,g,m,P;return n.isVisible&&n.profile?(oe(),ce("div",{key:0,class:"modal",onClick:e[4]||(e[4]=(...C)=>r.closeModal&&r.closeModal(...C))},[E("div",{class:"modal-content",onClick:e[3]||(e[3]=wc(()=>{},["stop"]))},[E("div",{class:"close-button",onClick:e[0]||(e[0]=(...C)=>r.closeModal&&r.closeModal(...C))},"×"),E("div",MP,[E("h2",null,ne(((o=n.profile.basicInfo)==null?void 0:o.name)||"Unknown"),1),E("div",FP,[(oe(!0),ce(We,null,Kt(r.profileTypes,C=>(oe(),ce("span",{key:C,class:Rr(`profile-type ${C.toLowerCase()}-type`)},ne(C),3))),128))])]),E("div",UP,[E("div",BP,[E("img",{src:r.profileImageUrl,alt:((l=n.profile.basicInfo)==null?void 0:l.name)||"Profile Image",onError:e[1]||(e[1]=(...C)=>r.handleImageError&&r.handleImageError(...C)),onLoad:e[2]||(e[2]=(...C)=>r.handleImageLoad&&r.handleImageLoad(...C)),class:"profile-image"},null,40,jP)]),E("div",qP,[e[13]||(e[13]=E("h3",null,"Basic Information",-1)),E("div",HP,[E("div",$P,[e[5]||(e[5]=E("strong",null,"RegID:",-1)),Ee(" "+ne(n.profile.id),1)]),E("div",GP,[e[6]||(e[6]=E("strong",null,"Name:",-1)),Ee(" "+ne(((c=n.profile.basicInfo)==null?void 0:c.name)||"N/A"),1)]),E("div",KP,[e[7]||(e[7]=E("strong",null,"Age:",-1)),Ee(" "+ne(((h=n.profile.basicInfo)==null?void 0:h.age)||"N/A"),1)]),E("div",zP,[e[8]||(e[8]=E("strong",null,"District:",-1)),Ee(" "+ne(((d=n.profile.basicInfo)==null?void 0:d.District)||"N/A"),1)]),E("div",WP,[e[9]||(e[9]=E("strong",null,"Phone:",-1)),Ee(" "+ne(((p=n.profile.basicInfo)==null?void 0:p.phone)||"N/A"),1)]),E("div",QP,[e[10]||(e[10]=E("strong",null,"Address:",-1)),Ee(" "+ne(((g=n.profile.basicInfo)==null?void 0:g.address)||"N/A"),1)]),E("div",YP,[e[11]||(e[11]=E("strong",null,"NIC:",-1)),Ee(" "+ne(((m=n.profile.basicInfo)==null?void 0:m.nic)||"N/A"),1)]),E("div",JP,[e[12]||(e[12]=E("strong",null,"Total Children:",-1)),Ee(" "+ne(((P=n.profile.basicInfo)==null?void 0:P.totalChildren)||"N/A"),1)])])]),n.profile.loans&&n.profile.loans.length>0?(oe(),ce("div",XP,[e[18]||(e[18]=E("h3",null,"Loans",-1)),E("div",ZP,[(oe(!0),ce(We,null,Kt(n.profile.loans,C=>(oe(),ce("div",{key:C.id,class:"loan-item"},[E("div",eS,[E("span",tS,ne(C.type),1),E("span",nS,"Rs. "+ne(r.formatAmount(C.amount)),1)]),E("div",rS,[E("p",null,[e[14]||(e[14]=E("strong",null,"Purpose:",-1)),Ee(" "+ne(C.purpose),1)]),E("p",null,[e[15]||(e[15]=E("strong",null,"Date:",-1)),Ee(" "+ne(r.formatDate(C.date)),1)]),E("p",null,[e[16]||(e[16]=E("strong",null,"Status:",-1)),E("span",{class:Rr(`status-${C.status}`)},ne(C.status),3)]),C.paidAmount?(oe(),ce("p",sS,[e[17]||(e[17]=E("strong",null,"Paid:",-1)),Ee(" Rs. "+ne(r.formatAmount(C.paidAmount)),1)])):$e("",!0)])]))),128))])])):$e("",!0),n.profile.grants&&n.profile.grants.length>0?(oe(),ce("div",iS,[e[21]||(e[21]=E("h3",null,"Grants",-1)),E("div",oS,[(oe(!0),ce(We,null,Kt(n.profile.grants,C=>(oe(),ce("div",{key:C.id,class:"grant-item"},[E("div",aS,[E("span",lS,"Rs. "+ne(r.formatAmount(C.amount)),1)]),E("div",cS,[E("p",null,[e[19]||(e[19]=E("strong",null,"Purpose:",-1)),Ee(" "+ne(C.purpose),1)]),E("p",null,[e[20]||(e[20]=E("strong",null,"Date:",-1)),Ee(" "+ne(r.formatDate(C.date)),1)])])]))),128))])])):$e("",!0),n.profile.paymentHistory&&n.profile.paymentHistory.length>0?(oe(),ce("div",uS,[e[24]||(e[24]=E("h3",null,"Payment History",-1)),E("div",hS,[(oe(!0),ce(We,null,Kt(n.profile.paymentHistory,C=>(oe(),ce("div",{key:C.id,class:"payment-item"},[E("div",dS,[E("span",fS,ne(C.type),1),E("span",pS,"Rs. "+ne(r.formatAmount(C.amount)),1)]),E("div",mS,[C.details?(oe(),ce("p",gS,[e[22]||(e[22]=E("strong",null,"Details:",-1)),Ee(" "+ne(C.details),1)])):$e("",!0),E("p",null,[e[23]||(e[23]=E("strong",null,"Date:",-1)),Ee(" "+ne(r.formatDate(C.date)),1)])])]))),128))])])):$e("",!0),n.profile.arms&&n.profile.arms.length>0?(oe(),ce("div",_S,[e[25]||(e[25]=E("h3",null,"Projects (ARMS)",-1)),E("div",yS,[(oe(!0),ce(We,null,Kt(n.profile.arms,C=>(oe(),ce("div",{key:C,class:"arm-item"},ne(C),1))),128))])])):$e("",!0),n.profile.computed?(oe(),ce("div",vS,[e[33]||(e[33]=E("h3",null,"Summary Statistics",-1)),E("div",ES,[E("div",IS,[e[26]||(e[26]=E("strong",null,"Active Loans:",-1)),Ee(" "+ne(n.profile.computed.activeLoansCount),1)]),E("div",TS,[e[27]||(e[27]=E("strong",null,"Completed Loans:",-1)),Ee(" "+ne(n.profile.computed.completedLoansCount),1)]),E("div",wS,[e[28]||(e[28]=E("strong",null,"Grants:",-1)),Ee(" "+ne(n.profile.computed.grantsCount),1)]),E("div",AS,[e[29]||(e[29]=E("strong",null,"Total Loan Amount:",-1)),Ee(" Rs. "+ne(r.formatAmount(n.profile.computed.totalLoanAmount)),1)]),E("div",RS,[e[30]||(e[30]=E("strong",null,"Total Grant Amount:",-1)),Ee(" Rs. "+ne(r.formatAmount(n.profile.computed.totalGrantAmount)),1)]),E("div",bS,[e[31]||(e[31]=E("strong",null,"Total Paid:",-1)),Ee(" Rs. "+ne(r.formatAmount(n.profile.computed.totalPaidAmount)),1)]),E("div",PS,[e[32]||(e[32]=E("strong",null,"Remaining Loan:",-1)),Ee(" Rs. "+ne(r.formatAmount(n.profile.computed.remainingLoanAmount)),1)])])])):$e("",!0)])])])):$e("",!0)}const CS=ms(LP,[["render",SS],["__scopeId","data-v-54a6d46e"]]),DS={name:"HomePage",components:{ProfileCard:xP,ProfileModal:CS},setup(){const t=Ne("profiles"),e=Ne([]),n=Ne(!1),r=Ne(null),s=Ne(!1),i=Ne(null),o=Ne(!1),l=Ne(0),c=Ne([]),h=Ne(null),d=async()=>{try{h.value=await PP.getLogoImage()}catch(te){console.error("Error loading logo:",te),h.value="/placeholder-logo.png"}},p=Nr({District:"",type:"",year:""}),g=["Ampara","Anuradhapura","Badulla","Batticaloa","Colombo","Galle","Gampaha","Hambantota","Jaffna","Kalutara","Kandy","Kegalle","Kilinochchi","Kurunegala","Mannar","Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya","Polonnaruwa","Puttalam","Ratnapura","Trincomalee","Vavuniya"],m=Ct(()=>{const te=new Date().getFullYear(),le=[];for(let A=te;A>=2020;A--)le.push(A);return le}),P=async()=>{n.value=!0,r.value=null;try{const te=await bn.getProfiles(p);console.log("Loaded profiles:",te),e.value=te.filter(le=>!le||!le.id?(console.warn("Found invalid profile:",le),!1):!0),console.log("Filtered profiles:",e.value)}catch(te){r.value="Failed to load profiles: "+te.message}finally{n.value=!1}},C=te=>{i.value=te,s.value=!0},O=()=>{s.value=!1,i.value=null},$=()=>{l.value++,l.value>=3&&(o.value=!0,l.value=0,q())},q=async()=>{try{c.value=[{id:1,level:"info",details:"System initialized",timestamp:new Date},{id:2,level:"info",details:"Profiles loaded",timestamp:new Date}]}catch(te){console.error("Error loading system logs:",te)}},H=te=>new Date(te).toLocaleString(),j=()=>{h.value="/placeholder-logo.png"};return la(()=>{P(),d()}),{currentView:t,profiles:e,loading:n,error:r,filters:p,districts:g,years:m,showModal:s,selectedProfile:i,showDevTools:o,systemLogs:c,logoClickCount:l,logoUrl:h,loadProfiles:P,loadLogo:d,openProfileModal:C,closeProfileModal:O,handleLogoClick:$,handleLogoError:j,formatDate:H}}},kS={class:"home-page"},NS={class:"header-container"},OS={class:"logo-container"},VS=["src"],xS={class:"view-toggle"},LS={key:0,class:"profiles-view"},MS={class:"filters"},FS=["value"],US=["value"],BS={key:0,class:"loading"},jS={key:1,class:"error"},qS={key:2,class:"profile-container"},HS={key:1,class:"dev-tools-modal"},$S={class:"dev-tools-content"},GS={class:"dev-tools-header"},KS={class:"dev-tools-body"},zS={class:"raw-data"},WS={class:"system-logs"},QS={class:"log-level"},YS={class:"log-message"},JS={class:"log-time"};function XS(t,e,n,r,s,i){const o=Rl("ProfileCard"),l=Rl("ProfileModal");return oe(),ce("div",kS,[E("div",NS,[E("div",OS,[E("img",{src:r.logoUrl||"/placeholder-logo.png",alt:"WERESL Logo",class:"logo",onClick:e[0]||(e[0]=(...c)=>r.handleLogoClick&&r.handleLogoClick(...c)),onError:e[1]||(e[1]=(...c)=>r.handleLogoError&&r.handleLogoError(...c))},null,40,VS)])]),e[16]||(e[16]=E("h1",null,"WERESL Database",-1)),E("div",xS,[E("button",{class:Rr(["view-btn",{active:r.currentView==="profiles"}]),onClick:e[2]||(e[2]=c=>r.currentView="profiles")}," Profiles ",2)]),r.currentView==="profiles"?(oe(),ce("div",LS,[E("div",MS,[je(E("select",{"onUpdate:modelValue":e[3]||(e[3]=c=>r.filters.District=c),onChange:e[4]||(e[4]=(...c)=>r.loadProfiles&&r.loadProfiles(...c))},[e[10]||(e[10]=E("option",{value:""},"All Districts",-1)),(oe(!0),ce(We,null,Kt(r.districts,c=>(oe(),ce("option",{key:c,value:c},ne(c),9,FS))),128))],544),[[Tr,r.filters.District]]),je(E("select",{"onUpdate:modelValue":e[5]||(e[5]=c=>r.filters.type=c),onChange:e[6]||(e[6]=(...c)=>r.loadProfiles&&r.loadProfiles(...c))},e[11]||(e[11]=[E("option",{value:""},"All Types",-1),E("option",{value:"RF"},"RF",-1),E("option",{value:"GRANT"},"GRANT",-1),E("option",{value:"GIF"},"GIF",-1)]),544),[[Tr,r.filters.type]]),je(E("select",{"onUpdate:modelValue":e[7]||(e[7]=c=>r.filters.year=c),onChange:e[8]||(e[8]=(...c)=>r.loadProfiles&&r.loadProfiles(...c))},[e[12]||(e[12]=E("option",{value:""},"All Years",-1)),(oe(!0),ce(We,null,Kt(r.years,c=>(oe(),ce("option",{key:c,value:c},ne(c),9,US))),128))],544),[[Tr,r.filters.year]])]),r.loading?(oe(),ce("div",BS," Loading profiles... ")):r.error?(oe(),ce("div",jS,ne(r.error),1)):(oe(),ce("div",qS,[(oe(!0),ce(We,null,Kt(r.profiles.filter(c=>c&&c.id),c=>(oe(),Dp(o,{key:c.id,profile:c,onOpenModal:r.openProfileModal},null,8,["profile","onOpenModal"]))),128))]))])):$e("",!0),Rt(l,{profile:r.selectedProfile,"is-visible":r.showModal,onClose:r.closeProfileModal},null,8,["profile","is-visible","onClose"]),r.showDevTools?(oe(),ce("div",HS,[E("div",$S,[E("div",GS,[e[13]||(e[13]=E("h3",null,"Developer Tools",-1)),E("button",{onClick:e[9]||(e[9]=c=>r.showDevTools=!1),class:"close-btn"},"×")]),E("div",KS,[E("div",zS,[e[14]||(e[14]=E("h4",null,"Raw Firebase Data",-1)),E("pre",null,ne(JSON.stringify(r.profiles,null,2)),1)]),E("div",WS,[e[15]||(e[15]=E("h4",null,"System Logs",-1)),(oe(!0),ce(We,null,Kt(r.systemLogs,c=>(oe(),ce("div",{key:c.id,class:"log-entry"},[E("span",QS,ne(c.level),1),E("span",YS,ne(c.details),1),E("span",JS,ne(r.formatDate(c.timestamp)),1)]))),128))])])])])):$e("",!0),e[17]||(e[17]=E("div",{class:"footer"},[E("p",null,"WERESL Database Management System")],-1))])}const ZS=ms(DS,[["render",XS],["__scopeId","data-v-b29be653"]]),eC={name:"LoanInitForm",setup(){const t=Ne(!1),e=Ne(null),n=Ne(null),r=Ne(null),s=["Mannar","Colombo","Batticaloa","Gampaha","Kalutara","Kandy","Kurunegala","Jaffna","Vavuniya","Trincomalee","Matara","Hambantota","Monaragala","Anuradhapura","Polonnaruwa","Puttalam","Ratnapura","Nuwara Eliya","Badulla","Kegalle","Mullaitivu","Matale","Ampara","Kilinochchi","Galle"],i=Nr({registered:"",regId:"",basicInfo:{name:"",age:"",nic:"",phone:"",District:"",address:"",totalChildren:"",schoolKids:""},description:"",industry:"",loanType:"",amount:"",purpose:"",imageFile:null}),o=d=>{const p=d.target.files[0];if(p){i.imageFile=p;const g=new FileReader;g.onload=m=>{r.value=m.target.result},g.readAsDataURL(p)}},l=()=>{const d=[];if(i.registered==="Yes"&&!i.regId&&d.push("Registration ID is required for registered users"),i.registered==="No"){const g=bn.validateProfileData({basicInfo:i.basicInfo});d.push(...g)}const p=bn.validateLoanData({type:i.loanType,amount:i.amount,purpose:i.purpose});return d.push(...p),d},c=async()=>{e.value=null,n.value=null;const d=l();if(d.length>0){e.value=d.join(", ");return}t.value=!0;try{const p={type:i.loanType,amount:parseFloat(i.amount),purpose:i.purpose,date:new Date};if(i.registered==="Yes")await bn.addLoan(i.regId,p),n.value=`Loan added successfully to profile ${i.regId}`;else{const g={basicInfo:i.basicInfo,loans:[p],imageFile:i.imageFile},m=await bn.createProfile(g);n.value=`New profile created successfully with RegID: ${m}`}h()}catch(p){e.value="Failed to process loan: "+p.message}finally{t.value=!1}},h=()=>{Object.keys(i).forEach(d=>{d==="basicInfo"?Object.keys(i.basicInfo).forEach(p=>{i.basicInfo[p]=""}):i[d]=""}),r.value=null,e.value=null,n.value=null};return{loading:t,error:e,success:n,districts:s,formData:i,imagePreview:r,handleImageUpload:o,handleSubmit:c,resetForm:h}}},tC={class:"loan-init-form"},nC={class:"form-section"},rC={class:"form-group"},sC={key:0,class:"form-group"},iC={key:1,class:"new-user-fields"},oC={class:"form-row"},aC={class:"form-group"},lC={class:"form-group"},cC={class:"form-row"},uC={class:"form-group"},hC={class:"form-group"},dC={class:"form-row"},fC={class:"form-group"},pC=["value"],mC={class:"form-group"},gC={class:"form-row"},_C={class:"form-group"},yC={class:"form-group"},vC={class:"form-group"},EC={class:"form-group"},IC={class:"form-section"},TC={class:"form-row"},wC={class:"form-group"},AC={class:"form-group"},RC={class:"form-group"},bC={class:"form-section"},PC={class:"form-group"},SC={key:0,class:"image-preview"},CC=["src"],DC={class:"form-actions"},kC=["disabled"],NC={key:0,class:"error-message"},OC={key:1,class:"success-message"};function VC(t,e,n,r,s,i){return oe(),ce("div",tC,[e[41]||(e[41]=E("div",{class:"form-header"},[E("h2",null,"Loan Initialization Form"),E("p",null,"Register new loans for existing or new users")],-1)),E("form",{onSubmit:e[17]||(e[17]=wc((...o)=>r.handleSubmit&&r.handleSubmit(...o),["prevent"])),class:"form"},[E("div",nC,[e[32]||(e[32]=E("h3",null,"User Information",-1)),E("div",rC,[e[19]||(e[19]=E("label",{for:"registered"},"User Type",-1)),je(E("select",{"onUpdate:modelValue":e[0]||(e[0]=o=>r.formData.registered=o),required:""},e[18]||(e[18]=[E("option",{value:""},"Select User Type",-1),E("option",{value:"Yes"},"Registered User",-1),E("option",{value:"No"},"New User",-1)]),512),[[Tr,r.formData.registered]])]),r.formData.registered==="Yes"?(oe(),ce("div",sC,[e[20]||(e[20]=E("label",{for:"regId"},"Registration ID",-1)),je(E("input",{type:"text",id:"regId","onUpdate:modelValue":e[1]||(e[1]=o=>r.formData.regId=o),placeholder:"Enter RegID",required:""},null,512),[[dt,r.formData.regId]])])):$e("",!0),r.formData.registered==="No"?(oe(),ce("div",iC,[E("div",oC,[E("div",aC,[e[21]||(e[21]=E("label",{for:"name"},"Full Name",-1)),je(E("input",{type:"text",id:"name","onUpdate:modelValue":e[2]||(e[2]=o=>r.formData.basicInfo.name=o),placeholder:"Enter full name",required:""},null,512),[[dt,r.formData.basicInfo.name]])]),E("div",lC,[e[22]||(e[22]=E("label",{for:"age"},"Age",-1)),je(E("input",{type:"number",id:"age","onUpdate:modelValue":e[3]||(e[3]=o=>r.formData.basicInfo.age=o),placeholder:"Enter age",min:"0",required:""},null,512),[[dt,r.formData.basicInfo.age]])])]),E("div",cC,[E("div",uC,[e[23]||(e[23]=E("label",{for:"nic"},"NIC Number",-1)),je(E("input",{type:"text",id:"nic","onUpdate:modelValue":e[4]||(e[4]=o=>r.formData.basicInfo.nic=o),placeholder:"Enter NIC number",required:""},null,512),[[dt,r.formData.basicInfo.nic]])]),E("div",hC,[e[24]||(e[24]=E("label",{for:"phone"},"Phone Number",-1)),je(E("input",{type:"tel",id:"phone","onUpdate:modelValue":e[5]||(e[5]=o=>r.formData.basicInfo.phone=o),placeholder:"Enter phone number",required:""},null,512),[[dt,r.formData.basicInfo.phone]])])]),E("div",dC,[E("div",fC,[e[26]||(e[26]=E("label",{for:"district"},"District",-1)),je(E("select",{id:"district","onUpdate:modelValue":e[6]||(e[6]=o=>r.formData.basicInfo.District=o),required:""},[e[25]||(e[25]=E("option",{value:""},"Select District",-1)),(oe(!0),ce(We,null,Kt(r.districts,o=>(oe(),ce("option",{key:o,value:o},ne(o),9,pC))),128))],512),[[Tr,r.formData.basicInfo.District]])]),E("div",mC,[e[27]||(e[27]=E("label",{for:"address"},"Address",-1)),je(E("textarea",{id:"address","onUpdate:modelValue":e[7]||(e[7]=o=>r.formData.basicInfo.address=o),placeholder:"Enter address",required:""},null,512),[[dt,r.formData.basicInfo.address]])])]),E("div",gC,[E("div",_C,[e[28]||(e[28]=E("label",{for:"totalChildren"},"Total Children",-1)),je(E("input",{type:"number",id:"totalChildren","onUpdate:modelValue":e[8]||(e[8]=o=>r.formData.basicInfo.totalChildren=o),placeholder:"Enter number of children",min:"0",required:""},null,512),[[dt,r.formData.basicInfo.totalChildren]])]),E("div",yC,[e[29]||(e[29]=E("label",{for:"schoolKids"},"School-going Children",-1)),je(E("input",{type:"number",id:"schoolKids","onUpdate:modelValue":e[9]||(e[9]=o=>r.formData.basicInfo.schoolKids=o),placeholder:"Enter number of school children",min:"0",required:""},null,512),[[dt,r.formData.basicInfo.schoolKids]])])]),E("div",vC,[e[30]||(e[30]=E("label",{for:"description"},"Description",-1)),je(E("textarea",{id:"description","onUpdate:modelValue":e[10]||(e[10]=o=>r.formData.description=o),placeholder:"Enter description",required:""},null,512),[[dt,r.formData.description]])]),E("div",EC,[e[31]||(e[31]=E("label",{for:"industry"},"Industry",-1)),je(E("input",{type:"text",id:"industry","onUpdate:modelValue":e[11]||(e[11]=o=>r.formData.industry=o),placeholder:"Enter industry",required:""},null,512),[[dt,r.formData.industry]])])])):$e("",!0)]),E("div",IC,[e[37]||(e[37]=E("h3",null,"Loan Information",-1)),E("div",TC,[E("div",wC,[e[34]||(e[34]=E("label",{for:"loanType"},"Loan Type",-1)),je(E("select",{id:"loanType","onUpdate:modelValue":e[12]||(e[12]=o=>r.formData.loanType=o),required:""},e[33]||(e[33]=[E("option",{value:""},"Select Loan Type",-1),E("option",{value:"RF"},"RF",-1),E("option",{value:"GRANT"},"GRANT",-1),E("option",{value:"GIF"},"GIF",-1)]),512),[[Tr,r.formData.loanType]])]),E("div",AC,[e[35]||(e[35]=E("label",{for:"amount"},"Amount (Rs.)",-1)),je(E("input",{type:"number",id:"amount","onUpdate:modelValue":e[13]||(e[13]=o=>r.formData.amount=o),placeholder:"Enter amount",min:"0",step:"0.01",required:""},null,512),[[dt,r.formData.amount]])])]),E("div",RC,[e[36]||(e[36]=E("label",{for:"purpose"},"Purpose",-1)),je(E("textarea",{id:"purpose","onUpdate:modelValue":e[14]||(e[14]=o=>r.formData.purpose=o),placeholder:"Enter loan purpose",required:""},null,512),[[dt,r.formData.purpose]])])]),E("div",bC,[e[40]||(e[40]=E("h3",null,"Image Upload",-1)),E("div",PC,[e[38]||(e[38]=E("label",{for:"image"},"Profile Image",-1)),E("input",{type:"file",id:"image",onChange:e[15]||(e[15]=(...o)=>r.handleImageUpload&&r.handleImageUpload(...o)),accept:"image/*",required:""},null,32),e[39]||(e[39]=E("small",null,"Supported formats: JPG, PNG, HEIC. Max size: 5MB",-1))]),r.imagePreview?(oe(),ce("div",SC,[E("img",{src:r.imagePreview,alt:"Preview"},null,8,CC)])):$e("",!0)]),E("div",DC,[E("button",{type:"button",onClick:e[16]||(e[16]=(...o)=>r.resetForm&&r.resetForm(...o)),class:"btn-secondary"},"Reset"),E("button",{type:"submit",disabled:r.loading,class:"btn-primary"},ne(r.loading?"Processing...":"Submit Loan"),9,kC)])],32),r.error?(oe(),ce("div",NC,ne(r.error),1)):$e("",!0),r.success?(oe(),ce("div",OC,ne(r.success),1)):$e("",!0)])}const xC=ms(eC,[["render",VC],["__scopeId","data-v-1fffc1f8"]]),LC={name:"PaymentForm",setup(){const t=Ne(!1),e=Ne(null),n=Ne(null),r=Ne(null),s=Nr({regId:"",type:"",amount:"",details:"",date:new Date().toISOString().split("T")[0]}),i=async d=>{if(!d){r.value=null;return}try{r.value=await bn.getProfile(d)}catch(p){console.error("Error loading profile:",p),r.value=null}},o=()=>{const d=[];return s.regId||d.push("Registration ID is required"),s.type||d.push("Payment type is required"),s.type==="RF"&&(!s.amount||s.amount<=0)&&d.push("Valid payment amount is required for RF payments"),s.type==="GRANT"&&(s.details||d.push("Details are required for GRANT payments")),d},l=async()=>{e.value=null,n.value=null;const d=o();if(d.length>0){e.value=d.join(", ");return}t.value=!0;try{const p={regId:s.regId,type:s.type,amount:parseFloat(s.amount)||0,details:s.details,date:new Date(s.date)};await bn.processPayment(p),s.type==="RF"?n.value=`RF payment of Rs. ${s.amount} processed successfully for ${s.regId}`:n.value=`Grant "Give It Forward" entry processed successfully for ${s.regId}`,c()}catch(p){e.value="Failed to process payment: "+p.message}finally{t.value=!1}},c=()=>{Object.keys(s).forEach(d=>{d==="date"?s[d]=new Date().toISOString().split("T")[0]:s[d]=""}),r.value=null,e.value=null,n.value=null},h=d=>d?new Intl.NumberFormat("en-IN").format(d):"0";return Ir(()=>s.regId,d=>{d?i(d):r.value=null}),{loading:t,error:e,success:n,profile:r,formData:s,handleSubmit:l,resetForm:c,formatAmount:h}}},MC={class:"payment-form"},FC={class:"form-section"},UC={class:"form-row"},BC={class:"form-group"},jC={class:"form-group"},qC={key:0,class:"form-group"},HC={key:1,class:"form-group"},$C={class:"form-group"},GC={key:0,class:"profile-preview"},KC={class:"profile-info"},zC={class:"form-actions"},WC=["disabled"],QC={key:0,class:"error-message"},YC={key:1,class:"success-message"};function JC(t,e,n,r,s,i){var o,l,c,h,d;return oe(),ce("div",MC,[e[20]||(e[20]=E("div",{class:"form-header"},[E("h2",null,"Payment Return Form"),E("p",null,'Process RF loan payments and Grant "Give It Forward" entries')],-1)),E("form",{onSubmit:e[6]||(e[6]=wc((...p)=>r.handleSubmit&&r.handleSubmit(...p),["prevent"])),class:"form"},[E("div",FC,[e[13]||(e[13]=E("h3",null,"Payment Information",-1)),E("div",UC,[E("div",BC,[e[7]||(e[7]=E("label",{for:"regId"},"Registration ID",-1)),je(E("input",{type:"text",id:"regId","onUpdate:modelValue":e[0]||(e[0]=p=>r.formData.regId=p),placeholder:"Enter RegID",required:""},null,512),[[dt,r.formData.regId]])]),E("div",jC,[e[9]||(e[9]=E("label",{for:"type"},"Payment Type",-1)),je(E("select",{id:"type","onUpdate:modelValue":e[1]||(e[1]=p=>r.formData.type=p),required:""},e[8]||(e[8]=[E("option",{value:""},"Select Type",-1),E("option",{value:"RF"},"RF Loan Payment",-1),E("option",{value:"GRANT"},'Grant "Give It Forward"',-1)]),512),[[Tr,r.formData.type]])])]),r.formData.type==="RF"?(oe(),ce("div",qC,[e[10]||(e[10]=E("label",{for:"amount"},"Payment Amount (Rs.)",-1)),je(E("input",{type:"number",id:"amount","onUpdate:modelValue":e[2]||(e[2]=p=>r.formData.amount=p),placeholder:"Enter payment amount",min:"0",step:"0.01",required:""},null,512),[[dt,r.formData.amount]])])):$e("",!0),r.formData.type==="GRANT"?(oe(),ce("div",HC,[e[11]||(e[11]=E("label",{for:"details"},"Give It Forward Details",-1)),je(E("textarea",{id:"details","onUpdate:modelValue":e[3]||(e[3]=p=>r.formData.details=p),placeholder:"Enter details about the grant recipient",required:""},null,512),[[dt,r.formData.details]])])):$e("",!0),E("div",$C,[e[12]||(e[12]=E("label",{for:"date"},"Payment Date",-1)),je(E("input",{type:"date",id:"date","onUpdate:modelValue":e[4]||(e[4]=p=>r.formData.date=p),required:""},null,512),[[dt,r.formData.date]])])]),r.profile?(oe(),ce("div",GC,[e[19]||(e[19]=E("h3",null,"Profile Preview",-1)),E("div",KC,[E("p",null,[e[14]||(e[14]=E("strong",null,"Name:",-1)),Ee(" "+ne((o=r.profile.basicInfo)==null?void 0:o.name),1)]),E("p",null,[e[15]||(e[15]=E("strong",null,"District:",-1)),Ee(" "+ne((l=r.profile.basicInfo)==null?void 0:l.District),1)]),E("p",null,[e[16]||(e[16]=E("strong",null,"Active Loans:",-1)),Ee(" "+ne(((c=r.profile.computed)==null?void 0:c.activeLoansCount)||0),1)]),E("p",null,[e[17]||(e[17]=E("strong",null,"Total Loan Amount:",-1)),Ee(" Rs. "+ne(r.formatAmount(((h=r.profile.computed)==null?void 0:h.totalLoanAmount)||0)),1)]),E("p",null,[e[18]||(e[18]=E("strong",null,"Remaining Amount:",-1)),Ee(" Rs. "+ne(r.formatAmount(((d=r.profile.computed)==null?void 0:d.remainingLoanAmount)||0)),1)])])])):$e("",!0),E("div",zC,[E("button",{type:"button",onClick:e[5]||(e[5]=(...p)=>r.resetForm&&r.resetForm(...p)),class:"btn-secondary"},"Reset"),E("button",{type:"submit",disabled:r.loading,class:"btn-primary"},ne(r.loading?"Processing...":"Submit Payment"),9,WC)])],32),r.error?(oe(),ce("div",QC,ne(r.error),1)):$e("",!0),r.success?(oe(),ce("div",YC,ne(r.success),1)):$e("",!0)])}const XC=ms(LC,[["render",JC],["__scopeId","data-v-c159ba9e"]]),ZC=[{path:"/",name:"Home",component:ZS},{path:"/loan-init",name:"LoanInit",component:xC},{path:"/payment",name:"Payment",component:XC}],e1=sI({history:OE(),routes:ZC}),t1=aI(),Eu=eE(hI);Eu.use(e1);Eu.use(t1);Eu.mount("#app");
