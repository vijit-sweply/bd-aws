const getCanDonateTo = (bloodType) => {
    switch (bloodType) {
        case 'A-':
            return ['A-', 'A+', 'AB-', 'AB+'];
        case 'A+':
            return ['A+', 'AB+'];
        case 'B-':
            return ['B-', 'B+', 'AB-', 'AB+'];
        case 'B+':
            return ['B+', 'AB+'];
        case 'AB-':
            return ['AB-', 'AB+'];
        case 'AB+':
            return ['AB+'];
        case 'O-':
            return ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
        case 'O+':
            return ['O+', 'A+', 'B+', 'AB+'];
        default:
            return [];
    }
};
module.exports = { getCanDonateTo }