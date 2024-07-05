import { writable } from 'svelte/store';

export const formData = writable([]);
export const summary = writable('');
export const selectedPersona = writable(null);
export const opinions = writable(null);
export const review = writable(null);