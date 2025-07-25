import React, { useState, useEffect, useRef } from 'react';

// StarRating Component - now displays numerical rating out of 10
const StarRating = ({ rating }) => {
    const numericRating = parseFloat(rating) || 0;
    return (
        <div className="flex items-center">
            {/* Star Icon */}
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-yellow-400 font-bold text-sm">{numericRating}</span> {/* Removed /10 */}
        </div>
    );
};

// Helper function to color title (first word red, rest white)
const getColoredTitle = (title) => {
    const words = title.split(' ');
    if (words.length === 0) return title;

    const firstWord = words[0];
    const restOfWords = words.slice(1).join(' ');

    return (
        <>
            <span className="text-red-500">{firstWord}</span>{' '}
            {restOfWords && <span className="text-white">{restOfWords}</span>}
        </>
    );
};

// MovieCard Component (used for main movie list, with hover and watch button)
const MovieCard = ({ movie, setSelectedMovie, isUserLoggedIn, handleAddToList }) => {
    const [isHovered, setIsHovered] = useState(false); // State for hover effect

    return (
        <div
            key={movie.id}
            className="relative bg-gray-700 rounded-xl shadow-md overflow-hidden cursor-pointer
                       transform transition-all duration-300 ease-in-out
                       hover:scale-105 hover:shadow-xl group" // Added group for hover effects
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setSelectedMovie(movie)}
        >
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-72 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x450/000000/FFFFFF?text=Poster+Tidak+Tersedia"; }}
            />
            <div className="p-3">
                {/* New flex container for buttons, positioned above the title */}
                {isHovered && (
                    <div className="flex justify-between items-center mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedMovie(movie); }}
                            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-full" // Increased size
                        >
                            Tonton
                        </button>
                        {isUserLoggedIn && (
                            <button
                                onClick={(e) => handleAddToList(e, movie.title)}
                                className="bg-gray-900 bg-opacity-75 text-white rounded-full p-2 hover:bg-opacity-100"
                                title="Tambahkan ke Daftar"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                )}
                <h4 className="text-lg font-bold truncate text-white mb-1">{movie.title}</h4>
                <div className="flex justify-between items-start text-sm text-gray-400 mb-2">
                    {/* Kiri: Tahun Film, Genre */}
                    <div className="flex flex-col items-start">
                        <span>{movie.year}</span>
                        <span className="text-gray-300">{movie.genre}</span>
                    </div>
                    {/* Kanan: Durasi, Rating */}
                    <div className="flex flex-col items-end">
                        <span>{movie.duration}</span>
                        <StarRating rating={movie.averageRating} />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                    {movie.isPremium ? (
                        <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">Premium</span>
                    ) : (
                        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">Gratis</span>
                    )}
                </div>
            </div>
        </div>
    );
};

// LandingMovieCard Component (simplified for landing page, no hover effects or watch button)
const LandingMovieCard = ({ movie, setSelectedMovie }) => {
    return (
        <div
            key={movie.id}
            className="relative bg-gray-700 rounded-xl shadow-md overflow-hidden cursor-pointer
                       transform transition-all duration-300 ease-in-out" // No hover scale
            onClick={() => setSelectedMovie(movie)} // Still clickable to view details if desired
        >
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-72 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x450/000000/FFFFFF?text=Poster+Tidak+Tersedia"; }}
            />
            <div className="p-3">
                <h4 className="text-lg font-bold truncate text-white mb-1">{movie.title}</h4>
                <div className="flex justify-between items-start text-sm text-gray-400 mb-2">
                    {/* Kiri: Tahun Film, Genre */}
                    <div className="flex flex-col items-start">
                        <span>{movie.year}</span>
                        <span className="text-gray-300">{movie.genre}</span>
                    </div>
                    {/* Kanan: Durasi, Rating */}
                    <div className="flex flex-col items-end">
                        <span>{movie.duration}</span>
                        <StarRating rating={movie.averageRating} />
                    </div>
                </div>
            </div>
        </div>
    );
};


// LoginLandingView Component (replaces old LoginView)
const LoginLandingView = ({ movies, setSelectedMovie, loginUsername, setLoginUsername, loginPassword, setLoginPassword, handleLogin }) => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false); // New state to toggle between login and register

    // State for registration form
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    // Dummy registration handler
    const handleRegister = () => {
        if (registerUsername && registerPassword) {
            alert(`Pengguna baru "${registerUsername}" berhasil didaftarkan! Silakan login.`);
            // In a real app, you'd save this to a database
            setRegisterUsername('');
            setRegisterPassword('');
            setIsRegistering(false); // Switch back to login form after registration
        } else {
            alert('Harap isi semua kolom registrasi.');
        }
    };

    // Sort movies for "Film Terbaik" (by average rating descending)
    const bestMovies = [...movies].sort((a, b) => parseFloat(b.averageRating) - parseFloat(a.averageRating));

    return (
        <div className="min-h-screen bg-black text-white p-0 relative overflow-hidden">
            {/* Hero Section */}
            <div
                className="relative h-screen w-full bg-cover bg-center flex flex-col justify-center items-center text-center px-4"
                style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%), url('https://placehold.co/1920x1080/000000/FFFFFF?text=Netflix+Background')` }}
            >
                <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                        Film, acara TV tak terbatas, dan lebih banyak lagi.
                    </h1>
                    <p className="text-xl md:text-2xl mb-6">
                        Tonton di mana pun. Batalkan kapan pun.
                    </p>
                    <p className="text-lg md:text-xl mb-8">
                        Silakan login dan berlangganan mulai 15rb/bulan.
                    </p>
                    {!showLoginForm ? (
                        <button
                            onClick={() => setShowLoginForm(true)}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md text-xl transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Mulai
                        </button>
                    ) : (
                        <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-xl max-w-sm w-full"> {/* Box for form */}
                            <h2 className="text-3xl font-bold text-white mb-6 text-center">
                                {isRegistering ? 'Daftar Akun Baru' : 'Login'}
                            </h2>
                            {isRegistering ? (
                                <>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            value={registerUsername}
                                            onChange={(e) => setRegisterUsername(e.target.value)}
                                            className="bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={registerPassword}
                                            onChange={(e) => setRegisterPassword(e.target.value)}
                                            className="bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                                        />
                                    </div>
                                    <button
                                        onClick={handleRegister}
                                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md text-xl transition duration-300 ease-in-out transform hover:scale-105 w-full"
                                    >
                                        Daftar Sekarang
                                    </button>
                                    <p className="mt-4 text-center text-gray-400">
                                        Sudah punya akun?{' '}
                                        <button
                                            onClick={() => setIsRegistering(false)}
                                            className="text-red-500 hover:underline font-semibold"
                                        >
                                            Login
                                        </button>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            value={loginUsername}
                                            onChange={(e) => setLoginUsername(e.target.value)}
                                            className="bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            className="bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                                        />
                                    </div>
                                    <button
                                        onClick={handleLogin}
                                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md text-xl transition duration-300 ease-in-out transform hover:scale-105 w-full"
                                    >
                                        Login
                                    </button>
                                    <p className="mt-4 text-center text-gray-400">
                                        Belum punya akun?{' '}
                                        <button
                                            onClick={() => setIsRegistering(true)}
                                            className="text-red-500 hover:underline font-semibold"
                                        >
                                            Daftar Sekarang
                                        </button>
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Sections for Movies (simplified for landing page) */}
            <div className="py-12 bg-gray-900">
                <div className="w-full max-w-4xl mx-auto px-6">
                    {/* Section: Film Terbaik (Only 5, no watch button, no hover effect) */}
                    <div className="mb-12">
                        <h3 className="text-3xl font-bold text-white mb-6">Film Terbaik</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"> {/* Adjusted grid to show 5 */}
                            {bestMovies.slice(0, 5).map(movie => ( // Show top 5 best movies
                                <LandingMovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} />
                            ))}
                        </div>
                    </div>

                    {/* Removed Section: Rilis Terbaru */}
                </div>
            </div>

            {/* Pricing/FAQ Section */}
            <div className="py-12 bg-black text-center">
                <h2 className="text-4xl font-bold text-white mb-8">Pertanyaan yang Sering Diajukan</h2>
                <div className="max-w-3xl mx-auto px-4 space-y-4">
                    <div className="bg-gray-800 p-6 rounded-lg text-left">
                        <h3 className="text-xl font-semibold mb-2">Berapa biaya berlangganan?</h3>
                        <p className="text-gray-300">
                            Anda dapat menikmati semua film dan acara TV di Nonton Film hanya dengan Rp15.000 per bulan.
                            Tidak ada biaya tersembunyi atau kontrak jangka panjang.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-left">
                        <h3 className="text-xl font-semibold mb-2">Di mana saya bisa menonton?</h3>
                        <p className="text-gray-300">
                            Tonton di mana pun, kapan pun. Masuk dengan akun Nonton Film Anda untuk menonton langsung di situs web ini
                            dari komputer pribadi Anda atau di perangkat apa pun yang terhubung ke Internet.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-left">
                        <h3 className="text-xl font-semibold mb-2">Bagaimana cara membatalkan?</h3>
                        <p className="text-gray-300">
                            Nonton Film fleksibel. Tidak ada kontrak yang mengganggu dan tidak ada komitmen. Anda dapat dengan mudah membatalkan
                            keanggotaan Anda secara online kapan saja. Tidak ada biaya pembatalan.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 py-8 text-gray-400 text-center">
                <p>&copy; 2025 Nonton Film. Semua Hak Dilindungi.</p> {/* Updated copyright year */}
            </footer>
        </div>
    );
};


// AdminDashboardView Component
const AdminDashboardView = ({ movies, setMovies, isAdminLoggedIn, handleDeleteMovie }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMovie, setNewMovie] = useState({
        title: '',
        description: '',
        posterUrl: '',
        streamingLink: '',
        videoUrl: '',
        videoFile: null,
        isPremium: true,
        duration: '',
        year: '',
        producer: '',
        genre: '', // Added genre field
        uploadDate: new Date() // Default to current date
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewMovie(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const tempUrl = URL.createObjectURL(file);
            setNewMovie(prev => ({
                ...prev,
                videoFile: file,
                videoUrl: tempUrl
            }));
        } else {
            setNewMovie(prev => ({
                ...prev,
                videoFile: null,
                videoUrl: ''
            }));
        }
    };

    const handleAddMovie = (e) => {
        e.preventDefault();
        if (newMovie.title && newMovie.description) {
            setMovies(prev => [
                ...prev,
                {
                    ...newMovie,
                    id: Date.now().toString(),
                    ratings: [],
                    averageRating: 'N/A',
                    uploadDate: new Date() // Set upload date when added
                }
            ]);
            setNewMovie({ title: '', description: '', posterUrl: '', streamingLink: '', videoUrl: '', videoFile: null, isPremium: true, duration: '', year: '', producer: '', genre: '', uploadDate: new Date() });
            setShowAddForm(false);
            alert('Film berhasil ditambahkan!');
        }
    };

    return (
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-xl shadow-lg my-8">
            <h2 className="text-4xl font-bold text-purple-300 mb-6 text-center">Admin Dashboard</h2>

            <div className="mb-6 text-center">
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    {showAddForm ? 'Batal Tambah Film' : 'Tambah Film Baru'}
                </button>
            </div>

            {showAddForm && isAdminLoggedIn && (
                <form onSubmit={handleAddMovie} className="bg-gray-700 p-6 rounded-lg mb-8 shadow-inner">
                    <h3 className="text-2xl font-bold mb-4 text-purple-300">Formulir Tambah Film</h3>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">Judul Film:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newMovie.title}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                            placeholder="Masukkan judul film"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">Deskripsi:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newMovie.description}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 h-24 resize-none"
                            placeholder="Masukkan deskripsi film"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="posterUrl" className="block text-gray-300 text-sm font-bold mb-2">URL Poster (Opsional):</label>
                        <input
                            type="url"
                            id="posterUrl"
                            name="posterUrl"
                            value={newMovie.posterUrl}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                            placeholder="Masukkan URL poster film"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="streamingLink" className="block text-gray-300 text-sm font-bold mb-2">Tautan Streaming Legal (Opsional):</label>
                        <input
                            type="url"
                            id="streamingLink"
                            name="streamingLink"
                            value={newMovie.streamingLink}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                            placeholder="Masukkan tautan ke layanan streaming legal (mis. Netflix, Max)"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="duration" className="block text-gray-300 text-sm font-bold mb-2">Durasi (mis. 2h 30m):</label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            value={newMovie.duration}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                            placeholder="Masukkan durasi film"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="year" className="block text-gray-300 text-sm font-bold mb-2">Tahun Film:</label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            value={newMovie.year}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                            placeholder="Masukkan tahun film"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="producer" className="block text-gray-300 text-sm font-bold mb-2">Produser Film:</label>
                        <input
                            type="text"
                            id="producer"
                            name="producer"
                            value={newMovie.producer}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                            placeholder="Masukkan produser film"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="genre" className="block text-gray-300 text-sm font-bold mb-2">Genre Film:</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            value={newMovie.genre}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                            placeholder="Masukkan genre film (mis. Action, Sci-Fi)"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="videoFile" className="block text-gray-300 text-sm font-bold mb-2">Unggah File Video (Opsional, dari lokal):</label>
                        <input
                            type="file"
                            id="videoFile"
                            name="videoFile"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {newMovie.videoFile && (
                            <p className="text-sm text-gray-400 mt-1">
                                File terpilih: {newMovie.videoFile.name}
                            </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                            *Video yang diunggah dari file lokal hanya akan tersedia selama sesi browser ini.
                        </p>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Jenis Film:</label>
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="isPremium"
                                    value="true"
                                    checked={newMovie.isPremium === true}
                                    onChange={() => setNewMovie(prev => ({ ...prev, isPremium: true }))}
                                    className="form-radio text-purple-600 h-5 w-5"
                                />
                                <span className="ml-2 text-gray-300">Premium</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="isPremium"
                                    value="false"
                                    checked={newMovie.isPremium === false}
                                    onChange={() => setNewMovie(prev => ({ ...prev, isPremium: false }))}
                                    className="form-radio text-green-600 h-5 w-5"
                                />
                                <span className="ml-2 text-gray-300">Gratis</span>
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Tambahkan Film
                    </button>
                </form>
            )}

            {/* Admin can also see and delete movies from here for convenience */}
            <h3 className="text-2xl font-bold text-purple-300 mt-8 mb-4 text-center">Kelola Film yang Ada</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div
                            key={movie.id}
                            className="bg-gray-700 rounded-xl shadow-md overflow-hidden"
                        >
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-72 object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x450/000000/FFFFFF?text=Poster+Tidak+Tersedia"; }}
                            />
                            <div className="p-4">
                                {/* Judul film di admin dashboard juga putih semua */}
                                <h3 className="text-xl font-bold mb-2 text-white truncate">{movie.title}</h3>
                                <div className="flex items-center justify-between mb-2">
                                    <StarRating rating={movie.averageRating} />
                                    {movie.isPremium ? (
                                        <span className="bg-purple-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Premium</span>
                                    ) : (
                                        <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Gratis</span>
                                    )}
                                </div>
                                <p className="text-gray-400 text-sm line-clamp-3 mb-4">{movie.description}</p>
                                <button
                                    onClick={() => handleDeleteMovie(movie.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-full transition duration-300 ease-in-out w-full"
                                >
                                    Hapus Film
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 col-span-full">Belum ada film yang ditambahkan.</p>
                )}
            </div>
        </div>
    );
};

// MainMovieListView Component
const MainMovieListView = ({
    movies, selectedMovie, setSelectedMovie, isUserLoggedIn, isAdminLoggedIn,
    isSubscriptionActive, initiateSubscription, handleRateMovie, searchTerm
}) => {
    const videoRef = useRef(null); // Ref for video player in detail view
    const [viewAllCategory, setViewAllCategory] = useState(null); // State to view all movies in a category ('trending', 'latestRelease', or null)
    const INITIAL_DISPLAY_LIMIT = 4; // Number of movies to show initially in each category row

    // Filter movies based on searchTerm
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort filtered movies for "Trending Sekarang" (by average rating descending)
    const trendingMovies = [...filteredMovies].sort((a, b) => parseFloat(b.averageRating) - parseFloat(a.averageRating));
    // Sort filtered movies for "Rilis Terbaru" (by upload date descending)
    const latestReleaseMovies = [...filteredMovies].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

    // Select a "best" movie for the hero section (e.g., the highest rated movie)
    const bestMovie = trendingMovies.length > 0 ? trendingMovies[0] : null;

    // Handler for "Add to List" button/icon
    const handleAddToList = (e, movieTitle) => {
        e.stopPropagation(); // Prevent triggering setSelectedMovie
        alert(`Film "${movieTitle}" ditambahkan ke daftar Anda! (Fitur ini belum sepenuhnya diimplementasikan)`);
        // Di sini Anda akan menambahkan logika untuk menyimpan film ke daftar pengguna
    };

    return (
        <div className="w-full max-w-4xl bg-gray-900 p-6 rounded-xl shadow-lg my-8">
            {selectedMovie ? (
                // Movie Detail View
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <img
                            src={selectedMovie.posterUrl}
                            alt={selectedMovie.title}
                            className="w-64 h-96 object-cover rounded-lg shadow-md"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x450/000000/FFFFFF?text=Poster+Tidak+Tersedia"; }}
                        />
                        <div className="mt-2 text-center text-xl font-bold">
                            <StarRating rating={selectedMovie.averageRating} />
                        </div>
                    </div>
                    <div className="flex-grow">
                        {/* Judul film di detail view juga putih semua */}
                        <h2 className="text-4xl font-bold mb-3 text-white">{selectedMovie.title}</h2>
                        <p className="text-gray-300 text-lg mb-4">{selectedMovie.description}</p>

                        {/* User Rating Section */}
                        {isUserLoggedIn && (
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2 text-purple-300">Berikan Rating Anda (1-10):</h3>
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                                        <button
                                            key={score}
                                            onClick={() => handleRateMovie(score)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded-full transition duration-300 ease-in-out transform hover:scale-110 text-sm"
                                        >
                                            {score}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Conditional rendering for video player or streaming link based on login/subscription/admin status */}
                        {isUserLoggedIn ? (
                            (!selectedMovie.isPremium || isSubscriptionActive() || isAdminLoggedIn) ? ( // Check if free OR (premium AND subscribed/admin)
                                selectedMovie.videoUrl ? (
                                    <div className="mb-4 w-full">
                                        <h3 className="text-xl font-bold mb-2 text-purple-300">Tonton Film:</h3>
                                        <video
                                            ref={videoRef}
                                            controls
                                            className="w-full h-auto rounded-lg shadow-md"
                                            src={selectedMovie.videoUrl}
                                            onError={(e) => console.error("Error loading video:", e.target.error)}
                                        >
                                            Browser Anda tidak mendukung tag video.
                                        </video>
                                        <p className="text-sm text-gray-400 mt-2">
                                            *Jika Anda mengunggah dari file lokal, video hanya akan tersedia selama sesi browser ini.
                                        </p>
                                    </div>
                                ) : selectedMovie.streamingLink ? (
                                    <a
                                        href={selectedMovie.streamingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Tonton di Layanan Streaming
                                    </a>
                                ) : (
                                    <p className="text-gray-400">Tidak ada tautan streaming atau video langsung tersedia.</p>
                                )
                            ) : (
                                <div className="bg-yellow-700 p-4 rounded-lg mb-4 text-center">
                                    <p className="text-lg font-semibold mb-1">Film ini khusus Premium.</p> {/* Changed mb-2 to mb-1 */}
                                    <p className="text-sm italic mb-1">Langganan Anda telah berakhir atau belum aktif.</p> {/* Changed mb-4 to mb-1 and added italic */}
                                    <p className="text-sm italic mb-4">Silakan berlangganan atau perpanjang langganan untuk menonton film ini.</p> {/* Changed mb-4 to mb-2 and added italic */}
                                    <button
                                        onClick={() => { initiateSubscription(); setSelectedMovie(null); }}
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Berlangganan Sekarang!
                                    </button>
                                </div>
                            )
                        ) : (
                            <div className="bg-blue-700 p-4 rounded-lg mb-4 text-center">
                                <p className="text-lg font-semibold">Silakan login untuk menonton film.</p>
                            </div>
                        )}

                        {/* Download button - only appears if videoUrl is present and user is logged in and (subscribed or admin) */}
                        {selectedMovie.videoUrl && isUserLoggedIn && (!selectedMovie.isPremium || isSubscriptionActive() || isAdminLoggedIn) && (
                            <a
                                href={selectedMovie.videoUrl}
                                download={selectedMovie.videoFile ? selectedMovie.videoFile.name : `${selectedMovie.title}.mp4`} // Use original filename if local file
                                className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mt-4 mr-4"
                            >
                                Unduh Film
                            </a>
                        )}

                        <button
                            onClick={() => setSelectedMovie(null)}
                            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Kembali ke Daftar
                        </button>
                    </div>
                </div>
            ) : viewAllCategory ? (
                // View all movies for a specific category
                <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-white mb-4 text-center">
                        {viewAllCategory === 'trending' ? 'Semua Film Trending Sekarang' : 'Semua Film Rilis Terbaru'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> {/* Adjusted grid columns for wider cards */}
                        {(viewAllCategory === 'trending' ? trendingMovies : latestReleaseMovies).map(movie => (
                            <MovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} isUserLoggedIn={isUserLoggedIn} handleAddToList={handleAddToList} />
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setViewAllCategory(null)}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Kembali ke Kategori
                        </button>
                    </div>
                </div>
            ) : (
                // Movie Categories View (default)
                <div className="space-y-8">
                    {/* Section: Film Terbaik (Hero Section) */}
                    {bestMovie && (
                        <div
                            className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg flex items-end p-6 bg-cover bg-center"
                            style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%), url(${bestMovie.posterUrl || 'https://placehold.co/1920x1080/000000/FFFFFF?text=Film+Terbaik'})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                            <div className="relative z-10 text-white">
                                <h2 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">
                                    {getColoredTitle(bestMovie.title)}
                                </h2>
                                <p className="text-lg mb-2">{bestMovie.description}</p>
                                <div className="flex items-center space-x-4 text-gray-300 text-sm mb-4">
                                    <span className="bg-red-600 text-white px-2 py-1 rounded-md font-semibold">HD</span> {/* HD text color changed to red with white text */}
                                    <span>{bestMovie.duration}</span>
                                    <span>{bestMovie.year}</span>
                                    <span>{bestMovie.producer}</span>
                                    <StarRating rating={bestMovie.averageRating} />
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setSelectedMovie(bestMovie)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Tonton Sekarang
                                    </button>
                                    {isUserLoggedIn && (
                                        <button
                                            onClick={(e) => handleAddToList(e, bestMovie.title)}
                                            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                                        >
                                            Tambahkan ke Daftar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section: Trending Sekarang */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-3xl font-bold text-white">Trending Sekarang</h3>
                            {trendingMovies.length > INITIAL_DISPLAY_LIMIT && (
                                <button
                                    onClick={() => setViewAllCategory('trending')}
                                    className="text-red-600 hover:text-red-700 font-semibold flex items-center transition duration-300 ease-in-out"
                                >
                                    Lihat Semua
                                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            )}
                        </div>
                        {trendingMovies.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"> {/* Adjusted grid columns */}
                                {trendingMovies.slice(0, INITIAL_DISPLAY_LIMIT).map(movie => (
                                    <MovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} isUserLoggedIn={isUserLoggedIn} handleAddToList={handleAddToList} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-400">Belum ada film trending yang tersedia.</p>
                        )}
                    </div>

                    {/* Section: Rilis Terbaru */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-3xl font-bold text-white">Rilis Terbaru</h3>
                            {latestReleaseMovies.length > INITIAL_DISPLAY_LIMIT && (
                                <button
                                    onClick={() => setViewAllCategory('latestRelease')}
                                    className="text-red-600 hover:text-red-700 font-semibold flex items-center transition duration-300 ease-in-out"
                                >
                                    Lihat Semua
                                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            )}
                        </div>
                        {latestReleaseMovies.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"> {/* Adjusted grid columns */}
                                {latestReleaseMovies.slice(0, INITIAL_DISPLAY_LIMIT).map(movie => (
                                    <MovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} isUserLoggedIn={isUserLoggedIn} handleAddToList={handleAddToList} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-400">Belum ada film rilis terbaru yang tersedia.</p>
                        )}
                    </div>

                    {/* Anda bisa menambahkan lebih banyak kategori di sini */}

                </div>
            )}
        </div>
    );
};


// Main App component
const App = () => {
    // State to manage the list of movies
    const [movies, setMovies] = useState([]);
    // State to manage the currently selected movie for detail view
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Admin states
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const ADMIN_PASSCODE = '12345'; // Simple hardcoded password for demonstration
    const ADMIN_USERNAME = 'admin'; // Hardcoded admin username

    // User states
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [loginUsername, setLoginUsername] = useState(''); // Combined username input
    const [loginPassword, setLoginPassword] = useState(''); // Combined password input
    const [subscriptionEndDate, setSubscriptionEndDate] = useState(null); // New: Stores Date object for subscription end

    // UI state for sidebar menu and payment modal
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false); // New state for payment modal

    // Real-time clock state
    const [currentTime, setCurrentTime] = useState('');

    // New: State to manage the current active view/page
    const [currentView, setCurrentView] = useState('login'); // 'login', 'movies', 'adminDashboard'

    // New: State for search term
    const [searchTerm, setSearchTerm] = useState('');

    // Helper to check if subscription is active
    const isSubscriptionActive = () => {
        return subscriptionEndDate && new Date() < new Date(subscriptionEndDate);
    };

    // Effect for real-time clock
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // Format time for Indonesia (WIB - Western Indonesian Time)
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Asia/Jakarta', // Jakarta is WIB
                hour12: false // Use 24-hour format
            };
            const formattedTime = now.toLocaleTimeString('id-ID', options);

            // Format date for Indonesia
            const dateOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Jakarta'
            };
            const formattedDate = now.toLocaleDateString('id-ID', dateOptions);

            setCurrentTime(`${formattedDate}, ${formattedTime} WIB`);
        };

        // Update time immediately on mount
        updateTime();

        // Update time every second
        const intervalId = setInterval(updateTime, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    // Dummy data for initial movies
    useEffect(() => {
        const today = new Date();
        // Calculate dates relative to today for testing premium-to-free logic
        const fourMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 4, today.getDate());
        const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
        const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());


        setMovies([
            {
                id: '1',
                title: 'Dune: Part Two',
                description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against those who destroyed his family.',
                posterUrl: 'https://placehold.co/300x450/000000/FFFFFF?text=Dune+2+Poster',
                streamingLink: 'https://www.max.com/dune-part-two',
                videoUrl: '',
                ratings: [9, 8, 9], // Example ratings out of 10
                isPremium: true,
                duration: '2h 46m',
                year: '2024',
                producer: 'Legendary Pictures',
                genre: 'Sci-Fi, Adventure', // Added genre
                uploadDate: oneMonthAgo // Uploaded 1 month ago, still premium
            },
            {
                id: '2',
                title: 'Interstellar',
                description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
                posterUrl: 'https://placehold.co/300x450/000000/FFFFFF?text=Interstellar+Poster',
                streamingLink: 'https://www.primevideo.com/interstellar',
                videoUrl: '',
                ratings: [10, 9, 9, 10],
                isPremium: true,
                duration: '2h 49m',
                year: '2014',
                producer: 'Paramount Pictures',
                genre: 'Sci-Fi, Drama', // Added genre
                uploadDate: twoMonthsAgo // Uploaded 2 months ago, still premium
            },
            {
                id: '3',
                title: 'The Matrix',
                description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
                posterUrl: 'https://placehold.co/300x450/000000/FFFFFF?text=Matrix+Poster',
                streamingLink: 'https://www.netflix.com/the-matrix',
                videoUrl: '',
                ratings: [8, 9, 8],
                isPremium: false, // Originally free, will remain free
                duration: '2h 16m',
                year: '1999',
                producer: 'Warner Bros.',
                genre: 'Sci-Fi, Action', // Added genre
                uploadDate: new Date(1999, 3, 31) // Old, always free
            },
            {
                id: '4',
                title: 'Spider-Man: No Way Home',
                description: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.',
                posterUrl: 'https://placehold.co/300x450/000000/FFFFFF?text=Spider-Man+NWH+Poster',
                streamingLink: 'https://www.sonypictures.com/movies/spidermannowayhome',
                videoUrl: '',
                ratings: [9, 10, 9, 9],
                isPremium: true,
                duration: '2h 28m',
                year: '2021',
                producer: 'Columbia Pictures',
                genre: 'Action, Adventure', // Added genre
                uploadDate: fourMonthsAgo // Uploaded 4 months ago, should become free
            },
            {
                id: '5',
                title: 'Free Guy',
                description: 'A bank teller discovers that he is actually a background player in an open-world video game, and decides to become the hero of his own story.',
                posterUrl: 'https://placehold.co/300x450/000000/FFFFFF?text=Free+Guy+Poster',
                streamingLink: 'https://www.disneyplus.com/free-guy',
                videoUrl: '',
                ratings: [8, 8, 9],
                isPremium: false, // Originally free
                duration: '1h 55m',
                year: '2021',
                producer: '20th Century Studios',
                genre: 'Action, Comedy', // Added genre
                uploadDate: new Date(2021, 7, 13) // Old, always free
            },
            {
                id: '6',
                title: 'Inception',
                description: 'A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                posterUrl: 'https://placehold.co/300x450/000000/FFFFFF?text=Inception+Poster',
                streamingLink: 'https://www.primevideo.com/inception',
                videoUrl: '',
                ratings: [10, 10, 10, 10],
                isPremium: true,
                duration: '2h 28m',
                year: '2010',
                producer: 'Warner Bros.',
                genre: 'Sci-Fi, Thriller', // Added genre
                uploadDate: oneMonthAgo // Uploaded 1 month ago, still premium
            },
            {
                id: '7',
                title: 'The Avengers',
                description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.',
                posterUrl: 'https://placehold.co/300x450/000000/FFFFFF?text=Avengers+Poster',
                streamingLink: 'https://www.disneyplus.com/the-avengers',
                videoUrl: '',
                ratings: [9, 8, 9],
                isPremium: true,
                duration: '2h 23m',
                year: '2012',
                producer: 'Marvel Studios',
                genre: 'Action, Sci-Fi', // Added genre
                uploadDate: threeMonthsAgo // Uploaded exactly 3 months ago, should become free
            },
            {
                id: '8',
                title: 'Guardians of the Galaxy',
                description: 'A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.',
                posterUrl: 'https://placehold.co/300x450/000000/FFFFFF?text=Guardians+Poster',
                streamingLink: 'https://www.disneyplus.com/guardians-of-the-galaxy',
                videoUrl: '',
                ratings: [8, 9, 8],
                isPremium: true,
                duration: '2h 2m',
                year: '2014',
                producer: 'Marvel Studios',
                genre: 'Sci-Fi, Comedy', // Added genre
                uploadDate: twoMonthsAgo // Uploaded 2 months ago, still premium
            },
            {
                id: '9',
                title: 'Big Hero 6',
                description: 'The special bond that develops between plus-sized inflatable robot Baymax, and prodigy Hiro Hamada, who team up with a group of friends to form a band of high-tech heroes.',
                posterUrl: 'https://placehold.co/300x450/000000/FFFFFF?text=Big+Hero+6+Poster',
                streamingLink: 'https://www.disneyplus.com/big-hero-6',
                videoUrl: '',
                ratings: [9, 8, 8],
                isPremium: false,
                duration: '1h 42m',
                year: '2014',
                producer: 'Walt Disney Animation Studios',
                genre: 'Animation, Adventure', // Added genre
                uploadDate: new Date(2014, 10, 7) // Old, always free
            },
            {
                id: '10',
                title: 'Coco',
                description: 'Aspiring musician Miguel, confronted with his family\'s ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.',
                posterUrl: 'https://placehold.co/300x450/000000/FFFFFF?text=Coco+Poster',
                streamingLink: 'https://www.disneyplus.com/coco',
                videoUrl: '',
                ratings: [10, 10, 10],
                isPremium: false,
                duration: '1h 45m',
                year: '2017',
                producer: 'Pixar Animation Studios',
                genre: 'Animation, Family', // Added genre
                uploadDate: new Date(2017, 10, 22) // Old, always free
            }
        ].map(movie => {
            const newAverageRating = movie.ratings.length > 0 ? (movie.ratings.reduce((sum, r) => sum + r, 0) / movie.ratings.length).toFixed(1) : 'N/A';
            
            // Determine if premium movie should become free based on uploadDate
            // Check if uploadDate exists and if it's 3 months or older
            const isThreeMonthsOld = movie.uploadDate && (today.getTime() - movie.uploadDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44) >= 3; // Approx 3 months
            const finalIsPremium = movie.isPremium && !isThreeMonthsOld; // If originally premium, check if it's old enough to be free

            return {
                ...movie,
                averageRating: newAverageRating,
                isPremium: finalIsPremium
            };
        }));
    }, []);

    // Handle deleting a movie (remains in App as it modifies global movies state)
    const handleDeleteMovie = (id) => {
        console.log('Mencoba menghapus film dengan ID:', id);
        if (window.confirm('Apakah Anda yakin ingin menghapus film ini?')) {
            setMovies(prev => {
                const updatedMovies = prev.filter(movie => movie.id !== id);
                console.log('Film setelah dihapus:', updatedMovies);
                return updatedMovies;
            });
            setSelectedMovie(null);
            alert('Film berhasil dihapus (hanya di sisi klien).');
        } else {
            console.log('Penghapusan film dibatalkan.');
        }
    };

    // Handle user rating submission (remains in App as it modifies global movies state)
    const handleRateMovie = (rating) => {
        if (!selectedMovie) return;

        setMovies(prevMovies => {
            const updatedMovies = prevMovies.map(movie => {
                if (movie.id === selectedMovie.id) {
                    const newRatings = [...movie.ratings, rating];
                    const newAverageRating = (newRatings.reduce((sum, r) => sum + r, 0) / newRatings.length).toFixed(1);
                    return { ...movie, ratings: newRatings, averageRating: newAverageRating };
                }
                return movie;
            });
            setSelectedMovie(updatedMovies.find(m => m.id === selectedMovie.id));
            alert(`Anda memberikan rating ${rating} untuk ${selectedMovie.title}`);
            return updatedMovies;
        });
    };

    // Handle combined login
    const handleLogin = () => {
        if (loginUsername === ADMIN_USERNAME && loginPassword === ADMIN_PASSCODE) {
            setIsAdminLoggedIn(true);
            setIsUserLoggedIn(true);
            setSubscriptionEndDate(null); // Admin doesn't need subscription date
            alert('Berhasil login sebagai Admin!');
            setCurrentView('adminDashboard'); // Navigate to admin dashboard
        } else if (loginUsername && loginPassword) {
            setIsUserLoggedIn(true);
            setIsAdminLoggedIn(false);
            setSubscriptionEndDate(new Date(Date.now() - 24 * 60 * 60 * 1000)); // Set to yesterday for initial non-subscribed state
            alert('Berhasil login sebagai Pengguna!');
            setCurrentView('movies'); // Navigate to main movie list
        } else {
            alert('Masukkan username dan password.');
        }
        setLoginUsername('');
        setLoginPassword('');
        setShowSideMenu(false); // Close sidebar after login attempt
    };

    // Handle combined logout
    const handleLogout = () => {
        setIsUserLoggedIn(false);
        setIsAdminLoggedIn(false);
        setSubscriptionEndDate(null); // Reset subscription date on logout
        alert('Berhasil logout.');
        setCurrentView('login'); // Navigate back to login page
        setShowSideMenu(false); // Close sidebar after logout
        setSelectedMovie(null); // Deselect any selected movie
    };

    // Function to initiate subscription process (show payment modal)
    const initiateSubscription = () => {
        setShowPaymentModal(true);
        setShowSideMenu(false); // Close sidebar when payment modal opens
    };

    // Function to confirm simulated payment and activate subscription
    const confirmPaymentAndSubscribe = () => {
        const newEndDate = new Date();
        newEndDate.setMonth(newEndDate.getMonth() + 1); // Add one month
        setSubscriptionEndDate(newEndDate);
        alert(`Langganan Anda aktif hingga ${newEndDate.toLocaleDateString('id-ID')}!`);
        setShowPaymentModal(false); // Close payment modal
        setSelectedMovie(null); // Go back to list after subscribe
    };

    return (
        <div className="min-h-screen bg-black text-white font-inter p-4 flex flex-col items-center relative overflow-hidden">
            {/* Hamburger Menu Icon */}
            <button
                onClick={() => setShowSideMenu(!showSideMenu)}
                className="absolute top-4 left-4 z-50 p-2 bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            {/* Sidebar Menu */}
            <div
                className={`fixed top-0 left-0 h-full bg-gray-800 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${showSideMenu ? 'translate-x-0' : '-translate-x-full'} w-64 p-6 flex flex-col`}
            >
                <button
                    onClick={() => setShowSideMenu(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                    aria-label="Close menu"
                >
                    &times;
                </button>
                <h2 className="text-3xl font-bold text-purple-300 mb-6 mt-10">Menu</h2>

                {isUserLoggedIn ? (
                    <div className="flex flex-col space-y-4">
                        <p className="text-lg text-gray-200">Anda login sebagai: {isAdminLoggedIn ? 'Admin' : 'Pengguna'}</p>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => { setCurrentView('movies'); setShowSideMenu(false); setSelectedMovie(null); }}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Lihat Daftar Film
                        </button>
                        {isAdminLoggedIn && (
                            <button
                                onClick={() => { setCurrentView('adminDashboard'); setShowSideMenu(false); }}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 w-full"
                            >
                                Dashboard Admin
                            </button>
                        )}
                        {!isAdminLoggedIn && currentView === 'movies' && (
                            <div className="mt-6 p-4 bg-yellow-700 rounded-lg text-center">
                                <p className="text-md font-semibold mb-2">
                                    {isSubscriptionActive() ?
                                        `Langganan aktif hingga: ${new Date(subscriptionEndDate).toLocaleDateString('id-ID')}` :
                                        'Langganan Anda tidak aktif.'
                                    }
                                </p>
                                <p className="text-sm mb-1 italic">Langganan Anda telah berakhir atau belum aktif.</p> {/* Changed mb-4 to mb-1 and added italic */}
                                <p className="text-sm mb-2 italic">Silakan berlangganan atau perpanjang langganan untuk menonton film ini.</p> {/* Changed mb-4 to mb-2 and added italic */}
                                <button
                                    onClick={initiateSubscription}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    {isSubscriptionActive() ? 'Perpanjang Langganan' : 'Berlangganan Sekarang!'}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-xl font-semibold text-gray-200">Login</h3>
                        <input
                            type="text"
                            placeholder="Username"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            className="shadow appearance-none border rounded-lg py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="shadow appearance-none border rounded-lg py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                        />
                        <button
                            onClick={handleLogin}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md text-center relative">
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
                            aria-label="Close payment"
                        >
                            &times;
                        </button>
                        <h3 className="text-3xl font-bold text-purple-300 mb-6">Pembayaran Langganan (Rp15.000)</h3>
                        <p className="text-gray-300 mb-6">Silakan pilih metode pembayaran dan ikuti instruksi:</p>

                        <div className="space-y-4 text-left mb-8">
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="text-xl font-semibold text-pink-400 mb-2">QRIS (Simulasi)</h4>
                                <p className="text-gray-300 text-sm">Scan QRIS ini dengan aplikasi pembayaran Anda:</p>
                                <img
                                    src="https://placehold.co/150x150/22c55e/ffffff?text=QRIS+Dummy"
                                    alt="QRIS Dummy"
                                    className="mx-auto my-4 rounded-md"
                                />
                                <p className="text-gray-300 text-sm">Jumlah: Rp15.000</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="text-xl font-semibold text-pink-400 mb-2">Transfer Bank (Simulasi)</h4>
                                <p className="text-gray-300 text-sm">Transfer ke rekening berikut:</p>
                                <p className="text-lg font-bold text-white mt-2">Bank ABC: 1234-5678-9012 (a.n. PT Filmku)</p>
                                <p className="text-gray-300 text-sm">Jumlah: Rp15.000</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="text-xl font-semibold text-pink-400 mb-2">OVO / DANA (Simulasi)</h4>
                                <p className="text-gray-300 text-sm">Kirim ke nomor berikut:</p>
                                <p className="text-lg font-bold text-white mt-2">OVO/DANA: 0812-3456-7890</p>
                                <p className="text-gray-300 text-sm">Jumlah: Rp15.000</p>
                            </div>
                        </div>

                        <button
                            onClick={confirmPaymentAndSubscribe}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Konfirmasi Pembayaran (Simulasi)
                        </button>
                        <p className="text-xs text-gray-400 mt-4">
                            *Ini adalah simulasi pembayaran. Tidak ada uang sungguhan yang akan ditransfer.
                        </p>
                    </div>
                </div>
            )}


            <header className="w-full max-w-4xl py-6 px-4 flex items-center justify-between bg-black z-30 relative">
                <div className="flex items-center space-x-4">
                    {/* Mengubah font dan warna judul "Nonton Film" */}
                    <h1 className="text-4xl font-sans font-extrabold text-red-600 tracking-wide">
                        Nonton Film
                    </h1>
                </div>

                {/* Search Bar (hanya ditampilkan jika bukan di halaman login) */}
                {currentView !== 'login' && (
                    <div className="flex-grow max-w-md mx-4 relative">
                        <input
                            type="text"
                            placeholder="Cari film..."
                            value={searchTerm} // Bind value to searchTerm state
                            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on change
                            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500" // Simplified className
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                )}

                <div className="flex items-center space-x-4">
                    {/* Tampilan Jam Real-time dengan estetika yang ditingkatkan */}
                    <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 hidden md:block">
                        {currentTime}
                    </div>
                    {/* Placeholder untuk ikon profil/pengguna - Dihapus */}
                </div>
            </header>

            <main className="w-full max-w-4xl">
                {currentView === 'login' && (
                    <LoginLandingView
                        movies={movies}
                        setSelectedMovie={setSelectedMovie}
                        loginUsername={loginUsername}
                        setLoginUsername={setLoginUsername}
                        loginPassword={loginPassword}
                        setLoginPassword={setLoginPassword}
                        handleLogin={handleLogin}
                    />
                )}
                {currentView === 'movies' && (
                    <MainMovieListView
                        movies={movies}
                        selectedMovie={selectedMovie}
                        setSelectedMovie={setSelectedMovie}
                        isUserLoggedIn={isUserLoggedIn}
                        isAdminLoggedIn={isAdminLoggedIn}
                        isSubscriptionActive={isSubscriptionActive}
                        initiateSubscription={initiateSubscription}
                        handleRateMovie={handleRateMovie}
                        searchTerm={searchTerm} // Pass searchTerm to MainMovieListView
                    />
                )}
                {currentView === 'adminDashboard' && isAdminLoggedIn && (
                    <AdminDashboardView
                        movies={movies}
                        setMovies={setMovies}
                        isAdminLoggedIn={isAdminLoggedIn}
                        handleDeleteMovie={handleDeleteMovie}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
