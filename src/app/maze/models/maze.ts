import { Cell } from './cell';
export class Maze {
  public readonly cells: Array<Array<Cell>> = [];
  private readonly cellBackground = '#FFFFFF';
  constructor(
    public nRow: number,
    public nCol: number,
    public cellSize: number,
    public ctx: CanvasRenderingContext2D
  ) {
    // initialize cells
    for (let i = 0; i < nRow; i++) {
      this.cells[i] = [];
      for (let j = 0; j < nCol; j++) {
        this.cells[i][j] = new Cell(i, j);
      }
    }

    // generate maze
    const current = this.cells[RandomNumber.within(this.nRow)][
      RandomNumber.within(this.nCol)
    ];
    this.huntAndKill(current);
  }

  draw(lineThickness = 2) {
    this.ctx.lineWidth = lineThickness;
    this.cells.forEach((x) =>
      x.forEach((c) => {
        c.draw(this.ctx, this.cellSize, this.cellBackground);
      })
    );
    
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.cellBackground;
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, this.cellSize);
    this.ctx.moveTo(this.nCol * this.cellSize, (this.nRow - 1) * this.cellSize);
    this.ctx.lineTo(this.nCol * this.cellSize, this.nRow * this.cellSize);
    this.ctx.stroke();
    this.ctx.restore();
  }

  private huntAndKill(current: Cell) {
    const unvisitedNeighbors = this.getNeighbors(current).filter(
      (c) => !c.hasVisited()
    );
    if (unvisitedNeighbors.length === 0) {
      // Hunt
      const randomRows = this.shufflearray([...Array(this.nRow).keys()]);
      for (let huntRow of randomRows) {
        const randomColumns = this.shufflearray([...Array(this.nCol).keys()]);
        for (let huntColumn of randomColumns) {
          current = this.cells[huntRow][huntColumn];
          if (current.hasVisited()) {
            continue;
          }
          const visitedNeighbors = this.getNeighbors(current).filter((c) =>
            c.hasVisited()
          );
          if (visitedNeighbors.length < 1) {
            continue;
          }
          const nextCell =
            visitedNeighbors[RandomNumber.within(visitedNeighbors.length)];
          current.breakWallWith(nextCell);
          this.huntAndKill(nextCell);
        }
      }
    } else {
      // Kill
      const nextCell =
        unvisitedNeighbors[RandomNumber.within(unvisitedNeighbors.length)];
      current.breakWallWith(nextCell);
      this.huntAndKill(nextCell);
    }
  }

  private getNeighbors(cell: Cell): Array<Cell> {
    const neighbors = [];
    if (cell.row - 1 >= 0) {
      neighbors.push(this.cells[cell.row - 1][cell.col]);
    }
    if (cell.row + 1 < this.nRow) {
      neighbors.push(this.cells[cell.row + 1][cell.col]);
    }
    if (cell.col - 1 >= 0) {
      neighbors.push(this.cells[cell.row][cell.col - 1]);
    }
    if (cell.col + 1 < this.nCol) {
      neighbors.push(this.cells[cell.row][cell.col + 1]);
    }
    return neighbors;
  }
  private shufflearray(array: number[]): number[] {
    let currentIndex = array.length;
    while (0 !== currentIndex) {
      const temp = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[temp]] = [array[temp], array[currentIndex]];
    }
    return array;
  }
}

class RandomNumber {
  static within(n: number): number {
    return Math.floor(Math.random() * n);
  }
}
