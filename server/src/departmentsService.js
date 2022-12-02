const departmentsData = require('./data/departments.js');

function getAll() {
    return departmentsData.slice();
}

function getById(id) {
    for (const department of departmentsData) {
        if (department.id === id) {
            return department;
        }
    }

    return null;
}

module.exports.getAll = getAll;
module.exports.getById = getById;