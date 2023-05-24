<template>
      <Sidebar :drawer="drawer" />
      <Topbar @drawerEvent="drawer = !drawer" />
  </template>
  
  <script>
  import Sidebar from "./Sidebar.vue";
  import Topbar from "./Topbar.vue";
  export default {
    name: "SideTop",
    components: { Topbar, Sidebar },
    data: () => ({
       drawer: null,
    }),
    methods: {},
  };
  </script>