-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "isEmailSended" SET DEFAULT false;

-- AlterTable
ALTER TABLE "DonatedBook" ALTER COLUMN "applicationsQty" SET DEFAULT 0;
