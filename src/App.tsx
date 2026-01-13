import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home/Home";

// Root application component
// 앱 전체를 감싸는 루트 컴포넌트
function App() {
    const queryClient = new QueryClient();

    return (
        // React Query provider for global cache
        // 전역 쿼리 캐시를 제공하는 Provider
        <QueryClientProvider client={queryClient}>
            {/* Route container(라우트 컨테이너) */}
            <Routes>
                {/* Catch-all route(모든 경로 처리) */}
                <Route path="*" element={<Home />} />

                {/* Dynamic route with id parameter(id 파라미터를 받는 동적 라우트) */}
                <Route path="/:id" element={<Home />} />
            </Routes>
        </QueryClientProvider>
    );
}

export default App;
