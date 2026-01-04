"use client";

import { LayoutDashboard, History, Sparkles, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SignOutButton } from "@clerk/nextjs";

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: History, label: 'History', path: '/history' },
];

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 p-6 border-b" onClick={onNavigate}>
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">FormulaGenie</span>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={onNavigate}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t">
                <SignOutButton>
                    <Button
                        variant="ghost"
                        className="flex items-center justify-start gap-3 px-4 py-3 rounded-lg w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </Button>
                </SignOutButton>
            </div>
        </div>
    );
};

export const AppSidebar: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-card border-r flex-col h-screen sticky top-0">
                <SidebarContent />
            </aside>

            {/* Mobile Header with Sheet */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b flex items-center px-4">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SidebarContent onNavigate={() => setOpen(false)} />
                    </SheetContent>
                </Sheet>
                <Link href="/" className="flex items-center gap-2 ml-3">
                    <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span className="font-bold">FormulaGenie</span>
                </Link>
            </div>
        </>
    );
};
