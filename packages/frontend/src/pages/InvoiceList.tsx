import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useInvoices, useDeleteInvoice } from '@/hooks/useInvoices';
import { InvoiceListSkeleton } from '@/components/SkeletonLoaders';
import { ErrorMessage, NotFound } from '@/components/ErrorDisplay';
import type { InvoiceData } from '@teif/shared/types';

export function InvoiceList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Parse filters from URL
  const filters = {
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
    search: searchParams.get('search') || '',
    dateFrom: searchParams.get('dateFrom') || '',
    dateTo: searchParams.get('dateTo') || '',
    documentType: searchParams.get('documentType') || '',
    minAmount: searchParams.get('minAmount') ? parseFloat(searchParams.get('minAmount')!) : undefined,
    maxAmount: searchParams.get('maxAmount') ? parseFloat(searchParams.get('maxAmount')!) : undefined,
    status: searchParams.get('status') || '',
    sortBy: searchParams.get('sortBy') || 'date',
    sortOrder: searchParams.get('sortOrder') || 'desc',
  };

  // Initialize search input from URL on mount
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  // Debounced search handler
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      handleFilterChange('search', searchInput);
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchInput]);

  const { data: result, isLoading, error, isFetching, refetch } = useInvoices(filters);
  const { mutate: deleteInvoice, isPending: isDeleting } = useDeleteInvoice();

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = new URLSearchParams(searchParams);
    if (value === '' || value === null || value === undefined) {
      newFilters.delete(key);
    } else {
      newFilters.set(key, String(value));
    }
    newFilters.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = new URLSearchParams(searchParams);
    const currentSortBy = newFilters.get('sortBy') || 'date';
    
    if (currentSortBy === sortBy) {
      // Toggle sort order if clicking the same column
      const currentOrder = newFilters.get('sortOrder') || 'desc';
      newFilters.set('sortOrder', currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column with default desc order
      newFilters.set('sortBy', sortBy);
      newFilters.set('sortOrder', 'desc');
    }
    newFilters.set('page', '1');
    setSearchParams(newFilters);
  };

  const handleClearAllFilters = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams({
      page: '1',
      limit: '20',
      sortBy: 'date',
      sortOrder: 'desc',
    }));
  };

  // Helper function to get active filters
  const getActiveFilters = () => {
    const active = [];
    
    if (filters.search) {
      active.push({
        key: 'search',
        label: `Search: "${filters.search}"`,
      });
    }
    
    if (filters.dateFrom) {
      active.push({
        key: 'dateFrom',
        label: `From: ${filters.dateFrom}`,
      });
    }
    
    if (filters.dateTo) {
      active.push({
        key: 'dateTo',
        label: `To: ${filters.dateTo}`,
      });
    }
    
    if (filters.documentType) {
      const typeLabel = {
        'I-11': 'Invoice (I-11)',
        'I-12': 'Debit Note (I-12)',
        'I-13': 'Credit Note (I-13)',
      }[filters.documentType] || filters.documentType;
      active.push({
        key: 'documentType',
        label: `Type: ${typeLabel}`,
      });
    }
    
    if (filters.minAmount !== undefined && Number.isFinite(filters.minAmount)) {
      active.push({
        key: 'minAmount',
        label: `Min: ${filters.minAmount.toFixed(2)} TND`,
      });
    }
    
    if (filters.maxAmount !== undefined && Number.isFinite(filters.maxAmount)) {
      active.push({
        key: 'maxAmount',
        label: `Max: ${filters.maxAmount.toFixed(2)} TND`,
      });
    }
    
    if (filters.status) {
      const statusLabel = filters.status.charAt(0).toUpperCase() + filters.status.slice(1);
      active.push({
        key: 'status',
        label: `Status: ${statusLabel}`,
      });
    }
    
    return active;
  };

  const activeFilters = getActiveFilters();
  const hasActiveFilters = activeFilters.length > 0;

  const handleDelete = (id: string) => {
    deleteInvoice(id, {
      onSuccess: () => {
        setConfirmDelete(null);
        refetch();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Invoices</h1>
            <p className="text-gray-400 mt-2">Loading your invoices...</p>
          </div>
          <Link
            to="/invoices/new"
            className="px-4 py-2.5 text-white font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            + Create New Invoice
          </Link>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-700 text-xs font-medium text-slate-300 uppercase tracking-wider">
                <th className="px-6 py-4">Document #</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4">Buyer</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <InvoiceListSkeleton count={5} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <Link
            to="/invoices/new"
            className="px-4 py-2.5 text-white font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            + Create New Invoice
          </Link>
        </div>
        <ErrorMessage 
          message="Failed to load invoices"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const invoices = result?.invoices || [];
  const total = result?.total || 0;
  const totalPages = Math.ceil(total / filters.limit);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <p className="text-gray-400 mt-2">{total} total invoices</p>
        </div>
        <Link
          to="/invoices/new"
          className="px-4 py-2 text-white font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors whitespace-nowrap flex items-center justify-center h-10"
        >
          + Create New Invoice
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-4">
        {/* Main Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-xs font-medium text-slate-400 mb-1">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search invoices..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              disabled={isFetching}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-emerald-600 disabled:opacity-50 transition-colors"
              aria-label="Search invoices"
            />
          </div>

          <div>
            <label htmlFor="dateFrom" className="block text-xs font-medium text-slate-400 mb-1">From Date</label>
            <input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              disabled={isFetching}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-emerald-600 disabled:opacity-50 transition-colors"
              aria-label="Filter by date from"
            />
          </div>

          <div>
            <label htmlFor="dateTo" className="block text-xs font-medium text-slate-400 mb-1">To Date</label>
            <input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              disabled={isFetching}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-emerald-600 disabled:opacity-50 transition-colors"
              aria-label="Filter by date to"
            />
          </div>

          <div>
            <label htmlFor="documentType" className="block text-xs font-medium text-slate-400 mb-1">Document Type</label>
            <select
              id="documentType"
              value={filters.documentType}
              onChange={(e) => handleFilterChange('documentType', e.target.value)}
              disabled={isFetching}
              className="w-full px-3 py-2 h-10 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-emerald-600 cursor-pointer disabled:opacity-50 transition-colors overflow-ellipsis"
              aria-label="Filter by document type"
            >
              <option value="">All Types</option>
              <option value="I-11">I-11 (Invoice)</option>
              <option value="I-12">I-12 (Debit)</option>
              <option value="I-13">I-13 (Credit)</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
        >
          {showAdvancedFilters ? '▼' : '▶'} Advanced Filters
        </button>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2 border-t border-slate-700">
            <div>
              <label htmlFor="minAmount" className="block text-xs font-medium text-slate-400 mb-1">Min Amount</label>
              <input
                id="minAmount"
                type="number"
                placeholder="Min amount"
                value={filters.minAmount ?? ''}
                onChange={(e) => handleFilterChange('minAmount', e.target.value ? parseFloat(e.target.value) : '')}
                disabled={isFetching}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-emerald-600 disabled:opacity-50 transition-colors"
                aria-label="Filter by minimum amount"
              />
            </div>

            <div>
              <label htmlFor="maxAmount" className="block text-xs font-medium text-slate-400 mb-1">Max Amount</label>
              <input
                id="maxAmount"
                type="number"
                placeholder="Max amount"
                value={filters.maxAmount ?? ''}
                onChange={(e) => handleFilterChange('maxAmount', e.target.value ? parseFloat(e.target.value) : '')}
                disabled={isFetching}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-emerald-600 disabled:opacity-50 transition-colors"
                aria-label="Filter by maximum amount"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-xs font-medium text-slate-400 mb-1">Status</label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                disabled={isFetching}
                className="w-full px-3 py-2 h-10 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-emerald-600 cursor-pointer disabled:opacity-50 transition-colors"
                aria-label="Filter by status"
              >
                <option value="">All Status</option>
                <option value="draft">Draft</option>
                <option value="finalized">Finalized</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="cancelled">Cancelled</option>
                <option value="voided">Voided</option>
              </select>
            </div>

          </div>
        )}
      </div>

      {/* Clear All Button - Always visible when filters are active */}
      {hasActiveFilters && (
        <button
          onClick={handleClearAllFilters}
          className="px-3 py-2 bg-slate-700 text-red-400 rounded hover:bg-slate-600 transition-colors text-sm font-medium"
          aria-label="Clear all filters"
        >
          Clear All
        </button>
      )}

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div
          role="region"
          aria-label="Active filters"
          aria-live="polite"
          className="flex flex-wrap gap-2"
        >
          {activeFilters.map((filter) => (
            <div
              key={filter.key}
              className="inline-flex items-center gap-2 px-3 py-1 bg-slate-700 text-slate-100 rounded-full text-sm"
            >
              <span>{filter.label}</span>
              <button
                onClick={() => handleFilterChange(filter.key, '')}
                className="ml-1 hover:text-white transition-colors"
                aria-label={`Remove ${filter.label} filter`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Invoice List */}
      {invoices.length === 0 ? (
        <NotFound 
          title="No Invoices Found"
          message="Start by creating your first invoice"
        />
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-700 text-xs font-medium text-slate-300 uppercase tracking-wider">
                <th className="px-6 py-4 text-left">Document #</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left cursor-pointer hover:text-emerald-400 transition-colors group" onClick={() => handleSortChange('date')}>
                  <div className="flex items-center gap-1.5">
                    Date
                    <span className={`inline-flex text-xs leading-none transition-opacity ${filters.sortBy === 'date' ? 'opacity-100 text-emerald-400' : 'opacity-40 group-hover:opacity-70'}`}>
                      {filters.sortBy === 'date' ? (filters.sortOrder === 'asc' ? '↑' : '↓') : '≡'}
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">Supplier</th>
                <th className="px-6 py-4 text-left">Buyer</th>
                <th className="px-6 py-4 text-right cursor-pointer hover:text-emerald-400 transition-colors group" onClick={() => handleSortChange('amount')}>
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Amount</span>
                    <span className={`inline-flex text-xs leading-none transition-opacity ${filters.sortBy === 'amount' ? 'opacity-100 text-emerald-400' : 'opacity-40 group-hover:opacity-70'}`}>
                      {filters.sortBy === 'amount' ? (filters.sortOrder === 'asc' ? '↑' : '↓') : '≡'}
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {invoices.map((invoice: InvoiceData) => (
                <tr key={invoice.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-emerald-400">{invoice.documentNumber}</td>
                  <td className="px-6 py-4 text-sm">{invoice.documentType}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">{invoice.supplier?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm">{invoice.buyer?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-white">
                    {((invoice as any).totalAmount || 0).toFixed(3)} {invoice.currency}
                  </td>
                  <td className="px-6 py-4 text-center flex gap-2 justify-center">
                    <Link
                      to={`/invoices/${invoice.id}`}
                      className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => setConfirmDelete(invoice.id)}
                      disabled={isDeleting}
                      className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleFilterChange('page', Math.max(1, filters.page - 1))}
            disabled={filters.page === 1}
            className="px-4 py-2 bg-slate-700 text-white rounded disabled:opacity-50 transition-colors"
          >
            ← Previous
          </button>
          <span className="text-slate-400">
            Page {filters.page} of {totalPages}
          </span>
          <button
            onClick={() => handleFilterChange('page', Math.min(totalPages, filters.page + 1))}
            disabled={filters.page === totalPages}
            className="px-4 py-2 bg-slate-700 text-white rounded disabled:opacity-50 transition-colors"
          >
            Next →
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-sm space-y-4">
            <h2 className="text-lg font-bold text-white">Delete Invoice?</h2>
            <p className="text-slate-400">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
