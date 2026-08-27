import{a as p,b as s}from"./chunk-DRMXH472.js";import{bootstrapApplication as z}from"@angular/platform-browser";import{provideBrowserGlobalErrorListeners as E,provideZoneChangeDetection as D}from"@angular/core";import{provideRouter as T}from"@angular/router";import{EventEmitter as h}from"@angular/core";import{FormsModule as P}from"@angular/forms";import*as l from"@angular/core";var g="./template-editor/assets/remoteEntry.js";import*as C from"@angular/core";var f=class r{module=null;_initVueModule(){return p(this,null,function*(){if(!this.module)try{this.module=yield s({remoteEntry:g,exposedModule:"./component-factory"})}catch(a){console.error("[VueLoader] Failed to load Vue remote module:",a),this.module=null}})}createPreview(){return p(this,null,function*(){yield this._initVueModule();try{if(!this.module?.createPreview)throw new Error("Vue module does not export createPreview.");return this.module.createPreview()}catch(a){return console.log(a),null}})}static \u0275fac=function(n){return new(n||r)};static \u0275prov=C.\u0275\u0275defineInjectable({token:r,factory:r.\u0275fac,providedIn:"root"})};var b=class r{constructor(a){this.vueLoader=a}app=null;vm=null;template="";templateChange=new h;script="";scriptChange=new h;data={};dataChange=new h;editMode=!0;editModeChange=new h;ngOnInit(){return p(this,null,function*(){if(this.app=yield this.vueLoader.createPreview(),!this.app)return console.error("Failed to load Vue preview component.");this.vm=this.app.mount("#template-editor");let a=this.vm.$data;a&&(this.template&&(a.template=this.template),this.script&&(a.script=this.script),this.data&&Object.keys(this.data).length>0&&Object.assign(a.data,this.data),a.editMode=this.editMode),this.dataChange.emit(a?.data??this.data),this.vm.$watch("data",n=>{this.dataChange.emit(n)},{deep:!0}),this.vm.$watch("template",n=>{this.templateChange.emit(n)}),this.vm.$watch("script",n=>{this.scriptChange.emit(n)}),this.vm.$watch("editMode",n=>{this.editModeChange.emit(n)})})}ngOnChanges(a){if(!this.vm)return;let n=this.vm.$data;n&&(a.data&&this.data&&Object.assign(n.data,this.data),a.script&&(n.script=this.script),a.template&&(n.template=this.template),a.editMode&&(n.editMode=this.editMode))}ngOnDestroy(){this.app?.unmount()}static \u0275fac=function(n){return new(n||r)(l.\u0275\u0275directiveInject(f))};static \u0275cmp=l.\u0275\u0275defineComponent({type:r,selectors:[["template-editor"]],inputs:{template:"template",script:"script",data:"data",editMode:"editMode"},outputs:{templateChange:"templateChange",scriptChange:"scriptChange",dataChange:"dataChange",editModeChange:"editModeChange"},features:[l.\u0275\u0275NgOnChangesFeature],decls:1,vars:0,consts:[["id","template-editor"]],template:function(n,i){n&1&&l.\u0275\u0275element(0,"div",0)},dependencies:[P],encapsulation:2})};import{FormsModule as O}from"@angular/forms";import*as e from"@angular/core";import*as c from"@angular/forms";var m=class r{template=`<PageA4 style="padding:3mm 15mm" c-name="PageA4" c-id="u30lyv7">
  <div style="margin-top: 15px; padding: 10px 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px;" c-name="div" c-id="ip_box_1">
    <b style="color: #1e40af;" c-name="b" c-id="ip_title_1">\u{1F310} \u0110\u1ECBa ch\u1EC9 IP (L\u1EA5y t\u1EEB API qua top-level await):</b>
    <span style="color: #2563eb; font-weight: bold; margin-left: 8px; font-size: 15px;" c-name="span" c-id="ip_val_1">{{ data.ip || '\u0110ang t\u1EA3i IP...' }}</span>
  </div>
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
</PageA4>`;script=`// \u{1F4DC} Kh\u1EDFi t\u1EA1o state v\xE0 logic t\xEDnh to\xE1n truy\u1EC1n t\u1EEB Angular
try {
  data.ip = await (await fetch('https://api.ipify.org')).text();
} catch (e) {
  data.ip = 'L\u1ED7i t\u1EA3i IP: ' + e.message;
}

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

return {
  categoryList,
  tagList,
  contextItems
};`;data={name:"duynnz1",ip:""};editMode=!0;static \u0275fac=function(n){return new(n||r)};static \u0275cmp=e.\u0275\u0275defineComponent({type:r,selectors:[["app-shell-home"]],decls:27,vars:16,consts:[[1,"shell-control-panel"],[1,"panel-left"],[1,"mode-toggle-btn",3,"click","title"],[1,"btn-icon"],[1,"btn-text"],[1,"status-badge"],[1,"status-dot"],[1,"status-label"],[1,"panel-right"],[1,"angular-input-group"],[1,"input-tag"],[1,"input-wrapper"],["for","angular-name-input"],["id","angular-name-input","placeholder","Nh\u1EADp h\u1ECD t\xEAn t\u1EA1i Angular...",1,"form-control-shell",3,"ngModelChange","ngModel"],[1,"ip-info-pill"],[1,"ip-dot"],[1,"ip-label"],[1,"ip-value"],[1,"editor-wrapper"],[3,"templateChange","scriptChange","dataChange","editModeChange","template","script","data","editMode"]],template:function(n,i){n&1&&(e.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"button",2),e.\u0275\u0275listener("click",function(){return i.editMode=!i.editMode}),e.\u0275\u0275elementStart(3,"span",3),e.\u0275\u0275text(4),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"span",4),e.\u0275\u0275text(6),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(7,"div",5),e.\u0275\u0275element(8,"span",6),e.\u0275\u0275elementStart(9,"span",7),e.\u0275\u0275text(10),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(11,"div",8)(12,"div",9)(13,"span",10),e.\u0275\u0275text(14,"\u{1F170}\uFE0F Angular Cha"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(15,"div",11)(16,"label",12),e.\u0275\u0275text(17,"H\u1ECD & T\xEAn:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(18,"input",13),e.\u0275\u0275twoWayListener("ngModelChange",function(o){return e.\u0275\u0275twoWayBindingSet(i.data.name,o)||(i.data.name=o),o}),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(19,"div",14),e.\u0275\u0275element(20,"span",15),e.\u0275\u0275elementStart(21,"span",16),e.\u0275\u0275text(22,"Client IP:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(23,"span",17),e.\u0275\u0275text(24),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(25,"div",18)(26,"template-editor",19),e.\u0275\u0275twoWayListener("templateChange",function(o){return e.\u0275\u0275twoWayBindingSet(i.template,o)||(i.template=o),o})("scriptChange",function(o){return e.\u0275\u0275twoWayBindingSet(i.script,o)||(i.script=o),o})("dataChange",function(o){return e.\u0275\u0275twoWayBindingSet(i.data,o)||(i.data=o),o})("editModeChange",function(o){return e.\u0275\u0275twoWayBindingSet(i.editMode,o)||(i.editMode=o),o}),e.\u0275\u0275elementEnd()()),n&2&&(e.\u0275\u0275advance(2),e.\u0275\u0275classProp("active",i.editMode),e.\u0275\u0275property("title",i.editMode?"Nh\u1EA5n \u0111\u1EC3 chuy\u1EC3n sang ch\u1EBF \u0111\u1ED9 Ch\u1EC9 xem":"Nh\u1EA5n \u0111\u1EC3 chuy\u1EC3n sang ch\u1EBF \u0111\u1ED9 Ch\u1EC9nh s\u1EEDa"),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(i.editMode?"\u{1F512}":"\u270F\uFE0F"),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(i.editMode?"Kh\xF3a thi\u1EBFt k\u1EBF":"B\u1EADt thi\u1EBFt k\u1EBF"),e.\u0275\u0275advance(),e.\u0275\u0275classProp("editing",i.editMode),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(i.editMode?"Thi\u1EBFt k\u1EBF m\u1EABu bi\u1EC3u (Edit)":"Xem tr\u01B0\u1EDBc & \u0110i\u1EC1n d\u1EEF li\u1EC7u"),e.\u0275\u0275advance(8),e.\u0275\u0275twoWayProperty("ngModel",i.data.name),e.\u0275\u0275advance(),e.\u0275\u0275classProp("loaded",i.data.ip),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(i.data.ip||"\u0110ang t\u1EA3i IP..."),e.\u0275\u0275advance(2),e.\u0275\u0275twoWayProperty("template",i.template)("script",i.script)("data",i.data)("editMode",i.editMode))},dependencies:[O,c.DefaultValueAccessor,c.NgControlStatus,c.NgModel,b],styles:[".shell-control-panel[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:10px 20px;background:#fff;border-bottom:1px solid #e2e8f0;box-shadow:0 2px 4px #00000005,0 1px 2px #0000000a;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif}.panel-left[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px}.mode-toggle-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:8px;padding:7px 16px;font-size:13.5px;font-weight:600;border-radius:8px;border:1px solid #e2e8f0;background:#f8fafc;color:#334155;cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1);box-shadow:0 1px 2px #0000000d}.mode-toggle-btn[_ngcontent-%COMP%]:hover{background:#f1f5f9;border-color:#cbd5e1;color:#0f172a;transform:translateY(-1px)}.mode-toggle-btn[_ngcontent-%COMP%]:active{transform:translateY(0)}.mode-toggle-btn.active[_ngcontent-%COMP%]{background:linear-gradient(135deg,#2563eb,#1d4ed8);border-color:#1d4ed8;color:#fff;box-shadow:0 2px 6px #2563eb59}.mode-toggle-btn.active[_ngcontent-%COMP%]:hover{background:linear-gradient(135deg,#1d4ed8,#1e40af)}.mode-toggle-btn[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]{font-size:14px}.status-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:7px;padding:5px 12px;border-radius:20px;font-size:12.5px;font-weight:500;background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0;transition:all .2s ease}.status-badge[_ngcontent-%COMP%]   .status-dot[_ngcontent-%COMP%]{width:8px;height:8px;border-radius:50%;background:#94a3b8;transition:all .2s ease}.status-badge.editing[_ngcontent-%COMP%]{background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe}.status-badge.editing[_ngcontent-%COMP%]   .status-dot[_ngcontent-%COMP%]{background:#2563eb;box-shadow:0 0 0 3px #2563eb33}.panel-right[_ngcontent-%COMP%]{display:flex;align-items:center;gap:16px;flex-wrap:wrap}.angular-input-group[_ngcontent-%COMP%]{display:flex;align-items:center;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:3px 6px 3px 10px;transition:all .2s ease}.angular-input-group[_ngcontent-%COMP%]:focus-within{background:#fff;border-color:#3b82f6;box-shadow:0 0 0 3px #3b82f626}.angular-input-group[_ngcontent-%COMP%]   .input-tag[_ngcontent-%COMP%]{font-size:11.5px;font-weight:700;color:#dc2626;background:#fee2e2;padding:3px 8px;border-radius:5px;margin-right:10px;letter-spacing:.3px}.angular-input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px}.angular-input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:12.5px;font-weight:600;color:#475569;white-space:nowrap}.angular-input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .form-control-shell[_ngcontent-%COMP%]{border:none;background:transparent;outline:none;font-size:13.5px;font-weight:500;color:#0f172a;padding:4px 6px;width:170px}.angular-input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .form-control-shell[_ngcontent-%COMP%]::placeholder{color:#94a3b8;font-weight:400}.ip-info-pill[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:20px;font-size:12.5px;color:#166534;transition:all .2s ease}.ip-info-pill[_ngcontent-%COMP%]   .ip-dot[_ngcontent-%COMP%]{width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 2px #22c55e40}.ip-info-pill[_ngcontent-%COMP%]   .ip-label[_ngcontent-%COMP%]{font-weight:600;color:#15803d}.ip-info-pill[_ngcontent-%COMP%]   .ip-value[_ngcontent-%COMP%]{font-weight:600;color:#0f172a;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px}.editor-wrapper[_ngcontent-%COMP%]{width:100%}"]})};import*as u from"@angular/core";function y(r,a={}){class n{vueApp;vm;ngOnInit(){this.vueApp=r("#vueContainer"),this.vm=this.vueApp.mount("#vueContainer"),Object.entries(a).forEach(([d,o])=>{this.vm[d]=o})}ngOnDestroy(){this.vueApp?.unmount()}static \u0275fac=function(o){return new(o||n)};static \u0275cmp=u.\u0275\u0275defineComponent({type:n,selectors:[["ng-component"]],decls:1,vars:0,consts:[["id","vueContainer"]],template:function(o,I){o&1&&u.\u0275\u0275element(0,"div",0)},encapsulation:2})}return n}var M=[{path:"",component:m},{path:"vue-page",loadComponent:()=>s({remoteEntry:g,exposedModule:"./component-factory"}).then(r=>y(r.createApp))},{path:"first",loadComponent:()=>s("firstMf","./Component").then(r=>r.App)},{path:"**",component:m}];var _={providers:[E(),D({eventCoalescing:!0}),T(M)]};import{RouterLink as A,RouterModule as S}from"@angular/router";import*as t from"@angular/core";import*as x from"@angular/router";var w=()=>({exact:!0}),v=class r{menuOpen=!1;toggleMenu(){this.menuOpen=!this.menuOpen}static \u0275fac=function(n){return new(n||r)};static \u0275cmp=t.\u0275\u0275defineComponent({type:r,selectors:[["app-shell-root"]],decls:19,vars:6,consts:[[1,"navbar"],[1,"container"],[1,"logo"],[1,"nav-links"],["routerLink","/","routerLinkActive","active",1,"nav-link",3,"routerLinkActiveOptions"],["routerLink","/vue-page","routerLinkActive","active",1,"nav-link",3,"routerLinkActiveOptions"],["routerLink","/first","routerLinkActive","active",1,"nav-link"],[1,"hamburger",3,"click"]],template:function(n,i){n&1&&(t.\u0275\u0275elementStart(0,"nav",0)(1,"div",1)(2,"h3",2),t.\u0275\u0275text(3,"Angular Microfrontends"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(4,"ul",3)(5,"li")(6,"a",4),t.\u0275\u0275text(7," Home "),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(8,"li")(9,"a",5),t.\u0275\u0275text(10," Vue page "),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(11,"li")(12,"a",6),t.\u0275\u0275text(13," First MF "),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275elementStart(14,"div",7),t.\u0275\u0275listener("click",function(){return i.toggleMenu()}),t.\u0275\u0275element(15,"span")(16,"span")(17,"span"),t.\u0275\u0275elementEnd()()(),t.\u0275\u0275element(18,"router-outlet")),n&2&&(t.\u0275\u0275advance(4),t.\u0275\u0275classProp("active",i.menuOpen),t.\u0275\u0275advance(2),t.\u0275\u0275property("routerLinkActiveOptions",t.\u0275\u0275pureFunction0(4,w)),t.\u0275\u0275advance(3),t.\u0275\u0275property("routerLinkActiveOptions",t.\u0275\u0275pureFunction0(5,w)))},dependencies:[A,S,x.RouterOutlet,x.RouterLinkActive],styles:['*[_ngcontent-%COMP%]{margin:0;padding:0;box-sizing:border-box}body[_ngcontent-%COMP%]{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;background-color:#0f172a;color:#334155}.navbar[_ngcontent-%COMP%]{width:100%;background:#0f172a;color:#fff;padding:.65rem 1.5rem;position:sticky;top:0;z-index:1000;border-bottom:1px solid rgba(255,255,255,.08);box-shadow:0 4px 12px #00000026}.navbar[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;max-width:100%}.logo[_ngcontent-%COMP%]{font-size:1.15rem;font-weight:700;color:#f8fafc;letter-spacing:-.2px;display:flex;align-items:center;gap:8px}.logo[_ngcontent-%COMP%]:before{content:"";display:inline-block;width:10px;height:10px;background:#38bdf8;border-radius:50%;box-shadow:0 0 10px #38bdf8}.nav-links[_ngcontent-%COMP%]{list-style:none;display:flex;align-items:center;gap:.5rem}.nav-link[_ngcontent-%COMP%]{text-decoration:none;color:#94a3b8;font-size:.875rem;font-weight:500;padding:6px 14px;border-radius:6px;transition:all .2s cubic-bezier(.4,0,.2,1)}.nav-link[_ngcontent-%COMP%]:hover{color:#f8fafc;background:#ffffff0f}.nav-link.active[_ngcontent-%COMP%]{color:#38bdf8;background:#38bdf81f;font-weight:600}.hamburger[_ngcontent-%COMP%]{display:none;flex-direction:column;cursor:pointer;gap:5px}.hamburger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{height:2px;width:22px;background-color:#cbd5e1;border-radius:2px}@media (max-width: 768px){.hamburger[_ngcontent-%COMP%]{display:flex}.nav-links[_ngcontent-%COMP%]{display:none;position:absolute;top:100%;left:0;width:100%;background-color:#0f172a;flex-direction:column;padding:1rem;gap:.5rem;border-bottom:1px solid rgba(255,255,255,.08)}.nav-links.active[_ngcontent-%COMP%]{display:flex}}']})};z(v,_).catch(r=>console.error(r));
