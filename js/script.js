class AlabanzasPlayer {
    constructor() {
        this.songs = [];
        this.filteredSongs = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.isRepeating = false;
        this.currentGenre = 'all';
        this.audio = document.getElementById('audioPlayer');
        this.isUserSeeking = false;
        
        this.initializeElements();
        this.loadSongs();
        this.setupEventListeners();
    }

    initializeElements() {
        // Player controls
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.repeatBtn = document.getElementById('repeatBtn');
        
        // Icons
        this.playIcon = document.getElementById('playIcon');
        this.pauseIcon = document.getElementById('pauseIcon');
        
        // Progress
        this.progress = document.getElementById('progress');
        this.progressBar = document.getElementById('progressBar');
        this.progressHandle = document.getElementById('progressHandle');
        this.currentTime = document.getElementById('currentTime');
        this.duration = document.getElementById('duration');
        
        // Track info
        this.songTitle = document.getElementById('songTitle');
        this.songArtist = document.getElementById('songArtist');
        this.songGenre = document.getElementById('songGenre');
        this.albumCover = document.getElementById('albumCover');
        
        // UI elements
        this.playlist = document.getElementById('playlist');
        this.searchInput = document.getElementById('searchInput');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.loading = document.getElementById('loading');
        this.mainContent = document.getElementById('mainContent');
        this.stats = document.getElementById('stats');
        this.messages = document.getElementById('messages');
        
        // Volume
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeValue = document.getElementById('volumeValue');
        this.muteBtn = document.getElementById('muteBtn');
        this.volumeIcon = document.getElementById('volumeIcon');
        
        // Genre filters
        this.genreButtons = document.querySelectorAll('.filter-btn');
    }

    // ======================== SECCIÓN DE CANCIONES ========================
async loadSongs() {
    this.songs = [
    {
        "title": "01.  Adoradle",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/01.- Adoradle.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "02.  Dulce Comunión",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/02.- Dulce Comunión.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "03.  Cerca de ti Señor",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/03.- Cerca de ti Señor.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "04.  El gran médico",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/04.- El gran médico.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "07.  Todo a Cristo yo me rindo",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/07.- Todo a Cristo yo me rindo.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "10.  Melodías Celestiales",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/10.- Melodías Celestiales.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "13.  Dulce Oración",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/13.- Dulce Oración.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "14.  Oh que amigo",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/14.- Oh que amigo.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "22.  Oh yo quiero andar con Cristo",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/22.- Oh yo quiero andar con Cristo.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "29.  Digno es el cordero",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/29.- Digno es el cordero.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "30.  Hay poder en Jesús",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/30.- Hay poder en Jesús.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "32.  Gloria a Jesús",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/32.- Gloria a Jesús.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "33.  Grande gozo hay",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/33.- Grande gozo hay.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "35.  La llamada",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/35.- La llamada.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "36.  Entera consagracion",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/36.- Entera consagracion.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "37.  Dia feliz",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/37.- Dia feliz.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "38.  El Consolador ha venido",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/38.- El Consolador ha venido.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "39.  Santa Biblia",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/39.- Santa Biblia.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "40.  En los negocios del Rey",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/40.- En los negocios del Rey.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "43.  A Jesucristo ven",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/43.- A Jesucristo ven.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "44.  El mundo deje",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/44.- El mundo deje.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "46.  Mas blanco que la nieve",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/46.- Mas blanco que la nieve.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "48.  Eres limpio en la Sangre",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/48.- Eres limpio en la Sangre.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "50.  Te loamos oh Dios",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/50.- Te loamos oh Dios.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "52.  Es Cristo la Roca",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/52.- Es Cristo la Roca.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "53.  En la Cruz",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/53.- En la Cruz.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },
    {
        "title": "69.  Precioso es Jesús",
        "artist": "hna_Libia",
        "file": "mp3/himnos/hna_libia/69.- Precioso es Jesús.mp3",
        "genre": "himnos",
        "cover": "mp3/himnos/hna_libia/cover.jpg",
        "duration": "0:00"
    },

    {
        "title": "Ven Espiritu Divino extracto2016",
        "artist": "hno_nestor",
        "file": "mp3/coros/hno_nestor/Ven Espiritu Divino_extracto2016.mp3",
        "genre": "coros",
        "cover": "mp3/coros/hno_nestor/cover.jpg",
        "duration": "0:00"
    },
        
    {
        "title": "usa mi vida hno Néstor gutarra 2018",
        "artist": "hno_nestor",
        "file": "mp3/especiales/hno_nestor/usa mi vida_hno_Néstor_gutarra_2018.mp3",
        "genre": "especiales",
        "cover": "mp3/especiales/hno_nestor/cover.jpg",
        "duration": "0:00"
    },

    {
        "title": "Pista Adoracion",
        "artist": "hno_nestor",
        "file": "mp3/especiales/hno_nestor/Pista_Adoracion.mp3",
        "genre": "especiales",
        "cover": "mp3/especiales/hno_nestor/cover.jpg",
        "duration": "0:00"
    }
        
];
    
    // Calcular estadísticas
    const stats = { 
        total: this.songs.length,
        himnos: this.songs.filter(s => s.genre === 'himnos').length,
        coros: this.songs.filter(s => s.genre === 'coros').length,
        especiales: this.songs.filter(s => s.genre === 'especiales').length
    };


    this.showStats(stats);
    
    if (this.songs.length > 0) {
        this.showMessage(`✅ ${this.songs.length} canciones cargadas exitosamente`, 'success');
        console.log('📚 Canciones cargadas:', this.songs);
    } else {
        this.showMessage('⚠️ No se encontraron archivos MP3.', 'error');
    }
    
    this.filteredSongs = [...this.songs];
    this.renderPlaylist();
    
    if (this.songs.length > 0) {
        this.loadSong(0);
    }
    
    // Ocultar loading y mostrar contenido
    setTimeout(() => {
        this.loading.style.display = 'none';
        this.mainContent.style.display = 'block';
    }, 1000);
}
    // ======================== FIN SECCIÓN DE CANCIONES ========================

    showStats(stats) {
        const parts = [];
        if (stats.coros > 0) parts.push(`Coros: ${stats.coros}`);
        if (stats.himnos > 0) parts.push(`Himnos: ${stats.himnos}`);
        if (stats.testimonios > 0) parts.push(`Testimonios: ${stats.testimonios}`);
        if (stats.especiales > 0) parts.push(`Especiales: ${stats.especiales}`);
        
        this.stats.innerHTML = `Total: ${stats.total} alabanzas | ${parts.join(' • ')}`;
    }

    showMessage(text, type = 'info') {
        const messageClass = type === 'error' ? 'error' : 
                           type === 'success' ? 'success' : 'info';
        
        this.messages.innerHTML = `<div class="message ${messageClass}">${text}</div>`;
        
        if (type !== 'error') {
            setTimeout(() => {
                this.messages.innerHTML = '';
            }, 3000);
        }
    }

    setupEventListeners() {
        // Player controls
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.previousSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        this.refreshBtn.addEventListener('click', () => this.refreshSongs());
        
        // Progress control with proper seeking
        this.progressBar.addEventListener('mousedown', (e) => this.startSeeking(e));
        this.progressBar.addEventListener('mousemove', (e) => this.updateSeekPreview(e));
        this.progressBar.addEventListener('mouseleave', () => this.hideSeekPreview());
        
        document.addEventListener('mousemove', (e) => this.handleSeeking(e));
        document.addEventListener('mouseup', () => this.endSeeking());
        
        // Volume controls
        this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        this.muteBtn.addEventListener('click', () => this.toggleMute());
        
        // Audio events
        this.audio.addEventListener('timeupdate', () => {
            if (!this.isUserSeeking) {
                this.updateProgress();
            }
        });
        this.audio.addEventListener('ended', () => this.handleSongEnd());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('error', (e) => this.handleAudioError(e));
        
        // Search and filter
        this.searchInput.addEventListener('input', (e) => this.filterSongs(e.target.value));
        this.genreButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterByGenre(e.target.dataset.genre));
        });

        // Set initial volume
        this.setVolume(80);

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target === this.searchInput) return;
            
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.togglePlay();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSong();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSong();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.changeVolume(5);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.changeVolume(-5);
                    break;
                case 'KeyM':
                    e.preventDefault();
                    this.toggleMute();
                    break;
                case 'KeyS':
                    e.preventDefault();
                    this.toggleShuffle();
                    break;
                case 'KeyR':
                    e.preventDefault();
                    this.toggleRepeat();
                    break;
            }
        });
    }

    // ===== SEEKING CONTROLS =====
    startSeeking(e) {
        this.isUserSeeking = true;
        this.progressBar.style.cursor = 'grabbing';
        this.setProgress(e);
    }

    handleSeeking(e) {
        if (this.isUserSeeking) {
            this.setProgress(e);
        }
    }

    endSeeking() {
        if (this.isUserSeeking) {
            this.isUserSeeking = false;
            this.progressBar.style.cursor = 'pointer';
        }
    }

    updateSeekPreview(e) {
        // Optional: Show preview of where the user will seek to
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
        
        if (this.audio.duration) {
            const previewTime = (percentage / 100) * this.audio.duration;
            this.progressBar.title = this.formatTime(previewTime);
        }
    }

    hideSeekPreview() {
        this.progressBar.title = '';
    }

    // ===== PLAYER CONTROLS =====
    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        this.shuffleBtn.classList.toggle('active', this.isShuffled);
        this.showMessage(this.isShuffled ? '🔀 Modo aleatorio activado' : '➡️ Modo secuencial activado', 'info');
    }

    toggleRepeat() {
        this.isRepeating = !this.isRepeating;
        this.repeatBtn.classList.toggle('active', this.isRepeating);
        this.showMessage(this.isRepeating ? '🔁 Repetición activada' : '↪️ Repetición desactivada', 'info');
    }

    toggleMute() {
        if (this.audio.volume > 0) {
            this.previousVolume = this.audio.volume;
            this.setVolume(0);
        } else {
            this.setVolume((this.previousVolume || 0.8) * 100);
        }
    }

    changeVolume(change) {
        const currentVolume = parseInt(this.volumeSlider.value);
        const newVolume = Math.max(0, Math.min(100, currentVolume + change));
        this.setVolume(newVolume);
        this.volumeSlider.value = newVolume;
    }

    setVolume(value) {
        const volume = Math.max(0, Math.min(100, value));
        this.audio.volume = volume / 100;
        this.volumeValue.textContent = `${Math.round(volume)}%`;
        this.volumeSlider.value = volume;
        
        // Update volume icon
        if (volume === 0) {
            this.volumeIcon.innerHTML = `
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
            `;
        } else if (volume < 50) {
            this.volumeIcon.innerHTML = `
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <path d="M15.54 8.46a5 5 0 010 7.07"></path>
            `;
        } else {
            this.volumeIcon.innerHTML = `
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <path d="M15.54 8.46a5 5 0 010 7.07"></path>
                <path d="M19.07 4.93a10 10 0 010 14.14"></path>
            `;
        }
    }

    async refreshSongs() {
        this.showMessage('Actualizando...', 'info');
        this.refreshBtn.disabled = true;
        await this.loadSongs();
        this.refreshBtn.disabled = false;
    }

    handleAudioError(e) {
        console.error('Error al cargar audio:', e);
        this.showMessage(`Error: ${this.filteredSongs[this.currentIndex]?.title || 'archivo'}`, 'error');
    }

    // ===== SONG MANAGEMENT =====
    loadSong(index) {
        if (index < 0 || index >= this.filteredSongs.length) return;
        
        this.currentIndex = index;
        const song = this.filteredSongs[index];
        
        this.audio.src = song.file;
        this.songTitle.textContent = song.title;
        this.songArtist.textContent = song.artist || 'Desconocido';
        this.songGenre.textContent = song.genre.charAt(0).toUpperCase() + song.genre.slice(1);
        
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
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="200" height="200" fill="url(#grad)" rx="12"/>
                <text x="100" y="90" text-anchor="middle" font-family="Arial" font-size="40" fill="white">🎵</text>
                <text x="100" y="130" text-anchor="middle" font-family="Arial" font-size="16" fill="white">Alabanza</text>
            </svg>
        `)}`;
    }

    togglePlay() {
        if (this.filteredSongs.length === 0) return;
        
        if (this.isPlaying) {
            this.audio.pause();
            this.updatePlayButton(false);
            this.isPlaying = false;
        } else {
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.updatePlayButton(true);
                    this.isPlaying = true;
                }).catch(error => {
                    console.error('Error al reproducir:', error);
                    this.handleAudioError(error);
                });
            }
        }
    }

    updatePlayButton(isPlaying) {
        if (isPlaying) {
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
            this.playBtn.classList.add('playing');
        } else {
            this.playIcon.style.display = 'block';
            this.pauseIcon.style.display = 'none';
            this.playBtn.classList.remove('playing');
        }
    }

    handleSongEnd() {
        if (this.isRepeating) {
            this.audio.currentTime = 0;
            this.audio.play();
        } else {
            this.nextSong();
        }
    }

    getNextIndex() {
        if (this.isShuffled) {
            return Math.floor(Math.random() * this.filteredSongs.length);
        }
        return this.currentIndex < this.filteredSongs.length - 1 ? this.currentIndex + 1 : 0;
    }

    getPrevIndex() {
        if (this.isShuffled) {
            return Math.floor(Math.random() * this.filteredSongs.length);
        }
        return this.currentIndex > 0 ? this.currentIndex - 1 : this.filteredSongs.length - 1;
    }

    previousSong() {
        if (this.filteredSongs.length === 0) return;
        const newIndex = this.getPrevIndex();
        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    nextSong() {
        if (this.filteredSongs.length === 0) return;
        const newIndex = this.getNextIndex();
        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    // ===== PROGRESS & TIME =====
    updateProgress() {
        const { currentTime, duration } = this.audio;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            this.progress.style.width = `${progressPercent}%`;
        }
        
        this.currentTime.textContent = this.formatTime(currentTime);
    }

    updateDuration() {
        this.duration.textContent = this.formatTime(this.audio.duration);
    }

    setProgress(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const duration = this.audio.duration;
        
        if (duration) {
            const newTime = Math.max(0, Math.min(duration, (clickX / width) * duration));
            this.audio.currentTime = newTime;
            this.updateProgress();
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // ===== FILTERING & SEARCH =====
    filterByGenre(genre) {
        this.currentGenre = genre;
        
        // Update active button
        this.genreButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.genre === genre);
        });
        
        this.applyFilters();
    }

    filterSongs(searchTerm) {
        this.currentSearchTerm = searchTerm.toLowerCase();
        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.songs];
        
        // Filter by genre
        if (this.currentGenre && this.currentGenre !== 'all') {
            filtered = filtered.filter(song => song.genre === this.currentGenre);
        }
        
        // Filter by search term
        if (this.currentSearchTerm) {
            filtered = filtered.filter(song => 
                song.title.toLowerCase().includes(this.currentSearchTerm) ||
                (song.artist && song.artist.toLowerCase().includes(this.currentSearchTerm)) ||
                song.genre.toLowerCase().includes(this.currentSearchTerm)
            );
        }
        
        this.filteredSongs = filtered;
        this.currentIndex = 0;
        this.renderPlaylist();
        
        if (this.filteredSongs.length > 0) {
            this.loadSong(0);
        } else {
            this.showMessage(`No se encontraron alabanzas para "${this.currentSearchTerm || this.currentGenre}"`, 'info');
        }
    }

    // ===== PLAYLIST RENDERING =====
    renderPlaylist() {
        this.playlist.innerHTML = '';
        
        if (this.filteredSongs.length === 0) {
            this.playlist.innerHTML = `
                <div class="playlist-empty">
                    <p>No se encontraron alabanzas</p>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>`;
            return;
        }
        
        this.filteredSongs.forEach((song, index) => {
            const songItem = this.createPlaylistItem(song, index);
            this.playlist.appendChild(songItem);
        });

        this.updateActiveItem();
    }

    createPlaylistItem(song, index) {
        const songItem = document.createElement('div');
        songItem.className = 'playlist-item';
        
        songItem.innerHTML = `
            <img src="${song.cover}" alt="${song.title}" 
                 onerror="this.src='${this.createDefaultCover()}'">
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-details">
                    ${song.artist} • ${song.genre.charAt(0).toUpperCase() + song.genre.slice(1)}
                </div>
            </div>
            <div class="song-duration">${song.duration}</div>
        `;
        
        // Click to play
        songItem.addEventListener('click', () => {
            this.loadSong(index);
            if (!this.isPlaying) {
                this.togglePlay();
            }
        });
        
        return songItem;
    }

    updateActiveItem() {
        const items = this.playlist.querySelectorAll('.playlist-item');
        items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
        
        // Scroll to active item
        const activeItem = items[this.currentIndex];
        if (activeItem) {
            activeItem.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }
    }
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const player = new AlabanzasPlayer();
    
    // Make player globally accessible for debugging
    window.player = player;
});
