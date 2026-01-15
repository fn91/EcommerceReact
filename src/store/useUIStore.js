import { create } from 'zustand';

export const useUIStore = create((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    closeSidebar: () => set({ isSidebarOpen: false }),
    isDarkMode: false,
    toggleDarkMode: () => {
        set((state) => {
            const newMode = !state.isDarkMode;
            if (newMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return { isDarkMode: newMode };
        });
    },
}));
