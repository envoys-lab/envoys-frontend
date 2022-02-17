interface Verification {
  status: string
  verified: boolean
  applicant_id?: string
  request_id?: string
  type?: string
  verifications?: object
}

export interface User {
  userType: string
  userWalletAddress: string
  personVerification: Verification
  companyVerification: Verification
  personVerificationId: string
  companyVerificationId: string
  _id: string
}
