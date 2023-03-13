import { lazy, Suspense } from "react"
import {
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import("../screens/Home/HomePage"));
const MapPage = lazy(() => import("../screens/Map/MapPage"));

function RouterControl() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>carregando...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default RouterControl;
