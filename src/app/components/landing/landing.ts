import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkWithHref],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})

export class Landing {
  // Sólo para poner header sólido al hacer scroll (opcional)
  @HostListener('window:scroll')
  onScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
}