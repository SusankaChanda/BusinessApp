// In FormStepsData.ts (or you can keep this within the Steps component file)
export interface FormStepType {
  id: number;
  title: string;
}

export const FormStepsData: FormStepType[] = [
  { id: 1, title: "Bussiness Information" },
  { id: 2, title: "Owner / Manager Details" },
  { id: 3, title: "Pan / Aadhar Details" },
  { id: 4, title: "Legal Documents" },
  { id: 5, title: "Bank Details" },
  { id: 6, title: "Serice Info" },
  { id: 7, title: "Preview Document" },
  { id: 8, title: "Reach Increased" },
];
