import type { JSX } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { closeModal } from '../features/modal/modalSlice';
import { clearCart } from '../features/cart/cartSlice';

const Modal = (): JSX.Element | null => {
    const { isOpen } = useSelector((state: RootState) => state.modal);
    const dispatch = useDispatch();

    if (!isOpen) return null;

    const handleConfirm = () => {
        dispatch(clearCart());
        dispatch(closeModal());
    };

    const handleCancel = () => {
        dispatch(closeModal());
    };

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-lg">
                <h2 className="text-xl font-semibold text-center mb-6">
                    정말 삭제하시겠습니까?
                </h2>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200"
                    >
                        아니요
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;