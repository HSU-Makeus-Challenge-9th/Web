
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/layout/Sidebar';
import FloatingButton from '../components/common/FloatingButton';
import LpList from '../components/lps/LpList';

const HomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // 데스크톱에서는 사이드바를 기본적으로 열어둠
    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth >= 768) { // md breakpoint
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleAddClick = () => {
        // 추후 LP 추가 기능 구현
        console.log("LP 추가 버튼 클릭");
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        // 모바일에서만 자동으로 닫힘, 데스크톱에서는 수동으로만 닫힘
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        } else {
            // 데스크톱에서는 명시적으로 닫기
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* 고정 네비바 */}
            <Navbar onToggleSidebar={toggleSidebar} />
            
            {/* 사이드바 */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            
            {/* 메인 콘텐츠 영역 */}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-0'}`}>
                <main className="flex-1 px-6 py-8 pt-24">
                    <div className="max-w-7xl mx-auto">

                        {/* LP 목록 섹션 */}
                        <LpList />
                    </div>
                </main>
                
                {/* 플로팅 + 버튼 */}
                <FloatingButton 
                    onClick={handleAddClick}
                    variant="add"
                    ariaLabel="LP 추가"
                />
            </div>
        </div>
    );
};

export default HomePage;

