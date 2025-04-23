import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import * as prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import { FooterComponent } from "../footer/footer.component";
import { NavbarService } from '../services/navbar.service';
import { LocalizedString } from '@angular/compiler';

interface Section {
  id: string,
  title: string,
  content: string,
  content2?: string,
  content3?: string,
  image?: string,
  image2?: string,
  codesnippet?: string,
  codesnippet2?: string,
}

interface Project {
  id: string,
  title: string,
  sections: Section[],
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, FooterComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  projectId!: string;
  project!: Project;
  loading = true;
  error: string | null = null;
  activeSection = 'section1';
  sanitizedCodeSnippet: SafeHtml | null = null;
  private intersectionObserver!: IntersectionObserver;
  private isScrolling = false;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private navbarService: NavbarService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.projectId = id;
          this.loadProjectDetails(id);
        } else {
          this.error = 'Project ID not found';
          this.loading = false;
        }
      },
      error: () => {
        this.error = 'Failed to load project details';
        this.loading = false;
      },
    });
    this.navbarService.hideNavbar();
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.navbarService.showNavbar();
  }

  scrollToSection(sectionId: string): void {
    const offset = 200;
    const element = document.getElementById(sectionId);
    if (element) {
      this.isScrolling = true;
      const elementPosition = element.getBoundingClientRect().top;
      const scrollPosition = window.scrollY + elementPosition - offset;
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });

      setTimeout(() => {
        this.isScrolling = false;
        this.activeSection = sectionId;
      }, 500);
    }
  }

  private loadProjectDetails(id: string): void {
    setTimeout(() => {
      if (id === 'password-generator') {
        this.project = {
          id: 'password-generator',
          title: $localize `Password Generator`,
          sections: [
            {
              id: 'introduction',
              title: $localize `Introduction`,
              content: $localize `The Password Generator is built around the idea that a strong password should not only resist brute-force attacks but also be easy to remember. It accomplishes this by letting users input personal words—such as hobbies, colors, and numbers—and blending them with special characters, uppercase options, and random placement to produce unique combinations. The generator ensures the final result meets modern security standards, including length and character variety, while remaining personal enough to recall without hassle. In the screenshot, you can see the main interface labeled “Adgangskode Generator” (Danish for “Password Generator”), where users add their interests and favorite number. Sliders let you adjust how many letters to pull from each interest and set the total password length, along with toggles for using special characters and capitalization.`,
              image: 'assets/images/PasswordGenerator.png',
            },
            {
              id: 'features',
              title: $localize`Key Features`,
              content: $localize `One of its central features is dynamic input: interests and numbers can be typed or chosen from predefined lists, making it easy to experiment with different memorable words. A built-in mechanism transforms certain Danish characters into symbols for enhanced security, automatically detecting if the browser is in Danish or English. On-screen sliders let users instantly adjust overall length or how many letters are extracted from each interest. The generator evaluates password strength on the spot, highlighting whether it meets criteria such as lowercase, uppercase, numbers, special characters, and overall length. Once a base password is formed, an additional slider allows for appending abbreviated service names, ensuring that each login (such as for Facebook, Google, or LinkedIn) gets a unique, traceable—yet still memorable—password.`,
            },
            {
              id: 'technology',
              title: $localize `Technology and Implementation`,
              content: $localize `The project uses HTML, CSS, and Vanilla JavaScript for a responsive, intuitive single-page application. The code dynamically enforces rules as you type, instantly updating what the password might look like and whether it meets the criteria. The interface is styled to adapt gracefully to different screens, and each step is designed to guide the user without overwhelming them with too many fields at once. Hoverable tooltips clarify any confusing features, such as how the special character mapping works or how many characters from a website name get appended. A short modal video can also guide new users through the entire process in case they feel uncertain about generating a secure passphrase. Below is a snippet demonstrating how the generator verifies that users have specified enough interests and at least one number before enabling password creation:`,
              codesnippet: `
function checkMinimumInterests() {
  const totalPasswordLength = parseInt(passwordLength.value, 10);
  const charactersPerInterest = parseInt(charactersSlider.value, 10);

  const nonNumberTags = tags.filter((tag) => isNaN(tag));
  const numbers = tags.filter((tag) => !isNaN(tag));

  // Calculate expected password length (+1 for the special character)
  const expectedLength =
    nonNumberTags.length * charactersPerInterest +
    numbers.reduce((sum, num) => sum + num.length, 0) +
    1;

  let errorMessages = [];

  // If we don't meet the desired total length, ask for more interests
  if (expectedLength < totalPasswordLength) {
    const minInterestsRequired = Math.ceil(
      (totalPasswordLength -
        numbers.reduce((sum, num) => sum + num.length, 0) -
        1) /
        charactersPerInterest
    );
    const minInterestsMessage = selectedLang.minInterestsMessage.replace(
      "{minInterests}",
      minInterestsRequired
    );
    errorMessages.push(minInterestsMessage);
  } else if (numbers.length === 0) {
    // Also ensure at least one number is included
    const numberRequiredMessage = selectedLang.numberRequiredMessage;
    errorMessages.push(numberRequiredMessage);
  }

  if (errorMessages.length > 0) {
    minInterestsFeedback.innerHTML = errorMessages.join("<br>");
    minInterestsFeedback.style.display = "block";
    document.getElementById("generatePassword").disabled = true;
    return false;
  } else {
    minInterestsFeedback.style.display = "none";
    document.getElementById("generatePassword").disabled = false;
    return true;
  }
}
              `,
              content2: $localize `This logic forms the backbone of user input validation, ensuring each password has enough complexity.`,
            },
            {
              id: 'conclusion',
              title: $localize `Conclusion`,
              content: $localize `The final screenshot shows how your chosen interests (and special character conversions) are listed, along with the generated password, a color-coded strength meter, and an option to append each website’s abbreviation. This Password Generator demonstrates that memorable passwords can be strong when carefully combining personal interests with structured randomness. By automating best practices and nudging the user to include a variety of character types, it produces truly robust credentials. The multilingual functionality also extends accessibility for users, whether they prefer an English or Danish interface. Overall, this project reflects an ongoing commitment to security-minded design, offering not just raw strength but practical memorability for everyday use.`,
              image: 'assets/images/PasswordGeneratorResult.png',
            },
          ],
        };
      } else if (id == 'portionpal') {
        this.project = {
          id: 'portionpal',
          title: 'PortionPal',
          sections: [
            {
              id: 'introduction',
              title: 'introduction',
              content: $localize `We call our project PortionPal SmartFeeder, and it’s basically our attempt at making life easier for pet owners who worry about whether their furry friends are eating at the right times and in the right amounts. We worked on this project at Zealand Business College under the guidance of David Svarrer. During the development, our small team combined 3D printing, embedded electronics, and a web-based control interface to create a system that monitors how much food is dispensed, collects feedback from load cells, and even lets you manage it all remotely via a user-friendly dashboard.`,
              image: 'assets/images/PortionPal.png'
            },
            {
              id: '3D Model',
              title: '3D Model',
              content: $localize `We designed a custom enclosure that handles dry pet food using a rotating valve mechanism. The layout focuses on ensuring each part slots together without jamming, leaving room for bearings, the motor bracket, and wiring channels. By iterating on these 3D prints, we refined how the parts lined up so that the valve rotates smoothly even with repeated use. The image shows the basic shape of the dispenser, highlighting how the components stack together in the final build.`,
              image: 'assets/images/3DModel.png'
            },
            {
              id: 'Hardware',
              title: 'Hardware',
              content: $localize `The system runs on an Arduino Uno R4 WiFi, which we chose for its wireless capabilities and easy integration with the stepper motor. We used a 28BYJ-48 stepper motor (with a small driver module) to turn the valve that dispenses the pet food. Two load cells, each hooked up to an HX711 amplifier, measure food weight as it’s dispensed. If the reading is off—maybe because of a jam—the Arduino knows something went wrong. By combining these sensors with the rotating valve, we ensure the portions match whatever the owner has configured. Below is a visual representation of how we put it together.`,
              image: 'assets/images/StepMotor.png',
              content2: $localize `We also intended to use a load cell, so we could weigh how much food was dispensed, and to track the pets eating habits. The data we collected from the load cell was supposed to be displayed on a statistics page with all the data that the user could wish for. Here is a image of what the statistics page looked like.`,
              image2: 'assets/images/PortionPalStats.png',
              content3: $localize `The bar chart above is supposed to show how much the pet has eaten each day. The gauge diagram is supposed to show how full the bowl is.`,
            },
            {
              id: 'Software and Communication',
              title: $localize `Software and Communication`,
              content: $localize `All Arduino logic is written in C++, managing the stepper motor’s rotation and the sensor data. The Arduino checks in with a PHP-based backend over WiFi to receive updated schedules or portion sizes. Owners interact with the feeder through an Angular frontend, where they can log in, adjust feeding times, and see historical records of how much the pet actually ate. Everything lives on GitHub for version control, allowing our team to keep track of code changes and collaborate effectively.`,
              codesnippet: `WiFiSSLClient wifi; // Secure client for HTTPS
HttpClient client = HttpClient(wifi, serverAddress, serverPort);

// Construct the GET request path with the API key
String path = String(getSchedulePath) + "?apiKey=" + String(apiKey);
Serial.print("Requesting URL: ");
Serial.println(path);

// Send GET request
int err = client.get(path);
if (err != 0) {
  Serial.print("GET request failed with error: ");
  Serial.println(err);
  client.stop();
  return false;
}

// Read response
int statusCode = client.responseStatusCode();
String response = client.responseBody();

Serial.print("Status Code: ");
Serial.println(statusCode);
Serial.print("Server Response: ");
Serial.println(response);

// Close the connection
client.stop();

// Here, you would parse the 'response' if status code is OK
// parseFeedingSchedule(response);
return (statusCode == 200);`,
              content2: $localize `This snippet shows how the Arduino securely fetches updated schedules from our server. We build a GET request URL with the API key, send it via HTTPS, and then check the response. If the server returns a 200 status, we parse the returned JSON for feeding times and portion sizes, ensuring our dispenser follows the owner’s most recent instructions.`,
            },
            {
              id: 'Conclusion',
              title: $localize `Conclusion`,
              content: $localize `The PortionPal SmartFeeder prototype demonstrates that it’s totally possible to automate pet feeding in a way that is both precise and user-friendly. Printing our own enclosure gave us freedom to customize the internal mechanics, while the Arduino’s WiFi capabilities made it easy to manage everything remotely. We overcame challenges around calibrating load cells and preventing valve jams, and ended up with a working system that can handle daily feeding schedules. Future ideas might include adding a camera or tracking more detailed statistics, but even in its current state, it showcases how a straightforward combination of 3D printing, embedded hardware, and a modern web stack can offer busy owners peace of mind about their pets’ nutrition.`,
            }
          ],
        }
      } else if (id == "smart-city-traffic-management") {
        this.project = {
          id: 'smart-city-traffic-management',
          title: 'Smart City Traffic Management',
          sections: [
            {
              id: 'Introduction',
              title: $localize `Introduction`,
              content: $localize `Smart Cit Traffic Management is a project we used as an exercise when i was at school to learn how to handle big amounts of data. The assignment was to collect real time data, so we decided to to use a software called flowkit demo, which simulated a traffic light, where the software identified all the vehicles and pedestrians that passed the traffic light. Below is an image of what the software looked like.`,
              image: 'assets/images/FlowKitDemo.png',
              content2: $localize `In the image you can see that there is a zone. This zone is where the software could detect if there was a vehicle or a pedestrian. The gates could register if a vehicle passed through the zone.`,
            },
            {
              id: 'Data Collection',
              title: $localize `Data Collection`,
              content: $localize `Here is how our Python scripts collect data from the Flow Demo and forwards it to Kafka. In main.py we create a FlowDemo object and a Scheduler object. The Scheduler object runs the FlowDemo object every minute. That run method triggers data retrievalfrom the Flow Demo API, processes the results, and passes them onward.`,
              codesnippet: `flow = FlowDemo("localhost", 8088)

def createSchedule(flow: FlowDemo):
    schedule = Scheduler()
    schedule.every().minute.do(run_thread, flow.run)
    schedule.run_all()

createSchedule(flow)
`,
              content2: $localize `inside flow_demo.py, the run method goes through each sink, calls getHistory to retrieve snapshot data, and checks whether it’s valid and newer than the last timestamp. When it finds fresh data, it wraps that information in a JSON-like dictionary, then passes it to the Producer for publishing to a Kafka topic named data-distribution.`,
              codesnippet2: `def getDistribution(self, sink: Sink):
    history = sink.getHistory()
    snapshots = history["snapshots"]
    for snapshot in snapshots:
        if snapshot["data"]["data_validity"] == "ok":
            if snapshot["data_start_timestamp"] > sink._last_start_timestamp:
                for category in snapshot["data"]["categories"]:
                    if int(category["count"]) > 0:
                        message_data = {
                            "sensor_name": history["name"],
                            "start_timestamp": snapshot["data_start_timestamp"],
                            "end_timestamp": snapshot["data_end_timestamp"],
                            "category": category["category"],
                            "count": int(category["count"]),
                        }
                        self._producer.sendJsonMessage("data-distribution", message_data)
                sink._last_start_timestamp = snapshot["data_start_timestamp"]`,
                content3: 'This snippet shows how the FlowDemo object processes data from the Flow Demo API and forwards it to Kafka for further analysis.',
            },
            {
              id: 'Data Consumption',
              title: $localize `Data Consumption`,
              content: $localize `The code first starts a Kafka consumer in a seperate thread wich continously reads messages off the data-distribution topic. Then inside a Dash callback, we process any messagesin the queue and convert them into Pandas Dataframes foreasy plotting. If no data has arrived yet, we display placeholder text. Otherwisem we draw a bar, pie, and line charts of the traffic counts by vehicle.`,
              codesnippet: `if __name__ == "__main__":
    runThread1Arg(kafka_consumer, "data-distribution")

    app.run(debug=True, dev_tools_ui=False)
`,
              content2: $localize `In this second snippet, our Dash callback periodically checks the queue for new messages and updates three graphs accordingly. We use Plotly Express to create bar, pie, and line charts from the streaming data. Thanks to Dash’s reactive callbacks, the figures automatically refresh every few seconds, giving a live view of vehicle traffic distribution.`,
              codesnippet2: `@app.callback(
    [
        Output("traffic-count-graph", "figure"),
        Output("traffic-pie-graph", "figure"),
        Output("traffic-timeline-graph", "figure"),
    ],
    [Input("traffic-interval", "n_intervals")],
)
def updateDistributionGraphs(n):
    while not data_queue.empty():
        data = data_queue.get()
        streaming_data.append(data)

    if not streaming_data:
        bar = px.bar(title="Waiting for Data...")
        pie = px.pie(title="Waiting for Data...")
        line = px.line(title="Waiting for Data...")
        return (bar, pie, line)

    df = pd.DataFrame(streaming_data)
    # Convert data types, group by category, and build the three figures (bar, pie, line)...
    return figure_bar, figure_pie, figure_timeline
`,
              content3: $localize `This setup ensures that as new traffic data arrives, the consumer immediately adds it to the queue. Then, every few seconds, the Dash callback picks up that data, updates the visualizations, and displays fresh insights on the dashboard.`,
            },
            {
              id: 'Conclusion',
              title: $localize `Conclusion`,
              content: $localize `This final dashboard pulls everything together into one real-time view of the traffic data. In the screenshot, you can see three main graphs—a bar chart ranking vehicle types by total count, a pie chart showing the distribution proportions, and a line chart that plots traffic counts over time. Each chart updates automatically every few seconds, reflecting new information flowing in through Kafka. This approach gives us a clear overview of which vehicles are most common at different times of day, helping city planners and traffic engineers spot trends or spikes in activity. Even in a relatively short development cycle, we managed to combine data ingestion, queueing, and dynamic visualization into one clean interface for monitoring real-time traffic conditions.`,
              image: 'assets/images/TrafficManagement.png',
            }
          ],
        }
      }
      else {
        this.error = 'Project not found';
      }
      this.loading = false;
      this.cdr.detectChanges();
      this.initializeIntersectionObserver();
      setTimeout(() => prism.highlightAll(), 0)
    },);
  }

  private initializeIntersectionObserver(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isScrolling) {
          this.activeSection = entry.target.id;
          this.cdr.detectChanges();
        }
      });
    }, options);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => this.intersectionObserver.observe(section));
  }
}