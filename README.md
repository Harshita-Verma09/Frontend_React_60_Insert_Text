## Text Input and Display Component

This React component provides a simple text input area where users can type and press Enter to add their input to a list.  The last entered item in the list will be highlighted for a short period.

### Features

* **Text Input:** A textarea allows users to enter text.
* **Add to List:** Pressing the Enter key adds the current text to a list.
* **Dynamic Display:** The list of entered texts is displayed, with each item on a new line.
* **Highlighting:** The most recently added item is highlighted for 2 seconds.

### Code Breakdown

```react
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

```
ExplanationState Management:text: Stores the current text in the textarea.content:  An array holding all the entered text strings.highlightedIndex:  Stores the index of the item to be highlighted.handleKeyDown Function:Triggered when a key is pressed in the textarea.If the Enter key is pressed and the text is not empty:Prevents the default Enter behavior (newline).Adds the text to the content array.Sets highlightedIndex to the index of the newly added item.Clears the textarea (setText("")).useEffect Hook:Triggered when highlightedIndex changes.If highlightedIndex is not null (meaning an item has just been added):Sets a timer to reset highlightedIndex to null after 2 seconds.Clears the timer when the component unmounts or if highlightedIndex changes before the timer finishes.  This prevents errors and ensures only the latest item is highlighted.JSX Rendering:The textarea allows text input.The div displays the content array.The map function iterates through the content array and renders each item in a <p> tag.The <p> tag's class name dynamically changes based on whether its index matches highlightedIndex.  If they match, the background is set to bg-blue-300 for a highlight effect.  The class also includes a smooth color transition.How to UseType text into the textarea.Press the Enter key to add the text to the
