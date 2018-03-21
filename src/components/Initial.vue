
<template>

<body class="text-center" >
  <div class="cover-container d-flex h-100 p-3 mx-auto flex-column" >
    <header class="mb-auto">
    <main role="main" class="inner cover" >
      <h1 class="cover-heading">WatchNext®</h1>
      <div class="trans">
        <div class="lead">
          "WatchNext® is under construction! Be Patient!
          Prepare yourself 4 the most exciting web app !!
          You will able to buy your own WN product soon!!.
        </div>
      </div>
      <img class="logo" src="../assets/wnLogo.png">
      <p class="lead">
        <router-link to="/login">LogIn</router-link>
      </p>
    </main>
    </header>

  </div>
</body>

</template>

<style>

  .lead{
    background-color: transparent;
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



</style>
