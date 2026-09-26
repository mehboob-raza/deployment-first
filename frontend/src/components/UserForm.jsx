import { useEffect, useState } from "react";


const initialForm = {
    name: "",
    email: "",
    age: ""
};


export default function UserForm({
    editingUser,
    onSubmit,
    onCancel
}) {

    const [form, setForm] =
        useState(initialForm);


    useEffect(() => {

        if (editingUser) {

            setForm({
                name: editingUser.name,
                email: editingUser.email,
                age: editingUser.age ?? ""
            });

        } else {

            setForm(initialForm);

        }

    }, [editingUser]);


    function handleChange(event) {

        const {
            name,
            value
        } = event.target;


        setForm(
            previous => ({
                ...previous,
                [name]: value
            })
        );

    }


    async function handleSubmit(event) {

        event.preventDefault();

        await onSubmit(form);

        if (!editingUser) {
            setForm(initialForm);
        }

    }


    return (
        <form
            className="user-form"
            onSubmit={handleSubmit}
        >

            <div className="field">

                <label>
                    Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                />

            </div>


            <div className="field">

                <label>
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                />

            </div>


            <div className="field">

                <label>
                    Age
                </label>

                <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="25"
                    min="0"
                    max="150"
                />

            </div>


            <div className="form-actions">

                <button type="submit">

                    {editingUser
                        ? "Update User"
                        : "Create User"}

                </button>


                {editingUser && (

                    <button
                        type="button"
                        className="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                )}

            </div>

        </form>
    );
}