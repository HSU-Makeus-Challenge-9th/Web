import { useCallback, memo } from 'react';
import Button from '../button/Button';

interface OrderSelectorProps {
  order?: 'asc' | 'desc';
  onOrderChange: (order: 'asc' | 'desc') => void;
}

const OrderSelector = ({
  order = 'desc',
  onOrderChange,
}: OrderSelectorProps) => {
  const handleDescClick = useCallback(() => {
    onOrderChange('desc');
  }, [onOrderChange]);

  const handleAscClick = useCallback(() => {
    onOrderChange('asc');
  }, [onOrderChange]);

  return (
    <div className="flex justify-end gap-2 mb-4">
      <Button
        variant={order === 'desc' ? 'primary' : 'secondary'}
        size="sm"
        onClick={handleDescClick}
      >
        최신순
      </Button>
      <Button
        variant={order === 'asc' ? 'primary' : 'secondary'}
        size="sm"
        onClick={handleAscClick}
      >
        오래된순
      </Button>
    </div>
  );
};

export default memo(OrderSelector);
