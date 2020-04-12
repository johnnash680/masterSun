# masterSun
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Упражнение по интерактивному программированию: написание игры - поймай π</title>
</head>
<body>
	<h1 id="heading">π</h1>
	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.0.js"></script>

	<script type="text/javascript">

		var direction = "вправо";
		var offset = 0;
		$("#heading").offset({ left: offset, top: offset });

		// создаём функцию с условием, для перемещения <h1> на координаты (x1, y1) = (200, 0)
		function moveHeading () {
			if (direction === "вправо") {
			$("#heading").offset({ left: offset });
			offset++;
			if (offset > 200) {
				offset = 0;
				direction = "вниз";
		   	 } 
			} else if (direction === "вниз"){
		// если выполнили условие "вправо", то делаем присвоение нового направления для переменно direction с условием для перемещения <h1> "вниз" на координаты (x2, y2) = (200, 200)
			$("#heading").offset({ top: offset });
			offset++;
			if (offset > 200) {
				offset = 200;
				direction = "влево";
			 }	
			} else if (direction === "влево") {
		// если выполнили условие "вниз", то делаем присвоение нового направления для переменно direction с условием для перемещения <h1> "влево" на координаты (x3, y3) = (0, 200)		
			$("#heading").offset({ left: offset });
			offset--;
			if (offset < 0) {
				offset = 200;
				direction = "вверх";
			 }
			} else if (direction === "вверх") {
		// если выполнили условие "влево", то делаем присвоение нового направления для переменно direction с условием для перемещения <h1> "вверх" на начальные координаты (x4, y4) = (0, 0)
			 $("#heading").offset({ top: offset });
			 offset--;
			 if (offset < 0) {
			 	offset = 0;
			 	direction = "вправо";
			 }
			}
		};
		var intervalID = setInterval(moveHeading, 50); // скорость выполнения анимации (чем меньше параметр "30", тем плавнее и быстрее анимация)

		//добавим в программу обработчик клика на заголовок <h1>, который при каждом клике по залоловку немного ускоряет его ход
		var speedHeading = 50;
		function beSpeedyHeading () {
			if(speedHeading === 50) {
				clearInterval(intervalID);
				intervalID = setInterval(moveHeading, 40);
				$("#heading").text("π - 1 раз");
				speedHeading = 40;
			} else
			if (speedHeading === 40) {
				clearInterval(intervalID);
				intervalID = setInterval(moveHeading, 30);
				speedHeading = 30;
				$("#heading").text("π - 2 раза");
			} else
			if (speedHeading === 30) {
				clearInterval(intervalID);
				intervalID = setInterval(moveHeading, 20);
				speedHeading = 20;
				$("#heading").text("π - 3 раза");
			} else 
			if (speedHeading === 20) {
				clearInterval(intervalID);
				intervalID = setInterval(moveHeading, 10);
				speedHeading = 10;
				$("#heading").text("π - 4 раза");
			} else
			if (speedHeading === 10) {
				clearInterval(intervalID);
				intervalID = setInterval(moveHeading, 8);
				speedHeading = 8;
				$("#heading").text("π - 5 раз");
			} else
			if (speedHeading === 8) {
				clearInterval(intervalID);
				intervalID = setInterval(moveHeading, 6);
				speedHeading = 6;
				$("#heading").text("π - 6 раз");
			} else 
			if (speedHeading === 6) {
				clearInterval(intervalID);
				intervalID = setInterval(moveHeading, 5);
				speedHeading = 5;
				$("#heading").text("π - 7 раз");
			} else 
			if (speedHeading === 5) {
				clearInterval(intervalID);
				intervalID = setInterval(moveHeading, 4);
				speedHeading = 4;
				$("#heading").text("π - 8 раз");
			} else 
			if (speedHeading === 4) {
				clearInterval(intervalID);
				intervalID = setInterval(moveHeading, 3);
				speedHeading = 3;
				$("#heading").text("π - заканчивай!");
			} else 
			if (speedHeading === 3) {
				clearInterval(intervalID);
				intervalID = setInterval(moveHeading, 2);
				speedHeading = 1;
				$("#heading").text("чувак, это уже не смешно");				
			} else 
			if (speedHeading === 1){
				clearInterval(intervalID);
			// добавим возможность повторить игру с вызовом диалогового окна
				var playAgain = confirm("Вы победили! Сыграем ещё?");
				if (playAgain) {
				window.location.reload(); //перезагрузка окна браузера
				}
			}
		};
			
		$("#heading").click(beSpeedyHeading);

	</script>
</body>
</html>









		
