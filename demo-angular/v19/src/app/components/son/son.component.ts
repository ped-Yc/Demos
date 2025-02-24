import {
  Component,
  computed,
  input,
  model,
  output,
  DestroyRef,
  OnInit,
  OnDestroy,
  inject,
  Input,
} from '@angular/core';
import { EventBustService } from '@services/EventBust.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-son',
  imports: [],
  templateUrl: './son.component.html',
  styleUrl: './son.component.scss',
})
export class SonComponent {
  private eventSubscription: Subscription;
  private destroyRef = inject(DestroyRef);
  sonVal = model(10);
  sonMsg = output<string>();
  fatherComputedSignal = input();
  fatherLinkedSignal = input<any>();
  // @Input() fatherLinkedSignal: any;

  constructor(private eventBus: EventBustService<string>) {
    this.eventSubscription = new Subscription();
  }

  add() {
    this.sonVal.update((oldval) => oldval + 1);
    this.sonMsg.emit('Son Message');
  }

  ngOnInit() {
    this.eventSubscription = this.eventBus.subscribeToEvent((msg) => {
      console.log(msg);
    });
  }

  ngOnDestroy() {
    // this.eventSubscription.unsubscribe();
  }
}
