const getCanReceiveFrom = (bloodType) => {
    switch (bloodType) {
        case 'A+':
            return ['A+', 'A-', 'O+', 'O-'];
        case 'A-':
            return ['A-', 'O-'];
        case 'B+':
            return ['B+', 'B-', 'O+', 'O-'];
        case 'B-':
            return ['B-', 'O-'];
        case 'AB+':
            return ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        case 'AB-':
            return ['A-', 'B-', 'AB-', 'O-'];
        case 'O+':
            return ['O+', 'O-'];
        case 'O-':
            return ['O-'];
        default:
            return [];
    }
};

module.exports = { getCanReceiveFrom }