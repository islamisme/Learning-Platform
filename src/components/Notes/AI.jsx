import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useLocalStorage } from "./useLocalStorage"; // Adjust path as needed

function AI() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [includeContext, setIncludeContext] = useState(true);
  
  const [notes, setNotes] = useLocalStorage("NOTES", []);
  const [tags, setTags] = useLocalStorage("TAGS", []);
  
  // Get notes with their tags
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { 
        ...note, 
        tags: tags.filter(tag => note.tagIds.includes(tag.id)) 
      };
    });
  }, [notes, tags]);

  // Get unique course names from notes
  const courseNames = useMemo(() => {
    const courses = [...new Set(notes.map(note => note.course).filter(Boolean))];
    return courses;
  }, [notes]);

  // Filter notes based on selected tag or course
  const filteredNotes = useMemo(() => {
    let filtered = notesWithTags;

    if (selectedTag) {
      filtered = filtered.filter(note => 
        note.tagIds.includes(selectedTag)
      );
    }

    if (selectedCourse) {
      filtered = filtered.filter(note => 
        note.course === selectedCourse
      );
    }

    return filtered;
  }, [notesWithTags, selectedTag, selectedCourse]);

  // Build context from filtered notes
  const buildContext = () => {
    if (!includeContext || filteredNotes.length === 0) {
      return "";
    }

    const contextParts = [
      "Here are my notes that might help answer the question:",
      ""
    ];

    filteredNotes.forEach((note, index) => {
      contextParts.push(`--- Note ${index + 1} ---`);
      contextParts.push(`Title: ${note.title || 'Untitled'}`);
      if (note.course) contextParts.push(`Course: ${note.course}`);
      if (note.tags.length > 0) {
        contextParts.push(`Tags: ${note.tags.map(t => t.label).join(', ')}`);
      }
      contextParts.push(`Content: ${note.markdown}`);
      contextParts.push("");
    });

    contextParts.push("---");
    contextParts.push("");
    contextParts.push("Based on these notes, please answer:");
    
    return contextParts.join("\n");
  };

  async function getAIResponse() {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const context = buildContext();
      const fullPrompt = context ? `${context}\n${input}` : input;

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [{ role: "user", content: fullPrompt }],
          max_tokens: 1500,
        }),
      });

      if (!res.ok) throw new Error("AI request failed");

      const data = await res.json();
      const aiText = data?.choices?.[0]?.message?.content || "No response received";
      setResponse(aiText);
    } catch (err) {
      setError("Failed to get AI response. Check API key or network.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleClearFilters = () => {
    setSelectedTag("");
    setSelectedCourse("");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start p-8
                    bg-gradient-to-b from-[#050615] via-[#1F1A55] to-[#6C47FF] overflow-hidden">
      
      {/* Starfield Overlay */}
      <div className="absolute inset-0 bg-[url('/starfield.png')] bg-cover bg-center opacity-20 pointer-events-none"></div>

      <div className="relative w-full max-w-4xl space-y-6">
        <h1 className="text-white text-3xl font-bold mb-6 tracking-wide text-center">
          AI Assistant with Notes Context
        </h1>

        {/* Filter Section */}
        <div className="p-5 rounded-xl bg-[rgba(15,18,35,0.65)] border border-[rgba(112,94,255,0.35)] 
                        backdrop-blur-md shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-lg">Context Filters</h2>
            <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={includeContext}
                onChange={(e) => setIncludeContext(e.target.checked)}
                className="w-4 h-4 rounded border-[#705EFF] bg-[rgba(15,18,35,0.65)] 
                          checked:bg-[#60F5FF] focus:ring-2 focus:ring-[#60F5FF]/50"
              />
              Include notes as context
            </label>
          </div>

          {includeContext && (
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Tag Filter */}
              <div className="space-y-2">
                <label className="text-sm text-[#D5C9FF] font-medium">Filter by Tag</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[rgba(15,18,35,0.65)] border border-[rgba(112,94,255,0.35)]
                            text-white focus:outline-none focus:ring-2 focus:ring-[#60F5FF]/50 transition-all"
                >
                  <option value="">All Tags</option>
                  {tags.map(tag => (
                    <option key={tag.id} value={tag.id}>
                      {tag.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Course Filter */}
              <div className="space-y-2">
                <label className="text-sm text-[#D5C9FF] font-medium">Filter by Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[rgba(15,18,35,0.65)] border border-[rgba(112,94,255,0.35)]
                            text-white focus:outline-none focus:ring-2 focus:ring-[#60F5FF]/50 transition-all"
                >
                  <option value="">All Courses</option>
                  {courseNames.map(course => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Active Filters Info */}
          {includeContext && (selectedTag || selectedCourse) && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#60F5FF]/10 border border-[#60F5FF]/30">
              <div className="text-sm text-white">
                <span className="font-semibold">{filteredNotes.length}</span> notes selected
                {selectedTag && <span className="ml-2">• Tag: {tags.find(t => t.id === selectedTag)?.label}</span>}
                {selectedCourse && <span className="ml-2">• Course: {selectedCourse}</span>}
              </div>
              <button
                onClick={handleClearFilters}
                className="text-xs text-[#60F5FF] hover:text-white transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your notes..."
            className="w-full h-40 p-4 rounded-xl bg-[rgba(15,18,35,0.65)]
                      border border-[rgba(112,94,255,0.35)] shadow-lg text-white placeholder-[#D5C9FF]
                      backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#60F5FF]/50 transition-all
                      resize-none"
          />

          <button
            onClick={getAIResponse}
            disabled={loading || !input.trim()}
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#6C47FF] to-[#60F5FF]
                      text-white font-semibold hover:shadow-lg hover:shadow-[#6C47FF]/40 
                      transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                      hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Thinking...
              </span>
            ) : (
              "Get AI Response"
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Response Display */}
        {response && (
          <div className="p-6 rounded-xl bg-[rgba(15,18,35,0.65)] border border-[rgba(112,94,255,0.35)]
                          shadow-lg backdrop-blur-md transition-all">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(112,94,255,0.35)]">
              <h3 className="text-white font-semibold text-lg">AI Response</h3>
              <button
                onClick={() => setResponse("")}
                className="text-sm text-[#D5C9FF] hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-white">
              <ReactMarkdown>
                {response}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AI;