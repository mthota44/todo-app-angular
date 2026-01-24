import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunicationChildComponent } from '../communication-child/communication-child.component';
import { CommunicationService } from '../services/communication.service';

/**
 * ==============================================================================
 * PARENT COMPONENT
 * ==============================================================================
 * 
 * This component acts as the orchestrator to demonstrate:
 * 1. Passing data DOWN to child ([property]="value")
 * 2. Receiving data UP from child ((event)="handler()")
 * 3. Accessing child directly (@ViewChild)
 * 4. Communicating through a Service
 */

@Component({
    selector: 'app-communication-parent',
    standalone: true,
    imports: [CommonModule, FormsModule, CommunicationChildComponent],
    templateUrl: './communication-parent.component.html',
    styleUrls: ['./communication-parent.component.css']
})
export class CommunicationParentComponent implements OnInit {

    // Data to send to child
    inputForChild: string = 'Initial Data from Parent';

    // Data received from child
    dataFromChild: string = 'Waiting for child...';

    // Data from Service
    serviceData: string = '';

    // ==========================================================================
    // 3. @ViewChild() - PARENT ACCESSING CHILD DIRECTLY
    // ==========================================================================
    // Use @ViewChild to get a reference to the child component instance.
    // This allows us to call child methods directly!
    @ViewChild(CommunicationChildComponent) childComponent!: CommunicationChildComponent;

    private communicationService = inject(CommunicationService);

    ngOnInit() {
        // Subscribe to service updates
        this.communicationService.currentMessage.subscribe(msg => this.serviceData = msg);
    }

    // Method to handle event coming from Child (@Output)
    handleChildEvent($event: string) {
        this.dataFromChild = $event;
        alert('Received event from Child: ' + $event);
    }

    // Method using @ViewChild to trigger a method inside the child
    triggerChildMethod() {
        this.childComponent.childGreet();
    }

    // Method to update service from Parent side
    updateService() {
        this.communicationService.changeMessage('Hello from Parent Component!');
    }
}
