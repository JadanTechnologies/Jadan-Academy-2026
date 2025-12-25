
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from './types';

interface SystemState {
    globalFinancesLocked: boolean;
    forceGradeSync: boolean;
    emergencyLockdown: boolean;
    autoBackupEnabled: boolean;
    ghostMode: {
        isActive: boolean;
        targetBranchId: string | null;
    };
}

interface SystemContextType {
    state: SystemState;
    setGlobalFinancesLocked: (locked: boolean) => void;
    setForceGradeSync: (force: boolean) => void;
    setEmergencyLockdown: (lock: boolean) => void;
    setAutoBackupEnabled: (enabled: boolean) => void;
    enterGhostMode: (branchId: string) => void;
    exitGhostMode: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<SystemState>(() => {
        const saved = localStorage.getItem('system_state');
        return saved ? JSON.parse(saved) : {
            globalFinancesLocked: false,
            forceGradeSync: true,
            emergencyLockdown: false,
            autoBackupEnabled: true,
            ghostMode: {
                isActive: false,
                targetBranchId: null,
            },
        };
    });

    useEffect(() => {
        localStorage.setItem('system_state', JSON.stringify(state));
    }, [state]);

    const setGlobalFinancesLocked = (locked: boolean) =>
        setState(prev => ({ ...prev, globalFinancesLocked: locked }));

    const setForceGradeSync = (force: boolean) =>
        setState(prev => ({ ...prev, forceGradeSync: force }));

    const setEmergencyLockdown = (lock: boolean) =>
        setState(prev => ({ ...prev, emergencyLockdown: lock }));

    const setAutoBackupEnabled = (enabled: boolean) =>
        setState(prev => ({ ...prev, autoBackupEnabled: enabled }));

    const enterGhostMode = (branchId: string) =>
        setState(prev => ({ ...prev, ghostMode: { isActive: true, targetBranchId: branchId } }));

    const exitGhostMode = () =>
        setState(prev => ({ ...prev, ghostMode: { isActive: false, targetBranchId: null } }));

    return (
        <SystemContext.Provider value={{
            state,
            setGlobalFinancesLocked,
            setForceGradeSync,
            setEmergencyLockdown,
            setAutoBackupEnabled,
            enterGhostMode,
            exitGhostMode
        }}>
            {children}
        </SystemContext.Provider>
    );
};

export const useSystem = () => {
    const context = useContext(SystemContext);
    if (!context) {
        throw new Error('useSystem must be used within a SystemProvider');
    }
    return context;
};
