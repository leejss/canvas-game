type Callback = {
  id: number;
  eventName: string;
  callback: (val: any) => void;
};

class Events {
  callbacks: Callback[] = [];
  nextId = 0;

  on(eventName: string, callback: (val: any) => void) {
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      callback,
    });
  }

  emit<T>(eventName: string, value: T) {
    const handler = this.callbacks.find((cb) => cb.eventName === eventName);
    if (!handler) {
      console.warn(`No handler for event ${eventName}`);
      return;
    }
    handler.callback(value);
  }

  off(id: number) {
    this.callbacks = this.callbacks.filter((cb) => cb.id !== id);
  }
}

// Single event system
export const events = new Events();
