<template>
  <header>
    <h1>FlamencoJs</h1>

    <div class="menu">
      <router-link to="/">Effects</router-link>
      <router-link to="/about" class="--active">About</router-link>
    </div>
  </header>
  <iframe :src="urlFlamenco"></iframe>
</template>

<script>
export default {
  data() {
    return {
      urlFlamenco: "https://adrienbouteiller.com/flamenco/",
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

header {
  background-color: #1b1b1f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  h1 {
    color: white;
  }
  .menu {
    display: flex;
    border-radius: 25px;
    background-color: #1c1e21;
    padding: 5px;
    gap: 15px;

    a {
      text-decoration: none;
      font-size: 13px;
      background-color: transparent;
      border: none;
      border-radius: 25px;
      padding: 10px 20px;
      color: black;
      font-weight: bold;
      cursor: pointer;

      &.--active {
        background-color: #ece9e9;
      }
    }

    a:nth-child(1) {
      color: #ece9e9;
    }
  }
}

iframe {
  width: 100%;
  position: absolute;
  top: 70px;
  height: calc(100vh - 70px);
  border: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  left: 0;
  z-index: 999;
}
.container {
  margin: 0;
}
</style>
