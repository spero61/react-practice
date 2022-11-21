import './App.css';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const handleChange = ({ target: { value } }) => setName(value);

  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000)); // to simulate 1 sec of delay
    alert(`Moi, ${name}!`);
    setDisabled(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{' '}
          <input type="text" value={name} onChange={handleChange} />
        </label>
        <input type="submit" id="submit" value="Submit" disabled={disabled} />
      </form>
    </>
  );
}

export default App;