'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// use Zod to to filter the expected types
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

/**
 * Creates a new invoice in the database using the provided form data.
 *
 * This function extracts the customer ID, amount, and status from the
 * formData, validates it using the CreateInvoice schema, and then
 * inserts a new invoice record into the database with the calculated
 * amount in cents and the current date. After insertion, it revalidates
 * the path and redirects to the invoices dashboard.
 *
 * @param {FormData} formData - The form data containing customer ID,
 * amount, and status for creating a new invoice.
 */
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  try {
    const db = await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
    console.log('invoice created !');
  } catch (error) {
    return {
      message: 'Database error: Failed to create invoice',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

/**
 * Updates an existing invoice in the database using the provided form data.
 *
 * This function extracts the customer ID, amount, and status from the
 * formData, validates it using the UpdateInvoice schema, and then
 * updates the invoice record in the database with the updated values.
 * After updating, it revalidates the path and redirects to the invoices
 * dashboard.
 *
 * @param {string} id - The ID of the invoice to update.
 * @param {FormData} formData - The form data containing customer ID,
 * amount, and status for updating the invoice.
 */
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: 'Database error: Failed to Update invoice',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

/**
 * Deletes an invoice from the database and revalidates the invoices dashboard.
 *
 * @param {string} id - The ID of the invoice to delete.
 */
export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    return {
      message: 'Database error: Failed to delete invoice',
    };
  }
}
