import { useMemo, useState } from "react"
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap"
import { Link, useSearchParams } from "react-router-dom"
import ReactSelect from "react-select"
import { Tag } from "./App"
import styles from "./NoteList.module.css"
import { courses } from "../../data/courses"

type SimplifiedNote = {
  tags: Tag[]
  title: string
  id: string
  courseId?: string
}

type NoteListProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
  loading?: boolean
}

type EditTagsModalProps = {
  show: boolean
  availableTags: Tag[]
  handleClose: () => void
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

export function NoteList({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
  loading = false,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const initialCourseFromQuery = searchParams.get("course")
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    initialCourseFromQuery ? [initialCourseFromQuery] : []
  )

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedCourses.length === 0 ||
          (note.courseId != null &&
            selectedCourses.includes(note.courseId))) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, selectedCourses, notes])

  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-6 shadow-[0_25px_55px_-20px_rgba(9,10,25,0.6)] backdrop-blur-xl">
      <Row className="align-items-center mb-3 text-[#F5F7FF]">
        <Col>
          <h1 className="text-2xl font-semibold">Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="new">
              <Button className="uppercase tracking-[0.2em] bg-[#6C47FF] border-[#6C47FF] hover:bg-[#7D5DFF]">
                Create
              </Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-secondary"
              className="uppercase tracking-[0.2em] border-white/20 text-[#D5C9FF] hover:border-[#60F5FF]/60 hover:text-[#60F5FF] bg-transparent"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form className="text-[#F5F7FF] mb-4">
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="title">
              <Form.Label className="text-xs uppercase tracking-[0.25em] text-[#B7BCD9]">
                Title
              </Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="border-white/10 bg-black/30 text-[#F5F7FF]"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="courseFilter">
              <Form.Label className="text-xs uppercase tracking-[0.25em] text-[#B7BCD9]">
                Course
              </Form.Label>
              <ReactSelect
                classNamePrefix="react-select"
                isMulti
                placeholder="All courses"
                value={selectedCourses.map(id => {
                  const course = courses.find(c => c.id === id)
                  return course
                    ? { label: course.title, value: course.id }
                    : { label: id, value: id }
                })}
                options={courses.map(course => ({
                  label: course.title,
                  value: course.id,
                }))}
                onChange={values => {
                  setSelectedCourses(values.map(v => v.value))
                }}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="tags">
              <Form.Label className="text-xs uppercase tracking-[0.25em] text-[#B7BCD9]">
                Tags
              </Form.Label>
              <ReactSelect
                classNamePrefix="react-select"
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
        <div className="text-[0.7rem] uppercase tracking-[0.3em] text-[#B7BCD9]">
          Showing {filteredNotes.length} note
          {filteredNotes.length === 1 ? '' : 's'}
        </div>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {loading && filteredNotes.length === 0 ? (
          <Col>
            <div className="text-center text-[#B7BCD9] py-4">Loading…</div>
          </Col>
        ) : (
          filteredNotes.map(note => (
            <Col key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          ))
        )}
      </Row>
      <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      />
    </div>
  )
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Card
      as={Link}
      to={id}
      className={`h-100 text-reset text-decoration-none ${styles.card} bg-[#0F1223]/80 border border-white/10 shadow-[0_15px_35px_-18px_rgba(10,12,25,0.9)]`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100 text-[#F5F7FF]"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map(tag => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={e => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
