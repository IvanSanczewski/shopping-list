import e from "express";
import { createSupabaseClient } from "./db/supabase";

const supabase = createSupabaseClient();

/** 
 * Shopping List DB Service 
 * this file contains all database operations for the shopping list app
 */

//******* S H O P P I N G   L I S T   O P E R A T I O N S *******//

// Get all shopping lists with their items
// this replaces the old SHOPPINGLISTS_DATA array

export async function getAllLists() {
    try {
        const { data, error } = await supabase
            .from('shopping_lists')
            .select(`
                id, title, shop, total, weekday, shopping_items(
                    id, item, bought, units)
                    `)
            .order('id', { ascending: false }); //This keeps the most recent first
                
        if (error) throw error;
        
        // Data transformation to match current format
        return data.map(list => ({
            ...list,
            cart: list.shopping_items || [] //Rename shopping_list to cart
        }));
        
    } catch (error) {
        console.error('Error fetching shopping lists:', error.message);
        throw error;
    }
}


// Get a single shopping list using its ID with all its items

export async function getList(listId) {
    try {
        const { data, error } = await supabase
            .from('shopping_lists')
            .select(`
                id, title, shop, total, weekday, shopping_items(
                    id, item, bought, units)
                    `)
            .eq('id', listId)
            .single(); //Only one result expected
                
        if (error) throw error;
                
        // Data transformation to match current format
        return {
            ...data,
            cart: data.shopping_items || []
        };                

    } catch (error) {
        console.error(`Error fecthing list ${listId}:`, error.message);
        throw error
    }
}


// Create new shopping list

export async function createList(listData) {
    try {
        const { data, error } = await supabase
            .from('shopping_list')
            .insert([{
                id: listData.id,
                title:listData.title,
                shop:listData.shop,
                weekday:listData.weekday,
            }])
            .select()
            .single();

        if (error) throw error;

        return {
            ...data,
            cart:[]
        };

    } catch (error) {
        console.error('Error creating list:', error.message);
        throw error;
    }
}


// Update a shopping list

export async function updateList(listId, updates) {
    try {
        const { data, error } = await supabase
            .from('shopping_lists')
            .update(updates)
            .eq('id', listId)
            .select()
            .single();

        if (error) throw error;

        return data;

    } catch (error) {
        console.error(`Error updating list ${listId}:`, error.message);
        throw error;
    }
}


// Delete a shopping list

export async function deleteList(listId) {
    try {
        // Delete all items first ???
        await supabase
            .from('shopping_items')
            .delete()
            .eq('list_id', listId);

        // Now, delete the list itself    
        const { error } = await supabase
            .from('shopping_lists')
            .delete()
            .eq('id', listId)

        if (error) throw error;

    } catch (error) {
        console.error(`Error deleting  list ${listId}:`, error.message);
        throw error;
    }
}


