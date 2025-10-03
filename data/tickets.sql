INSERT INTO tickets 
(customer_id, title, description, completed, tech, created_at, updated_at)
VALUES
(1, 'Login Issue', 'Customer reports being unable to log into the portal.', false, 'unassigned', NOW(), NOW()),
(2, 'Payment Failure', 'Credit card payment is failing for subscription.', false, 'tech1', NOW(), NOW()),
(3, 'Address Update', 'Requested to update billing address in system.', true, 'tech2', NOW(), NOW()),
(4, 'App Crash', 'Mobile app crashes on form submission.', false, 'tech3', NOW(), NOW()),
(5, 'Feature Request', 'Wants a dark mode option in dashboard.', true, 'tech1', NOW(), NOW());
