import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-sm p-6"
      >
        <header className="relative flex items-center justify-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="absolute left-0 text-xl p-2"
          >
            &lt;
          </Button>
          <h2 className="text-xl font-bold">로그인</h2>
        </header>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-sm p-6"
      >
        <Button variant="secondary" fullWidth className="mb-4">
          구글 로그인
        </Button>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 border-t border-gray-700" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-700" />
        </div>

        <div className="flex flex-col gap-3">
          <Input placeholder="이메일을 입력해주세요!" type="email" />
          <Input placeholder="비밀번호를 입력해주세요!" type="password" />
        </div>

        <Button variant="secondary" fullWidth className="mt-6">
          로그인
        </Button>
      </motion.div>
    </div>
  );
};

export default LoginPage;
