
<template>

  <body class="text-center" >
  <div class="background">
    <div class="cover-container d-flex h-100 p-3 mx-auto flex-column" >
      <header class="mb-auto">
        <main role="main" class="inner cover" >
          <h1 class="cover-heading">WatchNext®</h1>
          <pre class="lead">
            <div class="transparency">"WatchNext® is under construction! Be Patient!<br>Prepare yourself 4 the most exciting web app !!<br>You will able to buy your own WN product soon!!.</div></pre>
          <img class="logo" src="../assets/wnLogo.png">
          <p class="lead">
            <router-link class="button" to="/login">LogIn</router-link>
          </p>
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
    height: 25%;
    width: 25%;
  }
  .background{
    height: 100%;
    vertical-align: center;
    background-image: url(../assets/background.png);
  }
  .transparency {
    width: auto;
    height: auto;
    background-color: #FFFFFF;
    padding: 10px;
    opacity:0.5;
  }
  body{
    height: max-content;
    background-image: url(../assets/background.png);
  }



</style>
