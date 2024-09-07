import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { bootstrapOption, bootstrapPercent } from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { HeaderComponent } from './header/header.component';
import { StatsComponent } from './stats/stats.component';
import { TitleComponent } from './title/title.component';
import { TypingSimulatorComponent } from './typing-simulator/typing-simulator.component';
import { lucideHandCoins } from '@ng-icons/lucide';
import { tdesignBrowseGallery } from '@ng-icons/tdesign-icons';
import { iconoirCoinsSwap } from '@ng-icons/iconoir';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule,
    HeaderComponent,
    TypingSimulatorComponent,
    TitleComponent,
    NgApexchartsModule,
    NgIconsModule.withIcons({
      bootstrapPercent,
      lucideHandCoins,
      tdesignBrowseGallery,
      iconoirCoinsSwap,
      bootstrapOption,
    }),
  ],
  exports: [
    HeaderComponent,
    TypingSimulatorComponent,
    TitleComponent,
    StatsComponent,
  ],
})
export class ComponentsModule {}
