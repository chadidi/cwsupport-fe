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
              description cause this is just a demo. you can log in as a user:
              user@cwsupport.com | secret or as an admin: admin@cwsupport.com |
              secret
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
                  <v-form>
                    <v-text-field dense outlined label="email" />
                    <v-text-field
                      class="pa-0"
                      dense
                      outlined
                      label="password"
                    />
                    <v-checkbox dense label="remember me"></v-checkbox>
                    <v-btn class="white--text" block color="blue" depressed
                      >login</v-btn
                    >
                  </v-form>
                </div>
              </v-tab-item>
              <v-tab-item>
                <div class="pa-6">
                  <v-form>
                    <v-text-field dense outlined label="full name" />
                    <v-text-field dense outlined label="email" />
                    <v-text-field
                      class="pa-0"
                      dense
                      outlined
                      label="password"
                    />
                    <v-text-field
                      class="pa-0"
                      dense
                      outlined
                      label="password confirmation"
                    />
                    <v-btn class="white--text" block color="blue" depressed
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
export default {};
</script>

<style></style>
