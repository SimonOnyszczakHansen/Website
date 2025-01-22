import { NgIf, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  projectId!: string;
  loading: boolean = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectId = id;
        this.fetchProjectDetails();
      } else {
        this.error = 'Project ID not found';
      }
      this.loading = false;
    }, error => {
      this.error = 'Failed to load project details';
      this.loading = false;
    });
  }

  goBack(): void {
    this.location.back();
  }

  fetchProjectDetails(): void {

  }
}