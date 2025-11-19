import { Route, Routes } from "react-router";
import AuthRoute from "./auth/auth.route";

export default function AppRoute() {
    <div className="h-screen">
        <Routes>
            <Route path="/auth/*" element={<AuthRoute />} />
        </Routes>
    </div>
}