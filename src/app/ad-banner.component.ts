import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem } from './ad-item';
import { AdComponent } from './ad.component';
import { IdComponent } from './id/id.component';


@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.html',
  // template: `
  //   <div class="ad-banner-example">
  //     <h3>Advertisements</h3>
  //     <ng-template adHost></ng-template>
  //   </div>
  // `
})
export class AdBannerComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() ads: AdItem[] = [];

  currentAdIndex = -1;

  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;
  // interval: number|undefined;
  interval: NodeJS.Timer|undefined;

  data = {
    $implicit: 'Mark',
    birthPlace: 'Canada'
  }

  @ViewChild('id', { read: ViewContainerRef }) view: ViewContainerRef | undefined;
  @ViewChild('id2', { read: ViewContainerRef }) view2: ViewContainerRef | undefined;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngAfterViewInit() {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(IdComponent);
    if (this.view != undefined) {
      let componentRef: ComponentRef<IdComponent> = this.view.createComponent(componentFactory);

      componentRef.instance.backgroundColor = 'blue';
      componentRef.instance.foregroundColor = 'white';
      componentRef.instance.fontWeight = 'bold';
    }
    this.instantiateWithoutFactory();

    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }

  instantiateWithoutFactory(): void {
    for (let idx = 0; idx < 10; idx++)
      this.view2?.createComponent(IdComponent);
    const componentRef = this.view2?.createComponent(IdComponent);
    if (componentRef == undefined)
      return;
    componentRef.instance.backgroundColor = 'pink';
    componentRef.instance.foregroundColor = 'black';
    componentRef.instance.fontWeight = 'normal';
  }
}
