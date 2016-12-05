import { SandboxPage } from './app.po';

describe('sandbox App', function() {
  let page: SandboxPage;

  beforeEach(() => {
    page = new SandboxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
