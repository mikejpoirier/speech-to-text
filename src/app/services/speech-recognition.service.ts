import { Observable } from 'rxjs/Rx';
import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

const FIRST_CHAR = /\S/;

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Injectable()
export class SpeechRecognitionService {
  private speechRecognition: any;

  constructor(private zone: NgZone) { }

  private capitalize(s): string {
    return s.replace(FIRST_CHAR, function(m) { return m.toUpperCase(); });
  }

  stopService() {
    console.log('--stopping recognition service--');
    this.speechRecognition.stop();
  }

  startService(): Observable<any> {
    console.log('--starting recognition service--');
    let phrase = { interim: '', final: '' };
    return Observable.create(observer => {
      const {webkitSpeechRecognition}: IWindow = <IWindow>window;
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;

      this.speechRecognition.onresult = speech => {
        if(speech.results) {
          const results = speech.results[speech.resultIndex];
          const transcript = _.trim(results[0].transcript);

          if(results[0].confidence > 0.3) {
            if(results.isFinal) {
              phrase = { interim: '', final: this.capitalize(transcript) };
            } else {
              phrase = { interim: transcript, final: '' };
            }
          }
        }
        this.zone.run(() => {
          console.log(phrase);
          observer.next(phrase);
        });
      };

      this.speechRecognition.onerror = error => {
        console.log(error);
        observer.error(error);
      };

      this.speechRecognition.onend = () => {
        console.log('--completing recognition--');
        observer.complete();
      };

      this.speechRecognition.start();
    });
  }

}
