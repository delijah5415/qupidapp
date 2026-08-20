'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AuthForm() {
  const [mode, setMode] = useState<'signin'|'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('KE');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, country, phone, id_number: idNumber }
        }
      });
      if (error) throw error;

      // create a users row (if your DB requires it)
      const user = data.user;
      if (user) {
        await supabase.from('users').upsert({
          id: user.id,
          email: user.email,
          name,
          country,
          phone,
          id_number: idNumber
        });
      }

      alert('Check your email for the confirmation link');
    } catch (err: any) {
      alert(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      alert(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: process.env.NEXT_PUBLIC_APP_URL + '/portal' } });
      if (error) throw error;
    } catch (err: any) {
      alert(err.message || 'Google sign-in failed');
    }
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-muted rounded-lg">
      <div className="flex justify-between mb-4">
        <button onClick={() => setMode('signin')} className={`px-3 py-1 rounded ${mode === 'signin' ? 'bg-accent text-stark' : 'bg-transparent'}`}>Sign In</button>
        <button onClick={() => setMode('signup')} className={`px-3 py-1 rounded ${mode === 'signup' ? 'bg-accent text-stark' : 'bg-transparent'}`}>Sign Up</button>
      </div>

      <form onSubmit={mode === 'signup' ? handleSignUp : handleSignIn} className="space-y-3">
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-background rounded" />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 bg-background rounded" />

        {mode === 'signup' && (
          <>
            <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-background rounded" />
            <div className="flex gap-2">
              <input placeholder="Country code (e.g. +254)" value={country} onChange={(e) => setCountry(e.target.value)} className="w-1/3 px-3 py-2 bg-background rounded" />
              <input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-2/3 px-3 py-2 bg-background rounded" />
            </div>
            <input placeholder="ID / National ID" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="w-full px-3 py-2 bg-background rounded" />
          </>
        )}

        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="flex-1 px-3 py-2 bg-accent text-stark rounded">{mode === 'signup' ? 'Create account' : 'Sign in'}</button>
          <button type="button" onClick={handleGoogle} className="px-3 py-2 border rounded">Google</button>
        </div>
      </form>
    </div>
  );
}
