import { providerConfig, type Provider } from '@/data/providerConfig';

const PROVIDER_KEY = 'margadarshi_provider';

export function getCurrentProvider(): Provider {
  return (localStorage.getItem(PROVIDER_KEY) as Provider) || 'groq';
}

export function setCurrentProvider(provider: Provider): void {
  localStorage.setItem(PROVIDER_KEY, provider);
}

export function getProviderConfig(provider: Provider) {
  return providerConfig[provider];
}

export function getApiKey(provider: Provider): string | null {
  return localStorage.getItem(providerConfig[provider].storageKey);
}

export function saveApiKey(provider: Provider, key: string): void {
  localStorage.setItem(providerConfig[provider].storageKey, key);
}

export function removeApiKey(provider: Provider): void {
  localStorage.removeItem(providerConfig[provider].storageKey);
}
