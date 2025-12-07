import { Route, Routes } from "react-router"
import { SignupForm } from "./components/SignupForm"
import { SigninForm } from "./components/SigninForm"
import { InternSigninForm } from "./components/InternSigninForm"

export default function AuthRoute() {
    return (
            <Routes>
                <Route path="/" element={<SigninForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/intern-signin" element={<InternSigninForm />} />
            </Routes>

    )
}