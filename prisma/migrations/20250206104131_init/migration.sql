/*
  Warnings:

  - You are about to drop the `DropdownContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NormalContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PageContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DropdownContent";

-- DropTable
DROP TABLE "Folder";

-- DropTable
DROP TABLE "NormalContent";

-- DropTable
DROP TABLE "PageContent";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parent" TEXT,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "normalContent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "topicContent" TEXT,
    "parent" TEXT,

    CONSTRAINT "normalContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dropdownContent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "topicContent" TEXT,
    "dropdownContent" TEXT,
    "dropdownTopicContent" TEXT,
    "parent" TEXT,

    CONSTRAINT "dropdownContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pageContent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "topicContent" TEXT,
    "pageLink" TEXT,
    "parent" TEXT,

    CONSTRAINT "pageContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
