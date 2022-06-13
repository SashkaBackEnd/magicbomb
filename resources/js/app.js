require('./bootstrap');

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

    const id = getRandomInt(5);

    axios({
      method: 'post',
        url: '/api/messages',
        data: {
          username: {
          id: id,
          player:[]
        },
        message: [],
        start: 1,
        cells: []
        }
    });

    let player_num = 1;




    const canvas = document.getElementById('game');
   
    const context = canvas.getContext('2d');
   
    const grid = 64;
    const numRows = 13;
    const numCols = 15;

    let img = new Image();
    img.src = "images/pers.png";

    let img2 = new Image();
    img2.src = "images/pers2.png";

    
    const softWallCanvas = document.createElement('canvas');
    const softWallCtx = softWallCanvas.getContext('2d');

    softWallCanvas.width = softWallCanvas.height = grid;

 
    softWallCtx.fillStyle = '#FFFFAE';

    softWallCtx.fillRect(0, 0, grid, grid);
 
    softWallCtx.fillStyle = '#03182D';

 
    softWallCtx.fillRect(1, 1, grid - 2, 20);
   
    softWallCtx.fillRect(0, 23, 20, 18);
    softWallCtx.fillRect(22, 23, 42, 18);

    softWallCtx.fillRect(0, 43, 42, 20);
    softWallCtx.fillRect(44, 43, 20, 20);

    const wallCanvas = document.createElement('canvas');
    const wallCtx = wallCanvas.getContext('2d');

    wallCanvas.width = wallCanvas.height = grid;

   
    wallCtx.fillStyle = 'black';
    wallCtx.fillRect(0, 0, grid, grid);

    wallCtx.fillStyle = 'white';
    wallCtx.fillRect(0, 0, grid - 2, grid - 2);
   
    wallCtx.fillStyle = '#768BA0';
    wallCtx.fillRect(2, 2, grid - 4, grid - 4);

      
    let block_img = new Image();
    block_img.src = "images/block1.png";



    wallCtx.drawImage(block_img, 200, 200);


   
    const types = {
      wall: '▉',
      softWall: 1,
      bomb: 2
    };

    let cells = [];
    const template = [
      ['▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉'],
      ['▉','x','x',   ,   ,   ,   ,   ,   ,   ,   ,   ,'x','x','▉'],
      ['▉','x','▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉','x','▉'],
      ['▉','x',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,'x','▉'],
      ['▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉'],
      ['▉',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,'▉'],
      ['▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉'],
      ['▉',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,'▉'],
      ['▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉'],
      ['▉','x',   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,'x','▉'],
      ['▉','x','▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉',   ,'▉','x','▉'],
      ['▉','x','x',   ,   ,   ,   ,   ,   ,   ,   ,   ,'x','x','▉'],
      ['▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉','▉']
    ];


    let entities = [];

   
    function generateLevel() {
       
      cells = [];

 
      for (let row = 0; row < numRows; row++) {
        cells[row] = [];

        
        for (let col = 0; col < numCols; col++) {

  
          if (!template[row][col]) {
            cells[row][col] = types.softWall;
          }
          else if (template[row][col] === types.wall) {
            cells[row][col] = types.wall;
          }
        }
      }
    }
  
    var player = {
      row: 1,
      col: 1,

      // сколько может ставить бомб
      numBombs: 3,

      // длина взыва бомбы
      bombSize: 3,
     
      // размер игрока
      radius: grid * 0.35,
     
      // отрисовываем белый круг в нужной позиции
      render() {
        const x = (this.col + 0.1) * grid;
        const y = (this.row + 0.1) * grid;

        context.save();
        context.beginPath();
        context.fill();

        context.drawImage(img, x, y, 40, 59)

      }
    }


    var player2 = {
      row: 1,
      col: 1,

      // сколько может ставить бомб
      numBombs: 3,

      // длина взыва бомбы
      bombSize: 3,
     
      // размер игрока
      radius: grid * 0.35,
     
      // отрисовываем белый круг в нужной позиции
      render() {
        const x = (this.col + 0.1) * grid;
        const y = (this.row + 0.1) * grid;

        context.save();
        context.beginPath();
        context.fill();

        context.drawImage(img2, x, y, 40, 59)

      }
    }

    // функция, которая отвечает за создание бомбы
    function Bomb(row, col, size, owner) {
        // координаты
      this.row = row;
      this.col = col;
      // радиус бомбы
      this.radius = grid * 0.4;
      // длина взрыва
      this.size = size;
      // кто поставил бобму
      this.owner = owner; 
      // активируем её
      this.alive = true;
      // ставим признак, что в этой ячейке — бомба
      this.type = types.bomb;

      // взывается через 3 секунды
      this.timer = 3000;

      // обновляем таймер на каждом кадре анимации
      this.update = function(dt) {
        this.timer -= dt;

        // когда таймер закончится — взрываем бомбу
        if (this.timer <= 0) {
          return blowUpBomb(this);
        }

        // меняем размер бомбы каждые полсекунды
        // для этого мы каждые 500 миллисекунд увеличиваем и уменьшаем радиус
        // на нечётном шаге интервала времени мы увеличиваем бомбу, а на нечётном — уменьшаем
        const interval = Math.ceil(this.timer / 500);
        if (interval % 2 === 0) {
          this.radius = grid * 0.4;
        }
        else {
          this.radius = grid * 0.5;
        }
      };

      // отрисовка бомбы
      this.render = function() {
        // координаты
        const x = (this.col + 0.5) * grid;
        const y = (this.row + 0.5) * grid;

        // рисуем бомбу
        context.fillStyle = '#BE8EB4';
        context.beginPath();
        context.arc(x, y, this.radius, 0, 2 * Math.PI);
        context.fill();

        // рисуем фитиль, который зависит от размера бомбы
        const fuseY = (this.radius === grid * 0.5 ? grid * 0.15 : 0);
        context.strokeStyle = 'white';
        context.lineWidth = 5;
        context.beginPath();
        context.arc(
          (this.col + 0.75) * grid,
          (this.row + 0.25) * grid - fuseY,
          10, Math.PI, -Math.PI / 2
        );
        context.stroke();
      };
    }
    // задаём характеристики взрыва
    function Explosion(row, col, dir, center) {
        // координаты и направление
      this.row = row;
      this.col = col;
      this.dir = dir;
      this.alive = true;

      // взыв длится 300 миллисекунд
      this.timer = 300;

      // обновляем таймер длительности взрыва на каждом шаге анимации
      this.update = function(dt) {
        this.timer -= dt;

        if (this.timer <=0) {
          this.alive = false;
        }
      };

      // отрисовка взрыва
      this.render = function() {
        const x = this.col * grid;
        const y = this.row * grid;
        const horizontal = this.dir.col;
        const vertical = this.dir.row;

        // создаём эффект огня из красных, оранжевых и жёлтых полос
        // у каждого цвета — свой размер такой полосы

        // красная
        context.fillStyle = '#293ABE'; 
        context.fillRect(x, y, grid, grid);

        // оранжевая
        context.fillStyle = '#BE47BA';
        // определяем, как нам рисовать линии — по горизонтали или по вертикали
        // на центре отрисовываем в обоих направлениях
        if (center || horizontal) {
          context.fillRect(x, y + 6, grid, grid - 12);
        }
        if (center || vertical) {
          context.fillRect(x + 6, y, grid - 12, grid);
        }

        // жёлтая
        context.fillStyle = '#BEA0B9';
        // точно так же выбираем направления
        if (center || horizontal) {
          context.fillRect(x, y + 12, grid, grid - 24);
        }
        if (center || vertical) {
          context.fillRect(x + 12, y, grid - 24, grid);
        }
      };
    }


    // взываем бомбу и разрушаем соседние ячейки
    function blowUpBomb(bomb) {

      // если бомба уже взорвалась — выходим, чтобы не взывать её снова :)
      if (!bomb.alive) return;

      // ставим флаг, что бомба взорвалась
      bomb.alive = false;

      // убираем бомбу с ячейки
      cells[bomb.row][bomb.col] = null;

      // устанавливаем направления взыва
      const dirs = [{
        // верх
        row: -1,
        col: 0
      }, {
        // низ
        row: 1,
        col: 0
      }, {
        // слева
        row: 0,
        col: -1
      }, {
        // справа
        row: 0,
        col: 1
      }];

      // обрабатываем каждое направление
      dirs.forEach((dir) => {
        for (let i = 0; i < bomb.size; i++) {
            // помечаем каждую такую ячейку своими цифрами
          const row = bomb.row + dir.row * i;
          const col = bomb.col + dir.col * i;
          const cell = cells[row][col];

          // останавливаем взрыв, если он достиг неразрушаемой стены
          if (cell === types.wall) {
            return;
          }

          if (row == player.row && col == player.col) {
            alert('Вы проиграли!');
            window.location.href = '/';
          }


          if (row == player2.row && col == player2.col) {
            alert('Вы выиграли!');
            window.location.href = '/';
          }
          // начало анимации взыва всегда в месте установки бомбы
          // отправляем то, что нужно взорвать, в массив с сущностями
          entities.push(new Explosion(row, col, dir, i === 0 ? true : false));
          //  очищаем взорванную ячейку
          cells[row][col] = null;

          // если бомба при взрыве задевает другую бобму — взрываем и её
          if (cell === types.bomb) {

            // отправляем следующую бомбу в массив с остальными объектами на обработку
            const nextBomb = entities.find((entity) => {
              return (
                entity.type === types.bomb &&
                entity.row === row && entity.col === col
              );
            });
            // и взываем её
            blowUpBomb(nextBomb);
          }

          // если взорвали всё доступное — останавливаемся
          if (cell) {
            return;
          }
        }
      });
    }

    // обрабатываем нажатия на клавиши для управления игрой
    document.addEventListener('keydown', function(e) {
        //  по умолчанию клавиши управляют движением игрока по строкам и столбцам игрового поля
      let row = player.row;
      let col = player.col;
      // влево
      if (e.which === 37) {
        col--;
      }
      // вверх
      else if (e.which === 38) {
        row--;
      }
      // вправо
      else if (e.which === 39) {
        col++;
      }
      // вниз
      else if (e.which === 40) {
        row++;
      }
      // если пробел — ставим бомбу
      else if (
        e.which === 32 && !cells[row][col] &&
        // считаем количество бомб, которые ставит игрок. Если бомб хватает — ставим.
        entities.filter((entity) => {
          return entity.type === types.bomb && entity.owner === player
        }).length < player.numBombs
      ) {
        // ставим бомбу в текущую позицию
        const bomb = new Bomb(row, col, player.bombSize, player);
    // отправляем бомбу в массив, чтобы игра её нарисовала на следующем кадре
        // entities.push(bomb);
        axios({
			     method: 'post',
    			url: '/api/messages',
    			data: {
    				username: {
              id: id,
              player:player
            },
    				message: bomb,
            start: 0,
            cells: []
    			}
    		});
        cells[row][col] = types.bomb;
      }

      // двигаем игрока только в пустые ячейки 
      if (!cells[row][col]) {
        player.row = row;
        player.col = col;
      }
      axios({
           method: 'post',
          url: '/api/messages',
          data: {
            username: {
              id: id,
              player:player
            },
            message: [],
            start: 0,
            cells: []
          }
        });
    });


    // главный цикл игры

    // время последней отрисовки кадра
    let last;
    // сколько прошло времени с момента последней отрисовки
    let dt;
    function loop(timestamp) {
      requestAnimationFrame(loop);
      // очищаем холст
      context.clearRect(0,0,canvas.width,canvas.height);

      // считаем разницу во времени с момента последней отрисовки.
      // эти параметры нам нужны для анимации пульсации бомбы и длительности взрыва
      if (!last) {
        last = timestamp;
      }
      dt = timestamp - last;
      last = timestamp;

      // заново рисуем всё на игровом поле
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          switch(cells[row][col]) {
            case types.wall:
              context.drawImage(wallCanvas, col * grid, row * grid);
              break;
            case types.softWall:
              context.drawImage(softWallCanvas, col * grid, row * grid);
              break;
          }
        }
      }

      // обновляем и отрисовываем все игровые сущности
      entities.forEach((entity) => {
        entity.update(dt);
        entity.render();
      });

      // удаляем отработанные сущности, например, взорванные бомбы 
      entities = entities.filter((entity) => entity.alive);


      // рисуем игрока
      player.render();
      player2.render();
    }


    // запускаем игру
    // generateLevel();
    // requestAnimationFrame(loop);



    // Проверяем есть ли кто уже


    window.Echo.channel('game')
    .listen('.message', (e) => {
        console.log(e);
        if (e.start == 1 && e.username.id != id) {
            player_num = 1;
            console.log('вошел второй игрок');
            axios({
              method: 'post',
                url: '/api/messages',
                data: {
                  username: {
                  id: id,
                  player:[]
                },
                message: [],
                start: 2,
                cells: cells
                }
            });
            // запускаем игру
            generateLevel();
            requestAnimationFrame(loop);
            player.col = 1;

        }

        if (e.start == 2 && e.username.id != id) {
            player_num = 2;
            console.log('я второй игрок');
      
            // запускаем игру
            generateLevel();
            requestAnimationFrame(loop);
            player.col = 13;
            player2.col = 1;
        }
        console.log(player_num);
        if (e.message.row != null) {
          const bomb = new Bomb(e.message.row, e.message.col, player.bombSize, player);
          entities.push(bomb);
        }
        if (e.username.id != id && e.username.player.col != null) {
          player2.col = e.username.player.col;
          player2.row = e.username.player.row;
        }

    });
