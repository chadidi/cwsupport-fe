<template>
  <v-card class="pa-3" elevation="1" :ripple="false">
    <div class="d-flex align-center">
      <div>
        <v-chip
          small
          :color="status[issue.status].color"
          text-color="white"
          class="mr-2"
        >
          <v-avatar left>
            <v-icon small>{{ status[issue.status].icon }}</v-icon>
          </v-avatar>
          {{ issue.status }}
        </v-chip>
      </div>
      <div
        style="cursor: pointer; user-select: none"
        class="title flex-grow-1"
        @click="expanded = !expanded"
      >
        {{ issue.title }}
      </div>
    </div>
    <template v-if="expanded">
      <div class="mt-2">{{ issue.description }}</div>
      <div class="d-flex justify-space-between align-end">
        <div>
          <template v-if="issue.tags.length">
            <template v-for="(tag, index) in issue.tags">
              <v-chip small class="mr-2 mt-2" :key="index">{{
                tag.name
              }}</v-chip>
            </template>
          </template>
        </div>
        <template v-if="issue.status !== 'CLOSED'">
          <v-btn depressed @click.prevent="closeIssue(issue.id)">
            mark as closed
          </v-btn>
        </template>
      </div>
    </template>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import closeIssue from "@/graphql/closeIssue.gql";

export default {
  props: ["issue"],
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    ...mapState({
      status: state => state.status
    })
  },
  methods: {
    async closeIssue(id) {
      this.submitting = true;
      console.log(id);
      try {
        const res = await this.$apollo
          .mutate({
            mutation: closeIssue,
            variables: {
              id: id
            }
          })
          .then(({ data }) => data && data.closeIssue);
        this.issue = res;
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
