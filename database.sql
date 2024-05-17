create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255)
);

create TABLE post(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);

CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    surname TEXT,
    email TEXT UNIQUE,
    password TEXT
);

CREATE TABLE Goods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    description TEXT,
    brand TEXT,
    category TEXT,
    price INTEGER,
    img TEXT,
    popular INTEGER DEFAULT 0,
    discount INTEGER DEFAULT 0,
    count INTEGER DEFAULT 0,
    created TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE Posts(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    img TEXT,
    description TEXT,
    created TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_modified
BEFORE UPDATE ON Goods
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TABLE News (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    description TEXT,
    img TEXT UNIQUE,
    created TIMESTAMP WITH TIME ZONE DEFAULT now()
);