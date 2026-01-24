import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Day5Service } from './day5.service';

@Component({
    selector: 'app-day5',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './day5.component.html',
    styleUrl: './day5.component.css'
})
export class Day5Component implements OnInit {
    private day5Service = inject(Day5Service);
    private fb = inject(FormBuilder);

    objects: any[] = [];
    selectedObjectId: string | null = null;
    loading = false;
    error: string | null = null;

    // Form for Creating/Updating objects
    objectForm: FormGroup = this.fb.group({
        name: ['', Validators.required],
        color: [''],
        price: ['']
    });

    ngOnInit(): void {
        this.fetchObjects();
    }

    fetchObjects() {
        this.loading = true;
        this.error = null;
        this.day5Service.getObjects().subscribe({
            next: (data) => {
                this.objects = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching objects', err);
                this.error = 'Failed to fetch objects';
                this.loading = false;
            }
        });
    }

    onSubmit() {
        if (this.objectForm.invalid) return;

        const formValue = this.objectForm.value;
        const payload = {
            name: formValue.name,
            data: {
                color: formValue.color,
                price: formValue.price
            }
        };

        if (this.selectedObjectId) {
            this.updateObject(this.selectedObjectId, payload);
        } else {
            this.createObject(payload);
        }
    }

    // Helper to identify system objects (Ids 1-13)
    isSystemObject(id: string): boolean {
        // Check if id is a small number (1-100 to be safe, or just 1-50)
        // System IDs are usually "1", "2", ... "13"
        const numId = parseInt(id, 10);
        return !isNaN(numId) && numId > 0 && numId <= 20;
    }

    createObject(payload: any) {
        this.loading = true;
        this.day5Service.createObject(payload).subscribe({
            next: (res: any) => {
                console.log('Created:', res);
                this.objects.push(res);
                this.resetForm();
                this.loading = false;
                alert('Product created successfully!');
            },
            error: (err) => {
                console.error('Error creating object', err);
                this.error = 'Failed to create object';
                this.loading = false;
                alert('Error: ' + (err.error?.error || err.message || 'Unknown error'));
            }
        });
    }

    updateObject(id: string, payload: any) {
        this.loading = true;
        this.day5Service.updateObject(id, payload).subscribe({
            next: (res: any) => {
                console.log('Updated:', res);
                const index = this.objects.findIndex(o => o.id === id);
                if (index !== -1) {
                    this.objects[index] = { ...this.objects[index], ...res };
                }
                this.resetForm();
                this.loading = false;
                alert('Product updated successfully!');
            },
            error: (err) => {
                console.error('Error updating object', err);

                if (err.status === 405 || this.isSystemObject(id)) {
                    // Fail-safe for system objects modification
                    console.warn('Server rejected update (System Object). Updating locally.');
                    const index = this.objects.findIndex(o => o.id === id);
                    if (index !== -1) {
                        this.objects[index] = {
                            ...this.objects[index],
                            name: payload.name,
                            data: payload.data
                        };
                    }
                    this.resetForm();
                    this.loading = false;
                    alert('Note: System Objects cannot be changed on the server. Updated locally for demo.');
                } else {
                    this.error = 'Failed to update object';
                    this.loading = false;
                    alert('Error updating: ' + (err.error?.error || err.statusText || 'Unknown error'));
                }
            }
        });
    }

    deleteObject(id: string) {
        if (!confirm('Are you sure you want to delete this item?')) return;

        this.loading = true;
        this.day5Service.deleteObject(id).subscribe({
            next: (res) => {
                console.log('Deleted:', res);
                this.objects = this.objects.filter(o => o.id !== id);
                this.loading = false;
                alert('Product deleted successfully!');
            },
            error: (err) => {
                // Special handling for System Objects (405 Method Not Allowed)
                console.error('Error deleting object', err);

                if (err.status === 405 || this.isSystemObject(id)) {
                    this.objects = this.objects.filter(o => o.id !== id);
                    this.loading = false;
                    alert('Note: This System Object cannot be deleted from the server, but it has been removed from your local list.');
                } else {
                    this.error = 'Failed to delete object.';
                    this.loading = false;
                    alert('Error deleting: ' + (err.error?.error || err.statusText || 'Unknown error'));
                }
            }
        });
    }

    editObject(obj: any) {
        this.selectedObjectId = obj.id;
        this.objectForm.patchValue({
            name: obj.name,
            color: obj.data?.color || '',
            price: obj.data?.price || ''
        });
    }

    resetForm() {
        this.selectedObjectId = null;
        this.objectForm.reset();
    }
}
