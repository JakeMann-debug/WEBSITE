'user sever'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginAction(formData: FormData){
  const email = formData.get('email');
  const password = formData.get('password');

  const res = await fetch('${API_URL}/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ email, password}),
  });

  const data = await res.json();

  if(!res.ok){
    return { error: data.message || 'Login failed' };
  }

  const cookieStore = await cookies();
  cookieStore.set('token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV ==='production', 
    sameSite: 'lax',
    path: '/',
  });

  redirect('/dahsboard');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  await fetch('${API_URL}/logout', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ${token}', 
      'Accept': 'application/json'
    },
  });
   cookieStore.delete('token');
   redirect('/login; );')
}