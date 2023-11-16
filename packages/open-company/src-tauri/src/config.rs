use std::fs::File;
use std::io::{Read, Write};
use std::path::PathBuf;

use serde;
use serde_json;



fn get_config_path(
    app_handle: tauri::AppHandle,
) -> PathBuf {
    let app_dir = app_handle.path_resolver().app_config_dir().unwrap();

    return app_dir;
}


#[derive(serde::Serialize, serde::Deserialize)]
pub struct Config {
    pub database_location: String,
}


pub fn update_config(
    app_handle: tauri::AppHandle,
    config: Config,
) -> Option<bool> {
    let config_path = get_config_path(app_handle);
    let config_json = serde_json::to_string(&config);

    if let Err(err) = config_json {
        eprintln!("Error serializing config: {}", err);
        return None;
    }

    if let Ok(mut file) = File::open(config_path) {
        if let Err(err) = file.write_all(config_json.unwrap().as_bytes()) {
            eprintln!("Error writing to config file: {}", err);
            return None;
        }

        return Some(true);
    }

    None
}


pub fn get_config(
    app_handle: tauri::AppHandle,
) -> Option<Config> {
    let config_path = get_config_path(app_handle);

    if let Ok(mut file) = File::open(config_path) {
        let mut file_content = String::new();
        if let Ok(_) = file.read_to_string(&mut file_content) {
            if let Ok(config) = serde_json::from_str::<Config>(&file_content) {
                return Some(config);
            }
        }
    }

    None
}
