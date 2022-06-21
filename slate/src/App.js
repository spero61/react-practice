// Import React dependencies.
import React, { useState, useCallback } from 'react';
// Import the Slate editor factory.
import { createEditor, Editor, Transforms } from 'slate';
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

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  // useCallback API: https://reactjs.org/docs/hooks-reference.html#usecallback
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        renderElement={renderElement}
        onKeyDown={event => {
          if (event.key === '`' && event.ctrlKey) {
            event.preventDefault();
            // Determine whether any of the currently selected blocks are code blocks.
            const [match] = Editor.nodes(
              editor,
              { match: n => n.type === 'code' },
            );

            // Transform API: https://docs.slatejs.org/api/transforms
            // use transform because Slate's data structure is immutable

            // Toggle the block type depending on whether there's already a match.
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              { match: n => Editor.isBlock(editor, n) },
            );
          }
        }}
      />
    </Slate>
  );
}

// code blocks need to be rendered differently
const CodeElement = props => (
  <pre {...props.attributes}>
    <code>{props.children}</code>
  </pre>
);

const DefaultElement = props => (
  <p {...props.attributes}>
    {props.children}
  </p>
);

export default App;
