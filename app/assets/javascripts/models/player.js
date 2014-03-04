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

    farthestCursor: -1,

    leftFrameNumber: 0,

    moveDirName: ['up', 'right', 'down', 'left'],

    moveVector: [[-1, 0], [0, 1], [1, 0], [0,-1]],

    currentVector: [0, 0],

    checkPoints: [
      // Letter 'C'
      [0,5], [0,4], [0,3], [1,3], [1,2], [2,2], [2,1], [3,1], [3,0], [4,0], [5,0], [6,0], [6,1], [7,1], [7,2], [8,2], [8,3], [9,3], [9,4], [9,5],
      // Letter 'U'
      [0,7], [1,7], [2,7], [3,7], [4,7], [5,7], [6,7], [7,7], [7,8], [8,8], [8,9], [9,9], [9,10], [8,10], [8,11], [7,11], [7,12], [6,12], [5,12], [4,12], [3,12], [2,12], [1,12], [0,12],
      // Letter 'R'
      [9,14], [8,14], [7,14], [6,14], [5,14], [4,14], [3,14], [2,14], [1,14], [0,14], [0,15], [0,16], [0,17], [1,17], [1,18], [2,18], [2,19], [3,19], [3,18], [4,18], [4,17], [5,17], [5,16], [6,16], [7,16], [7,17], [8,17], [8,18], [9,18], [9,19],
      // Letter 'R'
      [9,21], [8,21], [7,21], [6,21], [5,21], [4,21], [3,21], [2,21], [1,21], [0,21], [0,22], [0,23], [0,24], [1,24], [1,25], [2,25], [2,26], [3,26], [3,25], [4,25], [4,24], [5,24], [5,23], [6,23], [7,23], [7,24], [8,24], [8,25], [9,25], [9,26],
      // Letter 'Y'
      [0,28], [1,28], [1,29], [2,29], [2,30], [3,30], [3,31], [4,31], [5,31], [6,31], [7,31], [8,31], [9,31], [8,31], [7,31], [6,31], [5,31], [4,31], [3,31], [3,32], [2,32], [2,33], [1,33], [1,34], [0,34]
    ],

    attributesMap: [
      { classPrefix: 'figure' },
      { className:   'figure-default' },
      { checkPosition: function(dir) {
          // 0 means invalid direction
          //-1 means valid direction to step back
          // 1 means valid direction to step forward
          if(dir == -1) return 0;

          if(this.currentCursor < this.checkPoints.length - 1 &&
             this.checkPoints[this.currentCursor][0] + this.moveVector[dir][0] == this.checkPoints[this.currentCursor+1][0] &&
             this.checkPoints[this.currentCursor][1] + this.moveVector[dir][1] == this.checkPoints[this.currentCursor+1][1]) return 1;

          if(this.currentCursor < this.checkPoints.length - 1 &&
             this.checkPoints[this.currentCursor+1][1] - this.checkPoints[this.currentCursor][1] > 1) return 1;

          if(this.currentCursor > 0 &&
             this.checkPoints[this.currentCursor][0] + this.moveVector[dir][0] == this.checkPoints[this.currentCursor-1][0] &&
             this.checkPoints[this.currentCursor][1] + this.moveVector[dir][1] == this.checkPoints[this.currentCursor-1][1]) return -1;

          return 0;
        }
      },
      { getCurrentPosition: function() {
          return this.currentPosition;
        }
      },
      { updateCurrentStatus: function(newDirection) {
          // Called first on key press, validate specified move, and initialize the move.
          if(newDirection === -1) return;

          if(this.currentDirection == -1) {
            var validation = this.checkPosition(newDirection);
            this.className = this.classPrefix + '-' + this.moveDirName[newDirection];
            if(validation) {
              this.currentDirection = newDirection;
              this.leftFrameNumber = validation * Curry.Constants.game.framePerBlock;
              this.currentVector[0] = (this.checkPoints[this.currentCursor+validation][0] - this.checkPoints[this.currentCursor][0])*this.imageSize/Curry.Constants.game.framePerBlock;
              this.currentVector[1] = (this.checkPoints[this.currentCursor+validation][1] - this.checkPoints[this.currentCursor][1])*this.imageSize/Curry.Constants.game.framePerBlock;
            }
          }
        }
      },
      { updateCurrentPath: function() {
          // When the moving animation has finished, add a 'path' div before player figure, forming a list of path points.
          var grid = {};
          if(this.currentCursor > this.farthestCursor) {
            this.farthestCursor = this.currentCursor;
            grid.id = this.farthestCursor;
            grid.position = this.checkPoints[this.farthestCursor];
            grid.size = this.imageSize;
          }

          return grid;
        }
      },
      { updateCurrentPosition: function() {
          // Do the actual move in frames. When the move finishes, update currentCursor to point to the new checkPoint.
          if(this.currentDirection == -1) return;

          this.currentPosition[0] += this.currentVector[0];
          this.currentPosition[1] += this.currentVector[1];
          var delta = (this.leftFrameNumber > 0) ? 1 : -1;
          this.leftFrameNumber -= delta;
          if(this.leftFrameNumber == 0) {
            // Using the sign of leftFrameNumber to decide next checkPoint, as leftFrameNumber was assigned with the same sign as validation, which actually makes the decision.
            this.currentCursor += delta;
            this.currentDirection = -1;
            if(this.currentCursor == this.checkPoints.length - 1) {
              // TODO: zanwen, Should trigger events in a more centralized way with eventManger or else.
              this.trigger('goalReached');
            }
          }
        }
      },
    ],
  });
}).call(this, jQuery);
