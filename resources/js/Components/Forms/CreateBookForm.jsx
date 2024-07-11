import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CreateBookForm({ authors }) {
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const { data, setData, reset } = useForm({
        title: "",
        published: "",
        publisher: "",
        isbn_13: "",
        isbn_10: "",
        authors: [],
    });

    const handleAddBook = (e) => {
        e.preventDefault();
        console.log(data);
        data.authors = selectedAuthors.map((a) => a.id);
        axios.post("/api/books", data, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleInputOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleAuthorSelect = (e) => {
        let a = authors.find(
            (author) => author.id.toString() == e.target.value
        );
        if (
            selectedAuthors.findIndex(
                (su) => su.id.toString() === e.target.value
            ) === -1
        )
            setSelectedAuthors([...selectedAuthors, a]);
    };

    const handleRemoveAuthor = (id) => {
        setSelectedAuthors(selectedAuthors.filter((a) => a.id !== id));
    };

    return (
        <form className="w-full" onSubmit={handleAddBook}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 w-full">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="title">Book Title</label>
                        <input
                            name="title"
                            type="text"
                            placeholder="Book Title"
                            className="rounded-md"
                            onChange={handleInputOnChange}
                            value={data.title}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="date_published">Date Published</label>
                        <input
                            name="published"
                            type="date"
                            onChange={handleInputOnChange}
                            value={data.published}
                            className="rounded-md"
                        />
                    </div>
                </div>
                <div className="flex gap-2 w-full">
                    <div className="flex flex-col flex-1">
                        <label htmlFor="publisher">Publisher</label>
                        <input
                            name="publisher"
                            type="text"
                            className="rounded-md"
                            onChange={handleInputOnChange}
                            value={data.publisher}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="isbn_13">ISBN 13</label>
                        <input
                            name="isbn_13"
                            type="text"
                            onChange={handleInputOnChange}
                            className="rounded-md"
                            value={data.isbn_13}
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="isbn_10">ISBN 10</label>
                        <input
                            name="isbn_10"
                            type="text"
                            className="rounded-md"
                            onChange={handleInputOnChange}
                            value={data.isbn_10}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="author">Authors</label>
                        {selectedAuthors.map((a) => (
                            <div className="flex gap-3 mb-2" key={a.id}>
                                <p>{a.name}</p>
                                <button
                                    onClick={() => handleRemoveAuthor(a.id)}
                                    className="px-2 text-sm bg-red-500 text-white rounded-md"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <select
                            name="author"
                            className="rounded-md"
                            onChange={handleAuthorSelect}
                        >
                            {authors.map((author, index) => {
                                return (
                                    <option
                                        name={author.name}
                                        value={author.id}
                                        key={author.id}
                                    >
                                        {author.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 rounded-md px-5 py-2 text-white"
                >
                    Add
                </button>
            </div>
        </form>
    );
}
