const rumusSelector = document.getElementById('rumusSelector');
const inputFields = document.getElementById('inputFields');
const formInput = document.getElementById('formInput');
const hasilPerhitungan = document.getElementById('hasilPerhitungan');
const penjelasanRumus = document.getElementById('penjelasanRumus');

rumusSelector.addEventListener('change', function () {
  const rumus = this.value;
  inputFields.innerHTML = '';
  hasilPerhitungan.textContent = '';
  penjelasanRumus.textContent = '';

  if (!rumus) {
    formInput.style.display = 'none';
    return;
  }

  // Tentukan input dan penjelasan berdasarkan rumus
  let fields = '';
  let explanation = '';

  switch (rumus) {
    case 'kecepatan':
      fields += createInput('jarak', 'Jarak (meter)');
      fields += createInput('waktu', 'Waktu (detik)');
      explanation = "Rumus Kecepatan: v = s / t\n(v = kecepatan, s = jarak, t = waktu)";
      break;
    case 'gaya':
      fields += createInput('massa', 'Massa (kg)');
      fields += createInput('percepatan', 'Percepatan (m/s²)');
      explanation = "Rumus Gaya: F = m × a\n(F = gaya, m = massa, a = percepatan)";
      break;
    case 'energiKinetik':
      fields += createInput('massa', 'Massa (kg)');
      fields += createInput('kecepatan', 'Kecepatan (m/s)');
      explanation = "Rumus Energi Kinetik: Ek = ½ × m × v²\n(Ek = energi kinetik, m = massa, v = kecepatan)";
      break;
  }

  inputFields.innerHTML = fields;
  penjelasanRumus.textContent = explanation;
  formInput.style.display = 'block';
});

formInput.addEventListener('submit', function (e) {
  e.preventDefault();
  const rumus = rumusSelector.value;
  let hasil = 0;

  try {
    switch (rumus) {
      case 'kecepatan': {
        const s = parseFloat(getValue('jarak'));
        const t = parseFloat(getValue('waktu'));
        if (t === 0) throw new Error("Waktu tidak boleh nol.");
        hasil = s / t;
        tampilkanHasil(`Kecepatan = ${hasil.toFixed(2)} m/s`);
        break;
      }
      case 'gaya': {
        const m = parseFloat(getValue('massa'));
        const a = parseFloat(getValue('percepatan'));
        hasil = m * a;
        tampilkanHasil(`Gaya = ${hasil.toFixed(2)} Newton`);
        break;
      }
      case 'energiKinetik': {
        const m = parseFloat(getValue('massa'));
        const v = parseFloat(getValue('kecepatan'));
        hasil = 0.5 * m * v * v;
        tampilkanHasil(`Energi Kinetik = ${hasil.toFixed(2)} Joule`);
        break;
      }
    }
  } catch (error) {
    tampilkanHasil(`❗ Error: ${error.message}`, true);
  }
});

function createInput(id, label) {
  return `
    <label for="${id}">${label}</label>
    <input type="number" id="${id}" placeholder="${label}" required />
  `;
}

function getValue(id) {
  const value = document.getElementById(id).value;
  if (value === '' || isNaN(value)) {
    throw new Error(`Nilai untuk ${id} tidak valid.`);
  }
  return value;
}

function tampilkanHasil(pesan, isError = false) {
  hasilPerhitungan.textContent = pesan;
  hasilPerhitungan.style.color = isError ? 'red' : '#c8e6c9';
}
