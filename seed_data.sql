-- Insert sample flower varieties from your database
INSERT INTO flower_varieties (name, species, growth_cycle_days, optimal_harvest_window_days, market_value_per_stem) VALUES
('Red Freedom Rose', 'Rose', 120, 3, 1.50),
('White Avalanche Rose', 'Rose', 115, 2, 1.75),
('Sunflower Giant', 'Sunflower', 90, 7, 0.75),
('Premium Lily', 'Lily', 100, 5, 2.00),
('Carnation Supreme', 'Carnation', 85, 4, 0.80);

-- Insert sample inventory items
INSERT INTO inventory_items (name, category, unit, current_stock, reorder_level, unit_cost, supplier) VALUES
('NPK Fertilizer', 'Fertilizer', 'kg', 100, 20, 5.00, 'AgroSupplies Ltd'),
('Rose Seeds', 'Seeds', 'packet', 50, 10, 15.00, 'SeedMaster Inc'),
('Pesticide Spray', 'Pesticide', 'liter', 30, 5, 12.50, 'CropCare Co'),
('Water Soluble Fertilizer', 'Fertilizer', 'kg', 80, 15, 8.00, 'NutriGrow'),
('Flower Pots', 'Equipment', 'piece', 200, 50, 2.50, 'FarmTools Ltd');