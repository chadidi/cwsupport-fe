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
            {{ issue.status }}
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
import editIssueModal from "~/components/Admin/editIssueModal";

export default {
  components: {
    editIssueModal
  },
  data() {
    return {
      displayModal: false,
      issue: {
        user: {
          name: "Abdellah CHADIDI",
          email: "chadidi97@gmail.com"
        },
        title: "hello, I have a big issue, help me",
        description: `Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum, et en étudiant tous les usages de ce mot dans la littérature classique, découvrit la source incontestable du Lorem Ipsum. Il provient en fait des sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et Malorum" (Des Suprêmes Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, est un traité sur la théorie de l'éthique. Les premières lignes du Lorem Ipsum, "Lorem ipsum dolor sit amet...", proviennent de la section 1.10.32. L'extrait standard de Lorem Ipsum utilisé depuis le XVIè siècle est reproduit ci-dessous pour les curieux. Les sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et Malorum" de Cicéron sont aussi reproduites dans leur version originale, accompagnée de la traduction anglaise de H. Rackham (1914).`,
        tags: ["abc", "defgh", "ijklmn", "opqrst", "uv", "wzyz"],
        status: "SUBMITTED"
      },
      status: {
        SUBMITTED: { color: "blue", icon: "mdi-checkbox-marked-circle" },
        IN_PROGRESS: { color: "orange", icon: "mdi-clock" },
        RESOLVED: { color: "green", icon: "mdi-checkbox-marked-circle" },
        CLOSED: { color: "red", icon: "mdi-lock" }
      }
    };
  },
  methods: {
    edit() {
      this.$refs.editModal.setData(this.issue);
      this.displayModal = true;
    },
    saved(data) {
      this.issue = { ...this.issue, ...data };
      this.displayModal = false;
    }
  }
};
</script>

<style></style>
