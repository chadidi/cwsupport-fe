export default function ({
  app,
  store,
  redirect
}) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken || !store.state.auth.isAuthenticated || !store.state.auth.user) {
    return redirect('/')
  }
}
