import { render, screen, act } from '@testing-library/react';
import { ResumeBuilderProvider, useResumeBuilder } from './ResumeBuilderContext';

// Polyfill crypto.randomUUID if the test runtime lacks it.
if (!global.crypto || typeof global.crypto.randomUUID !== 'function') {
  global.crypto = {
    ...(global.crypto || {}),
    randomUUID: () => 'test-uuid-' + Math.random(),
  };
}

const STORAGE_KEY = 'resume-builder-draft';

// Captures the context value so tests can drive the actions imperatively.
let captured;
function Capture() {
  captured = useResumeBuilder();
  return null;
}

function renderProvider() {
  captured = undefined;
  return render(
    <ResumeBuilderProvider>
      <Capture />
    </ResumeBuilderProvider>
  );
}

afterEach(() => {
  localStorage.clear();
});

describe('useResumeBuilder guard', () => {
  it('throws when used outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Capture />)).toThrow(
      'useResumeBuilder must be used inside ResumeBuilderProvider'
    );
    spy.mockRestore();
  });
});

describe('ResumeBuilderProvider initial state', () => {
  it('seeds the default resume when localStorage is empty', () => {
    renderProvider();
    expect(captured.resume.personal.name).toBe('Jordan Blake');
    expect(captured.resume.skills.length).toBe(3);
    expect(captured.template).toBe('modern');
    expect(captured.darkMode).toBe(false);
    expect(captured.lastSavedAt).toBeNull();
  });

  it('hydrates from localStorage when a draft exists', () => {
    const draft = {
      personal: { name: 'Saved Person' },
      summary: 'saved summary',
      skills: [],
      experience: [],
      education: [],
      projects: [],
      certifications: [],
      languages: [],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    renderProvider();
    expect(captured.resume.personal.name).toBe('Saved Person');
    expect(captured.resume.summary).toBe('saved summary');
  });
});

describe('reducer-style actions', () => {
  it('updatePersonal updates a personal field', () => {
    renderProvider();
    act(() => captured.updatePersonal('name', 'New Name'));
    expect(captured.resume.personal.name).toBe('New Name');
    // other personal fields preserved
    expect(captured.resume.personal.title).toBe('Lead Product Designer');
  });

  it('updateSummary replaces the summary', () => {
    renderProvider();
    act(() => captured.updateSummary('brand new summary'));
    expect(captured.resume.summary).toBe('brand new summary');
  });

  it('addItem prepends a new item with a generated id', () => {
    renderProvider();
    const before = captured.resume.skills.length;
    act(() => captured.addItem('skills', { name: 'GraphQL', level: 'Advanced' }));
    expect(captured.resume.skills.length).toBe(before + 1);
    expect(captured.resume.skills[0].name).toBe('GraphQL');
    expect(captured.resume.skills[0].id).toBeTruthy();
  });

  it('updateItem updates the matching item and keeps its id', () => {
    renderProvider();
    const target = captured.resume.skills[0];
    act(() => captured.updateItem('skills', target.id, { name: 'Renamed' }));
    const updated = captured.resume.skills.find((s) => s.id === target.id);
    expect(updated.name).toBe('Renamed');
    expect(updated.id).toBe(target.id);
  });

  it('deleteItem removes the matching item', () => {
    renderProvider();
    const target = captured.resume.skills[0];
    const before = captured.resume.skills.length;
    act(() => captured.deleteItem('skills', target.id));
    expect(captured.resume.skills.length).toBe(before - 1);
    expect(captured.resume.skills.find((s) => s.id === target.id)).toBeUndefined();
  });

  it('setDarkMode and setTemplate update their values', () => {
    renderProvider();
    act(() => captured.setDarkMode(true));
    expect(captured.darkMode).toBe(true);
    act(() => captured.setTemplate('classic'));
    expect(captured.template).toBe('classic');
  });
});

describe('localStorage persistence (debounced)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('persists the draft to localStorage after the debounce timer fires', () => {
    renderProvider();
    act(() => captured.updateSummary('persisted summary'));
    // Not yet written before debounce elapses (clear any initial write first).
    act(() => {
      jest.advanceTimersByTime(500);
    });
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored.summary).toBe('persisted summary');
    expect(captured.lastSavedAt).toBeInstanceOf(Date);
  });
});
