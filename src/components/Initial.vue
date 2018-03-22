
<template>

  <body class="text-center" >
  <div class="background">
    <div class="cover-container d-flex h-100 p-3 mx-auto flex-column" >
      <header class="mb-auto">
        <main role="main" class="inner cover" >
          <h1 class="cover-heading">WatchNext®</h1>
          <pre class="lead">
            <div class="transparency">"WatchNext® is under construction! Be Patient!<br>Prepare yourself 4 the most exciting web app !!<br>You will able to buy your own WN product soon!!.</div></pre>
          <div>
            <router-link  to="/login" tag="img" ><img class="logo image-button" src="../assets/wnLogo.png" title="Login" ></router-link>
          </div>
        </main>
      </header>
    </div>
  </div>
  </body>

</template>

<style>

  pre.lead{
    font-size: 150%;
    text-align:center;
  }
  .lead{
    font-color:black;
    align: center;
    font-size:100%;
  }
  .logo {
    height: 12.5%;
    width: 12.5%;
  }
  .transparency {
    width: auto;
    height: auto;
    background-color: #FFFFFF;
    padding: 10px;
    opacity:0.5;
  }
  img:hover{
    opacity: 0.7;
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity = 70);
    filter: alpha(opacity = 70);
    transition-duration: 0.5s;
    -moz-transition-duration: 0.5s;
    -webkit-transition-duration: 0.5s;
    -o-transition-duration: 0.5s;
    cursor: pointer;

  }

  img{
    transition-duration: 0.5s;
    -moz-transition-duration: 0.5s;
    -webkit-transition-duration: 0.5s;
    -o-transition-duration: 0.5s;
    cursor: pointer;
    vertical-align: middle;
  }
  div{
    height: 100%;
  }

</style>
