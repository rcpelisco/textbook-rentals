import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";

export default function Authors({ authors }) {
    const { data, setData, reset } = useForm({ name: "" });

    const handleAddAuthor = (e) => {
        e.preventDefault();

        router.post("/api/authors", data, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleAuthorInputOnChange = (e) => {
        setData({ name: e.target.value });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Authors
                </h2>
            }
        >
            <Head title="Authors" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div>
                        <form className="w-full" onSubmit={handleAddAuthor}>
                            <div className="flex gap-2 w-full">
                                <input
                                    type="text"
                                    placeholder="Author Name"
                                    className="rounded-md flex-1"
                                    onChange={handleAuthorInputOnChange}
                                    value={data.name}
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 rounded-md px-5 text-white"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
                        <div className="p-6 text-gray-900">Authors</div>
                        {authors.data.map((author, index) => (
                            <p key={author.id}>{author.name}</p>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
