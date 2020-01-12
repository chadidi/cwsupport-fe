import gql from "graphql-tag";

export const state = () => ({
  user: null,
  isAuthenticated: false
})

export const mutations = {
  SET_USER(state, data) {
    state.user = data
  }
}

export const actions = {
  async fetchUser({
    commit,
    state
  }) {
    const hasToken = !!this.$apolloHelpers.getToken()
    if (hasToken) {
      const client = this.app.apolloProvider.defaultClient
      // console.log(client)
      const res = await client.query({
        prefetch: true,
        query: gql `
        query {
              me {
                name
                email
              }
            }
          `
      }).then(({
        data
      }) => data);
      console.log(res);
      if (res) {
        commit('SET_USER', res)
      }
    }
  }
}
