export default function ({
  store,
  redirect
}) {
  if (store.state.auth.user) {
    if (!store.state.auth.user.is_admin) {
      return redirect('/customer')
    }
  }
}
