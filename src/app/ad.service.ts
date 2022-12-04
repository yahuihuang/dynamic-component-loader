import { Injectable } from '@angular/core';

import { HeroJobAdComponent } from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';
import { AdItem } from './ad-item';

@Injectable()
export class AdService {
  getAds() {
    return [
      new AdItem(
        HeroProfileComponent,
        { name: 'Grace', bio: 'Brave as they come' }
      ),
      new AdItem(
        HeroProfileComponent,
        { name: 'Kevin', bio: 'Smart as they come' }
      ),
      new AdItem(
        HeroJobAdComponent,
        { headline: 'Amber', body: 'Submit your resume today!' }
      ),
      new AdItem(
        HeroJobAdComponent,
        { headline: 'Austin', body: 'Apply today' }
      )
    ];
  }
}
