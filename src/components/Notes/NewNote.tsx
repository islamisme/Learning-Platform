import { NoteData, Tag } from "./App"
import { NoteForm } from "./NoteForm"

type NewNoteProps = {
  onSubmit: (data: NoteData) => Promise<void> | void
  onAddTag: (label: string) => Promise<Tag>
  availableTags: Tag[]
}

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}
