import BookItem from "@/Components/Books/BookItem";
import CreateBookForm from "@/Components/Forms/CreateBookForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Books({ authors }) {
    const [books, setBooks] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [newlyAddedbooks, setNewlyAddedBooks] = useState([]);

    axios.get(`/books`).then(({ data }) => {
        setBooks(data.data);
    });

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
        data.authors = selectedAuthors.map((a) => a.id);
        axios.post("/books", data).then((res) => setBooks([data, ...books]));
        // router.post("/api/books", data, {
        //     onSuccess: () => {
        //         reset();
        //     },
        // });
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
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Books
                </h2>
            }
        >
            <Head title="Books" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                    <label htmlFor="date_published">
                                        Date Published
                                    </label>
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
                                        <div
                                            className="flex gap-3 mb-2"
                                            key={a.id}
                                        >
                                            <p>{a.name}</p>
                                            <button
                                                onClick={() =>
                                                    handleRemoveAuthor(a.id)
                                                }
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
                        <div className="p-6 text-gray-900">
                            <h2 className="font-bold text-2xl">Books</h2>
                            <hr className="my-2" />
                            <div className="flex gap-4 flex-col items-center">
                                {books.map((book, index) => (
                                    <BookItem book={book} key={book.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
