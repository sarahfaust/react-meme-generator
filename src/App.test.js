import { render, screen } from '@testing-library/react';
import AppStyle from './App';

test('renders learn react link', () => {
  render(<AppStyle />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
