import React, { useEffect, useMemo, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NotesTheme.css"
import { Alert, Container, Spinner } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import { NewNote } from "./NewNote"
import { NoteList } from "./NoteList"
import { NoteLayout } from "./NoteLayout"
import { Note } from "./Note"
import { EditNote } from "./EditNote"
import { useNotes } from "../../context/NotesContext"
import {
  createNote as apiCreateNote,
  createTag as apiCreateTag,
  deleteNote as apiDeleteNote,
  deleteTag as apiDeleteTag,
  fetchNotes,
  updateNote as apiUpdateNote,
  updateTag as apiUpdateTag,
} from "./api"

export type Tag = { id: string; label: string }

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
  courseId?: string | null
}

export type Note = {
  id: string
  title: string
  markdown: string
  courseId?: string | null
  tags: Tag[]
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { updateNotes: updateContextNotes, updateTags: updateContextTags } = useNotes()

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const { notes: apiNotes, tags: apiTags } = await fetchNotes()
        if (!cancelled) {
          setNotes(apiNotes)
          setTags(apiTags)
          // Share notes with context for AI feature
          updateContextNotes(apiNotes)
          updateContextTags(apiTags)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load notes")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => ({
      ...note,
      tags: note.tags.map(tag => tags.find(t => t.id === tag.id) ?? tag),
    }))
  }, [notes, tags])

  async function onCreateNote({ tags: selectedTags, ...data }: NoteData) {
    const { note, tags: updatedTags } = await apiCreateNote({
      ...data,
      tags: selectedTags,
    })
    const updatedNotes = [note, ...notes.filter(n => n.id !== note.id)]
    setNotes(updatedNotes)
    setTags(updatedTags)
    // Share with context
    updateContextNotes(updatedNotes)
    updateContextTags(updatedTags)
  }

  async function onUpdateNote(id: string, { tags: selectedTags, ...data }: NoteData) {
    const { note, tags: updatedTags } = await apiUpdateNote(id, {
      ...data,
      tags: selectedTags,
    })
    const updatedNotes = notes.map(n => (n.id === id ? note : n))
    setNotes(updatedNotes)
    setTags(updatedTags)
    // Share with context
    updateContextNotes(updatedNotes)
    updateContextTags(updatedTags)
  }

  async function onDeleteNote(id: string) {
    await apiDeleteNote(id)
    const updatedNotes = notes.filter(note => note.id !== id)
    setNotes(updatedNotes)
    // Share with context
    updateContextNotes(updatedNotes)
  }

  async function addTag(label: string) {
    const newTag = await apiCreateTag(label)
    setTags(prev => {
      const existing = prev.find(t => t.id === newTag.id)
      if (existing) return prev
      return [...prev, newTag]
    })
    return newTag
  }

  async function updateTag(id: string, label: string) {
    const updated = await apiUpdateTag(id, label)
    setTags(prev => prev.map(tag => (tag.id === id ? updated : tag)))
  }

  async function deleteTag(id: string) {
    await apiDeleteTag(id)
    setTags(prev => prev.filter(tag => tag.id !== id))
    setNotes(prev =>
      prev.map(note => ({
        ...note,
        tags: note.tags.filter(tag => tag.id !== id),
      }))
    )
  }

  return (
    <div className="relative h-full">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(96,245,255,0.12),transparent_60%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,125,232,0.12),transparent_55%)]"
        aria-hidden
      />
      <Container className="notes-theme relative my-8 space-y-6 text-[#F5F7FF]">
        {loading && (
          <div className="d-flex align-items-center gap-2">
            <Spinner size="sm" animation="border" role="status" />
            <span>Loading notes…</span>
          </div>
        )}
        {error && (
          <Alert variant="danger" className="bg-danger/20 border-danger/40 text-white">
            {error}
          </Alert>
        )}
        <Routes>
          <Route
            index
            element={
              <NoteList
                notes={notesWithTags}
                availableTags={tags}
                onUpdateTag={updateTag}
                onDeleteTag={deleteTag}
                loading={loading}
              />
            }
          />
          <Route
            path="new"
            element={
              <NewNote
                onSubmit={onCreateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
          <Route
            path=":id"
            element={<NoteLayout notes={notesWithTags} loading={loading} />}
          >
            <Route index element={<Note onDelete={onDeleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                  onAddTag={addTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="." />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
