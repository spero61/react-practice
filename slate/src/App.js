// Import React dependencies.
import React, { useState } from 'react';
// Import the Slate editor factory.
import { createEditor } from 'slate';
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import './App.css';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'This is initialValue' }],
  },
];

function App() {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <div className="container">
      {/* Add the editable component inside the context. */}
      <Slate editor={editor} value={initialValue}>
        <Editable
          // Adding Event Handlers: https://docs.slatejs.org/walkthroughs/02-adding-event-handlers
          // onKeyDown={event => { console.log(event.key); }}
          onKeyDown={event => {
            if (event.key === '&') {
              event.preventDefault();
              editor.insertText('and');
            }
          }}
        />
      </Slate>
    </div>
  );
}

export default App;
