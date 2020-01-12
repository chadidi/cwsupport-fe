export default function ({
  app,
  store,
  redirect
}) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (hasToken && store.state.auth.isAuthenticated && store.state.auth.user) {
    if (store.state.auth.user.is_admin) {
      return redirect('/admin')
    }
    return redirect('/customer')
  }
}
