import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Header from "./components/Header";
import ListUsers from "./screens/ListUsers";

function App() {
  return (
    <div className="app-container">
      <Header />
      <ListUsers />
    </div>
  );
}

export default App;
