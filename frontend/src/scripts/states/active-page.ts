let activePage: MonkeyTypes.Page | undefined = "test";

export function get(): MonkeyTypes.Page | undefined {
  return activePage;
}

export function set(active: MonkeyTypes.Page | undefined): void {
  activePage = active;
}
