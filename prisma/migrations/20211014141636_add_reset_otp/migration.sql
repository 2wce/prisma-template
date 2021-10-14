-- AlterTable
ALTER TABLE "User" ADD COLUMN "resetPasswordOtp" INTEGER;

-- RedefineIndex
DROP INDEX "User.email_unique";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
