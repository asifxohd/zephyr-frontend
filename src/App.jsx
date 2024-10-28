import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Starting from './pages/Common/Starting';

const BusinessRoutes = lazy(()=> import("./routes/BusinessRoutes"))
const InvestorRoutes = lazy(()=> import("./routes/InvestorRoutes"))
const AdminRoutes = lazy(()=> import("./routes/AdminRoutes"))

function App() {
	return (
		<>
			<BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Starting />} />
                        <Route path="business/*" element={<BusinessRoutes />} />
                        <Route path="investor/*" element={<InvestorRoutes />} />
                        <Route path="admin/*" element={<AdminRoutes />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
		</>
	);
}

export default App;
