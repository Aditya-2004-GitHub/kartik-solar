import { Component, AfterViewInit, PLATFORM_ID, inject, NgZone, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.heroVideo && this.heroVideo.nativeElement) {
        this.heroVideo.nativeElement.muted = true;
        this.heroVideo.nativeElement.defaultMuted = true;
        this.heroVideo.nativeElement.play().catch(e => console.log('Auto-play prevented', e));
      }
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
}
