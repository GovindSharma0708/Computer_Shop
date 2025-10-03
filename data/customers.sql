INSERT INTO customers 
(first_name, last_name, email, phone, address1, address2, city, state, zip, notes, active, created_at, updated_at)
VALUES
('John', 'Doe', 'john.doe@example.com', '555-1234', '123 Elm St', 'Apt 2B', 'Somewhere', 'CA', '90210', 'VIP customer', true, NOW(), NOW()),
('Jane', 'Smith', 'jane.smith@example.com', '555-5678', '456 Oak St', NULL, 'Anywhere', 'NY', '10001', NULL, true, NOW(), NOW()),
('Alice', 'Johnson', 'alice.johnson@example.com', '555-8765', '789 Pine St', 'Suite 300', 'Nowhere', 'TX', '73301', 'Prefers evening calls', true, NOW(), NOW()),
('Bob', 'Brown', 'bob.brown@example.com', '555-4321', '321 Maple Ave', NULL, 'Elsewhere', 'FL', '33101', NULL, false, NOW(), NOW()),
('Charlie', 'Davis', 'charlie.davis@example.com', '555-2468', '654 Cedar Rd', 'Unit 12', 'Everywhere', 'IL', '60601', 'Follow up next month', true, NOW(), NOW());
