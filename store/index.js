export const state = () => ({
  status: {
    SUBMITTED: {
      name: "Submitted",
      color: "blue",
      icon: "mdi-checkbox-marked-circle"
    },
    IN_PROGRESS: {
      name: "In Progress",
      color: "orange",
      icon: "mdi-clock"
    },
    RESOLVED: {
      name: "Resolved",
      color: "green",
      icon: "mdi-checkbox-marked-circle"
    },
    CLOSED: {
      name: "Closed",
      color: "red",
      icon: "mdi-lock"
    }
  }
})

export const mutations = {

}

export const actions = {
  async nuxtServerInit({
    dispatch
  }, {
    store,
    app
  }) {
    await dispatch('auth/fetchUser')
    await dispatch('Customer/Issues/fetch')
  }
}
