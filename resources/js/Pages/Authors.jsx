import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Authors({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
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
                        <form className="w-full">
                            <div className="flex gap-2 w-full">
                                <input
                                    type="text"
                                    placeholder="Author Name"
                                    className="rounded-md flex-1"
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
