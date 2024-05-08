import { useState, useEffect } from 'react';

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('firstName'); 
    const [sortOrder, setSortOrder] = useState('asc'); 
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://dummy.restapiexample.com/api/v1/employees");
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setEmployees(data.data); 
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const sortedEmployees = [...employees].sort((a, b) => {
        if (sortBy === 'firstName' || sortBy === 'lastName') {
            const nameA = a.employee_name.split(' ')[0];
            const nameB = b.employee_name.split(' ')[0];
            return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        } else if (sortBy === 'salary') {
            return sortOrder === 'asc' ? a.employee_salary - b.employee_salary : b.employee_salary - a.employee_salary;
        } else if (sortBy === 'age') {
            return sortOrder === 'asc' ? a.employee_age - b.employee_age : b.employee_age - a.employee_age;
        }
    });

    const filteredEmployees = sortedEmployees.filter(employee =>
        employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-2xl text-center font-bold my-5 mb-4">Employee List</h1>
            <div className='flex justify-between mb-4'>
                <div className="form-control">
                    <input type="text" placeholder="Search by name" className="input input-bordered w-24 md:w-auto" onChange={handleSearch} />
                </div>
                <details className="dropdown">
                    <summary className="m-1 btn">Sort By</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li
                            className={`mr-2 ${sortBy === 'firstName' && 'bg-gray-300'}`}
                            onClick={() => handleSort('firstName')}
                        >
                            First Name
                        </li>
                        <li
                            className={`mr-2 ${sortBy === 'lastName' && 'bg-gray-300'}`}
                            onClick={() => handleSort('lastName')}
                        >
                            Last Name
                        </li>
                        <li
                            className={`mr-2 ${sortBy === 'salary' && 'bg-gray-300'}`}
                            onClick={() => handleSort('salary')}
                        >
                            Salary
                        </li>
                        <li
                            className={`mr-2 ${sortBy === 'age' && 'bg-gray-300'}`}
                            onClick={() => handleSort('age')}
                        >
                            Age
                        </li>
                    </ul>
                </details>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Salary</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.employee_name.split(' ')[0]}</td>
                                <td>{employee.employee_name.split(' ')[1]}</td>
                                <td>{employee.employee_salary}</td>
                                <td>{employee.employee_age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;
