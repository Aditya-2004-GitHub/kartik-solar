import { Component, AfterViewInit, PLATFORM_ID, inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        gsap.registerPlugin(ScrollTrigger);

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
      });
    }
  }

  sendToWhatsapp(event: Event) {
    event.preventDefault();
    const name = (document.getElementById('contactName') as HTMLInputElement).value;
    const phone = (document.getElementById('contactPhone') as HTMLInputElement).value;
    const email = (document.getElementById('contactEmail') as HTMLInputElement).value;
    const req = (document.getElementById('contactReq') as HTMLSelectElement).value;
    const msg = (document.getElementById('contactMsg') as HTMLTextAreaElement).value;

    const text = `*New Solar Inquiry*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Requirement:* ${req}%0A*Message:* ${msg}`;
    window.open(`https://wa.me/919890750747?text=${text}`, '_blank');
  }

  quickWhatsapp() {
    const text = `Hello, I am interested in solar installation. Please provide details.`;
    window.open(`https://wa.me/919890750747?text=${text}`, '_blank');
  }
}
