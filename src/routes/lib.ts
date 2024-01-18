class Pathname {
  static join = (...segments: string[]) => `/${segments.join("/")}`;
  static getRoute = (...segments: string[]) => {
    const PATH = this.join(...segments);
    const SEGMENT = segments.slice(segments.length - 1)[0];

    return { PATH, SEGMENT };
  };
}

const SEGMENTS = {
  HOME: "",
  ACCOUNTS: "accounts",
  PROFILES: "profiles",
  CAMPAIGNS: "campaigns",
};

export const ROUTES = {
  HOME: Pathname.getRoute(SEGMENTS.HOME),
  ACCOUNTS: Pathname.getRoute(SEGMENTS.ACCOUNTS),
  PROFILES: Pathname.getRoute(SEGMENTS.PROFILES),
  CAMPAIGNS: Pathname.getRoute(SEGMENTS.CAMPAIGNS),
};
