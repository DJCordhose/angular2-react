import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<sub greeting={{greeting}} (onSend)="sent($event)"></sub>`
})
export class AppComponent {
  greeting = 'Hiho';

  sent(greeting) {
    console.log(`Sent: ${greeting}`);
    this.greeting = `${greeting}, and you!`
  }
}
