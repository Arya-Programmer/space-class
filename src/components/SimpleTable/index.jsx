import { useState } from "react";

import sampleData from "../../sample-data.js";


import "./simple-table.css";


const SimpleTable = () => {
    const [showAddForm, setShowAddForm] = useState(false);



    return (
        <div className="users-table-container">
            {/* Table title part */}
            <div className="table-header">
                <h2>Users Management</h2>
                <div className="table-controls">
                    <input
                        type="text"
                        placeholder="Search"
                        value={""}
                        onChange={null}
                        className="search-input"
                    />
                    <button onClick={() => setShowAddForm(prev => !prev)} className="btn btn-primary">
                        Add User
                    </button>
                </div>
            </div>

            {showAddForm === true &&
                <div className="add-user-form">
                    <h3>Add New User</h3>
                    <form onSubmit={handleUserForm}>
                        <div className="form-row">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                className="form-input"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                className="form-input"
                                required
                            />
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                className="form-select"
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Moderator">Moderator</option>
                            </select>
                        </div>
                    </form>
                </div>
            }

            {/* Table headers */}
            <div className="table-wrapper">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th className="sortable">Name</th>
                            <th className="sortable">Email</th>
                            <th className="sortable">Role</th>
                            <th className="sortable">Status</th>
                            <th className="sortable">Last Login</th>
                            <th className="sortable">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleData.map(user =>
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                                <td>{user.lastLogin}</td>
                                <td>Delete</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {sampleData.length === 0 &&
                    <div className="empty-state">
                        <p>No users were found</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default SimpleTable;

