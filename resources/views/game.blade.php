<!DOCTYPE html>
<html>
<head>
  <title>Мagicbomb</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

  <meta charset="UTF-8">
  <style>
    html, body {
      height: 100%;
      margin: 0;
    }
    body {
      background: url('images/back.jpg');
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-y: hidden;
    }

    canvas {
      background: url('images/hp.png');
      background: url('images/back.jpg');

    }

    .stars {
        width: 100vw;
        height: 100px;
        position: absolute;
    }
    .star {
        background: #fff802;
        position: fixed;
        /*margin: 10px;*/
        transition: 10s;
        opacity: 0.7;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        -webkit-box-shadow: 1px 1px 24px 7px rgba(255, 248, 2, 1);
        -moz-box-shadow: 1px 1px 24px 7px rgba(255, 248, 2, 1);
        box-shadow: 1px 1px 24px 7px rgba(255, 248, 2, 1);
    }


  </style>
</head>
    <body>

    <div class="stars">
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
        </div>


    <!— рисуем холст с нужными размерами —>

    <canvas width="960" height="832" id="game"></canvas>


    <script>
    $(document).ready(function() {
        // Светлячки
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
        $(document).ready(function() {
            $('body .star').each(function() {
                var top = getRandomArbitrary(2, 98);
                var right = getRandomArbitrary(2, 98);
                $(this).css({top:top+'vh',right:right+'vw'});
            });
            setTimeout( function() {
                $('body .star').each(function() {
                    var top = getRandomArbitrary(2, 98);
                    var right = getRandomArbitrary(2, 98);
                    $(this).css({top:top+'vh',right:right+'vw'});
                });
            } ,100)
            setInterval( function() {
                $('body .star').each(function() {
                    var top = getRandomArbitrary(2, 98);
                    var right = getRandomArbitrary(2, 98);
                    $(this).css({top:top+'vh',right:right+'vw'});
                });
            } ,10000)
        })
    });

    </script>

    <!— главный скрипт игры —>

    <script type="text/javascript" src="./js/app.js"></script>

    </body>
</html>
