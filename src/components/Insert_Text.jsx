import { useState, useEffect } from "react";

export default function Document() {
    const [text, setText] = useState("");
    const [content, setContent] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && text.trim()) {
            e.preventDefault();
            const newContent = [...content, text];
            setContent(newContent);
            setHighlightedIndex(newContent.length - 1);
            setText("");
        }
    };
    useEffect(() => {
        if (highlightedIndex !== null) {
            const timer = setTimeout(() => setHighlightedIndex(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [highlightedIndex]);

    return (
        <div className="flex flex-col w-full max-w-xl mx-auto p-4 space-y-4 bg-gray-500 border rounded 
           flex justify-center">
            <textarea
                className="border p-2 w-full rounded"
                placeholder="Type here and press Enter"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className="border p-4 min-h-[200px] rounded bg-gray-200">
                {content.map((line, index) => (
                    <p
                        key={index}
                        className={`transition-colors duration-1000 ${index === highlightedIndex ? "bg-blue-300" : ""
                            } p-1 rounded`}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
}
