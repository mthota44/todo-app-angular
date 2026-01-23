import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, BehaviorSubject, of, interval, Subscription } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

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
    template: `
    <div class="container">
      <h1>🔄 RxJS Playground</h1>
      <p>RxJS handles asynchronous data streams. Open <strong>Console (F12)</strong> for more details.</p>

      <div class="grid">
        
        <!-- 1. OBSERVABLE -->
        <div class="card obs-card">
          <h2>1. Observable 📺</h2>
          <p>A simple stream of data. Lazy (doesn't start until you subscribe).</p>
          <button (click)="runObservableDemo()">Start Stream</button>
          <div class="console-box">
            <div *ngFor="let log of obsLogs">{{ log }}</div>
          </div>
        </div>

        <!-- 2. SUBJECT -->
        <div class="card sub-card">
          <h2>2. Subject 📢</h2>
          <p>Like a Radio Station. Broadcasting live. If you join late, you miss the earlier songs.</p>
          
          <button (click)="emitSubjectResult()">Emit Next Value</button>
          <button (click)="subscribeToSubject()">New Listener</button>
          
          <div class="console-box">
            <div *ngFor="let log of subjectLogs">{{ log }}</div>
          </div>
        </div>

        <!-- 3. BEHAVIOR SUBJECT -->
        <div class="card beh-card">
          <h2>3. BehaviorSubject 💾</h2>
          <p>Like a Notice Board. Holds the <strong>Latest Value</strong>. If you join late, you see the last message immediately.</p>
          
          <button (click)="emitBehaviorResult()">Emit Next Value</button>
          <button (click)="subscribeToBehavior()">New Listener</button>

          <div class="console-box">
            <div *ngFor="let log of behaviorLogs">{{ log }}</div>
          </div>
        </div>

      </div>

      <div class="explanation">
        <h3>📚 Key Concepts</h3>
        <ul>
          <li><strong>Observable</strong>: The Source. It emits values over time. (e.g., user clicks, HTTP requests).</li>
          <li><strong>Observer/Subscribe</strong>: The Listener. You must subscribe to get the data.</li>
          <li><strong>Subject</strong>: Multicasting. One source, many listeners. (Misses past values).</li>
          <li><strong>BehaviorSubject</strong>: Remembers the <i>last</i> value. Great for storing state (like 'Is User Logged In?').</li>
          <li><strong>Operators</strong>: Tools to change data (map, filter). e.g., <code>map(x => x * 2)</code>.</li>
        </ul>
      </div>
    </div>
  `,
    styles: [`
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .grid { display: flex; gap: 20px; flex-wrap: wrap; }
    .card { flex: 1; min-width: 300px; padding: 20px; border-radius: 10px; border: 2px solid #ccc; background: #fff; }
    
    .obs-card { border-color: #2196F3; background: #E3F2FD; }
    .sub-card { border-color: #FF9800; background: #FFF3E0; }
    .beh-card { border-color: #4CAF50; background: #E8F5E9; }

    .console-box { 
      background: #222; 
      color: #0f0; 
      font-family: monospace; 
      padding: 10px; 
      margin-top: 10px; 
      min-height: 100px; 
      max-height: 150px; 
      overflow-y: auto; 
      border-radius: 4px;
    }
    button { margin-right: 5px; padding: 8px 12px; cursor: pointer; border-radius: 4px; border: none; font-weight: bold; color: white; background: #333; margin-bottom: 5px; }
    .obs-card button { background: #1976D2; }
    .sub-card button { background: #F57C00; }
    .beh-card button { background: #388E3C; }

    .explanation { margin-top: 30px; background: #f9f9f9; padding: 20px; border-left: 5px solid #9C27B0; }
  `]
})
export class RxjsDemoComponent implements OnDestroy {

    // Logs for UI
    obsLogs: string[] = [];
    subjectLogs: string[] = [];
    behaviorLogs: string[] = [];

    // ==============================================================================
    // 1. OBSERVABLE DEMO
    // ==============================================================================
    // Concept: A stream of numbers 1, 2, 3, 4, 5
    // We use operators to double them and only keep even numbers.
    runObservableDemo() {
        this.obsLogs = []; // Clear logs
        this.obsLogs.push('Creating Observable...');

        // 'of' creates an observable from a list of items
        const numberStream$ = of(1, 2, 3, 4, 5);

        numberStream$.pipe(
            // OPERATOR: map (Transform data)
            // Like converting standard definition TV to HD.
            map(num => num * 2), // 2, 4, 6, 8, 10

            // OPERATOR: filter (Allow only some data)
            // Like a security guard checking ID.
            filter(num => num > 5) // 6, 8, 10
        ).subscribe({
            next: (val) => this.obsLogs.push(`Received: ${val}`),
            complete: () => this.obsLogs.push(`Stream Completed! 🏁`)
        });
    }

    // ==============================================================================
    // 2. SUBJECT DEMO
    // ==============================================================================
    // Concept: A live broadcaster.
    // We create one Subject.
    private mySubject = new Subject<number>();
    private subCounter = 1;

    emitSubjectResult() {
        const val = this.subCounter++;
        this.mySubject.next(val); // Broadcasting value '1', '2', etc.
        this.subjectLogs.push(`🚨 BROADCASTING: ${val}`);
    }

    subscribeToSubject() {
        const id = Math.floor(Math.random() * 100);
        this.subjectLogs.push(`Listener ${id} joined! (Waiting for NEXT song...)`);

        // Subscribe
        this.mySubject.subscribe(val => {
            this.subjectLogs.push(`Listener ${id} heard: ${val}`);
        });
    }

    // ==============================================================================
    // 3. BEHAVIOR SUBJECT DEMO
    // ==============================================================================
    // Concept: A broadcaster that repeats the last message to new people.
    // Requires an INITIAL VALUE (e.g., 0).
    private myBehaviorSubject = new BehaviorSubject<number>(0); // Starts at 0
    private behCounter = 1;

    emitBehaviorResult() {
        const val = this.behCounter++;
        this.myBehaviorSubject.next(val);
        this.behaviorLogs.push(`💾 UPDATED STATE: ${val}`);
    }

    subscribeToBehavior() {
        const id = Math.floor(Math.random() * 100);
        this.behaviorLogs.push(`Listener ${id} joined!`);

        // Subscribe
        // Notice: This listener will IMMEDIATELY get the current value!
        this.myBehaviorSubject.subscribe(val => {
            this.behaviorLogs.push(`Listener ${id} received current state: ${val}`);
        });
    }

    ngOnDestroy() {
        // Ideally, we should unsubscribe here to prevent memory leaks!
        // But for this simple demo, we let it be.
    }
}
