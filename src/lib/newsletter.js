import { supabase } from "./supabaseClient";

export async function subscribeToNewsletter(email) {
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email.trim().toLowerCase() });

  // 23505 = already subscribed. Treat that as a success for the visitor.
  if (error && error.code !== "23505") throw error;
}