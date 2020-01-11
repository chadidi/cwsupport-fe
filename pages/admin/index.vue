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
                <td
                  class="font-weight-bold"
                  :class="`${status[issue.status].color}--text`"
                >
                  {{ issue.status }}
                </td>
                <td style="width: 100%">{{ issue.title }}</td>
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
export default {
  data() {
    return {
      issues: [
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" },
        { id: "123", status: "SUBMITTED", title: "hello i have an issue" }
      ],
      status: {
        SUBMITTED: { color: "blue" },
        IN_PROGRESS: { color: "orange" },
        RESOLVED: { color: "green" },
        CLOSED: { color: "red" }
      }
    };
  },
  methods: {
    goTo(issue) {
      this.$router.push(`/admin/issues/${issue.id}`);
    }
  }
};
</script>

<style></style>
