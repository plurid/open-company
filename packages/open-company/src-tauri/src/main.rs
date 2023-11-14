// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[allow(dead_code)]
#[allow(unused_variables)]


mod db;



#[tauri::command]
fn start_database(
    name: &str,
    location: &str,
) {
    println!("generating database: {} {}", name, location);
}


fn setup_app() {
    db::init();
}



fn main() {
    tauri::Builder::default()
        // .setup::<_, Box<dyn std::error::Error>>(setup_app_function)
        // .setup(setup_app)
        .setup(|_app| {
            setup_app();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![start_database])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
