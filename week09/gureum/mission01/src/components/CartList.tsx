import React, { useEffect } from "react";
import type { JSX } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { calculateTotals } from '../features/cart/cartSlice';
import { openModal } from '../features/modal/modalSlice';
import CartItem from "./CartItem";
import Modal from "./Modal";

const CartList = (): JSX.Element => {
    const { cartItems, amount, total } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotals());
    }, [cartItems, dispatch]);

    if (amount < 1) {
        return (
            <section className="flex flex-col items-center justify-center min-h-screen">
                <header>
                    <h2 className="text-3xl font-bold mb-8">장바구니가 비어있습니다</h2>
                </header>
                <Modal />
            </section>
        );
    }

    return (
        <div className='flex flex-col items-center justify-center max-w-4xl mx-auto p-6'>
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-center">당신이 선택한 음반</h2>
            </header>
            
            <div className="w-full">
                {cartItems.map((item): JSX.Element => (
                    <CartItem key={item.id} lp={item} />
                ))}
            </div>

            <footer className="w-full mt-8">
                <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-xl font-semibold mb-4">
                        <span>총 수량: {amount}개</span>
                        <span>총 금액: {total.toLocaleString()}원</span>
                    </div>
                    
                    <button 
                        onClick={() => dispatch(openModal())}
                        className="w-full py-3 bg-red-500 text-white text-lg font-medium rounded hover:bg-red-600 transition duration-200"
                    >
                        전체 삭제
                    </button>
                </div>
            </footer>
            
            <Modal />
        </div>
    );
}

export default CartList;