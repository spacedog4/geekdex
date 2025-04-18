export function createLocalStore<T>(key: string, initialValue: T): T {
  const storedValue = localStorage.getItem(key);
  const value = $state<T>(storedValue ? JSON.parse(storedValue) : initialValue);

  $effect.root(() => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return value;
}
