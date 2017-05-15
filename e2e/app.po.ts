import { browser, by, element } from 'protractor';

export class SpeechToTextPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('trv-root h1')).getText();
  }
}
