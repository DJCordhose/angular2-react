import { Component } from '@angular/core';
import GreetingService from './GreetingService';

@Component({
  selector: 'app-root',
  template: `<sub greeting={{greeting}} (onSend)="sent($event)"></sub>`
})
export class AppComponent {
  greeting = 'Hiho';

  constructor(private greetingService: GreetingService) {
  }

  sent(greeting) {
    console.log(`Sent: ${greeting}`);
    this.greeting = this.greetingService.greetBack(greeting);
  }
}
