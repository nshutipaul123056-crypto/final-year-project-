-- Use your existing database
USE your_database_name;

-- Add missing columns for Activity-Based Costing
ALTER TABLE `activities` 
ADD COLUMN IF NOT EXISTS `cost_per_hour` DECIMAL(10,2) DEFAULT 0;

ALTER TABLE `flower_varieties` 
ADD COLUMN IF NOT EXISTS `profit_margin` DECIMAL(5,2) DEFAULT 0;

ALTER TABLE `harvest_records` 
ADD COLUMN IF NOT EXISTS `total_cost` DECIMAL(10,2) DEFAULT 0;

ALTER TABLE `crop_cycles` 
ADD COLUMN IF NOT EXISTS `target_harvest_date` DATE;

-- Create indexes for better performance
CREATE INDEX idx_crop_cycle_variety ON crop_cycles(variety_id);
CREATE INDEX idx_activities_crop_cycle ON activities(crop_cycle_id);
CREATE INDEX idx_resource_usage_crop ON resource_usage(crop_cycle_id);

-- Add trigger for automatic stock updates
DELIMITER $$
CREATE TRIGGER after_resource_usage_insert
AFTER INSERT ON resource_usage
FOR EACH ROW
BEGIN
    UPDATE inventory_items 
    SET current_stock = current_stock - NEW.quantity_used
    WHERE id = NEW.inventory_item_id;
END$$
DELIMITER ;