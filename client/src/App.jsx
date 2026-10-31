import Home from './pages/Home';
import ChatWidget from './components/ChatWidget';
import './index.css';

function App() {
  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <Home />
      <ChatWidget />
    </div>
  );
}

export default App;
