import { SpeechRecognitionService } from '../services/speech-recognition.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'trv-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss']
})
export class SpeechComponent implements OnInit {
  buttonText = 'Play';
  interimData = '';
  finalData = new Array<string>();

  constructor(private speechService: SpeechRecognitionService) { }

  ngOnInit() {
    console.log('--ready to record--');
  }

  ngOnDestroy() {
    console.log('--destroying speech--');
    this.speechService.stopService();
  }

  toggleRecording(): void {
    if(this.buttonText === 'Play') {
      this.buttonText = 'Pause';
      this.speechService.startService()
        .subscribe(
          (value) => {
            console.log(value);
            if(value.interim !== '') {
              this.interimData = value.interim;
            }
            if(value.final !== '') {
              this.finalData.push(value.final);
            }
          },
          () => {
            console.log('--complete--');
          });
    } else {
      this.buttonText = 'Play';
      this.speechService.stopService();
    }
  }

}
