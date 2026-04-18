import { useState, useEffect } from 'react';
import supabase from '../supabase';
import { Container } from 'react-bootstrap';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('Marcas')
        .select('*');

      if (error) {
        throw error;
      }

      setBrands(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setError('Error al cargar las marcas');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <section className="brands" id="brands">
        <div className="container">
          <h2 className="section-title">Nuestras Marcas</h2>
          <p>Cargando marcas...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="brands" id="brands">
        <div className="container">
          <h2 className="section-title">Nuestras Marcas</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="brands" id="brands">
      <div className="container">
        <h2 className="section-title">Nuestras Marcas</h2>
        
        <div className="brands-grid">
          {brands.map((brand) => (
            <div className="brand-item" key={brand.id}>
              <img src={brand.image_marca_url} alt={brand.nombre_marca} />
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
