<!DOCTYPE html>
<html>
<head>
    <title>Мagicbomb</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <meta charset="utf-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&family=Montserrat:wght@300&family=Mulish:wght@200;300&display=swap" rel="stylesheet">
</head>
<body>
<style type="text/css">
    body {
      font-family: 'Kdam Thmor Pro', sans-serif;
      background: url('images/back.jpg');
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-y: hidden;
      height: 100vh;
    }
    .wrap {
        width: 700px;
        height: 400px;
        background: rgba(0,0,0,0.6);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
    }
    .wrap h1 {
        color: white;
        font-size: 75px;
    }
    .wrap a {
        color: white;
        font-size: 55px;
        cursor: pointer;
        text-decoration: none;
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
<div class="wrap">
        <h1>MAGICBOMB</h1>
        <a href="/game">начать игру</a>
</div>
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

</body>
</html>