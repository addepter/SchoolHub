'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const router = useRouter();

  async function onSubmit(data) {
    setLoading(true);
    setErr('');
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === 'image' && data.image[0]) formData.append('image', data.image[0]);
        else formData.append(key, data[key]);
      });

      const res = await fetch('/api/add-school', { method: 'POST', body: formData });
      const json = await res.json();
      if (json.ok) router.push('/showSchools');
      else setErr(json.error || 'Something went wrong');
    } catch { setErr('Server error'); }
    finally { setLoading(false); }
  }

  return (
    <div  style={{
  maxWidth: 600,
  margin: '40px auto',
  padding: 20,
  background: 'white',
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
}}>
      <h2>Add School</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: 12 }}>
        <input placeholder="School Name" {...register('name', { required: 'Name required' })} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        <textarea placeholder="Address" {...register('address')} rows={2} />
        <input placeholder="City" {...register('city')} />
        <input placeholder="State" {...register('state')} />
        <input placeholder="Contact" {...register('contact')} />
        <input placeholder="Email" {...register('email_id', {
          required: 'Email required',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
        })} />
        {errors.email_id && <p style={{ color: 'red' }}>{errors.email_id.message}</p>}
        <input type="file" {...register('image')} />
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        {err && <p style={{ color: 'red' }}>{err}</p>}
        
      </form>
    </div>
  );
}
