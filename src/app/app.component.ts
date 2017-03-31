import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  teste(){
    this.title = Date.now().toString()
  }

  exibe(msg)
  {
    alert(msg);
  }
}
