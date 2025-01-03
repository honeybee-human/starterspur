'use server'

import { createClient } from '@/utils/supabase/server'

export async function createCountry(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get('name') as string;
  const datestart = formData.get('date') as string;

  const { data, error } = await supabase
    .from('countries')
    .insert([{ name, datestart }])
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCountries() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('countries')
    .select('*')

  if (error) {
    throw new Error(error.message)
  }

  return data
}
