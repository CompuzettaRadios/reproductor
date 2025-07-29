// Stereo Revelación Radio - Player JavaScript
class RadioPlayer {
    constructor() {
        this.audio = document.getElementById('radioStream');
        this.isPlaying = false;
        this.isLoading = false;
        this.currentVolume = 70;
        this.streamUrl = 'https://streaming.stereorevelacionradio.com:8000/stereo';
        this.metadataUrl = 'https://streaming.stereorevelacionradio.com:8000/status-json.xsl';
        this.updateInterval = null;
        this.retryCount = 0;
        this.maxRetries = 3;
        
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.initializePlayer();
        this.bindEvents();
        this.startMetadataUpdates();
        console.log('Radio Player inicializado');
    }

    initializePlayer() {
        if (!this.audio) {
            console.error('Elemento audio no encontrado');
            return;
        }
        
        this.audio.volume = this.currentVolume / 100;
        
        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.value = this.currentVolume;
        }
        
        this.updateStatus('Listo para reproducir', 'ready');
        console.log('Player inicializado correctamente');
    }

    bindEvents() {
        // Play/Pause
        const playBtn = document.getElementById('playBtn');
        const albumCover = document.getElementById('albumCover');
        const volumeBtn = document.getElementById('volumeBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const shareBtn = document.getElementById('shareBtn');
        
        if (playBtn) playBtn.addEventListener('click', () => this.togglePlay());
        if (albumCover) albumCover.addEventListener('click', () => this.togglePlay());
        if (volumeBtn) volumeBtn.addEventListener('click', () => this.toggleMute());
        if (volumeSlider) volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        if (shareBtn) shareBtn.addEventListener('click', () => this.shareStation());
        
        // Background overlay click (si existe)
        const backgroundOverlay = document.getElementById('backgroundOverlay');
        if (backgroundOverlay) {
            backgroundOverlay.addEventListener('click', () => this.togglePlay());
        }
        
        // Audio events
        this.audio.addEventListener('loadstart', () => console.log('Cargando stream...'));
        this.audio.addEventListener('canplay', () => console.log('Stream listo'));
        this.audio.addEventListener('playing', () => this.onPlaying());
        this.audio.addEventListener('pause', () => this.onPause());
        this.audio.addEventListener('error', (e) => this.onError(e));
        this.audio.addEventListener('waiting', () => this.onBuffering());
        this.audio.addEventListener('stalled', () => this.onBuffering());
    }

    async togglePlay() {
        if (this.isLoading) return;

        try {
            if (this.isPlaying) {
                this.pause();
            } else {
                await this.play();
            }
        } catch (error) {
            console.error('Error al reproducir:', error);
            this.onError(error);
        }
    }

    async play() {
        this.isLoading = true;
        this.updateStatus('Conectando...', 'loading');
        this.updatePlayButton(false, true);
        
        try {
            // Limpiar source anterior y establecer nuevo
            this.audio.src = '';
            this.audio.load();
            this.audio.src = this.streamUrl + '?t=' + Date.now();
            
            await this.audio.play();
            this.retryCount = 0; // Reset retry count on success
            
        } catch (error) {
            console.error('Error al reproducir:', error);
            this.handlePlayError(error);
        }
    }

    pause() {
        this.audio.pause();
        this.audio.src = '';
        this.isPlaying = false;
        this.isLoading = false;
        this.updatePlayButton(true, false);
        this.updateStatus('Detenido', 'stopped');
        this.stopVinylAnimation();
        console.log('Reproducción pausada');
    }

    setVolume(value) {
        this.currentVolume = parseInt(value);
        this.audio.volume = this.currentVolume / 100;
        console.log(`Volumen: ${this.currentVolume}%`);
    }

    toggleMute() {
        const volumeSlider = document.getElementById('volumeSlider');
        
        if (this.audio.volume > 0) {
            this.audio.volume = 0;
            if (volumeSlider) volumeSlider.value = 0;
        } else {
            this.audio.volume = this.currentVolume / 100;
            if (volumeSlider) volumeSlider.value = this.currentVolume;
        }
    }

    shareStation() {
        if (navigator.share) {
            navigator.share({
                title: 'Stereo Revelación Radio',
                text: 'Escucha música cristiana 24/7',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showMessage('¡Enlace copiado al portapapeles!');
            }).catch(() => {
                this.showMessage('No se pudo copiar el enlace');
            });
        }
    }

    // Event handlers
    onPlaying() {
        this.isPlaying = true;
        this.isLoading = false;
        this.updatePlayButton(false, false);
        this.updateStatus('EN VIVO', 'playing');
        this.startVinylAnimation();
        console.log('Reproduciendo stream');
    }

    onPause() {
        this.isPlaying = false;
        this.isLoading = false;
        this.updatePlayButton(true, false);
        this.updateStatus('Pausado', 'paused');
        this.stopVinylAnimation();
        console.log('Stream pausado');
    }

    onBuffering() {
        this.updateStatus('Buffering...', 'loading');
        console.log('Buffering stream...');
    }

    onError(e) {
        console.error('Error de audio:', e);
        this.isPlaying = false;
        this.isLoading = false;
        this.updatePlayButton(true, false);
        
        const error = this.audio.error;
        let message = 'Error de conexión';
        
        if (error) {
            switch (error.code) {
                case error.MEDIA_ERR_NETWORK:
                    message = 'Error de red';
                    break;
                case error.MEDIA_ERR_DECODE:
                    message = 'Error de audio';
                    break;
                case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    message = 'Stream no soportado';
                    break;
                default:
                    message = 'Error desconocido';
            }
        }
        
        this.updateStatus(message, 'error');
        this.stopVinylAnimation();
        
        // Reintentar automáticamente
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            setTimeout(() => {
                console.log(`Reintentando... (${this.retryCount}/${this.maxRetries})`);
                this.play();
            }, 3000);
        }
    }

    handlePlayError(error) {
        this.isLoading = false;
        this.updatePlayButton(true, false);
        
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            this.updateStatus(`Reintentando... (${this.retryCount}/${this.maxRetries})`, 'loading');
            setTimeout(() => this.play(), 2000);
        } else {
            this.onError(error);
        }
    }

    // UI Update Methods
    updatePlayButton(showPlay, loading = false) {
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');
        const playBtn = document.getElementById('playBtn');
        
        if (loading && playBtn) {
            playBtn.classList.add('loading');
        } else if (playBtn) {
            playBtn.classList.remove('loading');
        }
        
        if (showPlay) {
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        } else {
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
        }
    }

    updateStatus(text, type) {
        // Para el HTML original
        const statusText = document.querySelector('.status-text');
        const statusIndicator = document.getElementById('statusIndicator');
        
        if (statusText) statusText.textContent = text;
        
        if (statusIndicator) {
            // Remove existing status classes
            statusIndicator.className = 'status-indicator';
            
            // Add status-specific styling
            const colors = {
                playing: '#4CAF50',
                loading: '#FF9800',
                error: '#F44336',
                paused: '#9E9E9E',
                stopped: '#9E9E9E',
                ready: '#4CAF50'
            };
            
            const color = colors[type] || colors.ready;
            statusIndicator.style.background = color;
            statusIndicator.style.boxShadow = `0 0 10px ${color}50`;
        }
        
        // También actualizar si existe el elemento statusText del HTML minimalista
        const statusTextAlt = document.getElementById('statusText');
        const statusDot = document.getElementById('statusDot');
        
        if (statusTextAlt) statusTextAlt.textContent = text;
        if (statusDot) {
            const colors = {
                playing: '#27ae60',
                loading: '#f39c12',
                error: '#e74c3c',
                stopped: '#95a5a6',
                paused: '#95a5a6',
                ready: '#27ae60'
            };
            statusDot.style.background = colors[type] || colors.ready;
        }
    }

    startVinylAnimation() {
        const albumCover = document.getElementById('albumCover');
        if (albumCover) {
            albumCover.classList.add('playing');
        }
    }

    stopVinylAnimation() {
        const albumCover = document.getElementById('albumCover');
        if (albumCover) {
            albumCover.classList.remove('playing');
        }
    }

    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color, #4CAF50);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            font-weight: 500;
            font-family: inherit;
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Metadata Management
    startMetadataUpdates() {
        this.updateMetadata();
        this.updateInterval = setInterval(() => {
            this.updateMetadata();
        }, 10000); // Update every 10 seconds
    }

    async updateMetadata() {
        try {
            const response = await fetch(this.metadataUrl, {
                method: 'GET',
                cache: 'no-cache'
            });
            
            if (!response.ok) throw new Error('Failed to fetch metadata');
            
            const data = await response.json();
            this.processMetadata(data);
            console.log('Metadata actualizada');
            
        } catch (error) {
            console.log('Error al obtener metadata:', error.message);
            // Use fallback metadata
            this.setFallbackMetadata();
        }
    }

    processMetadata(data) {
        if (data && data.icestats && data.icestats.source) {
            const source = Array.isArray(data.icestats.source) 
                ? data.icestats.source[0] 
                : data.icestats.source;
            
            // Update current song
            if (source.title) {
                this.updateCurrentSong(source.title, source.artist || 'Stereo Revelación Radio');
            }
            
            // Update stats
            this.updateStats({
                listeners: source.listeners || 0,
                peakListeners: source.listener_peak || 0,
                avgTime: this.formatTime(source.avg_listen_time || 0)
            });
        }
    }

    setFallbackMetadata() {
        this.updateCurrentSong('Música Cristiana 24/7', 'Stereo Revelación Radio');
        this.updateStats({
            listeners: '-',
            peakListeners: '-',
            avgTime: '-'
        });
    }

    updateCurrentSong(title, artist) {
        // Para el HTML original
        const songTitle = document.getElementById('currentSong');
        const artistName = document.getElementById('artistName');
        
        if (songTitle && title) {
            songTitle.textContent = title;
        }
        
        if (artistName && artist) {
            artistName.textContent = artist;
        }
        
        // También para HTML minimalista
        const songTitleAlt = document.getElementById('songTitle');
        if (songTitleAlt && title) {
            songTitleAlt.textContent = title;
        }
        
        // Update page title
        document.title = `${title} - ${artist} | Stereo Revelación Radio`;
    }

    updateStats(stats) {
        const listeners = document.getElementById('listeners');
        const peakListeners = document.getElementById('peakListeners');
        const avgTime = document.getElementById('avgTime');
        
        if (listeners) listeners.textContent = stats.listeners;
        if (peakListeners) peakListeners.textContent = stats.peakListeners;
        if (avgTime) avgTime.textContent = stats.avgTime;
    }

    formatTime(seconds) {
        if (!seconds || seconds === 0) return '-';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Cleanup
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        this.pause();
        console.log('Player destruido');
    }
}

// Debug toggle function (si existe en el HTML)
function toggleDebug() {
    const debugInfo = document.getElementById('debugInfo');
    if (debugInfo) {
        debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
    }
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.radioPlayer = new RadioPlayer();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.radioPlayer) {
        window.radioPlayer.destroy();
    }
});