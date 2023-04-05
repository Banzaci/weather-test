import { render, screen } from '@testing-library/react';
import App from '../App';
import * as mockedFetchApi from '../utils/fetchApi';

const users = [ { location: 'London'} ];
jest.mock('../utils/fetchApi');

test('renders a weather location from a network request', async () => {
  // Simple test to check if a location is printed
  (mockedFetchApi.fetchApi as jest.MockedFunction<typeof mockedFetchApi.fetchApi>).mockResolvedValue(users);
  render(<App />);
  const message = await screen.findByText('London');
  expect(message).toBeInTheDocument();
});