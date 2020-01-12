<template>
  <v-dialog :value="visibility" persistent max-width="600px">
    <v-card class="pa-6">
      <div class="title blue--text mb-4">create new issue</div>
      <v-form>
        <v-text-field v-model="issue.title" dense outlined label="title" />
        <v-textarea v-model="issue.description" outlined label="description" />
        <v-combobox
          v-model="issue.tags"
          outlined
          multiple
          label="tags"
          append-icon
          chips
          deletable-chips
        />
        <div class="d-flex justify-space-between">
          <v-btn depressed @click="cancel">
            cancel
          </v-btn>
          <v-btn depressed @click="submit" class="white--text" color="green">
            submit
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import submitIssue from "@/graphql/submitIssue.gql";

export default {
  data() {
    return {
      issue: {
        title: "",
        description: "",
        tags: []
      }
    };
  },
  computed: {
    ...mapState({
      visibility: state => state.Customer.Issues.createModalVisibility
    })
  },
  methods: {
    cancel() {
      this.$store.commit("Customer/Issues/SET_CREATE_MODAL_VISIBILITY", false);
      this.issue.title = "";
      this.issue.description = "";
      this.issue.tags = [];
    },
    async submit() {
      this.submitting = true;
      const issue = this.issue;
      try {
        const res = await this.$apollo
          .mutate({
            mutation: submitIssue,
            variables: issue
          })
          .then(({ data }) => data && data.submitIssue);
        this.$store.commit("Customer/Issues/UNSHIFT", res);
        this.cancel();
      } catch (e) {
        console.error(e);
        this.error = e;
      }

      this.submitting = false;
    }
  }
};
</script>

<style></style>
