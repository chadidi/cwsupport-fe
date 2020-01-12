<template>
  <div class="py-4">
    <v-card class="pa-4" elevation="1">
      <div class="d-flex">
        <v-avatar size="40" color="orange">
          <span class="white--text title">{{ issue.user.name[0] }}</span>
        </v-avatar>
        <div class="ml-3">
          <div class="font-weight-bold">
            {{ issue.user.name }}
          </div>
          <div class="grey--text">
            {{ issue.user.email }}
          </div>
        </div>
      </div>
      <v-divider class="my-4"></v-divider>
      <div>
        <div class="mb-4 d-flex justify-space-between">
          <v-chip
            :color="status[issue.status].color"
            text-color="white"
            class="mr-2"
          >
            <v-avatar left>
              <v-icon>{{ status[issue.status].icon }}</v-icon>
            </v-avatar>
            {{ status[issue.status].name }}
          </v-chip>
          <v-btn depressed class="green--text" @click="edit">
            <v-icon left>mdi-pencil</v-icon>
            edit
          </v-btn>
        </div>
        <div class="title">
          {{ issue.title }}
        </div>
        <div>
          {{ issue.description }}
        </div>
        <div>
          <template v-if="issue.tags.length">
            <template v-for="(tag, index) in issue.tags">
              <v-chip small class="mr-2 mt-2" :key="index">{{ tag }}</v-chip>
            </template>
          </template>
        </div>
      </div>
    </v-card>
    <editIssueModal
      ref="editModal"
      :value="displayModal"
      @cancel="displayModal = false"
      @saved="saved"
    />
  </div>
</template>

<script>
import _ from "lodash";
import gql from "graphql-tag";
import { mapState } from "vuex";
import updateIssue from "@/graphql/updateIssue.gql";
import editIssueModal from "~/components/Admin/editIssueModal";

export default {
  components: {
    editIssueModal
  },
  data() {
    return {
      displayModal: false
    };
  },
  computed: {
    ...mapState({
      status: state => state.status
    })
  },
  async asyncData({ app, route }) {
    console.log(route.params.id);
    const client = app.apolloProvider.defaultClient;
    const issue = await client
      .query({
        prefetch: true,
        query: gql`
          query {
            issue(id: ${route.params.id}) {
              id
              title
              description
              status
              created_at
              user {
                name
                email
              }
              tags {
                name
              }
            }
          }
        `
      })
      .then(({ data }) => data && data.issue);
    issue.tags = _.map(issue.tags, "name");

    return { issue };
  },
  methods: {
    edit() {
      this.$refs.editModal.setData(this.issue);
      this.displayModal = true;
    },
    async saved(data) {
      this.issue = { ...this.issue, ...data };
      try {
        const issue = await this.$apollo
          .mutate({
            mutation: updateIssue,
            variables: this.issue
          })
          .then(({ data }) => data && data.updateIssue);
        issue.tags = _.map(issue.tags, "name");
        this.issue = issue;
      } catch (e) {
        console.error(e);
        this.error = e;
      }
      this.displayModal = false;
    }
  }
};
</script>

<style></style>
