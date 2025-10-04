-- Migration: Add authentication columns to existing tables
-- Run this script manually in your SQL Server database

-- Add new columns to Customers table
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Customers]') AND name = 'isVerified')
BEGIN
    ALTER TABLE [Customers] ADD [isVerified] BIT NOT NULL DEFAULT 0;
    PRINT 'Added isVerified column to Customers table';
END
ELSE
BEGIN
    PRINT 'isVerified column already exists';
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Customers]') AND name = 'profileCompleted')
BEGIN
    ALTER TABLE [Customers] ADD [profileCompleted] BIT NOT NULL DEFAULT 0;
    PRINT 'Added profileCompleted column to Customers table';
END
ELSE
BEGIN
    PRINT 'profileCompleted column already exists';
END

-- Make name and address nullable in Customers table
IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Customers]') AND name = 'name' AND is_nullable = 0)
BEGIN
    ALTER TABLE [Customers] ALTER COLUMN [name] NVARCHAR(255) NULL;
    PRINT 'Made name column nullable';
END

IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Customers]') AND name = 'address' AND is_nullable = 0)
BEGIN
    ALTER TABLE [Customers] ALTER COLUMN [address] NVARCHAR(255) NULL;
    PRINT 'Made address column nullable';
END

-- Add phoneNumber column to OTPs table
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[OTPs]') AND name = 'phoneNumber')
BEGIN
    ALTER TABLE [OTPs] ADD [phoneNumber] NVARCHAR(255) NOT NULL DEFAULT '';
    PRINT 'Added phoneNumber column to OTPs table';
END
ELSE
BEGIN
    PRINT 'phoneNumber column already exists';
END

-- Make CustomerId nullable in OTPs table
IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[OTPs]') AND name = 'CustomerId' AND is_nullable = 0)
BEGIN
    -- First, drop the foreign key constraint if it exists
    DECLARE @ConstraintName nvarchar(200)
    SELECT @ConstraintName = name FROM sys.foreign_keys WHERE parent_object_id = OBJECT_ID(N'[dbo].[OTPs]') AND referenced_object_id = OBJECT_ID(N'[dbo].[Customers]')
    
    IF @ConstraintName IS NOT NULL
    BEGIN
        EXEC('ALTER TABLE [OTPs] DROP CONSTRAINT ' + @ConstraintName)
        PRINT 'Dropped foreign key constraint: ' + @ConstraintName
    END
    
    -- Make CustomerId nullable
    ALTER TABLE [OTPs] ALTER COLUMN [CustomerId] INT NULL;
    PRINT 'Made CustomerId nullable in OTPs table';
    
    -- Re-add the foreign key constraint
    ALTER TABLE [OTPs] ADD CONSTRAINT [FK_OTPs_Customers] FOREIGN KEY ([CustomerId]) REFERENCES [Customers]([id]) ON DELETE CASCADE;
    PRINT 'Re-added foreign key constraint';
END

PRINT 'Migration completed successfully!';
