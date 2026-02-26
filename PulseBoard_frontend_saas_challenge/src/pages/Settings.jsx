import React, { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Moon,
  LogOut,
  Key,
  CheckCircle,
} from "lucide-react";
import { Container, Card, Button } from "../components/ui";

const Settings = () => {
  // Form State
  const [profile, setProfile] = useState({
    fullName: "Alex Johnson",
    email: "alex@example.com",
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Validation Logic
  const validate = () => {
    let newErrors = {};
    if (!profile.fullName.trim()) {
      newErrors.fullName = "Full Name cannot be empty";
    }
    if (!profile.email.trim()) {
      newErrors.email = "Email cannot be empty";
    } else if (!profile.email.includes("@")) {
      newErrors.email = "Email must contain @";
    }
    return newErrors;
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSaveSuccess(false);
      return;
    }

    setErrors({});
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  return (
    <Container className="py-10 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Account Settings
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Manage your profile settings, preferences, and account security.
        </p>
      </div>

      <div className="grid gap-10">
        {/* SECTION 1 — Profile Settings */}
        <section id="profile-settings">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Profile Settings
              </h2>
              <p className="text-sm text-gray-500">
                Update your personal identification information.
              </p>
            </div>
          </div>
          <Card className="border-none shadow-lg">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-50 focus:bg-white ${
                      errors.fullName ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-50 focus:bg-white ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 shadow-md hover:shadow-indigo-200"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                {saveSuccess && (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-bold animate-in fade-in slide-in-from-left-2">
                    <CheckCircle size={16} />
                    <span>Success! Profile updated.</span>
                  </div>
                )}
              </div>
            </form>
          </Card>
        </section>

        {/* SECTION 2 — Preferences */}
        <section id="preferences">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <Moon size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Preferences</h2>
              <p className="text-sm text-gray-500">
                Configure how the dashboard looks and feels.
              </p>
            </div>
          </div>
          <Card className="border-none shadow-lg divide-y divide-gray-100">
            <div className="flex items-center justify-between py-4 first:pt-0">
              <div className="space-y-0.5">
                <h3 className="text-base font-semibold text-gray-900">
                  Dark Mode
                </h3>
                <p className="text-sm text-gray-500">
                  Toggle between light and dark visual themes.
                </p>
              </div>
              <button
                type="button"
                id="theme-toggle"
                onClick={() =>
                  setPreferences({
                    ...preferences,
                    darkMode: !preferences.darkMode,
                  })
                }
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-indigo-500 ${
                  preferences.darkMode ? "bg-indigo-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    preferences.darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-4 last:pb-0">
              <div className="space-y-0.5">
                <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Bell size={16} className="text-gray-400" />
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Receive system updates and activity reports via email.
                </p>
              </div>
              <button
                type="button"
                id="notifications-toggle"
                onClick={() =>
                  setPreferences({
                    ...preferences,
                    emailNotifications: !preferences.emailNotifications,
                  })
                }
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-indigo-500 ${
                  preferences.emailNotifications
                    ? "bg-indigo-600"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    preferences.emailNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </Card>
        </section>

        {/* SECTION 3 — Security */}
        <section id="security">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Security & Account
              </h2>
              <p className="text-sm text-gray-500">
                Manage security settings and account status.
              </p>
            </div>
          </div>
          <Card className="border-none shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors border-gray-200"
              >
                <Key size={18} />
                <span>Change Password</span>
              </Button>
              <Button
                variant="secondary"
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-100 hover:border-rose-200 transition-colors"
                onClick={() => console.log("Logout triggered")}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </Button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                PulseBoard v1.0.4 • Last login: Today at 10:24 AM from Lagos, NG
              </p>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
};

export default Settings;
