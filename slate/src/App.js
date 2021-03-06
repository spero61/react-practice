// Import React dependencies.
import React, { useState, useCallback, useMemo } from 'react';
// Import the Slate editor factory.
import { createEditor, Editor, Transforms, Text } from 'slate';
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import './App.css';

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true },
    );
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) },
    );
  },
};

function App() {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));

  // Update the initial content to be pulled from Local Storage if it exists.
  const initialValue = useMemo(
    () => JSON.parse(localStorage.getItem('content')) || [
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ],
    [],
  );

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
    <Slate
      editor={editor}
      value={initialValue}
      onChange={value => {
        const isAstChange = editor.operations.some(
          op => op.type !== 'set_selection',
        );
        if (isAstChange) {
          // Save the value to Local Storage
          const content = JSON.stringify(value);
          localStorage.setItem('content', content);
        }
      }}
    >

      <Toolbar editor={editor} />

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
              CustomEditor.toggleCodeBlock(editor);
              break;
            }
            case 'b': {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
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

const Toolbar = ({ editor }) => (
  <div>
    <button
      onMouseDown={event => {
        event.preventDefault();
        CustomEditor.toggleBoldMark(editor);
      }}
    >
      Bold
    </button>
    <button
      onMouseDown={event => {
        event.preventDefault();
        CustomEditor.toggleCodeBlock(editor);
      }}
    >
      Code Block
    </button>
  </div>
);

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
