import { useCallback, useState } from 'react';

export const useSelectedRow = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const select = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  }, []);

  return { selectedId, select };
};
