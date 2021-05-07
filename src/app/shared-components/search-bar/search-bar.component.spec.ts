import { async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule
      ],
      declarations: [ SearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the search value when input is added to the search', fakeAsync(() => {
    const emitSpy = spyOn(component.searchValueChanged, 'emit');
    const searchEl: HTMLInputElement = fixture.nativeElement.querySelector('input');
    searchEl.dispatchEvent(new KeyboardEvent('keypress',{ key: 'a' }));
    searchEl.value = 'a';
    tick(500);
    fixture.detectChanges();
    expect(emitSpy).toHaveBeenCalled();
  }));

  it('should wait 250 ms before emitting an event', fakeAsync(() => {
    const emitSpy = spyOn(component.searchValueChanged, 'emit');
    const searchEl: HTMLInputElement = fixture.nativeElement.querySelector('input');
    searchEl.dispatchEvent(new KeyboardEvent('keypress',{ key: 'a' }));
    searchEl.value = 'a';
    tick(100);
    flushMicrotasks();
    searchEl.dispatchEvent(new KeyboardEvent('keypress', { key: 'a' }));
    searchEl.value = 'aa';
    tick(250);
    fixture.detectChanges();
    expect(emitSpy).toHaveBeenCalledTimes(1);
  }));

  it('should not emit events if search field is empty', fakeAsync(() => {
    const emitSpy = spyOn(component.searchValueChanged, 'emit');
    const searchEl: HTMLInputElement = fixture.nativeElement.querySelector('input');
    searchEl.dispatchEvent(new KeyboardEvent('keypress',{ key: 'a' }));
    searchEl.value = 'a';
    tick(100);
    flushMicrotasks();
    searchEl.dispatchEvent(new KeyboardEvent('keypress', { key: 'a' }));
    searchEl.value = '';
    tick(250);
    fixture.detectChanges();
    expect(emitSpy).not.toHaveBeenCalled();
  }));
});
