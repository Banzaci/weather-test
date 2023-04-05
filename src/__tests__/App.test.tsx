import { render, screen } from '@testing-library/react';
import App from '../App';
import * as mockedFetchApi from '../utils/fetchApi';

const locations = [ { location: 'London'} ];

jest.mock('../utils/fetchApi');

test('renders a weather location from a network request', async () => {
  // Simple test to check if a location is printed
  (mockedFetchApi.fetchApi as jest.MockedFunction<typeof mockedFetchApi.fetchApi>).mockResolvedValue(locations);
  render(<App />);
  const location = await screen.findByText('London');
  expect(location).toBeInTheDocument();
});