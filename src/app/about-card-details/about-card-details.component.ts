import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { NavbarService } from '../services/navbar.service';

interface Sections {
  id: string,
  title: string,
  content: string,
  content2?: string,
  image?: string,
}

interface AboutDescription {
  id: string,
  title: string,
  section: Sections[],
}

@Component({
  selector: 'app-about-card-details',
  standalone: true,
  imports: [RouterLink, NgForOf],
  templateUrl: './about-card-details.component.html',
  styleUrl: './about-card-details.component.css'
})
export class AboutCardDetailsComponent implements OnInit, OnDestroy {
  aboutDescriptionId!: string;
  aboutDescription!: AboutDescription;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.aboutDescriptionId = id;
          this.loadProjectDetails(id);
        } else {
          this.error = 'No Descriptions found';
        }
      }
    });
    this.navbarService.hideNavbar();
  }

  ngOnDestroy(): void {
    this.navbarService.showNavbar();
  }

  private loadProjectDetails(id: string): void {
    if (id === 'football-details') {
      this.aboutDescription = {
        id: 'football-details',
        title: 'Football',
        section: [
          {
            id: 'where-it-all-started',
            title: 'Where it all started',
            content: '',
          },
          {
            id: 'who-do-i-support',
            title: 'Who do I support?',
            content: '',
          },
          {
            id: 'favourite-memory',
            title: 'Favourite memory',
            content: '',
          },
          {
            id: 'favourite-players',
            title: 'favourite players',
            content: '',
          }
        ]
      }
    } else if (id === 'studying-details') {
      this.aboutDescription = {
        id: 'studying-details',
        title: 'My Education',
        section: [
          {
            id: '',
            title: '',
            content: '',
          },
        ]
      }
    } else if (id === 'relocation-details') {
      this.aboutDescription = {
        id: 'relocation-details',
        title: 'Relocation',
        section: [
          {
            id: '',
            title: '',
            content: '',
          },
        ]
      }
    } else {
      this.error = 'No Descriptions found';
    }
  }
}