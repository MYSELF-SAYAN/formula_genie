"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        const syncUser = async () => {
            if (!isLoaded || !user) return;

            try {
                await fetch("/api/auth/sync", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: user.id,
                        email: user.primaryEmailAddress?.emailAddress,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        imageUrl: user.imageUrl,
                    }),
                });

                router.push("/dashboard");
            } catch (error) {
                console.error("Error syncing user:", error);
                // Optionally redirect to an error page or still dashboard
                router.push("/dashboard");
            }
        };

        syncUser();
    }, [user, isLoaded, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-pulse text-lg font-semibold">
                Setting up your workspace...
            </div>
        </div>
    );
}
