export default function Notification() {
  const notifications = [
    {
      id: 1,
      type: "New Student registered",
      time: "10 minutes ago",
      message: "Emma Johnson has registered for SAT Preparation",
      read: false,
    },
    {
      id: 2,
      type: "Session reminder",
      time: "20 minutes ago",
      message: "You have a session with Michael Chen in 30 minutes",
      read: false,
    },
    {
      id: 3,
      type: "Payment received",
      time: "2 hours ago",
      message: "Payment received from Sophia Rodriguez",
      read: true,
    },
  ];
  return (
    <section className=" absolute left-3 top-14 max-w-[355px] rounded-lg bg-cardBg border-b border-notification-hovered shadow-lg p-2 ">
      <div className="flex justify-between items-center py-4">
        <h2 className="p-text font-medium text-primary"> Notifications</h2>
        <button
          className="label-text text-secondary cursor-pointer hover:text-primary transition-all duration-200 ease-in-out"
          type="button"
        >
          Mark all as read
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center p-2 rounded-lg hover:bg-notification-hovered ${
              notification.read
                ? "bg-notification-read"
                : "bg-notification-unread"
            }`}
          >
            <article className="flex flex-col">
              <div className="flex justify-between items-center ">
                <span className="p-text font-medium  text-primary">
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
        ))}
      </div>
    </section>
  );
}
