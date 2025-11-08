import{P as l,_ as c,r as p,c as d,o as m,a as u,W as f,Q as g}from"./main-DSnph9Xo.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const v={name:"App",components:{Preview:l},data(){return{data:{name:"Nguyen Van A",age:"30"},template:`<PageA4 style="padding: 3mm 15mm 3mm 15mm;">
  <div>{{ data.name }}</div>
  <p>Tuổi: {{ data.age }}</p>
  <Textarea
    v-model="data.name"
    label="Họ và tên:"
    :line="true"
    :suffix="{ length: 1, char: '❤️' }"
  />
  <Textarea
    v-model="data.age"
    label="Tuổi:"
    :line="true"
  />
  <InputOTP
    v-model="data.age"
    :maskLength="[1,1,1]"
    pad-start="0"
  />

</PageA4>`}}};function y(s,r,n,o,e,t){const a=p("Preview");return m(),d(a,{template:e.template,"onUpdate:template":r[0]||(r[0]=i=>e.template=i),data:e.data},null,8,["template","data"])}const P=c(v,[["render",y]]);u(P).use(f).use(g).mount("#app");
