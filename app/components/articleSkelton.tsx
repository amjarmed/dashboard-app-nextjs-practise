// loading.tsx

// Skeleton component for a blog article
const ArticleLoadingSkeleton = () => {
  return (
    <div className='loading-skeleton w-1/2  mt-5'>
      {/* Skeleton header */}
      <div className='skeleton-header animate-pulse bg-gray-300 h-8 w-3/4 rounded mb-4'>
        {' '}
      </div>

      {/* Skeleton body */}
      <div className='skeleton-body'>
        <div className='skeleton-line animate-pulse bg-gray-300 h-4 w-full rounded mb-2'></div>
        <div className='skeleton-line animate-pulse bg-gray-300 h-4 w-5/6 rounded mb-2'></div>
        <div className='skeleton-line animate-pulse bg-gray-300 h-4 w-2/3 rounded mb-2'></div>
        <div className='skeleton-line animate-pulse bg-gray-300 h-4 w-4/5 rounded mb-2'></div>
      </div>

      {/* Skeleton image */}
      <div className='skeleton-image animate-pulse bg-gray-300 h-48 w-full rounded mb-4'></div>

      {/* Skeleton footer */}
      <div className='skeleton-footer'>
        <div className='skeleton-tag animate-pulse bg-gray-300 h-4 w-1/4 rounded mb-2'></div>
        <div className='skeleton-tag animate-pulse bg-gray-300 h-4 w-1/4 rounded'></div>
      </div>
    </div>
  );
};

export default ArticleLoadingSkeleton;
