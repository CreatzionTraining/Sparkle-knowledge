export const courseOptions = [
  { value: 'ielts', label: 'IELTS' },
  { value: 'toefl', label: 'TOEFL' },
  { value: 'pte', label: 'PTE' },
  { value: 'interview-prep', label: 'Interview Preparation' },
  { value: 'study-abroad', label: 'Study Abroad Counseling' },
  { value: 'foreign-language', label: 'Foreign Language Training' },
] as const;

export type CourseOptionValue = (typeof courseOptions)[number]['value'];

export function getCourseLabel(value: string) {
  return courseOptions.find((option) => option.value === value)?.label || '';
}
