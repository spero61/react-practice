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
    children: [{ text: 'A line of text in a paragraph.'}],
  },
];

const customValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Slate.js here we go!'}],
  },
];

function App() {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <div className="App">
      <header className="App-header"></header>
      <body>
      {/* Add the editable component inside the context. */}
      <Slate editor={editor} value={initialValue}>
        <Editable />
      </Slate>
      <br></br>
      <Slate editor={editor} value={customValue}>
        <Editable />
      </Slate>
      </body>
    </div>
  );
}

export default App;
