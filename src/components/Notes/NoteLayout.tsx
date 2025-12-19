import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "./App"

type NoteLayoutProps = {
  notes: Note[]
  loading?: boolean
}

export function NoteLayout({ notes, loading = false }: NoteLayoutProps) {
  const { id } = useParams()
  const note = notes.find(n => n.id === id)

  if (loading) {
    return null
  }

  if (note == null) return <Navigate to="/Home/Notes/" replace />

  return <Outlet context={note} />
}

export function useNote() {
  return useOutletContext<Note>()
}
