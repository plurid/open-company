// @generated automatically by Diesel CLI.

diesel::table! {
    addresses (id) {
        id -> Integer,
        value -> Text,
        country -> Text,
        location -> Text,
    }
}

diesel::table! {
    companies (id) {
        id -> Integer,
        owned_by -> Text,
        name -> Text,
        fields -> Text,
        use_for_invoicing -> Bool,
    }
}

diesel::table! {
    company_templates (id) {
        id -> Integer,
        owned_by -> Text,
        name -> Text,
        fields -> Text,
        as_default -> Bool,
    }
}

diesel::table! {
    contacts (id) {
        id -> Integer,
        name -> Text,
        phone -> Text,
        email -> Text,
    }
}

diesel::table! {
    invoices (id) {
        id -> Integer,
        invoice_from -> Text,
        invoice_to -> Text,
    }
}

diesel::table! {
    items (id) {
        id -> Integer,
        owned_by -> Text,
        name -> Text,
        display -> Text,
        unit -> Text,
        default_quantity -> Float,
        currency -> Text,
        price -> Float,
    }
}

diesel::table! {
    users (id) {
        id -> Integer,
        username -> Text,
        password -> Text,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    addresses,
    companies,
    company_templates,
    contacts,
    invoices,
    items,
    users,
);
