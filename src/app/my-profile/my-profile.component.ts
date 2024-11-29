import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  standalone: true,
  imports: [CommonModule] // Add CommonModule here for ngFor
})
export class MyProfileComponent implements OnInit {

  totalQuestions: number = 25; // Example data
  answersGiven: number = 18; // Example data
  avgResponseTime: number = 2.5; // Example data in hours

  // Example recent activities
  recentActivities = [
    { title: "Answered a question", description: "I provided an answer to a question about Angular.", emoji: "✔️", date: "2024-11-25" },
    { title: "Asked a question", description: "I asked a question about Angular services.", emoji: "❓", date: "2024-11-22" },
    { title: "Voted on a question", description: "I voted on a question regarding best practices in API design.", emoji: "👍", date: "2024-11-21" }
  ];

  constructor() { }

  ngOnInit(): void {
    // Fetch data or API call logic goes here
  }
}
