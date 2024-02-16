-- CreateTable
CREATE TABLE "Student" (
    "personalCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("personalCode")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" SERIAL NOT NULL,
    "studentPersonalCode" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_personalCode_key" ON "Student"("personalCode");

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentPersonalCode_fkey" FOREIGN KEY ("studentPersonalCode") REFERENCES "Student"("personalCode") ON DELETE RESTRICT ON UPDATE CASCADE;
