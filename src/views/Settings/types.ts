interface PersonData {
  documents: any
  first_name: string
  last_name: string
  middle_name: string
  residence_country: string
}

interface CompanyData {
  registration_country: string
  documents: any
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
  data?: PersonData
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
