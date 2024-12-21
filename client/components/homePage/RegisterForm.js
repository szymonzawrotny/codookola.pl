'use client';
import { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

import { IoPersonCircleOutline } from "react-icons/io5";
import { FaUnlockAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

const RegisterForm = () => {
    const recaptchaRef = useRef();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");
    
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    const onCaptchaChange = (token) => {
        if (token) setCaptchaToken(token);
    };

    const validateFields = () => {
        let hasErrors = false;
        const newErrors = {
            name: "",
            email: "",
            password: ""
        };

        if (name.trim() === "") {
            newErrors.name = "Imię nie może być puste.";
            hasErrors = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = "Podaj poprawny adres email.";
            hasErrors = true;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            newErrors.password = "Hasło musi mieć co najmniej 6 znaków, w tym małą i dużą literę, cyfrę oraz znak specjalny.";
            hasErrors = true;
        }

        setErrors(newErrors);
        return !hasErrors;
    };

    const handleFormSend = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        recaptchaRef.current.execute();

        const response = await fetch("http://localhost:5000/reg", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                pass: password,
                captchaToken
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            document.querySelector(".loginAlert").classList.remove("hidden");
            setName("");
            setEmail("");
            setPassword("");
            setCaptchaToken("");
            setErrors({});

            setTimeout(()=>{
                document.querySelector(".loginAlert").classList.add("hidden");
            },3000)
        } else {
            alert("Wystąpił błąd podczas rejestracji.");
        }
    };

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    useEffect(() => {
        recaptchaRef.current.execute();
    }, []);

    return (
        <form onSubmit={handleFormSend} className="register">
            <div className={`input ${errors.name ? "error" : ""}`}>
                <MdDriveFileRenameOutline size={34} style={{ color: "#222", marginLeft: "8px" }} />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    placeholder="Imię"
                />
                {errors.name && <div className="errorText">{errors.name}</div>}
            </div>

            <div className={`input ${errors.email ? "error" : ""}`}>
                <IoPersonCircleOutline size={42} style={{ color: "#222" }} />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder="Email"
                />
                {errors.email && <div className="errorText">{errors.email}</div>}
            </div>

            <div className={`input ${errors.password ? "error" : ""}`}>
                <FaUnlockAlt size={34} style={{ color: "#222", marginLeft: "8px" }} />
                <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    placeholder="Hasło"
                />
                {errors.password && <div className="errorText">{errors.password}</div>}
                {passwordVisible ? (
                    <FaEyeSlash size={36} onClick={togglePasswordVisibility} style={{ cursor: "pointer" }} />
                ) : (
                    <FaEye size={36} onClick={togglePasswordVisibility} style={{ cursor: "pointer" }} />
                )}
            </div>

            <div className="down">
                <div className="captchaBox">
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_CAPTCHA}
                        ref={recaptchaRef}
                        size="invisible"
                        onChange={onCaptchaChange}
                    />
                </div>
                <input type="submit" value="NEXT" />
            </div>
        </form>
    );
};

export default RegisterForm;