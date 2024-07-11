import { useState } from "react";
import Modal from "../Modal";

export default function BookItem({ book }) {
    const handleDeleteBook = (id) => {
        axios.delete(`/books/${id}`);
    };

    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div key={book.id} className="p-4 rounded bg-black/5 w-[600px]">
            <h4 className="text-xl font-bold text-center">{book.title}</h4>
            <div className="flex flex-col">
                <div className="flex gap-2">
                    <span className="text-end flex-1 text-black/50">
                        Author:{" "}
                    </span>
                    <span className="text-start flex-1 text-nowrap">
                        {book.authors[0]?.name}
                    </span>
                </div>
                <div className="flex gap-2">
                    <span className="text-end flex-1 text-nowrap text-black/50">
                        Publshed:{" "}
                    </span>
                    <span className="text-start flex-1 text-nowrap">
                        {book.published}
                    </span>
                </div>
                <div className="flex gap-2">
                    <span className="text-end flex-1 text-nowrap text-black/50">
                        ISBN 13:{" "}
                    </span>
                    <span className="text-start flex-1 text-nowrap">
                        {book.isbn_13}
                    </span>
                </div>
                <div className="flex gap-2">
                    <span className="text-end flex-1 text-nowrap text-black/50">
                        ISBN 10:{" "}
                    </span>
                    <span className="text-start flex-1 text-nowrap">
                        {book.isbn_10}
                    </span>
                </div>
            </div>
            <div className="flex justify-center mt-2 gap-2">
                <button
                    className="px-2 py-2 bg-yellow-500 text-white rounded-md text-sm"
                    onClick={() => handleEditBook(book.id)}
                >
                    Edit
                </button>
                <button
                    className="px-2 py-2 bg-red-500 text-white rounded-md text-sm"
                    onClick={() => handleDeleteBook(book.id)}
                >
                    Delete
                </button>
            </div>
            {/* <Modal show={showEditModal} onClose={closeModal}></Modal> */}
        </div>
    );
}
