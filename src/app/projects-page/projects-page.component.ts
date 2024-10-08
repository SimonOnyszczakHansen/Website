import { Component, ElementRef, ViewChildren, AfterViewInit, QueryList, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NgFor],
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent {
  
}