import React, { Fragment } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}
export const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pageSizeOptions = [10, 20, 50, 100];
  return <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t">
      <div className="flex items-center text-sm text-gray-500">
        Showing {startItem} to {endItem} of {totalItems} results
        {onPageSizeChange && <select className="ml-4 px-2 py-1 border rounded-lg text-sm" value={pageSize} onChange={e => onPageSizeChange(Number(e.target.value))}>
            {pageSizeOptions.map(size => <option key={size} value={size}>
                {size} per page
              </option>)}
          </select>}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
          <ChevronLeft className="h-5 w-5" />
        </button>
        {Array.from({
        length: totalPages
      }, (_, i) => i + 1).filter(page => page === 1 || page === totalPages || page >= currentPage - 1 && page <= currentPage + 1).map((page, index, array) => <Fragment key={page}>
              {index > 0 && array[index - 1] !== page - 1 && <span className="px-2 text-gray-400">...</span>}
              <button onClick={() => onPageChange(page)} className={`px-3 py-1 rounded-lg text-sm ${currentPage === page ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
                {page}
              </button>
            </Fragment>)}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>;
};