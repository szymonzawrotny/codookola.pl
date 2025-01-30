'use client';
import { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaUnlockAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
    const recaptchaRef = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        passwordRepeat: ""
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisibleRepeat, setPasswordVisibleRepeat] = useState(false);

    const onCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const validateFields = () => {
        let hasErrors = false;
        const newErrors = {
            email: "",
            password: "",
            passwordRepeat: ""
        };

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

        if (password !== passwordRepeat) {
            newErrors.passwordRepeat = "Hasła nie są identyczne.";
            hasErrors = true;
        }

        setErrors(newErrors);
        return !hasErrors;
    };

    const handleFormSend = async (e) => {
        e.preventDefault();
        recaptchaRef.current.execute();

        if (!validateFields()) {
            return;
        }

        if (!captchaToken) {
            alert("CAPTCHA nie została jeszcze wygenerowana. Spróbuj ponownie.");
            return;
        }

        const response = await fetch("http://localhost:5000/reg", {
            method: "POST",
            body: JSON.stringify({
                email,
                pass: password,
                captchaToken
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            setEmail("");
            setPassword("");
            setPasswordRepeat("");
            setCaptchaToken("");
            setErrors({});

            const data = await response.json();
            alert("Rejestracja zakończona sukcesem.");
        } else {
            const data = await response.json();
            alert("Wystąpił błąd podczas rejestracji.");
        }
    };

    useEffect(() => {
        recaptchaRef.current.execute();
    }, [email]);

    return (
        <form onSubmit={handleFormSend} className="register">
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
                <span onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <FaEyeSlash size={36} /> : <FaEye size={36} />}
                </span>
            </div>

            <div className={`input ${errors.passwordRepeat ? "error" : ""}`}>
                <FaUnlockAlt size={34} style={{ color: "#222", marginLeft: "8px" }} />
                <input
                    type={passwordVisibleRepeat ? "text" : "password"}
                    value={passwordRepeat}
                    onChange={(e) => {
                        setPasswordRepeat(e.target.value);
                        setErrors((prev) => ({ ...prev, passwordRepeat: "" }));
                    }}
                    placeholder="Powtórz hasło"
                />
                {errors.passwordRepeat && <div className="errorText">{errors.passwordRepeat}</div>}
                <span onClick={() => setPasswordVisibleRepeat(!passwordVisibleRepeat)}>
                    {passwordVisibleRepeat ? <FaEyeSlash size={36} /> : <FaEye size={36} />}
                </span>
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
                <input type="submit" value="DALEJ" />
            </div>
        </form>
    );
};

export default RegisterForm;
