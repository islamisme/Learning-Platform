import React from "react"
import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useNote } from "./NoteLayout"
import { StyledMarkdown } from "./StyledMarkdown"
import { courses } from "../../data/courses"

type NoteProps = {
  onDelete: (id: string) => void
}

export function Note({ onDelete }: NoteProps) {
  const note = useNote()
  const navigate = useNavigate()
  const course = note.courseId
    ? courses.find(c => c.id === note.courseId)
    : undefined

  return (
    <>
      <Row className="align-items-center mb-4 text-[#F5F7FF]">
        <Col>
          <h1 className="text-3xl font-semibold">{note.title}</h1>
          {course && (
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#B7BCD9]">
              Course: {course.title}
            </p>
          )}
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap mt-2">
              {note.tags.map(tag => (
                <Badge className="text-truncate bg-[#6C47FF]/80 border border-white/10" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="edit">
              <Button className="uppercase tracking-[0.2em] bg-[#6C47FF] border-[#6C47FF] hover:bg-[#7D5DFF]">
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(note.id)
                navigate("/Home/Notes/")
              }}
              variant="outline-danger"
              className="uppercase tracking-[0.2em] border-red-500/60 text-red-400 bg-transparent"
            >
              Delete
            </Button>
            <Link to="/Home/Notes/">
              <Button
                variant="outline-secondary"
                className="uppercase tracking-[0.2em] border-white/30 text-[#D5C9FF] bg-transparent hover:border-[#60F5FF]/60 hover:text-[#60F5FF]"
              >
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <div className="mt-4 rounded-2xl border border-white/10 bg-[#050615]/70 p-6 text-[#F5F7FF] shadow-[0_20px_45px_-18px_rgba(5,6,21,0.9)]">
        <StyledMarkdown>{note.markdown}</StyledMarkdown>
      </div>
    </>
  )
}
