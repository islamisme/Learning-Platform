import React, { createContext, useContext, useState, useCallback } from 'react'

const NotesContext = createContext(null)

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([])
  const [tags, setTags] = useState([])

  const updateNotes = useCallback((newNotes) => {
    setNotes(newNotes)
  }, [])

  const updateTags = useCallback((newTags) => {
    setTags(newTags)
  }, [])

  const value = {
    notes,
    tags,
    updateNotes,
    updateTags,
  }

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const ctx = useContext(NotesContext)
  if (!ctx) {
    throw new Error('useNotes must be used within NotesProvider')
  }
  return ctx
}
