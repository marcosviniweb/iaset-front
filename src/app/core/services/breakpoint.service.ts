import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private breakPoint = inject(BreakpointObserver)
  private screenSizes =   [ 
    '(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)',
    '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',
    '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',
     '(min-width: 834px) and (max-width: 1023.98px) and (orientation: portrait), (min-width: 1194px) and (max-width: 1365.98px) and (orientation: landscape)',
     '(min-width: 1024px) and (max-width: 1279.98px) and (orientation: portrait), min-width: 1366px) and (max-width: 1700px) and (orientation: landscape)'
  ]
  

  getScreenInfo(){
   return  this.breakPoint.observe(this.screenSizes)
  }
}
