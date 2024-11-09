# main notes

- ## Adding Search and Pagination

  learn how to add search and pagination!

  Your search functionality will span the client and the server. When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data.

  - ### Why use URL search params?

    As mentioned above, you'll be using URL search params to manage the search state. This pattern may be new if you're used to doing it with client side state.

    There are a couple of benefits of implementing search with URL params:

    Bookmarkable and Shareable URLs: Since the search parameters are in the URL, users can bookmark the current state of the application, including their search queries and filters, for future reference or sharing.
    Server-Side Rendering and Initial Load: URL parameters can be directly consumed on the server to render the initial state, making it easier to handle server rendering.
    Analytics and Tracking: Having search queries and filters directly in the URL makes it easier to track user behavior without requiring additional client-side logic.

  - ### Adding the search functionality

    These are the Next.js client hooks that you'll use to implement the search functionality:

    - `useSearchParams`- Allows you to access the parameters of the current URL. For example, the search params for this URL /dashboard/invoices?page=1&query=pending would look like this: {page: '1', query: 'pending'}.
    - `usePathname` - Lets you read the current URL's pathname. For example, for the route /dashboard/invoices, usePathname would return '/dashboard/invoices'.
    - `useRouter` - Enables navigation between routes within client components programmatically. There are multiple methods you can use.

    Here's a quick overview of the implementation steps:

        1. Capture the user's input.
        2. Update the URL with the search params.
        3. Keep the URL in sync with the input field.
        4. Update the table to reflect the search query.

    1. #### Capture the user's input

       Go into the `<Search>` Component (/app/ui/search.tsx), and you'll notice:

       - `"use client"` - This is a Client Component, which means you can use event listeners and hooks.
       - `<input>`- This is the search input.

         Create a new `handleSearch` function, and add an `onChange` listener to the `<input>` element. onChange will invoke `handleSearch` whenever the input value changes.

       ```ts
       function handleSearch(term: string) {
         console.log(term);
       }
       <input
         className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
         placeholder={placeholder}
         onChange={(e) => {
           handleSearch(e.target.value);
         }}
       />;
       ```

       You're capturing the user's search input. Now, you need to update the URL with the search term

    2. #### Update the URL with the search params

       Import the useSearchParams hook from 'next/navigation', and assign it to a variable:

       ```ts
           import { useSearchParams } from 'next/navigation';

         export default function Search() {
           const searchParams = useSearchParams();
       ```

       Inside `handleSearch`, create a `new URLSearchParams` instance using your new searchParams variable.

       ```ts
       const params = new URLSearchParams(searchParams);
       ```

       URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters. Instead of creating a complex string literal, you can use it to get the params string like ?page=1&query=a.

       Next, set the params string based on the user’s input. If the input is empty, you want to delete it

       ```ts
       if (term) {
         params.set('query', term);
       } else {
         params.delete('query');
       }
       ```

       Now that you have the query string. You can use Next.js's useRouter and usePathname hooks to update the URL.

       Import `useRouter` and `usePathname` from '`next/navigation`', and use the replace method from `useRouter()` inside handleSearch

       ```ts
       'use client';

       import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
       import {
         useSearchParams,
         usePathname,
         useRouter,
       } from 'next/navigation';

       export default function Search() {
         const searchParams = useSearchParams();
         const pathname = usePathname();
         const { replace } = useRouter();

         function handleSearch(term: string) {
           const params = new URLSearchParams(searchParams);
           if (term) {
             params.set('query', term);
           } else {
             params.delete('query');
           }
           replace(`${pathname}?${params.toString()}`);
         }
       }
       ```

       Here's a breakdown of what's happening:

       - `${pathname}` is the current path, in your case, "/dashboard/invoices".
       - As the user types into the search bar, `params.toString()` translates this input into a URL-friendly format.
       - `replace(${pathname}?${params.toString()})` updates the URL with the user's search data. For example, `/dashboard/invoices?query=lee` if the user searches for "Lee".
       - The URL is updated without reloading the page, thanks to Next.js's client-side navigation

    3. #### Keep the URL in sync with the input field

       To ensure the input field is in sync with the URL and will be populated when sharing, you can pass a `defaultValue` to input by reading from `searchParams`

       ```ts
       <input
         className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
         placeholder={placeholder}
         onChange={(e) => {
           handleSearch(e.target.value);
         }}
         defaultValue={searchParams.get('query')?.toString()}
       />
       ```

       > defaultValue vs. value / Controlled vs. Uncontrolled

       > If you're using state to manage the value of an input, you'd use the value attribute to make it a controlled component. This means React would manage the input's state.

       > However, since you're not using state, you can use defaultValue. This means the native input will manage its own state. This is okay since you're saving the search query to the URL instead of state.

    4. #### Updating the table

       you need to update the table component to reflect the search query.
       Page components accept a prop called searchParams, so you can pass the current URL params to the `<Table>`component.

       ```ts
              export default async function Page(props: {
          searchParams?: Promise<{
            query?: string;
            page?: string;
          }>;
        }) {
          const searchParams = await props.searchParams;
          const query = searchParams?.query || '';
          const currentPage = Number(searchParams?.page) || 1;
       ```
