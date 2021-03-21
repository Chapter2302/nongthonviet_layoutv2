export default async function({ store, redirect }) {
  if (!store.getters.getUserInfo.fullName) {
    return redirect("/");
  }
}
