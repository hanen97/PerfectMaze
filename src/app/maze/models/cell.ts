
 export class Cell {
    
    constructor(
      public readonly row: number = 0,
      public readonly col: number = 0,
      public northWall: boolean = true,
      public eastWall: boolean = true,
      public westWall: boolean = true,
      public southWall: boolean = true,
      public traversed: boolean = false
    ) {}
  
    hasVisited(): boolean {
      return (
        !this.northWall || !this.eastWall || !this.westWall || !this.southWall
      );
    }
  
    breakWallWith(another: Cell) {
      if (this.row === another.row) {
        if (this.col - 1 === another.col) {
          this.westWall = false;
          another.eastWall = false;
          return;
        }
        if (this.col + 1 === another.col) {
          this.eastWall = false;
          another.westWall = false;
          return;
        }
      }
      if (this.col === another.col) {
        if (this.row - 1 === another.row) {
          this.northWall = false;
          another.southWall = false;
          return;
        }
        if (this.row + 1 === another.row) {
          this.southWall = false;
          another.northWall = false;
          return;
        }
      }
      throw new Error('These two cells are not neighbors.');
    }
  
    draw(
      ctx: CanvasRenderingContext2D,
      length: number,
      cellBackground = '#FFFFFF'
    ) {
      ctx.fillStyle = cellBackground;
      ctx.fillRect(
        this.col * length,
        this.row * length,
        (this.col + 1) * length,
        (this.row + 1) * length
      );
      if (this.northWall) {
        ctx.beginPath();
        ctx.moveTo(this.col * length, this.row * length);
        ctx.lineTo((this.col + 1) * length, this.row * length);
        ctx.stroke();
      }
      if (this.eastWall) {
        ctx.beginPath();
        ctx.moveTo((this.col + 1) * length, this.row * length);
        ctx.lineTo((this.col + 1) * length, (this.row + 1) * length);
        ctx.stroke();
      }
      if (this.southWall) {
        ctx.beginPath();
        ctx.moveTo((this.col + 1) * length, (this.row + 1) * length);
        ctx.lineTo(this.col * length, (this.row + 1) * length);
        ctx.stroke();
      }
      if (this.westWall) {
        ctx.beginPath();
        ctx.moveTo(this.col * length, (this.row + 1) * length);
        ctx.lineTo(this.col * length, this.row * length);
        ctx.stroke();
      }
    }
  
    equals(another: Cell): boolean {
      return this.row === another.row && this.col === another.col;
    }
  
    hasConnectionWith(another: Cell): boolean {
      if (this.row === another.row) {
        if (this.col - 1 === another.col) {
          if (this.westWall === false && another.eastWall === false) {
            return true;
          }
        }
        if (this.col + 1 === another.col) {
          if (this.eastWall === false && another.westWall === false) {
            return true;
          }
        }
      }
      if (this.col === another.col) {
        if (this.row - 1 === another.row) {
          if (this.northWall === false && another.southWall === false) {
            return true;
          }
        }
        if (this.row + 1 === another.row) {
          if (this.southWall === false && another.northWall === false) {
            return true;
          }
        }
      }
      return false;
    }
  }
  