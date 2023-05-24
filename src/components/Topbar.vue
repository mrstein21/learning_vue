<template>
    <v-app-bar app elevate-on-scroll elevation="3" color="white">
      <!-- <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon> -->
      <v-toolbar-title>Airsoft Store</v-toolbar-title>
      <v-spacer />
      <v-menu>
        <template v-slot:activator="{props}">
          <v-btn icon v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        </template>
        <v-list>
        <v-list-item
          v-for="(item, index) in menu"
          :key="index"
          v-on:click="item.onClick"
          :value="index"
        >
           <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      </v-menu>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: "Topbar",
    data() {
      return {
        menu:[
          {
            icon: "mdi-logout",
            title : "Logout",
            onClick : ()=>{
              localStorage.removeItem("user");
              this.$router.push("/login");
            }
          }
        ], 
        items: [
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
            title: "Brunch this weekend?",
            subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          },
          { divider: true, inset: true },
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
          },
          { divider: true, inset: true },
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
            title: "Oui oui",
            subtitle:
              '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
          },
          { divider: true, inset: true },
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
            title: "Birthday gift",
            subtitle:
              '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
          },
          { divider: true, inset: true },
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            title: "Recipe to try",
            subtitle:
              '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          },
        ],
      };
    },
  };
  </script>
  