import { render, fireEvent } from '@testing-library/react';
import { TextInput } from '../TextInput';

describe('TextInput', () => {
  it('renders correctly', () => {
    const { getByLabelText } = render(
      <TextInput
        label="Test Input"
        value=""
        onChange={() => {}}
      />
    );
    expect(getByLabelText('Test Input')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <TextInput
        label="Test Input"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(getByLabelText('Test Input'), {
      target: { value: 'test' }
    });
    expect(handleChange).toHaveBeenCalledWith('test');
  });
});