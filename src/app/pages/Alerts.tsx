import { useNavigate } from "react-router-dom";
import { AlertTriangle, AlertCircle, CheckCircle, Clock, ChevronRight } from "lucide-react";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  cattleName: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Early Mastitis Detection",
    description: "Acoustic AI detected abnormal vocalizations indicating early stage mastitis. Immediate veterinary consultation recommended.",
    cattleName: "Lakshmi (Gir)",
    timestamp: "2 hours ago",
    isRead: false,
    actionRequired: true,
  },
  {
    id: "2",
    type: "warning",
    title: "Decreased Rumination Activity",
    description: "Rumination levels have dropped by 12% over the past 24 hours. Monitor feeding patterns closely.",
    cattleName: "Nandi (Sahiwal)",
    timestamp: "5 hours ago",
    isRead: false,
    actionRequired: true,
  },
  {
    id: "3",
    type: "info",
    title: "Health Scan Due",
    description: "It's been 24 hours since the last comprehensive health scan for this animal.",
    cattleName: "Kamadhenu (Red Sindhi)",
    timestamp: "8 hours ago",
    isRead: true,
    actionRequired: false,
  },
  {
    id: "4",
    type: "warning",
    title: "Gait Irregularity Detected",
    description: "Spatial AI analysis shows slight lameness in the left hind leg. Early intervention recommended.",
    cattleName: "Surabhi (Rathi)",
    timestamp: "1 day ago",
    isRead: true,
    actionRequired: false,
  },
  {
    id: "5",
    type: "info",
    title: "Excellent Health Milestone",
    description: "Health score has remained above 90 for 7 consecutive days!",
    cattleName: "Lakshmi (Gir)",
    timestamp: "2 days ago",
    isRead: true,
    actionRequired: false,
  },
];

export default function Alerts() {
  const navigate = useNavigate();

  const getAlertStyle = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-gradient-to-br from-red-50 to-red-100",
          border: "border-red-300",
          icon: AlertTriangle,
          iconColor: "text-red-600",
          iconBg: "bg-red-100",
          badge: "bg-red-600 text-white",
          ringColor: "ring-red-500",
        };
      case "warning":
        return {
          bg: "bg-gradient-to-br from-orange-50 to-amber-100",
          border: "border-orange-300",
          icon: AlertCircle,
          iconColor: "text-orange-600",
          iconBg: "bg-orange-100",
          badge: "bg-orange-600 text-white",
          ringColor: "ring-orange-500",
        };
      case "info":
        return {
          bg: "bg-gradient-to-br from-green-50 to-emerald-100",
          border: "border-green-300",
          icon: CheckCircle,
          iconColor: "text-green-600",
          iconBg: "bg-green-100",
          badge: "bg-green-600 text-white",
          ringColor: "ring-green-500",
        };
    }
  };

  const unreadCount = mockAlerts.filter((a) => !a.isRead).length;

  return (
    <div className="min-h-screen bg-[#F9F8F4]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-[#2D5A27]">Alerts</h1>
              <p className="text-sm text-gray-600">
                {unreadCount > 0 ? `${unreadCount} new alerts` : "All caught up"}
              </p>
            </div>
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm">
                {unreadCount}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="max-w-lg mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 shadow-md border border-red-200">
            <div className="text-2xl font-bold text-red-600">
              {mockAlerts.filter((a) => a.type === "critical").length}
            </div>
            <div className="text-xs text-gray-700 mt-1 font-medium">Critical</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl p-4 shadow-md border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">
              {mockAlerts.filter((a) => a.type === "warning").length}
            </div>
            <div className="text-xs text-gray-700 mt-1 font-medium">Warnings</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-4 shadow-md border border-green-200">
            <div className="text-2xl font-bold text-green-600">
              {mockAlerts.filter((a) => a.type === "info").length}
            </div>
            <div className="text-xs text-gray-700 mt-1 font-medium">Healthy</div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {mockAlerts.map((alert) => {
            const style = getAlertStyle(alert.type);
            const Icon = style.icon;

            return (
              <div
                key={alert.id}
                onClick={() => navigate(`/history?cattleId=${alert.cattleName}`)}
                className={`${style.bg} border ${style.border} rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all ${
                  !alert.isRead ? "ring-2 ring-offset-2 " + style.ringColor : ""
                }`}
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 bg-white rounded-lg ${style.iconColor}`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        {!alert.isRead && (
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="font-medium">{alert.cattleName}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-3">{alert.description}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full ${style.badge}`}>
                        {alert.type.toUpperCase()}
                      </span>
                      {alert.actionRequired && (
                        <span className="text-xs px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-700">
                          Action Required
                        </span>
                      )}
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
          <h4 className="font-semibold text-[#2D5A27] mb-2">⚡ 48-Hour Early Warning</h4>
          <p className="text-sm text-gray-700">
            PRANA-G AI analyzes over 200 health parameters in real-time to detect diseases 
            48 hours before physical symptoms appear, giving you crucial time for preventive action.
          </p>
        </div>
      </div>
    </div>
  );
}