import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild
} from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'pmt-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements AfterViewInit {
    @ViewChild('searchField')
    searchField: ElementRef<HTMLInputElement>;

    @Output()
    searchValueChanged = new EventEmitter<string>();

    constructor() {}

    ngAfterViewInit(): void {
        /* This will not create a memory leak as this component is never
       destroyed so the subscription is only created one time.
    */
        fromEvent(this.searchField.nativeElement, 'keypress')
            .pipe(debounceTime(250))
            .subscribe(() => {
                const searchValue = this.searchField.nativeElement.value;
                if (!!searchValue) {
                    this.searchValueChanged.emit(searchValue);
                }
            });
    }
}
