import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { RxjsLearningService } from './rxjs-learning.service';

/**
 * ==============================================================================
 * 🔄 RxJS CONCEPTS EXPLAINED
 * ==============================================================================
 * 
 * RxJS is like handling a river of data (Stream).
 * You can sit by the river and watch things float by (Subscribe).
 * You can modify things as they float by (Operators like map, filter).
 */

@Component({
  selector: 'app-rxjs-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-demo.component.html',
  styleUrl: './rxjs-demo.component.css'
})
export class RxjsDemoComponent implements OnInit, OnDestroy {

  // Variables to show data in HTML
  videoLogs: string[] = [];
  notificationLogs: string[] = [];
  currentScore: number = 0;
  lateSubscriberMsg: string = '';

  private notificationSub: Subscription | undefined;
  private scoreSub: Subscription | undefined;

  // Modern Injection
  private rxjsService = inject(RxjsLearningService);

  // We use ngOnInit for initialization logic, not the constructor.
  ngOnInit() {
    // We subscribe to the BehaviorSubject (Scoreboard) immediately
    // so this component always shows the live score.
    this.scoreSub = this.rxjsService.score$.subscribe((score: number) => {
      this.currentScore = score;
    });
  }

  // ==========================================
  // 1. OBSERVABLE DEMO
  // ==========================================
  startVideo() {
    this.videoLogs = []; // clear old logs
    this.videoLogs.push('Waiting for video...');

    // We ask the service for the Observable data
    // .subscribe() means "I am watching now, send me data"
    this.rxjsService.getSimpleObservable().subscribe({
      next: (data: string) => {
        this.videoLogs.push(data); // "Video playing..."
      },
      complete: () => {
        this.videoLogs.push('Finished!'); // Done
      }
    });
  }


  // ==========================================
  // 2. SUBJECT DEMO
  // ==========================================
  joinNotificationChannel() {
    if (this.notificationSub) {
      alert('You already joined!');
      return;
    }

    // Subscribe to the Subject
    this.notificationSub = this.rxjsService.notification$.subscribe((message: string) => {
      this.notificationLogs.push(message);
    });

    alert('You have joined the notification channel!');
  }

  sendNotification(msg: string) {
    // Tell the service to broadcast this message
    this.rxjsService.sendNotification(msg);
  }


  // ==========================================
  // 3. BEHAVIOR SUBJECT DEMO
  // ==========================================
  increaseScore() {
    // Calculate new score and update service
    const newScore = this.currentScore + 1;
    this.rxjsService.updateScore(newScore);
  }

  checkScore() {
    // Imagine this is a NEW component loading 1 hour later.
    // Because it's a BehaviorSubject, we get the LATEST value instantly.
    // We don't have to wait for the next goal.

    // We do a "one-time" take(1) subscription just to check value
    this.rxjsService.score$.pipe(take(1)).subscribe((score: number) => {
      this.lateSubscriberMsg = `I just arrived and the score is already: ${score}`;
    });
  }

  ngOnDestroy() {
    // Good practice: Unsubscribe to stop listening when component closes
    if (this.notificationSub) this.notificationSub.unsubscribe();
    if (this.scoreSub) this.scoreSub.unsubscribe();
  }

}
