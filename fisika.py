import graphviz

dot = graphviz.Digraph(comment='Flowchart Kalkulator Fisika Lengkap', format='png')

# Mulai
dot.node('A', 'Mulai Aplikasi')
dot.node('B', 'Pilih Jenis Rumus')

# Rumus-rumus
rumus = {
    'C1': ('Kecepatan', 'v = s / t', 'Jarak, Waktu'),
    'C2': ('Gaya', 'F = m × a', 'Massa, Percepatan'),
    'C3': ('Energi Kinetik', 'Ek = ½ × m × v²', 'Massa, Kecepatan'),
    'C4': ('Momentum', 'p = m × v', 'Massa, Kecepatan'),
    'C5': ('Tekanan', 'P = F / A', 'Gaya, Luas'),
    'C6': ('Usaha', 'W = F × s', 'Gaya, Jarak')
}

# Buat node dan alur setiap rumus
dot.edge('A', 'B')
for key, (judul, rumusnya, inputnya) in rumus.items():
    input_node = f'I{key[-1]}'
    hitung_node = f'H{key[-1]}'
    hasil_node = f'R{key[-1]}'
    
    dot.node(key, f'{judul} ({rumusnya})')
    dot.node(input_node, f'Input: {inputnya}')
    dot.node(hitung_node, f'Hitung {rumusnya}')
    dot.node(hasil_node, f'Tampilkan Hasil {judul}')
    
    dot.edge('B', key)
    dot.edge(key, input_node)
    dot.edge(input_node, hitung_node)
    dot.edge(hitung_node, hasil_node)
    dot.edge(hasil_node, 'Z')

# Akhir
dot.node('Z', 'Kembali / Selesai')

# Simpan
dot.render('flowchart_kalkulator_fisika_lengkap', cleanup=False)
