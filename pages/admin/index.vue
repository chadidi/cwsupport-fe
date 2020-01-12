<template>
  <div class="py-4">
    <template v-if="issues.length">
      <v-card class="py-2" elevation="1">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">#ID</th>
                <th class="text-left">Status</th>
                <th class="text-left">Title</th>
              </tr>
            </thead>
            <tbody>
              <tr
                @click="goTo(issue)"
                v-for="issue in issues"
                :key="issue.id"
                style="cursor: pointer"
              >
                <td>{{ issue.id }}</td>
                <td>
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
                </td>
                <td style="width: 100%" class="font-weight-bold">
                  {{ issue.title }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </template>
    <template v-else>
      <div class="d-flex flex-column align-center pa-12 my-12">
        <v-avatar color="grey lighten-1 mb-4" size="62">
          <v-icon dark>mdi-inbox</v-icon>
        </v-avatar>
        <div class="grey--text title mb-4">
          no issues yet
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import gql from "graphql-tag";

export default {
  computed: {
    ...mapState({
      status: state => state.status
    })
  },
  async asyncData({ app }) {
    const client = app.apolloProvider.defaultClient;
    const issues = await client
      .query({
        prefetch: true,
        query: gql`
          query {
            issues(
              count: 100
              orderBy: [{ field: "created_at", order: DESC }]
            ) {
              paginatorInfo {
                total
                hasMorePages
              }
              data {
                id
                title
                description
                status
                created_at
                tags {
                  name
                }
              }
            }
          }
        `
      })
      .then(({ data }) => data && data.issues && data.issues.data);

    return { issues };
  },
  methods: {
    goTo(issue) {
      this.$router.push(`/admin/issues/${issue.id}`);
    }
  }
};
</script>

<style></style>
