<template>
  <div>
    <v-toolbar dense elevation="2">
      <v-toolbar-title>Customer Dash</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          @click="openCreateModal"
          depressed
          class="white--text"
          color="blue"
        >
          <v-icon left>mdi-plus-circle</v-icon>
          create issue
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

export default {
  components: {
    createIssueModal
  },
  methods: {
    openCreateModal() {
      this.$store.commit("Customer/Issues/SET_CREATE_MODAL_VISIBILITY", true);
    }
  }
};
</script>

<style></style>
