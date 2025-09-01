'use client';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function ShowSchools() {
  const { data, error } = useSWR('/api/get-schools', fetcher);
  if (error) return <p style={{ textAlign: 'center', marginTop: 50 }}>Failed to load schools</p>;
  if (!data) return <p style={{ textAlign: 'center', marginTop: 50 }}>Loading...</p>;

  const schools = data.schools || [];

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 30 }}>Schools List</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 20
      }}>
        {schools.map((s) => (
          <div key={s.id} style={{
            border: '1px solid #ddd',
            borderRadius: 10,
            overflow: 'hidden',
            background: 'white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ height: 150, overflow: 'hidden' }}>
              {s.image ? (
                <img
                  src={`/schoolImages/${s.image}`}
                  alt={s.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: 20, color: '#666' }}>No Image</div>
              )}
            </div>
            <div style={{ padding: 12 }}>
              <h3 style={{ margin: '0 0 6px 0', color: '#333' }}>{s.name}</h3>
              <p style={{ margin: '0 0 4px 0', color: '#555', fontSize: 14 }}>{s.address}</p>
              <p style={{ margin: 0, color: '#555', fontSize: 14 }}>{s.city}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <a href="/addSchool" style={{
          textDecoration: 'none',
          background: '#0070f3',
          color: 'white',
          padding: '10px 20px',
          borderRadius: 5
        }}>Add Another School</a>
      </div>
    </div>
  );
}
