import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sub',
  template: `
<input [(ngModel)]="greeting" #in>
<p>{{greeting}}, World</p>
<button (click)="reset(in)">Clear</button>
<button (click)="send()">Send</button>
`,
})
export class SubComponent {
  @Input() greeting: string;
  @Output() onSend = new EventEmitter();
  reset(input: HTMLInputElement) {
    this.greeting = '';
    input.focus();
  }

  send() {
    this.onSend.emit(this.greeting);
  }
}
