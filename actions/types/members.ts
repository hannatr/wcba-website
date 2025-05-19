export enum MemberCategory {
  Adoptions = "Adoptions",
  Bankruptcy = "Bankruptcy",
  CommercialMatters = "Commercial Matters",
  ContractsConsumerLaw = "Contracts/Consumer Law",
  CriminalDefenseTrafficLaw = "Criminal Defense/Traffic Law",
  DisabilityBenefitsWorkersComp = "Disability Benefits/Worker's Comp",
  DivorceSeparations = "Divorce/Separations",
  EmploymentLaw = "Employment Law",
  FamilyCourtLaw = "Family Court/Law",
  GovernmentCorporateCounsel = "Government/Corporate Counsel",
  HealthElderLaw = "Health/Elder Law",
  Immigration = "Immigration",
  NoPrivateClientsServed = "No Private Clients Served",
  NonAttorneyMember = "Non-Attorney Member",
  Other = "Other",
  PersonalInjuryNegligence = "Personal Injury/Negligence",
  RealEstateLaw = "Real Estate Law",
  TaxLaw = "Tax Law",
  WillsEstatePlanning = "Wills/Estate Planning",
}

export type CustomCategory = {
  type: MemberCategory.Other;
  customText: string;
};

export type MemberCategories = (MemberCategory | CustomCategory)[];

export const isCustomCategory = (category: any): category is CustomCategory => {
  return (
    category &&
    typeof category === "object" &&
    "type" in category &&
    category.type === MemberCategory.Other &&
    "customText" in category
  );
};

export const isMemberCategory = (category: any): category is MemberCategory => {
  return (
    typeof category === "string" &&
    Object.values(MemberCategory).includes(category as MemberCategory)
  );
};
