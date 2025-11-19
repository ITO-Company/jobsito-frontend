import { Route, Routes } from "react-router";
import { SignupForm } from "./components/SignupForm";
import { SigninForm } from "./components/SigninForm";

export default function AuthRoute() {
    return (
            <Routes>
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/signin" element={<SigninForm />} />
            </Routes>

    )
}