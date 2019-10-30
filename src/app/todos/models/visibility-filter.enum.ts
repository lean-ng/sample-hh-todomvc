export enum VisibilityFilter {
  All,
  Active,
  Completed
}

export const mapPathToFilter = (path: string): VisibilityFilter => {
  switch (path) {
    case '/active':
      return VisibilityFilter.Active;
    case '/completed':
      return VisibilityFilter.Completed;
    default:
      return VisibilityFilter.All;
  }
};
