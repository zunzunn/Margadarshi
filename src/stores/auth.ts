const AUTH_KEY = 'margadarshi_auth';

export function isLoggedIn(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function login(username: string, password: string): boolean {
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}
