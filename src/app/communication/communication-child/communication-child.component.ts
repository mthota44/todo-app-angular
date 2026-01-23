import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationService } from '../services/communication.service';

/**
 * ==============================================================================
 * CHILD COMPONENT
 * ==============================================================================
 * 
 * This component demonstrates:
 * 1. Receiving data via @Input (Parent -> Child)
 * 2. Sending data via @Output (Child -> Parent)
 * 3. Consuming data from a Shared Service
 * 4. Reacting to changes with ngOnChanges
 */

@Component({
    selector: 'app-communication-child',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="child-box">
      <h3>👶 Child Component</h3>
      
      <!-- 1. DISPLAYING INPUT FROM PARENT -->
      <div class="section">
        <strong>1. Input from Parent (&#64;Input):</strong>
        <p class="highlight">{{ parentData }}</p>
      </div>

      <!-- 2. SENDING DATA TO PARENT -->
      <div class="section">
        <strong>2. Send to Parent (&#64;Output):</strong><br>
        <input #childInput type="text" placeholder="Type message for parent...">
        <button (click)="sendMessageToParent(childInput.value)">Send Event</button>
      </div>

      <!-- 3. SHARED SERVICE DATA -->
      <div class="section">
        <strong>3. Shared Service Data:</strong>
        <p class="highlight">{{ sharedMessage }}</p>
        <button (click)="updateServiceData()">Update Service Data</button>
      </div>

      <!-- FOR VIEWCHILD DEMO -->
      <div class="section">
        <strong>4. ViewChild Demo:</strong>
        <p><i>Parent can trigger 'childGreet()' method here.</i></p>
        <p *ngIf="greetMessage" class="greet-msg">{{ greetMessage }}</p>
      </div>
    </div>
  `,
    styles: [`
    .child-box {
      border: 2px solid #2196F3;
      background-color: #E3F2FD;
      padding: 20px;
      margin: 10px;
      border-radius: 8px;
    }
    .section { margin-bottom: 15px; border-bottom: 1px dashed #90CAF9; padding-bottom: 10px; }
    .highlight { color: #D32F2F; font-weight: bold; }
    .greet-msg { background: yellow; padding: 5px; animation: fade 2s; }
  `]
})
export class CommunicationChildComponent implements OnChanges {

    // ==========================================================================
    // 1. @Input() - PARENT TO CHILD
    // ==========================================================================
    // @Input acts as a door for data to enter from the parent.
    // Parent HTML: <app-child [parentData]="parentValue"></app-child>
    @Input() parentData: string = '';

    // ==========================================================================
    // 2. @Output() - CHILD TO PARENT
    // ==========================================================================
    // @Output acts as a doorway for events/data to exit to the parent.
    // We use EventEmitter to create a custom event.
    // Parent HTML: <app-child (childEvent)="handleChildEvent($event)"></app-child>
    @Output() childEvent = new EventEmitter<string>();


    // Variable to store service data
    sharedMessage: string = '';
    // Variable for ViewChild demo
    greetMessage: string = '';

    constructor(private communicationService: CommunicationService) {
        // Subscribe to the shared service to get real-time updates
        this.communicationService.currentMessage.subscribe(message => {
            this.sharedMessage = message;
        });
    }

    // ==========================================================================
    // LIFECYCLE HOOK: ngOnChanges
    // ==========================================================================
    // This method runs whenever an @Input value changes.
    // This is how you "React on Getting" data.
    ngOnChanges(changes: SimpleChanges) {
        if (changes['parentData']) {
            console.log('NG_ON_CHANGES: Parent data changed:', changes['parentData'].currentValue);
            // You can do logic here when parent sends new data
        }
    }

    // Method to emit data to parent
    sendMessageToParent(value: string) {
        // emit() sends the value to the parent "listener"
        this.childEvent.emit(value);
    }

    // Method to update shared service (everyone listening gets this)
    updateServiceData() {
        this.communicationService.changeMessage('Hello from Child Component!');
    }

    // ==========================================================================
    // FOR @ViewChild DEMO
    // ==========================================================================
    // This method is public, so the Parent can call it directly using @ViewChild
    childGreet() {
        this.greetMessage = "👋 Parent waved at me using @ViewChild!";
        setTimeout(() => this.greetMessage = '', 3000); // Clear after 3s
    }
}
