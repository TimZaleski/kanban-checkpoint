<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center chalkboard">
    <h1 class="chalk largeSize">
      CHALKA KANBAN
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: "PWChalk";
  src: local("PWChalk"),
   url(../assets/font/PWChalk.ttf) format("truetype");
}

@font-face {
  font-family: "Reenie Beanie";
  src: local("Reenie Beanie"),
   url(../assets/font/ReenieBeanie-Regular.ttf) format("truetype");
}

.chalk{
  color:rgb(221, 221, 221);
  font-family: "PWChalk";
}

.largeSize{
  font-size: 20vh;
}

.chalkboard{
 background-image: url('../assets/img/chalkboardBg3.jpg');
 background-size: cover;
 background-repeat: no-repeat;
}
</style>
