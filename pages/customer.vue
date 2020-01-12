<template>
  <div>
    <v-toolbar dense elevation="2">
      <v-toolbar-title>Customer Dash</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          to="/admin"
          depressed
          class="white--text"
          color="green"
          v-if="$store.state.auth.user.is_admin"
        >
          <v-icon left>mdi-account-convert</v-icon>
          Admin Dash
        </v-btn>
        <v-btn
          @click="openCreateModal"
          depressed
          class="white--text"
          color="blue"
        >
          <v-icon left>mdi-plus-circle</v-icon>
          create issue
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
    <createIssueModal />
  </div>
</template>

<script>
import createIssueModal from "~/components/Customer/createIssueModal";
import logout from "@/graphql/logout.gql";

export default {
  middleware: ["isAuth"],
  components: {
    createIssueModal
  },
  methods: {
    openCreateModal() {
      this.$store.commit("Customer/Issues/SET_CREATE_MODAL_VISIBILITY", true);
    },
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
