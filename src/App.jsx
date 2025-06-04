import Movies from "./components/Movies";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold p-6">Películas del MCU</h1>
      <Movies />
    </div>
  );
}

export default App;