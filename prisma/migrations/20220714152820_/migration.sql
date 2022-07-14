/*
  Warnings:

  - Added the required column `updateAt` to the `Twitter` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Twitter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "Twitter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Twitter" ("id", "message", "userId") SELECT "id", "message", "userId" FROM "Twitter";
DROP TABLE "Twitter";
ALTER TABLE "new_Twitter" RENAME TO "Twitter";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
