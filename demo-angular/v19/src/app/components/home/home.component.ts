import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FatherComponent } from '@components/father/father.component';
import { CalculatorService } from '@services/Calculator.service';
import { CardComponent } from '@components/card/card.component';

@Component({
  selector: 'app-home',
  imports: [FatherComponent, CardComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  nameList: WritableSignal<string[]> = signal(['John', 'Jane', 'Bob']);
  private calculator = inject(CalculatorService);
  sum = this.calculator.add(5, 10);

  ngAfterViewInit() {
    console.log('calculator', this.calculator);
    console.log(this.nameList);
    console.log(this.nameList());
  }
}
