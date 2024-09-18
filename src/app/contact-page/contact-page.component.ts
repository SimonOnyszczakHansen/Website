import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})

export class ContactPageComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.http.post('/api/send-email.php', formData).subscribe(
        (response) => {
          // Handle successful response
          alert('Your message has been sent successfully!');
          this.contactForm.reset();
        },
        (error) => {
          // Handle error response
          alert('An error occurred while sending your message.');
          console.error(error);
        }
      );
    }
  }
}
