<template>
  <nav>
    <table class="margin_class">
      <tr>
        <td>
          <router-link class="router-link_class" to="/">Home</router-link>
          |
        </td>
        <td>
          <router-link class="router-link_class" to="/registeruser">Register</router-link>
          |
        </td>
        <td>
          <router-link class="router-link_class" to="/login">Login</router-link>
          |
        </td>
        <td>
          <router-link class="router-link_class" to="test">Test</router-link>
          |
        </td>
        <td>
          <router-link class="router-link_class" to="/userlistview">Userlist</router-link>
          |
        </td>
        <td>
          <!-- <router-link to="/Messages">Messages</router-link> | -->
          <router-link class="router-link_class" to="/conversationview">conversationview</router-link>
          |
        </td>
        <td>
          <router-link class="router-link_class" to="/friendship">friendship</router-link>
          |
        </td>
      </tr>
    </table>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.margin_class {
  margin-left: 30em;

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #6dfaff;

}

.router-link_class {
  margin-right: 1em;
}

</style>
