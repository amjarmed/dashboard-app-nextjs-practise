'use client';

import clsx from 'clsx';
import { useState } from 'react';

const Play = () => {
  const [status, setStatus] = useState('pending');

  return (
    <div>
      <h1
        className={clsx('text-4xl', {
          'text-red-500': status === 'pending',
          'text-green-500': status === 'playing',
        })}
      >
        Play Page
      </h1>
      <div className='flex gap-4 '>
        <button
          className='mt-4 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400'
          onClick={() => setStatus('playing')}
        >
          Play
        </button>
        <button
          className='mt-4 rounded-lg bg-red-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400'
          onClick={() => setStatus('pending')}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
export default Play;
