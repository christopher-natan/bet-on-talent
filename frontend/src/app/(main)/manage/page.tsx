import {ManageView} from './components/manage-view'

export default async function ManagePage() {
  return (
    <section className="space-y-6">
      <h1 className="sr-only">Manage</h1>
      <ManageView/>
    </section>
  )
}
