import Timeline from "../components/Timeline";

function Home() {
    return (
        <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-center mb-2">Marvel Cinematic Universe Roadmap</h1>
                <p className="text-center text-gray-400">Explora el universo de marvel por orden cronológico</p>
            </header>

            <main>
                <Timeline />
            </main>
        </div>
    )
}

export default Home;