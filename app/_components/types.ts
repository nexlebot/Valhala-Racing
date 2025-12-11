interface Location {
    lot: string;
    venue: string;
}

interface Pedigree {
    title: string;
    description: string;
}

interface Relative {
    relation: string;
    details: string;
}

interface FamilyOfChampions {
    title: string;
    description: string;
    relatives: Relative[];
    note: string;
}

interface PresenceAndPotential {
    title: string;
    physical: string;
    temperament: string;
}

interface InvestmentOpportunity {
    title: string;
    description: string;
}

interface ExpressionOfInterest {
    title: string;
    question: string;
    callToAction: string;
}

interface InfoShowCaseProps {
    name: string;
    age: string;
    breed: string;
    purchasePrice: string;
    location: Location;
    saleYear: string;
    pedigree: Pedigree;
    familyOfChampions: FamilyOfChampions;
    presenceAndPotential: PresenceAndPotential;
    investmentOpportunity: InvestmentOpportunity;
    expressionOfInterest: ExpressionOfInterest;
}
export type { InfoShowCaseProps };