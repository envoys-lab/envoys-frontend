interface PersonData {
  documents: any
  first_name: string
  last_name: string
  email: string
  middle_name: string
  residence_country: string
}

interface Document {
  front_side: string
  back_side?: string
}

interface CompanyData {
  registration_country: string
  documents: Document[]
  companyName: string
  business_activity?: any
}

interface Verification {
  status: string
  verified: boolean
  applicant_id?: string
  request_id?: string
  type?: string
  verifications?: object
}

interface PersonVerifications {
  verification: Verification
  applicant?: PersonData
  formUrl?: string
  verification_id?: string
}

interface CompanyVerifications {
  verification: Verification
  data?: CompanyData
  formUrl?: string
  verification_id?: string
}

export interface User {
  userWalletAddress: string
  person: PersonVerifications
  company: CompanyVerifications
  _id: string
}

export enum VerificationStatus {
  unused = 'unused',
  completed = 'completed',
  pending = 'pending',
}
