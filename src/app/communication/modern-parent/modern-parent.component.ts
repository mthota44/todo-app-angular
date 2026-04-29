import { Component, signal, computed, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModernChildComponent } from '../modern-child/modern-child.component';

@Component({
  selector: 'app-modern-parent',
  standalone: true,
  imports: [CommonModule, FormsModule, ModernChildComponent],
  templateUrl: './modern-parent.component.html',
  styleUrl: './modern-parent.component.css'
})
export class ModernParentComponent {

  // ==========================================
  // SIGNALS EXPLANATION DEMO DATA
  // ==========================================

  // 1. Basics: Writable Signal
  basicSignal = signal<number>(0);

  incrementBasic() {
    this.basicSignal.update(val => val + 1);
  }

  setBasic() {
    this.basicSignal.set(100);
  }

  // 2. Computed Signal (Derived State)
  // Re-evaluates only when `basicSignal` changes, otherwise returns cached value.
  computedSignal = computed(() => {
    return `The basic signal is now ${this.basicSignal()} and doubled it is ${this.basicSignal() * 2}`;
  });

  // 3. Effects & Edge Cases
  effectLog: string[] = [];
  
  // A secondary signal to demonstrate untracked
  secondarySignal = signal<string>('Initial');

  constructor() {
    // Basic Effect: Runs when any signal inside it changes
    effect(() => {
      const basicVal = this.basicSignal();
      // To prevent infinite loops or unwanted triggers, we can read signals without tracking them
      const secVal = untracked(() => this.secondarySignal());
      
      const logMsg = `Effect ran! basicSignal changed to: ${basicVal}. (secondarySignal read without tracking: ${secVal})`;
      
      // We push to a standard array to display the log
      this.effectLog.push(logMsg);
    });
  }

  updateSecondary() {
    this.secondarySignal.set('Updated at ' + new Date().toLocaleTimeString());
  }

  // 4. Equality Edge Case
  // Sometimes objects change reference but data is same, or vice versa.
  userSignal = signal({ id: 1, name: 'John' }, {
    // Custom equality check: only trigger updates if 'id' changes
    equal: (a, b) => a.id === b.id
  });

  updateUserSameId() {
    // Will NOT trigger UI update because id is still 1
    this.userSignal.set({ id: 1, name: 'Johnny' });
  }

  updateUserDifferentId() {
    // WILL trigger UI update
    this.userSignal.set({ id: 2, name: 'Jane' });
  }

  // ==========================================
  // EXISTING COMPONENT COMMUNICATION DEMO
  // ==========================================
  parentMessage: string = 'Hello Signals!';
  counter: number = 10;
  lastLog: string = '';

  handleRing(msg: string) {
    this.lastLog = msg;
  }
}
