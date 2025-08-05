import React from "react";

import sampleData from "../../sample-data.js";


import "./simple-table.css";


const SimpleTable = () => {
    return (
        <div className="users-table-container">
            {/* Table title part */}
            <div className="table-header">
                <h2>Users Management</h2>
                <div className="table-controls">

                </div>
            </div>

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

