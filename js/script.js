class MusicPlayer {
    constructor() {
        this.songs = [];
        this.filteredSongs = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.audio = document.getElementById('audioPlayer');
        
        // Configuración de carpetas de géneros
        this.genres = ['coros', 'himnos', 'testimoniales', 'especiales'];
        
        this.initializeElements();
        this.loadSongs();
        this.setupEventListeners();
    }

    initializeElements() {
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progress = document.getElementById('progress');
        this.progressBar = document.querySelector('.progress-bar');
        this.currentTime = document.getElementById('currentTime');
        this.duration = document.getElementById('duration');
        this.songTitle = document.getElementById('songTitle');
        this.songGenre = document.getElementById('songGenre');
        this.albumCover = document.getElementById('albumCover');
        this.playlist = document.getElementById('playlist');
        this.searchInput = document.getElementById('searchInput');
        this.filterBtns = document.querySelectorAll('.filter-btn');
    }

    async loadSongs() {
        this.songs = [];
        
        for (const genre of this.genres) {
            try {
                // Intentar cargar la lista de archivos de cada carpeta
                const songFiles = await this.getSongsFromFolder(genre);
                
                for (const file of songFiles) {
                    this.songs.push({
                        title: this.formatSongTitle(file),
                        file: `mp3/${genre}/${file}`,
                        genre: genre,
                        cover: `mp3/${genre}/cover.jpg`,
                        duration: '0:00'
                    });
                }
            } catch (error) {
                console.log(`No se pudieron cargar canciones de ${genre}:`, error);
            }
        }
        
        // Si no se pueden cargar automáticamente, usar lista manual
        if (this.songs.length === 0) {
            this.loadManualSongs();
        }
        
        this.filteredSongs = [...this.songs];
        this.renderPlaylist();
        
        if (this.songs.length > 0) {
            this.loadSong(0);
        }
    }

    // Método para cargar archivos automáticamente (requiere servidor web)
    async getSongsFromFolder(genre) {
        try {
            const response = await fetch(`mp3/${genre}/`);
            if (!response.ok) throw new Error('Folder not accessible');
            
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const links = doc.querySelectorAll('a[href$=".mp3"]');
            
            return Array.from(links).map(link => link.getAttribute('href'));
        } catch (error) {
            throw error;
        }
    }

    // Lista manual de canciones (actualiza aquí cuando agregues nuevos archivos)
    loadManualSongs() {
        // Ejemplo de canciones - actualiza esta lista cuando agregues nuevos archivos
        const manualSongs = [
            // Coros
            { title: "Ejemplo Coro 1", file: "coro1.mp3", genre: "coros" },
            { title: "Ejemplo Coro 2", file: "coro2.mp3", genre: "coros" },
            
            // Himnos
            { title: "Ejemplo Himno 1", file: "himno1.mp3", genre: "himnos" },
            { title: "Ejemplo Himno 2", file: "himno2.mp3", genre: "himnos" },
            
            // Testimoniales
            { title: "Testimonio Hermano Juan", file: "testimonio1.mp3", genre: "testimoniales" },
            
            // Especiales
            { title: "Alabanza Especial", file: "especial1.mp3", genre: "especiales" }
        ];

        this.songs = manualSongs.map(song => ({
            title: song.title,
            file: `mp3/${song.genre}/${song.file}`,
            genre: song.genre,
            cover: `mp3/${song.genre}/cover.jpg`,
            duration: '0:00'
        }));
    }

    formatSongTitle(filename) {
        return filename.replace('.mp3', '').replace(/[-_]/g, ' ');
    }

    setupEventListeners() {
        // Controles del reproductor
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.previousSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());

        // Barra de progreso
        this.progressBar.addEventListener('click', (e) => this.setProgress(e));

        // Audio eventos
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextSong());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());

        // Búsqueda
        this.searchInput.addEventListener('input', (e) => this.filterSongs(e.target.value));

        // Filtros de género
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterByGenre(e.target.dataset.genre));
        });
    }

    loadSong(index) {
        if (index < 0 || index >= this.filteredSongs.length) return;
        
        this.currentIndex = index;
        const song = this.filteredSongs[index];
        
        this.audio.src = song.file;
        this.songTitle.textContent = song.title;
        this.songGenre.textContent = song.genre.charAt(0).toUpperCase() + song.genre.slice(1);
        
        // Cargar imagen de carátula
        this.loadAlbumCover(song.cover);
        
        this.updateActiveItem();
    }

    loadAlbumCover(coverPath) {
        const img = new Image();
        img.onload = () => {
            this.albumCover.src = coverPath;
        };
        img.onerror = () => {
            this.albumCover.src = this.createDefaultCover();
        };
        img.src = coverPath;
    }

    createDefaultCover() {
        const svg = `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
                <rect width="150" height="150" fill="#f0f0f0"/>
                <text x="75" y="70" text-anchor="middle" font-family="Arial" font-size="16" fill="#999">🎵</text>
                <text x="75" y="90" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">Sin Carátula</text>
            </svg>
        `)}`;
        return svg;
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.playBtn.textContent = '▶';
            this.isPlaying = false;
        } else {
            this.audio.play();
            this.playBtn.textContent = '⏸';
            this.isPlaying = true;
        }
    }

    previousSong() {
        const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.filteredSongs.length - 1;
        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    nextSong() {
        const newIndex = this.currentIndex < this.filteredSongs.length - 1 ? this.currentIndex + 1 : 0;
        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    updateProgress() {
        const { currentTime, duration } = this.audio;
        const progressPercent = (currentTime / duration) * 100;
        this.progress.style.width = `${progressPercent}%`;
        
        this.currentTime.textContent = this.formatTime(currentTime);
    }

    updateDuration() {
        this.duration.textContent = this.formatTime(this.audio.duration);
    }

    setProgress(e) {
        const clickX = e.offsetX;
        const width = this.progressBar.offsetWidth;
        const duration = this.audio.duration;
        
        this.audio.currentTime = (clickX / width) * duration;
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    renderPlaylist() {
        this.playlist.innerHTML = '';
        
        this.filteredSongs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'song-item';
            songItem.innerHTML = `
                <img src="${song.cover}" alt="${song.title}" class="song-cover" 
                     onerror="this.src='${this.createDefaultCover()}'">
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-genre">${song.genre}</div>
                </div>
                <div class="song-duration">${song.duration}</div>
            `;
            
            songItem.addEventListener('click', () => {
                this.loadSong(index);
                this.togglePlay();
            });
            
            this.playlist.appendChild(songItem);
        });

        this.updateActiveItem();
    }

    updateActiveItem() {
        const items = this.playlist.querySelectorAll('.song-item');
        items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
    }

    filterSongs(searchTerm) {
        const filtered = this.songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        this.filteredSongs = filtered;
        this.currentIndex = 0;
        this.renderPlaylist();
        
        if (this.filteredSongs.length > 0) {
            this.loadSong(0);
        }
    }

    filterByGenre(genre) {
        // Actualizar botones activos
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.genre === genre);
        });
        
        if (genre === 'all') {
            this.filteredSongs = [...this.songs];
        } else {
            this.filteredSongs = this.songs.filter(song => song.genre === genre);
        }
        
        this.currentIndex = 0;
        this.renderPlaylist();
        
        if (this.filteredSongs.length > 0) {
            this.loadSong(0);
        }

        // Limpiar búsqueda
        this.searchInput.value = '';
    }
}

// Inicializar el reproductor cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});
