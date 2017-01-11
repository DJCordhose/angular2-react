import GreetingService from './GreetingService';
import {inject, TestBed} from '@angular/core/testing';

describe('GreetingService', function() {
  let greetingService: GreetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GreetingService]
    });
  });

  beforeEach(inject([GreetingService], (s: GreetingService) => {
    greetingService = s;
  }));

  it('should properly greet back', () => {
    expect(greetingService.greetBack('nice day')).toEqual('nice day, and you!');
  });
});
