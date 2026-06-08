const AUTH_KEY = 'margadarshi_auth';

export function isLoggedIn(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function guestLogin(): void {
  localStorage.setItem(AUTH_KEY, 'true');
}

export function emailLogin(email: string, password: string): boolean {
  if (email === 'example@gmail.com' && password === '123456') {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}
