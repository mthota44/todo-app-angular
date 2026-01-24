import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-angular-basics',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './angular-basics.component.html',
    styleUrls: ['./angular-basics.component.css']
})
export class AngularBasicsComponent { }
