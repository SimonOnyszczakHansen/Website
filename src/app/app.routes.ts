import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AboutCardDetailsComponent } from './about-card-details/about-card-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomepageComponent },
    { path: 'projects', component: ProjectsPageComponent },
    { path: 'projects/:id', component: ProjectDetailsComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'about/:id', component: AboutCardDetailsComponent},
    { path: 'contact', component: ContactPageComponent },
];
