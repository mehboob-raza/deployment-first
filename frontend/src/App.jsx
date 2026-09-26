import {
  useEffect,
  useState
} from "react";


import UserForm
  from "./components/UserForm";


import UserTable
  from "./components/UserTable";


import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "./api";


export default function App() {

  const [
    users,
    setUsers
  ] = useState([]);


  const [
    editingUser,
    setEditingUser
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState("");


  const [
    message,
    setMessage
  ] = useState("");


  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      const response = await getUsers();

      setUsers(response.data);
    } catch (error) {
      console.error("Load users error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {

    loadUsers();

  }, []);


  async function handleSubmit(form) {

    try {

      setError("");

      setMessage("");


      if (editingUser) {

        await updateUser(
          editingUser.id,
          form
        );

        setMessage(
          "User updated successfully."
        );

        setEditingUser(null);

      } else {

        await createUser(form);

        setMessage(
          "User created successfully."
        );

      }


      await loadUsers();

    } catch (error) {

      setError(
        error.message
      );

    }
  }


  async function handleDelete(id) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this user?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setError("");

      setMessage("");


      await deleteUser(id);


      setMessage(
        "User deleted successfully."
      );


      await loadUsers();

    } catch (error) {

      setError(
        error.message
      );

    }
  }


  function handleEdit(user) {

    setEditingUser(user);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  function handleCancel() {

    setEditingUser(null);

  }


  return (

    <div className="app">

      <header className="header">

        <div>

          <h1>
            PERN Users
          </h1>

          <p>
            PostgreSQL · Express · React · Node.js
          </p>

        </div>

      </header>


      <main className="container">

        <section className="card">

          <h2>

            {editingUser
              ? "Edit User"
              : "Create User"}

          </h2>


          <UserForm
            editingUser={editingUser}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />

        </section>


        {error && (

          <div className="alert error">
            {error}
          </div>

        )}


        {message && (

          <div className="alert success">
            {message}
          </div>

        )}


        <section className="card">

          <div className="section-header">

            <h2>
              All Users
            </h2>


            <button
              className="secondary"
              onClick={loadUsers}
            >
              Refresh
            </button>

          </div>


          <UserTable
            users={users}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </section>

      </main>

    </div>
  );
}