function fetchPatientEnInfo(address patientAddr) public returns (string
 memory enInfo){

    if (medical_case_dict[patient_ethereum_address] == None):
        return "Failed to retrieve medical case."
    
    return medical_case_dict[patient_ethereum_address]

    
}
    
    contract Trade {
        /// The dictionary saves encrypted illness information of patients 
        mapping(address => string) cases;

        /// saveEnInfoIntoMap:
        /// The function of saving patients encrypted illness information

        function saveEnInfoIntoMap(address patientAddr,string memory encryptedInfo) public { 
            cases[patientAddr] = encryptedInfo;
        }

        function fetchPatientEnInfo(address patientAddr) public returns (string memory enInfo) { 
            return cases[patientAddr];

        }

} 

