import type { NoteData, Tag, Note } from "./App"

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "")
if (!API_BASE) {
  throw new Error("VITE_API_URL is not configured")
}
const NOTES_URL = `${API_BASE}/notes/`
const TAGS_URL = `${API_BASE}/tags/`

type NotesResponse = { notes: Note[]; tags: Tag[] }
type NoteResponse = { note: Note; tags: Tag[] }
type TagResponse = { tag: Tag }

type FetchInit = RequestInit & { body?: BodyInit | null }

async function apiFetch<T>(url: string, init: FetchInit = {}): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    ...init,
  })

  const isJson = res.headers.get("content-type")?.includes("application/json")
  const payload = isJson ? await res.json().catch(() => null) : null

  if (!res.ok) {
    const message = payload?.error || payload?.message || res.statusText
    throw new Error(message || "Request failed")
  }

  return (payload as T) ?? ({} as T)
}

export async function fetchNotes(): Promise<NotesResponse> {
  return apiFetch<NotesResponse>(NOTES_URL)
}

export async function createNote(data: NoteData): Promise<NoteResponse> {
  return apiFetch<NoteResponse>(NOTES_URL, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateNote(
  id: string,
  data: NoteData
): Promise<NoteResponse> {
  return apiFetch<NoteResponse>(`${NOTES_URL}?id=${encodeURIComponent(id)}` , {
    method: "PUT",
    body: JSON.stringify({ ...data, id }),
  })
}

export async function deleteNote(id: string): Promise<void> {
  await apiFetch(`${NOTES_URL}?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  })
}

export async function createTag(label: string): Promise<Tag> {
  const { tag } = await apiFetch<TagResponse>(TAGS_URL, {
    method: "POST",
    body: JSON.stringify({ label }),
  })
  return tag
}

export async function updateTag(id: string, label: string): Promise<Tag> {
  const { tag } = await apiFetch<TagResponse>(`${TAGS_URL}?id=${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify({ id, label }),
  })
  return tag
}

export async function deleteTag(id: string): Promise<void> {
  await apiFetch(`${TAGS_URL}?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  })
}
