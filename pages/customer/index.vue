<template>
  <div class="py-4">
    <template v-if="issues.length">
      <template v-for="(issue, index) in issues">
        <issueCard :issue="issue" :key="index" class="mb-4" />
      </template>
    </template>
    <template v-else>
      <div class="d-flex flex-column align-center pa-12 my-12">
        <v-avatar color="grey lighten-1 mb-4" size="62">
          <v-icon dark>mdi-inbox</v-icon>
        </v-avatar>
        <div class="grey--text title mb-4">
          no issues yet
        </div>
        <v-btn class="white--text" color="blue" @click="openCreateModal">
          <v-icon left>mdi-plus-circle</v-icon>
          create issue
        </v-btn>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import issueCard from "~/components/Customer/issueCard";

export default {
  components: {
    issueCard
  },
  computed: {
    ...mapState({
      issues: state => state.Customer.Issues.issues
    })
  },
  methods: {
    openCreateModal() {
      this.$store.commit("Customer/Issues/SET_CREATE_MODAL_VISIBILITY", true);
    }
  }
};
</script>

<style></style>
