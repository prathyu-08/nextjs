// Load the axios client with a chosen API_MODE and a stubbed session token.
function load({ mode = 'proxy', token = null } = {}) {
  jest.resetModules();
  jest.doMock('../config', () => ({
    API_MODE: mode,
    DIRECT_API_URL: 'http://direct.test',
    PROXY_BASE: '/api',
  }));
  jest.doMock('../session', () => ({
    __esModule: true,
    default: { getToken: () => token },
  }));
  return require('./client').default;
}

// Pull out the registered request interceptor and run it against a config.
function runRequestInterceptor(client, config) {
  const handler = client.interceptors.request.handlers[0];
  return handler.fulfilled(config);
}

afterEach(() => {
  jest.resetModules();
});

describe('api/client — baseURL selection', () => {
  it('uses the /api proxy base in proxy mode', () => {
    const client = load({ mode: 'proxy' });
    expect(client.defaults.baseURL).toBe('/api');
  });

  it('uses the direct FastAPI URL in direct mode', () => {
    const client = load({ mode: 'direct' });
    expect(client.defaults.baseURL).toBe('http://direct.test');
  });
});

describe('api/client — auth interceptor', () => {
  it('attaches a Bearer header when session.getToken() returns a token (direct mode)', () => {
    const client = load({ mode: 'direct', token: 'abc123' });
    const config = runRequestInterceptor(client, { headers: {} });
    expect(config.headers.Authorization).toBe('Bearer abc123');
  });

  it('adds no Authorization header when getToken() is null (proxy mode)', () => {
    const client = load({ mode: 'proxy', token: null });
    const config = runRequestInterceptor(client, { headers: {} });
    expect(config.headers.Authorization).toBeUndefined();
  });

  it('returns the config object unchanged otherwise', () => {
    const client = load({ mode: 'proxy', token: null });
    const config = { headers: { 'X-Custom': '1' } };
    expect(runRequestInterceptor(client, config)).toBe(config);
    expect(config.headers['X-Custom']).toBe('1');
  });
});
