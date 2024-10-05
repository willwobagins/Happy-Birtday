function nextSession(currentSessionId, nextSessionId) {
    const currentSession = document.getElementById(currentSessionId);
    const nextSession = document.getElementById(nextSessionId);
    
    // Mengambil nama dan tanggal lahir dari input
    const nameInput = document.getElementById('nameInput');
    const birthdateInput = document.getElementById('birthdateInput').value; // Mengambil nilai tanggal lahir

    if (currentSessionId === 'inputSession') {
        // Validasi jika nama kosong
        if (nameInput.value.trim() === "") {
            showModal("Silakan masukkan nama terlebih dahulu!"); // Menampilkan modal jika nama kosong
            return; // Tidak melanjutkan ke sesi berikutnya
        }

        // Validasi jika tanggal lahir kosong
        if (birthdateInput.trim() === "") {
            showModal("Silakan masukkan tanggal lahir terlebih dahulu!");
            return; // Tidak melanjutkan ke sesi berikutnya
        }
        
        const greeting = document.getElementById('greeting');
        const ageMessage = document.getElementById('ageMessage');
        
        // Validasi tanggal lahir dengan parsing multi-format
        const birthDate = parseDate(birthdateInput);
        if (!birthDate || isNaN(birthDate.getTime())) {
            showModal("Tanggal lahir tidak valid. Silakan masukkan tanggal dengan format yang benar.");
            return; // Tidak melanjutkan jika tanggal lahir tidak valid
        }

        const age = calculateAge(birthDate);
        
        // Menampilkan ucapan selamat ulang tahun dan umur
        greeting.textContent = `Selamat Ulang Tahun, ${nameInput.value}!`;
        ageMessage.textContent = `Yang ke ${age} tahun.`;
    }

    // Menyembunyikan sesi saat ini dan menampilkan sesi berikutnya
    currentSession.classList.add('hidden');
    nextSession.classList.remove('hidden');
    
    // Menambahkan animasi fade in ke sesi berikutnya
    nextSession.classList.add('animate__fadeIn');
}

// Fungsi untuk menghitung usia dari tanggal lahir
function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Cek apakah ulang tahun sudah terjadi tahun ini atau belum
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

// Fungsi untuk memparsing tanggal multi-format
function parseDate(dateString) {
    // Format yang kita dukung: YYYY-MM-DD, MM-DD-YYYY, DD-MM-YYYY
    const formats = [
        { regex: /^(\d{4})-(\d{2})-(\d{2})$/, order: ['year', 'month', 'day'] }, // YYYY-MM-DD
        { regex: /^(\d{2})-(\d{2})-(\d{4})$/, order: ['month', 'day', 'year'] }, // MM-DD-YYYY
        { regex: /^(\d{2})-(\d{2})-(\d{4})$/, order: ['day', 'month', 'year'] }  // DD-MM-YYYY
    ];

    for (let format of formats) {
        const match = dateString.match(format.regex);
        if (match) {
            const dateParts = {};
            format.order.forEach((part, index) => {
                dateParts[part] = parseInt(match[index + 1], 10);
            });

            // Javascript Date() menerima (tahun, bulan, tanggal), bulan dimulai dari 0
            return new Date(dateParts.year, dateParts.month - 1, dateParts.day);
        }
    }

    return null; // Jika tidak cocok dengan format apapun
}

// source code untuk tutup box terbuka
function openGift() {
    const lid = document.querySelector('.gift-lid');
    lid.classList.add('open');

    // Tunggu animasi selesai sebelum berpindah sesi
    setTimeout(() => {
        // Menyembunyikan sesi saat ini
        document.getElementById('surpriseSession').classList.add('hidden');

        // Menampilkan sesi kejutan (misalnya dengan ID 'finalSurpriseSession')
        document.getElementById('toFinalSurprise').classList.remove('hidden');
    }, 500); // Sesuaikan waktu sesuai durasi animasi
}



function showModal(message) {
    const modal = document.getElementById('alertModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex'; // Tampilkan modal dengan flex
    modal.classList.add('animate__fadeIn'); // Tambahkan animasi fade in
}

function closeModal() {
    const modal = document.getElementById('alertModal');
    modal.style.display = 'none'; // Sembunyikan modal
    modal.classList.remove('animate__fadeIn'); // Hapus animasi fade in
}

// Event listener untuk tombol close dan OK
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('closeButton').addEventListener('click', closeModal);

// Event listener untuk menutup modal ketika mengklik area di luar modal
window.onclick = function(event) {
    const modal = document.getElementById('alertModal');
    if (event.target === modal) {
        closeModal();
    }
}
