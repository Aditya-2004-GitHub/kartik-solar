import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements AfterViewInit {
  sections: NodeListOf<HTMLElement> | undefined;
  navLinks: NodeListOf<HTMLElement> | undefined;
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
    this.sections = document.querySelectorAll('section, header');
    this.navLinks = document.querySelectorAll('.nav-hover');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

    // Navbar scroll style
    const navbar = document.getElementById('navbar');

    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active section highlight
    let current = '';

    this.sections?.forEach(section => {
      const sectionTop = section.offsetTop;

      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id') || '';
      }
    });

    this.navLinks?.forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  closeNavbar() {
    if (isPlatformBrowser(this.platformId)) {
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse?.classList.contains('show')) {
        // Since we removed the duplicate bootstrap script, we check if bootstrap is globally available,
        // otherwise simply remove the class to gracefully collapse.
        if ((window as any).bootstrap && (window as any).bootstrap.Collapse) {
           const bsCollapse = new (window as any).bootstrap.Collapse(navbarCollapse, { toggle: false });
           bsCollapse.hide();
        } else {
           navbarCollapse.classList.remove('show');
        }
      }
    }
  }
}
