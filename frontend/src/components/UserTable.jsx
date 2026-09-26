export default function UserTable({
    users,
    loading,
    onEdit,
    onDelete
}) {

    if (loading) {
        return (
            <p className="empty">
                Loading users...
            </p>
        );
    }


    if (users.length === 0) {
        return (
            <p className="empty">
                No users found.
            </p>
        );
    }


    return (
        <div className="table-container">

            <table>

                <thead>

                    <tr>

                        <th>
                            ID
                        </th>

                        <th>
                            Name
                        </th>

                        <th>
                            Email
                        </th>

                        <th>
                            Age
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {users.map(user => (

                        <tr key={user.id}>

                            <td>
                                {user.id}
                            </td>

                            <td>
                                {user.name}
                            </td>

                            <td>
                                {user.email}
                            </td>

                            <td>
                                {user.age ?? "-"}
                            </td>

                            <td>

                                <div className="actions">

                                    <button
                                        onClick={() =>
                                            onEdit(user)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        className="danger"
                                        onClick={() =>
                                            onDelete(user.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}