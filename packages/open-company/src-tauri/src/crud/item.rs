use diesel::prelude::*;

use crate::models::{
    Item,
    NewItem,
};
use crate::schema::items;



pub fn create_item(
    connection: &mut SqliteConnection,
    owned_by: &str,
    name: &str,
    price: f32,
) -> Item {
    let new_item = NewItem {
        owned_by,
        name,
        price,
    };

    diesel::insert_into(items::table)
        .values(&new_item)
        .returning(Item::as_returning())
        .get_result(connection)
        .expect("Error saving new item")
}


pub fn get_user_items(
    connection: &mut SqliteConnection,
    owned_by: &str,
) -> Vec<Item> {
    let items = items::table
        .filter(items::owned_by.eq(owned_by))
        .load(connection)
        .expect("Error loading items");

    items
}


pub fn get_item(
    connection: &mut SqliteConnection,
    owned_by: &str,
    id: i32,
) -> Item {
    let item = items::table
        .filter(items::owned_by.eq(owned_by))
        .filter(items::id.eq(id))
        .first(connection)
        .expect("Error loading item");

    item
}
