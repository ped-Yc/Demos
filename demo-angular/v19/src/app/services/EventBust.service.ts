import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventBustService<T> {
  private eventSubject: Subject<T> = new Subject<T>();
  private destroy$: Subject<void> = new Subject<void>();

  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log(`订阅取消`);
  }

  emitEvent(event: T): void {
    this.eventSubject.next(event);
  }

  subscribeToEvent(next: (event: T) => void): Subscription {
    const subscription = this.eventSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe(next);
    return subscription;
  }
}
