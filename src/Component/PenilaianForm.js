import React, { useState } from 'react';

const PenilaianForm = () => {
  const [penilaian, setPenilaian] = useState([]);
  const [hasilPenilaian, setHasilPenilaian] = useState(null);

  const handleInputChange = (mahasiswa, aspek, nilai) => {
    const updatedPenilaian = [...penilaian];
    const existingMahasiswaIndex = updatedPenilaian.findIndex(item => item.mahasiswa === mahasiswa);

    if (existingMahasiswaIndex !== -1) {
      updatedPenilaian[existingMahasiswaIndex][aspek] = nilai;
    } else {
      const newMahasiswa = { mahasiswa };
      newMahasiswa[aspek] = nilai;
      updatedPenilaian.push(newMahasiswa);
    }

    setPenilaian(updatedPenilaian);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasil = {};
    for (let i = 1; i <= 4; i++) {
      hasil[`aspek_penilaian_${i}`] = {};
      for (let j = 1; j <= 10; j++) {
        hasil[`aspek_penilaian_${i}`][`mahasiswa_${j}`] = penilaian.find(item => item.mahasiswa === j)?.[`aspek${i}`] || 0;
      }
    }
    const hasilJSON = JSON.stringify(hasil, null, 2);
    setHasilPenilaian(hasilJSON);
    console.log(hasilJSON);
  };

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit}>
        <table className="table table-lg">
          <thead>
            <tr className="text-center">
              <th>Mahasiswa</th>
              <th>Aspek Penilaian 1</th>
              <th>Aspek Penilaian 2</th>
              <th>Aspek Penilaian 3</th>
              <th>Aspek Penilaian 4</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => i + 1).map(mahasiswa => (
              <tr key={mahasiswa}>
                <td>{`Mahasiswa ${mahasiswa}`}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="10"
                    value={penilaian.find(item => item.mahasiswa === mahasiswa)?.aspek1 || ''}
                    onChange={(e) => handleInputChange(mahasiswa, 'aspek1', parseInt(e.target.value, 10))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="10"
                    value={penilaian.find(item => item.mahasiswa === mahasiswa)?.aspek2 || ''}
                    onChange={(e) => handleInputChange(mahasiswa, 'aspek2', parseInt(e.target.value, 10))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="10"
                    value={penilaian.find(item => item.mahasiswa === mahasiswa)?.aspek3 || ''}
                    onChange={(e) => handleInputChange(mahasiswa, 'aspek3', parseInt(e.target.value, 10))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="10"
                    value={penilaian.find(item => item.mahasiswa === mahasiswa)?.aspek4 || ''}
                    onChange={(e) => handleInputChange(mahasiswa, 'aspek4', parseInt(e.target.value, 10))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div class="d-grid gap-2">
            <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>

      {hasilPenilaian && (
        <div className="mt-4">
          <h2>Hasil Penilaian</h2>
          <pre>{hasilPenilaian}</pre>
        </div>
      )}
    </div>
  );
};

export default PenilaianForm;
