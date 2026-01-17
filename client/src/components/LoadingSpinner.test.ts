import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { LoadingProvider, useLoading } from '@/contexts/LoadingContext';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Test component that uses the loading context
function TestComponent() {
  const { isLoading, showLoading, hideLoading } = useLoading();
  
  return (
    <div>
      <div data-testid="loading-status">{isLoading ? 'loading' : 'idle'}</div>
      <button onClick={showLoading} data-testid="show-btn">Show</button>
      <button onClick={hideLoading} data-testid="hide-btn">Hide</button>
    </div>
  );
}

describe('LoadingSpinner', () => {
  it('renders LoadingProvider without errors', () => {
    render(
      <LoadingProvider>
        <LoadingSpinner />
      </LoadingProvider>
    );
  });

  it('shows loading spinner when isLoading is true', async () => {
    const { rerender } = render(
      <LoadingProvider>
        <LoadingSpinner />
        <TestComponent />
      </LoadingProvider>
    );

    const showBtn = screen.getByTestId('show-btn');
    showBtn.click();

    await waitFor(() => {
      const spinner = screen.getByText('加載中...');
      expect(spinner).toBeInTheDocument();
    });
  });

  it('hides loading spinner when isLoading is false', async () => {
    render(
      <LoadingProvider>
        <LoadingSpinner />
        <TestComponent />
      </LoadingProvider>
    );

    const showBtn = screen.getByTestId('show-btn');
    const hideBtn = screen.getByTestId('hide-btn');

    showBtn.click();

    await waitFor(() => {
      expect(screen.getByText('加載中...')).toBeInTheDocument();
    });

    hideBtn.click();

    await waitFor(() => {
      expect(screen.queryByText('加載中...')).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('loading context provides correct methods', () => {
    const { getByTestId } = render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    const statusDiv = getByTestId('loading-status');
    expect(statusDiv).toHaveTextContent('idle');

    const showBtn = getByTestId('show-btn');
    showBtn.click();

    expect(statusDiv).toHaveTextContent('loading');

    const hideBtn = getByTestId('hide-btn');
    hideBtn.click();

    expect(statusDiv).toHaveTextContent('idle');
  });
});
