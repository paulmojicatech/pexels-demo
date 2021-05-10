import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    Output,
    ViewChild
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'pmt-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements AfterViewInit, OnDestroy {
    @ViewChild('searchField')
    searchField: ElementRef<HTMLInputElement>;
    private _componentDestroyed$ = new Subject<void>();

    @Output()
    searchValueChanged = new EventEmitter<string>();

    constructor() {}

    ngAfterViewInit(): void {
        fromEvent(this.searchField.nativeElement, 'keydown')
            .pipe(
                debounceTime(250),
                takeUntil(this._componentDestroyed$)
            )
            .subscribe(() => {
                const searchValue = this.searchField.nativeElement.value;
                if (!!searchValue) {
                    this.searchValueChanged.emit(searchValue);
                }
            });
    }

    ngOnDestroy(): void {
        this._componentDestroyed$.next();
    }
}
