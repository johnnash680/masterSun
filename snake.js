<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Игра "Змейка"</title>
</head>
<body>
	<canvas id="canvas" width="500" height="500"></canvas>
	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.0.js"></script>
	<script type="text/javascript">
		
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		
		// получаем ширину и высоту элемента "холста"
		var width = canvas.width;
		var height = canvas.height;

		// разделим холст на невидимые ячейки
		// получем ширину и высоту "холста" в ячейках 
		var blockSize = 10;
		var widthInBlock = width/blockSize;
		var heightInBlock = height/blockSize;

		// переменная подсчёта очков
		var score = 0;

		// рисуем рамку
		function drawBorder () {
			ctx.fillStyle = "Grey";
			ctx.fillRect(0, 0, width, blockSize);
			ctx.fillRect(0, height - blockSize, width, blockSize);
			ctx.fillRect(0, 0, blockSize, height);
			ctx.fillRect(width - blockSize, 0, blockSize, height);
		};

		// отображение счёта
		function drawScore () {
			ctx.font = "20px Courier";
			ctx.fillStyle = "Black";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText("Score: " + score, blockSize, blockSize);
		};

		// отменяем действие setnterval по id: конец игры, змейка врезается в рамку или в свой хвост
		function gameOver () {
		  	clearTimeout();
			ctx.font = "60px Courier";
			ctx.fillStyle = "Black";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("GAME OVER", width/2, height/2);
		};

		// рисуем окружность
		var circle = function(x, y, r, fillCircle) {
		 	ctx.beginPath();
		 	ctx.arc(x, y, r, 0, Math.PI*2, false);
		 	if (fillCircle) {
		 		ctx.fill();
		 	} else {
		 		ctx.stroke();
		 	}
		};

		// конструктор ячеек
		function Block (col, row) {
		 	// col - column
		 	// row - string
		 	this.col = col;
		 	this.row = row;
		};

		// рисуем квадрат в нужной ячейке (будущая часть тела змейки)
		Block.prototype.drawSquare = function(color) {
		 	var x = this.col * blockSize;
		 	var y = this.row * blockSize;
		 	ctx.fillStyle = color;
		 	ctx.fillRect(x, y, blockSize, blockSize);
		};

		// рискем круг в нужной ячейке (будущее яблоко)
		Block.prototype.drawCircle = function (color) {
		 	var centerX = this.col * blockSize + blockSize/2;
		 	var centerY = this.row * blockSize + blockSize/2;
		 	ctx.fillStyle = color;
		 	circle(centerX, centerY, blockSize/2, true);
		};

		// проверка - змейка съела яблоко или свой собственный хвост:
		// находится ли эта ячейка в той же позиции, что и ячейка otherBlock
		Block.prototype.equal = function (otherBlock) {
		 	return this.col === otherBlock.col && this.row === otherBlock.row
		};

		// создадим конструктор змейки
		function Snake () {
			// создадим сегменты тела змейки
			this.segments = [
				new Block(7, 5),
				new Block(6, 5),
				new Block(5, 5)
			];
			// направления движения
			this.direction = "right";
			this.nextDirection = "right";
		};

		// рисуем змейку: квадратик для каждого сегмента тела змейки
		Snake.prototype.draw = function () {
			for (var i = 0; i < this.segments.length; i++) {
				this.segments[0].drawSquare("DarkRed");	
				
				if (i % 2 == 0) { // проверка на чётность i
				this.segments[i].drawSquare("Black");
				} else { // нечётные i
				this.segments[i].drawSquare("Yellow");
				}
			}
		};

		// перемещаем змейку: создаём новую голову и добавляем её к началу змейки,
		// чтобы передвинуть змейку в текущем направлении
		Snake.prototype.move = function () {
			var head = this.segments[0]; 
			var newHead; // создание новой головы

			this.direction = this.nextDirection;

			if (this.direction === "right") {
				newHead = new Block(head.col + 1, head.row);
			} else if (this.direction === "down") {
				newHead = new Block(head.col, head.row + 1);
			} else if (this.direction === "left") {
				newHead = new Block(head.col - 1, head.row);
			} else if(this.direction === "up") {
				newHead = new Block(head.col, head.row - 1);
			}

			// проверка столкновения и добавление головы
			if (this.checkCollision(newHead)) {
				gameOver();
				return; // приведёт к раннему возврату из метода и остальной код не будет выполнен
						// конец игры === game over
			}

			this.segments.unshift(newHead); // добавление новой головы в массив segments, пока змейка
											// не столкнётся со стеной или со своим хвостом
			if (newHead.equal(apple.position)) {
				score++;
				apple.move();
				animationTime -= 3; // увеличение скорости змейки с каждым съеденным яблоком
			} else {
				this.segments.pop();
			}
		};

		// добавим метод checkCollision
		Snake.prototype.checkCollision = function (head) {
			// определяем, когда движение змейки превратится в столкновение со стенами
			var leftCollision = (head.col === 0);
			var topCollision = (head.row === 0);
			var rightCollision = (head.col === widthInBlock - 1);
			var bottomCollision = (head.row === heightInBlock - 1);

			// определяем, столкнулась ли змейка с какой-нибудь из стенок
			var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

			// столкновение с хвостом
			var selfCollision = false;

			// перебор всех сегментов змейки и проверка, не находится ли какой-нибудь из
			// сегментов в том же месте, что и новая голова змейки - head.equal
			for (var i = 0; i < this.segments.length; i++) {
				if (head.equal(this.segments[i])) {
					selfCollision = true;
				}
			}

			// возвращаем значение true, есди змейка столкнулась со стеной или сама с собой
			return wallCollision || selfCollision;
		};

		// создадим метод setDirection управления движением змейки клавишами клавиатуры
		Snake.prototype.setDirection = function(newDirection) {
			if (this.direction === "up" && newDirection === "down") {
				return;
			} else if (this.direction === "right" && newDirection === "left") {
				return;
			} else if (this.direction === "down" && newDirection === "up") {
				return;
			} else if (this.direction === "left" && newDirection === "right") {
				return;
			}

			this.nextDirection = newDirection;
		};

		// создадим яблоко, напишем конструктор Apple
		function Apple () {
			this.position = new Block(10, 10);
		};

		// рисуем яблоко
		Apple.prototype.draw = function () {
			this.position.drawCircle("LimeGreen")
		};

		// перемещаем яблоко в случайну позицию
	 	Apple.prototype.move = function () {
	 		var randomCol = Math.floor(Math.random() * (widthInBlock - 2)) + 1;
	 		var randomRow = Math.floor(Math.random() * (heightInBlock - 2)) + 1;
	 		
	 		// проверкатого, чтобы яблоко появлялось в случайном месте, но не в теле змейки
	 		for (var i = 0; i < snake.segments.length; i++) {
	 			while(snake.segments[i] === this.position) {
	 				this.position = new Block(randomCol, randomRow);
	 			}
	 			this.position = new Block(randomCol, randomRow);
	 		}	
	 	};

	 	// создадим объект-змейку и объект-ябкоко
	 	var snake = new Snake();
	 	var apple = new Apple();
		
		// функция запуска игры: с увеличением скорости анимации при каждом съеденном яблоке
		var animationTime = 100;
		function gameLoop () {
			ctx.clearRect(0, 0, width, height);
			drawBorder();
			drawScore();
			snake.move();
			snake.draw();
			apple.draw();
			drawBorder();
		 	
		 	setTimeout(gameLoop, animationTime);
		}; 

		gameLoop();

/*		// один извариантов задания постоянной анимации
		var intervalId = setInterval( function () {
			ctx.clearRect(0, 0, width, height);
			drawScore();
			snake.move();
			snake.draw();
			apple.draw();
		}, 100);
*/
		// Управление змейкой с клавиатуры
		var directions = {
			37: "left",
			38: "up",
			39: "right",
			40: "down"
		};

		// обработчик события клавиатуры
		$("body").keydown(function (event) {
			var newDirection = directions[event.keyCode];
			if (newDirection !== undefined) {
				snake.setDirection(newDirection);
			}
		});
	</script>
</body>
</html>