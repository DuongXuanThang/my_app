<template>
<div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      message: "123",
    };
  },
  mounted() {
    this.fetchData(); 
  },
  methods: {
    async  fetchData() {
      fetch('https://dummy.restapiexample.com/api/v1/employees')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.message = data.message;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    
    // try {
    //     let response = await fetch("https://dummy.restapiexample.com/api/v1/employees");
    //     this.posts = await response.json();
    //     console.log(this.posts);
    //   } catch (error) {
    //     console.log(error);
    //   } 

}
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
