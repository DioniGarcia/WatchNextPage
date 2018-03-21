
<template>

  <body class="text-center" >
  <div class="cover-container d-flex h-100 p-3 mx-auto flex-column" >
    <header class="mb-auto">
      <main role="main" class="inner cover" >
        <h1 class="cover-heading">WatchNext®</h1>
        <div class="trans">
        <pre class="lead">
          "WatchNext® is under construction! Be Patient!
          Prepare yourself 4 the most exciting web app !!
          You will able to buy your own WN product soon!!.</pre>
        </div>
        <img class="logo" src="../assets/wnLogo.png">
        <p class="lead">
          <router-link class="button" to="/login">LogIn</router-link>
        </p>
      </main>
    </header>

  </div>
  </body>

</template>

<style>

  .lead{
    color: black;
    align: center;
  }
  .logo {
    height: 25%;
    width: 25%;
  }
  body{
    vertical-align: center;
    background-image: url(../assets/background.png);
  }
  .trans {

    background-color:white;
    opacity: 0.5;
  }
  .button{
    color: #222;
    background-color:lightseagreen;
    border: 1px outset #CCC;
    padding: .1em .5em;
  }

  .button:hover {
    background: #CCB;
  }

  .button:active {
    border: 1px inset #000;
  }


</style>
