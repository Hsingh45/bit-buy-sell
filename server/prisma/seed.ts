import { PrismaClient } from "@prisma/client";

import { programs } from "./seed-data/programs";
import { categories } from "./seed-data/categories";
import { subcategories } from "./seed-data/subcategories";

const prisma = new PrismaClient();

async function seedPrograms() {
  console.log("🌱 Seeding Programs...");

  for (const [index, program] of programs.entries()) {
    await prisma.program.upsert({
      where: {
        code: program.code,
      },
      update: {
        programName: program.name,
        displayOrder: index + 1,
      },
      create: {
        code: program.code,
        programName: program.name,
        displayOrder: index + 1,
      },
    });
  }

  console.log("✅ Programs Seeded");
}

async function seedCategories() {
  console.log("🌱 Seeding Categories...");

  for (const [index, category] of categories.entries()) {
    await prisma.category.upsert({
      where: {
        code: category.code,
      },
      update: {
        categoryName: category.name,
        categoryIcon: category.icon,
        displayOrder: index + 1,
      },
      create: {
        code: category.code,
        categoryName: category.name,
        categoryIcon: category.icon,
        displayOrder: index + 1,
      },
    });
  }

  console.log("✅ Categories Seeded");
}

async function seedSubCategories() {
  console.log("🌱 Seeding SubCategories...");

  for (const [index, subcategory] of subcategories.entries()) {
    const category = await prisma.category.findUnique({
      where: {
        code: subcategory.categoryCode,
      },
    });

    if (!category) {
      throw new Error(`Category '${subcategory.categoryCode}' not found`);
    }

    await prisma.subCategory.upsert({
      where: {
        code: subcategory.code,
      },
      update: {
        subcategoryName: subcategory.name,
        icon: subcategory.icon,
        categoryId: category.id,
        displayOrder: index + 1,
      },
      create: {
        code: subcategory.code,
        subcategoryName: subcategory.name,
        icon: subcategory.icon,
        categoryId: category.id,
        displayOrder: index + 1,
      },
    });
  }

  console.log("✅ SubCategories Seeded");
}

async function main() {
  console.log("🚀 Starting Database Seed...\n");

  await seedPrograms();

  await seedCategories();

  await seedSubCategories();

  console.log("\n🎉 Database Seeding Completed Successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
