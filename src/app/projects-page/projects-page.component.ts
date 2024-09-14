import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent {

}
