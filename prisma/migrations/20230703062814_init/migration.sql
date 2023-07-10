/*
  Warnings:

  - The primary key for the `favoritposts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `favoritposts` table. All the data in the column will be lost.
  - Added the required column `name` to the `category` table without a default value. This is not possible if the table is not empty.
  - The required column `code` was added to the `favoritposts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[category] ADD [name] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[favoritposts] DROP CONSTRAINT [favoritposts_pkey];
ALTER TABLE [dbo].[favoritposts] DROP COLUMN [id];
ALTER TABLE [dbo].[favoritposts] ADD CONSTRAINT favoritposts_pkey PRIMARY KEY CLUSTERED ([userId],[postId]);
ALTER TABLE [dbo].[favoritposts] ADD [code] NVARCHAR(1000) NOT NULL;

-- CreateIndex
CREATE NONCLUSTERED INDEX [favoritposts_code_idx] ON [dbo].[favoritposts]([code]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [User_email_idx] ON [dbo].[User]([email]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
