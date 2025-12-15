type CartSummaryProps = {
  totalAmount: number;
  totalPrice: number;
  onClear: () => void;
};

function CartSummary({ totalAmount, totalPrice, onClear }: CartSummaryProps) {
  return (
    <section className="sticky bottom-0 bg-gray-50 pt-4 border-t border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="space-y-1 text-sm">
          <p className="flex items-center justify-between gap-4">
            <span className="text-gray-600">총 수량</span>
            <span className="font-semibold text-gray-900">{totalAmount}개</span>
          </p>
          <p className="flex items-center justify-between gap-4">
            <span className="text-gray-600">총 금액</span>
            <span className="text-lg font-bold text-slate-900">
              ₩{totalPrice.toLocaleString()}
            </span>
          </p>
        </div>

        <button
          type="button"
          className="rounded-md border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
          onClick={onClear}
        >
          전체 삭제
        </button>
      </div>
    </section>
  );
}

export default CartSummary;
