import{a as p,b as s}from"./chunk-DRMXH472.js";import{bootstrapApplication as V}from"@angular/platform-browser";import{provideBrowserGlobalErrorListeners as S,provideZoneChangeDetection as H}from"@angular/core";import{provideRouter as z}from"@angular/router";import{EventEmitter as m}from"@angular/core";import*as l from"@angular/core";var u="./template-editor/assets/remoteEntry.js";import*as y from"@angular/core";var x=class o{module=null;_initVueModule(){return p(this,null,function*(){if(!this.module)try{this.module=yield s({remoteEntry:u,exposedModule:"./component-factory"})}catch(i){console.error("[VueLoader] Failed to load Vue remote module:",i),this.module=null}})}mountPreview(i,t){return p(this,null,function*(){yield this._initVueModule();try{if(!this.module?.mountPreview)throw new Error("Vue module does not export mountPreview.");return this.module.mountPreview(i,t)}catch(n){return console.error("[VueLoader] Failed to mount preview:",n),null}})}static \u0275fac=function(t){return new(t||o)};static \u0275prov=y.\u0275\u0275defineInjectable({token:o,factory:o.\u0275fac,providedIn:"root"})};var w=["container"],f=class o{constructor(i){this.vueLoader=i}containerRef;previewInstance=null;template="";templateChange=new m;script="";scriptChange=new m;context={};contextChange=new m;editMode=!0;editModeChange=new m;scriptError=new m;ngOnInit(){return p(this,null,function*(){let i=this.containerRef?.nativeElement||"#template-editor";this.previewInstance=yield this.vueLoader.mountPreview(i,{template:this.template,script:this.script,context:this.context,editMode:this.editMode,onTemplateChange:t=>{this.template=t,this.templateChange.emit(t)},onScriptChange:t=>{this.script=t,this.scriptChange.emit(t)},onContextChange:t=>{this.context=t,this.contextChange.emit(t)},onEditModeChange:t=>{this.editMode=t,this.editModeChange.emit(t)},onScriptError:t=>{this.scriptError.emit(t)}}),this.previewInstance||console.error("[TemplateEditor] Failed to load & mount Vue Preview component.")})}ngOnChanges(i){if(!this.previewInstance)return;let t={};i.template&&(t.template=this.template),i.script&&(t.script=this.script),i.context&&(t.context=this.context),i.editMode&&(t.editMode=this.editMode),Object.keys(t).length>0&&this.previewInstance.updateProps(t)}ngOnDestroy(){this.previewInstance?.unmount(),this.previewInstance=null}static \u0275fac=function(t){return new(t||o)(l.\u0275\u0275directiveInject(x))};static \u0275cmp=l.\u0275\u0275defineComponent({type:o,selectors:[["template-editor"]],viewQuery:function(t,n){if(t&1&&l.\u0275\u0275viewQuery(w,7),t&2){let d;l.\u0275\u0275queryRefresh(d=l.\u0275\u0275loadQuery())&&(n.containerRef=d.first)}},inputs:{template:"template",script:"script",context:"context",editMode:"editMode"},outputs:{templateChange:"templateChange",scriptChange:"scriptChange",contextChange:"contextChange",editModeChange:"editModeChange",scriptError:"scriptError"},features:[l.\u0275\u0275NgOnChangesFeature],decls:2,vars:0,consts:[["container",""],["id","template-editor"]],template:function(t,n){t&1&&l.\u0275\u0275element(0,"div",1,0)},encapsulation:2})};import{FormsModule as P}from"@angular/forms";import{CommonModule as O}from"@angular/common";import*as e from"@angular/core";import*as c from"@angular/forms";var D=(o,i)=>i.id;function I(o,i){if(o&1){let t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"button",16),e.\u0275\u0275listener("click",function(){let d=e.\u0275\u0275restoreView(t).$index,r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.selectTemplate(d))}),e.\u0275\u0275elementStart(1,"span",17),e.\u0275\u0275text(2),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"span",18),e.\u0275\u0275text(4),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"span",19),e.\u0275\u0275text(6),e.\u0275\u0275elementEnd()()}if(o&2){let t=i.$implicit,n=i.$index,d=e.\u0275\u0275nextContext();e.\u0275\u0275classProp("active",d.selectedTemplateIndex===n),e.\u0275\u0275property("title",t.name+" ("+t.badge+"): "+t.description),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(t.icon),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(t.name),e.\u0275\u0275advance(),e.\u0275\u0275classProp("badge-a5",t.badge==="A5"),e.\u0275\u0275advance(),e.\u0275\u0275textInterpolate(t.badge)}}function N(o,i){if(o&1){let t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",12)(1,"span",20),e.\u0275\u0275text(2,"\u{1F170}\uFE0F Cha"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"div",21)(4,"label",22),e.\u0275\u0275text(5,"T\xEAn:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(6,"input",23),e.\u0275\u0275twoWayListener("ngModelChange",function(d){e.\u0275\u0275restoreView(t);let r=e.\u0275\u0275nextContext();return e.\u0275\u0275twoWayBindingSet(r.context.data.name,d)||(r.context.data.name=d),e.\u0275\u0275resetView(d)}),e.\u0275\u0275elementEnd()()()}if(o&2){let t=e.\u0275\u0275nextContext();e.\u0275\u0275advance(6),e.\u0275\u0275twoWayProperty("ngModel",t.context.data.name)}}function E(o,i){if(o&1&&(e.\u0275\u0275elementStart(0,"div",13),e.\u0275\u0275element(1,"span",24),e.\u0275\u0275elementStart(2,"span",25),e.\u0275\u0275text(3,"IP:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"span",26),e.\u0275\u0275text(5),e.\u0275\u0275elementEnd()()),o&2){let t=e.\u0275\u0275nextContext();e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(t.context.data.ip)}}var g=class o{templates=[{id:"demo-components",name:"Demo T\u1ED5ng h\u1EE3p",badge:"A4",icon:"\u{1F4CB}",description:"Tr\xECnh di\u1EC5n \u0111\u1EA7y \u0111\u1EE7 c\xE1c component: PageA4, Textarea, OTP, Select, DatePicker, Checkbox, Paint, ContextMenu v\xE0 Async Top-level Await",template:`<PageA4 style="padding:3mm 15mm" c-name="PageA4" c-id="u30lyv7">
  <div style="margin-top: 15px; padding: 10px 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px;" c-name="div" c-id="ip_box_1">
    <b style="color: #1e40af;" c-name="b" c-id="ip_title_1">\u{1F310} \u0110\u1ECBa ch\u1EC9 IP (L\u1EA5y t\u1EEB API qua top-level await):</b>
    <span style="color: #2563eb; font-weight: bold; margin-left: 8px; font-size: 15px;" c-name="span" c-id="ip_val_1">{{ data.ip || '\u0110ang t\u1EA3i IP...' }}</span>
  </div>
  <div c-name="div" c-id="5wz82b0">
    <b c-name="b" c-id="z7ton81">Textarea</b>
  </div>
  <Textarea v-model="data.name" label="H\u1ECD v\xE0 t\xEAn:" line :suffix="{ length:1, char:'\u2764\uFE0F' }" c-name="Textarea"
    c-id="oqtwc4d" path="data.name" path-suffix="{ length:1, char:'\u2764\uFE0F' }" />
  <div style="color: #0284c7; font-size: 13px; margin-top: 2px;" c-name="div" c-id="un_disp">
    T\xEAn in hoa (Computed t\u1EEB Script): <b c-name="b" c-id="un_val">{{ uppername }}</b>
  </div>
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
  <DatePicker v-model="data.birthday" placeholder="Ch\u1ECDn ng\xE0y sinh" format="DD/MM/YYYY" c-name="DatePicker"
    c-id="y366dko" path="data.birthday" />
  <div style="color:#0066cc" c-name="div" c-id="8zkactw">Ng\xE0y sinh \u0111\xE3 ch\u1ECDn: <b c-name="b" c-id="5joniyw">{{ data.birthday }}</b></div>
  <div c-name="div" c-id="aknsmdv">
    <b c-name="b" c-id="ognk3qp">DatePicker - \u0110\u1ECBnh d\u1EA1ng ch\u1EEF</b>
  </div>
  <DatePicker v-model="data.birthdayText" placeholder="DD th\xE1ng MM n\u0103m YYYY" format="DD [th\xE1ng] MM [n\u0103m] YYYY"
    c-name="DatePicker" c-id="4cp28lw" path="data.birthdayText" />
  <div style="color:#0066cc" c-name="div" c-id="mgbravx">Gi\xE1 tr\u1ECB: <b c-name="b" c-id="btvfoao">{{ data.birthdayText }}</b></div>
  <div c-name="div" c-id="sbxot28">
    <b c-name="b" c-id="ilxg1be">DatePicker (datetime) - Gi\u1EDD h\u1EB9n</b>
  </div>
  <DatePicker v-model="data.appointment" mode="datetime" placeholder="Ch\u1ECDn ng\xE0y gi\u1EDD" format="HH:mm DD/MM/YYYY"
    :minute-step="15" c-name="DatePicker" c-id="e6dqk7f" path="data.appointment" path-minute-step="15" />
  <div style="color:#0066cc" c-name="div" c-id="q74v2xs">Ng\xE0y gi\u1EDD \u0111\xE3 ch\u1ECDn: <b c-name="b" c-id="55xc88a">{{ data.appointment }}</b></div>
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
  <div style="color:#0066cc" c-name="div" c-id="okpshd8">Gi\xE1 tr\u1ECB: <b c-name="b" c-id="korldbv">{{ data.sizeTest }}</b></div>
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
      <Checkbox v-model="data.historyHypertension" afterText="T\u0103ng huy\u1EBFt \xE1p" size="sm" />
      <Checkbox v-model="data.historyDiabetes" afterText="\u0110\xE1i th\xE1o \u0111\u01B0\u1EDDng" size="sm" />
      <Checkbox v-model="data.historyAsthma" afterText="Hen ph\u1EBF qu\u1EA3n / COPD" size="sm" />
      <Checkbox v-model="data.historyHeart" afterText="B\u1EC7nh m\u1EA1ch v\xE0nh" size="sm" />
      <Checkbox v-model="data.historyKidney" afterText="B\u1EC7nh l\xFD Gan / Th\u1EADn" size="sm" />
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
};`,context:{data:{recordNo:"849201",name:"Tr\u1EA7n Th\u1ECB Mai",birthday:"20/11/1992",gender:"N\u1EEF",age:"34",identityCard:"001192008492",phone:"0987 654 321",examDate:"08:15 28/08/2026",job:"K\u1EBF to\xE1n tr\u01B0\u1EDFng",workplace:"C\xF4ng ty C\u1ED5 ph\u1EA7n C\xF4ng ngh\u1EC7 ABC",address:"S\u1ED1 45 L\xEA Du\u1EA9n, Ph\u01B0\u1EDDng B\u1EBFn Ngh\xE9, Qu\u1EADn 1, TP. H\u1ED3 Ch\xED Minh",emergencyContact:"Nguy\u1EC5n V\u0103n H\xF9ng (Ch\u1ED3ng)",emergencyPhone:"0903 123 456",reason:"\u0110au t\u1EE9c ng\u1EF1c tr\xE1i t\u1EEBng c\u01A1n k\xE8m c\u1EA3m gi\xE1c kh\xF3 th\u1EDF nh\u1EB9 khi g\u1EAFng s\u1EE9c, h\u1ED3i h\u1ED9p tr\u1ED1ng ng\u1EF1c xu\u1EA5t hi\u1EC7n 1 tu\u1EA7n nay.",clinicalProcess:"B\u1EC7nh nh\xE2n c\xF3 tri\u1EC7u ch\u1EE9ng n\u1EB7ng ng\u1EF1c sau x\u01B0\u01A1ng \u1EE9c xu\u1EA5t hi\u1EC7n c\xE1ch \u0111\xE2y 7 ng\xE0y, c\u01A1n k\xE9o d\xE0i kho\u1EA3ng 10-15 ph\xFAt, lan l\xEAn vai tr\xE1i, t\u0103ng l\xEAn khi leo c\u1EA7u thang ho\u1EB7c c\u0103ng th\u1EB3ng, gi\u1EA3m b\u1EDBt khi ngh\u1EC9 ng\u01A1i. Ch\u01B0a d\xF9ng thu\u1ED1c \u0111\u1EB7c hi\u1EC7u \u1EDF nh\xE0.",historyHypertension:!0,historyDiabetes:!1,historyAsthma:!1,historyHeart:!0,historyKidney:!1,historyAllergyDetail:"D\u1ECB \u1EE9ng v\u1EDBi thu\u1ED1c nh\xF3m Sulfamide v\xE0 Penicillin (n\u1ED5i m\u1EC1 \u0111ay, ng\u1EE9a).",familyHistory:"B\u1ED1 c\xF3 ti\u1EC1n s\u1EED nh\u1ED3i m\xE1u c\u01A1 tim \u1EDF tu\u1ED5i 58, m\u1EB9 t\u0103ng huy\u1EBFt \xE1p.",height:"162",weight:"54",bloodPressure:"130/85",pulse:"78",temperature:"36.8",spo2:"98",generalExam:"B\u1EC7nh nh\xE2n t\u1EC9nh t\xE1o, ti\u1EBFp x\xFAc t\u1ED1t. Da ni\xEAm m\u1EA1c h\u1ED3ng h\xE0o, kh\xF4ng ph\xF9, kh\xF4ng xu\u1EA5t huy\u1EBFt d\u01B0\u1EDBi da. Tuy\u1EBFn gi\xE1p kh\xF4ng to, h\u1EA1ch ngo\u1EA1i vi kh\xF4ng s\u1EDD th\u1EA5y.",cardioExam:"Tim \u0111\u1EC1u, nh\u1ECBp xoang r\xF5, T1 T2 nghe r\xF5 kh\xF4ng c\xF3 ti\u1EBFng th\u1ED5i b\u1EC7nh l\xFD. M\u1ECFm tim \u0111\u1EADp \u1EDF khoang li\xEAn s\u01B0\u1EDDn V \u0111\u01B0\u1EDDng trung \u0111\xF2n tr\xE1i.",respiratoryExam:"L\u1ED3ng ng\u1EF1c c\xE2n \u0111\u1ED1i, di \u0111\u1ED9ng \u0111\u1EC1u theo nh\u1ECBp th\u1EDF. R\xEC r\xE0o ph\u1EBF nang \xEAm d\u1ECBu hai b\xEAn ph\u1EBF tr\u01B0\u1EDDng, kh\xF4ng nghe th\u1EA5y rale r\xEDt hay rale \u1EA9m.",digestiveExam:"B\u1EE5ng m\u1EC1m, kh\xF4ng ch\u01B0\u1EDBng, gan l\xE1ch kh\xF4ng to, \u1EA5n c\xE1c \u0111i\u1EC3m \u0111au ngo\u1EA1i khoa kh\xF4ng c\xF3 ph\u1EA3n \u1EE9ng.",otherOrganExam:"Th\u1EA7n kinh kh\xF4ng c\xF3 d\u1EA5u hi\u1EC7u khu tr\xFA. V\u1EADn \u0111\u1ED9ng c\xE1c kh\u1EDBp b\xECnh th\u01B0\u1EDDng.",labSummary:"\u0110i\u1EC7n t\xE2m \u0111\u1ED3 (ECG 12 C\u0110): Nh\u1ECBp xoang 78ck/p, s\xF3ng ST ch\xEAnh xu\u1ED1ng nh\u1EB9 0.5mm \u1EDF V5-V6. Si\xEAu \xE2m tim: Ch\u1EE9c n\u0103ng t\xE2m thu th\u1EA5t tr\xE1i t\u1ED1t (EF=64%), kh\xF4ng th\u1EA5y r\u1ED1i lo\u1EA1n v\u1EADn \u0111\u1ED9ng v\xF9ng.",additionalTests:"1. \u0110\u1ECBnh l\u01B0\u1EE3ng men tim Troponin T si\xEAu nh\u1EA1y\\n2. X\xE9t nghi\u1EC7m b\u1ED9 m\u1EE1 m\xE1u (Lipid panel: Cholesterol to\xE0n ph\u1EA7n, Triglyceride, HDL-C, LDL-C)\\n3. Si\xEAu \xE2m Doppler m\u1EA1ch v\xE0nh",diagnosis:"C\u01A1n \u0111au th\u1EAFt ng\u1EF1c \u1ED5n \u0111\u1ECBnh (CCS II) / T\u0103ng huy\u1EBFt \xE1p \u0111\u1ED9 1 - I20.9",department:"cardiology",diffDiagnosis:"R\u1ED1i lo\u1EA1n th\u1EA7n kinh tim / Vi\xEAm c\u01A1 tim nh\u1EB9",comorbidity:"R\u1ED1i lo\u1EA1n lipid m\xE1u nh\u1EB9",treatmentPlan:"1. Aspirin 81mg: 1 vi\xEAn/ng\xE0y u\u1ED1ng sau \u0103n s\xE1ng\\n2. Bisoprolol 2.5mg: 1 vi\xEAn/ng\xE0y u\u1ED1ng bu\u1ED5i s\xE1ng\\n3. Atorvastatin 20mg: 1 vi\xEAn/ng\xE0y u\u1ED1ng tr\u01B0\u1EDBc khi \u0111i ng\u1EE7",doctorAdvice:"Ngh\u1EC9 ng\u01A1i h\u1EE3p l\xFD, tr\xE1nh th\u1EE9c khuya v\xE0 lo \xE2u. Ch\u1EBF \u0111\u1ED9 \u0103n gi\u1EA3m mu\u1ED1i, h\u1EA1n ch\u1EBF m\u1EE1 \u0111\u1ED9ng v\u1EADt. \u0110\u1EBFn vi\u1EC7n ngay n\u1EBFu c\u01A1n \u0111au ng\u1EF1c k\xE9o d\xE0i tr\xEAn 20 ph\xFAt kh\xF4ng gi\u1EA3m.",revisitDate:"11/09/2026",revisitNotes:"Mang theo k\u1EBFt qu\u1EA3 x\xE9t nghi\u1EC7m m\xE1u v\xE0 phi\u1EBFu \u0111i\u1EC7n tim khi \u0111i t\xE1i kh\xE1m.",doctorName:"BS. CKI Tr\u1EA7n V\u0103n H\xF9ng",patientSignature:"",doctorSignature:""}}},{id:"prescription-a5",name:"\u0110\u01A1n thu\u1ED1c",badge:"A5",icon:"\u{1F48A}",description:"M\u1EABu \u0111\u01A1n thu\u1ED1c \u0111i\u1EC7n t\u1EED kh\u1ED5 A5: Th\xF4ng tin b\u1EC7nh nh\xE2n, danh m\u1EE5c thu\u1ED1c \u0111i\u1EC1u tr\u1ECB, t\u1EF1 \u0111\u1ED9ng \u0111\u1EBFm t\u1ED5ng s\u1ED1 lo\u1EA1i thu\u1ED1c, h\u01B0\u1EDBng d\u1EABn s\u1EED d\u1EE5ng v\xE0 ch\u1EEF k\xFD \u0111i\u1EC7n t\u1EED b\xE1c s\u0129",template:`<PageA5 style="padding: 6mm 10mm; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b;" c-name="PageA5" c-id="rx_p01">
  <!-- Header -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid #059669; padding-bottom: 6px; margin-bottom: 8px;" c-name="div" c-id="rx_h01">
    <div c-name="div" c-id="rx_h02">
      <div style="font-weight: 700; font-size: 11px; text-transform: uppercase; color: #047857;" c-name="div" c-id="rx_h03">PH\xD2NG KH\xC1M \u0110A KHOA MEDIC</div>
      <div style="font-size: 9.5px; color: #64748b;" c-name="div" c-id="rx_h04">\u0110/c: 108 Tr\u1EA7n H\u01B0ng \u0110\u1EA1o, Q. Ho\xE0n Ki\u1EBFm, HN</div>
      <div style="font-size: 9.5px; color: #64748b;" c-name="div" c-id="rx_h05">S\u0110T: 024.3984.6688</div>
    </div>
    <div style="text-align: right;" c-name="div" c-id="rx_h06">
      <div style="font-size: 10px; font-weight: 600; color: #047857;" c-name="div" c-id="rx_h07">M\xC3 \u0110\u01A0N:</div>
      <span style="font-family: monospace; font-size: 12px; font-weight: bold; background: #ecfdf5; padding: 2px 6px; border-radius: 4px; border: 1px solid #a7f3d0;" c-name="span" c-id="rx_code">{{ data.prescriptionCode || 'RX-2026-01' }}</span>
    </div>
  </div>

  <!-- Title -->
  <div style="text-align: center; margin-bottom: 8px;" c-name="div" c-id="rx_t01">
    <h3 style="margin: 0; font-size: 16px; font-weight: 800; text-transform: uppercase; color: #065f46; letter-spacing: 0.5px;" c-name="h3" c-id="rx_t02">\u0110\u01A0N THU\u1ED0C \u0110I\u1EC6N T\u1EEC</h3>
  </div>

  <!-- Patient Details -->
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 10px; margin-bottom: 8px;" c-name="div" c-id="rx_pat_0">
    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 6px;" c-name="div" c-id="rx_pat_1">
      <Textarea v-model="data.name" label="H\u1ECD t\xEAn:" line c-name="Textarea" c-id="rx_n" path="data.name" />
      <Textarea v-model="data.age" label="Tu\u1ED5i:" line c-name="Textarea" c-id="rx_ag" path="data.age" />
      <Textarea v-model="data.gender" label="Gi\u1EDBi t\xEDnh:" line c-name="Textarea" c-id="rx_ge" path="data.gender" />
    </div>
    <div style="margin-top: 4px;" c-name="div" c-id="rx_pat_2">
      <Textarea v-model="data.address" label="\u0110\u1ECBa ch\u1EC9:" line c-name="Textarea" c-id="rx_ad" path="data.address" />
    </div>
    <div style="margin-top: 4px;" c-name="div" c-id="rx_pat_3">
      <Textarea v-model="data.diagnosis" label="Ch\u1EA9n \u0111o\xE1n:" line c-name="Textarea" c-id="rx_dx" path="data.diagnosis" />
    </div>
  </div>

  <!-- Medicines Table -->
  <div style="margin-bottom: 8px;" c-name="div" c-id="rx_med_0">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;" c-name="div" c-id="rx_med_h">
      <b style="font-size: 12px; color: #047857;" c-name="b" c-id="rx_med_t">\u{1F48A} THU\u1ED0C \u0110I\u1EC0U TR\u1ECA:</b>
      <span style="font-size: 11px; color: #64748b;" c-name="span" c-id="rx_med_c">T\u1ED5ng s\u1ED1: <b style="color: #047857;" c-name="b" c-id="rx_t_c">{{ totalMedicines }} lo\u1EA1i</b></span>
    </div>
    
    <div v-for="(med, idx) in (data.medicines || [])" :key="idx" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 8px; margin-bottom: 5px;" c-name="div" c-id="rx_item">
      <div style="display: flex; justify-content: space-between; font-size: 11.5px; font-weight: 600; color: #0f172a;" c-name="div" c-id="rx_item_1">
        <span c-name="span" c-id="rx_med_name">{{ idx + 1 }}. {{ med.name }}</span>
        <span style="color: #047857;" c-name="span" c-id="rx_med_qty">SL: {{ med.quantity }} {{ med.unit }}</span>
      </div>
      <div style="font-size: 10.5px; color: #475569; font-style: italic; margin-top: 2px;" c-name="div" c-id="rx_item_2">
        \u{1F449} {{ med.usage }}
      </div>
    </div>
  </div>

  <!-- Advice & Followup -->
  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 6px 10px; margin-bottom: 8px; font-size: 11.5px;" c-name="div" c-id="rx_adv_0">
    <Textarea v-model="data.doctorAdvice" label="L\u1EDDi d\u1EB7n:" line c-name="Textarea" c-id="rx_adv_txt" path="data.doctorAdvice" />
    <div style="margin-top: 4px;" c-name="div" c-id="rx_adv_1">
      <DatePicker v-model="data.revisitDate" label="Ng\xE0y t\xE1i kh\xE1m:" placeholder="DD/MM/YYYY" format="DD/MM/YYYY" c-name="DatePicker" c-id="rx_rev_d" path="data.revisitDate" />
    </div>
  </div>

  <!-- Signatures -->
  <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 10px;" c-name="div" c-id="rx_sig_0">
    <div style="font-size: 10px; color: #64748b; font-style: italic;" c-name="div" c-id="rx_sig_1">
      * Kh\xE1m l\u1EA1i xin mang theo \u0111\u01A1n thu\u1ED1c n\xE0y.<br/>
      * \u0110\u01A1n thu\u1ED1c c\xF3 gi\xE1 tr\u1ECB mua trong v\xF2ng 05 ng\xE0y.
    </div>
    <div style="text-align: center; width: 180px;" c-name="div" c-id="rx_sig_2">
      <div style="font-size: 10px; font-style: italic; color: #475569;" c-name="div" c-id="rx_sig_3">Ng\xE0y 28 th\xE1ng 08 n\u0103m 2026</div>
      <div style="font-weight: bold; font-size: 11px; text-transform: uppercase; color: #047857; margin-top: 2px;" c-name="div" c-id="rx_sig_4">B\xC1C S\u0128 K\xCA \u0110\u01A0N</div>
      <div style="margin-top: 4px;" c-name="div" c-id="rx_sig_5">
        <Paint style="width: 170px; height: 75px; border: 1px dashed #cbd5e1; border-radius: 4px; background: #fff;" v-model="data.signature" c-name="Paint" c-id="rx_pnt" path="data.signature" />
      </div>
      <div style="font-weight: bold; font-size: 11px; color: #0f172a; margin-top: 2px;" c-name="div" c-id="rx_sig_6">{{ data.prescriber || 'BS. CKI Nguy\u1EC5n H\u1EA3i \u0110\u0103ng' }}</div>
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
};`,context:{data:{prescriptionCode:"RX-2026-9812",name:"L\xEA Ho\xE0ng Long",gender:"Nam",age:"38",birthday:"10/05/1988",phone:"0912 345 678",address:"Ph\xF2ng 502, T\xF2a Golden Palm, 21 L\xEA V\u0103n L\u01B0\u01A1ng, H\xE0 N\u1ED9i",diagnosis:"Vi\xEAm h\u1ECDng c\u1EA5p / Vi\xEAm m\u0169i d\u1ECB \u1EE9ng th\u1EDDi ti\u1EBFt",medicines:[{name:"Augmentin 1g (Amoxicillin/Clavulanate)",quantity:14,unit:"Vi\xEAn",usage:"U\u1ED1ng 1 vi\xEAn/l\u1EA7n x 2 l\u1EA7n/ng\xE0y sau khi \u0103n s\xE1ng, t\u1ED1i"},{name:"Paracetamol 500mg (H\u1EA1 s\u1ED1t, gi\u1EA3m \u0111au)",quantity:10,unit:"Vi\xEAn",usage:"U\u1ED1ng 1 vi\xEAn khi s\u1ED1t tr\xEAn 38.5\xB0C ho\u1EB7c \u0111au h\u1ECDng nhi\u1EC1u, c\xE1ch 4-6h"},{name:"Telfast 180mg (Fexofenadine)",quantity:7,unit:"Vi\xEAn",usage:"U\u1ED1ng 1 vi\xEAn/ng\xE0y v\xE0o bu\u1ED5i s\xE1ng sau \u0103n"},{name:"N\u01B0\u1EDBc mu\u1ED1i sinh l\xFD Natri Clorid 0.9%",quantity:2,unit:"Chai 500ml",usage:"S\xFAc h\u1ECDng mi\u1EC7ng 3-4 l\u1EA7n/ng\xE0y sau b\u1EEFa \u0103n"}],doctorAdvice:"U\u1ED1ng nhi\u1EC1u n\u01B0\u1EDBc \u1EA5m, s\xFAc mi\u1EC7ng n\u01B0\u1EDBc mu\u1ED1i th\u01B0\u1EDDng xuy\xEAn, gi\u1EEF \u1EA5m v\xF9ng c\u1ED5. T\xE1i kh\xE1m sau 5 ng\xE0y n\u1EBFu kh\xF4ng thuy\xEAn gi\u1EA3m.",revisitDate:"02/09/2026",prescriber:"BS. CKI Nguy\u1EC5n H\u1EA3i \u0110\u0103ng",signature:""}}}];selectedTemplateIndex=0;editMode=!0;get currentTemplateConfig(){return this.templates[this.selectedTemplateIndex]||this.templates[0]}get template(){return this.currentTemplateConfig.template}set template(i){this.currentTemplateConfig&&(this.currentTemplateConfig.template=i)}get script(){return this.currentTemplateConfig.script}set script(i){this.currentTemplateConfig&&(this.currentTemplateConfig.script=i)}get context(){return this.currentTemplateConfig.context}set context(i){this.currentTemplateConfig&&(this.currentTemplateConfig.context=i)}selectTemplate(i){i<0||i>=this.templates.length||(this.selectedTemplateIndex=i)}static \u0275fac=function(t){return new(t||o)};static \u0275cmp=e.\u0275\u0275defineComponent({type:o,selectors:[["app-shell-home"]],decls:20,vars:14,consts:[[1,"shell-control-panel"],[1,"panel-left"],[1,"mode-toggle-btn",3,"click","title"],[1,"btn-icon"],[1,"btn-text"],[1,"status-badge"],[1,"status-dot"],[1,"status-label"],[1,"panel-center"],[1,"template-tabs"],["type","button",1,"template-tab-btn",3,"active","title"],[1,"panel-right"],[1,"angular-input-group"],[1,"ip-info-pill","loaded"],[1,"editor-wrapper"],[3,"templateChange","scriptChange","contextChange","editModeChange","template","script","context","editMode"],["type","button",1,"template-tab-btn",3,"click","title"],[1,"tpl-icon"],[1,"tpl-name"],[1,"tpl-badge"],[1,"input-tag"],[1,"input-wrapper"],["for","angular-name-input"],["id","angular-name-input","placeholder","Nh\u1EADp h\u1ECD t\xEAn...",1,"form-control-shell",3,"ngModelChange","ngModel"],[1,"ip-dot"],[1,"ip-label"],[1,"ip-value"]],template:function(t,n){t&1&&(e.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"button",2),e.\u0275\u0275listener("click",function(){return n.editMode=!n.editMode}),e.\u0275\u0275elementStart(3,"span",3),e.\u0275\u0275text(4),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"span",4),e.\u0275\u0275text(6),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(7,"div",5),e.\u0275\u0275element(8,"span",6),e.\u0275\u0275elementStart(9,"span",7),e.\u0275\u0275text(10),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(11,"div",8)(12,"div",9),e.\u0275\u0275repeaterCreate(13,I,7,8,"button",10,D),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(15,"div",11),e.\u0275\u0275conditionalCreate(16,N,7,1,"div",12),e.\u0275\u0275conditionalCreate(17,E,6,1,"div",13),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(18,"div",14)(19,"template-editor",15),e.\u0275\u0275twoWayListener("templateChange",function(r){return e.\u0275\u0275twoWayBindingSet(n.template,r)||(n.template=r),r})("scriptChange",function(r){return e.\u0275\u0275twoWayBindingSet(n.script,r)||(n.script=r),r})("contextChange",function(r){return e.\u0275\u0275twoWayBindingSet(n.context,r)||(n.context=r),r})("editModeChange",function(r){return e.\u0275\u0275twoWayBindingSet(n.editMode,r)||(n.editMode=r),r}),e.\u0275\u0275elementEnd()()),t&2&&(e.\u0275\u0275advance(2),e.\u0275\u0275classProp("active",n.editMode),e.\u0275\u0275property("title",n.editMode?"Nh\u1EA5n \u0111\u1EC3 chuy\u1EC3n sang ch\u1EBF \u0111\u1ED9 Ch\u1EC9 xem & \u0110i\u1EC1n form":"Nh\u1EA5n \u0111\u1EC3 chuy\u1EC3n sang ch\u1EBF \u0111\u1ED9 Thi\u1EBFt k\u1EBF m\u1EABu bi\u1EC3u"),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(n.editMode?"\u{1F512}":"\u270F\uFE0F"),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(n.editMode?"Kh\xF3a":"Thi\u1EBFt k\u1EBF"),e.\u0275\u0275advance(),e.\u0275\u0275classProp("editing",n.editMode),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(n.editMode?"Edit":"Preview"),e.\u0275\u0275advance(3),e.\u0275\u0275repeater(n.templates),e.\u0275\u0275advance(3),e.\u0275\u0275conditional((n.context==null||n.context.data==null?null:n.context.data.name)!==void 0?16:-1),e.\u0275\u0275advance(),e.\u0275\u0275conditional(!(n.context==null||n.context.data==null)&&n.context.data.ip?17:-1),e.\u0275\u0275advance(2),e.\u0275\u0275twoWayProperty("template",n.template)("script",n.script)("context",n.context)("editMode",n.editMode))},dependencies:[P,c.DefaultValueAccessor,c.NgControlStatus,c.NgModel,O,f],styles:[".shell-control-panel[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:5px 12px;background:#fff;border-bottom:1px solid #e2e8f0;box-shadow:0 1px 2px #00000008;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.panel-left[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}.mode-toggle-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;font-size:12px;font-weight:600;border-radius:5px;border:1px solid #e2e8f0;background:#f8fafc;color:#334155;cursor:pointer;transition:all .15s ease}.mode-toggle-btn[_ngcontent-%COMP%]:hover{background:#f1f5f9;color:#0f172a}.mode-toggle-btn.active[_ngcontent-%COMP%]{background:#2563eb;border-color:#1d4ed8;color:#fff}.mode-toggle-btn[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%]{font-size:11.5px}.status-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:5px;padding:2.5px 7px;border-radius:12px;font-size:11px;font-weight:500;background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0}.status-badge[_ngcontent-%COMP%]   .status-dot[_ngcontent-%COMP%]{width:6px;height:6px;border-radius:50%;background:#94a3b8}.status-badge.editing[_ngcontent-%COMP%]{background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe}.status-badge.editing[_ngcontent-%COMP%]   .status-dot[_ngcontent-%COMP%]{background:#2563eb}.panel-center[_ngcontent-%COMP%]{display:flex;align-items:center;flex:1;justify-content:center}.template-tabs[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:2px;background:#f1f5f9;padding:2px;border-radius:6px;border:1px solid #e2e8f0}.template-tab-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;font-size:11.5px;font-weight:500;border:1px solid transparent;background:transparent;color:#475569;border-radius:4px;cursor:pointer;transition:all .12s ease;white-space:nowrap}.template-tab-btn[_ngcontent-%COMP%]   .tpl-icon[_ngcontent-%COMP%]{font-size:12px}.template-tab-btn[_ngcontent-%COMP%]   .tpl-name[_ngcontent-%COMP%]{letter-spacing:.1px}.template-tab-btn[_ngcontent-%COMP%]   .tpl-badge[_ngcontent-%COMP%]{font-size:9.5px;font-weight:700;padding:.5px 4px;border-radius:3px;background:#e2e8f0;color:#475569}.template-tab-btn[_ngcontent-%COMP%]   .tpl-badge.badge-a5[_ngcontent-%COMP%]{background:#dcfce7;color:#15803d}.template-tab-btn[_ngcontent-%COMP%]:hover{background:#fff;color:#0f172a}.template-tab-btn.active[_ngcontent-%COMP%]{background:#fff;color:#1d4ed8;font-weight:600;border-color:#cbd5e1;box-shadow:0 1px 2px #0000000d}.template-tab-btn.active[_ngcontent-%COMP%]   .tpl-badge[_ngcontent-%COMP%]{background:#dbeafe;color:#1d4ed8}.template-tab-btn.active[_ngcontent-%COMP%]   .tpl-badge.badge-a5[_ngcontent-%COMP%]{background:#dcfce7;color:#15803d}.panel-right[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.angular-input-group[_ngcontent-%COMP%]{display:flex;align-items:center;background:#f8fafc;border:1px solid #e2e8f0;border-radius:5px;padding:2px 6px}.angular-input-group[_ngcontent-%COMP%]:focus-within{border-color:#3b82f6;background:#fff}.angular-input-group[_ngcontent-%COMP%]   .input-tag[_ngcontent-%COMP%]{font-size:10px;font-weight:700;color:#dc2626;background:#fee2e2;padding:1px 4px;border-radius:3px;margin-right:4px}.angular-input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;gap:3px}.angular-input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:11px;font-weight:600;color:#475569}.angular-input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .form-control-shell[_ngcontent-%COMP%]{border:none;background:transparent;outline:none;font-size:12px;color:#0f172a;padding:1px 2px;width:110px}.ip-info-pill[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;padding:2px 7px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;font-size:11px;color:#166534}.ip-info-pill[_ngcontent-%COMP%]   .ip-dot[_ngcontent-%COMP%]{width:5px;height:5px;border-radius:50%;background:#22c55e}.ip-info-pill[_ngcontent-%COMP%]   .ip-label[_ngcontent-%COMP%]{font-weight:600}.ip-info-pill[_ngcontent-%COMP%]   .ip-value[_ngcontent-%COMP%]{font-family:monospace;font-size:10.5px;font-weight:600}.editor-wrapper[_ngcontent-%COMP%]{width:100%}"]})};import*as h from"@angular/core";function C(o,i={}){class t{vueApp;vm;ngOnInit(){this.vueApp=o("#vueContainer"),this.vm=this.vueApp.mount("#vueContainer"),Object.entries(i).forEach(([d,r])=>{this.vm[d]=r})}ngOnDestroy(){this.vueApp?.unmount()}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=h.\u0275\u0275defineComponent({type:t,selectors:[["ng-component"]],decls:1,vars:0,consts:[["id","vueContainer"]],template:function(r,Y){r&1&&h.\u0275\u0275element(0,"div",0)},encapsulation:2})}return t}var T=[{path:"",component:g},{path:"vue-page",loadComponent:()=>s({remoteEntry:u,exposedModule:"./component-factory"}).then(o=>C(o.createApp))},{path:"first",loadComponent:()=>s("firstMf","./Component").then(o=>o.App)},{path:"**",component:g}];var _={providers:[S(),H({eventCoalescing:!0}),z(T)]};import{RouterLink as A,RouterModule as L}from"@angular/router";import*as a from"@angular/core";import*as v from"@angular/router";var M=()=>({exact:!0}),b=class o{menuOpen=!1;toggleMenu(){this.menuOpen=!this.menuOpen}static \u0275fac=function(t){return new(t||o)};static \u0275cmp=a.\u0275\u0275defineComponent({type:o,selectors:[["app-shell-root"]],decls:19,vars:6,consts:[[1,"navbar"],[1,"container"],[1,"logo"],[1,"nav-links"],["routerLink","/","routerLinkActive","active",1,"nav-link",3,"routerLinkActiveOptions"],["routerLink","/vue-page","routerLinkActive","active",1,"nav-link",3,"routerLinkActiveOptions"],["routerLink","/first","routerLinkActive","active",1,"nav-link"],[1,"hamburger",3,"click"]],template:function(t,n){t&1&&(a.\u0275\u0275elementStart(0,"nav",0)(1,"div",1)(2,"h3",2),a.\u0275\u0275text(3,"Angular Microfrontends"),a.\u0275\u0275elementEnd(),a.\u0275\u0275elementStart(4,"ul",3)(5,"li")(6,"a",4),a.\u0275\u0275text(7," Home "),a.\u0275\u0275elementEnd()(),a.\u0275\u0275elementStart(8,"li")(9,"a",5),a.\u0275\u0275text(10," Vue page "),a.\u0275\u0275elementEnd()(),a.\u0275\u0275elementStart(11,"li")(12,"a",6),a.\u0275\u0275text(13," First MF "),a.\u0275\u0275elementEnd()()(),a.\u0275\u0275elementStart(14,"div",7),a.\u0275\u0275listener("click",function(){return n.toggleMenu()}),a.\u0275\u0275element(15,"span")(16,"span")(17,"span"),a.\u0275\u0275elementEnd()()(),a.\u0275\u0275element(18,"router-outlet")),t&2&&(a.\u0275\u0275advance(4),a.\u0275\u0275classProp("active",n.menuOpen),a.\u0275\u0275advance(2),a.\u0275\u0275property("routerLinkActiveOptions",a.\u0275\u0275pureFunction0(4,M)),a.\u0275\u0275advance(3),a.\u0275\u0275property("routerLinkActiveOptions",a.\u0275\u0275pureFunction0(5,M)))},dependencies:[A,L,v.RouterOutlet,v.RouterLinkActive],styles:['*[_ngcontent-%COMP%]{margin:0;padding:0;box-sizing:border-box}body[_ngcontent-%COMP%]{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;background-color:#0f172a;color:#334155}.navbar[_ngcontent-%COMP%]{width:100%;background:#0f172a;color:#fff;padding:.65rem 1.5rem;position:sticky;top:0;z-index:1000;border-bottom:1px solid rgba(255,255,255,.08);box-shadow:0 4px 12px #00000026}.navbar[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;max-width:100%}.logo[_ngcontent-%COMP%]{font-size:1.15rem;font-weight:700;color:#f8fafc;letter-spacing:-.2px;display:flex;align-items:center;gap:8px}.logo[_ngcontent-%COMP%]:before{content:"";display:inline-block;width:10px;height:10px;background:#38bdf8;border-radius:50%;box-shadow:0 0 10px #38bdf8}.nav-links[_ngcontent-%COMP%]{list-style:none;display:flex;align-items:center;gap:.5rem}.nav-link[_ngcontent-%COMP%]{text-decoration:none;color:#94a3b8;font-size:.875rem;font-weight:500;padding:6px 14px;border-radius:6px;transition:all .2s cubic-bezier(.4,0,.2,1)}.nav-link[_ngcontent-%COMP%]:hover{color:#f8fafc;background:#ffffff0f}.nav-link.active[_ngcontent-%COMP%]{color:#38bdf8;background:#38bdf81f;font-weight:600}.hamburger[_ngcontent-%COMP%]{display:none;flex-direction:column;cursor:pointer;gap:5px}.hamburger[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{height:2px;width:22px;background-color:#cbd5e1;border-radius:2px}@media (max-width: 768px){.hamburger[_ngcontent-%COMP%]{display:flex}.nav-links[_ngcontent-%COMP%]{display:none;position:absolute;top:100%;left:0;width:100%;background-color:#0f172a;flex-direction:column;padding:1rem;gap:.5rem;border-bottom:1px solid rgba(255,255,255,.08)}.nav-links.active[_ngcontent-%COMP%]{display:flex}}']})};V(b,_).catch(o=>console.error(o));
