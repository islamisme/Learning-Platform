import React, { FormEvent, useRef, useState } from "react"
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from "./App"
import { useEnrolledCourses } from "../../context/EnrolledCoursesContext"
import AI from "./AI"
import { RichTextEditor } from "./RichTextEditor"

type NoteFormProps = {
  onSubmit: (data: NoteData) => Promise<void> | void
  onAddTag: (label: string) => Promise<Tag>
  availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
  courseId,
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const [markdownContent, setMarkdownContent] = useState(markdown)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const [Ai, setAi] = useState(0)
  const [searchParams] = useSearchParams()
  const initialCourseFromQuery = searchParams.get("course") ?? undefined
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(
    courseId ?? initialCourseFromQuery ?? undefined
  )
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { enrolledCourses } = useEnrolledCourses()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitError(null)
    setSubmitting(true)
    try {
      await onSubmit({
        title: titleRef.current!.value,
        markdown: markdownContent,
        tags: selectedTags,
        courseId: selectedCourseId,
      })
      navigate("..")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save note"
      setSubmitError(message)
    } finally {
      setSubmitting(false)
    }
  }
function handle_Ai(){

  
}
  return (
    <Form onSubmit={handleSubmit}>
      {submitError && (
        <Alert variant="danger" className="bg-danger/20 border-danger/40 text-white">
          {submitError}
        </Alert>
      )}
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="course">
              <Form.Label>Course</Form.Label>
              <Form.Select
                value={selectedCourseId ?? ""}
                onChange={e =>
                  setSelectedCourseId(
                    e.target.value === "" ? undefined : e.target.value
                  )
                }
              >
                <option value="">Select course (optional)</option>
                {enrolledCourses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                classNamePrefix="react-select"
                onCreateOption={async label => {
                  const newTag = await onAddTag(label)
                  setSelectedTags(prev => [...prev, newTag])
                }}
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label className="text-[#D5C9FF]">Note Content</Form.Label>
          <RichTextEditor
            value={markdownContent}
            onChange={setMarkdownContent}
            placeholder="Write your notes here... Use the formatting tools above!"
            rows={15}
          />
          {Ai ? <AI/> : ""}
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            {submitting ? "Saving..." : "Save"}
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}
