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
              <v-chip small class="mr-2 mt-2" :key="index">{{ tag }}</v-chip>
            </template>
          </template>
        </div>
        <template v-if="issue.status !== 'closed'">
          <v-btn depressed>
            mark as closed
          </v-btn>
        </template>
      </div>
    </template>
  </v-card>
</template>

<script>
export default {
  props: ["issue"],
  data() {
    return {
      expanded: false,
      status: {
        SUBMITTED: { color: "blue", icon: "mdi-checkbox-marked-circle" },
        IN_PROGRESS: { color: "orange", icon: "mdi-clock" },
        RESOLVED: { color: "green", icon: "mdi-checkbox-marked-circle" },
        CLOSED: { color: "red", icon: "mdi-lock" }
      }
    };
  }
};
</script>

<style></style>
