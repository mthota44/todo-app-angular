import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RxjsLearningService {

    // =================================================================
    // 1. OBSERVABLE (The YouTube Video)
    // =================================================================
    // Think of an Observable like a YouTube video.
    // - It doesn't play until someone clicks "Watch" (subscribe).
    // - Every person who watches sees the same video from the start (usually).
    // - It's just a read-only stream of data. You can't pause/resume from outside easily.

    // Here we function that returns an Observable
    getSimpleObservable(): Observable<string> {
        // 'new Observable' is how we create a custom stream.
        // 'observer' is the person watching.
        return new Observable(observer => {
            observer.next('Video Started: Intro'); // 1. Send first data

            setTimeout(() => {
                observer.next('Video Playing: Main Content'); // 2. Send 2nd data after 2 seconds
            }, 2000);

            setTimeout(() => {
                observer.next('Video Ended: Outro'); // 3. Send 3rd data
                observer.complete(); // 4. Tell them it's finished
            }, 4000);
        });
    }


    // =================================================================
    // 2. SUBJECT (The Live TV Show)
    // =================================================================
    // Think of a Subject like a Live TV Show.
    // - It is broadcasting LIVE right now.
    // - If you turn on the TV (subscribe) late, you missed the start.
    // - It acts as both a Producer (can emitting data) and a Consumer (can be subscribed to).

    // We create a private Subject so only this service can control the data
    private notificationSubject = new Subject<string>();

    // We expose it as an Observable for components to listen to
    notification$ = this.notificationSubject.asObservable();

    // Method to send a new notification (Broadcasting)
    sendNotification(message: string) {
        this.notificationSubject.next(message);
    }


    // =================================================================
    // 3. BEHAVIOR SUBJECT (The Scoreboard)
    // =================================================================
    // Think of a BehaviorSubject like a Scoreboard at a stadium.
    // - It ALWAYS holds the current score (initial value needed).
    // - If you look at the scoreboard (subscribe) late, you immediately see the CURRENT score.
    // - You don't have to wait for the next goal to know the score.

    // Initial value is 0
    private scoreSubject = new BehaviorSubject<number>(0);

    // Expose as Observable
    score$ = this.scoreSubject.asObservable();

    // Method to update score
    updateScore(newScore: number) {
        this.scoreSubject.next(newScore); // Updates the value and notifies everyone
    }
}
