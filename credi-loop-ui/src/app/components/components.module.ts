import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TypingSimulatorComponent } from './typing-simulator/typing-simulator.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    TypingSimulatorComponent,
    TitleComponent,
  ],
  exports: [HeaderComponent, TypingSimulatorComponent, TitleComponent],
})
export class ComponentsModule {}
