<template>

    <div class="menu-container">
        <div class="navbar">
            <a href="#">Home</a>
            <a href="#">Message-Board</a>
            <a href="#">Direct Message</a>
            <a href="#">My profile</a>
            <a href="#">Settings</a>
        </div>
    </div>


</template>
<script>


export default {
  name: "NavBar"}

  </script>

<style>

    a {
        coler: #506698;
        text-decoration: none;
    }

    a:hover {
        color: white;
    }

    .menu-container{
        position: absolute;
        padding-left: 0%;
        padding-right: 0%;
        top: 0%;
        bottom: 0%;
        background: #92C4E0;
    }
    .navbar{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        gap: 28px;

        position: absolute;
        width: 152px;
        left: calc(50% - 152px/2);
        top: 22.22%;
        bottom: 40.44%;
    } 
</style>
