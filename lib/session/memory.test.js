describe('session/memory', () => {
  let memory;

  beforeEach(() => {
    // Fresh module each test so the singleton store starts un-hydrated.
    jest.resetModules();
    memory = require('./memory');
  });

  it('starts un-hydrated, logged out', () => {
    expect(memory.getState()).toEqual({ user: null, token: null, hydrated: false });
  });

  it('shallow-merges patches via setState', () => {
    memory.setState({ user: { id: 1 } });
    expect(memory.getState()).toEqual({ user: { id: 1 }, token: null, hydrated: false });

    memory.setState({ hydrated: true });
    expect(memory.getState()).toEqual({ user: { id: 1 }, token: null, hydrated: true });
  });

  it('clearState resets user/token but marks hydrated true', () => {
    memory.setState({ user: { id: 1 }, token: 'abc', hydrated: false });
    memory.clearState();
    expect(memory.getState()).toEqual({ user: null, token: null, hydrated: true });
  });

  it('notifies subscribers with the new state on every change', () => {
    const listener = jest.fn();
    memory.subscribe(listener);

    memory.setState({ token: 'x' });
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenLastCalledWith(expect.objectContaining({ token: 'x' }));

    memory.clearState();
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('supports multiple subscribers', () => {
    const a = jest.fn();
    const b = jest.fn();
    memory.subscribe(a);
    memory.subscribe(b);
    memory.setState({ token: 'y' });
    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledTimes(1);
  });

  it('stops notifying after unsubscribe', () => {
    const listener = jest.fn();
    const unsubscribe = memory.subscribe(listener);
    unsubscribe();
    memory.setState({ token: 'z' });
    expect(listener).not.toHaveBeenCalled();
  });

  it('getState returns the latest snapshot identity after a change', () => {
    const before = memory.getState();
    memory.setState({ token: 't' });
    const after = memory.getState();
    expect(after).not.toBe(before); // new object, not mutated in place
    expect(after.token).toBe('t');
  });
});
