import { AfterViewInit, Component, ElementRef, HostListener, inject, NgZone, OnDestroy, ViewChild, ViewEncapsulation, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None
})
export class Home implements AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  private time = 0;

  private platformId = inject(PLATFORM_ID);

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initGSAP();
    }
  }

  initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTriggers on view init for SPA router changes
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    gsap.utils.toArray('.gsap-reveal').forEach((element: any) => {
      gsap.from(element, { y: 50, opacity: 0, duration: 0.8, scrollTrigger: { trigger: element, start: "top 90%", toggleActions: "play none none reverse" } });
    });

    gsap.utils.toArray('.gsap-fade-up').forEach((element: any) => {
      gsap.from(element, { y: 40, opacity: 0, duration: 0.8, scrollTrigger: { trigger: element, start: "top 90%", toggleActions: "play none none reverse" } });
    });

    gsap.utils.toArray('.gsap-fade-right').forEach((element: any) => {
      gsap.from(element, { x: -50, opacity: 0, duration: 0.8, scrollTrigger: { trigger: element, start: "top 90%", toggleActions: "play none none reverse" } });
    });

    gsap.utils.toArray('.gsap-fade-left').forEach((element: any) => {
      gsap.from(element, { x: 50, opacity: 0, duration: 0.8, scrollTrigger: { trigger: element, start: "top 90%", toggleActions: "play none none reverse" } });
    });

    gsap.utils.toArray('.gsap-card').forEach((element: any) => {
      gsap.from(element, { y: 50, opacity: 0, duration: 0.8, scrollTrigger: { trigger: element, start: "top 90%", toggleActions: "play none none reverse" } });
    });
  }

  showFloatingInquiry = true;

  closeInquiry(event: Event) {
    event.stopPropagation();
    this.showFloatingInquiry = false;
  }

  openInquiryModal() {
    if (isPlatformBrowser(this.platformId)) {
       const modalEl = document.getElementById('inquiryModal');
       if (modalEl && (window as any).bootstrap) {
          const modal = new (window as any).bootstrap.Modal(modalEl);
          modal.show();
       }
    }
  }

  sendToWhatsapp(event: Event) {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const name = (document.getElementById('modalName') as HTMLInputElement).value;
      const phone = (document.getElementById('modalPhone') as HTMLInputElement).value;
      const req = (document.getElementById('modalReq') as HTMLSelectElement).value;

      const text = `*New Solar Inquiry*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Requirement:* ${req}`;
      window.open(`https://wa.me/919890750747?text=${text}`, '_blank');
      
      const modalEl = document.getElementById('inquiryModal');
      if (modalEl && (window as any).bootstrap) {
          const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
          if (modalInstance) {
              modalInstance.hide();
          }
      }
    }
  }

  sendInquiry(event: Event) {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const name = (document.getElementById('inqName') as HTMLInputElement).value;
      const phone = (document.getElementById('inqPhone') as HTMLInputElement).value;
      const email = (document.getElementById('inqEmail') as HTMLInputElement).value;
      const loc = (document.getElementById('inqLoc') as HTMLInputElement).value;
      const req = (document.getElementById('inqReq') as HTMLSelectElement).value;
      const msg = (document.getElementById('inqMsg') as HTMLTextAreaElement).value;

      const text = `*New Quote Request*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Location:* ${loc}%0A*Requirement:* ${req}%0A*Message:* ${msg}`;
      window.open(`https://wa.me/919890750747?text=${text}`, '_blank');
    }
  }
}
