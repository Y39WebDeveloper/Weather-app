import "./App.css";
import { MeteoApp } from "./Components";
import { MeteoProvider } from "./Contexts/MeteoContext";

function App() {
  return (
    <MeteoProvider>
      <MeteoApp />
    </MeteoProvider>
  );
}

export default App;
