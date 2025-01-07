export function validateRequired(value: string): string | null {
  return value.trim() ? null : 'This field is required';
}

export function validateUrl(url: string): string | null {
  if (!url) return null;
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
}

export function validateDate(date: string): string | null {
  if (!date) return null;
  const dateObj = new Date(date);
  return isNaN(dateObj.getTime()) ? 'Please enter a valid date' : null;
}

export function validateDateRange(startDate: string, endDate: string): string | null {
  if (!startDate || !endDate) return null;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start > end ? 'End date must be after start date' : null;
}