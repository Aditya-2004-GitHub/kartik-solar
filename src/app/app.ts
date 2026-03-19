import { AfterViewInit, Component, ElementRef, inject, NgZone, PLATFORM_ID, ViewChild, signal, OnInit, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Navbar } from "./core/navbar/navbar";
import { Footer } from "./core/footer/footer";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnInit {
  protected readonly title = signal('KARTIK-SOLAR');
  @ViewChild('appCanvasContainer', { static: false }) canvasContainer!: ElementRef;
  private time = 0;
  private platformId = inject(PLATFORM_ID);

  showHeaderFooter = true;
  isOfferPopupOpen = false;
  hasPopupShownInitially = false;
  constructor(private ngZone: NgZone, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.showHeaderFooter = route.snapshot.data['hideHeaderFooter'] !== true;
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (!this.hasPopupShownInitially) {
          this.isOfferPopupOpen = true;
          this.hasPopupShownInitially = true;
        }
      }, 3000);
    }
  }

  @HostListener('window:openOfferPopup')
  onExternalOpenOfferPopup() {
    this.openOfferPopup();
  }

  openOfferPopup() {
    this.isOfferPopupOpen = true;
  }

  closeOfferPopup() {
    this.isOfferPopupOpen = false;
  }

  navigateToContact() {
    this.isOfferPopupOpen = false;
    this.router.navigate(['/contact']);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.canvasContainer) {
        gsap.registerPlugin(ScrollTrigger);
        this.ngZone.runOutsideAngular(() => {
          this.initThreeJS();
        });
      }
    }
  }
  initThreeJS() {
    const container = this.canvasContainer.nativeElement;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const solarGroup = new THREE.Group();
    scene.add(solarGroup);

    const panelGeometry = new THREE.PlaneGeometry(1.8, 2.5);
    const blockGeometry = new THREE.BoxGeometry(1.8, 2.5, 0.1);

    const panelMaterial = new THREE.MeshPhysicalMaterial({ color: 0x0284c7, emissive: 0x002244, roughness: 0.1, metalness: 0.8, clearcoat: 1.0, clearcoatRoughness: 0.1, transparent: true, opacity: 0.85 });
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4, metalness: 0.6 });

    const rows = 3; const cols = 5; const spacingX = 2.2; const spacingZ = 3.0;
    const panels: any[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const group = new THREE.Group();
        const frame = new THREE.Mesh(blockGeometry, frameMaterial);
        group.add(frame);

        const surface = new THREE.Mesh(panelGeometry, panelMaterial);
        surface.position.z = 0.06;
        group.add(surface);

        group.position.x = (c - (cols - 1) / 2) * spacingX;
        group.position.z = (r - (rows - 1) / 2) * spacingZ;
        group.rotation.x = -Math.PI / 3;

        group.userData = { baseY: Math.sin(r + c) * 0.5 - 2, randomSpeed: 0.001 + Math.random() * 0.001 };
        group.position.y = group.userData['baseY'];

        solarGroup.add(group);
        panels.push(group);
      }
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const sunLight = new THREE.DirectionalLight(0xf59e0b, 1.5);
    sunLight.position.set(5, 10, -5);
    scene.add(sunLight);
    const pointLight = new THREE.PointLight(0x38bdf8, 1, 20);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    const animateThree = () => {
      requestAnimationFrame(animateThree);
      this.time += 0.01;

      panels.forEach((panel) => {
        panel.position.y = panel.userData.baseY + Math.sin(this.time + panel.userData.randomSpeed * 1000) * 0.2;
      });

      sunLight.position.x = Math.sin(this.time * 0.2) * 10;
      sunLight.position.z = Math.cos(this.time * 0.2) * 10 - 5;
      solarGroup.rotation.y = Math.sin(this.time * 0.1) * 0.05;

      renderer.render(scene, camera);
    };
    animateThree();

    // Global Three.js GSAP Triggers depending on body scroll
    gsap.to(solarGroup.position, { y: 3, z: 5, ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 } });
    gsap.to(solarGroup.rotation, { x: Math.PI / 12, ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 } });
    gsap.to(container, { opacity: 0.2, scrollTrigger: { trigger: "body", start: "top top", end: "100px top", scrub: true } });
    gsap.fromTo(container, { opacity: 0.2 }, { opacity: 0.8, scrollTrigger: { trigger: "body", start: "100px top", end: "bottom top", scrub: true } });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}

