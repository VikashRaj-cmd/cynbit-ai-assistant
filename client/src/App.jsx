import Home from './pages/Home';
import ChatWidget from './components/ChatWidget';
import './index.css';

function App() {
  return (
    <>
      <Home />
      {/* ChatWidget is rendered globally — will appear on any page */}
      <ChatWidget />
    </>
  );
}

export default App;
