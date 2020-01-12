import gql from "graphql-tag";

function initialState() {
  return {
    issues: [],
    createModalVisibility: false
  }
}

export const state = initialState

export const mutations = {
  SET(state, issues) {
    state.issues = issues
  },
  UNSHIFT(state, issue) {
    state.issues.unshift(issue)
  },
  SET_CREATE_MODAL_VISIBILITY(state, value) {
    state.createModalVisibility = value
  }
}

export const actions = {
  async fetch({
    commit,
    state
  }) {
    const hasToken = !!this.$apolloHelpers.getToken()
    if (hasToken) {
      const client = this.app.apolloProvider.defaultClient;
      const issues = await client
        .query({
          prefetch: true,
          query: gql `
          query {
            me {
              issues(orderBy: [{
                  field: "created_at",
                  order: DESC
                }]) {
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
        .then(({
          data
        }) => data && data.me && data.me.issues);
      console.log(issues);
      if (issues) {
        commit('SET', issues)
      }
    }
  }
}
