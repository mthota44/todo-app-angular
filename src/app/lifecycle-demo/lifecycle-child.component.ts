import { Component, Input, OnChanges, OnInit, DoCheck, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ==============================================================================
 * ♻️ LIFECYCLE HOOKS EXPLAINED
 * ==============================================================================
 * 
 * Think of a Component like a human life:
 * 1. Born (Constructor)
 * 2. Gets Name/Props (ngOnChanges)
 * 3. Starts School/Life (ngOnInit)
 * 4. Checks Everything (ngDoCheck)
 * 5. Fully Grown/Visible (ngAfterViewInit)
 * 6. Dies (ngOnDestroy)
 * 
 * Open your Browser Console (F12) to see the logs!
 */

@Component({
    selector: 'app-lifecycle-child',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="child-box">
      <h4>👶 Child Component is ALIVE!</h4>
      <p>Data from Parent: <strong>{{ data }}</strong></p>
      <p><i>Check the Console logs to see the hooks firing.</i></p>
    </div>
  `,
    styles: [`
    .child-box {
      background: #E8F5E9;
      border: 2px solid #4CAF50;
      padding: 15px;
      margin-top: 10px;
      border-radius: 8px;
    }
  `]
})
export class LifecycleChildComponent implements OnChanges, OnInit, DoCheck, AfterViewInit, OnDestroy {

    @Input() data: string = '';

    constructor() {
        console.log('1. CONSTRUCTOR: The class is created. (Logic hasn\'t started yet)');
    }

    // Runs whenever @Input changes
    ngOnChanges(changes: SimpleChanges) {
        console.log('2. ngOnChanges: Input data changed!', changes['data'].currentValue);
    }

    // Runs ONCE after the component is initialized
    ngOnInit() {
        console.log('3. ngOnInit: Component is ready! Good place to call APIs.');
    }

    // Runs heavily - whenever Angular checks for changes
    ngDoCheck() {
        console.log('4. ngDoCheck: Angular is checking for changes...');
    }

    // Runs ONCE after the HTML (View) is fully loaded
    ngAfterViewInit() {
        console.log('5. ngAfterViewInit: HTML is fully visible on screen.');
    }

    // Runs ONCE just before the component leaves the screen
    ngOnDestroy() {
        console.log('6. ngOnDestroy: Component is leaving... Cleanup time! (Unsubscribe, etc.)');
        alert('💀 Child Component Destroyed!');
    }
}
