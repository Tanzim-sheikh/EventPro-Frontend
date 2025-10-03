import React from "react";

const AdminLayout = ({ title, subtitle, actions, children }) => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f5f9f2] via-[#eef5e6] to-[#e6f0dc]">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#8C9F6E]/30 to-[#34d399]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-[#60a5fa]/20 to-[#8C9F6E]/25 blur-3xl" />

      {/* Header area */}
      {(title || subtitle || actions) && (
        <div className="px-4 sm:px-6 lg:px-8 pt-10">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              {title && (
                <h1 className="font-audiowide text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-[#8C9F6E] via-[#34d399] to-[#60a5fa] bg-clip-text text-transparent">
                    {title}
                  </span>
                </h1>
              )}
              {subtitle && (
                <p className="mt-2 text-sm md:text-base text-[#5a6b47]/80">{subtitle}</p>
              )}
            </div>
            {actions && <div className="flex gap-3">{actions}</div>}
          </div>
        </div>
      )}

      {/* Content area */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
