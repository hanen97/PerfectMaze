import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Maze } from './models/maze';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit, AfterViewInit {
  private maze: Maze;
  private canvas: HTMLCanvasElement;
  height = Number(localStorage.getItem("height"));
  width = Number(localStorage.getItem("width"));
  cellSize = 20;
  private ctx: CanvasRenderingContext2D;

  constructor() { }
  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('maze');
    this.ctx = this.canvas.getContext('2d');
    this.drawMaze();
  }
  ngOnInit() {
  }
  drawMaze() {
    this.maze = new Maze(this.height, this.width, this.cellSize, this.ctx);
    this.canvas.width = this.width * this.cellSize;
    this.canvas.height = this.height * this.cellSize;
    this.maze.draw();
  }
}
