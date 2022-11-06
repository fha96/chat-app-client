import './App.css';
import {useState , useEffect} from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');


function App() {
  const [message, setMessage] = useState();
  const [receinvedMessage, setReceivedMessage] = useState();

  const handleSend = () => {
    socket.emit('message',{message: message})
  };

  useEffect(() => {
    socket.on('user_disconnected', (payload) => {
      alert(payload.disconn);
    });
    socket.on('new_user_connected', payload => {
      alert(`New user connected with username: ${payload.user}`)
    });
    socket.on('received', (payload) => {
      setReceivedMessage(preValue => preValue = payload.message)
    });
  },[]);
  return (
    <div className="App">

      <form onSubmit={handleSend}>
      <input placeholder='Message...  ' name='message' onChange={(e) =>setMessage(e.target.value)}/>
      <input type='button' value='Send Message' onClick={handleSend}/>
      </form>
      {
        receinvedMessage && 
        <h2> { receinvedMessage } </h2>
      }
    </div>
  );
}

export default App;
