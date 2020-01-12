<template>
  <div>
    <div class="blue py-12 white--text">
      <div class="font-weight-bold display-2 mb-5 text-center">
        Customer Web Support
      </div>
      <v-container class="mb-6">
        <v-row justify="center" no-gutters>
          <v-col cols="12" lg="4" md="8" sm="8">
            <div class="text-center">
              The application name above didn't meant to make sense nor this
              description cause this is just a demo.
              <hr />
              you can log in as a user: user@cwsupport.com | secret or as an
              admin: admin@cwsupport.com | secret
              <hr />
              for the full experience login as an admin
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-row class="mt-n12" justify="center" no-gutters>
        <v-col cols="12" lg="4" md="8" sm="8">
          <v-card class="pb-2">
            <v-tabs grow>
              <v-tab>login</v-tab>
              <v-tab>new account</v-tab>
              <v-tab-item>
                <div class="pa-6">
                  <v-form @submit.prevent="login">
                    <v-text-field
                      v-model="credentials.email"
                      dense
                      outlined
                      label="email"
                    />
                    <v-text-field
                      v-model="credentials.password"
                      class="pa-0"
                      dense
                      outlined
                      label="password"
                      type="password"
                    />
                    <v-checkbox dense label="remember me"></v-checkbox>
                    <v-btn
                      type="submit"
                      class="white--text"
                      block
                      color="blue"
                      depressed
                      >login</v-btn
                    >
                  </v-form>
                </div>
              </v-tab-item>
              <v-tab-item>
                <div class="pa-6">
                  <v-form @submit.prevent="register">
                    <v-text-field
                      v-model="newUser.name"
                      dense
                      outlined
                      label="full name"
                    />
                    <v-text-field
                      v-model="newUser.email"
                      dense
                      outlined
                      label="email"
                    />
                    <v-text-field
                      v-model="newUser.password"
                      class="pa-0"
                      dense
                      outlined
                      label="password"
                      type="password"
                    />
                    <v-text-field
                      v-model="newUser.password_confirmation"
                      class="pa-0"
                      dense
                      outlined
                      label="password confirmation"
                      type="password"
                    />
                    <v-btn
                      type="submit"
                      class="white--text"
                      block
                      color="blue"
                      depressed
                      >register</v-btn
                    >
                  </v-form>
                </div>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import login from "@/graphql/login.gql";
import register from "@/graphql/register.gql";

export default {
  middleware: "isGuest",
  data() {
    return {
      isAuthenticated: false,
      submitting: false,
      error: null,
      credentials: {
        email: "",
        password: ""
      },
      newUser: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    async login() {
      this.submitting = true;
      const credentials = this.credentials;
      try {
        const res = await this.$apollo
          .mutate({
            mutation: login,
            variables: credentials
          })
          .then(({ data }) => data && data.login);
        await this.$apolloHelpers.onLogin(res.access_token, undefined, {
          expires: 7
        });
        await this.$store.dispatch("auth/fetchUser");
        await this.$store.dispatch("Customer/Issues/fetch");
      } catch (e) {
        console.error(e);
        this.error = e;
      }
      this.submitting = false;
      if (this.$store.state.auth.user.is_admin) {
        this.$router.push("/admin");
      } else {
        this.$router.push("/customer");
      }
    },
    async register() {
      this.submitting = true;
      const newUser = this.newUser;
      try {
        const res = await this.$apollo
          .mutate({
            mutation: register,
            variables: newUser
          })
          .then(({ data }) => data && data.register);
        await this.$apolloHelpers.onLogin(res.access_token, undefined, {
          expires: 7
        });
        await this.$store.dispatch("auth/fetchUser");
        await this.$store.dispatch("Customer/Issues/fetch");
      } catch (e) {
        console.error(e);
        this.error = e;
      }
      this.submitting = false;
      if (this.$store.state.auth.user.is_admin) {
        this.$router.push("/admin");
      } else {
        this.$router.push("/customer");
      }
    }
  }
};
</script>
