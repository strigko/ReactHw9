import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must contain at least 6 characters")
});

const registerSchema = z.object({
    firstName: z.string().min(2, "Name must contain at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must contain at least 6 characters")
});

const ProgrammingLanguage = {
    JavaScript: "JavaScript",
    TypeScript: "TypeScript",
    CSharp: "C#",
    Python: "Python"
} as const;

type ProgrammingLanguage =
    typeof ProgrammingLanguage[keyof typeof ProgrammingLanguage];

const developerSchema = z.object({
    name: z.string().min(2, "Name is required"),
    age: z.coerce.number().min(18, "Minimum age is 18").max(65, "Maximum age is 65"),
    language: z.nativeEnum(ProgrammingLanguage)
});

const reviewSchema = z.object({
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().min(5, "Comment must contain at least 5 characters").optional()
});

type Errors = Record<string, string>;

const ZodForms = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [registerData, setRegisterData] = useState({
        firstName: "",
        email: "",
        password: ""
    });

    const [developerData, setDeveloperData] = useState<{
        name: string;
        age: string;
        language: ProgrammingLanguage;
    }>({
        name: "",
        age: "",
        language: ProgrammingLanguage.JavaScript
    });

    const [reviewData, setReviewData] = useState({
        rating: "5",
        comment: ""
    });

    const [loginErrors, setLoginErrors] = useState<Errors>({});
    const [registerErrors, setRegisterErrors] = useState<Errors>({});
    const [developerErrors, setDeveloperErrors] = useState<Errors>({});
    const [reviewErrors, setReviewErrors] = useState<Errors>({});

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = loginSchema.safeParse(loginData);

        if (!result.success) {
            const errors: Errors = {};

            result.error.issues.forEach(issue => {
                errors[String(issue.path[0])] = issue.message;
            });

            setLoginErrors(errors);
            return;
        }

        setLoginErrors({});
        alert("Login form is valid!");
    };

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = registerSchema.safeParse(registerData);

        if (!result.success) {
            const errors: Errors = {};

            result.error.issues.forEach(issue => {
                errors[String(issue.path[0])] = issue.message;
            });

            setRegisterErrors(errors);
            return;
        }

        setRegisterErrors({});
        alert("Registration form is valid!");
    };

    const handleDeveloper = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = developerSchema.safeParse(developerData);

        if (!result.success) {
            const errors: Errors = {};

            result.error.issues.forEach(issue => {
                errors[String(issue.path[0])] = issue.message;
            });

            setDeveloperErrors(errors);
            return;
        }

        setDeveloperErrors({});
        alert("Developer profile is valid!");
    };

    const handleReview = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = reviewSchema.safeParse(reviewData);

        if (!result.success) {
            const errors: Errors = {};

            result.error.issues.forEach(issue => {
                errors[String(issue.path[0])] = issue.message;
            });

            setReviewErrors(errors);
            return;
        }

        setReviewErrors({});
        alert("Review form is valid!");
    };

    return (
        <div className="flex flex-col gap-8 p-6">
            <form onSubmit={handleLogin} className="card flex flex-col gap-3">
                <h2 className="text-xl font-bold">Login</h2>

                <input
                    className="input input-bordered"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={event => {
                        setLoginData({ ...loginData, email: event.target.value });
                        setLoginErrors({ ...loginErrors, email: "" });
                    }}
                />
                {loginErrors.email && <p className="text-red-500">{loginErrors.email}</p>}

                <input
                    className="input input-bordered"
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={event => {
                        setLoginData({ ...loginData, password: event.target.value });
                        setLoginErrors({ ...loginErrors, password: "" });
                    }}
                />
                {loginErrors.password && <p className="text-red-500">{loginErrors.password}</p>}

                <button className="btn btn-primary" type="submit">Login</button>
            </form>

            <form onSubmit={handleRegister} className="card flex flex-col gap-3">
                <h2 className="text-xl font-bold">Registration</h2>

                <input
                    className="input input-bordered"
                    placeholder="Name"
                    value={registerData.firstName}
                    onChange={event => {
                        setRegisterData({ ...registerData, firstName: event.target.value });
                        setRegisterErrors({ ...registerErrors, firstName: "" });
                    }}
                />
                {registerErrors.firstName && <p className="text-red-500">{registerErrors.firstName}</p>}

                <input
                    className="input input-bordered"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={event => {
                        setRegisterData({ ...registerData, email: event.target.value });
                        setRegisterErrors({ ...registerErrors, email: "" });
                    }}
                />
                {registerErrors.email && <p className="text-red-500">{registerErrors.email}</p>}

                <input
                    className="input input-bordered"
                    type="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={event => {
                        setRegisterData({ ...registerData, password: event.target.value });
                        setRegisterErrors({ ...registerErrors, password: "" });
                    }}
                />
                {registerErrors.password && <p className="text-red-500">{registerErrors.password}</p>}

                <button className="btn btn-primary" type="submit">Register</button>
            </form>

            <form onSubmit={handleDeveloper} className="card flex flex-col gap-3">
                <h2 className="text-xl font-bold">Developer Profile</h2>

                <input
                    className="input input-bordered"
                    placeholder="Name"
                    value={developerData.name}
                    onChange={event => {
                        setDeveloperData({ ...developerData, name: event.target.value });
                        setDeveloperErrors({ ...developerErrors, name: "" });
                    }}
                />
                {developerErrors.name && <p className="text-red-500">{developerErrors.name}</p>}

                <input
                    className="input input-bordered"
                    type="number"
                    placeholder="Age"
                    value={developerData.age}
                    onChange={event => {
                        setDeveloperData({ ...developerData, age: event.target.value });
                        setDeveloperErrors({ ...developerErrors, age: "" });
                    }}
                />
                {developerErrors.age && <p className="text-red-500">{developerErrors.age}</p>}

                <select
                    className="select select-bordered"
                    value={developerData.language}
                    onChange={event => {
                        setDeveloperData({
                            ...developerData,
                            language: event.target.value as ProgrammingLanguage
                        });
                        setDeveloperErrors({ ...developerErrors, language: "" });
                    }}
                >
                    {Object.values(ProgrammingLanguage).map(language => (
                        <option key={language} value={language}>{language}</option>
                    ))}
                </select>
                {developerErrors.language && <p className="text-red-500">{developerErrors.language}</p>}

                <button className="btn btn-primary" type="submit">Save Profile</button>
            </form>

            <form onSubmit={handleReview} className="card flex flex-col gap-3">
                <h2 className="text-xl font-bold">Review</h2>

                <select
                    className="select select-bordered"
                    value={reviewData.rating}
                    onChange={event => {
                        setReviewData({ ...reviewData, rating: event.target.value });
                        setReviewErrors({ ...reviewErrors, rating: "" });
                    }}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                {reviewErrors.rating && <p className="text-red-500">{reviewErrors.rating}</p>}

                <textarea
                    className="textarea textarea-bordered"
                    placeholder="Comment (optional)"
                    value={reviewData.comment}
                    onChange={event => {
                        setReviewData({ ...reviewData, comment: event.target.value });
                        setReviewErrors({ ...reviewErrors, comment: "" });
                    }}
                />
                {reviewErrors.comment && <p className="text-red-500">{reviewErrors.comment}</p>}

                <button className="btn btn-primary" type="submit">Send Review</button>
            </form>
        </div>
    );
};

export default ZodForms;
