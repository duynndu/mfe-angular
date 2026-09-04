import{a as w,b as C,c as S}from"./chunk-PLBUCK57.js";import{bootstrapApplication as Ut}from"@angular/platform-browser";import{provideBrowserGlobalErrorListeners as Rt,provideZoneChangeDetection as Kt}from"@angular/core";import{provideRouter as Gt}from"@angular/router";import{EventEmitter as I}from"@angular/core";import*as v from"@angular/core";var H="./template-editor/assets/remoteEntry.js";import*as U from"@angular/core";var V=class r{module=null;_initVueModule(){return C(this,null,function*(){if(!this.module)try{this.module=yield S({remoteEntry:H,exposedModule:"./component-factory"})}catch(n){console.error("[VueLoader] Failed to load Vue remote module:",n),this.module=null}})}mountPreview(n,e){return C(this,null,function*(){yield this._initVueModule();try{if(!this.module?.mountPreview)throw new Error("Vue module does not export mountPreview.");return this.module.mountPreview(n,e)}catch(a){return console.error("[VueLoader] Failed to mount preview:",a),null}})}static \u0275fac=function(e){return new(e||r)};static \u0275prov=U.\u0275\u0275defineInjectable({token:r,factory:r.\u0275fac,providedIn:"root"})};var nt=["container"],k=class r{constructor(n){this.vueLoader=n}containerRef;previewInstance=null;template="";templateChange=new I;script="";scriptChange=new I;context={};contextChange=new I;editMode=!0;editModeChange=new I;scriptError=new I;ngOnInit(){return C(this,null,function*(){let n=this.containerRef?.nativeElement;n&&(this.previewInstance=yield this.vueLoader.mountPreview(n,{template:this.template,script:this.script,context:this.context,editMode:this.editMode,onTemplateChange:e=>{this.template=e,this.templateChange.emit(e)},onScriptChange:e=>{this.script=e,this.scriptChange.emit(e)},onContextChange:e=>{this.context=e,this.contextChange.emit(e)},onEditModeChange:e=>{this.editMode=e,this.editModeChange.emit(e)},onScriptError:e=>{this.scriptError.emit(e)}}),this.previewInstance||console.error("[TemplateEditor] Failed to load & mount Vue Preview component."))})}ngOnChanges(n){if(!this.previewInstance)return;let e={};n.template&&(e.template=this.template),n.script&&(e.script=this.script),n.context&&(e.context=this.context),n.editMode&&(e.editMode=this.editMode),Object.keys(e).length>0&&this.previewInstance.updateProps(e)}ngOnDestroy(){this.previewInstance?.unmount(),this.previewInstance=null}static \u0275fac=function(e){return new(e||r)(v.\u0275\u0275directiveInject(V))};static \u0275cmp=v.\u0275\u0275defineComponent({type:r,selectors:[["template-editor"]],viewQuery:function(e,a){if(e&1&&v.\u0275\u0275viewQuery(nt,7),e&2){let i;v.\u0275\u0275queryRefresh(i=v.\u0275\u0275loadQuery())&&(a.containerRef=i.first)}},inputs:{template:"template",script:"script",context:"context",editMode:"editMode"},outputs:{templateChange:"templateChange",scriptChange:"scriptChange",contextChange:"contextChange",editModeChange:"editModeChange",scriptError:"scriptError"},features:[v.\u0275\u0275NgOnChangesFeature],decls:2,vars:0,consts:[["container",""],[1,"template-editor-host",2,"width","100%","height","100%","display","flex","flex-direction","column"]],template:function(e,a){e&1&&v.\u0275\u0275element(0,"div",1,0)},styles:["[_nghost-%COMP%]{display:block;width:100%;height:100%;min-height:0}"]})};import{EventEmitter as G}from"@angular/core";import{CommonModule as at}from"@angular/common";import{FormsModule as ot}from"@angular/forms";import W from"js-beautify";import{parse as q}from"@vue/compiler-dom";import{NodeTypes as _}from"@vue/compiler-core";var P=class r{tagName;attributes={};childNodes=[];parentNode=null;textContent="";isClosingTag;constructor(n="",e={}){this.tagName=n,this.attributes=w({},e)}_serialize(n=!1){if(this.tagName==="#text")return this.textContent;let e="";for(let[o,d]of Object.entries(this.attributes))if(!(n&&(o==="c-id"||o==="c-name"||o==="path"&&this.hasAttribute("v-model")))){if(n&&o==="class"){let m=(String(d)||"").split(/\s+/).filter(l=>l&&l!=="element-highlight"&&l!=="empty-placeholder").join(" ").trim();m&&(e+=` class="${m}"`);continue}d===!0?e+=` ${o}`:d===""||d===void 0||d===null?e+=` ${o}=""`:e+=` ${o}="${d}"`}if(this.isClosingTag&&this.childNodes.length===0&&!this.textContent)return`<${this.tagName}${e} />`;let i=this.childNodes.map(o=>o._serialize(n)).join("");return`<${this.tagName}${e}>${i}</${this.tagName}>`}get innerHTML(){if(this.tagName==="#text")return M.vueBeautify(this.textContent);let n=this.childNodes.map(e=>e._serialize(!1)).join("");return M.vueBeautify(n)}set innerHTML(n){this.childNodes.forEach(e=>{e.parentNode=null}),this.childNodes=[],n&&n.trim()&&M.parseToTree(n).childNodes.forEach(a=>{this.appendChild(a)})}get outerHTML(){return M.vueBeautify(this._serialize(!1))}toCleanHTML(n=2){return M.vueBeautify(this._serialize(!0),n)}matches(n){if(!n||this.tagName==="#text")return!1;let e=n.trim();if(e.startsWith("#"))return this.attributes.id===e.slice(1);if(e.startsWith(".")){let i=(this.attributes.class||"").split(/\s+/);return e.slice(1).split(".").filter(Boolean).every(d=>i.includes(d))}if(e.startsWith("[")&&e.endsWith("]")){let i=e.match(/^\[([^\s=~|^$*\]]+)(?:([~|^$*]?=)["']?(.*?)["']?)?\]$/);if(!i)return!1;let[,o,d,m]=i;if(d===void 0)return o in this.attributes;let l=String(this.attributes[o]??"");switch(d){case"=":return l===m;case"^=":return l.startsWith(m);case"$=":return l.endsWith(m);case"*=":return l.includes(m);case"~=":return l.split(/\s+/).includes(m);case"|=":return l===m||l.startsWith(`${m}-`);default:return!1}}let a=e.match(/^([a-zA-Z0-9_-]+)([\.#\[].+)$/);if(a){let[,i,o]=a;return this.tagName.toLowerCase()===i.toLowerCase()&&this.matches(o)}return this.tagName.toLowerCase()===e.toLowerCase()}_collect(n,e=!1){let a=[],i=o=>{if(n(o)&&(a.push(o),e))return!0;for(let d of o.childNodes)if(i(d)&&e)return!0;return!1};return i(this),a}querySelector(n){return this._collect(a=>a.matches(n),!0)[0]||null}querySelectorAll(n){return this._collect(e=>e.matches(n),!1)}getElementById(n){return this.querySelector(`#${n}`)}getElementsByTagName(n){return this.querySelectorAll(n)}getElementsByClassName(n){return this.querySelectorAll(`.${n}`)}getAttribute(n){return this.attributes[n]}setAttribute(n,e){return this.attributes[n]=e,this}removeAttribute(n){return delete this.attributes[n],this}hasAttribute(n){return n in this.attributes}_childIndex(n){let e=this.childNodes.indexOf(n);if(e===-1)throw new Error("Reference node not found in parent");return e}appendChild(n){return n.parentNode=this,this.childNodes.push(n),n}insertBefore(n,e){let a=this._childIndex(e);return n.parentNode=this,this.childNodes.splice(a,0,n),n}insertAfter(n,e){let a=this._childIndex(e);return n.parentNode=this,this.childNodes.splice(a+1,0,n),n}remove(){return this.parentNode?this.parentNode.removeChild(this):null}removeChild(n){let e=this.childNodes.indexOf(n);return e>-1?(n.parentNode=null,this.childNodes.splice(e,1)[0]):null}replaceChild(n,e){let a=this._childIndex(e);return e.parentNode=null,n.parentNode=this,this.childNodes.splice(a,1,n),e}get firstChild(){return this.childNodes[0]||null}get lastChild(){return this.childNodes[this.childNodes.length-1]||null}get nextSibling(){if(!this.parentNode)return null;let n=this.parentNode.childNodes.indexOf(this);return this.parentNode.childNodes[n+1]||null}get previousSibling(){if(!this.parentNode)return null;let n=this.parentNode.childNodes.indexOf(this);return this.parentNode.childNodes[n-1]||null}cloneNode(n=!1){let e=new r(this.tagName,w({},this.attributes));if(e.textContent=this.textContent,e.isClosingTag=this.isClosingTag,n)for(let a of this.childNodes)e.appendChild(a.cloneNode(!0));return e}toObject(){return{tagName:this.tagName,attributes:this.attributes,childNodes:this.childNodes.map(n=>n.toObject()),textContent:this.textContent}}genComponentId(n=!1){let e=a=>{(n||!a.hasAttribute("c-id"))&&a.setAttribute("c-id",Math.random().toString(36).substring(2,9)),a.childNodes.forEach(i=>e(i))};e(this)}};var it=W.html_beautify||W,K=new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]),M=class{static closingTags=Array.from(K);static parseToTree(n,e="Root",a={"c-id":"123456"}){let i=new P(e);if(i.attributes=w({},a),!n||!n.trim())return i;let o=n.replace(/\r\n/g,`
`).replace(/\r/g,`
`).trim();try{let d=q(o,{comments:!1}),m=l=>{if(!l)return null;if(l.type===_.ELEMENT){let p=l,c=new P(p.tag);c.isClosingTag=p.isSelfClosing||K.has(p.tag.toLowerCase());for(let x of p.props)if(x.type===_.ATTRIBUTE){let h=x,b=h.name,f=h.value?h.value.content:!0;c.setAttribute(b,f)}else if(x.type===_.DIRECTIVE){let h=x,b=h.name,f=h.arg&&h.arg.type===_.SIMPLE_EXPRESSION?h.arg.content:"",E=h.exp&&h.exp.type===_.SIMPLE_EXPRESSION?h.exp.content:"",T="";if(b==="bind"?T=f?`:${f}`:"v-bind":b==="on"?T=f?`@${f}`:"v-on":b==="model"?T=f?`v-model:${f}`:"v-model":b==="slot"?T=f?`#${f}`:"v-slot":T=`v-${b}${f?`:${f}`:""}`,h.modifiers&&h.modifiers.length>0){let A=h.modifiers.map(N=>typeof N=="string"?N:N.content||"").filter(Boolean);A.length>0&&(T+="."+A.join("."))}c.setAttribute(T,E)}c.setAttribute("c-name",c.tagName),c.hasAttribute("c-id")||c.setAttribute("c-id",Math.random().toString(36).substring(2,9));let u=c.getAttribute("v-model");if(u&&typeof u=="string"&&c.setAttribute("path",u),p.children&&p.children.length>0)for(let x of p.children){let h=m(x);h&&c.appendChild(h)}return c}if(l.type===_.TEXT){let c=l.content;if(!c)return null;let u=new P("#text");return u.textContent=c,u}if(l.type===_.INTERPOLATION){let p=l,c=p.content&&p.content.type===_.SIMPLE_EXPRESSION?p.content.content:"",u=new P("#text");return u.textContent=`{{ ${c} }}`,u}return null};if(d.children&&d.children.length>0)for(let l of d.children){let p=m(l);p&&i.appendChild(p)}}catch(d){console.warn("[VirtualHTMLParser] AST Parse Error, fallback to basic text:",d)}return i}static parseToElement(n){return this.parseToTree(n).childNodes[0]||new P("div")}static parseFromObject(n){if(!n||typeof n!="object")throw new Error("Input must be a valid object");let e=new P(n.tagName||"#text",n.attributes||{});return e.textContent=n.textContent||"",e.isClosingTag=!!n.isClosingTag,Array.isArray(n.childNodes)&&(e.childNodes=n.childNodes.map(a=>{let i=this.parseFromObject(a);return i.parentNode=e,i})),e}static parseFromJSON(n){try{return this.parseFromObject(JSON.parse(n))}catch(e){throw new Error(`Invalid JSON: ${e.message}`)}}static _parseAttributes(n){let e={};if(!n?.trim())return e;let a=/([#a-zA-Z-:@]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g,i;for(;(i=a.exec(n))!==null;)i[1]&&(e[i[1].trim()]=i[2]??i[3]??i[4]??!0);return e}static vueBeautify(n,e=2){return it(n,{indent_size:e,inline:Array.from(K),wrap_line_length:80})}static extractTemplateFields(n){let e=new Map;if(!n?.trim())return[];try{let d=function(l){if(!l)return;let p=/\bdata((?:\.[a-zA-Z0-9_$]+|\[['"][^'"]+['"]\])+)/g,c;for(;(c=p.exec(l))!==null;){let u=c[0],x=c[1].replace(/^\./,"").replace(/\[['"]([^'"]+)['"]\]/g,".$1").replace(/^\./,"");x&&!e.has(x)&&e.set(x,{raw:u,path:x})}},m=function(l){if(l){if(l.type===_.INTERPOLATION){let p=l;p.content&&p.content.type===_.SIMPLE_EXPRESSION&&d(p.content.content)}if(l.type===_.ELEMENT){let p=l;for(let c of p.props)c.type===_.DIRECTIVE&&c.exp&&c.exp.type===_.SIMPLE_EXPRESSION&&d(c.exp.content);p.children&&p.children.forEach(m)}if(l.type===_.ROOT){let p=l;p.children&&p.children.forEach(m)}}};var a=d,i=m;let o=q(n);m(o)}catch{}return Array.from(e.values())}static toCleanHTML(n,e=2){let a=typeof n=="string"?this.parseToTree(n):n;return a.tagName==="Root"?a.childNodes.map(i=>i.toCleanHTML(e)).join(`
`):a.toCleanHTML(e)}};var O=class{static SYSTEM_PROMPT_UI=`
B\u1EA1n l\xE0 AI Chuy\xEAn gia Thi\u1EBFt k\u1EBF Giao Di\u1EC7n Web / \u1EE8ng D\u1EE5ng (UI/UX Designer & Frontend Engineer) xu\u1EA5t s\u1EAFc cho n\u1EC1n t\u1EA3ng Vue 3 + Angular Micro-Frontend.
Nhi\u1EC7m v\u1EE5 c\u1EE7a b\u1EA1n l\xE0 hi\u1EC7n th\u1EF1c h\xF3a giao di\u1EC7n m\xE0n h\xECnh ho\xE0n ch\u1EC9nh, hi\u1EC7n \u0111\u1EA1i, th\u1EA9m m\u1EF9 cao (Login, Dashboard, Portal, Form h\u1ED3 s\u01A1, v.v.) d\u1EF1a tr\xEAn y\xEAu c\u1EA7u c\u1EE7a ng\u01B0\u1EDDi d\xF9ng ho\u1EB7c ch\u1EC9nh s\u1EEDa m\u1EABu giao di\u1EC7n \u0111ang c\xF3.

QUY T\u1EAEC C\u1ED0T L\xD5I B\u1EAET BU\u1ED8C:
1. 100% TH\u1EBA HTML THU\u1EA6N (Native HTML Tags):
   - S\u1EEC D\u1EE4NG: <div>, <form>, <input>, <button>, <select>, <option>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <label>, <span>, <p>, <h1>-<h6>, <nav>, <header>, <section>, <ul>, <li>, v\xE0 icon FontAwesome 4.7 <i class="fa fa-..."></i>.
   - TUY\u1EC6T \u0110\u1ED0I KH\xD4NG D\xD9NG c\xE1c th\u1EBB bi\u1EC3u m\u1EABu in \u1EA5n: <PageA4>, <PageA5>, <Textarea>, <InputOTP>, <DatePicker>, <Checkbox>, <Paint>. C\xE1c th\u1EBB n\xE0y ch\u1EC9 d\xE0nh ri\xEAng cho b\u1EA3n in t\xE0i li\u1EC7u!

2. STYLE B\u1EB0NG INLINE CSS \u0110\u1EC8NH CAO (Aesthetics & Modern SaaS UI):
   - Layout: Flexbox, CSS Grid hi\u1EC7n \u0111\u1EA1i, responsive.
   - B\u1EA3ng m\xE0u hi\u1EC7n \u0111\u1EA1i (Modern SaaS palette: #0f172a, #1e293b, #3b82f6, #10b981, #f8fafc, gradient m\u01B0\u1EE3t m\xE0).
   - Bo tr\xF2n m\u1EC1m m\u1EA1i (border-radius: 8px - 16px), b\xF3ng \u0111\u1ED5 tinh t\u1EBF (box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)), vi\u1EC1n m\u1ECFng (border: 1px solid #e2e8f0).
   - Ph\xF9 h\u1EE3p v\u1EDBi m\u1ECDi y\xEAu c\u1EA7u phong c\xE1ch (Light, Dark Mode, Glassmorphism, Clean Medical Portal, v.v.).

3. VUE 3 COMPOSITION API SCRIPT CHU\u1EA8N X\xC1C:
   - S\u1EED d\u1EE5ng c\xFA ph\xE1p Vue 3: const data = reactive($context.data || { ... });
   - KHAI B\xC1O V\xC0 RETURN 100% T\u1EA4T C\u1EA2 BI\u1EBEN & H\xC0M: M\u1ECDi bi\u1EBFn (loading, errorMessage, successMessage, showPassword...) v\xE0 h\xE0m (handleLogin, togglePassword, submitForm...) xu\u1EA5t hi\u1EC7n trong template B\u1EAET BU\u1ED8C ph\u1EA3i \u0111\u01B0\u1EE3c khai b\xE1o v\xE0 return \u0111\u1EA7y \u0111\u1EE7 trong script.
   - KH\u1EDEI T\u1EA0O M\u1EA2NG TRONG CONTEXT: N\u1EBFu template duy\u1EC7t m\u1EA3ng ho\u1EB7c bind v-model v\xE0o m\u1EA3ng (v\xED d\u1EE5 data.otp[i]), context.data b\u1EAFt bu\u1ED9c ph\u1EA3i c\xF3 m\u1EA3ng t\u01B0\u01A1ng \u1EE9ng.
   - Modifier chu\u1EA9n: @submit.prevent="...", @click.prevent="...".

4. T\u1EF0 \u0110\u1ED8NG X\u1EEC L\xDD C\u1EA2 HAI T\xCCNH HU\u1ED0NG (T\u1EA0O M\u1EDAI HO\u1EB6C S\u1EECA \u0110\u1ED4I):
   - N\u1EBFu c\xF3 "M\xC3 TEMPLATE HI\u1EC6N T\u1EA0I": B\u1EA1n \u0111ang trong ch\u1EBF \u0111\u1ED9 tinh ch\u1EC9nh/s\u1EEDa \u0111\u1ED5i. H\xE3y b\u1EA3o t\u1ED3n t\u1ED1i \u0111a b\u1ED1 c\u1EE5c, phong c\xE1ch, c\xE1c tr\u01B0\u1EDDng v\xE0 logic hi\u1EC7n c\xF3, ch\u1EC9 th\u1EF1c hi\u1EC7n ch\xEDnh x\xE1c c\xE1c ch\u1EC9nh s\u1EEDa/b\u1ED5 sung m\xE0 ng\u01B0\u1EDDi d\xF9ng y\xEAu c\u1EA7u.
   - N\u1EBFu KH\xD4NG c\xF3 template hi\u1EC7n t\u1EA1i (ho\u1EB7c ng\u01B0\u1EDDi d\xF9ng y\xEAu c\u1EA7u l\xE0m m\u1EDBi ho\xE0n to\xE0n): H\xE3y thi\u1EBFt k\u1EBF m\u1ED9t giao di\u1EC7n tr\u1ECDn v\u1EB9n, \u0111\u1EB9p m\u1EAFt t\u1EEB \u0111\u1EA7u.

\u0110\u1ECANH D\u1EA0NG TR\u1EA2 V\u1EC0 B\u1EAET BU\u1ED8C (JSON DUY NH\u1EA4T, KH\xD4NG TH\xCAM B\u1EA4T K\u1EF2 V\u0102N B\u1EA2N N\xC0O NGO\xC0I JSON):
{
  "template": "<div style=\\"...\\">...</div>",
  "script": "const data = reactive($context.data || {});\\nreturn { data };",
  "context": { "data": { ... } },
  "summary": "T\xF3m t\u1EAFt ng\u1EAFn g\u1ECDn nh\u1EEFng g\xEC \u0111\xE3 t\u1EA1o ho\u1EB7c ch\u1EC9nh s\u1EEDa"
}
`;static SYSTEM_PROMPT_DOCUMENT=`
B\u1EA1n l\xE0 AI Chuy\xEAn gia Thi\u1EBFt k\u1EBF M\u1EABu Bi\u1EC3u & B\u1EA3n In Y T\u1EBF / H\xE0nh Ch\xEDnh (Print Document & Medical Form Expert) xu\u1EA5t s\u1EAFc cho n\u1EC1n t\u1EA3ng Vue 3 + Angular Micro-Frontend.
Nhi\u1EC7m v\u1EE5 c\u1EE7a b\u1EA1n l\xE0 hi\u1EC7n th\u1EF1c h\xF3a m\u1EABu bi\u1EC3u t\xE0i li\u1EC7u in \u1EA5n chu\u1EA9n x\xE1c (\u0110\u01A1n thu\u1ED1c, Phi\u1EBFu kh\xE1m b\u1EC7nh, K\u1EBFt qu\u1EA3 x\xE9t nghi\u1EC7m, Phi\u1EBFu thu, Bi\xEAn b\u1EA3n, Gi\u1EA5y ra vi\u1EC7n, v.v.) d\u1EF1a tr\xEAn y\xEAu c\u1EA7u c\u1EE7a ng\u01B0\u1EDDi d\xF9ng ho\u1EB7c ch\u1EC9nh s\u1EEDa m\u1EABu bi\u1EC3u \u0111ang c\xF3.

QUY T\u1EAEC C\u1ED0T L\xD5I B\u1EAET BU\u1ED8C KHI THI\u1EBET K\u1EBE M\u1EAAU PHI\u1EBEU / B\u1EA2N IN:
1. KHUNG KH\u1ED4 GI\u1EA4Y CHU\u1EA8N:
   - To\xE0n b\u1ED9 n\u1ED9i dung bi\u1EC3u m\u1EABu B\u1EAET BU\u1ED8C ph\u1EA3i n\u1EB1m trong m\u1ED9t trong c\xE1c th\u1EBB trang in:
     + Kh\u1ED5 A4 D\u1ECDc: <PageA4 style="padding: 10mm 15mm;">...</PageA4>
     + Kh\u1ED5 A4 Ngang: <PageA4 :landscape="true" style="padding: 10mm 15mm;">...</PageA4>
     + Kh\u1ED5 A5 D\u1ECDc: <PageA5 style="padding: 8mm 12mm;">...</PageA5>
     + Kh\u1ED5 A5 Ngang: <PageA5 :landscape="true" style="padding: 8mm 12mm;">...</PageA5>
   - T\u1EF1 \u0111\u1ED9ng nh\u1EADn di\u1EC7n kh\u1ED5 gi\u1EA5y v\xE0 h\u01B0\u1EDBng in ph\xF9 h\u1EE3p t\u1EEB y\xEAu c\u1EA7u c\u1EE7a ng\u01B0\u1EDDi d\xF9ng (m\u1EB7c \u0111\u1ECBnh A4 d\u1ECDc n\u1EBFu kh\xF4ng ch\u1EC9 \u0111\u1ECBnh).

2. B\u1EAET BU\u1ED8C 100% S\u1EEC D\u1EE4NG C\xC1C COMPONENT NH\u1EACP LI\u1EC6U C\xD3 S\u1EB4N C\u1EE6A H\u1EC6 TH\u1ED0NG:
   TUY\u1EC6T \u0110\u1ED0I KH\xD4NG d\xF9ng d\u1EA5u ch\u1EA5m th\u1EE7 c\xF4ng (v\xED d\u1EE5: "H\u1ECD v\xE0 t\xEAn: ...................."), g\u1EA1ch d\u01B0\u1EDBi t\u0129nh ("______") hay th\u1EBB <input type="text"> HTML th\xF4. M\u1ECDi tr\u01B0\u1EDDng nh\u1EADp li\u1EC7u / \u0111i\u1EC1n th\xF4ng tin tr\xEAn phi\u1EBFu B\u1EAET BU\u1ED8C PH\u1EA2I D\xD9NG \u0111\xFAng c\xE1c Vue component sau:
   - <Textarea v-model="data.fieldName" label="Ti\xEAu \u0111\u1EC1:" :line="true" />:
     + D\xD9NG CHO M\u1ECCI tr\u01B0\u1EDDng nh\u1EADp li\u1EC7u th\xF4ng tin d\u1EA1ng v\u0103n b\u1EA3n (H\u1ECD v\xE0 t\xEAn, \u0110\u1ECBa ch\u1EC9, Ngh\u1EC1 nghi\u1EC7p, L\xFD do kh\xE1m, Ch\u1EA9n \u0111o\xE1n, Tri\u1EC7u ch\u1EE9ng, L\u1EDDi d\u1EB7n c\u1EE7a b\xE1c s\u0129, Ghi ch\xFA...).
     + LU\xD4N C\xD3 thu\u1ED9c t\xEDnh :line="true" \u0111\u1EC3 t\u1EA1o \u0111\u01B0\u1EDDng k\u1EBB d\xF2ng ng\u1EA7m t\u1EF1 nhi\xEAn chu\u1EA9n bi\u1EC3u m\u1EABu in \u1EA5n.
   - <DatePicker v-model="data.dateField" label="Ti\xEAu \u0111\u1EC1:" format="DD/MM/YYYY" placeholder="DD/MM/YYYY" />:
     + D\xD9NG CHO c\xE1c tr\u01B0\u1EDDng ng\xE0y th\xE1ng (Ng\xE0y sinh, Ng\xE0y kh\xE1m, Ng\xE0y c\u1EA5p th\u1EBB, Ng\xE0y ch\u1EC9 \u0111\u1ECBnh...).
     + N\u1EBFu c\u1EA7n c\u1EA3 gi\u1EDD ph\xFAt (v\xED d\u1EE5 gi\u1EDD h\u1EB9n t\xE1i kh\xE1m): Th\xEAm mode="datetime" format="HH:mm DD/MM/YYYY".
   - <InputOTP v-model="data.codeField" label="Ti\xEAu \u0111\u1EC1:" :mask-length="[1,1,1,1]" pad-start="0" />:
     + D\xD9NG CHO c\xE1c tr\u01B0\u1EDDng m\xE3 s\u1ED1/\u0111\u1ECBnh danh (M\xE3 b\u1EC7nh nh\xE2n, S\u1ED1 h\u1ED3 s\u01A1, M\xE3 th\u1EBB BHYT, Tu\u1ED5i [1,1]...).
   - <Select v-model="data.selectField" label="Ti\xEAu \u0111\u1EC1:" :items="listName" bind-label="name" bind-value="id" />:
     + D\xD9NG CHO c\xE1c tr\u01B0\u1EDDng ch\u1ECDn danh m\u1EE5c (Gi\u1EDBi t\xEDnh, Khoa ph\xF2ng, \u0110\u1ED1i t\u01B0\u1EE3ng chi tr\u1EA3 BHYT...).
     + Trong Script B\u1EAET BU\u1ED8C ph\u1EA3i khai b\xE1o m\u1EA3ng danh m\u1EE5c t\u01B0\u01A1ng \u1EE9ng (v\xED d\u1EE5: const genderList = [{ id: 'nam', name: 'Nam' }, { id: 'nu', name: 'N\u1EEF' }];) v\xE0 return ra ngo\xE0i.
   - <Checkbox v-model="data.checkField" :native="true" afterText="V\u0103n b\u1EA3n" />:
     + D\xD9NG CHO c\xE1c t\xF9y ch\u1ECDn d\u1EA1ng h\u1ED9p ki\u1EC3m (Nam / N\u1EEF d\u1EA1ng t\xEDch \xF4 vu\xF4ng, C\xF3 BHYT, Ti\u1EC1n s\u1EED d\u1ECB \u1EE9ng...).
   - <Paint v-model="data.signature" label="Ch\u1EEF k\xFD:" style="width: 250px; height: 110px;" />:
     + B\u1EAET BU\u1ED8C D\xD9NG cho M\u1ECCI v\xF9ng ch\u1EEF k\xFD x\xE1c nh\u1EADn (Ch\u1EEF k\xFD B\xE1c s\u0129 \u0111i\u1EC1u tr\u1ECB, Ch\u1EEF k\xFD B\u1EC7nh nh\xE2n / Th\xE2n nh\xE2n, K\u1EF9 thu\u1EADt vi\xEAn, Ng\u01B0\u1EDDi l\u1EADp phi\u1EBFu...). Cho ph\xE9p ng\u01B0\u1EDDi d\xF9ng k\xFD v\u1EBD tr\u1EF1c ti\u1EBFp.

3. B\u1EA2NG D\u1EEE LI\u1EC6U DANH M\u1EE4C (TABLE):
   - Danh s\xE1ch thu\u1ED1c, x\xE9t nghi\u1EC7m, d\u1ECBch v\u1EE5 k\u1EF9 thu\u1EADt, vi\u1EC7n ph\xED: D\xF9ng th\u1EBB HTML chu\u1EA9n c\xF3 vi\u1EC1n n\xE9t \u0111\u01A1n chu\u1EA9n in \u1EA5n:
     <table style="width: 100%; border-collapse: collapse; margin: 10px 0;" border="1">
       <thead><tr style="background: #f1f5f9;"><th style="padding: 6px 8px; border: 1px solid #333;">STT</th>...</tr></thead>
       <tbody>...</tbody>
     </table>

4. VUE 3 SCRIPT V\xC0 CONTEXT CHU\u1EA8N X\xC1C:
   - Kh\u1EDFi t\u1EA1o: const data = reactive($context.data || {});
   - Tr\u1EA3 v\u1EC1 \u0111\u1EA7y \u0111\u1EE7 d\u1EEF li\u1EC7u mock trong context.data t\u01B0\u01A1ng \u1EE9ng v\u1EDBi to\xE0n b\u1ED9 c\xE1c tr\u01B0\u1EDDng data.xxx \u0111\u01B0\u1EE3c d\xF9ng trong template (v\xED d\u1EE5 h\u1ECD t\xEAn, ch\u1EA9n \u0111o\xE1n, m\xE3 BN, ch\u1EEF k\xFD...) \u0111\u1EC3 m\u1EABu hi\u1EC3n th\u1ECB \u0111\u1EA7y \u0111\u1EE7 v\xE0 \u0111\u1EB9p m\u1EAFt ngay khi xem tr\u01B0\u1EDBc v\xE0 in.
   - Khai b\xE1o v\xE0 return \u0111\u1EA7y \u0111\u1EE7 c\xE1c m\u1EA3ng danh m\u1EE5c d\xF9ng cho <Select>.

5. T\u1EF0 \u0110\u1ED8NG X\u1EEC L\xDD C\u1EA2 HAI T\xCCNH HU\u1ED0NG (T\u1EA0O M\u1EDAI HO\u1EB6C S\u1EECA \u0110\u1ED4I):
   - N\u1EBFu c\xF3 "M\xC3 TEMPLATE HI\u1EC6N T\u1EA0I": B\u1EA3o t\u1ED3n nguy\xEAn v\u1EB9n c\u1EA5u tr\xFAc kh\u1ED5 gi\u1EA5y v\xE0 c\xE1c ph\u1EA7n kh\xF4ng b\u1ECB y\xEAu c\u1EA7u thay \u0111\u1ED5i, chu\u1EA9n h\xF3a c\xE1c tr\u01B0\u1EDDng nh\u1EADp li\u1EC7u sang \u0111\xFAng component chuy\xEAn d\u1EE5ng.
   - N\u1EBFu KH\xD4NG c\xF3 template hi\u1EC7n t\u1EA1i: H\xE3y d\u1EF1ng to\xE0n b\u1ED9 m\u1EABu bi\u1EC3u chu\u1EA9n y t\u1EBF/h\xE0nh ch\xEDnh t\u1EEB \u0111\u1EA7u v\u1EDBi \u0111\u1EA7y \u0111\u1EE7 c\xE1c component c\xF3 s\u1EB5n.

\u0110\u1ECANH D\u1EA0NG TR\u1EA2 V\u1EC0 B\u1EAET BU\u1ED8C (JSON DUY NH\u1EA4T, KH\xD4NG TH\xCAM B\u1EA4T K\u1EF2 V\u0102N B\u1EA2N N\xC0O NGO\xC0I JSON):
{
  "template": "<PageA4 style=\\"padding: 10mm 15mm;\\">...</PageA4>",
  "script": "const data = reactive($context.data || {});\\nconst genderList = [{ id: 'nam', name: 'Nam' }, { id: 'nu', name: 'N\u1EEF' }];\\nreturn { data, genderList };",
  "context": {
    "data": {
      "fullName": "Nguy\u1EC5n V\u0103n An",
      "dob": "15/08/1985",
      "patientCode": "BN99281",
      "diagnosis": "Vi\xEAm ph\u1EBF qu\u1EA3n c\u1EA5p",
      "signature": ""
    }
  },
  "summary": "T\xF3m t\u1EAFt ng\u1EAFn g\u1ECDn nh\u1EEFng g\xEC \u0111\xE3 t\u1EA1o ho\u1EB7c ch\u1EC9nh s\u1EEDa"
}
`;static fetchModels(n,e){return C(this,null,function*(){let a=e?.trim()||"",i=(n?.trim()||"https://n8nz.io.vn").replace(/\/+$/,"");if(a.startsWith("AIzaSy")&&(!n||n.includes("n8nz.io.vn")||n.includes("localhost")))try{let u=yield fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${a}`);if(u.ok){let x=yield u.json();if(Array.isArray(x.models))return x.models.filter(h=>h.supportedGenerationMethods?.includes("generateContent")).map(h=>{let b=h.name?.replace(/^models\//,"")||h.name;return{id:b,name:`\u26A1 ${h.displayName||b} (${b})`,description:h.description||"Google Gemini Model"}})}}catch(u){console.warn("L\u1ED7i probe Gemini models:",u)}!i.endsWith("/v1")&&!i.endsWith("/models")&&(i=`${i}/v1`);let d=`${i.endsWith("/models")?i:`${i}/models`}?configuredOnly=true`,m={Accept:"application/json"};a&&(m.Authorization=`Bearer ${a}`);let l=yield fetch(d,{method:"GET",headers:m});if(!l.ok){let u=`HTTP ${l.status}`;try{let x=yield l.json();x?.error?.message&&(u=x.error.message)}catch{}throw new Error(u)}let p=yield l.json(),c=Array.isArray(p.data)?p.data:Array.isArray(p)?p:[];return c.length>0?c.map(u=>{let x=u.owned_by?`[${u.owned_by}] `:"",h=u.name||u.id;return{id:u.id,name:`${x}${h}`,description:u.description||u.owned_by||""}}):[]})}static generate(n,e,a){return C(this,null,function*(){let i=e?.apiKey?.trim()||"omniroute",o=e?.model||"auto";return yield this.callOmniRouteStreamAPI(n,i,o,e?.customEndpoint,a)})}static callOmniRouteStreamAPI(n,e,a,i,o){return C(this,null,function*(){let d=(i?.trim()||"https://n8nz.io.vn").replace(/\/+$/,"");!d.endsWith("/v1")&&!d.endsWith("/chat/completions")&&(d=`${d}/v1`);let m=d.endsWith("/chat/completions")?d:`${d}/chat/completions`,p=[{role:"system",content:n.templateType==="ui"?this.SYSTEM_PROMPT_UI:this.SYSTEM_PROMPT_DOCUMENT}],c="";n.currentTemplate&&n.currentTemplate.trim()?(c+=`[CH\u1EC8NH S\u1EECA / N\xC2NG C\u1EA4P TR\xCAN M\u1EAAU HI\u1EC6N T\u1EA0I]
`,c+=`Y\xEAu c\u1EA7u c\u1EE7a ng\u01B0\u1EDDi d\xF9ng: ${n.prompt}

`,c+=`--- M\xC3 TEMPLATE HI\u1EC6N T\u1EA0I ---
${n.currentTemplate}
`,n.currentScript&&(c+=`
--- M\xC3 SCRIPT HI\u1EC6N T\u1EA0I ---
${n.currentScript}
`),n.currentContext&&(c+=`
--- CONTEXT DATA HI\u1EC6N T\u1EA0I ---
${typeof n.currentContext=="string"?n.currentContext:JSON.stringify(n.currentContext,null,2)}
`)):(c+=`[T\u1EA0O M\u1EAAU M\u1EDAI T\u1EEA \u0110\u1EA6U]
`,c+=`Y\xEAu c\u1EA7u thi\u1EBFt k\u1EBF: ${n.prompt}
`),n.templateType==="document"&&(c+=`
[L\u01AFU \xDD B\u1EAET BU\u1ED8C CHO M\u1EAAU PHI\u1EBEU / B\u1EA2N IN]:
`,c+=`- S\u1EED d\u1EE5ng 100% c\xE1c component nh\u1EADp li\u1EC7u c\xF3 s\u1EB5n: <Textarea :line="true"> (cho m\u1ECDi tr\u01B0\u1EDDng h\u1ECD t\xEAn, \u0111\u1ECBa ch\u1EC9, ch\u1EA9n \u0111o\xE1n, l\u1EDDi d\u1EB7n), <DatePicker> (ng\xE0y th\xE1ng), <InputOTP> (m\xE3 s\u1ED1, tu\u1ED5i), <Select> (danh m\u1EE5c), <Checkbox> (h\u1ED9p ki\u1EC3m), <Paint> (ch\u1EEF k\xFD tr\u1EF1c ti\u1EBFp).
`,c+=`- Tuy\u1EC7t \u0111\u1ED1i KH\xD4NG d\xF9ng d\u1EA5u ch\u1EA5m th\u1EE7 c\xF4ng (....) hay input HTML th\xF4.
`),n.imageData&&(c=[{type:"text",text:c},{type:"image_url",image_url:{url:n.imageData}}]),p.push({role:"user",content:c});let u=yield fetch(m,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e||"omniroute"}`},body:JSON.stringify({model:a||"auto",messages:p,stream:!0,response_format:{type:"json_object"}})});if(!u.ok){let E=yield u.text();throw new Error(`OmniRoute API Error [${u.status}]: ${E}`)}if(!u.body)throw new Error("Response body is empty");let x=u.body.getReader(),h=new TextDecoder("utf-8"),b="",f="";for(;;){let{done:E,value:T}=yield x.read();if(E)break;b+=h.decode(T,{stream:!0});let A=b.split(`
`);b=A.pop()||"";for(let N of A){let Y=N.trim();if(Y.startsWith("data: ")){let j=Y.slice(6);if(j==="[DONE]")continue;try{let R=JSON.parse(j).choices?.[0]?.delta?.content||"";R&&(f+=R,o?.(R,f))}catch{}}}}if(!f.trim())throw new Error("OmniRoute API kh\xF4ng tr\u1EA3 v\u1EC1 d\u1EEF li\u1EC7u.");return this.parseAndSanitizeAIResponse(f,"omniroute",a||"auto")})}static parseAndSanitizeAIResponse(n,e,a){let i=n.trim();i=i.replace(/^```(json|html|xml)?/i,"").replace(/```$/i,"").trim();try{let o=JSON.parse(i),d=o.template||"",m=o.script||`const data = reactive($context.data || {});
return { data };`,l=o.context||{data:{}},p=o.summary||"Bi\u1EC3u m\u1EABu \u0111\xE3 \u0111\u01B0\u1EE3c sinh th\xE0nh c\xF4ng b\u1EDFi AI.";d=d.replace(/\.\[object\s+Object\]/g,".prevent");let c=this.healScriptAndContext(d,m,l);return m=c.script,l=c.context,d=this.ensureComponentIds(d),{template:d,script:m,context:l,summary:p,usedProvider:e,usedModel:a}}catch(o){throw console.error("L\u1ED7i ph\xE2n t\xEDch JSON t\u1EEB AI:",o,n),new Error("D\u1EEF li\u1EC7u AI tr\u1EA3 v\u1EC1 kh\xF4ng \u0111\xFAng c\u1EA5u tr\xFAc JSON mong \u0111\u1EE3i: "+o.message)}}static healScriptAndContext(n,e,a){(!a||typeof a!="object")&&(a={data:{}}),(!a.data||typeof a.data!="object")&&(a.data={}),n.includes("data.otp")&&!Array.isArray(a.data.otp)&&(a.data.otp=["","","","","",""]);let i=[{name:"loading",init:"const loading = ref(false);"},{name:"errorMessage",init:"const errorMessage = ref('');"},{name:"successMessage",init:"const successMessage = ref('');"},{name:"showPassword",init:"const showPassword = ref(false);"},{name:"togglePassword",init:'const togglePassword = () => { if (typeof showPassword !== "undefined" && isRef(showPassword)) showPassword.value = !showPassword.value; };'},{name:"handleLogin",init:"const handleLogin = () => {};"},{name:"forgotPassword",init:"const forgotPassword = () => {};"},{name:"handleOtpInput",init:"const handleOtpInput = () => {};"},{name:"handleOtpBackspace",init:"const handleOtpBackspace = () => {};"},{name:"handleSso",init:"const handleSso = () => {};"}],o=[],d=[];for(let m of i){let l=new RegExp(`\\b${m.name}\\b`),p=new RegExp(`\\b${m.name}\\b`);l.test(n)&&!p.test(e)&&(o.push(m.init),d.push(m.name))}return o.length>0&&(e.includes("return {")?e=e.replace(/return\s*\{/,`${o.join(`
`)}
return {
  ${d.join(", ")},
`):e+=`
${o.join(`
`)}
return { ${d.join(", ")} };`),{script:e,context:a}}static ensureComponentIds(n){if(!n||!n.trim())return"";try{let e=M.parseToTree(n,"Root",{"c-id":"root_gen"});return e.innerHTML=n,e.genComponentId(!0),e.innerHTML}catch{return n}}};import*as t from"@angular/core";import*as $ from"@angular/common";import*as y from"@angular/forms";var rt=["streamConsoleBody"],st=["fileInput"],dt=(r,n)=>n.id;function lt(r,n){r&1&&t.\u0275\u0275element(0,"span",25)}function ct(r,n){if(r&1){let e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div",58),t.\u0275\u0275element(1,"i",59),t.\u0275\u0275elementStart(2,"span",60),t.\u0275\u0275text(3,"\u0110ang s\u1EEDa m\u1EABu:"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(4,"b",61),t.\u0275\u0275text(5),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(6,"button",62),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext(2);return t.\u0275\u0275resetView(i.startNewBlank())}),t.\u0275\u0275element(7,"i",63),t.\u0275\u0275text(8," T\u1EA1o m\u1EABu tr\u1EAFng "),t.\u0275\u0275elementEnd()}if(r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(4),t.\u0275\u0275property("title",e.currentTemplateName),t.\u0275\u0275advance(),t.\u0275\u0275textInterpolate(e.currentTemplateName||"M\u1EABu hi\u1EC7n t\u1EA1i")}}function pt(r,n){if(r&1){let e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",67),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext(3);return t.\u0275\u0275resetView(i.resetToOriginal())}),t.\u0275\u0275element(1,"i",68),t.\u0275\u0275text(2," V\u1EC1 m\u1EABu \u0111ang m\u1EDF "),t.\u0275\u0275elementEnd()}}function gt(r,n){if(r&1&&(t.\u0275\u0275elementStart(0,"div",64),t.\u0275\u0275element(1,"i",65),t.\u0275\u0275elementStart(2,"span",60),t.\u0275\u0275text(3,"\u0110ang t\u1EA1o m\u1EABu m\u1EDBi t\u1EEB \u0111\u1EA7u"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275conditionalCreate(4,pt,3,0,"button",66)),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(4),t.\u0275\u0275conditional(e.hasOriginalTemplate?4:-1)}}function mt(r,n){if(r&1){let e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div",32)(1,"div",69),t.\u0275\u0275element(2,"img",70),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(3,"div",71)(4,"span",72),t.\u0275\u0275element(5,"i",73),t.\u0275\u0275text(6," \u1EA2nh bi\u1EC3u m\u1EABu \u0111\xEDnh k\xE8m"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(7,"span",74),t.\u0275\u0275text(8,"AI s\u1EBD ph\xE2n t\xEDch c\u1EA5u tr\xFAc tr\u1EF1c quan t\u1EEB \u1EA3nh"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(9,"button",75),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext(2);return t.\u0275\u0275resetView(i.removeAttachedImage())}),t.\u0275\u0275text(10,"\u2715"),t.\u0275\u0275elementEnd()()}if(r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(2),t.\u0275\u0275property("src",e.imageData,t.\u0275\u0275sanitizeUrl)}}function ut(r,n){r&1&&(t.\u0275\u0275element(0,"i",76),t.\u0275\u0275elementStart(1,"span"),t.\u0275\u0275text(2,"\u0110ang x\u1EED l\xFD..."),t.\u0275\u0275elementEnd())}function ht(r,n){if(r&1&&(t.\u0275\u0275element(0,"i",77),t.\u0275\u0275elementStart(1,"span"),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(e.isWorkingOnExisting||e.result?"AI C\u1EADp nh\u1EADt":"AI Thi\u1EBFt k\u1EBF")}}function xt(r,n){if(r&1&&(t.\u0275\u0275elementStart(0,"div",42)(1,"div",78)(2,"div",79),t.\u0275\u0275element(3,"span",80),t.\u0275\u0275elementStart(4,"span"),t.\u0275\u0275text(5),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(6,"div",81)(7,"span",82),t.\u0275\u0275element(8,"i",83),t.\u0275\u0275text(9),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(10,"div",84,1)(12,"pre",85)(13,"code"),t.\u0275\u0275text(14),t.\u0275\u0275elementStart(15,"span",86),t.\u0275\u0275text(16,"\u258C"),t.\u0275\u0275elementEnd()()()()()),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(5),t.\u0275\u0275textInterpolate1("\u0110ang k\u1EBFt n\u1ED1i v\xE0 nh\u1EADn d\u1EEF li\u1EC7u t\u1EEB ",e.config.model,"..."),t.\u0275\u0275advance(4),t.\u0275\u0275textInterpolate1(" ",e.streamingChars," k\xFD t\u1EF1"),t.\u0275\u0275advance(5),t.\u0275\u0275textInterpolate(e.streamingText||"Kh\u1EDFi t\u1EA1o lu\u1ED3ng x\u1EED l\xFD...")}}function ft(r,n){if(r&1){let e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",93),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext(3);return t.\u0275\u0275resetView(i.resetToOriginal())}),t.\u0275\u0275element(1,"i",68),t.\u0275\u0275text(2," Ho\xE0n t\xE1c v\u1EC1 b\u1EA3n g\u1ED1c "),t.\u0275\u0275elementEnd()}}function bt(r,n){if(r&1&&(t.\u0275\u0275elementStart(0,"div",43)(1,"div",87)(2,"div",88),t.\u0275\u0275element(3,"i",89),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(4,"div",90),t.\u0275\u0275text(5),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(6,"div",91),t.\u0275\u0275conditionalCreate(7,ft,3,0,"button",92),t.\u0275\u0275elementEnd()()),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(5),t.\u0275\u0275textInterpolate(e.result.summary),t.\u0275\u0275advance(2),t.\u0275\u0275conditional(e.hasOriginalTemplate?7:-1)}}function vt(r,n){if(r&1&&(t.\u0275\u0275elementStart(0,"span",55),t.\u0275\u0275element(1,"i",94),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate1(" ",e.copyToastMessage)}}function _t(r,n){if(r&1){let e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",96),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext(3);return t.\u0275\u0275resetView(i.applyToEditor(!0))}),t.\u0275\u0275element(1,"i",94),t.\u0275\u0275text(2," C\u1EADp nh\u1EADt phi\u1EBFu n\xE0y "),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(3,"button",97),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext(3);return t.\u0275\u0275resetView(i.applyToEditor(!1))}),t.\u0275\u0275element(4,"i",98),t.\u0275\u0275text(5," L\u01B0u b\u1EA3n sao m\u1EDBi "),t.\u0275\u0275elementEnd()}}function Ct(r,n){if(r&1){let e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"button",99),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext(3);return t.\u0275\u0275resetView(i.applyToEditor(!1))}),t.\u0275\u0275element(1,"i",89),t.\u0275\u0275text(2," \xC1p d\u1EE5ng v\xE0o Editor "),t.\u0275\u0275elementEnd()}}function yt(r,n){if(r&1&&t.\u0275\u0275conditionalCreate(0,_t,6,0)(1,Ct,3,0,"button",95),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275conditional(e.isWorkingOnExisting?0:1)}}function Mt(r,n){if(r&1){let e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div",100)(1,"div",102)(2,"span",103),t.\u0275\u0275element(3,"i",104),t.\u0275\u0275text(4," Vue 3 Live Interactive Canvas "),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(5,"div",105)(6,"button",106),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext(3);return t.\u0275\u0275resetView(i.aiPreviewEditMode=!1)}),t.\u0275\u0275element(7,"i",107),t.\u0275\u0275text(8," Xem & \u0110i\u1EC1n th\u1EED "),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(9,"button",106),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext(3);return t.\u0275\u0275resetView(i.aiPreviewEditMode=!0)}),t.\u0275\u0275element(10,"i",108),t.\u0275\u0275text(11," Tr\xECnh thi\u1EBFt k\u1EBF DOM "),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(12,"div",109)(13,"template-editor",110),t.\u0275\u0275twoWayListener("templateChange",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext(3);return t.\u0275\u0275twoWayBindingSet(o.displayTemplate,i)||(o.displayTemplate=i),t.\u0275\u0275resetView(i)})("scriptChange",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext(3);return t.\u0275\u0275twoWayBindingSet(o.displayScript,i)||(o.displayScript=i),t.\u0275\u0275resetView(i)})("contextChange",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext(3);return t.\u0275\u0275twoWayBindingSet(o.displayContext,i)||(o.displayContext=i),t.\u0275\u0275resetView(i)})("editModeChange",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext(3);return t.\u0275\u0275twoWayBindingSet(o.aiPreviewEditMode,i)||(o.aiPreviewEditMode=i),t.\u0275\u0275resetView(i)}),t.\u0275\u0275elementEnd()()()}if(r&2){let e=t.\u0275\u0275nextContext(3);t.\u0275\u0275advance(6),t.\u0275\u0275classProp("active",!e.aiPreviewEditMode),t.\u0275\u0275advance(3),t.\u0275\u0275classProp("active",e.aiPreviewEditMode),t.\u0275\u0275advance(4),t.\u0275\u0275twoWayProperty("template",e.displayTemplate)("script",e.displayScript)("context",e.displayContext)("editMode",e.aiPreviewEditMode)}}function Tt(r,n){r&1&&(t.\u0275\u0275elementStart(0,"div",101)(1,"div",111),t.\u0275\u0275element(2,"i",9),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(3,"h4"),t.\u0275\u0275text(4,"S\u1EB5n s\xE0ng thi\u1EBFt k\u1EBF c\xF9ng AI"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(5,"p"),t.\u0275\u0275text(6,"Nh\u1EADp y\xEAu c\u1EA7u v\xE0o khung b\xEAn tr\xE1i (ho\u1EB7c \u0111\xEDnh k\xE8m \u1EA3nh ch\u1EE5p m\u1EABu bi\u1EC3u) v\xE0 nh\u1EA5n "),t.\u0275\u0275elementStart(7,"b"),t.\u0275\u0275text(8,"AI Thi\u1EBFt k\u1EBF"),t.\u0275\u0275elementEnd(),t.\u0275\u0275text(9," \u0111\u1EC3 xem tr\u01B0\u1EDBc giao di\u1EC7n tr\u1EF1c ti\u1EBFp t\u1EA1i \u0111\xE2y."),t.\u0275\u0275elementEnd()())}function Pt(r,n){if(r&1&&t.\u0275\u0275conditionalCreate(0,Mt,14,8,"div",100)(1,Tt,10,0,"div",101),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275conditional(e.displayTemplate?0:1)}}function wt(r,n){if(r&1&&(t.\u0275\u0275elementStart(0,"div",57)(1,"pre")(2,"code"),t.\u0275\u0275text(3),t.\u0275\u0275elementEnd()()()),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(3),t.\u0275\u0275textInterpolate(e.displayTemplate)}}function kt(r,n){if(r&1&&(t.\u0275\u0275elementStart(0,"div",57)(1,"pre")(2,"code"),t.\u0275\u0275text(3),t.\u0275\u0275elementEnd()()()),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(3),t.\u0275\u0275textInterpolate(e.displayScript)}}function Ot(r,n){if(r&1&&(t.\u0275\u0275elementStart(0,"div",57)(1,"pre")(2,"code"),t.\u0275\u0275text(3),t.\u0275\u0275elementEnd()()()),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(3),t.\u0275\u0275textInterpolate(e.stringifyContext(e.displayContext))}}function Et(r,n){if(r&1){let e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div",4),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.close())}),t.\u0275\u0275elementStart(1,"div",5),t.\u0275\u0275listener("click",function(i){return t.\u0275\u0275restoreView(e),t.\u0275\u0275resetView(i.stopPropagation())}),t.\u0275\u0275elementStart(2,"div",6)(3,"div",7)(4,"div",8),t.\u0275\u0275element(5,"i",9),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(6,"div",10)(7,"div",11)(8,"h3",12),t.\u0275\u0275text(9,"AI Template Designer"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(10,"span",13),t.\u0275\u0275text(11,"Ctrl+Shift+A"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(12,"div",14)(13,"span",15),t.\u0275\u0275element(14,"i",16),t.\u0275\u0275text(15),t.\u0275\u0275elementEnd()()()(),t.\u0275\u0275elementStart(16,"div",17)(17,"div",18)(18,"button",19),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.setTemplateType("ui"))}),t.\u0275\u0275element(19,"i",20),t.\u0275\u0275elementStart(20,"span"),t.\u0275\u0275text(21,"Thi\u1EBFt k\u1EBF Giao di\u1EC7n (Web/App)"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(22,"button",19),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.setTemplateType("document"))}),t.\u0275\u0275element(23,"i",21),t.\u0275\u0275elementStart(24,"span"),t.\u0275\u0275text(25,"Thi\u1EBFt k\u1EBF M\u1EABu phi\u1EBFu (B\u1EA3n in A4/A5)"),t.\u0275\u0275elementEnd()()()(),t.\u0275\u0275elementStart(26,"div",22)(27,"button",23),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.showSettingsModal=!0)}),t.\u0275\u0275element(28,"i",24),t.\u0275\u0275conditionalCreate(29,lt,1,0,"span",25),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(30,"button",26),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.isFullScreen=!i.isFullScreen)}),t.\u0275\u0275element(31,"i",27),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(32,"button",28),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.close())}),t.\u0275\u0275text(33,"\u2715"),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(34,"div",29)(35,"div",30),t.\u0275\u0275listener("dragover",function(i){return t.\u0275\u0275restoreView(e),t.\u0275\u0275resetView(i.preventDefault())})("drop",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(o.onDropImage(i))}),t.\u0275\u0275elementStart(36,"div",31),t.\u0275\u0275conditionalCreate(37,ct,9,2)(38,gt,5,1),t.\u0275\u0275elementEnd(),t.\u0275\u0275conditionalCreate(39,mt,11,1,"div",32),t.\u0275\u0275elementStart(40,"div",33)(41,"textarea",34),t.\u0275\u0275twoWayListener("ngModelChange",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext();return t.\u0275\u0275twoWayBindingSet(o.promptText,i)||(o.promptText=i),t.\u0275\u0275resetView(i)}),t.\u0275\u0275listener("keydown",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(o.onPromptKeydown(i))}),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(42,"input",35,0),t.\u0275\u0275listener("change",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(o.onFileSelected(i))}),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(44,"div",36)(45,"div",37)(46,"button",38),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.triggerFileInput())}),t.\u0275\u0275element(47,"i",39),t.\u0275\u0275elementStart(48,"span"),t.\u0275\u0275text(49),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(50,"div",40)(51,"button",41),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.onSendPrompt())}),t.\u0275\u0275conditionalCreate(52,ut,3,0)(53,ht,3,1),t.\u0275\u0275elementEnd()()()(),t.\u0275\u0275conditionalCreate(54,xt,17,3,"div",42),t.\u0275\u0275conditionalCreate(55,bt,8,2,"div",43),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(56,"div",44)(57,"div",45)(58,"div",46)(59,"button",47),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.resultViewTab="preview")}),t.\u0275\u0275element(60,"i",48),t.\u0275\u0275text(61," Xem tr\u01B0\u1EDBc "),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(62,"button",47),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.resultViewTab="template")}),t.\u0275\u0275element(63,"i",49),t.\u0275\u0275text(64," HTML Template "),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(65,"button",47),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.resultViewTab="script")}),t.\u0275\u0275element(66,"i",50),t.\u0275\u0275text(67," Script JS "),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(68,"button",47),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.resultViewTab="context")}),t.\u0275\u0275element(69,"i",51),t.\u0275\u0275text(70," D\u1EEF li\u1EC7u Mock "),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(71,"div",52)(72,"button",53),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.copyCurrentViewCode())}),t.\u0275\u0275element(73,"i",54),t.\u0275\u0275text(74," Sao ch\xE9p "),t.\u0275\u0275elementEnd(),t.\u0275\u0275conditionalCreate(75,vt,3,1,"span",55),t.\u0275\u0275conditionalCreate(76,yt,2,1),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(77,"div",56),t.\u0275\u0275conditionalCreate(78,Pt,2,1),t.\u0275\u0275conditionalCreate(79,wt,4,1,"div",57),t.\u0275\u0275conditionalCreate(80,kt,4,1,"div",57),t.\u0275\u0275conditionalCreate(81,Ot,4,1,"div",57),t.\u0275\u0275elementEnd()()()()()}if(r&2){let e=t.\u0275\u0275nextContext();t.\u0275\u0275advance(),t.\u0275\u0275classProp("is-fullscreen",e.isFullScreen),t.\u0275\u0275advance(14),t.\u0275\u0275textInterpolate1(" ",e.config.model||"auto"),t.\u0275\u0275advance(3),t.\u0275\u0275classProp("active",e.templateType==="ui"),t.\u0275\u0275advance(4),t.\u0275\u0275classProp("active",e.templateType==="document"),t.\u0275\u0275advance(7),t.\u0275\u0275conditional(e.config.apiKey?-1:29),t.\u0275\u0275advance(),t.\u0275\u0275property("title",e.isFullScreen?"Thu nh\u1ECF c\u1EEDa s\u1ED5":"Ph\xF3ng to to\xE0n m\xE0n h\xECnh"),t.\u0275\u0275advance(),t.\u0275\u0275property("ngClass",e.isFullScreen?"fa-compress":"fa-expand"),t.\u0275\u0275advance(6),t.\u0275\u0275conditional(e.isWorkingOnExisting?37:38),t.\u0275\u0275advance(2),t.\u0275\u0275conditional(e.imageData?39:-1),t.\u0275\u0275advance(2),t.\u0275\u0275twoWayProperty("ngModel",e.promptText),t.\u0275\u0275property("placeholder",e.templateType==="ui"?`M\xF4 t\u1EA3 y\xEAu c\u1EA7u giao di\u1EC7n (Web/App) ho\u1EB7c chi ti\u1EBFt c\u1EA7n s\u1EEDa \u0111\u1ED5i...
V\xED d\u1EE5: T\u1EA1o m\xE0n h\xECnh Dashboard qu\u1EA3n tr\u1ECB doanh thu, th\xEAm b\u1EA3ng danh s\xE1ch ti\u1EBFp \u0111\xF3n v\xE0 b\u1ED9 l\u1ECDc ng\xE0y. Ho\u1EB7c: \u0110\u1ED5i m\xE0u c\xE1c n\xFAt sang xanh l\xE1 Emerald (#10b981)...

(Nh\u1EA5n Ctrl+Enter \u0111\u1EC3 g\u1EEDi)`:`M\xF4 t\u1EA3 y\xEAu c\u1EA7u m\u1EABu bi\u1EC3u (B\u1EA3n in) ho\u1EB7c chi ti\u1EBFt c\u1EA7n s\u1EEDa \u0111\u1ED5i...
V\xED d\u1EE5: T\u1EA1o m\u1EABu \u0110\u01A1n thu\u1ED1c ngo\u1EA1i tr\xFA kh\u1ED5 A5 d\u1ECDc c\xF3 3 m\u1EE5c thu\u1ED1c, h\u01B0\u1EDBng d\u1EABn li\u1EC1u d\xF9ng v\xE0 \xF4 k\xFD t\xEAn Paint. Ho\u1EB7c: Th\xEAm \xF4 DatePicker ng\xE0y h\u1EB9n t\xE1i kh\xE1m...

(Nh\u1EA5n Ctrl+Enter \u0111\u1EC3 g\u1EEDi)`),t.\u0275\u0275advance(8),t.\u0275\u0275textInterpolate(e.imageData?"\u0110\u1ED5i \u1EA3nh":"\u0110\xEDnh k\xE8m \u1EA3nh scan"),t.\u0275\u0275advance(2),t.\u0275\u0275property("disabled",e.isGenerating||!e.promptText.trim()&&!e.imageData),t.\u0275\u0275advance(),t.\u0275\u0275conditional(e.isGenerating?52:53),t.\u0275\u0275advance(2),t.\u0275\u0275conditional(e.isGenerating?54:-1),t.\u0275\u0275advance(),t.\u0275\u0275conditional(e.result&&!e.isGenerating?55:-1),t.\u0275\u0275advance(4),t.\u0275\u0275classProp("active",e.resultViewTab==="preview"),t.\u0275\u0275advance(3),t.\u0275\u0275classProp("active",e.resultViewTab==="template"),t.\u0275\u0275advance(3),t.\u0275\u0275classProp("active",e.resultViewTab==="script"),t.\u0275\u0275advance(3),t.\u0275\u0275classProp("active",e.resultViewTab==="context"),t.\u0275\u0275advance(7),t.\u0275\u0275conditional(e.copyToastMessage?75:-1),t.\u0275\u0275advance(),t.\u0275\u0275conditional(e.displayTemplate?76:-1),t.\u0275\u0275advance(2),t.\u0275\u0275conditional(e.resultViewTab==="preview"?78:-1),t.\u0275\u0275advance(),t.\u0275\u0275conditional(e.resultViewTab==="template"?79:-1),t.\u0275\u0275advance(),t.\u0275\u0275conditional(e.resultViewTab==="script"?80:-1),t.\u0275\u0275advance(),t.\u0275\u0275conditional(e.resultViewTab==="context"?81:-1)}}function At(r,n){if(r&1&&(t.\u0275\u0275elementStart(0,"option",129),t.\u0275\u0275text(1),t.\u0275\u0275elementEnd()),r&2){let e=n.$implicit;t.\u0275\u0275property("value",e.id),t.\u0275\u0275advance(),t.\u0275\u0275textInterpolate(e.name)}}function Nt(r,n){r&1&&(t.\u0275\u0275elementStart(0,"option",130),t.\u0275\u0275text(1,"\u{1F3AF} auto (M\u1EB7c \u0111\u1ECBnh)"),t.\u0275\u0275elementEnd())}function St(r,n){if(r&1&&(t.\u0275\u0275elementStart(0,"div",132),t.\u0275\u0275element(1,"i",140),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate1(" ",e.loadModelsError)}}function It(r,n){if(r&1){let e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div",118)(1,"label",119),t.\u0275\u0275text(2,"Nh\u1EADp t\xEAn Model ID:"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(3,"input",141),t.\u0275\u0275twoWayListener("ngModelChange",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext(2);return t.\u0275\u0275twoWayBindingSet(o.customModelId,i)||(o.customModelId=i),t.\u0275\u0275resetView(i)}),t.\u0275\u0275elementEnd()()}if(r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(3),t.\u0275\u0275twoWayProperty("ngModel",e.customModelId)}}function Dt(r,n){if(r&1&&(t.\u0275\u0275elementStart(0,"span",142),t.\u0275\u0275text(1),t.\u0275\u0275elementEnd()),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275classProp("success",e.testConnectionStatus==="success")("error",e.testConnectionStatus==="failed"),t.\u0275\u0275advance(),t.\u0275\u0275textInterpolate1(" ",e.testConnectionMessage," ")}}function Bt(r,n){if(r&1&&(t.\u0275\u0275elementStart(0,"span",138),t.\u0275\u0275element(1,"i",94),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()),r&2){let e=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate1(" ",e.saveSuccessMsg)}}function Ht(r,n){if(r&1){let e=t.\u0275\u0275getCurrentView();t.\u0275\u0275elementStart(0,"div",112),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.showSettingsModal=!1)}),t.\u0275\u0275elementStart(1,"div",113),t.\u0275\u0275listener("click",function(i){return t.\u0275\u0275restoreView(e),t.\u0275\u0275resetView(i.stopPropagation())}),t.\u0275\u0275elementStart(2,"div",114)(3,"div",115),t.\u0275\u0275element(4,"i",24),t.\u0275\u0275elementStart(5,"span"),t.\u0275\u0275text(6,"C\u1EA5u h\xECnh OmniRoute Gateway & M\xF4 h\xECnh AI"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(7,"button",116),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.showSettingsModal=!1)}),t.\u0275\u0275text(8,"\u2715"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(9,"div",117)(10,"div",118)(11,"label",119),t.\u0275\u0275text(12,"Gateway Endpoint URL:"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(13,"input",120),t.\u0275\u0275twoWayListener("ngModelChange",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext();return t.\u0275\u0275twoWayBindingSet(o.config.customEndpoint,i)||(o.config.customEndpoint=i),t.\u0275\u0275resetView(i)}),t.\u0275\u0275listener("change",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.onApiKeyOrEndpointChange())}),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(14,"div",121)(15,"button",122),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.setQuickEndpoint("https://n8nz.io.vn/v1"))}),t.\u0275\u0275text(16,"Cloud: n8nz.io.vn"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(17,"button",122),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.setQuickEndpoint("http://localhost:5000/v1"))}),t.\u0275\u0275text(18,"Local: localhost:5000"),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(19,"div",118)(20,"label",119),t.\u0275\u0275text(21,"API Key / Secret Token:"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(22,"div",123)(23,"input",124),t.\u0275\u0275twoWayListener("ngModelChange",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext();return t.\u0275\u0275twoWayBindingSet(o.config.apiKey,i)||(o.config.apiKey=i),t.\u0275\u0275resetView(i)}),t.\u0275\u0275listener("change",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.onApiKeyOrEndpointChange())}),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(24,"button",125),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.showApiKey=!i.showApiKey)}),t.\u0275\u0275element(25,"i",27),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(26,"div",118)(27,"div",126)(28,"label",119),t.\u0275\u0275text(29,"M\xF4 h\xECnh AI (Model):"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(30,"button",127),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.loadModels())}),t.\u0275\u0275element(31,"i",27),t.\u0275\u0275text(32),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(33,"select",128),t.\u0275\u0275twoWayListener("ngModelChange",function(i){t.\u0275\u0275restoreView(e);let o=t.\u0275\u0275nextContext();return t.\u0275\u0275twoWayBindingSet(o.config.model,i)||(o.config.model=i),t.\u0275\u0275resetView(i)}),t.\u0275\u0275repeaterCreate(34,At,2,2,"option",129,dt),t.\u0275\u0275conditionalCreate(36,Nt,2,0,"option",130),t.\u0275\u0275elementStart(37,"option",131),t.\u0275\u0275text(38,"\u270F\uFE0F Nh\u1EADp m\xE3 Model ID t\xF9y ch\u1EC9nh..."),t.\u0275\u0275elementEnd()(),t.\u0275\u0275conditionalCreate(39,St,3,1,"div",132),t.\u0275\u0275elementEnd(),t.\u0275\u0275conditionalCreate(40,It,4,1,"div",118),t.\u0275\u0275elementStart(41,"div",133)(42,"button",134),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.testConnection())}),t.\u0275\u0275element(43,"i",135),t.\u0275\u0275text(44," Ki\u1EC3m tra k\u1EBFt n\u1ED1i "),t.\u0275\u0275elementEnd(),t.\u0275\u0275conditionalCreate(45,Dt,2,5,"span",136),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(46,"div",137),t.\u0275\u0275conditionalCreate(47,Bt,3,1,"span",138),t.\u0275\u0275elementStart(48,"button",139),t.\u0275\u0275listener("click",function(){t.\u0275\u0275restoreView(e);let i=t.\u0275\u0275nextContext();return t.\u0275\u0275resetView(i.saveConfig())}),t.\u0275\u0275element(49,"i",94),t.\u0275\u0275text(50," L\u01B0u & \u0110\xF3ng "),t.\u0275\u0275elementEnd()()()()}if(r&2){let e=t.\u0275\u0275nextContext();t.\u0275\u0275advance(13),t.\u0275\u0275twoWayProperty("ngModel",e.config.customEndpoint),t.\u0275\u0275advance(10),t.\u0275\u0275property("type",e.showApiKey?"text":"password"),t.\u0275\u0275twoWayProperty("ngModel",e.config.apiKey),t.\u0275\u0275advance(2),t.\u0275\u0275property("ngClass",e.showApiKey?"fa-eye-slash":"fa-eye"),t.\u0275\u0275advance(5),t.\u0275\u0275property("disabled",e.isLoadingModels),t.\u0275\u0275advance(),t.\u0275\u0275property("ngClass",e.isLoadingModels?"fa-spinner fa-spin":"fa-refresh"),t.\u0275\u0275advance(),t.\u0275\u0275textInterpolate1(" ",e.isLoadingModels?"\u0110ang t\u1EA3i...":"L\xE0m m\u1EDBi"," "),t.\u0275\u0275advance(),t.\u0275\u0275twoWayProperty("ngModel",e.config.model),t.\u0275\u0275advance(),t.\u0275\u0275repeater(e.availableModels),t.\u0275\u0275advance(2),t.\u0275\u0275conditional(e.availableModels.length===0?36:-1),t.\u0275\u0275advance(3),t.\u0275\u0275conditional(e.loadModelsError?39:-1),t.\u0275\u0275advance(),t.\u0275\u0275conditional(e.config.model==="custom"?40:-1),t.\u0275\u0275advance(2),t.\u0275\u0275property("disabled",e.testConnectionStatus==="testing"),t.\u0275\u0275advance(3),t.\u0275\u0275conditional(e.testConnectionMessage?45:-1),t.\u0275\u0275advance(2),t.\u0275\u0275conditional(e.saveSuccessMsg?47:-1)}}var z=class r{visible=!1;visibleChange=new G;currentTemplate="";currentScript="";currentContext={};currentTemplateName="";currentTemplateBadge="";currentTemplateIcon="";currentTemplateDescription="";applyTemplate=new G;applyContext=new G;streamConsoleBodyRef;fileInputRef;isFullScreen=!0;showSettingsModal=!1;templateType="ui";isNewBlankMode=!1;promptText="";imageData="";isGenerating=!1;streamingText="";streamingChars=0;result=null;resultViewTab="preview";aiPreviewEditMode=!1;copyToastMessage="";saveSuccessMsg="";config={provider:"omniroute",apiKey:"",model:"auto",customEndpoint:"https://n8nz.io.vn/v1"};availableModels=[];isLoadingModels=!1;loadModelsError="";customModelId="";showApiKey=!1;testConnectionStatus="idle";testConnectionMessage="";constructor(){let n=localStorage.getItem("ai_provider_config");if(n)try{this.config=w(w({},this.config),JSON.parse(n))}catch(e){console.warn("L\u1ED7i \u0111\u1ECDc c\u1EA5u h\xECnh AI:",e)}}ngOnInit(){this.loadModels()}ngOnChanges(n){(n.visible&&this.visible||n.currentTemplate&&this.visible)&&this.syncCurrentTemplateInfo()}get hasOriginalTemplate(){return!!(this.currentTemplate&&this.currentTemplate.trim().length>15)}get isWorkingOnExisting(){return!this.isNewBlankMode&&this.hasOriginalTemplate}get displayTemplate(){return this.result?.template||(this.isNewBlankMode?"":this.currentTemplate)||""}set displayTemplate(n){this.result&&(this.result.template=n)}get displayScript(){return this.result?.script||(this.isNewBlankMode?"":this.currentScript)||""}set displayScript(n){this.result&&(this.result.script=n)}get displayContext(){return this.result?.context||(this.isNewBlankMode?{}:this.currentContext)||{}}set displayContext(n){this.result&&(this.result.context=n)}syncCurrentTemplateInfo(){if(this.result=null,this.promptText="",this.imageData="",this.isNewBlankMode=!1,this.hasOriginalTemplate){let n=this.currentTemplate.includes("<PageA4")||this.currentTemplate.includes("<PageA5");this.templateType=n?"document":"ui"}}startNewBlank(){this.isNewBlankMode=!0,this.result=null,this.promptText="",this.imageData="",this.streamingText=""}resetToOriginal(){this.isNewBlankMode=!1,this.result=null,this.promptText="",this.imageData="",this.streamingText=""}setTemplateType(n){this.templateType=n}handleGlobalKeyDown(n){n.ctrlKey&&n.shiftKey&&(n.key==="A"||n.key==="a")&&(n.preventDefault(),this.visible=!this.visible,this.visibleChange.emit(this.visible)),n.key==="Escape"&&this.visible&&(this.showSettingsModal?this.showSettingsModal=!1:this.close())}handlePaste(n){if(!this.visible)return;let e=n.clipboardData?.items;if(e){for(let a=0;a<e.length;a++)if(e[a].type.indexOf("image")!==-1){let i=e[a].getAsFile();if(i){this.processFile(i),n.preventDefault();break}}}}onPromptKeydown(n){n.ctrlKey&&n.key==="Enter"&&(n.preventDefault(),this.onSendPrompt())}close(){this.visible=!1,this.visibleChange.emit(!1)}triggerFileInput(){this.fileInputRef?.nativeElement?.click()}onFileSelected(n){let e=n.target;e.files&&e.files[0]&&this.processFile(e.files[0])}onDropImage(n){n.preventDefault(),n.dataTransfer?.files&&n.dataTransfer.files[0]&&this.processFile(n.dataTransfer.files[0])}processFile(n){let e=new FileReader;e.onload=a=>{this.imageData=a.target?.result||""},e.readAsDataURL(n)}removeAttachedImage(){this.imageData="",this.fileInputRef?.nativeElement&&(this.fileInputRef.nativeElement.value="")}onChunkReceived(n,e){this.streamingText=e,this.streamingChars=e.length,setTimeout(()=>{this.streamConsoleBodyRef?.nativeElement&&(this.streamConsoleBodyRef.nativeElement.scrollTop=this.streamConsoleBodyRef.nativeElement.scrollHeight)},10)}onSendPrompt(){return C(this,null,function*(){if(!(!this.promptText.trim()&&!this.imageData)){this.isGenerating=!0,this.streamingText="",this.streamingChars=0;try{let n=this.result?.template||(this.isWorkingOnExisting?this.currentTemplate:void 0),e=this.result?.script||(this.isWorkingOnExisting?this.currentScript:void 0),a=this.result?.context||(this.isWorkingOnExisting?this.currentContext:void 0),i=!!(n&&n.trim()),o={prompt:this.promptText.trim()||(this.imageData?"B\xF3c t\xE1ch v\xE0 d\u1EF1ng c\u1EA5u tr\xFAc t\u1EEB \u1EA3nh \u0111\xEDnh k\xE8m":""),mode:i?"tweak":this.imageData?"image":"prompt",currentTemplate:i?n:void 0,currentScript:i?e:void 0,currentContext:i?a:void 0,templateType:this.templateType,imageData:this.imageData||void 0},d=yield O.generate(o,this.config,(m,l)=>this.onChunkReceived(m,l));this.result=d,this.promptText="",this.imageData=""}catch(n){alert("L\u1ED7i x\u1EED l\xFD AI: "+(n?.message||n))}finally{this.isGenerating=!1}}})}applyToEditor(n=!1){this.displayTemplate&&(this.applyTemplate.emit({template:this.displayTemplate,script:this.displayScript,context:this.displayContext,isUpdateCurrent:n}),this.close())}copyCurrentViewCode(){let n="",e="";this.resultViewTab==="template"?(n=this.displayTemplate,e="Template HTML"):this.resultViewTab==="script"?(n=this.displayScript,e="Script Vue 3"):this.resultViewTab==="context"?(n=JSON.stringify(this.displayContext,null,2),e="Mock Context Data"):(n=this.displayTemplate,e="Template HTML"),this.copyCode(n,e)}copyCode(n,e="m\xE3"){navigator.clipboard&&(navigator.clipboard.writeText(n),this.copyToastMessage=`\u0110\xE3 sao ch\xE9p ${e}!`,setTimeout(()=>{this.copyToastMessage=""},2500))}loadModels(){return C(this,null,function*(){this.isLoadingModels=!0,this.loadModelsError="";try{this.availableModels=yield O.fetchModels(this.config.customEndpoint,this.config.apiKey),this.availableModels.length>0&&!this.availableModels.some(n=>n.id===this.config.model)&&(!this.config.model||this.config.model==="custom"||(this.config.model=this.availableModels[0].id))}catch(n){this.loadModelsError=n?.message||"Kh\xF4ng th\u1EC3 x\xE1c th\u1EF1c API Key ho\u1EB7c k\u1EBFt n\u1ED1i Gateway."}finally{this.isLoadingModels=!1}})}onApiKeyOrEndpointChange(){this.loadModels()}setQuickEndpoint(n){this.config.customEndpoint=n,this.testConnectionStatus="idle",this.testConnectionMessage="",this.onApiKeyOrEndpointChange()}testConnection(){return C(this,null,function*(){this.testConnectionStatus="testing",this.testConnectionMessage="\u0110ang ki\u1EC3m tra k\u1EBFt n\u1ED1i...";try{let n=yield O.fetchModels(this.config.customEndpoint,this.config.apiKey);this.testConnectionStatus="success",this.testConnectionMessage=`K\u1EBFt n\u1ED1i th\xE0nh c\xF4ng! Nh\u1EADn di\u1EC7n ${n.length} m\xF4 h\xECnh.`,this.availableModels=n,this.loadModelsError=""}catch(n){this.testConnectionStatus="failed",this.testConnectionMessage=n?.message||"Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i \u0111\u1EBFn Endpoint n\xE0y."}})}saveConfig(){this.config.model==="custom"&&this.customModelId.trim()&&(this.config.model=this.customModelId.trim()),localStorage.setItem("ai_provider_config",JSON.stringify(this.config)),this.saveSuccessMsg="\u0110\xE3 l\u01B0u c\u1EA5u h\xECnh!",this.loadModels(),setTimeout(()=>{this.saveSuccessMsg="",this.showSettingsModal=!1},1200)}stringifyContext(n){return JSON.stringify(n,null,2)}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=t.\u0275\u0275defineComponent({type:r,selectors:[["app-ai-assistant-modal"]],viewQuery:function(e,a){if(e&1&&(t.\u0275\u0275viewQuery(rt,5),t.\u0275\u0275viewQuery(st,5)),e&2){let i;t.\u0275\u0275queryRefresh(i=t.\u0275\u0275loadQuery())&&(a.streamConsoleBodyRef=i.first),t.\u0275\u0275queryRefresh(i=t.\u0275\u0275loadQuery())&&(a.fileInputRef=i.first)}},hostBindings:function(e,a){e&1&&t.\u0275\u0275listener("keydown",function(o){return a.handleGlobalKeyDown(o)},t.\u0275\u0275resolveDocument)("paste",function(o){return a.handlePaste(o)})},inputs:{visible:"visible",currentTemplate:"currentTemplate",currentScript:"currentScript",currentContext:"currentContext",currentTemplateName:"currentTemplateName",currentTemplateBadge:"currentTemplateBadge",currentTemplateIcon:"currentTemplateIcon",currentTemplateDescription:"currentTemplateDescription"},outputs:{visibleChange:"visibleChange",applyTemplate:"applyTemplate",applyContext:"applyContext"},features:[t.\u0275\u0275NgOnChangesFeature],decls:2,vars:2,consts:[["fileInput",""],["streamConsoleBody",""],[1,"ai-modal-backdrop"],[1,"settings-modal-backdrop"],[1,"ai-modal-backdrop",3,"click"],[1,"ai-modal-container",3,"click"],[1,"ai-modal-header"],[1,"header-left"],[1,"ai-badge-icon"],[1,"fa","fa-magic"],[1,"header-info"],[1,"modal-title-row"],[1,"modal-title"],["title","Ph\xEDm t\u1EAFt m\u1EDF nhanh",1,"shortcut-pill"],[1,"modal-subtitle"],[1,"model-name"],[1,"fa","fa-microchip"],[1,"header-center"],[1,"type-switcher-bar"],["type","button",1,"type-tab-btn",3,"click"],[1,"fa","fa-desktop"],[1,"fa","fa-file-text-o"],[1,"header-right"],["title","C\u1EA5u h\xECnh M\xF4 h\xECnh & API Key",1,"icon-btn","settings-btn",3,"click"],[1,"fa","fa-sliders"],[1,"warning-dot"],[1,"icon-btn","fullscreen-btn",3,"click","title"],[1,"fa",3,"ngClass"],["title","\u0110\xF3ng (Esc)",1,"icon-btn","close-btn",3,"click"],[1,"ai-modal-body"],[1,"ai-copilot-pane",3,"dragover","drop"],[1,"context-status-bar"],[1,"attached-image-card"],[1,"omnibox-card"],["rows","5",1,"ai-omnibox-input",3,"ngModelChange","keydown","ngModel","placeholder"],["type","file","accept","image/*,.pdf",1,"hidden-file-input",3,"change"],[1,"omnibox-bottom-bar"],[1,"bottom-left-actions"],["type","button","title","\u0110\xEDnh k\xE8m \u1EA3nh ch\u1EE5p m\u1EABu / scan bi\u1EC3u m\u1EABu (ho\u1EB7c k\xE9o th\u1EA3, d\xE1n Ctrl+V)",1,"attach-btn",3,"click"],[1,"fa","fa-paperclip"],[1,"bottom-right-actions"],[1,"send-prompt-btn",3,"click","disabled"],[1,"streaming-console-box"],[1,"result-summary-card"],[1,"ai-canvas-pane"],[1,"canvas-topbar"],[1,"canvas-tabs"],[1,"canvas-tab-btn",3,"click"],[1,"fa","fa-television"],[1,"fa","fa-code"],[1,"fa","fa-file-code-o"],[1,"fa","fa-database"],[1,"canvas-actions"],["type","button","title","Sao ch\xE9p n\u1ED9i dung \u0111ang xem",1,"btn-copy-code",3,"click"],[1,"fa","fa-copy"],[1,"copy-toast-inline"],[1,"canvas-content-viewport"],[1,"code-view-box"],[1,"status-badge","editing"],[1,"fa","fa-pencil-square-o"],[1,"status-label"],[1,"status-val",3,"title"],["type","button","title","B\u1ECF ng\u1EEF c\u1EA3nh m\u1EABu hi\u1EC7n t\u1EA1i v\xE0 thi\u1EBFt k\u1EBF m\u1EABu m\u1EDBi t\u1EEB \u0111\u1EA7u",1,"action-link-btn",3,"click"],[1,"fa","fa-plus-circle"],[1,"status-badge","creating"],[1,"fa","fa-sparkles"],["type","button","title","Quay l\u1EA1i ng\u1EEF c\u1EA3nh m\u1EABu \u0111ang m\u1EDF \u1EDF trang ch\u1EE7",1,"action-link-btn"],["type","button","title","Quay l\u1EA1i ng\u1EEF c\u1EA3nh m\u1EABu \u0111ang m\u1EDF \u1EDF trang ch\u1EE7",1,"action-link-btn",3,"click"],[1,"fa","fa-undo"],[1,"thumb-wrap"],["alt","Attached preview",3,"src"],[1,"thumb-info"],[1,"thumb-title"],[1,"fa","fa-file-image-o"],[1,"thumb-sub"],["type","button","title","X\xF3a \u1EA3nh",1,"btn-remove-thumb",3,"click"],[1,"fa","fa-spinner","fa-spin"],[1,"fa","fa-paper-plane"],[1,"streaming-header"],[1,"streaming-title"],[1,"pulse-radar"],[1,"streaming-stats"],[1,"stat-badge"],[1,"fa","fa-keyboard-o"],[1,"streaming-body"],[1,"stream-code"],[1,"cursor-blink"],[1,"summary-top"],[1,"summary-icon"],[1,"fa","fa-check-circle"],[1,"summary-text"],[1,"summary-actions"],["type","button","title","H\u1EE7y c\xE1c thay \u0111\u1ED5i AI v\xE0 tr\u1EDF v\u1EC1 m\u1EABu g\u1ED1c",1,"btn-revert"],["type","button","title","H\u1EE7y c\xE1c thay \u0111\u1ED5i AI v\xE0 tr\u1EDF v\u1EC1 m\u1EABu g\u1ED1c",1,"btn-revert",3,"click"],[1,"fa","fa-check"],["type","button",1,"btn-primary-apply"],["type","button","title","Ghi \u0111\xE8 c\u1EADp nh\u1EADt v\xE0o phi\u1EBFu \u0111ang m\u1EDF",1,"btn-primary-apply",3,"click"],["type","button","title","L\u01B0u th\xE0nh m\u1ED9t m\u1EABu m\u1EDBi \u0111\u1ED9c l\u1EADp",1,"btn-secondary-apply",3,"click"],[1,"fa","fa-clone"],["type","button",1,"btn-primary-apply",3,"click"],[1,"preview-interactive-wrapper"],[1,"canvas-empty-state"],[1,"preview-mode-bar"],[1,"mode-info"],[1,"fa","fa-eye"],[1,"mode-toggles"],["type","button",1,"mode-btn",3,"click"],[1,"fa","fa-play-circle"],[1,"fa","fa-pencil"],[1,"preview-editor-mount"],[3,"templateChange","scriptChange","contextChange","editModeChange","template","script","context","editMode"],[1,"empty-icon"],[1,"settings-modal-backdrop",3,"click"],[1,"settings-modal-dialog",3,"click"],[1,"settings-dialog-header"],[1,"dialog-title"],[1,"dialog-close-btn",3,"click"],[1,"settings-dialog-body"],[1,"setting-group"],[1,"setting-label"],["type","text","placeholder","https://n8nz.io.vn/v1 ho\u1EB7c http://localhost:5000/v1",1,"setting-input",3,"ngModelChange","change","ngModel"],[1,"endpoint-quick-row"],["type","button",1,"quick-link",3,"click"],[1,"input-with-eye"],["placeholder","omniroute (ho\u1EB7c nh\u1EADp API Key \u0111\u1EC3 l\u1EA5y \u0111\xFAng danh s\xE1ch model)",1,"setting-input",3,"ngModelChange","change","type","ngModel"],["type","button",1,"eye-toggle",3,"click"],[1,"label-with-action"],["type","button",1,"btn-reload-models",3,"click","disabled"],[1,"setting-select",3,"ngModelChange","ngModel"],[3,"value"],["value","auto"],["value","custom"],[1,"error-hint"],[1,"test-row"],["type","button",1,"btn-test-ping",3,"click","disabled"],[1,"fa","fa-plug"],[1,"test-result",3,"success","error"],[1,"settings-dialog-footer"],[1,"save-toast"],["type","button",1,"btn-save-settings",3,"click"],[1,"fa","fa-exclamation-triangle"],["type","text","placeholder","V\xED d\u1EE5: gemini-2.5-pro, claude-3-5-sonnet...",1,"setting-input",3,"ngModelChange","ngModel"],[1,"test-result"]],template:function(e,a){e&1&&(t.\u0275\u0275conditionalCreate(0,Et,82,33,"div",2),t.\u0275\u0275conditionalCreate(1,Ht,51,14,"div",3)),e&2&&(t.\u0275\u0275conditional(a.visible?0:-1),t.\u0275\u0275advance(),t.\u0275\u0275conditional(a.showSettingsModal?1:-1))},dependencies:[at,$.NgClass,ot,y.NgSelectOption,y.\u0275NgSelectMultipleOption,y.DefaultValueAccessor,y.SelectControlValueAccessor,y.NgControlStatus,y.NgModel,k],styles:[".ai-modal-backdrop[_ngcontent-%COMP%]{position:fixed;inset:0;background:#0f172ab3;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;animation:_ngcontent-%COMP%_fadeIn .2s ease-out}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0}to{opacity:1}}.ai-modal-container[_ngcontent-%COMP%]{background:#fff;border-radius:16px;box-shadow:0 25px 50px -12px #00000040;display:flex;flex-direction:column;width:95vw;height:92vh;max-width:1680px;overflow:hidden;border:1px solid rgba(226,232,240,.8);font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif}.ai-modal-container.is-fullscreen[_ngcontent-%COMP%]{width:100vw;height:100vh;max-width:100vw;border-radius:0;margin:0}.ai-modal-header[_ngcontent-%COMP%]{height:60px;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 20px;border-bottom:1px solid #1e293b;flex-shrink:0}.ai-modal-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;min-width:260px}.ai-modal-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .ai-badge-icon[_ngcontent-%COMP%]{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;justify-content:center;font-size:16px;color:#fff;box-shadow:0 4px 12px #6366f159}.ai-modal-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .modal-title-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.ai-modal-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .modal-title-row[_ngcontent-%COMP%]   .modal-title[_ngcontent-%COMP%]{margin:0;font-size:16px;font-weight:700;letter-spacing:-.2px;color:#f8fafc}.ai-modal-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .modal-title-row[_ngcontent-%COMP%]   .shortcut-pill[_ngcontent-%COMP%]{font-size:10px;padding:2px 6px;background:#1e293b;color:#94a3b8;border-radius:4px;border:1px solid #334155}.ai-modal-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .modal-subtitle[_ngcontent-%COMP%]{font-size:12px;color:#94a3b8;display:flex;align-items:center;gap:6px;margin-top:1px}.ai-modal-header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .modal-subtitle[_ngcontent-%COMP%]   .model-name[_ngcontent-%COMP%]{color:#38bdf8;font-family:monospace;font-size:11px}.ai-modal-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.ai-modal-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%]   .type-switcher-bar[_ngcontent-%COMP%]{display:flex;background:#1e293b;padding:4px;border-radius:10px;border:1px solid #334155;gap:4px}.ai-modal-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%]   .type-switcher-bar[_ngcontent-%COMP%]   .type-tab-btn[_ngcontent-%COMP%]{background:transparent;border:none;color:#94a3b8;padding:6px 16px;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .2s ease}.ai-modal-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%]   .type-switcher-bar[_ngcontent-%COMP%]   .type-tab-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:14px}.ai-modal-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%]   .type-switcher-bar[_ngcontent-%COMP%]   .type-tab-btn[_ngcontent-%COMP%]:hover{color:#f8fafc;background:#ffffff0d}.ai-modal-header[_ngcontent-%COMP%]   .header-center[_ngcontent-%COMP%]   .type-switcher-bar[_ngcontent-%COMP%]   .type-tab-btn.active[_ngcontent-%COMP%]{background:#3b82f6;color:#fff;box-shadow:0 2px 8px #3b82f666}.ai-modal-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;min-width:200px;justify-content:flex-end}.ai-modal-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%]{width:34px;height:34px;border-radius:8px;background:#1e293b;border:1px solid #334155;color:#94a3b8;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;transition:all .15s ease;position:relative}.ai-modal-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%]:hover{background:#334155;color:#fff}.ai-modal-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .icon-btn.close-btn[_ngcontent-%COMP%]:hover{background:#ef4444;border-color:#ef4444;color:#fff}.ai-modal-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   .icon-btn[_ngcontent-%COMP%]   .warning-dot[_ngcontent-%COMP%]{position:absolute;top:6px;right:6px;width:7px;height:7px;border-radius:50%;background:#f59e0b}.ai-modal-body[_ngcontent-%COMP%]{flex:1;display:flex;min-height:0;overflow:hidden;background:#f8fafc}.ai-copilot-pane[_ngcontent-%COMP%]{width:420px;background:#fff;border-right:1px solid #e2e8f0;display:flex;flex-direction:column;padding:16px;gap:14px;overflow-y:auto;flex-shrink:0}.ai-copilot-pane[_ngcontent-%COMP%]   .context-status-bar[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#f1f5f9;border-radius:8px;border:1px solid #e2e8f0;font-size:12px}.ai-copilot-pane[_ngcontent-%COMP%]   .context-status-bar[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.ai-copilot-pane[_ngcontent-%COMP%]   .context-status-bar[_ngcontent-%COMP%]   .status-badge.editing[_ngcontent-%COMP%]{color:#0284c7}.ai-copilot-pane[_ngcontent-%COMP%]   .context-status-bar[_ngcontent-%COMP%]   .status-badge.editing[_ngcontent-%COMP%]   .status-val[_ngcontent-%COMP%]{color:#0f172a;max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ai-copilot-pane[_ngcontent-%COMP%]   .context-status-bar[_ngcontent-%COMP%]   .status-badge.creating[_ngcontent-%COMP%]{color:#16a34a}.ai-copilot-pane[_ngcontent-%COMP%]   .context-status-bar[_ngcontent-%COMP%]   .action-link-btn[_ngcontent-%COMP%]{background:transparent;border:none;color:#64748b;font-size:11px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:4px;padding:4px 6px;border-radius:4px;transition:all .15s}.ai-copilot-pane[_ngcontent-%COMP%]   .context-status-bar[_ngcontent-%COMP%]   .action-link-btn[_ngcontent-%COMP%]:hover{background:#e2e8f0;color:#0f172a}.ai-copilot-pane[_ngcontent-%COMP%]   .attached-image-card[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;padding:8px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px}.ai-copilot-pane[_ngcontent-%COMP%]   .attached-image-card[_ngcontent-%COMP%]   .thumb-wrap[_ngcontent-%COMP%]{width:48px;height:48px;border-radius:6px;overflow:hidden;border:1px solid #93c5fd;background:#fff;display:flex;align-items:center;justify-content:center}.ai-copilot-pane[_ngcontent-%COMP%]   .attached-image-card[_ngcontent-%COMP%]   .thumb-wrap[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}.ai-copilot-pane[_ngcontent-%COMP%]   .attached-image-card[_ngcontent-%COMP%]   .thumb-info[_ngcontent-%COMP%]{flex:1;min-width:0}.ai-copilot-pane[_ngcontent-%COMP%]   .attached-image-card[_ngcontent-%COMP%]   .thumb-info[_ngcontent-%COMP%]   .thumb-title[_ngcontent-%COMP%]{display:block;font-size:12px;font-weight:600;color:#1e40af}.ai-copilot-pane[_ngcontent-%COMP%]   .attached-image-card[_ngcontent-%COMP%]   .thumb-info[_ngcontent-%COMP%]   .thumb-sub[_ngcontent-%COMP%]{display:block;font-size:10px;color:#3b82f6}.ai-copilot-pane[_ngcontent-%COMP%]   .attached-image-card[_ngcontent-%COMP%]   .btn-remove-thumb[_ngcontent-%COMP%]{background:transparent;border:none;color:#94a3b8;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:12px}.ai-copilot-pane[_ngcontent-%COMP%]   .attached-image-card[_ngcontent-%COMP%]   .btn-remove-thumb[_ngcontent-%COMP%]:hover{background:#fee2e2;color:#ef4444}.ai-copilot-pane[_ngcontent-%COMP%]   .omnibox-card[_ngcontent-%COMP%]{border:1px solid #cbd5e1;border-radius:12px;background:#fff;box-shadow:0 4px 12px -2px #0000000d;display:flex;flex-direction:column;overflow:hidden;transition:border-color .2s,box-shadow .2s}.ai-copilot-pane[_ngcontent-%COMP%]   .omnibox-card[_ngcontent-%COMP%]:focus-within{border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f626}.ai-copilot-pane[_ngcontent-%COMP%]   .omnibox-card[_ngcontent-%COMP%]   .ai-omnibox-input[_ngcontent-%COMP%]{width:100%;border:none;outline:none;resize:vertical;min-height:110px;padding:12px;font-size:13px;line-height:1.5;font-family:inherit;color:#1e293b}.ai-copilot-pane[_ngcontent-%COMP%]   .omnibox-card[_ngcontent-%COMP%]   .ai-omnibox-input[_ngcontent-%COMP%]::placeholder{color:#94a3b8;font-size:12px}.ai-copilot-pane[_ngcontent-%COMP%]   .omnibox-card[_ngcontent-%COMP%]   .hidden-file-input[_ngcontent-%COMP%]{display:none}.ai-copilot-pane[_ngcontent-%COMP%]   .omnibox-card[_ngcontent-%COMP%]   .omnibox-bottom-bar[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#f8fafc;border-top:1px solid #f1f5f9}.ai-copilot-pane[_ngcontent-%COMP%]   .omnibox-card[_ngcontent-%COMP%]   .omnibox-bottom-bar[_ngcontent-%COMP%]   .attach-btn[_ngcontent-%COMP%]{background:transparent;border:1px solid #e2e8f0;color:#64748b;font-size:12px;padding:6px 10px;border-radius:6px;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .15s}.ai-copilot-pane[_ngcontent-%COMP%]   .omnibox-card[_ngcontent-%COMP%]   .omnibox-bottom-bar[_ngcontent-%COMP%]   .attach-btn[_ngcontent-%COMP%]:hover{background:#fff;border-color:#cbd5e1;color:#0f172a}.ai-copilot-pane[_ngcontent-%COMP%]   .omnibox-card[_ngcontent-%COMP%]   .omnibox-bottom-bar[_ngcontent-%COMP%]   .send-prompt-btn[_ngcontent-%COMP%]{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;border:none;padding:7px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:7px;transition:all .15s;box-shadow:0 2px 6px #2563eb4d}.ai-copilot-pane[_ngcontent-%COMP%]   .omnibox-card[_ngcontent-%COMP%]   .omnibox-bottom-bar[_ngcontent-%COMP%]   .send-prompt-btn[_ngcontent-%COMP%]:hover:not(:disabled){background:linear-gradient(135deg,#1d4ed8,#1e40af);transform:translateY(-1px)}.ai-copilot-pane[_ngcontent-%COMP%]   .omnibox-card[_ngcontent-%COMP%]   .omnibox-bottom-bar[_ngcontent-%COMP%]   .send-prompt-btn[_ngcontent-%COMP%]:disabled{opacity:.55;cursor:not-allowed;box-shadow:none}.ai-copilot-pane[_ngcontent-%COMP%]   .streaming-console-box[_ngcontent-%COMP%]{background:#0f172a;border:1px solid #1e293b;border-radius:10px;overflow:hidden;display:flex;flex-direction:column}.ai-copilot-pane[_ngcontent-%COMP%]   .streaming-console-box[_ngcontent-%COMP%]   .streaming-header[_ngcontent-%COMP%]{background:#1e293b;padding:6px 10px;display:flex;align-items:center;justify-content:space-between;font-size:11px;color:#94a3b8}.ai-copilot-pane[_ngcontent-%COMP%]   .streaming-console-box[_ngcontent-%COMP%]   .streaming-header[_ngcontent-%COMP%]   .streaming-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;color:#38bdf8}.ai-copilot-pane[_ngcontent-%COMP%]   .streaming-console-box[_ngcontent-%COMP%]   .streaming-header[_ngcontent-%COMP%]   .pulse-radar[_ngcontent-%COMP%]{width:6px;height:6px;border-radius:50%;background:#38bdf8;animation:_ngcontent-%COMP%_radarPulse 1.2s infinite}.ai-copilot-pane[_ngcontent-%COMP%]   .streaming-console-box[_ngcontent-%COMP%]   .streaming-header[_ngcontent-%COMP%]   .stat-badge[_ngcontent-%COMP%]{background:#0f172a;padding:2px 6px;border-radius:4px;font-family:monospace}.ai-copilot-pane[_ngcontent-%COMP%]   .streaming-console-box[_ngcontent-%COMP%]   .streaming-body[_ngcontent-%COMP%]{padding:10px;max-height:160px;overflow-y:auto}.ai-copilot-pane[_ngcontent-%COMP%]   .streaming-console-box[_ngcontent-%COMP%]   .streaming-body[_ngcontent-%COMP%]   .stream-code[_ngcontent-%COMP%]{margin:0;color:#e2e8f0;font-family:Fira Code,Consolas,monospace;font-size:11px;line-height:1.4;white-space:pre-wrap;word-break:break-word}.ai-copilot-pane[_ngcontent-%COMP%]   .streaming-console-box[_ngcontent-%COMP%]   .streaming-body[_ngcontent-%COMP%]   .stream-code[_ngcontent-%COMP%]   .cursor-blink[_ngcontent-%COMP%]{color:#38bdf8;animation:_ngcontent-%COMP%_blink .8s infinite}.ai-copilot-pane[_ngcontent-%COMP%]   .result-summary-card[_ngcontent-%COMP%]{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px}.ai-copilot-pane[_ngcontent-%COMP%]   .result-summary-card[_ngcontent-%COMP%]   .summary-top[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:8px}.ai-copilot-pane[_ngcontent-%COMP%]   .result-summary-card[_ngcontent-%COMP%]   .summary-top[_ngcontent-%COMP%]   .summary-icon[_ngcontent-%COMP%]{color:#16a34a;font-size:16px;margin-top:1px}.ai-copilot-pane[_ngcontent-%COMP%]   .result-summary-card[_ngcontent-%COMP%]   .summary-top[_ngcontent-%COMP%]   .summary-text[_ngcontent-%COMP%]{font-size:12px;color:#166534;line-height:1.4;font-weight:500}.ai-copilot-pane[_ngcontent-%COMP%]   .result-summary-card[_ngcontent-%COMP%]   .summary-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.ai-copilot-pane[_ngcontent-%COMP%]   .result-summary-card[_ngcontent-%COMP%]   .summary-actions[_ngcontent-%COMP%]   .btn-revert[_ngcontent-%COMP%]{background:transparent;border:1px solid #bbf7d0;color:#15803d;font-size:11px;padding:4px 8px;border-radius:5px;cursor:pointer;display:flex;align-items:center;gap:5px}.ai-copilot-pane[_ngcontent-%COMP%]   .result-summary-card[_ngcontent-%COMP%]   .summary-actions[_ngcontent-%COMP%]   .btn-revert[_ngcontent-%COMP%]:hover{background:#dcfce7}.ai-canvas-pane[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;min-width:0;background:#f8fafc;overflow:hidden}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]{height:48px;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 16px;flex-shrink:0}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-tabs[_ngcontent-%COMP%]{display:flex;gap:2px}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-tabs[_ngcontent-%COMP%]   .canvas-tab-btn[_ngcontent-%COMP%]{background:transparent;border:none;padding:8px 12px;font-size:12px;font-weight:600;color:#64748b;cursor:pointer;border-radius:6px;display:flex;align-items:center;gap:6px;transition:all .15s}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-tabs[_ngcontent-%COMP%]   .canvas-tab-btn[_ngcontent-%COMP%]:hover{background:#f1f5f9;color:#0f172a}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-tabs[_ngcontent-%COMP%]   .canvas-tab-btn.active[_ngcontent-%COMP%]{background:#e0f2fe;color:#0284c7}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-actions[_ngcontent-%COMP%]   .copy-toast-inline[_ngcontent-%COMP%]{font-size:11px;color:#16a34a;background:#dcfce7;padding:4px 8px;border-radius:4px}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-actions[_ngcontent-%COMP%]   .btn-copy-code[_ngcontent-%COMP%]{background:#f1f5f9;border:1px solid #e2e8f0;color:#475569;font-size:12px;font-weight:500;padding:6px 12px;border-radius:6px;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .15s}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-actions[_ngcontent-%COMP%]   .btn-copy-code[_ngcontent-%COMP%]:hover{background:#e2e8f0;color:#0f172a}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-actions[_ngcontent-%COMP%]   .btn-primary-apply[_ngcontent-%COMP%]{background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;font-size:12px;font-weight:600;padding:6px 14px;border-radius:6px;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .15s;box-shadow:0 2px 6px #10b9814d}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-actions[_ngcontent-%COMP%]   .btn-primary-apply[_ngcontent-%COMP%]:hover{background:linear-gradient(135deg,#059669,#047857)}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-actions[_ngcontent-%COMP%]   .btn-secondary-apply[_ngcontent-%COMP%]{background:#fff;border:1px solid #10b981;color:#059669;font-size:12px;font-weight:600;padding:5px 12px;border-radius:6px;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .15s}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-topbar[_ngcontent-%COMP%]   .canvas-actions[_ngcontent-%COMP%]   .btn-secondary-apply[_ngcontent-%COMP%]:hover{background:#f0fdf4}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]{flex:1;overflow:hidden;display:flex;flex-direction:column}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .preview-interactive-wrapper[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;overflow:hidden}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .preview-interactive-wrapper[_ngcontent-%COMP%]   .preview-mode-bar[_ngcontent-%COMP%]{height:38px;background:#f8fafc;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 16px}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .preview-interactive-wrapper[_ngcontent-%COMP%]   .preview-mode-bar[_ngcontent-%COMP%]   .mode-info[_ngcontent-%COMP%]{font-size:12px;color:#64748b;font-weight:500;display:flex;align-items:center;gap:6px}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .preview-interactive-wrapper[_ngcontent-%COMP%]   .preview-mode-bar[_ngcontent-%COMP%]   .mode-toggles[_ngcontent-%COMP%]{display:flex;background:#e2e8f0;padding:2px;border-radius:6px;gap:2px}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .preview-interactive-wrapper[_ngcontent-%COMP%]   .preview-mode-bar[_ngcontent-%COMP%]   .mode-toggles[_ngcontent-%COMP%]   .mode-btn[_ngcontent-%COMP%]{border:none;background:transparent;font-size:11px;font-weight:600;color:#64748b;padding:3px 8px;border-radius:4px;cursor:pointer;display:flex;align-items:center;gap:4px}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .preview-interactive-wrapper[_ngcontent-%COMP%]   .preview-mode-bar[_ngcontent-%COMP%]   .mode-toggles[_ngcontent-%COMP%]   .mode-btn.active[_ngcontent-%COMP%]{background:#fff;color:#0f172a;box-shadow:0 1px 3px #0000001a}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .preview-interactive-wrapper[_ngcontent-%COMP%]   .preview-editor-mount[_ngcontent-%COMP%]{flex:1;overflow:auto;position:relative;background:#f1f5f9;display:flex;flex-direction:column}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .code-view-box[_ngcontent-%COMP%]{flex:1;overflow:auto;background:#0f172a;padding:16px}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .code-view-box[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]{margin:0}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .code-view-box[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{color:#e2e8f0;font-family:Fira Code,Consolas,monospace;font-size:12px;line-height:1.5}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .canvas-empty-state[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;color:#94a3b8}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .canvas-empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%]{font-size:48px;color:#cbd5e1;margin-bottom:16px}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .canvas-empty-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 8px;font-size:18px;color:#475569;font-weight:600}.ai-canvas-pane[_ngcontent-%COMP%]   .canvas-content-viewport[_ngcontent-%COMP%]   .canvas-empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:13px;max-width:460px;line-height:1.6;color:#64748b}.settings-modal-backdrop[_ngcontent-%COMP%]{position:fixed;inset:0;background:#0f172a99;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;animation:_ngcontent-%COMP%_fadeIn .15s ease-out}.settings-modal-dialog[_ngcontent-%COMP%]{background:#fff;width:100%;max-width:520px;border-radius:12px;box-shadow:0 20px 25px -5px #0003;border:1px solid #e2e8f0;overflow:hidden;display:flex;flex-direction:column}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-header[_ngcontent-%COMP%]{height:48px;background:#f8fafc;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 16px}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-header[_ngcontent-%COMP%]   .dialog-title[_ngcontent-%COMP%]{font-size:13px;font-weight:700;color:#0f172a;display:flex;align-items:center;gap:8px}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-header[_ngcontent-%COMP%]   .dialog-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#3b82f6}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-header[_ngcontent-%COMP%]   .dialog-close-btn[_ngcontent-%COMP%]{background:transparent;border:none;color:#94a3b8;font-size:14px;cursor:pointer}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-header[_ngcontent-%COMP%]   .dialog-close-btn[_ngcontent-%COMP%]:hover{color:#0f172a}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]{padding:16px;display:flex;flex-direction:column;gap:14px}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:5px}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .setting-label[_ngcontent-%COMP%]{font-size:12px;font-weight:600;color:#475569}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .label-with-action[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .label-with-action[_ngcontent-%COMP%]   .btn-reload-models[_ngcontent-%COMP%]{background:transparent;border:none;color:#2563eb;font-size:11px;cursor:pointer}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .label-with-action[_ngcontent-%COMP%]   .btn-reload-models[_ngcontent-%COMP%]:hover{text-decoration:underline}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .setting-input[_ngcontent-%COMP%], .settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .setting-select[_ngcontent-%COMP%]{border:1px solid #cbd5e1;border-radius:6px;padding:7px 10px;font-size:13px;color:#0f172a;outline:none}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .setting-input[_ngcontent-%COMP%]:focus, .settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .setting-select[_ngcontent-%COMP%]:focus{border-color:#3b82f6}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .endpoint-quick-row[_ngcontent-%COMP%]{display:flex;gap:8px;margin-top:4px}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .endpoint-quick-row[_ngcontent-%COMP%]   .quick-link[_ngcontent-%COMP%]{background:#f1f5f9;border:1px solid #e2e8f0;color:#475569;font-size:11px;padding:3px 8px;border-radius:4px;cursor:pointer}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .endpoint-quick-row[_ngcontent-%COMP%]   .quick-link[_ngcontent-%COMP%]:hover{background:#e2e8f0}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .input-with-eye[_ngcontent-%COMP%]{display:flex;border:1px solid #cbd5e1;border-radius:6px;overflow:hidden}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .input-with-eye[_ngcontent-%COMP%]   .setting-input[_ngcontent-%COMP%]{flex:1;border:none;border-radius:0}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .input-with-eye[_ngcontent-%COMP%]   .eye-toggle[_ngcontent-%COMP%]{background:#f8fafc;border:none;border-left:1px solid #e2e8f0;padding:0 10px;color:#64748b;cursor:pointer}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .setting-group[_ngcontent-%COMP%]   .error-hint[_ngcontent-%COMP%]{font-size:11px;color:#ef4444}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .test-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;margin-top:4px}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .test-row[_ngcontent-%COMP%]   .btn-test-ping[_ngcontent-%COMP%]{background:#f1f5f9;border:1px solid #cbd5e1;color:#334155;font-size:11px;font-weight:500;padding:5px 10px;border-radius:6px;cursor:pointer}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .test-row[_ngcontent-%COMP%]   .btn-test-ping[_ngcontent-%COMP%]:hover{background:#e2e8f0}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .test-row[_ngcontent-%COMP%]   .test-result[_ngcontent-%COMP%]{font-size:11px}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .test-row[_ngcontent-%COMP%]   .test-result.success[_ngcontent-%COMP%]{color:#16a34a}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-body[_ngcontent-%COMP%]   .test-row[_ngcontent-%COMP%]   .test-result.error[_ngcontent-%COMP%]{color:#ef4444}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-footer[_ngcontent-%COMP%]{height:48px;background:#f8fafc;border-top:1px solid #e2e8f0;display:flex;align-items:center;justify-content:flex-end;padding:0 16px;gap:12px}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-footer[_ngcontent-%COMP%]   .save-toast[_ngcontent-%COMP%]{font-size:12px;color:#16a34a}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-footer[_ngcontent-%COMP%]   .btn-save-settings[_ngcontent-%COMP%]{background:#3b82f6;color:#fff;border:none;padding:6px 14px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer}.settings-modal-dialog[_ngcontent-%COMP%]   .settings-dialog-footer[_ngcontent-%COMP%]   .btn-save-settings[_ngcontent-%COMP%]:hover{background:#2563eb}@keyframes _ngcontent-%COMP%_radarPulse{0%{transform:scale(.95);opacity:.8}50%{transform:scale(1.4);opacity:.3}to{transform:scale(.95);opacity:.8}}@keyframes _ngcontent-%COMP%_blink{0%,to{opacity:1}50%{opacity:0}}"]})};import{FormsModule as Vt}from"@angular/forms";import{CommonModule as zt}from"@angular/common";import*as s from"@angular/core";var Lt=(r,n)=>n.id;function Ft(r,n){if(r&1){let e=s.\u0275\u0275getCurrentView();s.\u0275\u0275elementStart(0,"button",15),s.\u0275\u0275listener("click",function(){let i=s.\u0275\u0275restoreView(e).$index,o=s.\u0275\u0275nextContext();return s.\u0275\u0275resetView(o.selectTemplate(i))}),s.\u0275\u0275elementStart(1,"span",16),s.\u0275\u0275text(2),s.\u0275\u0275elementEnd(),s.\u0275\u0275elementStart(3,"span",17),s.\u0275\u0275text(4),s.\u0275\u0275elementEnd(),s.\u0275\u0275elementStart(5,"span",18),s.\u0275\u0275text(6),s.\u0275\u0275elementEnd()()}if(r&2){let e=n.$implicit,a=n.$index,i=s.\u0275\u0275nextContext();s.\u0275\u0275classProp("active",i.selectedTemplateIndex===a),s.\u0275\u0275property("title",e.name+" ("+e.badge+"): "+e.description),s.\u0275\u0275advance(2),s.\u0275\u0275textInterpolate(e.icon),s.\u0275\u0275advance(2),s.\u0275\u0275textInterpolate(e.name),s.\u0275\u0275advance(),s.\u0275\u0275classProp("badge-a5",e.badge.includes("A5"))("badge-landscape",e.badge.includes("Ngang"))("badge-ui",e.badge==="UI"),s.\u0275\u0275advance(),s.\u0275\u0275textInterpolate(e.badge)}}var D=class r{templates=[{id:"demo-components",name:"Demo T\u1ED5ng h\u1EE3p",badge:"A4",icon:"\u{1F4CB}",description:"Tr\xECnh di\u1EC5n \u0111\u1EA7y \u0111\u1EE7 c\xE1c component: PageA4, Textarea, OTP, Select, DatePicker, Checkbox, Paint, ContextMenu v\xE0 Async Top-level Await",template:`<PageA4 style="padding:3mm 15mm" c-name="PageA4" c-id="u30lyv7">
  <div style="margin-top: 15px; padding: 10px 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px;" c-name="div" c-id="ip_box_1">
    <b style="color: #1e40af;" c-name="b" c-id="ip_title_1">\u{1F310} \u0110\u1ECBa ch\u1EC9 IP (L\u1EA5y t\u1EEB API qua top-level await):</b>
    <span style="color: #2563eb; font-weight: bold; margin-left: 8px; font-size: 15px;" c-name="span" c-id="ip_val_1">{{ data.ip || '\u0110ang t\u1EA3i IP...' }}</span>
  </div>
  <div c-name="div" c-id="5wz82b0">
    <b c-name="b" c-id="z7ton81">Textarea</b>
  </div>
  <Textarea v-model="data.name" label="H\u1ECD v\xE0 t\xEAn:" line :suffix="{ length:1, char:'\u2764\uFE0F' }" c-name="Textarea" c-id="oqtwc4d" />
  <div style="color: #0284c7; font-size: 13px; margin-top: 2px;" c-name="div" c-id="un_disp">
    T\xEAn in hoa (Computed t\u1EEB Script): <b c-name="b" c-id="un_val">{{ uppername }}</b>
  </div>
  <div c-name="div" c-id="gszdea8">
    <b c-name="b" c-id="yukgkqs">InputOTP</b>
  </div>
  <InputOTP v-model="data.age" :mask-length="[1,1,1]" pad-start="0" c-name="InputOTP" c-id="kdp07ck" />
  <div c-name="div" c-id="ri82mdl">
    <b c-name="b" c-id="86q3zv5">Select one</b>
  </div>
  <Select v-model="data.category" label="Danh m\u1EE5c:" placeholder="Ch\u1ECDn danh m\u1EE5c" bind-label="name" bind-value="id"
    :items="categoryList" c-name="Select" c-id="r33jcxf" />
  <div c-name="div" c-id="1aqqwln">
    <b c-name="b" c-id="bwz68li">Select multiple</b>
  </div>
  <Select v-model="data.tags" label="Tags:" placeholder="Ch\u1ECDn tags" bind-label="label" bind-value="value"
    :items="tagList" multiple c-name="Select" c-id="9d3o1sm" />
  <div style="color:#0066cc" c-name="div" c-id="047rhv3">Tags \u0111\xE3 ch\u1ECDn: {{ data.tags }}</div>
  <div c-name="div" c-id="ctxhdr01" style="margin-top: 10px;">
    <b c-name="b" c-id="ctxhdr02">
      <i class="fa fa-mouse-pointer" style="color: #0066cc; margin-right: 6px;" c-name="i" c-id="ctxhdricon"></i>
      Directive v-context-menu v\u1EDBi contextItems
    </b>
  </div>
  <ContextMenu ref="itemMenu" c-name="ContextMenu" c-id="ctxm01">
    <template #default="{ subject }">
      <li style="padding: 8px 14px; cursor: pointer; color: #333; display: flex; align-items: center;" c-name="li"
        c-id="ctxli01">
        <i class="fa fa-info-circle" style="color: #0066cc; margin-right: 8px;" c-name="i" c-id="ctxliicon"></i>
        Menu cho: <b style="margin-left: 4px;" c-name="b" c-id="ctxb01">{{ subject?.label }}</b> (ID: {{ subject?.id }})
      </li>
    </template>
  </ContextMenu>
  <div v-for="item in contextItems" :key="item.id" v-context-menu:itemMenu="item"
    style="padding: 10px 14px; margin: 6px 0; background: #f8fafc; border: 1px dashed #0066cc; border-radius: 6px; cursor: context-menu; display: flex; align-items: center;"
    c-name="div" c-id="ctxitemdiv">
    <i class="fa fa-hand-pointer-o" style="color: #0066cc; margin-right: 10px;" c-name="i" c-id="itemicon"></i>
    <span>Click chu\u1ED9t ph\u1EA3i v\xE0o \u0111\xE2y: <b c-name="b" c-id="itemb">{{ item.label }}</b></span>
  </div>
  <div c-name="div" c-id="tjwsub8">
    <b c-name="b" c-id="o9mo28j">DatePicker - Ch\u1ECDn ng\xE0y sinh</b>
  </div>
  <DatePicker v-model="data.birthday" placeholder="Ch\u1ECDn ng\xE0y sinh" format="DD/MM/YYYY" c-name="DatePicker" c-id="y366dko" />
  <div style="color:#0066cc" c-name="div" c-id="8zkactw">Ng\xE0y sinh \u0111\xE3 ch\u1ECDn: <b c-name="b" c-id="5joniyw">{{ data.birthday }}</b></div>
  <div c-name="div" c-id="aknsmdv">
    <b c-name="b" c-id="ognk3qp">DatePicker - \u0110\u1ECBnh d\u1EA1ng ch\u1EEF</b>
  </div>
  <DatePicker v-model="data.birthdayText" placeholder="DD th\xE1ng MM n\u0103m YYYY" format="DD [th\xE1ng] MM [n\u0103m] YYYY"
    c-name="DatePicker" c-id="4cp28lw" />
  <div style="color:#0066cc" c-name="div" c-id="mgbravx">Gi\xE1 tr\u1ECB: <b c-name="b" c-id="btvfoao">{{ data.birthdayText }}</b></div>
  <div c-name="div" c-id="sbxot28">
    <b c-name="b" c-id="ilxg1be">DatePicker (datetime) - Gi\u1EDD h\u1EB9n</b>
  </div>
  <DatePicker v-model="data.appointment" mode="datetime" placeholder="Ch\u1ECDn ng\xE0y gi\u1EDD" format="HH:mm DD/MM/YYYY"
    :minute-step="15" c-name="DatePicker" c-id="e6dqk7f" />
  <div style="color:#0066cc" c-name="div" c-id="q74v2xs">Ng\xE0y gi\u1EDD \u0111\xE3 ch\u1ECDn: <b c-name="b" c-id="55xc88a">{{ data.appointment }}</b></div>
  <div c-name="div" c-id="82rm20p">
    <b c-name="b" c-id="po0ikwz">Checkbox - Size</b>
  </div>
  <Checkbox v-model="data.sizeTest" value="small" beforeText="[sm]" afterText="Small" size="sm" c-name="Checkbox" c-id="u9uayx1" />
  <Checkbox v-model="data.sizeTest" value="medium" beforeText="[md]" afterText="Medium" size="md" c-name="Checkbox" c-id="e673tj4" />
  <Checkbox v-model="data.sizeTest" value="large" beforeText="[lg]" afterText="Large" size="lg" c-name="Checkbox" c-id="qdqk80l" />
  <Checkbox v-model="data.sizeTest" value="xlarge" beforeText="[xl]" afterText="X-Large" size="xl" c-name="Checkbox" c-id="9hd0m1l" />
  <div style="color:#0066cc" c-name="div" c-id="okpshd8">Gi\xE1 tr\u1ECB: <b c-name="b" c-id="korldbv">{{ data.sizeTest }}</b></div>
  <div c-name="div" c-id="uxuwmt4">
    <b c-name="b" c-id="318h0k7">Paint - Ch\u1EEF k\xFD</b>
  </div>
  <Paint style="width:400px; height:150px;" v-model="data.signature"
    src="https://fastly.picsum.photos/id/237/250/250.jpg?hmac=tNmO3YWXALG9JM81cghI9nflo3dWc3e5vlNsf_jmKWw"
    c-name="Paint" c-id="hq1vub8" />
  <div v-if="data.signature" c-name="div" c-id="8gswa5w">
    <div c-name="div" c-id="ozfucom">\u1EA2nh \u0111\xE3 l\u01B0u:</div><img :src="data.signature" alt="signature"
      style="max-width:200px;border:1px solid #ccc;" c-name="img" c-id="x7lifom" />
  </div>
</PageA4>`,script:`// \u{1F4DC} Kh\u1EDFi t\u1EA1o state v\xE0 logic t\xEDnh to\xE1n truy\u1EC1n t\u1EEB Angular
const data = reactive($context.data || {});

// Computed: T\u1EF1 \u0111\u1ED9ng chuy\u1EC3n \u0111\u1ED5i h\u1ECD t\xEAn sang ch\u1EEF in hoa
const uppername = computed(() => {
  return (data.name || '').toUpperCase();
});

// Danh m\u1EE5c v\xE0 Tags
const categoryList = [
  { id: 'tech', name: 'C\xF4ng Ngh\u1EC7 (Tech)' },
  { id: 'business', name: 'Kinh Doanh (Business)' },
  { id: 'other', name: 'Kh\xE1c (Other)' }
];

const tagList = [
  { value: 'vue', label: 'Vue 3' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'react', label: 'React' }
];

const contextItems = [
  { id: 1, label: 'B\u1EC7nh \xE1n Ngo\u1EA1i tr\xFA #1' },
  { id: 2, label: 'B\u1EC7nh \xE1n N\u1ED9i tr\xFA #2' },
  { id: 3, label: 'Gi\u1EA5y ra vi\u1EC7n #3' }
];

try {
  const res = await fetch('https://api.ipify.org');
  data.ip = await res.text();
} catch (e) {
  data.ip = 'L\u1ED7i t\u1EA3i IP: ' + e.message;
}

return {
  data,
  categoryList,
  tagList,
  contextItems,
  uppername
};`,context:{data:{name:"Nguy\u1EC5n V\u0103n An",age:"28",category:"tech",tags:["vue","typescript"],birthday:"15/08/1996",birthdayText:"15 th\xE1ng 08 n\u0103m 1996",appointment:"09:30 02/09/2026",sizeTest:"large",signature:"",ip:""}}},{id:"outpatient-record",name:"B\u1EC7nh \xE1n Ngo\u1EA1i tr\xFA (2 trang)",badge:"A4",icon:"\u{1F3E5}",description:"M\u1EABu b\u1EC7nh \xE1n kh\xE1m chuy\xEAn khoa chu\u1EA9n y t\u1EBF d\xE0i 2 trang A4: Th\xF4ng tin h\xE0nh ch\xEDnh, b\u1EC7nh s\u1EED, ti\u1EC1n s\u1EED, kh\xE1m l\xE2m s\xE0ng to\xE0n di\u1EC7n, t\xEDnh BMI t\u1EF1 \u0111\u1ED9ng, t\xF3m t\u1EAFt c\u1EADn l\xE2m s\xE0ng, ch\u1EA9n \u0111o\xE1n, ph\xE1c \u0111\u1ED3 \u0111i\u1EC1u tr\u1ECB v\xE0 ch\u1EEF k\xFD 2 b\xEAn",template:`<PageA4 style="padding: 10mm 15mm; font-family: 'Times New Roman', Times, serif; color: #111;">
  <!-- ==================== TRANG 1 ==================== -->
  
  <!-- 1. Header: Th\xF4ng tin b\u1EC7nh vi\u1EC7n & M\xE3 b\u1EC7nh \xE1n -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0284c7; padding-bottom: 10px; margin-bottom: 14px;">
    <div style="text-align: left;">
      <div style="font-weight: bold; font-size: 13px; text-transform: uppercase; color: #0369a1;">S\u1EDE Y T\u1EBE TP. H\xC0 N\u1ED8I</div>
      <div style="font-weight: bold; font-size: 14px; text-transform: uppercase; color: #0c4a6e;">B\u1EC6NH VI\u1EC6N \u0110A KHOA QU\u1ED0C T\u1EBE MEDIC</div>
      <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Khoa Kh\xE1m B\u1EC7nh Chuy\xEAn Khoa - Hotline: 1900 6868</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 12px; font-weight: bold; margin-bottom: 3px; color: #0369a1;">M\xC3 S\u1ED0 B\u1EC6NH \xC1N:</div>
      <InputOTP v-model="data.recordNo" :mask-length="[1,1,1,1,1,1]" pad-start="0" />
    </div>
  </div>

  <!-- 2. Ti\xEAu \u0111\u1EC1 ch\xEDnh -->
  <div style="text-align: center; margin-bottom: 16px;">
    <h2 style="margin: 0; font-size: 20px; font-weight: bold; text-transform: uppercase; color: #0369a1; letter-spacing: 0.5px;">B\u1EC6NH \xC1N NGO\u1EA0I TR\xDA CHUY\xCAN KHOA</h2>
    <div style="font-style: italic; font-size: 12.5px; color: #475569; margin-top: 3px;">(H\u1ED3 s\u01A1 theo d\xF5i s\u1EE9c kh\u1ECFe & \u0111i\u1EC1u tr\u1ECB ngo\u1EA1i tr\xFA to\xE0n di\u1EC7n)</div>
  </div>

  <!-- 3. Ph\u1EA7n I: Th\xF4ng tin h\xE0nh ch\xEDnh b\u1EC7nh nh\xE2n -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      I. TH\xD4NG TIN H\xC0NH CH\xCDNH
    </div>
    <div style="display: grid; grid-template-columns: 2fr 1.2fr 0.8fr; gap: 14px;">
      <Textarea v-model="data.name" label="1. H\u1ECD v\xE0 t\xEAn:" line />
      <DatePicker v-model="data.birthday" label="2. Ng\xE0y sinh:" placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
      <Textarea v-model="data.gender" label="3. Gi\u1EDBi t\xEDnh:" line />
    </div>
    <div style="display: grid; grid-template-columns: 0.7fr 1.3fr 1.3fr; gap: 14px; margin-top: 10px;">
      <Textarea v-model="data.age" label="4. Tu\u1ED5i:" line />
      <Textarea v-model="data.identityCard" label="5. S\u1ED1 CCCD/CMND:" line />
      <Textarea v-model="data.phone" label="6. \u0110i\u1EC7n tho\u1EA1i:" line />
    </div>
    <div style="display: grid; grid-template-columns: 1.2fr 1fr 1.4fr; gap: 14px; margin-top: 10px;">
      <DatePicker v-model="data.examDate" mode="datetime" label="7. Th\u1EDDi gian kh\xE1m:" placeholder="HH:mm DD/MM/YYYY" format="HH:mm DD/MM/YYYY" :minute-step="15" />
      <Textarea v-model="data.job" label="8. Ngh\u1EC1 nghi\u1EC7p:" line />
      <Textarea v-model="data.workplace" label="9. N\u01A1i l\xE0m vi\u1EC7c:" line />
    </div>
    <div style="margin-top: 10px;">
      <Textarea v-model="data.address" label="10. \u0110\u1ECBa ch\u1EC9 th\u01B0\u1EDDng tr\xFA:" line />
    </div>
    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 14px; margin-top: 10px;">
      <Textarea v-model="data.emergencyContact" label="11. Ng\u01B0\u1EDDi li\xEAn h\u1EC7 kh\u1EA9n c\u1EA5p:" line />
      <Textarea v-model="data.emergencyPhone" label="12. S\u0110T ng\u01B0\u1EDDi li\xEAn h\u1EC7:" line />
    </div>
  </div>

  <!-- 4. Ph\u1EA7n II: L\xFD do kh\xE1m & Qu\xE1 tr\xECnh b\u1EC7nh l\xFD -->
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      II. L\xDD DO V\xC0O KH\xC1M & B\u1EC6NH S\u1EEC
    </div>
    <Textarea v-model="data.reason" label="1. L\xFD do v\xE0o vi\u1EC7n / tri\u1EC7u ch\u1EE9ng ch\xEDnh:" line />
    <div style="margin-top: 10px;">
      <Textarea v-model="data.clinicalProcess" label="2. Qu\xE1 tr\xECnh b\u1EC7nh l\xFD (Kh\u1EDFi ph\xE1t, di\u1EC5n ti\u1EBFn, \u0111i\u1EC1u tr\u1ECB tr\u01B0\u1EDBc \u0111\xF3):" line :rows="3" />
    </div>
  </div>

  <!-- 5. Ph\u1EA7n III: Ti\u1EC1n s\u1EED b\u1EC7nh & D\u1ECB \u1EE9ng -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      III. TI\u1EC0N S\u1EEC B\u1EC6NH L\xDD & Y\u1EBEU T\u1ED0 NGUY C\u01A0
    </div>
    <div style="font-size: 13.5px; color: #334155; font-weight: bold;">1. Ti\u1EC1n s\u1EED b\u1EA3n th\xE2n:</div>
    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 6px; margin-bottom: 10px;">
      <Checkbox v-model="data.historyHypertension" :native="true" afterText="T\u0103ng huy\u1EBFt \xE1p" size="sm" />
      <Checkbox v-model="data.historyDiabetes" :native="true" afterText="\u0110\xE1i th\xE1o \u0111\u01B0\u1EDDng" size="sm" />
      <Checkbox v-model="data.historyAsthma" :native="true" afterText="Hen ph\u1EBF qu\u1EA3n / COPD" size="sm" />
      <Checkbox v-model="data.historyHeart" :native="true" afterText="B\u1EC7nh m\u1EA1ch v\xE0nh" size="sm" />
      <Checkbox v-model="data.historyKidney" :native="true" afterText="B\u1EC7nh l\xFD Gan / Th\u1EADn" size="sm" />
    </div>
    <div style="margin-top: 10px;">
      <Textarea v-model="data.historyAllergyDetail" label="2. Ti\u1EC1n s\u1EED d\u1ECB \u1EE9ng (Thu\u1ED1c, th\u1EF1c ph\u1EA9m, th\u1EDDi ti\u1EBFt):" line />
    </div>
    <div style="margin-top: 10px;">
      <Textarea v-model="data.familyHistory" label="3. Ti\u1EC1n s\u1EED gia \u0111\xECnh (B\u1EC7nh di truy\u1EC1n, tim m\u1EA1ch, ung th\u01B0):" line />
    </div>
  </div>

  <!-- ==================== TRANG 2 ==================== -->

  <!-- 6. Ph\u1EA7n IV: Kh\xE1m l\xE2m s\xE0ng & Ch\u1EC9 s\u1ED1 sinh t\u1ED3n -->
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      IV. KH\xC1M L\xC2M S\xC0NG TO\xC0N DI\u1EC6N
    </div>
    
    <!-- Vital signs box with spacious 3-column layout -->
    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px;">
      <div style="font-weight: bold; font-size: 13px; color: #166534; margin-bottom: 8px;">
        \u{1FA7A} 1. Ch\u1EC9 s\u1ED1 sinh t\u1ED3n & Th\u1EC3 tr\u1EA1ng (T\u1EF1 \u0111\u1ED9ng t\xEDnh BMI & ph\xE2n lo\u1EA1i qua Script):
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px 18px;">
        <Textarea v-model="data.height" label="Chi\u1EC1u cao (cm):" line />
        <Textarea v-model="data.weight" label="C\xE2n n\u1EB7ng (kg):" line />
        <Textarea v-model="data.bloodPressure" label="Huy\u1EBFt \xE1p (mmHg):" line />
        <Textarea v-model="data.pulse" label="M\u1EA1ch (l\u1EA7n/ph\xFAt):" line />
        <Textarea v-model="data.temperature" label="Th\xE2n nhi\u1EC7t (\xB0C):" line />
        <Textarea v-model="data.spo2" label="N\u1ED3ng \u0111\u1ED9 SpO2 (%):" line />
      </div>
      <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #86efac; font-size: 13px; color: #15803d; display: flex; align-items: center; gap: 20px;">
        <span>Ch\u1EC9 s\u1ED1 BMI: <b style="font-size: 15px; color: #047857;">{{ bmi || '--' }} kg/m\xB2</b></span>
        <span>\u0110\xE1nh gi\xE1 th\u1EC3 tr\u1EA1ng: <b style="color: #b45309; font-weight: bold;">{{ bmiStatus || '--' }}</b></span>
      </div>
    </div>

    <div style="margin-top: 10px;">
      <Textarea v-model="data.generalExam" label="2. Kh\xE1m to\xE0n th\xE2n (Tri gi\xE1c, ni\xEAm m\u1EA1c, h\u1EA1ch, tuy\u1EBFn gi\xE1p, ph\xF9):" line :rows="2" />
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px;">
      <Textarea v-model="data.cardioExam" label="3. Kh\xE1m Tim m\u1EA1ch:" line />
      <Textarea v-model="data.respiratoryExam" label="4. Kh\xE1m H\xF4 h\u1EA5p (Ph\u1ED5i):" line />
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px;">
      <Textarea v-model="data.digestiveExam" label="5. Kh\xE1m Ti\xEAu h\xF3a (B\u1EE5ng):" line />
      <Textarea v-model="data.otherOrganExam" label="6. Th\u1EA7n kinh & C\u01A1 quan kh\xE1c:" line />
    </div>
  </div>

  <!-- 7. Ph\u1EA7n V: T\xF3m t\u1EAFt C\u1EADn l\xE2m s\xE0ng -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      V. T\xD3M T\u1EAET K\u1EBET QU\u1EA2 C\u1EACN L\xC2M S\xC0NG & X\xC9T NGHI\u1EC6M
    </div>
    <Textarea v-model="data.labSummary" label="1. K\u1EBFt qu\u1EA3 x\xE9t nghi\u1EC7m, C\u0110HA \u0111\xE3 c\xF3 (ECG, Si\xEAu \xE2m, X-Quang, M\xE1u):" line :rows="2" />
    <div style="margin-top: 10px;">
      <Textarea v-model="data.additionalTests" label="2. Ch\u1EC9 \u0111\u1ECBnh c\u1EADn l\xE2m s\xE0ng b\u1ED5 sung c\u1EA7n l\xE0m:" line />
    </div>
  </div>

  <!-- 8. Ph\u1EA7n VI: Ch\u1EA9n \u0111o\xE1n y khoa -->
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      VI. CH\u1EA8N \u0110O\xC1N Y KHOA & PH\xC2N LO\u1EA0I
    </div>
    <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 14px;">
      <Textarea v-model="data.diagnosis" label="1. Ch\u1EA9n \u0111o\xE1n x\xE1c \u0111\u1ECBnh (K\xE8m m\xE3 ICD-10):" line />
      <Select v-model="data.department" label="2. Chuy\xEAn khoa:" placeholder="Ch\u1ECDn chuy\xEAn khoa" bind-label="name" bind-value="id" :items="departmentList" />
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px;">
      <Textarea v-model="data.diffDiagnosis" label="3. Ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t:" line />
      <Textarea v-model="data.comorbidity" label="4. B\u1EC7nh k\xE8m theo / Bi\u1EBFn ch\u1EE9ng:" line />
    </div>
  </div>

  <!-- 9. Ph\u1EA7n VII: K\u1EBF ho\u1EA1ch \u0111i\u1EC1u tr\u1ECB & D\u1EB7n d\xF2 -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
    <div style="font-weight: bold; color: #0284c7; font-size: 14px; margin-bottom: 10px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 5px;">
      VII. H\u01AF\u1EDANG \u0110I\u1EC0U TR\u1ECA & CH\u1EBE \u0110\u1ED8 CH\u0102M S\xD3C
    </div>
    <Textarea v-model="data.treatmentPlan" label="1. K\u1EBF ho\u1EA1ch \u0111i\u1EC1u tr\u1ECB & K\xEA \u0111\u01A1n thu\u1ED1c:" line :rows="3" />
    <div style="margin-top: 10px;">
      <Textarea v-model="data.doctorAdvice" label="2. Ch\u1EBF \u0111\u1ED9 dinh d\u01B0\u1EE1ng, v\u1EADn \u0111\u1ED9ng & D\u1EB7n d\xF2:" line />
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 14px; margin-top: 10px;">
      <DatePicker v-model="data.revisitDate" label="3. Ng\xE0y h\u1EB9n t\xE1i kh\xE1m:" placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
      <Textarea v-model="data.revisitNotes" label="4. L\u01B0u \xFD khi t\xE1i kh\xE1m:" line />
    </div>
  </div>

  <!-- 10. Ph\u1EA7n VIII: Ch\u1EEF k\xFD 2 b\xEAn (B\xE1c s\u0129 & Ng\u01B0\u1EDDi b\u1EC7nh) -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 18px; padding-top: 8px;">
    <div style="text-align: center; width: 250px;">
      <div style="font-style: italic; font-size: 12px; color: #475569;">X\xE1c nh\u1EADn c\u1EE7a ng\u01B0\u1EDDi b\u1EC7nh / \u0110\u1EA1i di\u1EC7n gia \u0111\xECnh</div>
      <div style="font-weight: bold; font-size: 12.5px; text-transform: uppercase; margin-top: 3px; color: #0f172a;">NG\u01AF\u1EDCI B\u1EC6NH K\xDD T\xCAN</div>
      <div style="margin-top: 6px;">
        <Paint style="width: 240px; height: 100px; border: 1px dashed #cbd5e1; border-radius: 4px; background: #fff;" v-model="data.patientSignature" />
      </div>
      <div style="font-weight: bold; margin-top: 5px; font-size: 12.5px; color: #0f172a;">{{ data.name || 'Ng\u01B0\u1EDDi b\u1EC7nh' }}</div>
    </div>
    <div style="text-align: center; width: 270px;">
      <div style="font-style: italic; font-size: 12px; color: #475569;">H\xE0 N\u1ED9i, ng\xE0y 28 th\xE1ng 08 n\u0103m 2026</div>
      <div style="font-weight: bold; font-size: 12.5px; text-transform: uppercase; margin-top: 3px; color: #0369a1;">B\xC1C S\u0128 KH\xC1M B\u1EC6NH</div>
      <div style="margin-top: 6px;">
        <Paint style="width: 260px; height: 100px; border: 1px dashed #93c5fd; border-radius: 4px; background: #fff;" v-model="data.doctorSignature" />
      </div>
      <div style="font-weight: bold; margin-top: 5px; font-size: 12.5px; color: #0369a1;">{{ data.doctorName || 'BS. CKI Tr\u1EA7n V\u0103n H\xF9ng' }}</div>
    </div>
  </div>
</PageA4>`,script:`// \u{1F4DC} Logic B\u1EC7nh \xC1n Ngo\u1EA1i Tr\xFA Chuy\xEAn Khoa (2 Trang A4)
const data = reactive($context.data || {});

// Danh s\xE1ch chuy\xEAn khoa kh\xE1m
const departmentList = [
  { id: 'cardiology', name: 'Khoa Tim M\u1EA1ch' },
  { id: 'internal', name: 'Khoa N\u1ED9i T\u1ED5ng Qu\xE1t' },
  { id: 'ent', name: 'Khoa Tai M\u0169i H\u1ECDng' },
  { id: 'dermatology', name: 'Khoa Da Li\u1EC5u' },
  { id: 'neurology', name: 'Khoa Th\u1EA7n Kinh' }
];

// Computed: T\u1EF1 \u0111\u1ED9ng t\xEDnh ch\u1EC9 s\u1ED1 BMI t\u1EEB Chi\u1EC1u cao (cm) v\xE0 C\xE2n n\u1EB7ng (kg)
const bmi = computed(() => {
  const heightM = parseFloat(data.height || 0) / 100;
  const weightKg = parseFloat(data.weight || 0);
  if (!heightM || !weightKg || heightM <= 0) return null;
  return (weightKg / (heightM * heightM)).toFixed(1);
});

// Computed: T\u1EF1 \u0111\u1ED9ng ph\xE2n lo\u1EA1i th\u1EC3 tr\u1EA1ng theo chu\u1EA9n WHO / Ch\xE2u \xC1
const bmiStatus = computed(() => {
  const val = parseFloat(bmi.value || 0);
  if (!val) return 'Ch\u01B0a \u0111\u1EE7 d\u1EEF li\u1EC7u';
  if (val < 18.5) return 'G\u1EA7y (Thi\u1EBFu c\xE2n)';
  if (val < 23) return 'B\xECnh th\u01B0\u1EDDng (L\xFD t\u01B0\u1EDFng)';
  if (val < 25) return 'Ti\u1EC1n b\xE9o ph\xEC (Th\u1EEBa c\xE2n)';
  if (val < 30) return 'B\xE9o ph\xEC \u0110\u1ED9 I';
  return 'B\xE9o ph\xEC \u0110\u1ED9 II (C\u1EA7n can thi\u1EC7p)';
});

return {
  data,
  departmentList,
  bmi,
  bmiStatus
};`,context:{data:{recordNo:"849201",name:"Tr\u1EA7n Th\u1ECB Mai",birthday:"20/11/1992",gender:"N\u1EEF",age:"34",identityCard:"001192008492",phone:"0987 654 321",examDate:"08:15 28/08/2026",job:"K\u1EBF to\xE1n tr\u01B0\u1EDFng",workplace:"C\xF4ng ty C\u1ED5 ph\u1EA7n C\xF4ng ngh\u1EC7 ABC",address:"S\u1ED1 45 L\xEA Du\u1EA9n, Ph\u01B0\u1EDDng B\u1EBFn Ngh\xE9, Qu\u1EADn 1, TP. H\u1ED3 Ch\xED Minh",emergencyContact:"Nguy\u1EC5n V\u0103n H\xF9ng (Ch\u1ED3ng)",emergencyPhone:"0903 123 456",reason:"\u0110au t\u1EE9c ng\u1EF1c tr\xE1i t\u1EEBng c\u01A1n k\xE8m c\u1EA3m gi\xE1c kh\xF3 th\u1EDF nh\u1EB9 khi g\u1EAFng s\u1EE9c, h\u1ED3i h\u1ED9p tr\u1ED1ng ng\u1EF1c xu\u1EA5t hi\u1EC7n 1 tu\u1EA7n nay.",clinicalProcess:"B\u1EC7nh nh\xE2n c\xF3 tri\u1EC7u ch\u1EE9ng n\u1EB7ng ng\u1EF1c sau x\u01B0\u01A1ng \u1EE9c xu\u1EA5t hi\u1EC7n c\xE1ch \u0111\xE2y 7 ng\xE0y, c\u01A1n k\xE9o d\xE0i kho\u1EA3ng 10-15 ph\xFAt, lan l\xEAn vai tr\xE1i, t\u0103ng l\xEAn khi leo c\u1EA7u thang ho\u1EB7c c\u0103ng th\u1EB3ng, gi\u1EA3m b\u1EDBt khi ngh\u1EC9 ng\u01A1i. Ch\u01B0a d\xF9ng thu\u1ED1c \u0111\u1EB7c hi\u1EC7u \u1EDF nh\xE0.",historyHypertension:!0,historyDiabetes:!1,historyAsthma:!1,historyHeart:!0,historyKidney:!1,historyAllergyDetail:"D\u1ECB \u1EE9ng v\u1EDBi thu\u1ED1c nh\xF3m Sulfamide v\xE0 Penicillin (n\u1ED5i m\u1EC1 \u0111ay, ng\u1EE9a).",familyHistory:"B\u1ED1 c\xF3 ti\u1EC1n s\u1EED nh\u1ED3i m\xE1u c\u01A1 tim \u1EDF tu\u1ED5i 58, m\u1EB9 t\u0103ng huy\u1EBFt \xE1p.",height:"162",weight:"54",bloodPressure:"130/85",pulse:"78",temperature:"36.8",spo2:"98",generalExam:"B\u1EC7nh nh\xE2n t\u1EC9nh t\xE1o, ti\u1EBFp x\xFAc t\u1ED1t. Da ni\xEAm m\u1EA1c h\u1ED3ng h\xE0o, kh\xF4ng ph\xF9, kh\xF4ng xu\u1EA5t huy\u1EBFt d\u01B0\u1EDBi da. Tuy\u1EBFn gi\xE1p kh\xF4ng to, h\u1EA1ch ngo\u1EA1i vi kh\xF4ng s\u1EDD th\u1EA5y.",cardioExam:"Tim \u0111\u1EC1u, nh\u1ECBp xoang r\xF5, T1 T2 nghe r\xF5 kh\xF4ng c\xF3 ti\u1EBFng th\u1ED5i b\u1EC7nh l\xFD. M\u1ECFm tim \u0111\u1EADp \u1EDF khoang li\xEAn s\u01B0\u1EDDn V \u0111\u01B0\u1EDDng trung \u0111\xF2n tr\xE1i.",respiratoryExam:"L\u1ED3ng ng\u1EF1c c\xE2n \u0111\u1ED1i, di \u0111\u1ED9ng \u0111\u1EC1u theo nh\u1ECBp th\u1EDF. R\xEC r\xE0o ph\u1EBF nang \xEAm d\u1ECBu hai b\xEAn ph\u1EBF tr\u01B0\u1EDDng, kh\xF4ng nghe th\u1EA5y rale r\xEDt hay rale \u1EA9m.",digestiveExam:"B\u1EE5ng m\u1EC1m, kh\xF4ng ch\u01B0\u1EDBng, gan l\xE1ch kh\xF4ng to, \u1EA5n c\xE1c \u0111i\u1EC3m \u0111au ngo\u1EA1i khoa kh\xF4ng c\xF3 ph\u1EA3n \u1EE9ng.",otherOrganExam:"Th\u1EA7n kinh kh\xF4ng c\xF3 d\u1EA5u hi\u1EC7u khu tr\xFA. V\u1EADn \u0111\u1ED9ng c\xE1c kh\u1EDBp b\xECnh th\u01B0\u1EDDng.",labSummary:"\u0110i\u1EC7n t\xE2m \u0111\u1ED3 (ECG 12 C\u0110): Nh\u1ECBp xoang 78ck/p, s\xF3ng ST ch\xEAnh xu\u1ED1ng nh\u1EB9 0.5mm \u1EDF V5-V6. Si\xEAu \xE2m tim: Ch\u1EE9c n\u0103ng t\xE2m thu th\u1EA5t tr\xE1i t\u1ED1t (EF=64%), kh\xF4ng th\u1EA5y r\u1ED1i lo\u1EA1n v\u1EADn \u0111\u1ED9ng v\xF9ng.",additionalTests:"1. \u0110\u1ECBnh l\u01B0\u1EE3ng men tim Troponin T si\xEAu nh\u1EA1y\\n2. X\xE9t nghi\u1EC7m b\u1ED9 m\u1EE1 m\xE1u (Lipid panel: Cholesterol to\xE0n ph\u1EA7n, Triglyceride, HDL-C, LDL-C)\\n3. Si\xEAu \xE2m Doppler m\u1EA1ch v\xE0nh",diagnosis:"C\u01A1n \u0111au th\u1EAFt ng\u1EF1c \u1ED5n \u0111\u1ECBnh (CCS II) / T\u0103ng huy\u1EBFt \xE1p \u0111\u1ED9 1 - I20.9",department:"cardiology",diffDiagnosis:"R\u1ED1i lo\u1EA1n th\u1EA7n kinh tim / Vi\xEAm c\u01A1 tim nh\u1EB9",comorbidity:"R\u1ED1i lo\u1EA1n lipid m\xE1u nh\u1EB9",treatmentPlan:"1. Aspirin 81mg: 1 vi\xEAn/ng\xE0y u\u1ED1ng sau \u0103n s\xE1ng\\n2. Bisoprolol 2.5mg: 1 vi\xEAn/ng\xE0y u\u1ED1ng bu\u1ED5i s\xE1ng\\n3. Atorvastatin 20mg: 1 vi\xEAn/ng\xE0y u\u1ED1ng tr\u01B0\u1EDBc khi \u0111i ng\u1EE7",doctorAdvice:"Ngh\u1EC9 ng\u01A1i h\u1EE3p l\xFD, tr\xE1nh th\u1EE9c khuya v\xE0 lo \xE2u. Ch\u1EBF \u0111\u1ED9 \u0103n gi\u1EA3m mu\u1ED1i, h\u1EA1n ch\u1EBF m\u1EE1 \u0111\u1ED9ng v\u1EADt. \u0110\u1EBFn vi\u1EC7n ngay n\u1EBFu c\u01A1n \u0111au ng\u1EF1c k\xE9o d\xE0i tr\xEAn 20 ph\xFAt kh\xF4ng gi\u1EA3m.",revisitDate:"11/09/2026",revisitNotes:"Mang theo k\u1EBFt qu\u1EA3 x\xE9t nghi\u1EC7m m\xE1u v\xE0 phi\u1EBFu \u0111i\u1EC7n tim khi \u0111i t\xE1i kh\xE1m.",doctorName:"BS. CKI Tr\u1EA7n V\u0103n H\xF9ng",patientSignature:"",doctorSignature:""}}},{id:"prescription-a5",name:"\u0110\u01A1n thu\u1ED1c",badge:"A5",icon:"\u{1F48A}",description:"M\u1EABu \u0111\u01A1n thu\u1ED1c \u0111i\u1EC7n t\u1EED kh\u1ED5 A5: Th\xF4ng tin b\u1EC7nh nh\xE2n, danh m\u1EE5c thu\u1ED1c \u0111i\u1EC1u tr\u1ECB, t\u1EF1 \u0111\u1ED9ng \u0111\u1EBFm t\u1ED5ng s\u1ED1 lo\u1EA1i thu\u1ED1c, h\u01B0\u1EDBng d\u1EABn s\u1EED d\u1EE5ng v\xE0 ch\u1EEF k\xFD \u0111i\u1EC7n t\u1EED b\xE1c s\u0129",template:`<PageA5 style="padding: 5mm 8mm; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b;" c-name="PageA5" c-id="rx_p01">
  <!-- Header -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid #059669; padding-bottom: 4px; margin-bottom: 6px;" c-name="div" c-id="rx_h01">
    <div c-name="div" c-id="rx_h02">
      <div style="font-weight: 700; font-size: 11px; text-transform: uppercase; color: #047857;" c-name="div" c-id="rx_h03">PH\xD2NG KH\xC1M \u0110A KHOA MEDIC</div>
      <div style="font-size: 9px; color: #64748b;" c-name="div" c-id="rx_h04">\u0110/c: 108 Tr\u1EA7n H\u01B0ng \u0110\u1EA1o, Q. Ho\xE0n Ki\u1EBFm, HN - S\u0110T: 024.3984.6688</div>
    </div>
    <div style="text-align: right;" c-name="div" c-id="rx_h06">
      <div style="font-size: 9.5px; font-weight: 600; color: #047857;" c-name="div" c-id="rx_h07">M\xC3 \u0110\u01A0N:</div>
      <span style="font-family: monospace; font-size: 11.5px; font-weight: bold; background: #ecfdf5; padding: 1px 5px; border-radius: 3px; border: 1px solid #a7f3d0;" c-name="span" c-id="rx_code">{{ data.prescriptionCode || 'RX-2026-01' }}</span>
    </div>
  </div>

  <!-- Title -->
  <div style="text-align: center; margin-bottom: 6px;" c-name="div" c-id="rx_t01">
    <h3 style="margin: 0; font-size: 15px; font-weight: 800; text-transform: uppercase; color: #065f46; letter-spacing: 0.5px;" c-name="h3" c-id="rx_t02">\u0110\u01A0N THU\u1ED0C \u0110I\u1EC6N T\u1EEC</h3>
  </div>

  <!-- Patient Details -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 8px; margin-bottom: 6px;" c-name="div" c-id="rx_pat_0">
    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 6px;" c-name="div" c-id="rx_pat_1">
      <Textarea v-model="data.name" label="H\u1ECD t\xEAn:" line c-name="Textarea" c-id="rx_n" />
      <Textarea v-model="data.age" label="Tu\u1ED5i:" line c-name="Textarea" c-id="rx_ag" />
      <Textarea v-model="data.gender" label="Gi\u1EDBi t\xEDnh:" line c-name="Textarea" c-id="rx_ge" />
    </div>
    <div style="margin-top: 3px;" c-name="div" c-id="rx_pat_2">
      <Textarea v-model="data.address" label="\u0110\u1ECBa ch\u1EC9:" line c-name="Textarea" c-id="rx_ad" />
    </div>
    <div style="margin-top: 3px;" c-name="div" c-id="rx_pat_3">
      <Textarea v-model="data.diagnosis" label="Ch\u1EA9n \u0111o\xE1n:" line c-name="Textarea" c-id="rx_dx" />
    </div>
  </div>

  <!-- Medicines Table -->
  <div style="margin-bottom: 6px;" c-name="div" c-id="rx_med_0">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;" c-name="div" c-id="rx_med_h">
      <b style="font-size: 11.5px; color: #047857;" c-name="b" c-id="rx_med_t">\u{1F48A} THU\u1ED0C \u0110I\u1EC0U TR\u1ECA:</b>
      <span style="font-size: 10.5px; color: #64748b;" c-name="span" c-id="rx_med_c">T\u1ED5ng s\u1ED1: <b style="color: #047857;" c-name="b" c-id="rx_t_c">{{ totalMedicines }} lo\u1EA1i</b></span>
    </div>
    
    <div v-for="(med, idx) in (data.medicines || [])" :key="idx" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 6px; margin-bottom: 3px;" c-name="div" c-id="rx_item">
      <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: #0f172a;" c-name="div" c-id="rx_item_1">
        <span c-name="span" c-id="rx_med_name">{{ idx + 1 }}. {{ med.name }}</span>
        <span style="color: #047857;" c-name="span" c-id="rx_med_qty">SL: {{ med.quantity }} {{ med.unit }}</span>
      </div>
      <div style="font-size: 10px; color: #475569; font-style: italic; margin-top: 1px;" c-name="div" c-id="rx_item_2">
        \u{1F449} {{ med.usage }}
      </div>
    </div>
  </div>

  <!-- Advice & Followup -->
  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 4px 8px; margin-bottom: 6px; font-size: 11px;" c-name="div" c-id="rx_adv_0">
    <Textarea v-model="data.doctorAdvice" label="L\u1EDDi d\u1EB7n:" line c-name="Textarea" c-id="rx_adv_txt" />
    <div style="margin-top: 3px;" c-name="div" c-id="rx_adv_1">
      <DatePicker v-model="data.revisitDate" label="Ng\xE0y t\xE1i kh\xE1m:" placeholder="DD/MM/YYYY" format="DD/MM/YYYY" c-name="DatePicker" c-id="rx_rev_d" />
    </div>
  </div>

  <!-- Signatures -->
  <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 6px;" c-name="div" c-id="rx_sig_0">
    <div style="font-size: 9.5px; color: #64748b; font-style: italic;" c-name="div" c-id="rx_sig_1">
      * Kh\xE1m l\u1EA1i xin mang theo \u0111\u01A1n thu\u1ED1c n\xE0y.<br/>
      * \u0110\u01A1n thu\u1ED1c c\xF3 gi\xE1 tr\u1ECB mua trong v\xF2ng 05 ng\xE0y.
    </div>
    <div style="text-align: center; width: 170px;" c-name="div" c-id="rx_sig_2">
      <div style="font-size: 9.5px; font-style: italic; color: #475569;" c-name="div" c-id="rx_sig_3">Ng\xE0y 28 th\xE1ng 08 n\u0103m 2026</div>
      <div style="font-weight: bold; font-size: 10.5px; text-transform: uppercase; color: #047857; margin-top: 1px;" c-name="div" c-id="rx_sig_4">B\xC1C S\u0128 K\xCA \u0110\u01A0N</div>
      <div style="margin-top: 3px;" c-name="div" c-id="rx_sig_5">
        <Paint style="width: 160px; height: 65px; border: 1px dashed #cbd5e1; border-radius: 4px; background: #fff;" v-model="data.signature" c-name="Paint" c-id="rx_pnt" />
      </div>
      <div style="font-weight: bold; font-size: 10.5px; color: #0f172a; margin-top: 1px;" c-name="div" c-id="rx_sig_6">{{ data.prescriber || 'BS. CKI Nguy\u1EC5n H\u1EA3i \u0110\u0103ng' }}</div>
    </div>
  </div>
</PageA5>`,script:`// \u{1F4DC} Logic \u0110\u01A1n Thu\u1ED1c \u0110i\u1EC7n T\u1EED (Page A5)
const data = reactive($context.data || {});

// Computed: \u0110\u1EBFm t\u1ED5ng s\u1ED1 l\u01B0\u1EE3ng lo\u1EA1i thu\u1ED1c trong \u0111\u01A1n
const totalMedicines = computed(() => {
  return Array.isArray(data.medicines) ? data.medicines.length : 0;
});

// Computed: T\xF3m t\u1EAFt th\xF4ng tin b\u1EC7nh nh\xE2n
const patientSummary = computed(() => {
  return (data.name || '') + ' - ' + (data.age || '') + ' tu\u1ED5i (' + (data.gender || '') + ')';
});

return {
  data,
  totalMedicines,
  patientSummary
};`,context:{data:{prescriptionCode:"RX-2026-9812",name:"L\xEA Ho\xE0ng Long",gender:"Nam",age:"38",birthday:"10/05/1988",phone:"0912 345 678",address:"Ph\xF2ng 502, T\xF2a Golden Palm, 21 L\xEA V\u0103n L\u01B0\u01A1ng, H\xE0 N\u1ED9i",diagnosis:"Vi\xEAm h\u1ECDng c\u1EA5p / Vi\xEAm m\u0169i d\u1ECB \u1EE9ng th\u1EDDi ti\u1EBFt",medicines:[{name:"Augmentin 1g (Amoxicillin/Clavulanate)",quantity:14,unit:"Vi\xEAn",usage:"U\u1ED1ng 1 vi\xEAn/l\u1EA7n x 2 l\u1EA7n/ng\xE0y sau khi \u0103n s\xE1ng, t\u1ED1i"},{name:"Paracetamol 500mg (H\u1EA1 s\u1ED1t, gi\u1EA3m \u0111au)",quantity:10,unit:"Vi\xEAn",usage:"U\u1ED1ng 1 vi\xEAn khi s\u1ED1t tr\xEAn 38.5\xB0C ho\u1EB7c \u0111au h\u1ECDng nhi\u1EC1u, c\xE1ch 4-6h"},{name:"Telfast 180mg (Fexofenadine)",quantity:7,unit:"Vi\xEAn",usage:"U\u1ED1ng 1 vi\xEAn/ng\xE0y v\xE0o bu\u1ED5i s\xE1ng sau \u0103n"},{name:"N\u01B0\u1EDBc mu\u1ED1i sinh l\xFD Natri Clorid 0.9%",quantity:2,unit:"Chai 500ml",usage:"S\xFAc h\u1ECDng mi\u1EC7ng 3-4 l\u1EA7n/ng\xE0y sau b\u1EEFa \u0103n"}],doctorAdvice:"U\u1ED1ng nhi\u1EC1u n\u01B0\u1EDBc \u1EA5m, s\xFAc mi\u1EC7ng n\u01B0\u1EDBc mu\u1ED1i th\u01B0\u1EDDng xuy\xEAn, gi\u1EEF \u1EA5m v\xF9ng c\u1ED5. T\xE1i kh\xE1m sau 5 ng\xE0y n\u1EBFu kh\xF4ng thuy\xEAn gi\u1EA3m.",revisitDate:"02/09/2026",prescriber:"BS. CKI Nguy\u1EC5n H\u1EA3i \u0110\u0103ng",signature:""}}},{id:"billing-statement-a4-landscape",name:"B\u1EA3ng k\xEA Vi\u1EC7n ph\xED (A4 Ngang)",badge:"A4 Ngang",icon:"\u{1F4CA}",description:"M\u1EABu b\u1EA3ng k\xEA chi ph\xED kh\xE1m ch\u1EEFa b\u1EC7nh ngo\u1EA1i tr\xFA \u0111\u1ECBnh d\u1EA1ng A4 Ngang (Landscape): B\u1EA3ng chi ti\u1EBFt d\u1ECBch v\u1EE5, t\xEDnh t\u1ED5ng ti\u1EC1n t\u1EF1 \u0111\u1ED9ng qua Script, ph\xE2n lo\u1EA1i BHYT v\xE0 3 ch\u1EEF k\xFD x\xE1c nh\u1EADn",template:`<PageA4 :landscape="true" style="padding: 8mm 12mm; font-family: 'Times New Roman', Times, serif; color: #1e293b;" c-name="PageA4" c-id="bill_root">
  <!-- Header: Th\xF4ng tin b\u1EC7nh vi\u1EC7n & M\xE3 s\u1ED1 h\xF3a \u0111\u01A1n -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 10px;" c-name="div" c-id="bill_hdr">
    <div style="text-align: left;" c-name="div" c-id="bill_hleft">
      <div style="font-weight: bold; font-size: 13px; text-transform: uppercase; color: #0369a1;" c-name="div" c-id="bill_h1">S\u1EDE Y T\u1EBE TP. H\xC0 N\u1ED8I - B\u1EC6NH VI\u1EC6N \u0110A KHOA QU\u1ED0C T\u1EBE MEDIC</div>
      <div style="font-size: 11.5px; color: #64748b;" c-name="div" c-id="bill_h2">Ph\xF2ng K\u1EBF Ho\u1EA1ch T\xE0i Ch\xEDnh & Vi\u1EC7n Ph\xED - Hotline H\u1ED7 Tr\u1EE3: 1900 6868</div>
    </div>
    <div style="text-align: right;" c-name="div" c-id="bill_hright">
      <div style="font-size: 11.5px; font-weight: bold; color: #0369a1;" c-name="div" c-id="bill_code_lbl">M\xC3 PHI\u1EBEU THU:</div>
      <span style="font-family: monospace; font-size: 13px; font-weight: bold; color: #0284c7; background: #e0f2fe; padding: 2px 8px; border-radius: 4px; border: 1px solid #7dd3fc;" c-name="span" c-id="bill_code_val">{{ data.billCode || 'VP-2026-8899' }}</span>
    </div>
  </div>

  <!-- Title -->
  <div style="text-align: center; margin-bottom: 12px;" c-name="div" c-id="bill_title_wrap">
    <h2 style="margin: 0; font-size: 19px; font-weight: bold; text-transform: uppercase; color: #0369a1; letter-spacing: 0.5px;" c-name="h2" c-id="bill_title">B\u1EA2NG K\xCA CHI TI\u1EBET CHI PH\xCD KH\xC1M CH\u1EEEA B\u1EC6NH NGO\u1EA0I TR\xDA</h2>
    <div style="font-style: italic; font-size: 12px; color: #475569; margin-top: 2px;" c-name="div" c-id="bill_sub">Kh\u1ED5 gi\u1EA5y A4 Ngang (Landscape) - D\u1EEF li\u1EC7u t\u1EF1 \u0111\u1ED9ng t\xEDnh to\xE1n t\u1ED5ng vi\u1EC7n ph\xED</div>
  </div>

  <!-- Th\xF4ng tin h\xE0nh ch\xEDnh b\u1EC7nh nh\xE2n d\u1EA1ng ngang 4 c\u1ED9t -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; margin-bottom: 10px;" c-name="div" c-id="bill_pat_box">
    <div style="display: grid; grid-template-columns: 2fr 0.8fr 0.8fr 1.4fr; gap: 12px;" c-name="div" c-id="bill_pat_r1">
      <Textarea v-model="data.patientName" label="H\u1ECD v\xE0 t\xEAn b\u1EC7nh nh\xE2n:" line c-name="Textarea" c-id="bill_p_name" />
      <Textarea v-model="data.age" label="Tu\u1ED5i:" line c-name="Textarea" c-id="bill_p_age" />
      <Textarea v-model="data.gender" label="Gi\u1EDBi t\xEDnh:" line c-name="Textarea" c-id="bill_p_gen" />
      <Textarea v-model="data.insuranceNo" label="M\xE3 th\u1EBB BHYT:" line c-name="Textarea" c-id="bill_p_ins" />
    </div>
    <div style="display: grid; grid-template-columns: 2fr 1.5fr 1.5fr; gap: 12px; margin-top: 6px;" c-name="div" c-id="bill_pat_r2">
      <Textarea v-model="data.address" label="\u0110\u1ECBa ch\u1EC9:" line c-name="Textarea" c-id="bill_p_addr" />
      <Textarea v-model="data.diagnosis" label="Ch\u1EA9n \u0111o\xE1n x\xE1c \u0111\u1ECBnh:" line c-name="Textarea" c-id="bill_p_diag" />
      <DatePicker v-model="data.billDate" label="Ng\xE0y l\u1EADp phi\u1EBFu:" placeholder="DD/MM/YYYY" format="DD/MM/YYYY" c-name="DatePicker" c-id="bill_p_date" />
    </div>
  </div>

  <!-- B\u1EA3ng k\xEA danh m\u1EE5c chi ti\u1EBFt -->
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 12px;" border="1" bordercolor="#cbd5e1" c-name="table" c-id="bill_tbl">
    <thead>
      <tr style="background: #e0f2fe; color: #0369a1; font-weight: bold; text-align: center;" c-name="tr" c-id="bill_th_r">
        <th style="padding: 6px 4px; width: 40px;" c-name="th" c-id="th_stt">STT</th>
        <th style="padding: 6px 8px; text-align: left;" c-name="th" c-id="th_name">T\xEAn d\u1ECBch v\u1EE5 / Thu\u1ED1c / V\u1EADt t\u01B0 k\u1EF9 thu\u1EADt</th>
        <th style="padding: 6px 4px; width: 80px;" c-name="th" c-id="th_unit">\u0110\u01A1n v\u1ECB</th>
        <th style="padding: 6px 4px; width: 60px;" c-name="th" c-id="th_qty">S\u1ED1 l\u01B0\u1EE3ng</th>
        <th style="padding: 6px 8px; width: 120px; text-align: right;" c-name="th" c-id="th_price">\u0110\u01A1n gi\xE1 (VN\u0110)</th>
        <th style="padding: 6px 8px; width: 130px; text-align: right;" c-name="th" c-id="th_total">Th\xE0nh ti\u1EC1n (VN\u0110)</th>
        <th style="padding: 6px 8px; width: 110px; text-align: right;" c-name="th" c-id="th_ins">BHYT tr\u1EA3 (80%)</th>
        <th style="padding: 6px 8px; width: 120px; text-align: right;" c-name="th" c-id="th_pay">B\u1EC7nh nh\xE2n tr\u1EA3</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in (data.services || [])" :key="idx" style="background: #ffffff;" c-name="tr" c-id="bill_tr_item">
        <td style="padding: 5px 4px; text-align: center;" c-name="td" c-id="td_idx">{{ idx + 1 }}</td>
        <td style="padding: 5px 8px; font-weight: 500;" c-name="td" c-id="td_name">{{ item.name }}</td>
        <td style="padding: 5px 4px; text-align: center; color: #64748b;" c-name="td" c-id="td_unit">{{ item.unit }}</td>
        <td style="padding: 5px 4px; text-align: center; font-weight: bold;" c-name="td" c-id="td_qty">{{ item.quantity }}</td>
        <td style="padding: 5px 8px; text-align: right; color: #334155;" c-name="td" c-id="td_price">{{ formatMoney(item.price) }}</td>
        <td style="padding: 5px 8px; text-align: right; font-weight: 600;" c-name="td" c-id="td_total">{{ formatMoney(item.quantity * item.price) }}</td>
        <td style="padding: 5px 8px; text-align: right; color: #0284c7;" c-name="td" c-id="td_ins">{{ formatMoney(item.insuranceCover) }}</td>
        <td style="padding: 5px 8px; text-align: right; font-weight: bold; color: #b45309;" c-name="td" c-id="td_pay">{{ formatMoney(item.patientPay) }}</td>
      </tr>
      <!-- T\u1ED5ng c\u1ED9ng -->
      <tr style="background: #f1f5f9; font-weight: bold;" c-name="tr" c-id="bill_total_r">
        <td colspan="5" style="padding: 6px 10px; text-align: right; text-transform: uppercase; color: #0f172a;" c-name="td" c-id="td_tlabel">T\u1ED4NG C\u1ED8NG VI\u1EC6N PH\xCD:</td>
        <td style="padding: 6px 8px; text-align: right; color: #0f172a; font-size: 13px;" c-name="td" c-id="td_grand">{{ formatMoney(totalAmount) }}</td>
        <td style="padding: 6px 8px; text-align: right; color: #0284c7; font-size: 13px;" c-name="td" c-id="td_t_ins">{{ formatMoney(totalInsurance) }}</td>
        <td style="padding: 6px 8px; text-align: right; color: #b45309; font-size: 14px;" c-name="td" c-id="td_t_pat">{{ formatMoney(totalPatient) }}</td>
      </tr>
    </tbody>
  </table>

  <!-- T\xF3m t\u1EAFt s\u1ED1 ti\u1EC1n b\u1EB1ng ch\u1EEF -->
  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 6px 12px; margin-bottom: 12px; font-size: 12.5px;" c-name="div" c-id="bill_words_box">
    <span>S\u1ED1 ti\u1EC1n ng\u01B0\u1EDDi b\u1EC7nh thanh to\xE1n (b\u1EB1ng ch\u1EEF): <b style="color: #b45309;">{{ totalWords || 'M\u1ED9t tri\u1EC7u n\u0103m tr\u0103m hai m\u01B0\u01A1i ngh\xECn \u0111\u1ED3ng ch\u1EB5n.' }}</b></span>
  </div>

  <!-- 3 Ch\u1EEF k\xFD x\xE1c nh\u1EADn ngang 3 c\u1ED9t -->
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; text-align: center;" c-name="div" c-id="bill_sig_wrap">
    <div c-name="div" c-id="sig_col1">
      <div style="font-weight: bold; font-size: 12px; text-transform: uppercase; color: #0f172a;" c-name="div" c-id="s1_t">NG\u01AF\u1EDCI B\u1EC6NH / TH\xC2N NH\xC2N</div>
      <div style="font-style: italic; font-size: 11px; color: #64748b;" c-name="div" c-id="s1_sub">(K\xFD v\xE0 ghi r\xF5 h\u1ECD t\xEAn)</div>
      <div style="margin-top: 6px;" c-name="div" c-id="s1_pbox">
        <Paint style="width: 220px; height: 80px; margin: 0 auto; border: 1px dashed #cbd5e1; border-radius: 4px; background: #fff;" v-model="data.patientSig" c-name="Paint" c-id="s1_p" />
      </div>
      <div style="font-weight: bold; margin-top: 4px; font-size: 12px; color: #0f172a;" c-name="div" c-id="s1_n">{{ data.patientName || 'Nguy\u1EC5n Th\u1ECB Hoa' }}</div>
    </div>

    <div c-name="div" c-id="sig_col2">
      <div style="font-weight: bold; font-size: 12px; text-transform: uppercase; color: #0369a1;" c-name="div" c-id="s2_t">NG\u01AF\u1EDCI L\u1EACP PHI\u1EBEU THU</div>
      <div style="font-style: italic; font-size: 11px; color: #64748b;" c-name="div" c-id="s2_sub">(K\xFD v\xE0 ghi r\xF5 h\u1ECD t\xEAn)</div>
      <div style="margin-top: 6px;" c-name="div" c-id="s2_pbox">
        <Paint style="width: 220px; height: 80px; margin: 0 auto; border: 1px dashed #93c5fd; border-radius: 4px; background: #fff;" v-model="data.creatorSig" c-name="Paint" c-id="s2_p" />
      </div>
      <div style="font-weight: bold; margin-top: 4px; font-size: 12px; color: #0369a1;" c-name="div" c-id="s2_n">{{ data.creatorName || 'KTV. \u0110\u1ED7 Thu Trang' }}</div>
    </div>

    <div c-name="div" c-id="sig_col3">
      <div style="font-style: italic; font-size: 11px; color: #475569;" c-name="div" c-id="s3_date">H\xE0 N\u1ED9i, ng\xE0y 28 th\xE1ng 08 n\u0103m 2026</div>
      <div style="font-weight: bold; font-size: 12px; text-transform: uppercase; color: #0369a1; margin-top: 2px;" c-name="div" c-id="s3_t">TR\u01AF\u1EDENG PH\xD2NG T\xC0I CH\xCDNH</div>
      <div style="margin-top: 6px;" c-name="div" c-id="s3_pbox">
        <Paint style="width: 220px; height: 80px; margin: 0 auto; border: 1px dashed #93c5fd; border-radius: 4px; background: #fff;" v-model="data.leaderSig" c-name="Paint" c-id="s3_p" />
      </div>
      <div style="font-weight: bold; margin-top: 4px; font-size: 12px; color: #0369a1;" c-name="div" c-id="s3_n">{{ data.leaderName || 'ThS. Nguy\u1EC5n Th\xE0nh Nam' }}</div>
    </div>
  </div>
</PageA4>`,script:`// \u{1F4DC} Logic B\u1EA3ng K\xEA Chi Ph\xED Vi\u1EC7n Ph\xED A4 Ngang
const data = reactive($context.data || {});

// H\xE0m format ti\u1EC1n t\u1EC7 VN\u0110
const formatMoney = (val) => {
  if (!val && val !== 0) return '0 \u0111';
  return Number(val).toLocaleString('vi-VN') + ' \u0111';
};

// Computed: T\xEDnh t\u1ED5ng th\xE0nh ti\u1EC1n d\u1ECBch v\u1EE5
const totalAmount = computed(() => {
  if (!Array.isArray(data.services)) return 0;
  return data.services.reduce((sum, item) => sum + (item.quantity * item.price), 0);
});

// Computed: T\xEDnh t\u1ED5ng ti\u1EC1n BHYT chi tr\u1EA3
const totalInsurance = computed(() => {
  if (!Array.isArray(data.services)) return 0;
  return data.services.reduce((sum, item) => sum + (item.insuranceCover || 0), 0);
});

// Computed: T\xEDnh t\u1ED5ng ti\u1EC1n b\u1EC7nh nh\xE2n c\xF9ng chi tr\u1EA3
const totalPatient = computed(() => {
  if (!Array.isArray(data.services)) return 0;
  return data.services.reduce((sum, item) => sum + (item.patientPay || 0), 0);
});

return {
  data,
  formatMoney,
  totalAmount,
  totalInsurance,
  totalPatient,
  totalWords: 'M\u1ED9t tri\u1EC7u t\xE1m tr\u0103m b\u1ED1n m\u01B0\u01A1i ngh\xECn \u0111\u1ED3ng ch\u1EB5n.'
};`,context:{data:{billCode:"VP-2026-8899",patientName:"Nguy\u1EC5n Th\u1ECB Hoa",age:"42",gender:"N\u1EEF",insuranceNo:"DN 4 01 01 23456789",address:"T\u1ED5 12, Ph\u01B0\u1EDDng Kh\u01B0\u01A1ng \u0110\xECnh, Thanh Xu\xE2n, H\xE0 N\u1ED9i",diagnosis:"Tho\xE1i h\xF3a kh\u1EDBp g\u1ED1i hai b\xEAn (M17) / T\u0103ng huy\u1EBFt \xE1p (I10)",billDate:"28/08/2026",services:[{name:"Kh\xE1m chuy\xEAn khoa C\u01A1 X\u01B0\u01A1ng Kh\u1EDBp",unit:"L\u1EA7n",quantity:1,price:2e5,insuranceCover:16e4,patientPay:4e4},{name:"Ch\u1EE5p X-Quang kh\u1EDBp g\u1ED1i th\u1EB3ng nghi\xEAng 2 b\xEAn",unit:"L\u1EA7n",quantity:2,price:22e4,insuranceCover:352e3,patientPay:88e3},{name:"Si\xEAu \xE2m kh\u1EDBp g\u1ED1i m\xE0u 2 b\xEAn",unit:"L\u1EA7n",quantity:1,price:25e4,insuranceCover:2e5,patientPay:5e4},{name:"X\xE9t nghi\u1EC7m Acid Uric, \u0110\u1ECBnh l\u01B0\u1EE3ng Calci",unit:"G\xF3i",quantity:1,price:18e4,insuranceCover:144e3,patientPay:36e3},{name:"Thu\u1ED1c Glucosamin sulfate 500mg (H\u1ED9p 60 vi\xEAn)",unit:"H\u1ED9p",quantity:2,price:45e4,insuranceCover:0,patientPay:9e5},{name:"V\u1EADt l\xFD tr\u1ECB li\u1EC7u - Si\xEAu \xE2m \u0111i\u1EC1u tr\u1ECB gi\u1EA3m \u0111au kh\u1EDBp",unit:"L\u1EA7n",quantity:5,price:15e4,insuranceCover:6e5,patientPay:15e4}],patientSig:"",creatorSig:"",leaderSig:"",creatorName:"KTV. \u0110\u1ED7 Thu Trang",leaderName:"ThS. Nguy\u1EC5n Th\xE0nh Nam"}}},{id:"lab-order-a5-landscape",name:"Ch\u1EC9 \u0111\u1ECBnh CLS (A5 Ngang)",badge:"A5 Ngang",icon:"\u{1F4D1}",description:"M\u1EABu phi\u1EBFu ch\u1EC9 \u0111\u1ECBnh d\u1ECBch v\u1EE5 c\u1EADn l\xE2m s\xE0ng & x\xE9t nghi\u1EC7m kh\u1ED5 A5 Ngang (Landscape): Danh m\u1EE5c nh\xF3m x\xE9t nghi\u1EC7m, C\u0110HA, t\u1EF1 \u0111\u1ED9ng \u0111\u1EBFm s\u1ED1 d\u1ECBch v\u1EE5 ch\u1EC9 \u0111\u1ECBnh v\xE0 ch\u1EEF k\xFD b\xE1c s\u0129",template:`<PageA5 :landscape="true" style="padding: 5mm 8mm; font-family: 'Times New Roman', Times, serif; color: #1e293b;" c-name="PageA5" c-id="cls_root">
  <!-- Header -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid #0284c7; padding-bottom: 4px; margin-bottom: 6px;" c-name="div" c-id="cls_hdr">
    <div style="text-align: left;" c-name="div" c-id="cls_hleft">
      <div style="font-weight: bold; font-size: 11px; text-transform: uppercase; color: #0369a1;" c-name="div" c-id="cls_h1">S\u1EDE Y T\u1EBE TP. H\xC0 N\u1ED8I - BV \u0110A KHOA QU\u1ED0C T\u1EBE MEDIC</div>
      <div style="font-size: 9.5px; color: #64748b;" c-name="div" c-id="cls_h2">Khoa Kh\xE1m B\u1EC7nh - Hotline: 1900 6868</div>
    </div>
    <div style="text-align: right;" c-name="div" c-id="cls_hright">
      <div style="font-size: 9.5px; font-weight: bold; color: #0369a1;" c-name="div" c-id="cls_code_lbl">M\xC3 PHI\u1EBEU:</div>
      <span style="font-family: monospace; font-size: 11px; font-weight: bold; color: #0284c7; background: #e0f2fe; padding: 1px 6px; border-radius: 3px; border: 1px solid #7dd3fc;" c-name="span" c-id="cls_code_val">{{ data.orderCode || 'CLS-2026-088' }}</span>
    </div>
  </div>

  <!-- Title -->
  <div style="text-align: center; margin-bottom: 6px;" c-name="div" c-id="cls_t_wrap">
    <h3 style="margin: 0; font-size: 15px; font-weight: bold; text-transform: uppercase; color: #0369a1; letter-spacing: 0.5px;" c-name="h3" c-id="cls_title">PHI\u1EBEU CH\u1EC8 \u0110\u1ECANH D\u1ECACH V\u1EE4 C\u1EACN L\xC2M S\xC0NG</h3>
    <div style="font-style: italic; font-size: 10px; color: #64748b;" c-name="div" c-id="cls_sub">(\u0110\u1ECBnh d\u1EA1ng kh\u1ED5 gi\u1EA5y A5 Ngang - Landscape)</div>
  </div>

  <!-- Th\xF4ng tin h\xE0nh ch\xEDnh 4 c\u1ED9t -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 8px; margin-bottom: 6px;" c-name="div" c-id="cls_pat_box">
    <div style="display: grid; grid-template-columns: 2fr 0.8fr 0.8fr 1.4fr; gap: 8px;" c-name="div" c-id="cls_pat_r1">
      <Textarea v-model="data.patientName" label="1. H\u1ECD v\xE0 t\xEAn:" line c-name="Textarea" c-id="cls_p_n" />
      <Textarea v-model="data.age" label="2. Tu\u1ED5i:" line c-name="Textarea" c-id="cls_p_ag" />
      <Textarea v-model="data.gender" label="3. Gi\u1EDBi t\xEDnh:" line c-name="Textarea" c-id="cls_p_ge" />
      <Textarea v-model="data.room" label="4. Ph\xF2ng kh\xE1m:" line c-name="Textarea" c-id="cls_p_rm" />
    </div>
    <div style="display: grid; grid-template-columns: 2.2fr 1.8fr; gap: 8px; margin-top: 3px;" c-name="div" c-id="cls_pat_r2">
      <Textarea v-model="data.diagnosis" label="5. Ch\u1EA9n \u0111o\xE1n s\u01A1 b\u1ED9:" line c-name="Textarea" c-id="cls_p_dx" />
      <DatePicker v-model="data.orderDate" mode="datetime" label="6. Th\u1EDDi gian ch\u1EC9 \u0111\u1ECBnh:" placeholder="HH:mm DD/MM/YYYY" format="HH:mm DD/MM/YYYY" :minute-step="15" c-name="DatePicker" c-id="cls_p_dt" />
    </div>
  </div>

  <!-- Danh m\u1EE5c ch\u1EC9 \u0111\u1ECBnh 3 c\u1ED9t nh\xF3m d\u1ECBch v\u1EE5 -->
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 6px;" c-name="div" c-id="cls_grid_services">
    <!-- C\u1ED9t 1: X\xE9t nghi\u1EC7m Huy\u1EBFt h\u1ECDc & Sinh h\xF3a -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 6px;" c-name="div" c-id="cls_g1">
      <div style="font-weight: bold; font-size: 11px; color: #0284c7; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;" c-name="div" c-id="g1_t">
        \u{1FA78} I. X\xC9T NGHI\u1EC6M M\xC1U
      </div>
      <div style="display: flex; flex-direction: column; gap: 2px;" c-name="div" c-id="g1_items">
        <Checkbox v-model="data.testCBC" :native="true" afterText="T\u1ED5ng ph\xE2n t\xEDch t\u1EBF b\xE0o m\xE1u" size="sm" c-name="Checkbox" c-id="chk_cbc" />
        <Checkbox v-model="data.testGlucose" :native="true" afterText="\u0110\u1ECBnh l\u01B0\u1EE3ng Glucose m\xE1u" size="sm" c-name="Checkbox" c-id="chk_glu" />
        <Checkbox v-model="data.testUreCreatinin" :native="true" afterText="Ure, Creatinin (Th\u1EADn)" size="sm" c-name="Checkbox" c-id="chk_ure" />
        <Checkbox v-model="data.testLiver" :native="true" afterText="Men gan AST / ALT (Gan)" size="sm" c-name="Checkbox" c-id="chk_liv" />
        <Checkbox v-model="data.testLipid" :native="true" afterText="B\u1ED9 m\u1EE1 m\xE1u (Lipid panel)" size="sm" c-name="Checkbox" c-id="chk_lip" />
      </div>
    </div>

    <!-- C\u1ED9t 2: Ch\u1EA9n \u0111o\xE1n h\xECnh \u1EA3nh -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 6px;" c-name="div" c-id="cls_g2">
      <div style="font-weight: bold; font-size: 11px; color: #0284c7; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;" c-name="div" c-id="g2_t">
        \u{1F4F7} II. CH\u1EA8N \u0110O\xC1N H\xCCNH \u1EA2NH
      </div>
      <div style="display: flex; flex-direction: column; gap: 2px;" c-name="div" c-id="g2_items">
        <Checkbox v-model="data.testChestXRay" :native="true" afterText="X-Quang ng\u1EF1c th\u1EB3ng" size="sm" c-name="Checkbox" c-id="chk_xray" />
        <Checkbox v-model="data.testAbdomenEcho" :native="true" afterText="Si\xEAu \xE2m \u1ED5 b\u1EE5ng t\u1ED5ng qu\xE1t" size="sm" c-name="Checkbox" c-id="chk_echo" />
        <Checkbox v-model="data.testThyroidEcho" :native="true" afterText="Si\xEAu \xE2m Tuy\u1EBFn gi\xE1p" size="sm" c-name="Checkbox" c-id="chk_thy" />
        <Checkbox v-model="data.testHeartEcho" :native="true" afterText="Si\xEAu \xE2m Tim Doppler m\xE0u" size="sm" c-name="Checkbox" c-id="chk_hecho" />
        <Checkbox v-model="data.testECG" :native="true" afterText="\u0110i\u1EC7n t\xE2m \u0111\u1ED3 (ECG 12 C\u0110)" size="sm" c-name="Checkbox" c-id="chk_ecg" />
      </div>
    </div>

    <!-- C\u1ED9t 3: N\u1ED9i soi & Th\u0103m d\xF2 ch\u1EE9c n\u0103ng -->
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 6px;" c-name="div" c-id="cls_g3">
      <div style="font-weight: bold; font-size: 11px; color: #0284c7; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;" c-name="div" c-id="g3_t">
        \u{1F52C} III. TH\u0102M D\xD2 & KH\xC1C
      </div>
      <div style="display: flex; flex-direction: column; gap: 2px;" c-name="div" c-id="g3_items">
        <Checkbox v-model="data.testUrine" :native="true" afterText="T\u1ED5ng ph\xE2n t\xEDch N\u01B0\u1EDBc ti\u1EC3u" size="sm" c-name="Checkbox" c-id="chk_uri" />
        <Checkbox v-model="data.testENT" :native="true" afterText="N\u1ED9i soi Tai M\u0169i H\u1ECDng" size="sm" c-name="Checkbox" c-id="chk_ent" />
        <Checkbox v-model="data.testStomach" :native="true" afterText="N\u1ED9i soi Th\u1EF1c qu\u1EA3n - D\u1EA1 d\xE0y" size="sm" c-name="Checkbox" c-id="chk_sto" />
        <Checkbox v-model="data.testHba1c" :native="true" afterText="\u0110\u1ECBnh l\u01B0\u1EE3ng HbA1c" size="sm" c-name="Checkbox" c-id="chk_hba" />
        <Checkbox v-model="data.testElectrolyte" :native="true" afterText="\u0110i\u1EC7n gi\u1EA3i \u0111\u1ED3 (Na, K, Cl)" size="sm" c-name="Checkbox" c-id="chk_ele" />
      </div>
    </div>
  </div>

  <!-- Footer: T\u1ED5ng ch\u1EC9 \u0111\u1ECBnh & 2 Ch\u1EEF k\xFD -->
  <div style="display: flex; justify-content: space-between; align-items: flex-end; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 4px 10px;" c-name="div" c-id="cls_foot">
    <div style="font-size: 10px; color: #166534;" c-name="div" c-id="cls_note">
      <div>\u{1F449} T\u1ED5ng s\u1ED1 ch\u1EC9 \u0111\u1ECBnh \u0111\xE3 ch\u1ECDn: <b style="font-size: 12px; color: #047857;">{{ selectedTestsCount }} d\u1ECBch v\u1EE5</b></div>
      <div style="margin-top: 2px; font-style: italic; color: #475569;">* Ng\u01B0\u1EDDi b\u1EC7nh nh\u1ECBn \u0103n s\xE1ng \u0111\u1ED1i v\u1EDBi x\xE9t nghi\u1EC7m \u0111\u01B0\u1EDDng m\xE1u v\xE0 si\xEAu \xE2m b\u1EE5ng.</div>
    </div>
    <div style="text-align: center; width: 170px;" c-name="div" c-id="cls_sig">
      <div style="font-weight: bold; font-size: 10.5px; text-transform: uppercase; color: #0369a1;" c-name="div" c-id="cls_sig_t">B\xC1C S\u0128 CH\u1EC8 \u0110\u1ECANH</div>
      <div style="margin-top: 2px;" c-name="div" c-id="cls_pnt_box">
        <Paint style="width: 160px; height: 50px; border: 1px dashed #93c5fd; border-radius: 3px; background: #fff;" v-model="data.doctorSignature" c-name="Paint" c-id="cls_pnt" />
      </div>
      <div style="font-weight: bold; font-size: 10px; color: #0f172a; margin-top: 1px;" c-name="div" c-id="cls_doc_n">{{ data.doctorName || 'BS. CKI Ho\xE0ng Minh Tu\u1EA5n' }}</div>
    </div>
  </div>
</PageA5>`,script:`// \u{1F4DC} Logic Phi\u1EBFu Ch\u1EC9 \u0110\u1ECBnh C\u1EADn L\xE2m S\xE0ng (A5 Ngang)
const data = reactive($context.data || {});

// Computed: T\u1EF1 \u0111\u1ED9ng \u0111\u1EBFm t\u1ED5ng s\u1ED1 d\u1ECBch v\u1EE5 x\xE9t nghi\u1EC7m/CLS \u0111\xE3 \u0111\u01B0\u1EE3c \u0111\xE1nh d\u1EA5u ch\u1ECDn
const selectedTestsCount = computed(() => {
  const keys = [
    'testCBC', 'testGlucose', 'testUreCreatinin', 'testLiver', 'testLipid',
    'testChestXRay', 'testAbdomenEcho', 'testThyroidEcho', 'testHeartEcho', 'testECG',
    'testUrine', 'testENT', 'testStomach', 'testHba1c', 'testElectrolyte'
  ];
  return keys.filter(k => !!data[k]).length;
});

return {
  data,
  selectedTestsCount
};`,context:{data:{orderCode:"CLS-2026-088",patientName:"Ph\u1EA1m Thanh H\u01B0\u01A1ng",age:"35",gender:"N\u1EEF",room:"Ph\xF2ng 204 - Kh\xE1m N\u1ED9i T\u1ED5ng Qu\xE1t",diagnosis:"Theo d\xF5i H\u1ED9i ch\u1EE9ng R\u1ED1i lo\u1EA1n Ti\xEAu h\xF3a / T\u0103ng men gan nh\u1EB9",orderDate:"08:30 28/08/2026",testCBC:!0,testGlucose:!0,testUreCreatinin:!1,testLiver:!0,testLipid:!0,testChestXRay:!1,testAbdomenEcho:!0,testThyroidEcho:!1,testHeartEcho:!1,testECG:!0,testUrine:!0,testENT:!1,testStomach:!1,testHba1c:!1,testElectrolyte:!1,doctorName:"BS. CKI Ho\xE0ng Minh Tu\u1EA5n",doctorSignature:""}}},{id:"native-login-screen",name:"Giao di\u1EC7n \u0110\u0103ng nh\u1EADp",badge:"UI",icon:"\u{1F510}",description:"M\u1EABu m\xE0n h\xECnh \u0110\u0103ng nh\u1EADp hi\u1EC7n \u0111\u1EA1i \u0111\u01B0\u1EE3c x\xE2y d\u1EF1ng ho\xE0n to\xE0n b\u1EB1ng 100% TH\u1EBA HTML THU\u1EA6N (div, form, input, button, select...): Th\u1EBB Card c\u0103n gi\u1EEFa, \xF4 nh\u1EADp t\xE0i kho\u1EA3n/m\u1EADt kh\u1EA9u, m\xE3 OTP 2FA 6 \xF4 s\u1ED1, checkbox ghi nh\u1EDB, n\xFAt b\u1EA5m gradient, reactive script x\u1EED l\xFD \u0111\u0103ng nh\u1EADp",template:`<div style="width: 100%; max-width: 440px; margin: 24px auto; background: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <!-- Header / Logo & Ti\xEAu \u0111\u1EC1 -->
  <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 30px 24px; text-align: center; color: #ffffff;">
    <div style="width: 52px; height: 52px; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(4px); border-radius: 12px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; font-size: 22px;">
      <i class="fa fa-hospital-o"></i>
    </div>
    <h2 style="margin: 0; font-size: 21px; font-weight: 700; letter-spacing: -0.3px;">C\u1ED5ng Th\xF4ng Tin Y T\u1EBF</h2>
    <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">\u0110\u0103ng nh\u1EADp h\u1EC7 th\u1ED1ng qu\u1EA3n tr\u1ECB & \u0111i\u1EC1u h\xE0nh kh\xE1m ch\u1EEFa b\u1EC7nh</p>
  </div>

  <!-- Form Body -->
  <div style="padding: 26px 24px;">
    <!-- Tr\u01B0\u1EDDng T\xEAn \u0111\u0103ng nh\u1EADp -->
    <div style="margin-bottom: 16px;">
      <label style="display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px;">
        <i class="fa fa-user-circle" style="color: #0284c7; margin-right: 5px;"></i> T\xEAn \u0111\u0103ng nh\u1EADp ho\u1EB7c Email:
      </label>
      <input
        type="text"
        v-model="data.username"
        placeholder="Nh\u1EADp t\xE0i kho\u1EA3n ho\u1EB7c email..."
        style="width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 13.5px; outline: none; transition: border-color 0.2s;"
      />
    </div>

    <!-- Tr\u01B0\u1EDDng M\u1EADt kh\u1EA9u -->
    <div style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <label style="font-size: 13px; font-weight: 600; color: #334155;">
          <i class="fa fa-lock" style="color: #0284c7; margin-right: 5px;"></i> M\u1EADt kh\u1EA9u:
        </label>
        <a href="javascript:void(0)" style="font-size: 12px; color: #0284c7; text-decoration: none; font-weight: 500;">Qu\xEAn m\u1EADt kh\u1EA9u?</a>
      </div>
      <input
        type="password"
        v-model="data.password"
        placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
        style="width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 13.5px; outline: none;"
      />
    </div>

    <!-- M\xE3 x\xE1c th\u1EF1c 2FA OTP (T\u1EA1o b\u1EB1ng 6 th\u1EBB input thu\u1EA7n) -->
    <div style="margin-bottom: 18px; padding: 12px 14px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 12.5px; font-weight: 600; color: #475569;">
          <i class="fa fa-shield" style="color: #10b981; margin-right: 5px;"></i> M\xE3 b\u1EA3o m\u1EADt 2FA (6 ch\u1EEF s\u1ED1):
        </span>
        <span style="font-size: 11px; color: #64748b;">G\u1EEDi v\u1EC1 SMS / App</span>
      </div>
      <div style="display: flex; gap: 8px; justify-content: space-between;">
        <input v-model="data.otp1" type="text" maxlength="1" style="width: 44px; height: 44px; text-align: center; font-size: 18px; font-weight: bold; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; background: #fff;" />
        <input v-model="data.otp2" type="text" maxlength="1" style="width: 44px; height: 44px; text-align: center; font-size: 18px; font-weight: bold; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; background: #fff;" />
        <input v-model="data.otp3" type="text" maxlength="1" style="width: 44px; height: 44px; text-align: center; font-size: 18px; font-weight: bold; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; background: #fff;" />
        <input v-model="data.otp4" type="text" maxlength="1" style="width: 44px; height: 44px; text-align: center; font-size: 18px; font-weight: bold; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; background: #fff;" />
        <input v-model="data.otp5" type="text" maxlength="1" style="width: 44px; height: 44px; text-align: center; font-size: 18px; font-weight: bold; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; background: #fff;" />
        <input v-model="data.otp6" type="text" maxlength="1" style="width: 44px; height: 44px; text-align: center; font-size: 18px; font-weight: bold; border: 1.5px solid #cbd5e1; border-radius: 8px; outline: none; background: #fff;" />
      </div>
    </div>

    <!-- T\xF9y ch\u1ECDn ghi nh\u1EDB \u0111\u0103ng nh\u1EADp -->
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; color: #475569;">
        <input type="checkbox" v-model="data.rememberMe" style="width: 16px; height: 16px; accent-color: #0284c7; cursor: pointer;" />
        Ghi nh\u1EDB \u0111\u0103ng nh\u1EADp tr\xEAn thi\u1EBFt b\u1ECB n\xE0y
      </label>
    </div>

    <!-- N\xFAt \u0110\u0103ng nh\u1EADp -->
    <button
      type="button"
      @click="handleLogin"
      style="width: 100%; padding: 12px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; border-radius: 8px; font-size: 14.5px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);"
    >
      <i class="fa fa-sign-in"></i> \u0110\u0103ng nh\u1EADp h\u1EC7 th\u1ED1ng
    </button>

    <!-- Th\xF4ng b\xE1o k\u1EBFt qu\u1EA3 \u0111\u0103ng nh\u1EADp (Reactive) -->
    <div
      v-if="loginStatus"
      :style="{
        marginTop: '14px',
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: loginSuccess ? '#f0fdf4' : '#fef2f2',
        color: loginSuccess ? '#166534' : '#991b1b',
        border: '1px solid ' + (loginSuccess ? '#bbf7d0' : '#fecaca')
      }"
    >
      <i class="fa" :class="loginSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'"></i>
      <span>{{ loginStatus }}</span>
    </div>

    <!-- \u0110\u0103ng nh\u1EADp m\u1EA1ng x\xE3 h\u1ED9i / SSO -->
    <div style="margin-top: 22px; text-align: center; position: relative;">
      <div style="height: 1px; background: #e2e8f0; margin-bottom: -10px;"></div>
      <span style="background: #fff; padding: 0 12px; font-size: 12px; color: #94a3b8; position: relative;">HO\u1EB6C \u0110\u0102NG NH\u1EACP V\u1EDAI</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 18px;">
      <button type="button" style="padding: 9px; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; color: #334155; font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
        <i class="fa fa-google" style="color: #ea4335;"></i> Google SSO
      </button>
      <button type="button" style="padding: 9px; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; color: #334155; font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
        <i class="fa fa-id-card-o" style="color: #0284c7;"></i> Th\u1EBB Y T\u1EBF (VNeID)
      </button>
    </div>

    <div style="margin-top: 20px; text-align: center; font-size: 12.5px; color: #64748b;">
      Ch\u01B0a c\xF3 t\xE0i kho\u1EA3n truy c\u1EADp? <a href="javascript:void(0)" style="color: #0284c7; font-weight: 600; text-decoration: none;">\u0110\u0103ng k\xFD t\xE0i kho\u1EA3n b\xE1c s\u0129</a>
    </div>
  </div>
</div>`,script:`// \u{1F4DC} Logic Giao Di\u1EC7n \u0110\u0103ng Nh\u1EADp & 2FA (100% Native HTML)
const data = reactive($context.data || {});
const loginStatus = ref('');
const loginSuccess = ref(false);

const fullOtp = computed(() => {
  return [data.otp1, data.otp2, data.otp3, data.otp4, data.otp5, data.otp6].join('');
});

const handleLogin = () => {
  if (!data.username || !data.password) {
    loginSuccess.value = false;
    loginStatus.value = 'Vui l\xF2ng nh\u1EADp \u0111\u1EA7y \u0111\u1EE7 T\xEAn \u0111\u0103ng nh\u1EADp v\xE0 M\u1EADt kh\u1EA9u!';
    return;
  }
  if (fullOtp.value.length < 6) {
    loginSuccess.value = false;
    loginStatus.value = 'Vui l\xF2ng nh\u1EADp \u0111\u1EE7 6 s\u1ED1 m\xE3 x\xE1c th\u1EF1c 2FA OTP!';
    return;
  }
  loginSuccess.value = true;
  loginStatus.value = '\u0110\u0103ng nh\u1EADp th\xE0nh c\xF4ng! Xin ch\xE0o ' + data.username + ' (OTP: ' + fullOtp.value + ')';
};

return {
  data,
  loginStatus,
  loginSuccess,
  fullOtp,
  handleLogin
};`,context:{data:{username:"bs.nguyenhaidang@hospital.vn",password:"password123",otp1:"8",otp2:"6",otp3:"2",otp4:"9",otp5:"0",otp6:"4",rememberMe:!0}}},{id:"native-admin-dashboard",name:"Dashboard Qu\u1EA3n tr\u1ECB",badge:"UI",icon:"\u{1F4CA}",description:"M\u1EABu B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n Qu\u1EA3n tr\u1ECB & Th\u1ED1ng k\xEA Y t\u1EBF chuy\xEAn nghi\u1EC7p b\u1EB1ng 100% TH\u1EBA HTML THU\u1EA6N (div, table, input, select, button): 4 Th\u1EBB KPI s\u1ED1 li\u1EC7u, thanh l\u1ECDc ng\xE0y th\xE1ng/chuy\xEAn khoa, b\u1EA3ng d\u1EEF li\u1EC7u ti\u1EBFp \u0111\xF3n g\u1EA7n \u0111\xE2y c\xF3 badge tr\u1EA1ng th\xE1i v\xE0 danh s\xE1ch b\xE1c s\u0129 tr\u1EF1c ca",template:`<div style="width: 100%; max-width: 1180px; margin: 0 auto; padding: 22px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; border-radius: 14px; border: 1px solid #e2e8f0; color: #1e293b;">
  <!-- 1. Thanh ti\xEAu \u0111\u1EC1 & C\xF4ng c\u1EE5 t\xECm ki\u1EBFm / B\u1ED9 l\u1ECDc nhanh -->
  <div style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 16px 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); flex-wrap: wrap; gap: 14px;">
    <div>
      <h2 style="margin: 0; font-size: 19px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px;">
        <i class="fa fa-dashboard" style="color: #0284c7;"></i> B\u1EA3ng \u0110i\u1EC1u Khi\u1EC3n Ti\u1EBFp \u0110\xF3n & Qu\u1EA3n Tr\u1ECB Kh\xE1m B\u1EC7nh
      </h2>
      <p style="margin: 3px 0 0; font-size: 12.5px; color: #64748b;">H\u1EC7 th\u1ED1ng gi\xE1m s\xE1t ch\u1EC9 s\u1ED1 ho\u1EA1t \u0111\u1ED9ng th\u1EDDi gian th\u1EF1c (Real-time Healthcare Dashboard)</p>
    </div>

    <!-- Nh\xF3m \u0111i\u1EC1u khi\u1EC3n b\u1ED9 l\u1ECDc thu\u1EA7n HTML -->
    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
      <div style="display: flex; align-items: center; gap: 6px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 6px 10px;">
        <i class="fa fa-calendar" style="color: #0284c7; font-size: 13px;"></i>
        <input type="date" v-model="data.filterDate" style="border: none; background: transparent; font-size: 13px; color: #334155; outline: none;" />
      </div>

      <div style="display: flex; align-items: center; gap: 6px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 6px 10px;">
        <i class="fa fa-filter" style="color: #0284c7; font-size: 13px;"></i>
        <select v-model="data.selectedDept" style="border: none; background: transparent; font-size: 13px; color: #334155; outline: none; cursor: pointer;">
          <option value="all">T\u1EA5t c\u1EA3 chuy\xEAn khoa</option>
          <option value="N\u1ED9i t\u1ED5ng qu\xE1t">N\u1ED9i t\u1ED5ng qu\xE1t</option>
          <option value="Tai M\u0169i H\u1ECDng">Tai M\u0169i H\u1ECDng</option>
          <option value="R\u0103ng H\xE0m M\u1EB7t">R\u0103ng H\xE0m M\u1EB7t</option>
          <option value="Nhi khoa">Nhi khoa</option>
        </select>
      </div>

      <button type="button" @click="refreshData" style="padding: 7px 12px; background: #0284c7; color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;">
        <i class="fa fa-refresh"></i> L\xE0m m\u1EDBi
      </button>
    </div>
  </div>

  <!-- 2. H\xE0ng 4 Th\u1EBB KPI Th\u1ED1ng K\xEA (Metric Cards) -->
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px;">
    <!-- Th\u1EBB 1 -->
    <div style="background: #ffffff; padding: 16px 18px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12.5px; font-weight: 600; color: #64748b;">T\u1ED5ng Ti\u1EBFp \u0110\xF3n</span>
        <div style="width: 34px; height: 34px; border-radius: 8px; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 14px;">
          <i class="fa fa-users"></i>
        </div>
      </div>
      <div style="font-size: 26px; font-weight: 700; color: #0f172a; margin: 8px 0 3px;">{{ totalPatients }}</div>
      <div style="font-size: 11.5px; color: #16a34a; font-weight: 600;"><i class="fa fa-arrow-up"></i> +14.2% so v\u1EDBi h\xF4m qua</div>
    </div>

    <!-- Th\u1EBB 2 -->
    <div style="background: #ffffff; padding: 16px 18px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12.5px; font-weight: 600; color: #64748b;">Doanh Thu H\xF4m Nay</span>
        <div style="width: 34px; height: 34px; border-radius: 8px; background: #fef3c7; color: #d97706; display: flex; align-items: center; justify-content: center; font-size: 14px;">
          <i class="fa fa-money"></i>
        </div>
      </div>
      <div style="font-size: 24px; font-weight: 700; color: #0f172a; margin: 8px 0 3px;">{{ data.revenue || '48.650.000 \u0111' }}</div>
      <div style="font-size: 11.5px; color: #16a34a; font-weight: 600;"><i class="fa fa-arrow-up"></i> +8.5% so v\u1EDBi tu\u1EA7n tr\u01B0\u1EDBc</div>
    </div>

    <!-- Th\u1EBB 3 -->
    <div style="background: #ffffff; padding: 16px 18px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12.5px; font-weight: 600; color: #64748b;">Ch\u1EDD Kh\xE1m L\xE2m S\xE0ng</span>
        <div style="width: 34px; height: 34px; border-radius: 8px; background: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 14px;">
          <i class="fa fa-clock-o"></i>
        </div>
      </div>
      <div style="font-size: 26px; font-weight: 700; color: #dc2626; margin: 8px 0 3px;">{{ waitingPatientsCount }}</div>
      <div style="font-size: 11.5px; color: #475569;">Th\u1EDDi gian ch\u1EDD TB: <b>12 ph\xFAt</b></div>
    </div>

    <!-- Th\u1EBB 4 -->
    <div style="background: #ffffff; padding: 16px 18px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12.5px; font-weight: 600; color: #64748b;">H\xE0i L\xF2ng Ng\u01B0\u1EDDi B\u1EC7nh</span>
        <div style="width: 34px; height: 34px; border-radius: 8px; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 14px;">
          <i class="fa fa-heart"></i>
        </div>
      </div>
      <div style="font-size: 26px; font-weight: 700; color: #16a34a; margin: 8px 0 3px;">98.6%</div>
      <div style="font-size: 11.5px; color: #16a34a; font-weight: 600;"><i class="fa fa-smile-o"></i> 142 l\u01B0\u1EE3t \u0111\xE1nh gi\xE1 5\u2605</div>
    </div>
  </div>

  <!-- 3. N\u1ED9i dung ch\xEDnh: B\u1EA3ng d\u1EEF li\u1EC7u ti\u1EBFp \u0111\xF3n & C\u1ED9t b\xE1c s\u0129 tr\u1EF1c -->
  <div style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 16px;">
    <!-- B\u1EA3ng d\u1EEF li\u1EC7u thu\u1EA7n (Table Native) -->
    <div style="background: #ffffff; padding: 18px 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <div>
          <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: #0f172a;">Danh S\xE1ch Ti\u1EBFp \u0110\xF3n B\u1EC7nh Nh\xE2n G\u1EA7n \u0110\xE2y</h3>
          <span style="font-size: 12px; color: #64748b;">Hi\u1EC3n th\u1ECB theo chuy\xEAn khoa \u0111\xE3 l\u1ECDc: <b>{{ data.selectedDept === 'all' ? 'T\u1EA5t c\u1EA3' : data.selectedDept }}</b></span>
        </div>
        <div v-if="lastCalled" style="font-size: 12px; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 3px 8px; border-radius: 6px;">
          <i class="fa fa-bullhorn"></i> \u0110ang g\u1ECDi: <b>{{ lastCalled }}</b>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
        <thead>
          <tr style="border-bottom: 2px solid #f1f5f9; color: #64748b;">
            <th style="padding: 10px 8px;">M\xE3 BN</th>
            <th style="padding: 10px 8px;">H\u1ECD v\xE0 t\xEAn</th>
            <th style="padding: 10px 8px;">Chuy\xEAn khoa</th>
            <th style="padding: 10px 8px;">B\xE1c s\u0129</th>
            <th style="padding: 10px 8px;">Gi\u1EDD v\xE0o</th>
            <th style="padding: 10px 8px;">Tr\u1EA1ng th\xE1i</th>
            <th style="padding: 10px 8px; text-align: center;">Thao t\xE1c</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredPatients" :key="item.id" style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 8px; font-weight: 700; color: #0284c7;">{{ item.id }}</td>
            <td style="padding: 10px 8px; font-weight: 600; color: #1e293b;">{{ item.name }}</td>
            <td style="padding: 10px 8px; color: #475569;">{{ item.dept }}</td>
            <td style="padding: 10px 8px; color: #475569;">{{ item.doctor }}</td>
            <td style="padding: 10px 8px; color: #64748b; font-size: 12px;">{{ item.time }}</td>
            <td style="padding: 10px 8px;">
              <span
                :style="{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  background: item.statusColor + '20',
                  color: item.statusColor
                }"
              >
                {{ item.status }}
              </span>
            </td>
            <td style="padding: 10px 8px; text-align: center;">
              <button
                type="button"
                @click="callPatient(item)"
                style="padding: 4px 8px; background: #e0f2fe; color: #0284c7; border: 1px solid #bae6fd; border-radius: 5px; font-size: 11.5px; font-weight: 600; cursor: pointer;"
              >
                <i class="fa fa-volume-up"></i> G\u1ECDi s\u1ED1
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- C\u1ED9t b\xEAn ph\u1EA3i: B\xE1c s\u0129 tr\u1EF1c & T\u1EF7 l\u1EC7 ti\u1EBFp \u0111\xF3n -->
    <div style="display: flex; flex-direction: column; gap: 14px;">
      <!-- Card B\xE1c s\u0129 tr\u1EF1c -->
      <div style="background: #ffffff; padding: 16px 18px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 6px;">
          <i class="fa fa-user-md" style="color: #0284c7;"></i> B\xE1c S\u0129 \u0110ang Tr\u1EF1c Ca
        </h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div v-for="doc in (data.doctors || [])" :key="doc.name" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 13px; color: #475569;">
                <i class="fa fa-user"></i>
              </div>
              <div>
                <div style="font-size: 13px; font-weight: 600; color: #1e293b;">{{ doc.name }}</div>
                <div style="font-size: 11px; color: #64748b;">{{ doc.dept }} (P.{{ doc.room }})</div>
              </div>
            </div>
            <span
              :style="{
                fontSize: '11px',
                fontWeight: '600',
                padding: '2px 6px',
                borderRadius: '4px',
                background: doc.online ? '#dcfce7' : '#f1f5f9',
                color: doc.online ? '#15803d' : '#64748b'
              }"
            >
              {{ doc.online ? '\u0110ang kh\xE1m' : 'Ngh\u1EC9 ca' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Card Ti\u1EBFn \u0111\u1ED9 ca tr\u1EF1c -->
      <div style="background: #ffffff; padding: 16px 18px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <h4 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 6px;">
          <i class="fa fa-pie-chart" style="color: #0284c7;"></i> Ph\xE2n B\u1ED5 Ti\u1EBFp \u0110\xF3n Ca Tr\u1EF1c
        </h4>
        <div style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #475569; margin-bottom: 3px;">
            <span>Ca S\xE1ng (07:30 - 11:30)</span>
            <b>76% (128 BN)</b>
          </div>
          <div style="height: 6px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
            <div style="width: 76%; height: 100%; background: #0284c7; border-radius: 4px;"></div>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #475569; margin-bottom: 3px;">
            <span>Ca Chi\u1EC1u (13:30 - 17:00)</span>
            <b>42% (58 BN)</b>
          </div>
          <div style="height: 6px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
            <div style="width: 42%; height: 100%; background: #10b981; border-radius: 4px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,script:`// \u{1F4DC} Logic Dashboard Qu\u1EA3n tr\u1ECB Y t\u1EBF (100% Native HTML)
const data = reactive($context.data || {});
const lastCalled = ref('');

const totalPatients = computed(() => {
  return Array.isArray(data.patientList) ? data.patientList.length : 0;
});

const waitingPatientsCount = computed(() => {
  if (!Array.isArray(data.patientList)) return 0;
  return data.patientList.filter(p => p.status === 'Ch\u1EDD kh\xE1m' || p.status === 'Ch\u1EDD k\u1EBFt qu\u1EA3').length;
});

const filteredPatients = computed(() => {
  if (!Array.isArray(data.patientList)) return [];
  if (!data.selectedDept || data.selectedDept === 'all') {
    return data.patientList;
  }
  return data.patientList.filter(p => p.dept === data.selectedDept);
});

const callPatient = (patient) => {
  lastCalled.value = patient.name + ' (' + patient.id + ')';
  patient.status = '\u0110ang kh\xE1m';
  patient.statusColor = '#0284c7';
};

const refreshData = () => {
  alert('\u0110\xE3 c\u1EADp nh\u1EADt d\u1EEF li\u1EC7u Dashboard th\u1EDDi gian th\u1EF1c!');
};

return {
  data,
  lastCalled,
  totalPatients,
  waitingPatientsCount,
  filteredPatients,
  callPatient,
  refreshData
};`,context:{data:{filterDate:"2026-09-04",selectedDept:"all",revenue:"48.650.000 \u0111",patientList:[{id:"BN-1029",name:"Nguy\u1EC5n V\u0103n H\xF9ng",dept:"N\u1ED9i t\u1ED5ng qu\xE1t",doctor:"BS. Tu\u1EA5n",time:"08:15",status:"\u0110ang kh\xE1m",statusColor:"#0284c7"},{id:"BN-1030",name:"Tr\u1EA7n Th\u1ECB Mai",dept:"Tai M\u0169i H\u1ECDng",doctor:"BS. \u0110\u0103ng",time:"08:25",status:"Ch\u1EDD kh\xE1m",statusColor:"#dc2626"},{id:"BN-1031",name:"L\xEA Ho\xE0ng Long",dept:"N\u1ED9i t\u1ED5ng qu\xE1t",doctor:"BS. Tu\u1EA5n",time:"08:35",status:"Ch\u1EDD k\u1EBFt qu\u1EA3",statusColor:"#f59e0b"},{id:"BN-1032",name:"V\u0169 Minh Khang",dept:"Nhi khoa",doctor:"BS. Lan",time:"08:45",status:"\u0110\xE3 ho\xE0n t\u1EA5t",statusColor:"#16a34a"},{id:"BN-1033",name:"Ho\xE0ng Thu Trang",dept:"R\u0103ng H\xE0m M\u1EB7t",doctor:"BS. Phong",time:"09:00",status:"Ch\u1EDD kh\xE1m",statusColor:"#dc2626"},{id:"BN-1034",name:"Ph\u1EA1m Thanh H\u01B0\u01A1ng",dept:"N\u1ED9i t\u1ED5ng qu\xE1t",doctor:"BS. Tu\u1EA5n",time:"09:10",status:"Ch\u1EDD kh\xE1m",statusColor:"#dc2626"}],doctors:[{name:"BS. CKI Ho\xE0ng Minh Tu\u1EA5n",dept:"N\u1ED9i t\u1ED5ng qu\xE1t",room:"204",online:!0},{name:"BS. CKI Nguy\u1EC5n H\u1EA3i \u0110\u0103ng",dept:"Tai M\u0169i H\u1ECDng",room:"208",online:!0},{name:"ThS. BS Tr\u1EA7n Ph\u01B0\u01A1ng Lan",dept:"Nhi khoa",room:"102",online:!0},{name:"BS. \u0110\u1ED7 Minh Phong",dept:"R\u0103ng H\xE0m M\u1EB7t",room:"305",online:!1}]}}}];selectedTemplateIndex=0;editMode=!0;showAIModal=!1;get currentTemplateConfig(){return this.templates[this.selectedTemplateIndex]||this.templates[0]}get template(){return this.currentTemplateConfig.template}set template(n){this.currentTemplateConfig&&(this.currentTemplateConfig.template=n)}get script(){return this.currentTemplateConfig.script}set script(n){this.currentTemplateConfig&&(this.currentTemplateConfig.script=n)}get context(){return this.currentTemplateConfig.context}set context(n){this.currentTemplateConfig&&(this.currentTemplateConfig.context=n)}selectTemplate(n){n<0||n>=this.templates.length||(this.selectedTemplateIndex=n)}onApplyAITemplate(n){if(n.isUpdateCurrent&&this.currentTemplateConfig){this.currentTemplateConfig.template=n.template,this.currentTemplateConfig.script=n.script,this.currentTemplateConfig.context=n.context,this.template=n.template,this.script=n.script,this.context=n.context;return}let e="ai-gen-"+Date.now(),a=!n.template.includes("<PageA4")&&!n.template.includes("<PageA5"),i=n.context?.data?.screenTitle||n.context?.data?.title||n.context?.data?.dashboardTitle||(n.context?.data?.username?"\u0110\u0103ng nh\u1EADp":null)||n.context?.data?.patientName||n.context?.data?.customerName||n.context?.data?.name||(a?"Giao di\u1EC7n Web":"M\u1EABu m\u1EDBi"),o={id:e,name:"AI: "+i,badge:a?"UI":"AI",icon:a?"\u{1F4BB}":"\u2728",description:a?"Giao di\u1EC7n Web/App \u0111\u01B0\u1EE3c thi\u1EBFt k\u1EBF t\u1EF1 \u0111\u1ED9ng b\u1EDFi AI":"M\u1EABu bi\u1EC3u \u0111\u01B0\u1EE3c sinh b\u1EDFi AI Copilot & Designer",template:n.template,script:n.script,context:n.context};this.templates.unshift(o),this.selectedTemplateIndex=0}onApplyAIContext(n){this.context=n}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=s.\u0275\u0275defineComponent({type:r,selectors:[["app-shell-home"]],decls:23,vars:20,consts:[[1,"shell-control-panel"],[1,"panel-left"],[1,"mode-toggle-btn",3,"click","title"],[1,"btn-icon"],[1,"btn-text"],["title","M\u1EDF tr\u1EE3 l\xFD AI thi\u1EBFt k\u1EBF bi\u1EC3u m\u1EABu (Ctrl + Shift + A)",1,"ai-shell-btn",3,"click"],[1,"status-badge"],[1,"status-dot"],[1,"status-label"],[1,"panel-center"],[1,"template-tabs"],["type","button",1,"template-tab-btn",3,"active","title"],[1,"editor-wrapper"],[3,"templateChange","scriptChange","contextChange","editModeChange","template","script","context","editMode"],[3,"visibleChange","applyTemplate","applyContext","visible","currentTemplate","currentScript","currentContext","currentTemplateName","currentTemplateBadge","currentTemplateIcon","currentTemplateDescription"],["type","button",1,"template-tab-btn",3,"click","title"],[1,"tpl-icon"],[1,"tpl-name"],[1,"tpl-badge"]],template:function(e,a){e&1&&(s.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"button",2),s.\u0275\u0275listener("click",function(){return a.editMode=!a.editMode}),s.\u0275\u0275elementStart(3,"span",3),s.\u0275\u0275text(4),s.\u0275\u0275elementEnd(),s.\u0275\u0275elementStart(5,"span",4),s.\u0275\u0275text(6),s.\u0275\u0275elementEnd()(),s.\u0275\u0275elementStart(7,"button",5),s.\u0275\u0275listener("click",function(){return a.showAIModal=!0}),s.\u0275\u0275elementStart(8,"span",3),s.\u0275\u0275text(9,"\u2728"),s.\u0275\u0275elementEnd(),s.\u0275\u0275elementStart(10,"span",4),s.\u0275\u0275text(11,"AI Thi\u1EBFt k\u1EBF"),s.\u0275\u0275elementEnd()(),s.\u0275\u0275elementStart(12,"div",6),s.\u0275\u0275element(13,"span",7),s.\u0275\u0275elementStart(14,"span",8),s.\u0275\u0275text(15),s.\u0275\u0275elementEnd()()(),s.\u0275\u0275elementStart(16,"div",9)(17,"div",10),s.\u0275\u0275repeaterCreate(18,Ft,7,12,"button",11,Lt),s.\u0275\u0275elementEnd()()(),s.\u0275\u0275elementStart(20,"div",12)(21,"template-editor",13),s.\u0275\u0275twoWayListener("templateChange",function(o){return s.\u0275\u0275twoWayBindingSet(a.template,o)||(a.template=o),o})("scriptChange",function(o){return s.\u0275\u0275twoWayBindingSet(a.script,o)||(a.script=o),o})("contextChange",function(o){return s.\u0275\u0275twoWayBindingSet(a.context,o)||(a.context=o),o})("editModeChange",function(o){return s.\u0275\u0275twoWayBindingSet(a.editMode,o)||(a.editMode=o),o}),s.\u0275\u0275elementEnd()(),s.\u0275\u0275elementStart(22,"app-ai-assistant-modal",14),s.\u0275\u0275twoWayListener("visibleChange",function(o){return s.\u0275\u0275twoWayBindingSet(a.showAIModal,o)||(a.showAIModal=o),o}),s.\u0275\u0275listener("applyTemplate",function(o){return a.onApplyAITemplate(o)})("applyContext",function(o){return a.onApplyAIContext(o)}),s.\u0275\u0275elementEnd()),e&2&&(s.\u0275\u0275advance(2),s.\u0275\u0275classProp("active",a.editMode),s.\u0275\u0275property("title",a.editMode?"Nh\u1EA5n \u0111\u1EC3 chuy\u1EC3n sang ch\u1EBF \u0111\u1ED9 Ch\u1EC9 xem & \u0110i\u1EC1n form":"Nh\u1EA5n \u0111\u1EC3 chuy\u1EC3n sang ch\u1EBF \u0111\u1ED9 Thi\u1EBFt k\u1EBF m\u1EABu bi\u1EC3u"),s.\u0275\u0275advance(2),s.\u0275\u0275textInterpolate(a.editMode?"\u{1F512}":"\u270F\uFE0F"),s.\u0275\u0275advance(2),s.\u0275\u0275textInterpolate(a.editMode?"Kh\xF3a":"Thi\u1EBFt k\u1EBF"),s.\u0275\u0275advance(6),s.\u0275\u0275classProp("editing",a.editMode),s.\u0275\u0275advance(3),s.\u0275\u0275textInterpolate(a.editMode?"Edit":"Preview"),s.\u0275\u0275advance(3),s.\u0275\u0275repeater(a.templates),s.\u0275\u0275advance(3),s.\u0275\u0275twoWayProperty("template",a.template)("script",a.script)("context",a.context)("editMode",a.editMode),s.\u0275\u0275advance(),s.\u0275\u0275twoWayProperty("visible",a.showAIModal),s.\u0275\u0275property("currentTemplate",a.template)("currentScript",a.script)("currentContext",a.context)("currentTemplateName",a.currentTemplateConfig.name)("currentTemplateBadge",a.currentTemplateConfig.badge)("currentTemplateIcon",a.currentTemplateConfig.icon)("currentTemplateDescription",a.currentTemplateConfig.description))},dependencies:[Vt,zt,k,z],styles:[".shell-control-panel[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:5px 12px;background:#fff;border-bottom:1px solid #e2e8f0;box-shadow:0 1px 2px #00000008;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.panel-left[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.mode-toggle-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;font-size:12px;font-weight:600;border-radius:5px;border:1px solid #e2e8f0;background:#f8fafc;color:#334155;cursor:pointer;transition:all .15s ease}.mode-toggle-btn[_ngcontent-%COMP%]:hover{background:#f1f5f9;color:#0f172a}.mode-toggle-btn.active[_ngcontent-%COMP%]{background:#2563eb;border-color:#1d4ed8;color:#fff}.mode-toggle-btn[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]{font-size:11.5px}.ai-shell-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:5px;padding:3.5px 10px;font-size:12px;font-weight:600;border-radius:6px;border:1px solid #7dd3fc;background:linear-gradient(135deg,#0284c7,#6366f1);color:#fff;cursor:pointer;box-shadow:0 2px 8px #0284c740;transition:all .2s ease}.ai-shell-btn[_ngcontent-%COMP%]:hover{transform:translateY(-1px);box-shadow:0 4px 12px #0284c759;background:linear-gradient(135deg,#0369a1,#4f46e5)}.ai-shell-btn[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]{font-size:12px}.status-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:5px;padding:2.5px 7px;border-radius:12px;font-size:11px;font-weight:500;background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0}.status-badge[_ngcontent-%COMP%]   .status-dot[_ngcontent-%COMP%]{width:6px;height:6px;border-radius:50%;background:#94a3b8}.status-badge.editing[_ngcontent-%COMP%]{background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe}.status-badge.editing[_ngcontent-%COMP%]   .status-dot[_ngcontent-%COMP%]{background:#2563eb}.panel-center[_ngcontent-%COMP%]{display:flex;align-items:center;flex:1;justify-content:center}.template-tabs[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:2px;background:#f1f5f9;padding:2px;border-radius:6px;border:1px solid #e2e8f0}.template-tab-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;font-size:11.5px;font-weight:500;border:1px solid transparent;background:transparent;color:#475569;border-radius:4px;cursor:pointer;transition:all .12s ease;white-space:nowrap}.template-tab-btn[_ngcontent-%COMP%]   .tpl-icon[_ngcontent-%COMP%]{font-size:12px}.template-tab-btn[_ngcontent-%COMP%]   .tpl-name[_ngcontent-%COMP%]{letter-spacing:.1px}.template-tab-btn[_ngcontent-%COMP%]   .tpl-badge[_ngcontent-%COMP%]{font-size:9.5px;font-weight:700;padding:.5px 4px;border-radius:3px;background:#e2e8f0;color:#475569}.template-tab-btn[_ngcontent-%COMP%]   .tpl-badge.badge-a5[_ngcontent-%COMP%]{background:#dcfce7;color:#15803d}.template-tab-btn[_ngcontent-%COMP%]   .tpl-badge.badge-landscape[_ngcontent-%COMP%]{background:#fef3c7;color:#b45309}.template-tab-btn[_ngcontent-%COMP%]   .tpl-badge.badge-ui[_ngcontent-%COMP%]{background:#ede9fe;color:#6d28d9}.template-tab-btn[_ngcontent-%COMP%]:hover{background:#fff;color:#0f172a}.template-tab-btn.active[_ngcontent-%COMP%]{background:#fff;color:#1d4ed8;font-weight:600;border-color:#cbd5e1;box-shadow:0 1px 2px #0000000d}.template-tab-btn.active[_ngcontent-%COMP%]   .tpl-badge[_ngcontent-%COMP%]{background:#dbeafe;color:#1d4ed8}.template-tab-btn.active[_ngcontent-%COMP%]   .tpl-badge.badge-a5[_ngcontent-%COMP%]{background:#dcfce7;color:#15803d}.template-tab-btn.active[_ngcontent-%COMP%]   .tpl-badge.badge-landscape[_ngcontent-%COMP%]{background:#fef3c7;color:#b45309}.panel-right[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.angular-input-group[_ngcontent-%COMP%]{display:flex;align-items:center;background:#f8fafc;border:1px solid #e2e8f0;border-radius:5px;padding:2px 6px}.angular-input-group[_ngcontent-%COMP%]:focus-within{border-color:#3b82f6;background:#fff}.angular-input-group[_ngcontent-%COMP%]   .input-tag[_ngcontent-%COMP%]{font-size:10px;font-weight:700;color:#dc2626;background:#fee2e2;padding:1px 4px;border-radius:3px;margin-right:4px}.angular-input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;gap:3px}.angular-input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:11px;font-weight:600;color:#475569}.angular-input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .form-control-shell[_ngcontent-%COMP%]{border:none;background:transparent;outline:none;font-size:12px;color:#0f172a;padding:1px 2px;width:110px}.ip-info-pill[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 7px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;font-size:11px;color:#166534}.ip-info-pill[_ngcontent-%COMP%]   .ip-dot[_ngcontent-%COMP%]{width:5px;height:5px;border-radius:50%;background:#22c55e}.ip-info-pill[_ngcontent-%COMP%]   .ip-label[_ngcontent-%COMP%]{font-weight:600}.ip-info-pill[_ngcontent-%COMP%]   .ip-value[_ngcontent-%COMP%]{font-family:monospace;font-size:10.5px;font-weight:600}.editor-wrapper[_ngcontent-%COMP%]{width:100%}"]})};import*as B from"@angular/core";function X(r,n={}){class e{vueApp;vm;ngOnInit(){this.vueApp=r("#vueContainer"),this.vm=this.vueApp.mount("#vueContainer"),Object.entries(n).forEach(([i,o])=>{this.vm[i]=o})}ngOnDestroy(){this.vueApp?.unmount()}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=B.\u0275\u0275defineComponent({type:e,selectors:[["ng-component"]],decls:1,vars:0,consts:[["id","vueContainer"]],template:function(o,d){o&1&&B.\u0275\u0275element(0,"div",0)},encapsulation:2})}return e}var Q=[{path:"",component:D},{path:"vue-page",loadComponent:()=>S({remoteEntry:H,exposedModule:"./component-factory"}).then(r=>X(r.createApp))},{path:"first",loadComponent:()=>S("firstMf","./Component").then(r=>r.App)},{path:"**",component:D}];var J={providers:[Rt(),Kt({eventCoalescing:!0}),Gt(Q)]};import{RouterLink as Yt,RouterModule as jt}from"@angular/router";import*as g from"@angular/core";import*as F from"@angular/router";var Z=()=>({exact:!0}),L=class r{menuOpen=!1;toggleMenu(){this.menuOpen=!this.menuOpen}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=g.\u0275\u0275defineComponent({type:r,selectors:[["app-shell-root"]],decls:19,vars:6,consts:[[1,"navbar"],[1,"container"],[1,"logo"],[1,"nav-links"],["routerLink","/","routerLinkActive","active",1,"nav-link",3,"routerLinkActiveOptions"],["routerLink","/vue-page","routerLinkActive","active",1,"nav-link",3,"routerLinkActiveOptions"],["routerLink","/first","routerLinkActive","active",1,"nav-link"],[1,"hamburger",3,"click"]],template:function(e,a){e&1&&(g.\u0275\u0275elementStart(0,"nav",0)(1,"div",1)(2,"h3",2),g.\u0275\u0275text(3,"Angular Microfrontends"),g.\u0275\u0275elementEnd(),g.\u0275\u0275elementStart(4,"ul",3)(5,"li")(6,"a",4),g.\u0275\u0275text(7," Home "),g.\u0275\u0275elementEnd()(),g.\u0275\u0275elementStart(8,"li")(9,"a",5),g.\u0275\u0275text(10," Vue page "),g.\u0275\u0275elementEnd()(),g.\u0275\u0275elementStart(11,"li")(12,"a",6),g.\u0275\u0275text(13," First MF "),g.\u0275\u0275elementEnd()()(),g.\u0275\u0275elementStart(14,"div",7),g.\u0275\u0275listener("click",function(){return a.toggleMenu()}),g.\u0275\u0275element(15,"span")(16,"span")(17,"span"),g.\u0275\u0275elementEnd()()(),g.\u0275\u0275element(18,"router-outlet")),e&2&&(g.\u0275\u0275advance(4),g.\u0275\u0275classProp("active",a.menuOpen),g.\u0275\u0275advance(2),g.\u0275\u0275property("routerLinkActiveOptions",g.\u0275\u0275pureFunction0(4,Z)),g.\u0275\u0275advance(3),g.\u0275\u0275property("routerLinkActiveOptions",g.\u0275\u0275pureFunction0(5,Z)))},dependencies:[Yt,jt,F.RouterOutlet,F.RouterLinkActive],styles:['*[_ngcontent-%COMP%]{margin:0;padding:0;box-sizing:border-box}body[_ngcontent-%COMP%]{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;background-color:#0f172a;color:#334155}.navbar[_ngcontent-%COMP%]{width:100%;background:#0f172a;color:#fff;padding:.65rem 1.5rem;position:sticky;top:0;z-index:1000;border-bottom:1px solid rgba(255,255,255,.08);box-shadow:0 4px 12px #00000026}.navbar[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;max-width:100%}.logo[_ngcontent-%COMP%]{font-size:1.15rem;font-weight:700;color:#f8fafc;letter-spacing:-.2px;display:flex;align-items:center;gap:8px}.logo[_ngcontent-%COMP%]:before{content:"";display:inline-block;width:10px;height:10px;background:#38bdf8;border-radius:50%;box-shadow:0 0 10px #38bdf8}.nav-links[_ngcontent-%COMP%]{list-style:none;display:flex;align-items:center;gap:.5rem}.nav-link[_ngcontent-%COMP%]{text-decoration:none;color:#94a3b8;font-size:.875rem;font-weight:500;padding:6px 14px;border-radius:6px;transition:all .2s cubic-bezier(.4,0,.2,1)}.nav-link[_ngcontent-%COMP%]:hover{color:#f8fafc;background:#ffffff0f}.nav-link.active[_ngcontent-%COMP%]{color:#38bdf8;background:#38bdf81f;font-weight:600}.hamburger[_ngcontent-%COMP%]{display:none;flex-direction:column;cursor:pointer;gap:5px}.hamburger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{height:2px;width:22px;background-color:#cbd5e1;border-radius:2px}@media (max-width: 768px){.hamburger[_ngcontent-%COMP%]{display:flex}.nav-links[_ngcontent-%COMP%]{display:none;position:absolute;top:100%;left:0;width:100%;background-color:#0f172a;flex-direction:column;padding:1rem;gap:.5rem;border-bottom:1px solid rgba(255,255,255,.08)}.nav-links.active[_ngcontent-%COMP%]{display:flex}}']})};Ut(L,J).catch(r=>console.error(r));
