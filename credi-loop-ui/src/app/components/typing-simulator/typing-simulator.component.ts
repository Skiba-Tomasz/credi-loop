import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typing-simulator',
  templateUrl: './typing-simulator.component.html',
  styleUrls: ['./typing-simulator.component.scss'],
  standalone: true,
})
export class TypingSimulatorComponent {
@Input() typingSpeed: number = 100; 
@Input() pauseDuration: number = 500;
@Input() words: string[] = [
    'Build trust',
    'CrediScore',
    'Lending Power',
    'Trusted Circles',
    'Smart Borrowing',
    'Credit Boost',
    'Trust Ladder',
    'Borrow with Confidence',
    'Credit Growth',
    'Lender Protection',
    'Risk-Free Lending',
    'Debt Management',
    'Reputation Score',
    'Interest Fairness',
    'Trust Factor',
    'Credit Insights',
    'Lender’s Choice',
    'Stable Borrowing',
    'Fair Loan Terms',
    'Responsible Lending',
  ]; 
  typedText: string = '';
  currentIndex: number = 0;
  currentWord: number = 0;
  reset: boolean = false;

  ngOnInit(): void {
    this.startTyping();
  }

  startTyping(): void {
    if(this.reset){
      this.currentWord ++;
      this.currentIndex = 0;
      this.typedText = '';
      this.reset = false;
    }
    const text = this.words[this.currentWord];
    if (this.currentIndex < text.length) {
      this.typedText += text.charAt(this.currentIndex);
      this.currentIndex++;
      setTimeout(() => this.startTyping(), this.typingSpeed);
    } else {
      setTimeout(() => this.startTyping(), this.pauseDuration);
      this.reset = true;
    }
    if(this.currentWord >= this.words.length - 1) {
      this.currentWord = 0;
    }
  }
}
