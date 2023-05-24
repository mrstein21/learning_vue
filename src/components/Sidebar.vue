<template>
    <v-navigation-drawer v-model="drawers"  :rail="rail"
        permanent
        @click="rail = false">
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          :title="auth.user.name"
          nav>
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list 
        :lines="false"

        density="compact"
        nav
        >
            <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            :to="item.link"
            active-color="primary"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  import { mapState } from "vuex";
  export default {
    name: "Sidebar",
    props: ["drawer"],
    created(){
       console.log(this.auth);
    },
    computed: {
    ...mapState(["auth"]),
  },
    data() {
      return {
        drawers: true,
        items: [
        { 
          text: 'Airsoft', icon: 'mdi-pistol',link : "/airsoft" },
        ],
        rail: true,
      };
    },
  };
  </script>
  