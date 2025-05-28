// app/ui/dashboard/navbar.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Bell, ChevronDown, ChevronUp } from "lucide-react";
import Notification from "./notification";
import UserDropdown from "./user-dropdown";
import { User } from "@/app/lib/definitions";

type NotificationItem = {
  id: number;
  type: string;
  message: string;
  time: string;
  read: boolean;
};

export default function Navbar({ users }: { users: User[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage on first render
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications");
    const savedCount = localStorage.getItem("notificationCount");

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    if (savedCount) {
      setNotificationCount(Number(savedCount));
    }
  }, []);

  // Save to localStorage when notifications or count changes
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    localStorage.setItem("notificationCount", notificationCount.toString());
  }, [notifications, notificationCount]);

  // WebSocket connection with reconnection logic (same as before)
  useEffect(() => {
    function connect() {
      const socket = new WebSocket("wss://websocket-server-bevf.onrender.com");
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.onmessage = (event) => {
        const { type, data } = JSON.parse(event.data);

        if (type === "student_inserted") {
          const newNotification = {
            id: Date.now(),
            type: "Student Added",
            message: `${data.name} added to ${data.table}`,
            time: new Date().toLocaleTimeString(),
            read: false,
          };

          setNotifications((prev) => [newNotification, ...prev]);
          setNotificationCount((prev) => prev + 1);
        } else if (type === "ping") {
          socket.send(JSON.stringify({ type: "pong" }));
        }
      };

      socket.onclose = (event) => {
        console.log(`WebSocket closed: ${event.reason}`);
        reconnectTimeoutRef.current = setTimeout(connect, 5000);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        socket.close();
      };
    }

    connect();

    return () => {
      if (socketRef.current) socketRef.current.close();
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
    };
  }, []);

  // Toggle dropdown visibility & reset count when opening notifications
  const toggleNotification = () => {
    setIsNotificationOpen((open) => !open);

    if (!isNotificationOpen && notificationCount > 0) {
      setNotificationCount(0);
      markAllAsRead();
    }
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    setNotificationCount(0); // Reset the count
    localStorage.removeItem("notifications"); // Optional: Clear from localStorage
    localStorage.setItem("notificationCount", "0"); // Sync with localStorage
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <header className="flex w-full items-center justify-between px-4 py-2 bg-white border-b border-accent2">
      <div className="relative w-full flex items-center justify-between">
        <button
          onClick={toggleNotification}
          type="button"
          className="flex items-center gap-2 hover:bg-accent2 p-2 rounded-lg transition-all duration-200 ease-in-out cursor-pointer"
        >
          <Bell className="text-primary" />
          <span className="text-label text-primary font-medium">
            Notifications
          </span>
          {notificationCount > 0 && (
            <nav className="absolute size-8 top-0 left-32 text-cardBg bg-error p-2 rounded-full text-sm font-medium flex items-center justify-center">
              {notificationCount}
            </nav>
          )}
        </button>

        {isNotificationOpen && (
          <Notification
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}

        <div className="flex items-center gap-3 hover:bg-accent2 rounded-lg transition-all duration-200 ease-in-out p-2">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="flex items-center gap-2">
                <Image
                  src={user.imageurl || "/image-avatar.png"}
                  alt="Admin Avatar"
                  height={90}
                  width={90}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex gap-1.5 ">
                  <h2 className="text-label font-semibold text-primary">
                    {user.name}
                  </h2>
                  <p className="text-label text-gray-500">{user.role}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2">
              <Image
                src="/image-avatar.png"
                alt="Admin Avatar"
                height={80}
                width={80}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <h2 className="text-label font-semibold text-primary">
                  No users found
                </h2>
              </div>
            </div>
          )}

          {isOpen ? (
            <ChevronUp
              className="text-primary cursor-pointer"
              onClick={toggleDropdown}
            />
          ) : (
            <ChevronDown
              className="text-primary cursor-pointer"
              onClick={toggleDropdown}
            />
          )}

          {isOpen && <UserDropdown />}
        </div>
      </div>
    </header>
  );
}
