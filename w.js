document.addEventListener("DOMContentLoaded", function() {
    // 1. Alert Foto Profil
    const fotoList = document.querySelectorAll('.foto, .fotoaboutme1');
    
    fotoList.forEach(function(fotoprofil) {
        fotoprofil.addEventListener('click', function() {
            if (this.classList.contains('foto')) {
                alert("Its me!");
            } else if (this.classList.contains('fotoaboutme1')) {
                alert("Its me but while reading!");
            }
        });
    });

      const topicCards = document.querySelectorAll('.wiki1, .wiki2, .wiki3, .wiki4, .wiki5');
    const lightbox = document.getElementById('lightbox');
    const imageContainer = document.getElementById('image-container');
    const closeBtn = document.getElementById('close-btn');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');

    let currentWidth = 550; // Lebar standar gambar (px)

    topicCards.forEach((card) => {
        card.addEventListener('click', () => {
            const rawPhotos = card.getAttribute('data-photos');
            if (!rawPhotos) return;

            const photos = rawPhotos.split(',').map(url => url.trim());
            
            // Kosongkan wadah sebelumnya & reset ukuran zoom
            imageContainer.innerHTML = '';
            currentWidth = window.innerWidth <= 600 ? window.innerWidth * 0.9 : 550;

            // Masukkan semua foto secara berurutan ke bawah
            photos.forEach((photoSrc) => {
                const img = document.createElement('img');
                img.src = photoSrc;
                img.className = 'lightbox-item';
                img.style.width = currentWidth + 'px';
                imageContainer.appendChild(img);
            });

            // Kembalikan scroll ke paling atas setiap kali baru dibuka
            imageContainer.scrollTop = 0;
            lightbox.classList.add('active');
        });
    });

    // Fungsi Mengubah Ukuran Zoom Semua Foto
    function updateZoom() {
        const items = document.querySelectorAll('.lightbox-item');
        items.forEach((img) => {
            img.style.maxWidth = 'none'; // Izinkan gambar melebar melebihi layar saat di-zoom
            img.style.width = currentWidth + 'px';
        });
    }

    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            currentWidth = Math.min(currentWidth + 150, 1400); // Maksimal perbesaran
            updateZoom();
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            currentWidth = Math.max(currentWidth - 150, 250); // Minimal perkecilan
            updateZoom();
        });
    }

    if (zoomResetBtn) {
        zoomResetBtn.addEventListener('click', () => {
            currentWidth = window.innerWidth <= 600 ? window.innerWidth * 0.9 : 550;
            const items = document.querySelectorAll('.lightbox-item');
            items.forEach((img) => {
                img.style.maxWidth = '90%';
                img.style.width = currentWidth + 'px';
            });
        });
    }

    // Tutup Lightbox (Tombol X, klik area gelap di samping foto, atau tombol Escape)
    if (closeBtn) {
        closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === imageContainer) {
                lightbox.classList.remove('active');
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });
});