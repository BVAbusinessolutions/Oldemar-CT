import { useCallback, useEffect, useMemo, useState } from 'react';
import { registrationService } from '../../registration';

export const useRegistrations = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await registrationService.list());
    } catch {
      setError('No se pudieron cargar las inscripciones.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id, status) => {
    const updated = await registrationService.updateStatus(id, status);
    setItems((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((r) => {
      if (statusFilter && r.status !== statusFilter) return false;
      if (!q) return true;
      return [r.firstName, r.lastName, r.idNumber, r.email].some((f) => f?.toLowerCase().includes(q));
    });
  }, [items, query, statusFilter]);

  return { items: filtered, total: items.length, loading, error, query, setQuery, statusFilter, setStatusFilter, updateStatus, reload: load };
};
