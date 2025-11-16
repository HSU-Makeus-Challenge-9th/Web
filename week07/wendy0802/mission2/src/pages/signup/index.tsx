import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../../components/Header";
import Step1Email from "../signup/components/FirstStep";
import Step2Password from "../signup/components/SecondStep";
import Step3Name from "../signup/components/ThirdStep";
import { authAPI } from "../../apis/apis";

type SignUpFormData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const updateField = (field: keyof SignUpFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    if (formData.password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setStep(3);
  };

  const handleStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name) {
      setError("이름을 입력해주세요.");
      setLoading(false);
      return;
    }

    if (formData.name.length < 2) {
      setError("이름은 2자 이상이어야 합니다.");
      setLoading(false);
      return;
    }

    try {
      const data = await authAPI.signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (data.status) {
        navigate("/login");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("회원가입에 실패했습니다.");
      }
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white text-lg font-semibold">회원가입</h2>
        <div className="w-6"></div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
        <div className="w-full max-w-md p-8">
          {step === 1 && (
            <Step1Email
              formData={formData}
              error={error}
              onNext={handleStep1}
              onUpdateField={updateField}
            />
          )}

          {step === 2 && (
            <Step2Password
              formData={formData}
              error={error}
              onNext={handleStep2}
              onUpdateField={updateField}
            />
          )}

          {step === 3 && (
            <Step3Name
              formData={formData}
              error={error}
              onNext={handleStep3}
              onUpdateField={updateField}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;