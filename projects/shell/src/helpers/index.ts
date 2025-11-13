import { Component, OnInit, OnDestroy } from '@angular/core';

// A helper function to create an Angular component that wraps a Vue component
export function createVueWrapperComponent(createVueInstance: Function, props: any = {}) {
  @Component({
    template: '<div id="vueContainer"></div>'
  })
  class VueWrapperComponent implements OnInit, OnDestroy {
    private vueApp: any;
    private vm: any;

    ngOnInit() {
      this.vueApp = createVueInstance('#vueContainer');
      this.vm = this.vueApp.mount('#vueContainer');
      Object.entries(props).forEach(([key, value]) => {
        this.vm[key] = value;
      });
    }

    ngOnDestroy() {
      this.vueApp?.unmount();
    }
  }
  return VueWrapperComponent;
}
