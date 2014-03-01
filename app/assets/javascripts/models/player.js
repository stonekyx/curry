(function($){
  /**
   * @class: HomeView implemets the page logic of home page.
   */
  Curry.Models.GamePlayer = Curry.Models.BaseModel.extend({
    name: 'gamePlayer',

    readOnly: false,

    imageSize: 26,

    deltaPerInterval: 1.3,  // imageSize / framePerBlock = 1.3

    currentPosition: [0, 130],

    currentDirection: -1,

    currentCursor: 0,

    farthestCursor: 0,

    leftFrameNumber: 0,

    moveDirName: ['up', 'right', 'down', 'left'],

    moveVector: [[-1, 0], [0, 1], [1, 0], [0,-1]],

    checkPoints: [
      // Letter 'C'
      [0,5], [0,4], [0,3], [1,3], [1,2], [2,2], [2,1], [3,1], [3,0], [4,0], [5,0], [6,0], [6,1], [7,1], [7,2], [8,2], [8,3], [9,3], [9,4], [9,5],
      // Letter 'U'
      // Letter 'R'
      // Letter 'R'
      // Letter 'Y'
      [100, 100]
    ],

    attributesMap: [
      { classPrefix: 'figure' },
      { className:   'figure-default' },
      { checkPosition: function(dir) {
          // 0 means invalid direction
          //-1 means valid direction to step back
          // 1 means valid direction to step forward
          if(dir == -1) return 0;

          if(this.currentCursor > 0 &&
             this.checkPoints[this.currentCursor][0] + this.moveVector[dir][0] == this.checkPoints[this.currentCursor-1][0] &&
             this.checkPoints[this.currentCursor][1] + this.moveVector[dir][1] == this.checkPoints[this.currentCursor-1][1]) return -1;

          if(this.currentCursor < this.checkPoints.length - 1 &&
             this.checkPoints[this.currentCursor][0] + this.moveVector[dir][0] == this.checkPoints[this.currentCursor+1][0] &&
             this.checkPoints[this.currentCursor][1] + this.moveVector[dir][1] == this.checkPoints[this.currentCursor+1][1]) return 1;

          return 0;
        }
      },
      { getCurrentStatus: function() {
          return this.currentDirection;
        }
      },
      { getCurrentPosition: function() {
          return this.currentPosition;
        }
      },
      { updateCurrentStatus: function(newDirection) {
          if(this.currentDirection == -1) {
            var validation = this.checkPosition(newDirection);
            if(validation) {
              this.currentDirection = newDirection;
              this.className = this.classPrefix + '-' + this.moveDirName[newDirection];
              this.leftFrameNumber = validation * Curry.Constants.game.framePerBlock;
            }
          }
        }
      },
      { updateCurrentPath: function() {
          var grid = {};
          if(this.currentCursor > this.farthestCursor) {
            grid.id = this.farthestCursor;
            grid.position = this.checkPoints[this.farthestCursor];
            grid.size = this.imageSize;
            this.farthestCursor = this.currentCursor;
          }

          return grid;
        }
      },
      { updateCurrentPosition: function() {
          if(this.currentDirection == -1) return;

          this.currentPosition[0] += this.moveVector[this.currentDirection][0] * this.deltaPerInterval;
          this.currentPosition[1] += this.moveVector[this.currentDirection][1] * this.deltaPerInterval;
          var delta = (this.leftFrameNumber > 0) ? 1 : -1;
          this.leftFrameNumber -= delta;
          if(this.leftFrameNumber == 0) {
            this.currentCursor += delta;
            this.currentDirection = -1;
            if(this.currentCursor == this.checkPoints.length - 1) {
              // Should go to the end of the game, but cannot complete it in player model part. Perhaps trigger event...
            }
          }
        }
      },
    ],
  });
}).call(this, jQuery);
