import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders SkillNexus app', () => {
  render(<App />);
  expect(screen.getByText(/SkillNexus/i)).toBeInTheDocument();
});