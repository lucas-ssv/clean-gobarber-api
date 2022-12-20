-- CreateTable
CREATE TABLE "scheduled_times" (
    "id" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,

    CONSTRAINT "scheduled_times_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "scheduled_times" ADD CONSTRAINT "scheduled_times_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
