<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card class="pa-6">
      <div class="title blue--text mb-4">edit issue</div>
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
        <v-select
          outlined
          dense
          v-model="issue.status"
          :items="statusValues"
          label="status"
        />
        <div class="d-flex justify-space-between">
          <v-btn depressed @click="$emit('cancel')">
            cancel
          </v-btn>
          <v-btn
            depressed
            @click="$emit('saved', issue)"
            class="white--text"
            color="green"
          >
            save
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

export default {
  props: ["value"],
  data() {
    return {
      issue: {
        title: "",
        description: "",
        tags: [],
        status: ""
      },
      statusValues: ["SUBMITTED", "IN_PROGRESS", "RESOLVED", "CLOSED"]
    };
  },
  methods: {
    setData(issue) {
      this.issue = _.cloneDeep(issue);
    }
  }
};
</script>

<style></style>
