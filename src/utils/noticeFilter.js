export const getFilteredNotices = (allNotices = [], user = null, context = "public_page") => {

  if (context === "public_page") {
    return allNotices.filter(
      (notice) => notice.audience === "Public" || notice.audience === "Public & Logged-in"
    );
  }

  if (context === "dashboard" && user) {
    const userRole = user.role?.toLowerCase();

    return allNotices.filter((notice) => {
      const audience = notice.audience;

      if (userRole === "admin") return true;

      if (
        audience === "Public" ||
        audience === "Public & Logged-in" ||
        audience === "Only Logged-in"
      ) {
        return true;
      }

      if (audience.toLowerCase() === userRole) {
        return true;
      }

      return false;
    });
  }

  return [];
};