<template>
  <div>
    <v-toolbar dense elevation="2">
      <v-toolbar-title to="/admin">Admin Dash</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/customer" depressed class="white--text" color="green">
          <v-icon left>mdi-account-convert</v-icon>
          Customer Dash
        </v-btn>
        <v-btn
          @click.prevent="logout"
          depressed
          class="white--text"
          color="red"
        >
          <v-icon>mdi-location-exit</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <nuxt-child />
    </v-container>
  </div>
</template>

<script>
import logout from "@/graphql/logout.gql";

export default {
  middleware: ["isAuth", "isAdmin"],
  methods: {
    async logout() {
      try {
        const res = await this.$apollo
          .mutate({
            mutation: logout
          })
          .then(({ data }) => data && data.logout);
        console.log(res);
        await this.$apolloHelpers.onLogout();
        this.$router.push("/");
      } catch (e) {
        console.error(e);
        this.error = e;
      }
    }
  }
};
</script>

<style></style>
