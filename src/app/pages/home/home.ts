import { AfterViewInit, Component, ElementRef, HostListener, inject, NgZone, OnDestroy, ViewChild, ViewEncapsulation, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None
})
export class Home implements AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  private time = 0;

  private platformId = inject(PLATFORM_ID);

  showFloatingInquiry = true;

  franchiseForm = {
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    area: '',
    pin: '',
    busExp: '',
    busName: '',
    busYears: '',
    investment: '',
    spaceType: '',
    spaceSize: '',
    interestReason: ''
  };

  constructor(private ngZone: NgZone) { }

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initGSAP();
      
      // Force video playback to handle browser autoplay policies
      if (this.heroVideo && this.heroVideo.nativeElement) {
        this.heroVideo.nativeElement.muted = true;
        this.heroVideo.nativeElement.play().catch(error => {
          console.log("Video auto-play prevented by browser policy", error);
        });
      }
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

  submitFranchiseForm() {
    if (isPlatformBrowser(this.platformId)) {
      const { name, phone, email, state, city, area, pin, busExp, busName, busYears, investment, spaceType, spaceSize, interestReason } = this.franchiseForm;

      const fBusName = busName || 'N/A';
      const fBusYears = busYears || 'N/A';
      const fSpaceSize = spaceSize || 'N/A';

      const text = `*New Franchise Application*%0A%0A*Personal Information*%0A*Name:* ${name}%0A*Mobile Number:* ${phone}%0A*Email ID:* ${email}%0A%0A*Location Information*%0A*State:* ${state}%0A*City:* ${city}%0A*Area / Locality:* ${area}%0A*PIN Code:* ${pin}%0A%0A*Business / Experience*%0A*Have Experience:* ${busExp}%0A*Business Name:* ${fBusName}%0A*Years:* ${fBusYears}%0A%0A*Investment Capacity*%0A*Amount:* ${investment}%0A%0A*Space / Shop Details*%0A*Have Space:* ${spaceType}%0A*Size (Sq Ft):* ${fSpaceSize}%0A%0A*Interest Level*%0A*Reason:* ${interestReason}`;
      window.open(`https://wa.me/919890750747?text=${text}`, '_blank');

      // clear all form data as user submitted the form
      this.franchiseForm = {
        name: '',
        phone: '',
        email: '',
        state: '',
        city: '',
        area: '',
        pin: '',
        busExp: '',
        busName: '',
        busYears: '',
        investment: '',
        spaceType: '',
        spaceSize: '',
        interestReason: ''
      };

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
