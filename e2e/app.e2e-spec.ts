import { SpeechToTextPage } from './app.po';

describe('speech-to-text App', () => {
  let page: SpeechToTextPage;

  beforeEach(() => {
    page = new SpeechToTextPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('trv works!');
  });
});
