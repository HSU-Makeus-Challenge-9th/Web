import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/layout/Sidebar';
import LpList from '../components/lps/LpList';
import FloatingButton from '../components/common/FloatingButton';

const LpListPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleCreateLp = () => {
        // 추후 LP 생성 페이지로 이동 또는 모달 열기
        console.log("LP 생성 버튼 클릭");
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* 사이드바 */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            
            {/* 메인 콘텐츠 영역 */}
            <div className="flex flex-col">
                <Navbar onToggleSidebar={toggleSidebar} />
                
                {/* LP 목록 콘텐츠 */}
                <main className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto">
                        <LpList />
                    </div>
                </main>
                
                {/* 플로팅 + 버튼 */}
                <FloatingButton 
                    onClick={handleCreateLp}
                    variant="add"
                    ariaLabel="LP 생성"
                />
            </div>
        </div>
    );
};

export default LpListPage;