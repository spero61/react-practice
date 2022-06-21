// Import React dependencies.
import React, { useState, useCallback } from 'react';
// Import the Slate editor factory.
import { createEditor, Editor, Transforms, Text } from 'slate';
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import './App.css';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Slate is currently in beta. Its core API is usable now, but you might need to pull request fixes for advanced use cases. Some of its APIs are not "finalized" and will (breaking) change over time as we find better solutions.' }],
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

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        renderElement={renderElement}
        // Pass in the 'renderLeaf' function
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return;
          }
          switch (event.key) {
            case '`': {
              event.preventDefault();
              const [match] = Editor.nodes(
                editor,
                { match: n => n.type === 'code' },

              );
              // Toggle the block type depending on whether there's already a match.
              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code' },
                { match: n => Editor.isBlock(editor, n) },
              );
              break;
            }
            // When Ctrl+"B" is pressed, bold the text in the selection.
            case 'b': {
              event.preventDefault();
              Transforms.setNodes(
                editor,
                { bold: true },
                // Apply it to text nodes, and split the text node up if the
                // selection is overlapping only part of it.
                { match: n => Text.isText(n), split: true },
              );
              break;
            }
            default: {
              event.preventDefault();
            }
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

// Define a React component to render leaves with bold text.
const Leaf = props => (
  <span
    {...props.attributes}
    style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
  >
    {props.children}
  </span>
);

const DefaultElement = props => (
  <p {...props.attributes}>
    {props.children}
  </p>
);

export default App;
