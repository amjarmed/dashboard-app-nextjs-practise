import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'customers',
};
const Page = () => {
  return (
    <div className='flex min-h-screen flex-col p-6 justify-center items-center'>
      <p className='text-3xl font-bold'>Customers Page</p>
    </div>
  );
};
export default Page;
