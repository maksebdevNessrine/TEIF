/**
 * Loading Skeleton Components
 * Animated placeholders for invoice lists and details
 */

import React from 'react';

/**
 * Skeleton component for table rows
 * Shows animated placeholder while loading data
 */
export function InvoiceListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <tr key={i} className="border-b hover:bg-gray-50">
          <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-24" /></td>
          <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-12" /></td>
          <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-20" /></td>
          <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-32" /></td>
          <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-32" /></td>
          <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-24" /></td>
          <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-16" /></td>
        </tr>
      ))}
    </>
  );
}

/**
 * Skeleton component for invoice detail page
 * Shows animated placeholder for all invoice sections
 */
export function InvoiceDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-40 mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-3" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {Array.from({ length: 6 }).map((_, i) => (
                <th key={i} className="px-4 py-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, i) => (
              <tr key={i} className="border-t">
                {Array.from({ length: 6 }).map((_, j) => (
                  <td key={j} className="px-4 py-2">
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
