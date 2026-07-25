import{a as d,b as l}from"./chunk-DRMXH472.js";import{bootstrapApplication as L}from"@angular/platform-browser";import{provideBrowserGlobalErrorListeners as P,provideZoneChangeDetection as D}from"@angular/core";import{provideRouter as T}from"@angular/router";import{EventEmitter as b}from"@angular/core";import{FormsModule as w}from"@angular/forms";import*as c from"@angular/core";import*as g from"@angular/core";var u=class t{module=null;_initVueModule(){return d(this,null,function*(){if(!this.module)try{this.module=yield l({remoteName:"templateEditor",exposedModule:"./component-factory"})}catch(i){console.error("[VueLoader] Failed to load Vue remote module:",i),this.module=null}})}createPreview(){return d(this,null,function*(){yield this._initVueModule();try{if(!this.module?.createPreview)throw new Error("Vue module does not export createPreview.");return this.module.createPreview()}catch(i){return console.log(i),null}})}static \u0275fac=function(a){return new(a||t)};static \u0275prov=g.\u0275\u0275defineInjectable({token:t,factory:t.\u0275fac,providedIn:"root"})};var h=class t{constructor(i){this.vueLoader=i}app=null;vm=null;template="";templateChange=new b;data={};dataChange=new b;ngOnInit(){return d(this,null,function*(){this.app=yield this.vueLoader.createPreview(),this.vm=this.app.mount("#template-editor"),this.vm.data=this.data,this.vm.template=this.template,this.dataChange.emit(this.vm.data),this.vm.$watch("template",i=>{this.templateChange.emit(i)})})}ngOnChanges(i){this.vm&&i.template&&(this.vm.template=this.template)}ngOnDestroy(){this.app?.unmount()}static \u0275fac=function(a){return new(a||t)(c.\u0275\u0275directiveInject(u))};static \u0275cmp=c.\u0275\u0275defineComponent({type:t,selectors:[["template-editor"]],inputs:{template:"template",data:"data"},outputs:{templateChange:"templateChange",dataChange:"dataChange"},features:[c.\u0275\u0275NgOnChangesFeature],decls:1,vars:0,consts:[["id","template-editor"]],template:function(a,r){a&1&&c.\u0275\u0275element(0,"div",0)},dependencies:[w],encapsulation:2})};import{FormsModule as O}from"@angular/forms";import*as n from"@angular/core";var p=class t{template=`<PageA4 style="padding:3mm 15mm" c-name="PageA4" c-id="u30lyv7">
  <div c-name="div" c-id="5wz82b0">
    <b c-name="b" c-id="z7ton81">Textarea</b>
  </div>
  <Textarea v-model="data.name" label="H\u1ECD v\xE0 t\xEAn:" line :suffix="{ length:1, char:'\u2764\uFE0F' }" c-name="Textarea"
    c-id="oqtwc4d" path="data.name" path-suffix="{ length:1, char:'\u2764\uFE0F' }" />
  <div c-name="div" c-id="gszdea8">
    <b c-name="b" c-id="yukgkqs">InputOTP</b>
  </div>
  <InputOTP v-model="data.age" :mask-length="[1,1,1]" pad-start="0" c-name="InputOTP" c-id="kdp07ck" path="data.age"
    path-mask-length="[1,1,1]" />
  <div c-name="div" c-id="ri82mdl">
    <b c-name="b" c-id="86q3zv5">Select one</b>
  </div>
  <Select v-model="data.category" label="Danh m\u1EE5c:" placeholder="Ch\u1ECDn danh m\u1EE5c" bind-label="name" bind-value="id"
    :items="categoryList" c-name="Select" c-id="r33jcxf" path="data.category" path-items="categoryList" />
  <div c-name="div" c-id="1aqqwln">
    <b c-name="b" c-id="bwz68li">Select multiple</b>
  </div>
  <Select v-model="data.tags" label="Tags:" placeholder="Ch\u1ECDn tags" bind-label="label" bind-value="value"
    :items="tagList" multiple c-name="Select" c-id="9d3o1sm" path="data.tags" path-items="tagList" />
  <div style="color:#0066cc" c-name="div" c-id="047rhv3">Tags \u0111\xE3 ch\u1ECDn
    {{ data.tags }}
  </div>
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
  <DatePicker v-model="data.birthday" placeholder="Ch\u1ECDn ng\xE0y sinh" format="DD/MM/YYYY" c-name="DatePicker"
    c-id="y366dko" path="data.birthday" />
  <div style="color:#0066cc" c-name="div" c-id="8zkactw">Ng\xE0y sinh \u0111\xE3 ch\u1ECDn:<b c-name="b" c-id="5joniyw">{{ data.birthday
      }}</b>
  </div>
  <div c-name="div" c-id="aknsmdv">
    <b c-name="b" c-id="ognk3qp">DatePicker - \u0110\u1ECBnh d\u1EA1ng ch\u1EEF</b>
  </div>
  <DatePicker v-model="data.birthdayText" placeholder="DD th\xE1ng MM n\u0103m YYYY" format="DD [th\xE1ng] MM [n\u0103m] YYYY"
    c-name="DatePicker" c-id="4cp28lw" path="data.birthdayText" />
  <div style="color:#0066cc" c-name="div" c-id="mgbravx">Gi\xE1 tr\u1ECB:<b c-name="b" c-id="btvfoao">{{ data.birthdayText
      }}</b>
  </div>
  <div c-name="div" c-id="sbxot28">
    <b c-name="b" c-id="ilxg1be">DatePicker (datetime) - Gi\u1EDD h\u1EB9n</b>
  </div>
  <DatePicker v-model="data.appointment" mode="datetime" placeholder="Ch\u1ECDn ng\xE0y gi\u1EDD" format="HH:mm DD/MM/YYYY"
    :minute-step="15" c-name="DatePicker" c-id="e6dqk7f" path="data.appointment" path-minute-step="15" />
  <div style="color:#0066cc" c-name="div" c-id="q74v2xs">Ng\xE0y gi\u1EDD \u0111\xE3 ch\u1ECDn:<b c-name="b" c-id="55xc88a">{{
      data.appointment }}</b>
  </div>
  <div c-name="div" c-id="82rm20p">
    <b c-name="b" c-id="po0ikwz">Checkbox - Size</b>
  </div>
  <Checkbox v-model="data.sizeTest" value="small" beforeText="[sm]" afterText="Small" size="sm" c-name="Checkbox"
    c-id="u9uayx1" path="data.sizeTest" />
  <Checkbox v-model="data.sizeTest" value="medium" beforeText="[md]" afterText="Medium" size="md" c-name="Checkbox"
    c-id="e673tj4" path="data.sizeTest" />
  <Checkbox v-model="data.sizeTest" value="large" beforeText="[lg]" afterText="Large" size="lg" c-name="Checkbox"
    c-id="qdqk80l" path="data.sizeTest" />
  <Checkbox v-model="data.sizeTest" value="xlarge" beforeText="[xl]" afterText="X-Large" size="xl" c-name="Checkbox"
    c-id="9hd0m1l" path="data.sizeTest" />
  <div style="color:#0066cc" c-name="div" c-id="okpshd8">Gi\xE1 tr\u1ECB:<b c-name="b" c-id="korldbv">{{ data.sizeTest }}</b>
  </div>
  <div c-name="div" c-id="uxuwmt4">
    <b c-name="b" c-id="318h0k7">Paint - Ch\u1EEF k\xFD</b>
  </div>
  <Paint style="width:400px; height:150px;" v-model="data.signature"
    src="https://fastly.picsum.photos/id/237/250/250.jpg?hmac=tNmO3YWXALG9JM81cghI9nflo3dWc3e5vlNsf_jmKWw"
    c-name="Paint" c-id="hq1vub8" path="data.signature" />
  <div v-if="data.signature" c-name="div" c-id="8gswa5w">
    <div c-name="div" c-id="ozfucom">\u1EA2nh \u0111\xE3 l\u01B0u:</div><img :src="data.signature" alt="signature"
      style="max-width:200px;border:1px solid #ccc;" c-name="img" c-id="x7lifom" path-src="data.signature" />
  </div>
</PageA4>`;data={name:"duynnz"};static \u0275fac=function(a){return new(a||t)};static \u0275cmp=n.\u0275\u0275defineComponent({type:t,selectors:[["app-shell-home"]],decls:1,vars:2,consts:[[3,"templateChange","dataChange","template","data"]],template:function(a,r){a&1&&(n.\u0275\u0275elementStart(0,"template-editor",0),n.\u0275\u0275twoWayListener("templateChange",function(o){return n.\u0275\u0275twoWayBindingSet(r.template,o)||(r.template=o),o})("dataChange",function(o){return n.\u0275\u0275twoWayBindingSet(r.data,o)||(r.data=o),o}),n.\u0275\u0275elementEnd()),a&2&&n.\u0275\u0275twoWayProperty("template",r.template)("data",r.data)},dependencies:[O,h],encapsulation:2})};import*as s from"@angular/core";function x(t,i={}){class a{vueApp;vm;ngOnInit(){this.vueApp=t("#vueContainer"),this.vm=this.vueApp.mount("#vueContainer"),Object.entries(i).forEach(([m,o])=>{this.vm[m]=o})}ngOnDestroy(){this.vueApp?.unmount()}static \u0275fac=function(o){return new(o||a)};static \u0275cmp=s.\u0275\u0275defineComponent({type:a,selectors:[["ng-component"]],decls:1,vars:0,consts:[["id","vueContainer"]],template:function(o,z){o&1&&s.\u0275\u0275element(0,"div",0)},encapsulation:2})}return a}var y=[{path:"",component:p},{path:"vue-page",loadComponent:()=>l("templateEditor","./component-factory").then(t=>x(t.createApp))},{path:"first",loadComponent:()=>l("firstMf","./Component").then(t=>t.App)},{path:"**",component:p}];var C={providers:[P(),D({eventCoalescing:!0}),T(y)]};import{RouterLink as _,RouterModule as A}from"@angular/router";import*as e from"@angular/core";import*as f from"@angular/router";var k=()=>({exact:!0}),v=class t{menuOpen=!1;toggleMenu(){this.menuOpen=!this.menuOpen}static \u0275fac=function(a){return new(a||t)};static \u0275cmp=e.\u0275\u0275defineComponent({type:t,selectors:[["app-shell-root"]],decls:19,vars:6,consts:[[1,"navbar"],[1,"container"],[1,"logo"],[1,"nav-links"],["routerLink","/","routerLinkActive","active",1,"nav-link",3,"routerLinkActiveOptions"],["routerLink","/vue-page","routerLinkActive","active",1,"nav-link",3,"routerLinkActiveOptions"],["routerLink","/first","routerLinkActive","active",1,"nav-link"],[1,"hamburger",3,"click"]],template:function(a,r){a&1&&(e.\u0275\u0275elementStart(0,"nav",0)(1,"div",1)(2,"h3",2),e.\u0275\u0275text(3,"Angular Microfrontends"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"ul",3)(5,"li")(6,"a",4),e.\u0275\u0275text(7," Home "),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(8,"li")(9,"a",5),e.\u0275\u0275text(10," Vue page "),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(11,"li")(12,"a",6),e.\u0275\u0275text(13," First MF "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(14,"div",7),e.\u0275\u0275listener("click",function(){return r.toggleMenu()}),e.\u0275\u0275element(15,"span")(16,"span")(17,"span"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275element(18,"router-outlet")),a&2&&(e.\u0275\u0275advance(4),e.\u0275\u0275classProp("active",r.menuOpen),e.\u0275\u0275advance(2),e.\u0275\u0275property("routerLinkActiveOptions",e.\u0275\u0275pureFunction0(4,k)),e.\u0275\u0275advance(3),e.\u0275\u0275property("routerLinkActiveOptions",e.\u0275\u0275pureFunction0(5,k)))},dependencies:[_,A,f.RouterOutlet,f.RouterLinkActive],styles:["*[_ngcontent-%COMP%]{margin:0;padding:0;box-sizing:border-box}body[_ngcontent-%COMP%]{font-family:Playfair Display,serif}.navbar[_ngcontent-%COMP%]{width:100%;background-color:#1e1e2f;color:#fff;padding:.8rem 2rem;position:sticky;top:0;z-index:1000;box-shadow:0 2px 8px #0003}.navbar[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.logo[_ngcontent-%COMP%]{font-size:1.8rem;font-weight:700;color:#fff;letter-spacing:1px}.nav-links[_ngcontent-%COMP%]{list-style:none;display:flex;gap:1.5rem}.nav-link[_ngcontent-%COMP%]{text-decoration:none;color:#fff;font-weight:500;transition:color .3s,transform .3s}.nav-link[_ngcontent-%COMP%]:hover, .nav-link.active[_ngcontent-%COMP%]{color:#ff6f61;transform:scale(1.1)}.hamburger[_ngcontent-%COMP%]{display:none;flex-direction:column;cursor:pointer;gap:5px}.hamburger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{height:3px;width:25px;background-color:#fff;border-radius:2px}@media (max-width: 768px){.nav-links[_ngcontent-%COMP%]{position:absolute;top:70px;right:0;background-color:#1e1e2f;flex-direction:column;width:200px;gap:1rem;padding:1rem;transform:translate(100%);transition:transform .3s ease-in-out}.nav-links.active[_ngcontent-%COMP%]{transform:translate(0)}.hamburger[_ngcontent-%COMP%]{display:flex}}"]})};L(v,C).catch(t=>console.error(t));
