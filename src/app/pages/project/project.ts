import { Component, AfterViewInit, PLATFORM_ID, inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.css'
})
export class Project implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  testimonials = [
    {
      id: 1,
      name: 'Client Name 1',
      location: 'Pulgaon, Maharashtra',
      review: 'Kartik Multi Solutions transformed our commercial facility with exceptional solar EPC efficiency. The team is very professional and handled the entire installation process.',
      image: 'client-1.jpeg'
    },
    {
      id: 2,
      name: 'Client Name 2',
      location: 'Pulgaon, Maharashtra',
      review: 'Exceptional service! We reduced our energy bills significantly after switching to solar with their help. The process was completely hassle-free.',
      image: 'client-2.jpeg'
    },
    {
      id: 3,
      name: 'Client Name 3',
      location: 'Gunjkheda, Maharashtra',
      review: 'Great experience from start to finish. The team explained everything clearly and the installation was completed on time without any issues.',
      image: 'client-3.jpeg'
    },
    {
      id: 4,
      name: 'Client Name 4',
      location: 'Pulgaon, Maharashtra',
      review: 'High quality solar panels and very neat installation. I highly recommend Kartik Multi Solutions to anyone looking for solar installation.',
      image: 'client-4.jpeg'
    },
    {
      id: 5,
      name: 'Client Name 5',
      location: 'Pulgaon, Maharashtra',
      review: 'Their technical knowledge is commendable. They properly assessed our roof layout and suggested the best possible solar setup maxmizing efficiency.',
      image: 'client-5.jpeg'
    },
    {
      id: 6,
      name: 'Client Name 6',
      location: 'Nagpur, Maharashtra',
      review: 'Affordable pricing combined with top-tier equipment. Very satisfied with the prompt response for maintenance as well.',
      image: 'client-6.jpeg'
    },
    {
      id: 7,
      name: 'Client Name 7',
      location: 'Pulgaon, Maharashtra',
      review: 'Impressed by the neat and clean wiring work. The inverter and panels are working flawlessly perfectly handling our total load.',
      image: 'client-7.jpeg'
    },
    {
      id: 8,
      name: 'Client Name 8',
      location: 'Gunjkheda, Maharashtra',
      review: 'The post-installation support has been great. They are always available to help and they genuinely care about customer satisfaction.',
      image: 'client-8.jpeg'
    },
    {
      id: 9,
      name: 'Client Name 9',
      location: 'Pulgaon, Maharashtra',
      review: 'We opted for a 10kW system. Getting net metering done was a breeze because their team handled the entire MSEDCL documentation securely.',
      image: 'client-9.jpeg'
    },
    {
      id: 10,
      name: 'Client Name 10',
      location: 'Pulgaon, Maharashtra',
      review: 'Brilliant work by the Kartik Multi Solutions team! A truly professional setup that has brought a massive difference to our electricity expenses.',
      image: 'client-10.jpeg'
    }
  ];

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

        gsap.from(".testimonial-card", {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: "#testimonials",
            start: "top 80%"
          }
        });
      });
    }
  }
}
