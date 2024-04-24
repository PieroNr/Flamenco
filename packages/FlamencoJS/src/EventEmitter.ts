type Listener<T = unknown> = (payload: T) => void;

export class EventEmitter<T extends Record<string, unknown>> {
  private listeners: { [K in keyof T]?: Listener<T[K]>[] } = {};

  on<K extends keyof T>(event: K, listener: Listener<T[K]>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]?.push(listener);
  }

  off<K extends keyof T>(event: K, listener: Listener<T[K]>): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event]?.filter(l => l !== listener);
  }

  emit<K extends keyof T>(event: K, payload: T[K]): void {
    if (!this.listeners[event]) return;
    this.listeners[event]?.forEach(listener => listener(payload));
  }
}