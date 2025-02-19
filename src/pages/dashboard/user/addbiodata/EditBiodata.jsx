import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import Swal from "sweetalert2";
import Loading from "../../../../shared/loading/Loading";

const EditBiodata = () => {
    useEffect(() => {
        document.title = "Dashboard | EditData";
    }, []);

    const { user } = useContext(AuthContext);
    const [biodata, setBiodata] = useState({
        biodataType: "",
        name: "",
        profileImage: "",
        dob: "",
        height: "",
        weight: "",
        age: "",
        occupation: "",
        race: "",
        fathersName: "",
        mothersName: "",
        permanentDivision: "",
        presentDivision: "",
        expectedPartnerAge: "",
        expectedPartnerHeight: "",
        expectedPartnerWeight: "",
        contactEmail: user?.email || "",
        mobileNumber: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    const divisions = ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];
    const heights = ["5'0\"", "5'2\"", "5'4\"", "5'6\"", "5'8\"", "6'0\"", "6'2\"", "6'4\""];
    const weights = ["50kg", "53kg", "56kg", "58kg", "60kg", "65kg", "70kg", "76kg", "80kg", "90kg"];
    const occupations = ["Student", "Engineer", "Doctor", "Business", "Teacher", "Other"];
    const races = ["Light", "Medium", "Dark"];

    useEffect(() => {
        const fetchBiodata = async () => {
            const res = await axios.get(`https://griho-bandhan-server.vercel.app/biodata/${user?.email}`);
            if (res.data) {
                setBiodata(res.data);
                setIsEditing(true);
            } else {
                setIsEditing(false);
            }
        };

        if (user?.email) {
            fetchBiodata();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBiodata((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userAge = Number(new Date().getFullYear() - biodata.dob.slice(0, 4));
        const biodataType = biodata.biodataType;

        if (biodataType === "Male" && userAge < 21) {
            return Swal.fire("Error", "Male age must be at least 21 years.", "error");
        }
        if (biodataType === "Female" && userAge < 18) {
            return Swal.fire("Error", "Female age must be at least 18 years.", "error");
        }

        const payload = {
            ...biodata,
            age: userAge,
            isPremium: false,
            isMarried: false,
        };

        try {
            const res = await axios.post(`https://griho-bandhan-server.vercel.app/biodata`, payload);
            Swal.fire("Success", res.data.message, "success");
        } catch (error) {
            Swal.fire("Error", "Something went wrong while saving your biodata.", "error");
        }
    };

    if (!biodata) {
        return <Loading />;
    }

    return (
        <div className="mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">
                {isEditing ? "Edit Biodata" : "Create Biodata"}
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <fieldset className="col-span-2 border p-4 rounded-md">
                    <legend className="font-bold">Personal Information</legend>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Biodata Type */}
                        <div>
                            <label className="block text-sm font-medium">Biodata Type</label>
                            <select
                                name="biodataType"
                                value={biodata.biodataType}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={biodata.name}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* Profile Image */}
                        <div>
                            <label className="block text-sm font-medium">Profile Image</label>
                            <input
                                type="url"
                                name="profileImage"
                                value={biodata.profileImage}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                placeholder="Image URL"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={biodata.dob}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* Height */}
                        <div>
                            <label className="block text-sm font-medium">Height</label>
                            <select
                                name="height"
                                value={biodata.height}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                {heights.map((h) => (
                                    <option key={h} value={h}>
                                        {h}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Weight */}
                        <div>
                            <label className="block text-sm font-medium">Weight</label>
                            <select
                                name="weight"
                                value={biodata.weight}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                {weights.map((w) => (
                                    <option key={w} value={w}>
                                        {w}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Occupation */}
                        <div>
                            <label className="block text-sm font-medium">Occupation</label>
                            <select
                                name="occupation"
                                value={biodata.occupation}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                {occupations.map((o) => (
                                    <option key={o} value={o}>
                                        {o}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Race */}
                        <div>
                            <label className="block text-sm font-medium">Race</label>
                            <select
                                name="race"
                                value={biodata.race}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                {races.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Parents' Names */}
                        <div>
                            <label className="block text-sm font-medium">Fathers Name</label>
                            <input
                                type="text"
                                name="fathersName"
                                value={biodata.fathersName}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Mothers Name</label>
                            <input
                                type="text"
                                name="mothersName"
                                value={biodata.mothersName}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* Divisions */}
                        <div>
                            <label className="block text-sm font-medium">Permanent Division</label>
                            <select
                                name="permanentDivision"
                                value={biodata.permanentDivision}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                {divisions.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Present Division</label>
                            <select
                                name="presentDivision"
                                value={biodata.presentDivision}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                {divisions.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                </fieldset>

                <fieldset className="col-span-2 border p-4 rounded-md">
                    <legend className="font-bold">Expected Partner Information</legend>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Expected Partner Details */}
                        <div>
                            <label className="block text-sm font-medium">Expected Partner Age</label>
                            <input
                                type="number"
                                name="expectedPartnerAge"
                                value={biodata.expectedPartnerAge}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Expected Partner Height</label>
                            <select
                                name="expectedPartnerHeight"
                                value={biodata.expectedPartnerHeight}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                {heights.map((h) => (
                                    <option key={h} value={h}>
                                        {h}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Expected Partner Weight</label>
                            <select
                                name="expectedPartnerWeight"
                                value={biodata.expectedPartnerWeight}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            >
                                <option value="">Select</option>
                                {weights.map((w) => (
                                    <option key={w} value={w}>
                                        {w}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="col-span-2 border p-4 rounded-md">
                    <legend className="font-bold">Contact Information</legend>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Mobile Number */}
                        <div>
                            <label className="block text-sm font-medium">Mobile Number</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                value={biodata.mobileNumber}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border rounded-md"
                                required
                            />
                        </div>

                        {/* Contact Email (Readonly) */}
                        <div>
                            <label className="block text-sm font-medium">Contact Email</label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={biodata.contactEmail}
                                readOnly
                                className="w-full mt-1 p-2 border rounded-md bg-gray-100"
                            />
                        </div>
                    </div>
                </fieldset>

                <div className="col-span-2">
                    <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                        {isEditing ? "Update Biodata" : "Save and Publish Now"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBiodata;
