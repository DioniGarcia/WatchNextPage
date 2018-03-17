
<template>
  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">WatchNext</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <router-link to="/">Principal</router-link>
        <router-link to="/login">LogIn</router-link>
        <router-link to="/task">Nueva tarea</router-link>
        <router-link to="/task/1">Ver tarea</router-link>
        <router-link to="/task/edit/1">Editar tarea</router-link>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>
