import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Project } from './pages/project/project';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'about', component: About, title: 'About' },
  { path: 'services', component: Services, title: 'Services' },
  { path: 'project', component: Project, title: 'Project' },
  { path: 'contact', component: Contact, title: 'Contact' },
];
