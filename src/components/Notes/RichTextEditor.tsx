import React, { useRef, useState } from "react"
import { Button, Stack, Dropdown, Form } from "react-bootstrap"
import { Bold, Italic, Type, Palette, Heading2, Heading3, List, ListOrdered, Code } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  rows = 15,
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [selectedColor, setSelectedColor] = useState("#60F5FF")
  const [selectedSize, setSelectedSize] = useState("base")

  const colors = [
    { name: "Cyan", value: "#60F5FF" },
    { name: "Purple", value: "#6C47FF" },
    { name: "Pink", value: "#FF7DE8" },
    { name: "White", value: "#F5F7FF" },
    { name: "Light Gray", value: "#B7BCD9" },
    { name: "Red", value: "#FF6B6B" },
    { name: "Green", value: "#51CF66" },
    { name: "Orange", value: "#FFA500" },
  ]

  const sizes = {
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "22px",
    "2xl": "28px",
  }

  const insertFormat = (before: string, after: string = "") => {
    if (!textareaRef.current) return

    const start = textareaRef.current.selectionStart
    const end = textareaRef.current.selectionEnd
    const selectedText = value.substring(start, end)
    const beforeText = value.substring(0, start)
    const afterText = value.substring(end)

    const newValue = `${beforeText}${before}${selectedText}${after}${afterText}`
    onChange(newValue)

    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = start + before.length + selectedText.length
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
        textareaRef.current.focus()
      }
    }, 0)
  }

  const insertColoredText = () => {
    const colorCode = `<span style="color: ${selectedColor}">TEXT</span>`
    insertFormat(colorCode)
  }

  const insertSizedText = () => {
    const size = sizes[selectedSize as keyof typeof sizes]
    const sizeCode = `<span style="font-size: ${size}">TEXT</span>`
    insertFormat(sizeCode)
  }

  const formatOptions = [
    {
      icon: Bold,
      label: "Bold",
      onClick: () => insertFormat("**", "**"),
      title: "Bold (Ctrl+B)",
    },
    {
      icon: Italic,
      label: "Italic",
      onClick: () => insertFormat("_", "_"),
      title: "Italic (Ctrl+I)",
    },
    {
      icon: Code,
      label: "Code",
      onClick: () => insertFormat("`", "`"),
      title: "Inline Code",
    },
    {
      icon: Heading2,
      label: "H2",
      onClick: () => insertFormat("## ", "\n"),
      title: "Heading 2",
    },
    {
      icon: Heading3,
      label: "H3",
      onClick: () => insertFormat("### ", "\n"),
      title: "Heading 3",
    },
    {
      icon: List,
      label: "Bullet",
      onClick: () => insertFormat("- ", "\n"),
      title: "Bullet List",
    },
    {
      icon: ListOrdered,
      label: "Number",
      onClick: () => insertFormat("1. ", "\n"),
      title: "Numbered List",
    },
  ]

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-center rounded-lg border border-white/10 bg-[#0F1223]/50 p-3">
        {/* Format Buttons */}
        <Stack direction="horizontal" gap={1} className="flex-wrap">
          {formatOptions.map(option => {
            const IconComponent = option.icon
            return (
              <Button
                key={option.label}
                variant="outline-secondary"
                size="sm"
                onClick={option.onClick}
                title={option.title}
                className="border-white/20 text-[#D5C9FF] hover:border-[#60F5FF]/60 hover:text-[#60F5FF] bg-transparent d-flex align-items-center gap-1"
              >
                <IconComponent size={16} />
                <span className="text-xs">{option.label}</span>
              </Button>
            )
          })}
        </Stack>

        <div className="h-6 w-px bg-white/10" />

        {/* Color Picker */}
        <Dropdown className="d-inline-block">
          <Dropdown.Toggle
            variant="outline-secondary"
            size="sm"
            className="border-white/20 text-[#D5C9FF] hover:border-[#60F5FF]/60 hover:text-[#60F5FF] bg-transparent d-flex align-items-center gap-1"
            title="Text Color"
          >
            <Palette size={16} />
            <span className="text-xs">Color</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-[#0F1223] border-white/10">
            <div className="p-2 grid grid-cols-4 gap-2 min-w-max">
              {colors.map(color => (
                <button
                  key={color.value}
                  className="w-8 h-8 rounded border-2 border-white/20 hover:border-white/50 transition"
                  style={{
                    backgroundColor: color.value,
                    borderColor: selectedColor === color.value ? "white" : undefined,
                  }}
                  onClick={() => {
                    setSelectedColor(color.value)
                    insertColoredText()
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* Size Picker */}
        <Dropdown className="d-inline-block">
          <Dropdown.Toggle
            variant="outline-secondary"
            size="sm"
            className="border-white/20 text-[#D5C9FF] hover:border-[#60F5FF]/60 hover:text-[#60F5FF] bg-transparent d-flex align-items-center gap-1"
            title="Text Size"
          >
            <Type size={16} />
            <span className="text-xs">Size</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-[#0F1223] border-white/10">
            {Object.keys(sizes).map(size => (
              <Dropdown.Item
                key={size}
                className={`text-[#F5F7FF] ${
                  selectedSize === size ? "bg-[#6C47FF]/40" : ""
                }`}
                onClick={() => {
                  setSelectedSize(size)
                  insertSizedText()
                }}
              >
                <span style={{ fontSize: sizes[size as keyof typeof sizes] }}>
                  {size.toUpperCase()}
                </span>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <div className="text-[0.7rem] text-[#B7BCD9] ml-auto">
          {value.length} characters
        </div>
      </div>

      <Form.Control
        ref={textareaRef}
        as="textarea"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="border-white/10 bg-[#0F1223]/70 text-[#F5F7FF] rounded-lg"
        style={{
          resize: "vertical",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      />

      <div className="text-[0.75rem] text-[#B7BCD9] space-y-1">
        <p>💡 Tips: Use **bold**, _italic_, and `code` for markdown formatting</p>
        <p>Use color and size tools to add styling to specific text</p>
      </div>
    </div>
  )
}
