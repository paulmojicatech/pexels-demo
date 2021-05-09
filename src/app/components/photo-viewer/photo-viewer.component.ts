import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'pmt-photo-viewer',
    templateUrl: './photo-viewer.component.html',
    styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent {
    constructor(
        public dialogRef: MatDialogRef<PhotoViewerComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { photographer: string; imageUrl: string }
    ) {}

}
