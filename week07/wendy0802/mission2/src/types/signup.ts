export interface SignUpFormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface StepProps {
  formData: SignUpFormData;
  error: string;
  onNext: (e: React.FormEvent) => void;
  onUpdateField: (field: keyof SignUpFormData, value: string) => void;
  loading?: boolean;
}