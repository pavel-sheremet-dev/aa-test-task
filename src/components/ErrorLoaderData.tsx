export const ErrorLoaderData = () => {
  const onClick = () => {
    if (typeof window === "undefined") return;
    window.location.reload();
  };

  return (
    <div className="container grid gap-4 py-4">
      <h1>Something went wrong!</h1>
      <button onClick={onClick}>Try Reload</button>
    </div>
  );
};
