import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Hapus = () => {
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    const deleteData = async () => {
      if (window.confirm('Apakah Anda yakin ingin menghapus data?')) {
        try {
          const response = await fetch(`http://localhost:9080/api/pasien/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            console.log('Data deleted successfully');
          } else {
            console.error('Failed to delete data');
          }
        } catch (error) {
          console.error('Error deleting data:', error);
        } finally {
          history('/antri');
        }
      } else {
        history('/antri');
      }
    };

    deleteData();
  }, [id, history]);

  return (
    <div>
      <p>Data has been deleted successfully. Redirecting...</p>
    </div>
  );
};

export default Hapus;
