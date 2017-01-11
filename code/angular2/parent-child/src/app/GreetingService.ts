import { Injectable } from '@angular/core';

@Injectable()
export default class GreetingService {
  greetBack(greeting: string): string {
    return `${greeting}, and you!`;
  }
}
