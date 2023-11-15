use diesel::prelude::*;

use crate::models::{
    Item,
    NewItem,
};



pub fn create_item(
    conn: &mut SqliteConnection,
    name: &str,
) -> Item {
    use crate::schema::items;

    let new_item = NewItem {
        name,
    };

    diesel::insert_into(items::table)
        .values(&new_item)
        .returning(Item::as_returning())
        .get_result(conn)
        .expect("Error saving new item")
}
