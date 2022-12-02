const baseUrl = 'http://localhost:3000';

export function getContactsFromApi() {
    const relUrl = '/api/contacts/all';

    return fetch(new URL(relUrl, baseUrl))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            alert('There was some error getting data from the service')
            return Promise.reject('There was some error getting data from the service')
        });
}


export function getContactByIdFromApi(contactId) {
    const fullUrl = new URL('/api/contacts', baseUrl);
    fullUrl.searchParams.append('id', contactId);

    return fetch(fullUrl).then((response) => response.json());
}

export function postContactToApi( name, phone, email, address, departmentId ) {
    const relUrl = '/api/contacts';

    return fetch(new URL(relUrl, baseUrl),
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email,
                address: address,
                departmentId: departmentId
            })
        }).then(response => {
            if (response.ok) {
                
            } else {
                alert('Did not save contact correctly!')
                return Promise.reject(new Error('Did not save contact correctly!'));
            }
        });
}

export function updateContactToApi(contactToUpdate) {
    const { id, name, phone, email, address, departmentId } = contactToUpdate;

    const fullUrl = new URL('/api/contacts', baseUrl);

    return fetch(fullUrl, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            name: name,
            phone: phone,
            email: email,
            address: address,
            departmentId: departmentId
        })
    }).then(response => {
        if (response.ok) {

        } else {
            alert('Did not save contact correctly!');
            return Promise.reject(new Error('Did not save contact correctly!'));
        }
    });
}

export async function getDepartmentsFromApi() {
    const fullUrl = new URL('/api/departments', baseUrl);

    const response = await fetch(fullUrl);

    return response.json();
}

