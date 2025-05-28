// app/ui/dashboard/notification.tsx
"use client";

type NotificationItem = {
  id: number;
  type: string;
  message: string;
  time: string;
  read: boolean;
};

export default function Notification({
  notifications,
  setNotifications,
}: {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
}) {
  // Mark all as read handler comes from Navbar or defined here
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    setNotifications([]); // Clear all notifications
    //setNotificationCount(0); // Reset the count
    localStorage.removeItem("notifications"); // Optional: Clear from localStorage
    localStorage.setItem("notificationCount", "0"); // Sync with localStorage
  };

  return (
    <div className="absolute left-3 top-14 w-[355px] rounded-lg bg-cardBg border-b border-notification-hovered shadow-lg p-2">
      <div className="w-full flex justify-between items-center py-4">
        <div>
          <h2 className="p-text font-medium text-primary"> Notifications</h2>
        </div>
        <div>
          <button
            className="label-text text-secondary cursor-pointer hover:text-primary transition-all duration-200 ease-in-out"
            type="button"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 max-h-60 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="w-full p-2 text-sm text-gray-500">
            No new notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center p-2 rounded-lg hover:bg-notification-hovered ${
                notification.read
                  ? "bg-notification-read"
                  : "bg-notification-unread"
              }`}
            >
              <article className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="p-text font-medium text-primary">
                    {notification.type}
                  </span>
                  <span className="text-xs text-secondary">
                    {notification.time}
                  </span>
                </div>
                <span className="p-text text-primary">
                  {notification.message}
                </span>
              </article>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
