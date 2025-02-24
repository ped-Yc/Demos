import {
  Component,
  computed,
  input,
  linkedSignal,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { SonComponent } from '@components/son/son.component';
import { EventBustService } from '@services/EventBust.service';

@Component({
  selector: 'app-father',
  imports: [SonComponent],
  templateUrl: './father.component.html',
  styleUrl: './father.component.scss',
})
export class FatherComponent implements OnInit {
  fatherVal = signal(100);
  fatherMsg = 'father message';

  computedSignal = computed(() => this.fatherVal() + this.fatherMsg);
  linkedSignal = linkedSignal(() => this.computedSignal());
  shippingOpitons = signal(['ground', 'air', 'sea']);
  selectedOption = linkedSignal(() => this.shippingOpitons()[0]);

  constructor(private eventBustService: EventBustService<string>) {}

  clickHandler($event: Event) {
    this.fatherVal.set(this.fatherVal() - 1);
    this.eventBustService.emitEvent(this.fatherMsg);
    console.log(this.linkedSignal());
  }

  handleChange($event: Event) {
    console.log($event);
  }

  sonMsgHandler($event: Event | string) {
    console.log($event);
    
  }

  async asyncFucn() {
    await this.fatherVal.update((val) => val + 100);
    console.log('async', this.fatherVal());
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.fatherVal.update((val) => val + 100);
      console.log('async', this.fatherVal());
    }, 3000);
  }
}
