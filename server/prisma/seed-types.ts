export interface ProgramSeed {
  code: string;
  name: string;
}

export interface CategorySeed {
  code: string;
  name: string;
  icon: string;
}

export interface SubCategorySeed {
  code: string;
  name: string;
  icon: string;
  categoryCode: string;
}
