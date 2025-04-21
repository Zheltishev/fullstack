-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "flag" INTEGER NOT NULL,
    "event" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "card" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
