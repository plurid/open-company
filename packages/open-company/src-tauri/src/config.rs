use std::fs;
use std::fs::File;
use std::io;
use std::io::{Read, Write};
use std::path::PathBuf;

use serde;
use serde_json;



fn get_config_path(
    app_handle: tauri::AppHandle,
) -> PathBuf {
    let app_dir = app_handle.path_resolver().app_config_dir().unwrap();
    let config_path = app_dir.join("config.json");

    return config_path;
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

    if let Some(parent) = config_path.parent() {
        if !parent.exists() {
            if let Err(err) = fs::create_dir_all(parent) {
                eprintln!("Error creating directories: {}", err);
                return None;
            }
        }
    }

    if !config_path.exists() {
        let file = fs::File::create(config_path.clone()).unwrap();
        let mut writer = io::BufWriter::new(file);
        let _ = writer.write_all(b"").unwrap();
    }

    if let Ok(mut file) = File::create(config_path) {
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
    let config_path = get_config_path(app_handle.clone());

    if let Ok(mut file) = File::open(config_path) {
        let mut file_content = String::new();
        if let Ok(_) = file.read_to_string(&mut file_content) {
            if let Ok(config) = serde_json::from_str::<Config>(&file_content) {
                let config_path = PathBuf::from(config.database_location.clone());
                if !config_path.exists() {
                    update_config(app_handle, Config {
                        database_location: String::new(),
                    });

                    return None;
                }

                return Some(config);
            }
        }
    }

    None
}
