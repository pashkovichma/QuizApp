export interface SelectInputProps {
  label: string;
  options: string[];
  value: string | number;
  onChange: (value: string) => void;
}