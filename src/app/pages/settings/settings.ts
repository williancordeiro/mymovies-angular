import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-settings',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './settings.html',
})
export class Settings {}
