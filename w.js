document.addEventListener("DOMContentLoaded", function() {
    // Ambil kedua foto berdasarkan class-nya masing-masing
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
});