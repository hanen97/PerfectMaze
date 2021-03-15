import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  @Input() width;
  @Input() height;

  title = 'PerfectMaze';
  hidden = true;
  constructor(private router: Router) {}
  ngOnInit() {
    this.hidden = true;
   }

 checkRequiredFields() {
   
  if(!isNaN(Number(this.width)) && !isNaN(Number(this.height))){
  console.log('c est ok');
  this.hidden = true;

  this.gotoHome()
  } else{
    this.hidden = false;
    console.log('Not a Number');
  }
  
 }
  gotoHome(){
    localStorage.setItem('width', this.width.toString() );
    localStorage.setItem('height', this.height.toString() );
    this.router.navigate(['/maze']);  
  }
}
