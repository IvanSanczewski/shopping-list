import 'dotenv/config';
import crypto from 'node:crypto';
import { createSupabaseClient } from '../db/supabase.js';
import SHOPPINGLISTS_DATA from '../data/data.js';

async function run() {
  const supabase = createSupabaseClient();

  console.log('Seeding shopping_lists and shopping_items from data/data.js...');

  // 1) Upsert shopping_lists
  for (const list of SHOPPINGLISTS_DATA) {
    const listRow = {
      id: list.id,
      title: list.title ?? null,
      shop: list.shop ?? null,
      total: list.total ?? null,
      weekday: list.weekday ?? null,
    };

    const { error: listError } = await supabase
      .from('shopping_lists')
      .upsert(listRow, { onConflict: 'id' });

    if (listError) {
      console.error(`Failed to upsert shopping_list ${list.id}:`, listError.message);
      process.exitCode = 1;
      return; // stop early so you can fix schema/permissions
    }

    // 2) Insert items for this list
    for (const item of list.cart ?? []) {
      const itemRow = {
        id: crypto.randomUUID(), // safe if DB doesn't auto-generate
        list_id: list.id,
        item: item.item ?? null,
        bought: item.bought ?? false,
        units: item.units ?? null,
      };

      const { error: itemError } = await supabase
        .from('shopping_items')
        .insert(itemRow);

      if (itemError) {
        console.error(`Failed to insert item for list ${list.id}:`, itemError.message);
        process.exitCode = 1;
        return; // stop early for clarity
      }
    }

    console.log(`Seeded list ${list.id} with ${list.cart?.length ?? 0} items.`);
  }

  console.log('Seeding complete.');
}

run().catch((e) => {
  console.error('Unexpected error in seed script:', e);
  process.exit(1);
});
